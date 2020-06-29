const Discord = require('discord.js');
const ms = require('ms');

exports.run = async(client, message, args) => {
  // Üst satırdaki uyarıda sadece belirtilen rol ve üstü kullanabilir.
  // Alt satırdaki uyarıda sadece belirtilen rol kullanabilir.
  if (message.member.highestRole.position < message.guild.roles.get('Komutu Kullanabilecek Rol IDsi').position) return message.reply('Bu komutu kullanabilmek için yeterli izne sahip değilsin!');
  //if (!message.member.roles.has("Komutu Kullanabilecek Rol IDsi")) return message.reply('Bu komut için yeterli iznin yok!');
  let uye = message.mentions.members.first() || message.guild.members.get(args[0]);
  if (!uye || !args[1]) return message.reply(`**Komutu doğru kullanmalısın!** => \`${this.help.usage}\``);
  let logKanali = message.guild.channels.get('Log Kanalının IDsi'); // Log Kanalı ID
  let muteRolu = message.guild.roles.find(r => r.name === "Muted");
  if (!muteRolu) {
    muteRolu = await message.guild.createRole({ name: "Muted", color: "#818386", permissions: 0 });
    message.guild.channels.forEach(async Yashinu => {
      await Yashinu.overwritePermissions(muteRolu, { SEND_MESSAGES: false, ADD_REACTIONS: false, MANAGE_MESSAGES: false, SPEAK: false });
    });
  };
  await uye.addRole(muteRolu.id);
  message.channel.send(`\`${uye.displayName}\` adlı üye **${args[1]}** boyunca susturuldu!`);
  logKanali.send(new Discord.RichEmbed().setColor(message.member.displayHexColor).setDescription(`${uye} üyesi ${args[2] ? "**"+ args.slice(2) + "** nedeniyle, " : ""}${message.author} tarafından **${args[1]}** boyunca **susturuldu!**`).setAuthor(message.member.displayName, message.author.avatarURL).setTimestamp());
  try { uye.send(`\`${message.guild.name}\` adlı sunucuda ${args[2] ? "**"+ args.slice(2) + "** nedeniyle, " : ""}${message.author} tarafından **${args[1]}** boyunca susturuldun!\nEğer susturulman bitmezse yetkililerden birine ulaş.`); } catch(err) { };
  setTimeout(async () => {
    await uye.removeRole(muteRolu.id);
    logKanali.send(new Discord.RichEmbed().setColor(message.member.displayHexColor).setDescription(`${uye} üyesinin ${args[2] ? "**"+ args.slice(2) + "** nedeniyle, " : ""}${message.author} tarafından **${args[1]}** boyunca atılan **susturulması bitti!**`).setAuthor(message.member.displayName, message.author.avatarURL).setTimestamp());
    try { uye.send(`\`${message.guild.name}\` adlı sunucuda ${args[2] ? "**"+ args.slice(2) + "** nedeniyle, " : ""}${message.author} tarafından **${args[1]}** boyunca atılan **susturulman bitti**!`); } catch(err) { };
  }, ms(args[1]));
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["kız", "k"],
  permLevel: 0
};
exports.help = {
  name: "mute",
  description: "",
  usage: "g!mute @üye süre sebep"
};
