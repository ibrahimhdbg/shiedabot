const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

exports.run = async(client, message, args) => {
  let kanaldakiMesajlar = await message.channel.fetchMessages();
  message.channel.bulkDelete(kanaldakiMesajlar.filter(m => m.content.startsWith(ayarlar.prefix) || m.author.id === client.user.id).array()).then(msj => message.channel.send(new Discord.RichEmbed().setColor(message.member.displayHexColor).setDescription(`Başarıyla **${msj.size}** adet mesaj silindi!`)).then(c => c.delete(5000)));
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['clean', 'temizlebot', 'temizle-komut'],
  permLevel: 0
};

exports.help = { 
  name: 'temizle-bot', 
  description: 'Botun o kanalda kullanılmış komutlarını ve mesajlarını temizler.',
  usage: 'temizle-bot',
  kategori: 'yetkili'
};