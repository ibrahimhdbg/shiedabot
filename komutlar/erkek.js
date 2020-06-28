const Discord = require("discord.js");
const db = require("quick.db")
exports.run = async (client, message, args) => {
  let member = message.mentions.members.first();
  args.shift();
  let isim = args.filter(x => isNaN(x)).slice(0, 2).join(' ')
  let yaş = args.filter(x => !isNaN(x))[0];
  var tag = ("|");
  if (!member) return message.channel.send("**Örnek:** !e <üye> <isim> <yaş>");
  if (!isim) return message.channel.send("**Örnek:** !e <üye> <isim> <yaş>");
  
  member.setNickname(` ${isim}  ${tag} ${yaş} `);
  member.removeRole('726816361309011979')
  member.addRole('726823658856775751')
db.add(`yetkili.${message.author.id}.erkek`, 1); 
const embed = new Discord.RichEmbed()
      .setColor("15ad31")
      .setTitle('Kayıt Başarılı!')
      .setThumbnail(message.author.avatarURL)
      .setAuthor(`${client.user.username}`, client.user.avatarURL)  
       .setDescription(`Kayıt Edilen Kullanıcı: **${member.user}** \n Kayıt Eden Yetkili: **${message.author.username}**`)
     .setFooter(`${client.user.username}`, client.user.avatarURL) 
      .setTimestamp()
client.channels.get("726829897120612443").send(embed)
  client.channels.get("726816361309011979").send(`${member} aramıza hoşgeldin! <a:kedicik:726832299538382902>`)
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