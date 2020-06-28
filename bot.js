const Discord = require("discord.js");
const client = new Discord.Client();
const ayarlar = require("./ayarlar.json");
const chalk = require("chalk");
const moment = require("moment");
var Jimp = require("jimp");
const { Client, Util } = require("discord.js");
const weather = require("weather-js");
const fs = require("fs");
const db = require("quick.db");
const http = require("http");
const express = require("express");
require("./util/eventLoader")(client);
const path = require("path");
const request = require("request");
const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping tamamdır.");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

var prefix = ayarlar.prefix;

const log = message => {
  console.log(`${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on("warn", e => {
  console.log(chalk.bgYellow(e.replace(regToken, "that was redacted")));
});

client.on("error", e => {
  console.log(chalk.bgRed(e.replace(regToken, "that was redacted")));
});

client.login(ayarlar.token);

// PRİV HUB

client.on('voiceStateUpdate', async (oldMember, newMember) => {
  let geciciOda = "726815768129568827"; // GEÇİÇİ ODA OLACAK ODANIN IDSI
  let geciciOdaSembol = "🌙"; // GEÇİCİ ODANIN BAŞINA EKLENECEK SEMBOL (BUNU KOYMAZSANIZ TÜM KANALLARI SİLER)
  
  if (!newMember.user.bot && newMember.guild.channels.has(geciciOda) && newMember.voiceChannel && newMember.voiceChannel.id === geciciOda) {
    try {
      newMember.guild.createChannel(geciciOdaSembol + " " + (newMember.displayName).replace(/[^a-zA-ZığüşöçĞÜŞİÖÇ0123456789 ]+/g, ''), { type: "voice", parent: newMember.guild.channels.get(geciciOda).parentID }).then(async kanal => {
        await kanal.overwritePermissions(newMember.id, { VIEW_CHANNEL: true, CONNECT: true, SPEAK: true, MUTE_MEMBERS: true, MOVE_MEMBERS: true, DEAFEN_MEMBERS: true, MANAGE_CHANNELS: false, MANAGE_ROLES: false, MANAGE_WEBHOOKS: false });
        await newMember.setVoiceChannel(kanal.id);
      });
    } catch (yashinu) { console.error(yashinu) };
  };
  
  if (oldMember.voiceChannel && (oldMember.voiceChannel.name).startsWith(geciciOdaSembol) && oldMember.voiceChannel.members.filter(uye => !uye.user.bot).size < 1) await oldMember.guild.channels.filter(kanal => kanal.type === "voice" && kanal.members.filter(uye => !uye.user.bot).size < 1 && (kanal.name).startsWith(geciciOdaSembol)).forEach(kanal => kanal.delete());
});
// Yashinu tarafından, Serendia Squad sunucusunda Discord.JS dersinde yazılmıştır. Paylaşılması yasaktır!
// PRİV HUB

// Bu kod 02.05.2020 tarihinde Serendia Squad (Code Academy) sunucusunda Yashinu tarafından Discord.JS derslerinde yazılmıştır. Paylaşılması yasaktır!
// Priv Chat Sistemi
client.on("message", async message => {
  let privKanal = message.guild.channels.get('726816362969694245'); // TEK DOLDURMANIZ GEREKEN YER BURASI
  if (message.channel.id === privKanal.id && !message.author.bot) {
    if (!message.mentions.users.first() || (message.mentions.users.first().id === message.author.id && message.mentions.users.size == 1) || message.mentions.users.first().bot || message.mentions.users.size > 10 || (message.author.bot && !message.mentions.channels.first()) || (!message.member.hasPermission("ADMINISTRATOR") && message.guild.channels.filter(k => k.name.includes('priv-chat') && k.permissionsFor(message.author).has("MANAGE_MESSAGES")).size >= 1)) return message.delete(100);
    let kanalNumara = message.guild.channels.filter(k => k.name.includes('priv-chat')).array().map(k => Number(k.name.split('-')[0])).sort().reverse();
    message.guild.createChannel(`${kanalNumara[0] ? kanalNumara[0]+1 : 1}-priv-chat`, { type: "text", parent: privKanal.parentID, topic: `Oda yöneticisi: ${message.author}` }).then(kanal => {
      let Yashinu = message.guild.roles.find(r => r.name === "@everyone");
      kanal.overwritePermissions(Yashinu, { READ_MESSAGES: false, READ_MESSAGE_HISTORY: false, SEND_MESSAGES: false });
      kanal.overwritePermissions(message.author, { READ_MESSAGES: true, READ_MESSAGE_HISTORY: true, SEND_MESSAGES: true, MANAGE_MESSAGES: true });
      message.mentions.users.forEach(u => {
        kanal.overwritePermissions(u, { READ_MESSAGES: true, READ_MESSAGE_HISTORY: true, SEND_MESSAGES: true });
      });
      
      message.reply(`Belirtilen kişilerle özel kanalın oluşturuldu => ${kanal}`).then(x => x.delete(10000));
      kanal.send(`${message.author}, ${message.mentions.users.array().map(x => x).join(', ')}\nSadece sizin görebildiğiniz özel odanız oluşturuldu! Odadan ayrılmak isterseniz **g!ayrıl** yazmanız yeterlidir!\n\n\`Yönetici Komutları\`\n**g!kapat** kanalı kapatır.\n**g!kişi-ekle @kişi** kanala kişi ekler.\n**g!kişi-at @kişi** kanaldan kişi atar.\n**g!sustur @kişi** kanalda kişi susturur.\n**g!susturaç @kişi** kanalda kişinin susturmasını açar.`).then(msj => msj.pin());
    });
  };
  
  if (message.channel.name.includes('priv-chat') && message.channel.permissionsFor(message.author).has("MANAGE_MESSAGES") && (message.content.toLowerCase().startsWith('g!kapat') || message.content.toLowerCase().startsWith('g!kanalı-kapat') || message.content.toLowerCase().startsWith('g!ayrıl'))) return await message.channel.delete();
  if (message.channel.name.includes('priv-chat') && message.channel.permissionsFor(message.author).has("MANAGE_MESSAGES") && (message.content.toLowerCase().startsWith('g!ekle') || message.content.toLowerCase().startsWith('g!kişi-ekle')) && message.mentions.users.first()) return message.channel.overwritePermissions(message.mentions.users.first(), { READ_MESSAGES: true, READ_MESSAGE_HISTORY: true, SEND_MESSAGES: true }).then(x => message.react('✅'));
  if (message.channel.name.includes('priv-chat') && message.channel.permissionsFor(message.author).has("MANAGE_MESSAGES") && (message.content.toLowerCase().startsWith('g!at') || message.content.toLowerCase().startsWith('g!kişi-at')) && message.mentions.users.first()) return message.channel.overwritePermissions(message.mentions.users.first(), { READ_MESSAGES: null, READ_MESSAGE_HISTORY: null, SEND_MESSAGES: null }).then(x => message.react('✅'));
  if (message.channel.name.includes('priv-chat') && message.channel.permissionsFor(message.author).has("MANAGE_MESSAGES") && (message.content.toLowerCase().startsWith('g!sustur') || message.content.toLowerCase().startsWith('g!mute')) && message.mentions.users.first() && message.channel.permissionsFor(message.mentions.users.first()).has("READ_MESSAGES")) return message.channel.overwritePermissions(message.mentions.users.first(), { SEND_MESSAGES: false }).then(x => message.react('✅'));
  if (message.channel.name.includes('priv-chat') && message.channel.permissionsFor(message.author).has("MANAGE_MESSAGES") && (message.content.toLowerCase().startsWith('g!sustur-aç') || message.content.toLowerCase().startsWith('g!unmute') || message.content.toLowerCase().startsWith('g!susturaç')) && message.mentions.users.first() && message.channel.permissionsFor(message.mentions.users.first()).has("READ_MESSAGES")) return message.channel.overwritePermissions(message.mentions.users.first(), { SEND_MESSAGES: true }).then(x => message.react('✅'));
  if (message.channel.name.includes('priv-chat') && message.channel.permissionsFor(message.author).has("READ_MESSAGES") && (message.content.toLowerCase().startsWith('g!ayrıl') || message.content.toLowerCase().startsWith('g!çık'))) return message.channel.overwritePermissions(message.author, { READ_MESSAGES: null, READ_MESSAGE_HISTORY: null, SEND_MESSAGES: null }).then(x => message.react('✅'));
});

client.ayar = {
  "SunucuID": "726815768129568819",
  "SahipRolüID": "Sunucu sahibinin rolünün ID",
  "TeyitYetkilisi": "Teyit yetkilisi rolünün ID",
  "TeyitsizRolü": "Teyitsiz kişilerin rol ID",
  "TeyitKanal": "Sunucuya katılan kişilerin teyit edileceği kanalın ID",
  "ErkekÜye": "Erkek üyelere verilecek rolün ID",
  "KızÜye": "Kız üyelere verilecek rolün ID",
  "SohbetKanalID": "Sunucunuzun genel chat kanalının ID"
}


client.on("guildMemberAdd", async(member) => {
  try {
    await(member.addRole(client.ayar.TeyitsizRolü))
    await client.channels.get(client.ayar.TeyitKanal).send(`Sunucuya hoş geldin ${member}, seninle **${member.guild.memberCount}** kişiyiz! \n&lt;@&amp;${client.ayar.TeyitYetkilisi}&gt; rolündeki yetkililer seninle ilgilenecektir.`)
  } catch(err) { }
})

 

//snipe
client.on("messageDelete", async message => {
  if (message.channel.type === "dm" || !message.guild || message.author.bot) return;
  await db.set(`snipe.${message.guild.id}.${message.channel.id}`, { yazar: message.author.id, yazilmaTarihi: message.createdTimestamp, silinmeTarihi: Date.now(), dosya: message.attachments.first() ? true : false });
  if (message.content) db.set(`snipe.${message.guild.id}.${message.channel.id}.icerik`, message.content);
});