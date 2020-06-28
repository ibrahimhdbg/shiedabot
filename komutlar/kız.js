const Discord = require("discord.js");
const db = require("quick.db");
exports.run = async (client, message, args) => {
  if (message.member.highestRole.position < message.guild.roles.get('704432531033817148')) return message.reply('Bu komutu kullanabilmek için  <@!704432531033817148> rolü ve üstüne sahip olmalısın!');

  let member = message.mentions.members.first();
  let isim = args.filter(x => isNaN(x)).slice(0, 2).join(' ')
  let yaş = args.filter(x => !isNaN(x))[0];
  var tag = ("|");
  if (!member) return message.channel.send("**Örnek:** !k <üye> <isim> <yaş>");
  if (!isim) return message.channel.send("**Örnek:** !k <üye> <isim> <yaş>");

  member.setNickname(`${isim} ${tag}  ${yaş} `);
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
client.channels.get("726829897120612443").send(embed)
  client.channels.get("726816361309011979").send(`${member} aramıza hoşgeldin! <a:kedicik:726832299538382902>`)
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
