const Discord = require('discord.js');
exports.run = async (client, message, args) => {
if (!message.member.roles.has('701796413532667946')) return message.channel.sendEmbed(new Discord.RichEmbed().setDescription(' <@&701796413532667946> Rolüne Sahip Olman Gerekiyor ').setColor("Black"));    if (!message.member.voiceChannel) { return message.channel.send("Ses kanalında olman lazım Dostum!"); }
  let kullanıcı = message.mentions.users.first()
  if (!kullanıcı) return message.channel.send("Kullanıcıyı etiketleyip tekrar denemelisin!");
  let rol = message.mentions.roles.first()
  let member = message.guild.member(kullanıcı)
  if(!member.voiceChannel) return message.channel.send("Etiketlenen kullanıcı bir ses kanalında değil").then(m =>m.delete(5000))
  const voiceChannel = message.member.voiceChannel.id;
if(!voiceChannel) return
  member.setVoiceChannel(voiceChannel);
   message.react('tepki id')
   const voiceChannel1 = message.member.voiceChannel.name;
  let embed= new Discord.RichEmbed()
    .setColor("#000000")
    .setDescription(message.author+" **Tarafından** "+kullanıcı+" **Kullanıcısı** `"+voiceChannel1+"`** Sesli Kanalına Çekildi :tique:**")
    .setFooter(`Subzero & Zeze ${message.author.tag}` , `${message.author.displayAvatarURL}`)
   .setTimestamp()  
    message.channel.send(embed).then(m =>m.delete(10000))
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  kategori: "KULLANICI KOMUTLARI",
  permLevel: 0
}
exports.help = {
  name: 'taşı',
  description: " ",
  usage: ' '
}
