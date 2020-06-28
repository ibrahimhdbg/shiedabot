const Discord = require("discord.js");
const db = require("quick.db");
let a = require("../ayarlar.json");
exports.run = async (client, message, args, params) => {
  if (!message.member.hasPermission("ADMINISTRATOR"))
    return message.channel.send(
      new Discord.RichEmbed().setDescription(
        `**Hey <@${message.author.id}>! Bu komut için yeterli iznin yok!**`
      )
    );
  let cezalirol = "726841548859506718"
  let maxuyarı = "7"; //Belirtilen uyarı sayısını aştığında cezalı rolü verir.
  let m31rt = a.prefix;
  if (
    !args[0] ||
    !args[0] === "kanal-ayarla" ||
    !args[0] === "kanal-sıfırla" ||
    !args[0] === "ver" ||
    !args[0] === "sil"
  )
    return message.channel.send(
      new Discord.RichEmbed()
        .setDescription(
          `Parametreler eksik. Öncelikle birisini uyarmak için Uyarı Log kanalını ayarlamalısın: **\`${m31rt}uyarı kanal-ayarla <#kanal etiket/kanal id'si/kanalın tam ismi>\`**\n \nAyarladıktan sonra eğer bir hatanız var ise sıfırlamak için: **\`${m31rt}uyarı kanal-sıfırla\`**\n \nKanalı ayarladıktan sonra istediğiniz kullanıcıya uyarı vermek için(1 Uyarı artar): **\`${m31rt}uyarı ver <@kullanıcı etiket/kullanıcı id'si> <sebep>\`**\n \nİstediğiniz kullanıcıdan da uyarılarını silmek için: **\`${m31rt}uyarı sil <@kullanıcı etiket/kullanıcı id'si> <silinecek uyarı sayısı>\`0**\n \nUyarılarını kontrol etmek için ise **\`${m31rt}uyarı kontrol <@kullanıcı etiket/kullanıcı id'si>\`** `
        )
  
    );
  if (args[0] === "kanal-ayarla") {
    let kk = await db.fetch(`uk_${message.guild.id}`);
    if (kk)
      return message.channel.send(
        new Discord.RichEmbed().setDescription(
          `**Hey <@${message.author.id}>! Bu sunucuda zaten uyarı log kanalı ayarlanmış!`
        )
      );
    let k =
      message.mentions.channels.first() ||
      message.guild.channels.find(channel => channel.name === args[1]) ||
      message.guild.channels.get(args[1]);
    if (!k)
      return message.channel.send(
        new Discord.RichEmbed().setDescription(
          `**Hey <@${message.author.id}>! Uyarı log kanalını ayarlamak için bir kanalı etiketlemen gerekli!**`
        )
      );
    await db.set(`uk_${k.guild.id}`, `${k.id}`);
    message.channel.send(
      new Discord.RichEmbed().setDescription(
        `**Hey <@${message.author.id}>! Belirttiğin kanal başarı ile uyarı log kanalı olarak ayarlandı!**`
      )
    );
  }
  if (args[0] === "kanal-sıfırla") {
    await db.delete(`uk_${message.guild.id}`);
    message.channel.send(
      new Discord.RichEmbed().setDescription(
        `**Hey <@${message.author.id}>! Uyarı log kanalı başarı ile sıfırlandı!**`
      )
    );
  }
  if (args[0] === "ver") {
    let kkk = await db.fetch(`uk_${message.guild.id}`);
    if (!kkk)
      return message.channel.send(
        new Discord.RichEmbed().setDescription(
          `**Hey <@${message.author.id}>! Uyarı yapabilmen için önce log kanalını ayarlaman gerekiyor:** ${a.prefix}uyarı kanal-ayarla <#kanal>`
        )
      );
    let u =
      message.mentions.members.first() ||
      message.guild.members.get(args[1]) ||
      message.guild.members.find(member => member.user.username === args[1]);
    if (!u)
      return message.channel.send(
        new Discord.RichEmbed().setDescription(
          `**Hey <@${message.author.id}>! Birisini etiketlemedin veya belirttiğin kullanıcıyı bulamadım!**`
        )
      );
    if (u.user.bot || u.id === message.author.id)
      return message.channel.send(
        new Discord.RichEmbed().setDescription(
          `**Hey <@${message.author.id}>! Bir insan neden kendini veya bir botu uyarmak ister ki?**`
        )
      );
    let s = args.slice(2).join(" ");
    if (!s)
      return message.channel.send(
        new Discord.RichEmbed().setDescription(
          `**Hey <@${message.author.id}>! Birisini etiketledin, ama sebebi yazmayı unuttun :)**`
        )
      );
    db.add(`uyarino-${u.id}`, 1);
    let m3rt = await db.fetch(`uyarino-${u.id}`);
    u.send(
      `**${message.guild.name}** adlı sunucudan **${message.author.tag}** tarafından uyarıldın!\nToplam uyarın: \`${m3rt}\`\nUyarılma sebebin: \`${s}\``
    );
    message.reply(`**Kullanıcı başarıyla uyarıldı!**`);
    let m3rkt = client.channels.get(kkk);
    if (m3rt < maxuyarı) {
      let m1rt = new Discord.RichEmbed()
        .setTitle("Bir kullanıcı uyarıldı!")
        .addField("**Uyarılan Kullanıcı**", `<@${u.id}> - **${u.id}**`)
        .addField(
          "**Uyaran Yetkili**",
          `<@${message.author.id}> - **${message.author.id}**`
        )
        .addField(
          "**Uyarılma Ayrıntıları**",
          `**Sebebi:** \`${s}\`\n**Toplam Uyarılma Sayısı:** \`${m3rt}\``
        )
        .setFooter(message.guild.name, message.guild.iconURL);
      m3rkt.sendEmbed(m1rt);
    } else {
      let editlenir = new Discord.RichEmbed()
        .setTitle("Bir kullanıcı maksimum uyarı sayısını aştı ve ceza yedi!") 
        .addField("**Uyarılan Kullanıcı**", `<@${u.id}> - **${u.id}**`)
        .addField(
          "**Uyaran Yetkili**",
          `<@${message.author.id}> - **${message.author.id}**`
        )
        .addField(
          "**Uyarılma Ayrıntıları**",
          `**Sebebi:** \`${s}\`\n**Toplam Uyarılma Sayısı:** \`${m3rt}\`\n**Verilen Cezalı Rolü:** <@&${cezalirol}>`
        )
        .setFooter(message.guild.name, message.guild.iconURL);
      m3rkt.send(editlenir);
      let ee = message.guild.roles.get(cezalirol)

    }
  }

  if (args[0] === "sil") {
    let u =
      message.mentions.members.first() ||
      message.guild.members.get(args[1]) ||
      message.guild.members.find(member => member.user.username === args[1]);
    if (!u)
      return message.channel.send(
        new Discord.RichEmbed().setDescription(
          `**Hey <@${message.author.id}>! Birisini etiketlemedin veya senin belirttiğin kullanıcıyı bulamadım!**`
        )
      );
    if (u.user.bot || u.id === message.author.id)
      return message.channel.send(
        new Discord.RichEmbed().setDescription(
          `**Hey <@${message.author.id}>! Bir insan neden kendini veya bir botu uyarmak ister ki?**`
        )
      );
    let dd = await db.fetch(`uyarino-${u.id}`);
    if (!dd)
      return message.channel.send(
        new Discord.RichEmbed().setDescription(
          `**Hey ${message.author}! Etiketlediğin kişinin bir uyarısı bulunmamakta!**`
        )
      ); //hmmmm xd şey üste gel
    if (!args[2])
      return message.channel.send(
        new Discord.RichEmbed().setDescription(
          `**Hey <@${message.author.id}>! Uyarıları silmek için 10'dan küçük bir sayı girmen gerekiyor!**`
        )
      );
    if (isNaN(args[2]) || args[2] >= 10)
      return message.channel.send(
        new Discord.RichEmbed().setDescription(
          `**Hey <@${message.author.id}>! Uyarıları silmek için 10'dan küçük bir sayı girmen gerekiyor!**`
        )
      );
    if (args[2] > dd)
      return message.channel.send(
        new Discord.RichEmbed().setDescription(
          `**Hey <@${message.author.id}>! Belirttiğin sayı etiketlediğin kullanıcının uyarı sayısından büyük!**`
        )
      );
    if (dd <= 0)
      return message.channel.send(
        new Discord.RichEmbed().setDescription(
          `**Hey <@${message.author.id}>! Belirttiğin kullanıcının uyarı sayısı zaten 0!**`
        )
      );
    let kkkk = await db.fetch(`uk_${message.guild.id}`);
    message.reply(
      `**Kullanıcının başarıyla \`${args[2]}\` adet uyarısı silindi!**`
    );
    db.subtract(`uyarino-${u.id}`, args[2]);
    u.send(
      `**${message.guild.name}** adlı sunucudan **${message.author.tag}** tarafından 1 uyarın kaldırıldı!\nToplam uyarın: \`${dd}\``
    );
    client.channels.get(kkkk).sendEmbed(
      new Discord.RichEmbed()
        .setTitle("Bir kullanıcın uyarısı kaldırıldı!")
        .addField(
          "**Uyarısı Kaldırılan Kullanıcı**",
          `<@${u.id}> - **${u.id}**`
        )
        .addField(
          "**Uyarısını Kaldıran Yetkili**",
          `<@${message.author.id}> - **${message.author.id}**`
        )
        .addField(
          "**Uyarılma Ayrıntıları**",
          `**Toplam Uyarılma Sayısı:** \`${dd ? dd : "Uyarılarının tamamı silinmiş veya bulunmuyor."}\``
        )
        .setFooter(message.guild.name, message.guild.iconURL)
    );
  }
  if (args[0] === "kontrol") {
    let u =
      message.mentions.members.first() ||
      message.guild.members.get(args[1]) ||
      message.guild.members.find(member => member.user.username === args[1]) ||
      message.author;
    if (!u)
      return message.channel.send(
        new Discord.RichEmbed().setDescription(
          `**Hey <@${message.author.id}>! Birisini etiketlemedin veya senin belirttiğin kullanıcıyı bulamadım!**`
        )
      );
    let d = await db.fetch(`uyarino-${u.id}`);
    message.channel.send(
      new Discord.RichEmbed()
        .setTitle("Uyarı Kontrol")
        .addField("**Kullanıcı**", `<@${u.id}> - **${u.id}**`)
        .addField(
          "**Uyarı sayısı**",
          `${d ? d : "Bu kullanıcının uyarısı yok!"}`
        )
    );
  }
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "uyarı",
  description: "(Gelişmiş) Kullanıcı uyarma & uyarı silme & kontrol etme komutu.",
  usage: "uyarı <ver/sil/kanal-ayarla/kanal-sıfırla>"
};
