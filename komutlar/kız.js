const Discord = require("discord.js");
const db = require("quick.db");
exports.run = async (client, message, args) => {
  if (message.member.highestRole.position < message.guild.roles.get('704432531033817148').position) return message.reply('Bu komutu kullanabilmek için  <@!704432531033817148> rolü ve üstüne sahip olmalısın!');

  let member = message.mentions.members.first();
  let isim = args.slice(1).join(" ");
  let yaş = args.slice(3).join(" ");
  var tag = "℣";
  if (!member) return message.channel.send("**Örnek:** !k <üye> <isim> <yaş>");
  if (!isim) return message.channel.send("**Örnek:** !k <üye> <isim> <yaş>");

  member.setNickname(`${tag} ${isim} ${yaş} `);
  member.removeRole("704432526566883328");
  member.addRole("704446549781905428");
  db.add(`yetkili.${message.author.id}.kiz`, 1);
  const embed = new Discord.RichEmbed()

    .setColor("15ad31")
    .setTitle("Kayıt Başarılı!")
    .setThumbnail(message.author.avatarURL)
    .setAuthor(`${client.user.username}`, client.user.avatarURL)
    .setDescription(
      `Kayıt Edilen Kullanıcı: **${member.user}** \n Kayıt Eden Yetkili: **${message.author.username}**`
    )
    .setFooter(`${client.user.username}`, client.user.avatarURL)
    .setTimestamp();
  message.channel.send(embed);
  client.channels.get("704449463422419156").send(`${member} aramıza hoşgeldin! <a:wel:717689513656188989><a:come:717689525283061830> `)
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["kız", "k"],
  permLevel: 0
};
exports.help = {
  name: "kız",
  description: "Kayıt Sistemi by Archilles",
  usage: "!erkek @kullanıcı <isim> <yaş>"
};
