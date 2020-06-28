const Discord = require('discord.js');

exports.run = async(client, message, args) => {
  let geciciOdaSembol = "🌙"; // GEÇİCİ ODANIN BAŞINA EKLENECEK SEMBOL
  if (!message.member.voiceChannel || !(message.member.voiceChannel.name).startsWith(geciciOdaSembol) || !message.member.voiceChannel.permissionsFor(message.author).has('MUTE_MEMBERS') || !args[0] || isNaN(args[0]) || Number(args[0]) > 99) return message.react('❌');
  message.member.voiceChannel.setUserLimit(args[0]);
  message.react('✅');
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'limit', 
  description: 'Özel odanızın limitini değiştirirsiniz.',
  usage: 'limit',
  kategori: 'kullanıcı'
};