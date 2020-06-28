const Discord = require("discord.js");
const db = require("quick.db")
exports.run = async (client, message, args) => {
  if (message.member.highestRole.position < message.guild.roles.get('704432531033817148').position) return message.reply('Bu komutu kullanabilmek için  <@!704432531033817148> rolü ve üstüne sahip olmalısın!');
  let member = message.mentions.members.first();
  args.shift();
  let isim = args.filter(x => isNaN(x)).slice(0, 2).join(' ')
  let yaş = args.filter(x => !isNaN(x))[0];

  var tag = ("|");
  if (!member) return message.channel.send("**Örnek:** !e <üye> <isim> <yaş>");
  if (!isim) return message.channel.send("**Örnek:** !e <üye> <isim> <yaş>");
  
  member.setNickname(` ${isim} ${tag} ${yaş} `);
  member.removeRole('704432526566883328')
  member.addRole('704446544929357875')
db.add(`yetkili.${message.author.id}.erkek`, 1); 
const embed = new Discord.RichEmbed()
      .setColor("15ad31")
      .setTitle('Kayıt Başarılı!')
      .setThumbnail(message.author.avatarURL)
      .setAuthor(`${client.user.username}`, client.user.avatarURL)  
       .setDescription(`Kayıt Edilen Kullanıcı: **${member.user}** \n Kayıt Eden Yetkili: **${message.author.username}**`)
     .setFooter(`${client.user.username}`, client.user.avatarURL) 
      .setTimestamp()
message.channel.send(embed);
  client.channels.get("704449463422419156").send(`${member} aramıza hoşgeldin! <a:welcome:698569569119502377>`)
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["erkek","e"],
  permLevel: 0
};
exports.help = {
  name: "erkek",
  description: "Kayıt Sistemi by Archilles",
  usage: "!erkek @kullanıcı <isim> <yaş>"
};