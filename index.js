// ıkarken yapılacaklar

const http = require("http");
const express = require("express");
const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping tamamdır.");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

if (process.version.slice(1).split(".")[0] < 8)
  throw new Error(
    "Node 8.0.0 or higher is required. Update Node on your system."
  );

const Discord = require("discord.js");
const client = new Discord.Client();
const bot = new Discord.Client();
const { RichEmbed } = require("discord.js");
const { promisify } = require("util");
const readdir = promisify(require("fs").readdir);
const chalk = require("chalk");
const fs = require("fs");
const { stripIndents } = require("common-tags");
const moment = require("moment");

const db = require("quick.db");
const jimp = require("jimp");
const Jimp = require("jimp");
const snekfetch = require("snekfetch");
const useful = require("./x.js");

let komutum = JSON.parse(fs.readFileSync("./komutlar.json", "utf8"));

client.cmdd = komutum;

client.useful = useful;
require("./modüller/fonksiyonlar.js")(client);
require("./util/eventLoader")(client);
client.config = require("./config.js");
client.emojiler = {
  gold: "532931814730366980", //?PARAM DAKİ ALTIN EMOJİSİ
  paraGitti: "533379120722214937", // X İŞARETİ
  paraGitmedi: "533379123356237835", // TİK İŞARETİ
  paraROZET: "533265960002650123", // PARA İLE ALINAN YILDIRIM ROZET EMOJİSİ
  onayRozet: "657236841938026546", // ONAY ROZETİ
  modRozet: "657237707080335401", // MOD ROZETİ
  yetkiliRozet: "657237435247230987", // YETKİLİ ROZETİ
  destekçiRozet: "657237148063236096",
  evet: "646575787683610645", // TİK İŞARET
  hayır: "634100898674507791", // X İŞARETİ
  kendineParaYollama: "534004856558714890", // KENDİNE PARA ATMAYA ÇALIŞANLAR İÇİN SİNİRLİ EMOJİSİ
  konfeti: "535023706104266762", // MESLEK SAHİBİ OLUNCA RENGARENK KONFETİ ATIYOR
  yukleniyor: "659478255539322881", // YÜKLENİYOR EMOJİ İŞTE :D
  sinirli: "534004856558714890", // TİTREYEN SİNİRLİ :D
  mutlu: "536478990597095424", // MUTLU EMOJİ
  rahatsızetme: "659721638228656144", // RAHATSIZ ETMEYİN EMOJİSİ
  çevrimiçi: "634064713113927710", // ÇEVRİMİÇİ EMOJİSİ
  yayıncı: "537015282192089099", // YAYINCI EMOJİSİ
  çevrimdışı: "659721557274263563", // ÇEVRİM DIŞI EMOJİSİ
  boşta: "659721510264504332", // BOŞTA EMOJİSİ
  bot: "536480420062298113", // BOT EMOJİSİ
  polis: "536480421685362699", // POLİS EMOJİ
  Yvar: "533379120722214937", // YETKİLERİM KOMUDUNDAKİ TİK İŞARETİ
  Yyok: "533379123356237835", // YETKİLERİM KOMUDUNDAKİ X İŞARETİ
  yan: "538809641036152853", // > GİBİ EMOJİ İŞTE :ç
  kalpSarılmalı: "561146492648161284",
  olumlu: "",
  olumsuz: "",

  // AYARLAR KOMUDUNDAKİ AÇIK KAPALI EMOJİLERİ >>>>>>>>>>>>>>>>>
  kapalıA: "659478316478234664",
  açıkA: "659478255539322881",

  // AÇIK BONUS EMOJİLERİ -------------- >>>>>>>>>>

  açıkB: "549204804468211740", // B
  açıkO: "549204805151621141", // O
  açıkN: "549204804446978058", // N
  açıkU: "549204806796050462", // U
  açıkS: "549204806380552202", // S

  // KAPALI BONUS EMOJİLERİ ---------------- >>>>>>>>>>>>>

  kapalıO: "549205266130927648", // O
  kapalıN: "549205265702977542", // N
  kapalıU: "549205268051787776", // U
  kapalıS: "549205267246612482" // S
};

client.ayarlar = {
  oynuyor: "Sizin İçin",
  official_sahip: "560073681162731541",
  sahip: ["560073681162731541"],
  yardimcilar: [""],
  isim: "KU-PİBOT",
  botD:
    "https://discordapp.com/oauth2/authorize?client_id=613168038526713858&permissions=8&scope=bot",
  webS: "",
  web: "",
  dblO: "",
  dbl: "https://top.gg/bot/613168038526713858",
  dbltoken:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMzE2ODAzODUyNjcxMzg1OCIsImJvdCI6dHJ1ZSwiaWF0IjoxNTgxMzUxMjcxfQ.vj9JWDKJ_spXFmHuk-O1hhZt-1WlEU73EixwENQ_wXU",
  webpanel: "https://kupi-time.glitch.me/",
  versiyon: "1.0.0",
  prefix: "k!",
  renk: "DARKBLUE",
  version: "1.0.0"
};
client.avatarURL = `https://cdn.discordapp.com/attachments/626761251485384725/661947838862983168/kupi.gif`;
const ayarlar = client.ayarlar;

client.tr = require("./tr.js");
client.en = require("./en.js");

//var prefix = ayarlar.prefix;

const log = message => {
  console.log(`${chalk.yellow(`»`)} ${message}`);
};

client.ayar = db;

client.on("ready", async () => {
  client.appInfo = await client.fetchApplication();
  setInterval(async () => {
    client.appInfo = await client.fetchApplication();
  }, 60000);

  require("./modüller/panel.js")(client);

  console.log(
    `${chalk.green(client.user.username)}${chalk.red(",")} ${chalk.blue(
      client.guilds.size
    )} ${chalk.yellow("Sunucu'ya")} ${chalk.red("ve")} ${chalk.blue(
      client.users.size.toLocaleString()
    )} ${chalk.yellow("Kullanıcı'ya")} ${chalk.red("hizmet veriyor!")}`
  );
  client.user.setStatus("online");
  client.user.setActivity(client.ayarlar.oynuyor, { type: "WATCHING" });
});

/*
client.on('guildMemberAdd', async member => {
 
  //	let kanal = await db.fetch(`hgKanal2_${member.guild.id}`)
   //  if (!kanal) return
  const Canvas = require('canvas')
	const canvas = Canvas.createCanvas(900, 280);
	const ctx = canvas.getContext('2d');

	const background = await Canvas.loadImage('https://pngimg.com/uploads/alien/alien_PNG103.png');
	ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

	ctx.strokeStyle = '#74037b';
	ctx.strokeRect(0, 0, canvas.width, canvas.height);

	// Add an exclamation point here and below
	ctx.font = applyText(canvas, `${member.user.tag}`);
	ctx.fillStyle = '#ffffff';
	ctx.fillText(`${member.user.tag}`, canvas.width / 3.7, canvas.height / 1.8);

	ctx.beginPath();
	ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
	ctx.closePath();
	ctx.clip();

	const { body: buffer } = await snekfetch.get(member.user.displayAvatarURL || member.user.defaultAvatarURL);
	const avatar = await Canvas.loadImage(buffer);
	ctx.drawImage(avatar, 25, 25, 200, 200);

	const attachment = new Discord.Attachment(canvas.toBuffer(), 'MEETRHosgeldin.png');

	member.guild.channels.get('531535859594297364').send(`Sunucuya hoşgeldin, ${member}!`, attachment);
});


client.on('guildMemberRemove', async member => {
  
	//let kanal = await db.fetch(`hgKanal2_${member.guild.id}`)
    //if (!kanal) return
    const Canvas = require('canvas')
	const canvas = Canvas.createCanvas(900, 280);
	const ctx = canvas.getContext('2d');

	const background = await Canvas.loadImage('https://pngimg.com/uploads/alien/alien_PNG103.png');
	ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

	ctx.strokeStyle = '#74037b';
	ctx.strokeRect(0, 0, canvas.width, canvas.height);

	// Add an exclamation point here and below
	ctx.font = applyText(canvas, `${member.user.tag}`);
	ctx.fillStyle = '#ffffff';
	ctx.fillText(`${member.user.tag}`, canvas.width / 3.7, canvas.height / 1.8);

	ctx.beginPath();
	ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
	ctx.closePath();
	ctx.clip();

	const { body: buffer } = await snekfetch.get(member.user.displayAvatarURL || member.user.defaultAvatarURL);
	const avatar = await Canvas.loadImage(buffer);
	ctx.drawImage(avatar, 25, 25, 200, 200);

	const attachment = new Discord.Attachment(canvas.toBuffer(), 'MEETRGuleGule.png');

	member.guild.channels.get('531535859594297364').send(`Güle güle, **${member.user.tag}**`, attachment);
});


const applyText = (canvas, text) => {
    const ctx = canvas.getContext('2d');

    let fontSize = 54;

    do {
  
    ctx.font = `${fontSize -= 2}px Helvetica`;
    } while (ctx.measureText(text).width > canvas.width - 111);

    return ctx.font;
};
//Kanalkoruma
client.on("channelDelete", async function(channel) {
  
  let logs = await channel.guild.fetchAuditLogs({type: 'CHANNEL_DELETE'});
  let cfxz = await db.fetch(`kanalkoruma${channel.guild.id}`)
  let cfxk = await db.fetch(`kanaluyari${channel.guild.member(logs.entries.first().executor).id}`)
  let cfxrol = await db.fetch(`cfxrol${channel.guild.id}`)
  let cfxrol2 = await db.fetch(`cfxrol2${channel.guild.id}`)
  let cfxg = await db.fetch(`klog${channel.guild.id}`)
  let cfxh = channel.guild.channels.find('id', cfxg)
  let cfxl = channel.member;
  if (cfxz == 'Kapalı') return;
  if (cfxz == 'Açık') {
    

    
      db.add(`kanaluyari${channel.guild.member(logs.entries.first().executor).id}`, 1)
    
      if (cfxk === null) {
        let cfxu = new Discord.RichEmbed()
                  .setTitle(`**CFX Kanal Koruma Sistemi**`)
        .setColor("#00ff88")
        .setFooter(`CodeFENIX|CFX`)
        .setDescription(`<@${channel.guild.member(logs.entries.first().executor).id}> Kanal Koruma Sistemi Devrede **Sildiği Kanal:** \`${channel.name}\` **Uyarı (1/3)**`)
      cfxh.send(cfxu)
        
      }
    if (cfxk === 1) {
      let cfxu = new Discord.RichEmbed()
                .setTitle(`**CFX Kanal Koruma Sistemi**`)
        .setColor("#00ff88")
        .setFooter(`CodeFENIX|CFX`)
        .setDescription(`<@${channel.guild.member(logs.entries.first().executor).id}> Kanal Koruma Sistemi Devrede. **Sildiği Kanal:** \`${channel.name}\` **Uyarı (2/3)**`)
     cfxh.send(cfxu)
      
    }
    if (cfxk === 2) {

      
    let logs = await channel.guild.fetchAuditLogs({type: 'CHANNEL_DELETE'});
     
    if(logs.entries.first().executor.bot) return;
    if (logs.entries.first().executor.id === "497674151251804160") return;
          if (logs.entries.first().executor.id === "522138336056573972") return;
      
      
    channel.guild.member(logs.entries.first().executor).roles.filter(role => role.name !== "@everyone").array().forEach(role => {
    channel.guild.member(logs.entries.first().executor).removeRole(channel.guild.roles.get(cfxrol))
    channel.guild.member(logs.entries.first().executor).removeRole(channel.guild.roles.get(cfxrol2))
      
    })
  
      db.delete(`kanaluyari${channel.guild.member(logs.entries.first().executor).id}`)
      
    const silen = channel.guild.member(logs.entries.first().executor).user  
    const cfxj = new Discord.RichEmbed()
          .setTitle(`**CFX Kanal Koruma Sistemi**`)
          .setColor("#00ff88")
          .setDescription(`\`${channel.name}\` Adlı Kanal Silindi. Silen: \`${silen.tag}\`, Yetkileri Alındı! **Uyarı(3/3)**`)
          .setFooter(`CodeFENIX|CFX`)

    cfxh.send(cfxj)
      
    }
       
    }   
  
});



// BU KO

*/
//everyone engel
client.on("message", async message => {
  let ever = await db.fetch(`ever_${message.guild.id}`);
  let sayı = await db.fetch(`sayi_${message.author.id}`);
  if (ever === "acik") {
    const a = message.content;
    if (a === "@everyone" || a === "@here") {
      if (message.member.hasPermission("BAN_MEMBERS")) return;
      db.add(`sayi_${message.author.id}`, 1);
      if (sayı == null) {
        const embed = new Discord.RichEmbed()
          .setColor("BLACK")
          .setDescription(
            "(Ever-Engel)Bu 1. uyarın! Lütfen tekrarlama! Aksi taktirde atılacaksın!\n(1/3)"
          )
          .setFooter(client.user.username, client.user.avatarURL);
        message.channel.send(embed);
        message.delete();
        return;
      }
      if (sayı === 1) {
        const embed = new Discord.RichEmbed()
          .setColor("BLACK")
          .setDescription(
            "(Ever-Engel)Bu 2. uyarın! Lütfen tekrarlama! Aksi taktirde atılacaksın!\n(2/3)"
          )
          .setFooter(client.user.username, client.user.avatarURL);
        message.channel.send(embed);
        message.delete();
        return;
      }
      if (sayı > 2) {
        message.delete();
        const embed = new Discord.RichEmbed()
          .setColor("BLACK")
          .setDescription("(Ever-Engel)Sunucudan atılıyorsun!")
          .setFooter(client.user.username, client.user.avatarURL);
        message.channel.send(embed);
        db.delete(`sayi_${message.author.id}`);
        message.member.kick();
        return;
      }
    }
  } else {
    return;
  }
});


//modlog
client.on("channelCreate", async channel => {
  const c = channel.guild.channels.get(
    db.fetch(`codeminglog_${channel.guild.id}`)
  );
  if (!c) return;
  var embed = new Discord.RichEmbed()
    .addField(
      `Kanal oluşturuldu`,
      ` İsmi: \`${channel.name}\`\n Türü: **${channel.type}**\n► ID: ${channel.id}`
    )
    .setTimestamp()
    .setColor("RANDOM")
    .setFooter(
      `${channel.client.user.username}#${channel.client.user.discriminator}`,
      channel.client.user.avatarURL
    );
  c.send(embed);
});

client.on("channelDelete", async channel => {
  const c = channel.guild.channels.get(
    db.fetch(`codeminglog_${channel.guild.id}`)
  );
  if (!c) return;
  let embed = new Discord.RichEmbed()
    .addField(
      `Kanal silindi`,
      ` İsmi: \`${channel.name}\`\n Türü: **${channel.type}**\n��� ID: ${channel.id}`
    )
    .setTimestamp()
    .setColor("RANDOM")
    .setFooter(
      `${channel.client.user.username}#${channel.client.user.discriminator}`,
      channel.client.user.avatarURL
    );

  c.send(embed);
});

client.on("channelNameUpdate", async channel => {
  const c = channel.guild.channels.get(
    db.fetch(`codeminglog_${channel.guild.id}`)
  );
  if (!c) return;
  var embed = new Discord.RichEmbed()
    .addField(
      `Kanal İsmi değiştirildi`,
      ` Yeni İsmi: \`${channel.name}\`\n► ID: ${channel.id}`
    )
    .setTimestamp()
    .setColor("RANDOM")
    .setFooter(
      `${channel.client.user.username}#${channel.client.user.discriminator}`,
      channel.client.user.avatarURL
    );
  c.send(embed);
});

client.on("emojiCreate", emoji => {
  const c = emoji.guild.channels.get(db.fetch(`codeminglog_${emoji.guild.id}`));
  if (!c) return;

  let embed = new Discord.RichEmbed()
    .addField(
      `Emoji oluşturuldu`,
      ` İsmi: \`${emoji.name}\`\n GIF?: **${emoji.animated}**\n► ID: ${emoji.id}`
    )
    .setTimestamp()
    .setColor("RANDOM")
    .setFooter(
      `${emoji.client.user.username}#${emoji.client.user.discriminator}`,
      emoji.client.user.avatarURL
    );

  c.send(embed);
});
client.on("emojiDelete", emoji => {
  const c = emoji.guild.channels.get(db.fetch(`codeminglog_${emoji.guild.id}`));
  if (!c) return;

  let embed = new Discord.RichEmbed()
    .addField(
      `Emoji silindi`,
      ` İsmi: \`${emoji.name}\`\n GIF? : **${emoji.animated}**\n► ID: ${emoji.id}`
    )
    .setTimestamp()
    .setColor("RANDOM")
    .setFooter(
      `${emoji.client.user.username}#${emoji.client.user.discriminator}`,
      emoji.client.user.avatarURL
    );

  c.send(embed);
});
client.on("emojiUpdate", (oldEmoji, newEmoji) => {
  const c = newEmoji.guild.channels.get(
    db.fetch(`codeminglog_${newEmoji.guild.id}`)
  );
  if (!c) return;

  let embed = new Discord.RichEmbed()
    .addField(
      `Emoji güncellendi`,
      ` Eski ismi: \`${oldEmoji.name}\`\n Yeni ismi: \`${newEmoji.name}\`\n► ID: ${oldEmoji.id}`
    )
    .setTimestamp()
    .setColor("RANDOM")
    .setFooter(
      `${newEmoji.client.user.username}#${newEmoji.client.user.discriminator}`,
      newEmoji.client.user.avatarURL
    );

  c.send(embed);
});

client.on("guildBanAdd", async (guild, user) => {
  const channel = guild.channels.get(db.fetch(`codeminglog_${guild.id}`));
  if (!channel) return;

  const entry = await guild
    .fetchAuditLogs({ type: "MEMBER_BAN_ADD" })
    .then(audit => audit.entries.first());

  let embed = new Discord.RichEmbed()
    .setAuthor(`${user.username}#${user.discriminator}`, user.avatarURL)
    .addField(
      `Kullanıcı banlandı`,
      ` İsmi: \`${user.username}\`\n ID: **${
        user.id
      }**\n Sebep: **${entry.reason || "Belirtmedi"}**\n Banlayan: **${
        entry.executor.username
      }#${entry.executor.discriminator}**`
    )
    .setTimestamp()
    .setColor("RANDOM")
    .setFooter(
      `${entry.executor.username}#${entry.executor.discriminator} tarafından`,
      entry.executor.avatarURL
    );

  channel.send(embed);
});

client.on("guildBanRemove", async (guild, user) => {
  const channel = guild.channels.get(db.fetch(`codeminglog_${guild.id}`));
  if (!channel) return;

  const entry = await guild
    .fetchAuditLogs({ type: "MEMBER_BAN_ADD" })
    .then(audit => audit.entries.first());

  let embed = new Discord.RichEmbed()
    .setAuthor(`${user.username}#${user.discriminator}`, user.avatarURL)
    .addField(
      `Kullanıcının banı açıldı`,
      ` İsmi: \`${user.username}\`\n ID: **${user.id}**\n Banı Kaldıran: **${entry.executor.username}#${entry.executor.discriminator}**`
    )
    .setTimestamp()
    .setColor("RANDOM")
    .setFooter(
      `${entry.executor.username}#${entry.executor.discriminator} tarafından`,
      entry.executor.avatarURL
    );

  channel.send(embed);
});
client.on("messageDelete", async message => {
  if (message.author.bot) return;

  const channel = message.guild.channels.get(
    db.fetch(`codeminglog_${message.guild.id}`)
  );
  if (!channel) return;

  let embed = new Discord.RichEmbed()
    .setAuthor(
      `${message.author.username}#${message.author.discriminator}`,
      message.author.avatarURL
    )
    .setTitle("Mesaj silindi")
    .addField(
      `Silinen mesaj : ${message.content}`,
      `Kanal: ${message.channel.name}`
    )
    //  .addField(`Kanal:`,`${message.channel.name}`)
    .setTimestamp()
    .setColor("RANDOM")
    .setFooter(
      `${message.client.user.username}#${message.client.user.discriminator}`,
      message.client.user.avatarURL
    );

  channel.send(embed);
});

client.on("messageUpdate", async (oldMessage, newMessage) => {
  if (oldMessage.author.bot) return;
  if (oldMessage.content == newMessage.content) return;

  const channel = oldMessage.guild.channels.get(
    db.fetch(`codeminglog_${oldMessage.guild.id}`)
  );
  if (!channel) return;

  let embed = new Discord.RichEmbed()
    .setTitle("Mesaj güncellendi!")
    .addField("Eski mesaj : ", `${oldMessage.content}`)
    .addField("Yeni mesaj : ", `${newMessage.content}`)
    .addField("Kanal : ", `${oldMessage.channel.name}`)
    .setTimestamp()
    .setColor("RANDOM")
    .setFooter(
      `${oldMessage.client.user.username}#${oldMessage.client.user.discriminator}`,
      `${oldMessage.client.user.avatarURL}`
    );

  channel.send(embed);
});

client.on("roleCreate", async role => {
  const channel = role.guild.channels.get(
    db.fetch(`codeminglog_${role.guild.id}`)
  );
  if (!channel) return;

  let embed = new Discord.RichEmbed()
    .addField(`Rol oluşturuldu`, ` ismi: \`${role.name}\`\n ID: ${role.id}`)
    .setTimestamp()
    .setColor("RANDOM")
    .addField("Rol renk kodu : ", `${role.hexColor}`)
    .setFooter(
      `${role.client.user.username}#${role.client.user.discriminator}`,
      role.client.user.avatarURL
    );

  channel.send(embed);
});

client.on("roleDelete", async role => {
  const channel = role.guild.channels.get(
    db.fetch(`codeminglog_${role.guild.id}`)
  );
  if (!channel) return;

  let embed = new Discord.RichEmbed()
    .addField(`Rol silindi`, ` ismi: \`${role.name}\`\n ID: ${role.id}`)
    .setTimestamp()
    .setColor("RANDOM")
    .addField("Rol renk kodu : ", `${role.hexColor}`)
    .setFooter(
      `${role.client.user.username}#${role.client.user.discriminator}`,
      role.client.user.avatarURL
    );

  channel.send(embed);
});
client.on("voiceStateUpdate", (oldMember, newMember) => {
  // if (!logA[oldMember.guild.id]) return;

  if (db.has(`codeminglog_${oldMember.guild.id}`) === false) return;

  var kanal = oldMember.guild.channels.get(
    db
      .fetch(`codeminglog_${oldMember.guild.id}`)
      .replace("<#", "")
      .replace(">", "")
  );
  if (!kanal) return;

  let newUserChannel = newMember.voiceChannel;
  let oldUserChannel = oldMember.voiceChannel;

  if (oldUserChannel === undefined && newUserChannel !== undefined) {
    const embed = new Discord.RichEmbed()
      .setColor("RANDOM")
      .setDescription(
        `${newMember.user.tag} adlı kullanıcı \`${newUserChannel.name}\` isimli sesli kanala giriş yaptı!`
      );
    kanal.send(embed);
  } else if (newUserChannel === undefined) {
    const embed = new Discord.RichEmbed()
      .setColor("RANDOM")
      .setDescription(
        `${newMember.user.tag} adlı kullanıcı sesli kanaldan çıkış yaptı!`
      );
    kanal.send(embed);
  }
});
//Grçicioda
client.on("voiceStateUpdate", async (oldMember, newMember) => {
  if (!db.fetch(`geciciKanal_${newMember.guild.id}`))
    if (!db.fetch(`geciciKategori_${newMember.guild.id}`)) return;
  let Old = oldMember;
  let newUserChannel = newMember.voiceChannel;
  let oldUserChannel = oldMember.voiceChannel;
  if (newMember.user.bot) return;
  if (oldMember.user.bot) return;

  if (
    newMember.voiceChannelID == db.fetch(`geciciKanal_${newMember.guild.id}`)
  ) {
    newMember.guild
      .createChannel("🔒 |" + newMember.user.username, "voice")
      .then(async ü => {
        ü.setParent(db.fetch(`geciciKategori_${newMember.guild.id}`));
        newMember.setVoiceChannel(ü.id);
        db.set(`geciciKanalK_${newMember.id}`, ü.id);
      });
  }

  if (oldUserChannel) {
    Old.guild.channels.forEach(channels => {
      if (channels.id == db.fetch(`geciciKanal_${oldMember.guild.id}`)) return;
      if (
        channels.parentID == db.fetch(`geciciKategori_${oldMember.guild.id}`)
      ) {
        if (channels.id == db.fetch(`geciciKanalK_${oldMember.id}`)) {
          setTimeout(() => {
            if (
              !oldMember.voiceChannel.id ==
              db.fetch(`geciciKanalK_${oldMember.id}`)
            )
              return;
            if (oldMember.voiceChannel.members.size == 0) {
              db.delete(`geciciKanalK_${oldMember.id}`);
              return channels.delete();
            }
          }, 5000);
        }
      }
    });
  }
});
//güvenlik

client.on("guildMemberAdd", async member => {
  let user = client.users.get(member.id);
  let kanal = client.channels.get(db.fetch(`guvenlik${member.guild.id}`));
  const Canvas = require("canvas");
  const canvas = Canvas.createCanvas(360, 100);
  const ctx = canvas.getContext("2d");

  const resim1 = await Canvas.loadImage(
    "https://cdn.discordapp.com/attachments/597433546868654106/627428441695977497/gvnlk-spheli.png"
  );
  const resim2 = await Canvas.loadImage(
    "https://cdn.discordapp.com/attachments/597433546868654106/627427731407241226/gvnlk-gvnli.png"
  );
  const kurulus = new Date().getTime() - user.createdAt.getTime();
  const gün = moment(kurulus).format("dddd");
  var kontrol;
  if (kurulus > 2629800000) kontrol = resim2;
  if (kurulus < 2629800000) kontrol = resim1;

  const background = await Canvas.loadImage(
    "https://cdn.discordapp.com/attachments/597433546868654106/627425996454232064/gvnlk-arka.png"
  );
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

  const avatar = await Canvas.loadImage(member.user.displayAvatarURL);
  ctx.drawImage(kontrol, 0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.lineWidth = 4;
  ctx.fill();
  ctx.lineWidth = 4;
  ctx.arc(180, 46, 36, 0, 2 * Math.PI);
  ctx.clip();
  ctx.drawImage(avatar, 143, 10, 73, 72);

  if (!kanal) return;
  const attachment = new Discord.Attachment(canvas.toBuffer(), "güvenlik.png");
  kanal.send(attachment);
});

//Gkanal
client.on("guildMemberAdd", async member => {
  let gelen = await db.fetch(`pasabilal${member.guild.id}`);
  let giriş = member.guild.channels.find("id", gelen);

  const ca = member.user.displayAvatarURL;
  var { createCanvas, loadImage } = require("canvas");
  var canvas = createCanvas(900, 450);
  var mlynstax = canvas.getContext("2d");
  loadImage(cassieload.bursa).then(bursa => {
    loadImage(ca).then(caa => {
      mlynstax.drawImage(bursa, 0, 0, 900, 450);
      mlynstax.drawImage(caa, 350, 130, 200, 200);
      mlynstax.beginPath();
      mlynstax.beginPath();
      mlynstax.fillStyle = `#03fcfc`;
      mlynstax.font = "50px Oswald";
      mlynstax.textAlign = "left";
      mlynstax.fillText(`${member.user.tag}`, 280, 400);

      giriş.send(new Discord.Attachment(canvas.toBuffer(), "girdinbro.png"));
    });
  });
});

client.on("guildMemberRemove", async member => {
  let siddetehayır = await db.fetch(`pasabilal${member.guild.id}`);

  let lordumut = member.guild.channels.find("id", siddetehayır);

  const ca = member.user.displayAvatarURL;
  var { createCanvas, loadImage } = require("canvas");
  var canvas = createCanvas(900, 450);
  var mlynstax = canvas.getContext("2d");
  loadImage(cassieload.adana).then(adana => {
    loadImage(ca).then(caa => {
      mlynstax.drawImage(adana, 0, 0, 900, 450);
      mlynstax.drawImage(caa, 350, 130, 200, 200);
      mlynstax.beginPath();
      mlynstax.beginPath();
      mlynstax.fillStyle = `#03fcfc`;
      mlynstax.font = "50px Oswald";
      mlynstax.textAlign = "left";
      mlynstax.fillText(`${member.user.tag}`, 280, 400);

      lordumut.send(new Discord.Attachment(canvas.toBuffer(), "cıktınbro.png"));
    });
  });
});

var cassieload = {
  adana:
    "https://cdn.discordapp.com/attachments/676052036734812170/676063512753340426/download.gif",
  bursa:
    "https://cdn.discordapp.com/attachments/676052036734812170/676062624336838676/download.gif"
};

//fake ayrıl katıl
client.on("message", async message => {
  if (message.content === "k!fakegir") {
    // - yerine prefixi yaz
    client.emit(
      "guildMemberAdd",
      message.member || (await message.guild.fetchMember(message.author))
    );
  }
});
client.on("message", async message => {
  if (message.content === "k!fakeçık") {
    // - yerine prefixi yaz
    client.emit(
      "guildMemberRemove",
      message.member || (await message.guild.fetchMember(message.author))
    );
  }
});
//Saldırı Koruma
client.on("message", message => {
  var antiraid = db.fetch(`sunucular.${message.guild.id}.spamkoruma`);
  if (!antiraid) return;
  if (message.author.bot) return;
  message.guild.fetchMember(message.author).then(member => {
    if (member.hasPermission("BAN_MEMBERS")) return;
    var b = [];
    var aut = [];
    setTimeout(() => {
      message.channel.fetchMessages({ limit: 10 }).then(m => {
        m.forEach(a => {
          if (m.filter(v => v.content === a.content).size > m.size / 2) {
            message.guild.fetchMember(m.author).then(member2 => {
              if (member2.hasPermission("BAN_MEMBERS")) return;
              b.push(a);
              aut.push(a.author);
            });
          }
        });
        if (!b.includes(":warning: | Saldırgan botlar susturulacak.")) {
          işlem();
        } else {
        }

        function işlem() {
          if (b.length > 5) {
            message.channel.send(":warning: | Saldırgan botlar susturulacak.");
            aut.forEach(a => {
              message.channel.overwritePermissions(a, {
                SEND_MESSAGES: false
              });
            });
            message.channel.send(
              client.emojiler.evet + " | Saldırgan botlar susturuldu."
            );
          } else return;
        }
      });
    });
  });
});
//KanalKoruma
client.on("channelDelete", async function(channel) {
  let logs = await channel.guild.fetchAuditLogs({ type: "CHANNEL_DELETE" });
  let cfxz = await db.fetch(`kanalkoruma${channel.guild.id}`);
  let cfxk = await db.fetch(
    `kanaluyari${channel.guild.member(logs.entries.first().executor).id}`
  );
  let cfxrol = await db.fetch(`cfxrol${channel.guild.id}`);
  let cfxrol2 = await db.fetch(`cfxrol2${channel.guild.id}`);
  let cfxg = await db.fetch(`klog${channel.guild.id}`);
  let cfxh = channel.guild.channels.find("id", cfxg);
  let cfxl = channel.member;
  if (cfxz == "Kapalı") return;
  if (cfxz == "Açık") {
    db.add(
      `kanaluyari${channel.guild.member(logs.entries.first().executor).id}`,
      1
    );

    if (cfxk === null) {
      let cfxu = new Discord.RichEmbed()
        .setTitle(`**KU-Pİ Kanal Koruma Sistemi**`)
        .setColor("#00ff88")
        .setFooter(`KU-Pİ|KANALKORUMA`)
        .setDescription(
          `<@${
            channel.guild.member(logs.entries.first().executor).id
          }> Kanal Koruma Sistemi Devrede **Sildiği Kanal:** \`${
            channel.name
          }\` **Uyarı (1/3)**`
        );
      cfxh.send(cfxu);
    }
    if (cfxk === 1) {
      let cfxu = new Discord.RichEmbed()
        .setTitle(`**KU-Pİ Kanal Koruma Sistemi**`)
        .setColor("#00ff88")
        .setFooter(`KU-Pİ|KANALKORUMA`)
        .setDescription(
          `<@${
            channel.guild.member(logs.entries.first().executor).id
          }> Kanal Koruma Sistemi Devrede. **Sildiği Kanal:** \`${
            channel.name
          }\` **Uyarı (2/3)**`
        );
      cfxh.send(cfxu);
    }
    if (cfxk === 2) {
      let logs = await channel.guild.fetchAuditLogs({ type: "CHANNEL_DELETE" });

      if (logs.entries.first().executor.bot) return;
      if (logs.entries.first().executor.id === "497674151251804160") return;
      if (logs.entries.first().executor.id === "522138336056573972") return;

      channel.guild
        .member(logs.entries.first().executor)
        .roles.filter(role => role.name !== "@everyone")
        .array()
        .forEach(role => {
          channel.guild
            .member(logs.entries.first().executor)
            .removeRole(channel.guild.roles.get(cfxrol));
          channel.guild
            .member(logs.entries.first().executor)
            .removeRole(channel.guild.roles.get(cfxrol2));
        });

      db.delete(
        `kanaluyari${channel.guild.member(logs.entries.first().executor).id}`
      );

      const silen = channel.guild.member(logs.entries.first().executor).user;
      const cfxj = new Discord.RichEmbed()
        .setTitle(`**KU-Pİ Kanal Koruma Sistemi**`)
        .setColor("#00ff88")
        .setDescription(
          `\`${channel.name}\` Adlı Kanal Silindi. Silen: \`${silen.tag}\`, Yetkileri Alındı! **Uyarı(3/3)**`
        )
        .setFooter(`KU-Pİ|KANALKORUMA`);

      cfxh.send(cfxj);
    }
  }
});

// BU KO

const invites = {};

const wait = require("util").promisify(setTimeout);

client.on("ready", () => {
  wait(1000);

  client.guilds.forEach(g => {
    g.fetchInvites().then(guildInvites => {
      invites[g.id] = guildInvites;
    });
  });
});

client.on("guildMemberAdd", member => {
  try {
    if (db.has(`dKanal_${member.guild.id}`) === true) {
      member.guild.fetchInvites().then(guildInvites => {
        if (member.user.bot) return;
        const ei = invites[member.guild.id];

        invites[member.guild.id] = guildInvites;

        const invite = guildInvites.find(i => ei.get(i.code).uses < i.uses);

        const inviter = client.users.get(invite.inviter.id);

        const kanal = member.guild.channels.get(
          db.fetch(`dKanal_${member.guild.id}`)
        );

        kanal.send(
          `\`${member.user.tag}\` adlı kullanıcı \`${inviter.tag}\` adlı kullanıcının ${invite.code} linkine sahip daveti ile sunucuya katıldı!`
        );
      });
    } else {
      return;
    }
  } catch (err) {
    return;
  }
});

client.on("message", async message => {
  if (!message.guild) return;
  let prefixyeni =
    db.fetch(`prefix_${message.guild.id}`) || client.ayarlar.prefix;
  let afk_kullanici = message.mentions.users.first() || message.author;
  if (message.content.startsWith(prefixyeni + "afk")) return;
  if (message.author.bot === true) return;
  if (message.content.includes(`<@${afk_kullanici.id}>`))
    if (db.has(`afks_${afk_kullanici.id}`)) {
      message.channel.send(
        `**${
          client.users.get(afk_kullanici.id).tag
        }** adlı kullanıcı şuanda AFK! \n**Sebep:** \n${db.fetch(
          `afks_${afk_kullanici.id}`
        )}`
      );
    }

  if (db.has(`afks_${message.author.id}`)) {
    message.reply("başarıyla AFK modundan çıktın!");
    db.delete(`afks_${message.author.id}`);
  }

  if (!message.guild) return;

  let prefix =
    (await db.fetch(`prefix_${message.guild.id}`)) || client.ayarlar.prefix;

  if (message.author.bot) return;

  if (message.content === `<@${client.user.id}>`) {
    message.channel.send(``);
  }

  if (message.content === `<@${client.user.id}> ${message.content}`) {
    message.channel.send(``);
  }
});    

client.on("message", async msg => {
  const prefix =
    (await db.fetch(`prefix_${msg.guild.id}`)) || client.ayarlar.prefix;
  //const args = msg.content.slice.split(' ');
  const args = msg.content.trim().split(/ +/g);
  const fAK = await db.fetch(`filtreAK_${msg.guild.id}`);
  let mesaj = args.slice(1).join(" ");
  const filtre = await db.fetch(`filtre_${msg.guild.id}`);

  if (fAK == "açık") {
    const fltr = filtre;
    if (fltr.some(word => msg.content.includes(word))) {
      if (!msg.member.hasPermission("ADMINISTRATOR")) {
        msg.delete();

        var k = new Discord.RichEmbed()
          .setColor("RANDOM")
          .setAuthor("Filtre Sistemi")
          .setDescription(
            `Bu sunucuda yasaklanmış bir kelimeyi kullandınız, bu yüzden mesajınızı sildim.`
          );
        msg.channel.send(k).then(message => message.delete(5000));

        return;
      }
    }
  }

  if (!msg.guild) return;

  if (msg.author.bot) return;

  if (db.has(`capsE_${msg.guild.id}`) === true) {
    let x = /\w*[A-Z]\w*[A-Z]\w*/g;
    if (msg.content.match(x)) {
      if (mesaj.member.permissions.has("ADMINISTRATOR") === true) return;
      msg.delete();
      let y = await msg.reply(
        `Bu sunucuda büyük harf engeli açık, bu yüzden büyük harf açıkken yazı yazamazsın!`
      );
      y.delete(5000);
      return;
    }
  }

  if (!msg.guild) return;

  if (db.has(`küfürE_${msg.guild.id}`) === true) {
    const kufur = new RegExp(
      /(göt|amk|aq|orospu|oruspu|oç|oc|sik|fuck|yarrak|piç|amq|amcık|çocu|sex|seks|amına|sg|siktir git)/
    );
    if (kufur.test(msg.content) == true) {
      if (!msg.member.hasPermission("ADMINISTRATOR")) {
        msg.delete();
        msg.channel
          .send(`<@${msg.author.id}>`)
          .then(message => message.delete(5000));
        var k = new Discord.RichEmbed()
          .setColor("RANDOM")
          .setAuthor("Küfür Engeli!")
          .setDescription(
            `Bu sunucuda küfürler **${client.user.username}** tarafından engellenmektedir! Küfür etmene izin vermeyeceğim!`
          );
        msg.channel.send(k).then(message => message.delete(5000));
      }
    }
  }

  if (db.has(`linkE_${msg.guild.id}`) === true) {
    const reklam = new RegExp(
      /(com|.com|www|dicord.gg|.tk|.pw|https:|http:|.info|.cf|gg|.net|.me|www.|WWW.|.COM|.NET|.TK|DİSCORD.GG|.PW)/
    );
    if (reklam.test(msg.content) == true) {
      if (!msg.member.hasPermission("ADMINISTRATOR")) {
        msg.delete();
        msg.channel
          .send(`<@${msg.author.id}>`)
          .then(message => message.delete(5000));
        var ke = new Discord.RichEmbed()
          .setColor("RANDOM")
          .setAuthor("link Engeli!")
          .setDescription(
            `Bu sunucuda linkler **${client.user.username}** tarafından engellenmektedir! Reklam yapmana izin vermeyeceğim!`
          );
        msg.channel.send(ke).then(message => message.delete(5000));
      }
    }
  }
});

client.on("messageUpdate", async msg => {
  const prefix =
    (await db.fetch(`prefix_${msg.guild.id}`)) || client.ayarlar.prefix;
  //const args = msg.content.slice.split(' ');
  const args = msg.content.trim().split(/ +/g);
  const fAK = await db.fetch(`filtreAK_${msg.guild.id}`);
  let mesaj = args.slice(1).join(" ");
  const filtre = await db.fetch(`filtre_${msg.guild.id}`);

  if (fAK == "açık") {
    const fltr = filtre;
    if (fltr.some(word => msg.content.includes(word))) {
      if (!msg.member.hasPermission("ADMINISTRATOR")) {
        msg.delete();

        var k = new Discord.RichEmbed()
          .setColor("RANDOM")
          .setAuthor("Filtre Sistemi")
          .setDescription(
            `Bu sunucuda yasaklanmış bir kelimeyi kullandınız, bu yüzden mesajınızı sildim.`
          );
        msg.channel.send(k).then(message => message.delete(5000));

        return;
      }
    }
  }

  if (!msg.guild) return;

  if (msg.author.bot) return;

  if (db.has(`capsE_${msg.guild.id}`) === true) {
    let x = /\w*[A-Z]\w*[A-Z]\w*/g;
    if (msg.content.match(x)) {
      if (mesaj.member.permissions.has("ADMINISTRATOR") === true) return;
      msg.delete();
      let y = await msg.reply(
        `Bu sunucuda büyük harf engeli açık, bu yüzden büyük harf açıkken yazı yazamazsın!`
      );
      y.delete(5000);
      return;
    }
  }

  if (!msg.guild) return;

  if (db.has(`küfürE_${msg.guild.id}`) === true) {
    const kufur = new RegExp(
      /(göt|amk|aq|orospu|oruspu|oç|oc|sik|fuck|yarrak|piç|amq|amcık|çocu|sex|seks|amına|sg|siktir git)/
    );
    if (kufur.test(msg.content) == true) {
      if (!msg.member.hasPermission("ADMINISTRATOR")) {
        msg.delete();
        msg.channel
          .send(`<@${msg.author.id}>`)
          .then(message => message.delete(5000));
        var k = new Discord.RichEmbed()
          .setColor("RANDOM")
          .setAuthor("Küfür Engeli!")
          .setDescription(
            `Bu sunucuda küfürler **${client.user.username}** tarafından engellenmektedir! Küfür etmene izin vermeyeceğim!`
          );
        msg.channel.send(k).then(message => message.delete(5000));
      }
    }
  }

  if (db.has(`linkE_${msg.guild.id}`) === true) {
    const reklam = new RegExp(
      /(com|.com|www|dicord.gg|.tk|.pw|https:|http:|.info|.cf|gg|.net|.me|www.|WWW.|.COM|.NET|.TK|DİSCORD.GG|.PW)/
    );
    if (reklam.test(msg.content) == true) {
      if (!msg.member.hasPermission("ADMINISTRATOR")) {
        msg.delete();
        msg.channel
          .send(`<@${msg.author.id}>`)
          .then(message => message.delete(5000));
        var ke = new Discord.RichEmbed()
          .setColor("RANDOM")
          .setAuthor("link Engeli!")
          .setDescription(
            `Bu sunucuda linkler **${client.user.username}** tarafından engellenmektedir! Reklam yapmana izin vermeyeceğim!`
          );
        msg.channel.send(ke).then(message => message.delete(5000));
      }
    }
  }
});

client.on("message", async message => {
  if (!message.guild) return;

  if (db.has(`sayac_${message.guild.id}`) === true) {
    if (db.fetch(`sayac_${message.guild.id}`) <= message.guild.members.size) {
      const embed = new Discord.RichEmbed()
        .setTitle(`Tebrikler ${message.guild.name}!`)
        .setDescription(
          `Başarıyla \`${db.fetch(
            `sayac_${message.guild.id}`
          )}\` kullanıcıya ulaştık! Sayaç sıfırlandı!`
        )
        .setColor("RANDOM");
      message.channel.send({ embed });
      message.guild.owner.send({ embed });
      db.delete(`sayac_${message.guild.id}`);
    }
  }
});

client.on("guildMemberRemove", async member => {
  if (db.has(`sayac_${member.guild.id}`) === false) return;
  if (db.has(`sKanal_${member.guild.id}`) === false) return;
  const channel = db.fetch(`sKanal_${member.guild.id}`);
  member.guild.channels
    .get(channel)
    .send(
      `**${member.user.tag}** Sunucudan ayrıldı! \`${db.fetch(
        `sayac_${member.guild.id}`
      )}\` üye olmamıza son \`${db.fetch(`sayac_${member.guild.id}`) -
        member.guild.members.size}\` üye kaldı!`
    );
});

//let ot = JSON.parse(fs.readFileSync("./jsonlar/otoR.json", "utf8"));

client.on("guildMemberAdd", async member => {
  if (!member.guild) return;

  let prefix =
    (await db.fetch(`prefix_${member.guild.id}`)) || client.ayarlar.prefix;

  if (db.has(`gc_${member.guild.id}`) === false) return;

  const hgK = await db.fetch(`gc_${member.guild.id}`);
  if (!hgK) return;

  const giris = db.fetch(`girisM_${member.guild.id}`);

  member.guild.channels.get(hgK).send(
    db.has(`girisM_${member.guild.id}`)
      ? giris
          .replace("{kullanıcı}", `<@${member.user.id}>`)
          .replace("{user}", `<@${member.user.id}>`)
          .replace("{sunucu}", `**${member.guild.name}**`)
          .replace("{kişisayısı}", `**${member.guild.members.size}**`)
      : `<@${member.user.id}> Katıldı! **${client.ayarlar.webpanel}** adresinden veya (\`giriş-mesaj-ayarla\` komutu ile mesajı değiştirilebilir.)`
  );
});

client.on("guildMemberRemove", async member => {
  if (!member.guild) return;

  let prefix =
    (await db.fetch(`prefix_${member.guild.id}`)) || client.ayarlar.prefix;

  if (db.has(`gc_${member.guild.id}`) === false) return;

  const hgK = await db.fetch(`gc_${member.guild.id}`);
  if (!hgK) return;

  const cikis = db.fetch(`cikisM_${member.guild.id}`);

  member.guild.channels.get(hgK).send(
    db.has(`cikisM_${member.guild.id}`)
      ? cikis
          .replace("{kullanıcı}", `**${member.user.username}**`)
          .replace("{user}", `**${member.user.username}**`)
          .replace("{sunucu}", `**${member.guild.name}**`)
          .replace("{kişisayısı}", `**${member.guild.members.size}**`)
      : `**${member.user.username}** Ayrıldı! **${client.ayarlar.webpanel}** adresinden veya (\`çıkış-mesaj-ayarla\` komutu ile mesaj değiştirilebilir.)`
  );
});

const YouTube = require("simple-youtube-api");
const ytdl = require("ytdl-core");
const youtube = new YouTube("AIzaSyBoLU_1TbFFT_AaHI9ssQ1FqvThjfvc-W4");
const queue = new Map();

client.on("message", async message => {
  if (!message.guild) return;

  let prefix = (await db.fetch(`prefix_${message.guild.id}`)) || "k!";

  var args = message.content.substring(prefix.length).split(" ");
  if (!message.content.startsWith(prefix)) return;
  var searchString = args.slice(1).join(" ");
  var url = args[1] ? args[1].replace(/<(.+)>/g, "$1") : "";
  var serverQueue = queue.get(message.guild.id);
  /*
   var voiceChannel = message.member.voiceChannel;
    if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
      var playlist = await youtube.getPlaylist(url);
      var videos = await playlist.getVideos();
      for (const video of Object.values(videos)) {
        var video2 = await youtube.getVideoByID(video.id);
        await handleVideo(video2, message, voiceChannel, true);
      }
  
  */
  switch (args[0].toLowerCase()) {
    case "oynat":
      var voiceChannel = message.member.voiceChannel;

      const embed = new RichEmbed()
        .setColor("RANDOM")
        .setDescription(
          "Dinlemek istediğin şarkıyı yazmalısın! (Şarkı ismi veya Youtube URLsi)"
        );
      if (!url) return message.channel.send(embed);

      const voiceChannelAdd = new RichEmbed()
        .setColor("RANDOM")
        .setDescription(`Lütfen herhangi bir sesli kanala katılınız.`);
      if (!voiceChannel) return message.channel.send(voiceChannelAdd);
      var permissions = voiceChannel.permissionsFor(message.client.user);
      if (!permissions.has("CONNECT")) {
        const warningErr = new RichEmbed()
          .setColor("RANDOM")
          .setDescription(
            `Herhangi bir sesli kanala katılabilmek için yeterli iznim yok.`
          );
        return message.channel.send(warningErr);
      }
      if (!permissions.has("SPEAK")) {
        const musicErr = new RichEmbed()
          .setColor("RANDOM")
          .setDescription(
            `Müzik açamıyorum/şarkı çalamıyorum çünkü kanalda konuşma iznim yok veya mikrofonum kapalı.`
          );
        return message.channel.send(musicErr);
      }
      if (
        url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)
      ) {
        var playlist = await youtube.getPlaylist(url);
        var videos = await playlist.getVideos();
        for (const video of Object.values(videos)) {
          var video2 = await youtube.getVideoByID(video.id);
          await handleVideo(video2, message, voiceChannel, true);
        }
        const PlayingListAdd = new RichEmbed()
          .setColor("RANDOM")
          .setDescription(
            `[${playlist.title}](https://www.youtube.com/watch?v=${playlist.id}) İsimli şarkı oynatma listesine Eklendi.`
          );
        return message.channel.send(PlayingListAdd);
      } else {
        try {
          var video = await youtube.getVideo(url);
        } catch (error) {
          try {
            var videos = await youtube.searchVideos(searchString, 10);

            var r = 1;

            var video = await youtube.getVideoByID(videos[r - 1].id);
          } catch (err) {
            console.error(err);
            const songNope = new RichEmbed()
              .setColor("RANDOM")
              .setDescription(`Aradığınız isimde bir şarkı bulamadım.`);
            return message.channel.send(songNope);
          }
        }
        return handleVideo(video, message, voiceChannel);
      }
      break;
    case "tekrar":
      const e = new RichEmbed()
        .setColor("RANDOM")
        .setDescription(`Bir sesli kanalda değilsin.`);
      if (!message.member.voiceChannel) return message.channel.send(e);
      const p = new RichEmbed()
        .setColor("RANDOM")
        .setDescription(`Şuanda herhangi bir şarkı çalmıyor.`);
      if (!serverQueue) return message.channel.send(p);

      var u = serverQueue.songs[0];

      /*var pla = await youtube.getPlaylist(u);
      var v = await pla.getVideos();*/
      var vi2 = await youtube.getVideoByID(u.id);
      await handleVideo(vi2, message, voiceChannel, true);
      const PlayingListAdd = new RichEmbed()
        .setColor("RANDOM")
        .setDescription(
          `[${u.title}](https://www.youtube.com/watch?v=${u.id}) İsimli şarkı bitince tekrar oynatılacak.`
        );
      return message.channel.send(PlayingListAdd);

      break;
    case "geç":
      const err0 = new RichEmbed()
        .setColor("RANDOM")
        .setDescription(`Bir sesli kanalda değilsin.`);
      if (!message.member.voiceChannel) return message.channel.send(err0);
      const err05 = new RichEmbed()
        .setColor("RANDOM")
        .setDescription(`Şuanda herhangi bir şarkı çalmıyor.`);
      if (!serverQueue) return message.channel.send(err05);
      const songSkip = new RichEmbed()
        .setColor("RANDOM")
        .setDescription(`Şarkı başarıyla geçildi!`);
      serverQueue.connection.dispatcher.end("");
      message.channel.send(songSkip);
      return undefined;
      break;
    case "durdur":
      const err1 = new RichEmbed()
        .setColor("RANDOM")
        .setDescription(`Bir sesli kanalda değilsin.`);
      if (!message.member.voiceChannel) return message.channel.send(err1);
      const err2 = new RichEmbed()
        .setColor("RANDOM")
        .setDescription(`Şuanda herhangi bir şarkı çalmıyor.`);
      if (!serverQueue) return message.channel.send(err2);
      serverQueue.songs = [];
      const songEnd = new RichEmbed()
        .setColor("RANDOM")
        .setDescription(`Şarkı başarıyla durduruldu ve odadan ayrıldım!`);
      serverQueue.connection.dispatcher.end("");
      message.channel.send(songEnd);
      return undefined;
      break;
    case "ses":
      const asd1 = new RichEmbed()
        .setColor("RANDOM")
        .setDescription(`Bir sesli kanalda değilsin.`);
      if (!message.member.voiceChannel) return message.channel.send(asd1);
      const asd2 = new RichEmbed()
        .setColor("RANDOM")
        .setDescription(`Şuanda herhangi bir şarkı çalmıyor.`);
      if (!serverQueue) return message.channel.send(asd2);

      if (!args[1])
        return message.reply("Ses seviyesi ayarlamak için bir sayı yaz!");
      serverQueue.volume = args[1];
      if (args[1] > 10)
        return message.channel.send(
          `Ses seviyesi en fazla \`10\` olarak ayarlanabilir.`
        );
      serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 5);
      const volumeLevelEdit = new RichEmbed()
        .setColor("RANDOM")
        .setDescription(`Ayarlanan Ses Seviyesi: **${args[1]}**`);
      return message.channel.send(volumeLevelEdit);
      break;
    case "kuyruk":
      var siralama = 0;
      const a = new RichEmbed()
        .setColor("RANDOM")
        .setDescription(`Bir sesli kanalda değilsin.`);
      if (!message.member.voiceChannel) return message.channel.send(a);
      const b = new RichEmbed()
        .setColor("RANDOM")
        .setDescription(`Şuanda herhangi bir şarkı çalmıyor.`);
      if (!serverQueue) return message.channel.send(b);

      var k = serverQueue.songs
        .map(
          song =>
            `${++siralama} - [${song.title}](https://www.youtube.com/watch?v=${
              song.id
            })`
        )
        .join("\n")
        .replace(
          serverQueue.songs[0].title,
          `**${serverQueue.songs[0].title}**`
        );

      const kuyruk = new Discord.RichEmbed()
        .setColor("RANDOM")
        .addField("Şarkı Kuyruğu", k);
      return message.channel.send(kuyruk);
      break;
    case "duraklat":
      if (serverQueue && serverQueue.playing) {
        serverQueue.playing = false;
        serverQueue.connection.dispatcher.pause();
        const asjdhsaasjdha = new RichEmbed()
          .setColor("RANDOM")
          .setDescription(`Şarkı başarıyla duraklatıldı!`);
        return message.channel.send(asjdhsaasjdha);
      }
      return message.channel.send("Şuanda herhangi bir şarkı çalmıyor.");
      break;
    case "devamet":
      if (serverQueue && !serverQueue.playing) {
        serverQueue.playing = true;
        serverQueue.connection.dispatcher.resume();
        const asjdhsaasjdhaadssad = new RichEmbed()
          .setColor("RANDOM")
          .setDescription(`Şarkı başarıyla devam ettiriliyor...`);
        return message.channel.send(asjdhsaasjdhaadssad);
      }
      return message.channel.send("Şuanda herhangi bir şarkı çalmıyor.");

      return undefined;
      break;
  }
  async function handleVideo(video, message, voiceChannel, playlist = false) {
    var serverQueue = queue.get(message.guild.id);
    //console.log(video);
    var song = {
      id: video.id,
      title: video.title,
      durationh: video.duration.hours,
      durationm: video.duration.minutes,
      durations: video.duration.seconds,
      url: `https://www.youtube.com/watch?v=${video.id}`,
      thumbnail: `https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`,
      requester: message.author.id
    };
    if (!serverQueue) {
      var queueConstruct = {
        textChannel: message.channel,
        voiceChannel: voiceChannel,
        connection: null,
        songs: [],
        volume: 3,
        playing: true
      };
      queue.set(message.guild.id, queueConstruct);

      queueConstruct.songs.push(song);

      try {
        var connection = await voiceChannel.join();
        queueConstruct.connection = connection;
        play(message.guild, queueConstruct.songs[0]);
      } catch (error) {
        console.error(`Ses kanalına giremedim HATA: ${error}`);
        queue.delete(message.guild.id);
        return message.channel.send(`Ses kanalına giremedim HATA: ${error}`);
      }
    } else {
      serverQueue.songs.push(song);
      //console.log(serverQueue.songs);
      if (playlist) return undefined;

      const songListBed = new RichEmbed()
        .setColor("RANDOM")
        .setDescription(
          `[${song.title}](https://www.youtube.com/watch?v=${song.id}) isimli şarkı kuyruğa eklendi!`
        );
      return message.channel.send(songListBed);
    }
    return undefined;
  }
  function play(guild, song) {
    var serverQueue = queue.get(guild.id);

    if (!song) {
      serverQueue.voiceChannel.leave();
      voiceChannel.leave();
      queue.delete(guild.id);
      return;
    }
    //console.log(serverQueue.songs);

    const dispatcher = serverQueue.connection
      .playStream(ytdl(song.url))
      .on("end", reason => {
        if (
          reason ===
          "İnternetten kaynaklı bir sorun yüzünden şarkılar kapatıldı."
        );
        else console.log(reason);
        serverQueue.songs.shift();
        play(guild, serverQueue.songs[0]);
      })
      .on("error", error => console.error(error));
    dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);

    const playingBed = new RichEmbed()
      .setColor("RANDOM")
      .setAuthor(
        `Şuanda Oynatılıyor`,
        "https://davidjhinson.files.wordpress.com/2015/05/youtube-icon.png"
      )
      .setDescription(`[${song.title}](${song.url})`)
      .addField("Şarkı Süresi", `${song.durationm}:${song.durations}`, true)
      .addField("Şarkıyı Açan Kullanıcı", `<@${song.requester}>`, true)
      .setThumbnail(song.thumbnail);
    serverQueue.textChannel.send(playingBed);
  }

  //etiketli muzuk ewqeqw

  const prefixMention = new RegExp(`^<@!?${client.user.id}> `);
  const p = String(message.content.match(prefixMention));

  if (message.author.bot) return;
  if (!message.content.startsWith(p)) return;

  const arg = message.content
    .slice(p.length)
    .trim()
    .split(/ +/g);

  if (!message.content.startsWith(p)) return;
  var searchString = arg.slice(1).join(" ");
  var url = arg[1] ? arg[1].replace(/<(.+)>/g, "$1") : "";
  var serverQueue = queue.get(message.guild.id);

  switch (arg[0].toLowerCase()) {
    case "oynat":
      var voiceChannel = message.member.voiceChannel;

      const embed = new RichEmbed()
        .setColor("RANDOM")
        .setDescription(
          "Dinlemek istediğin şarkıyı yazmalısın! (Şarkı ismi veya Youtube URLsi)"
        );
      if (!url) return message.channel.send(embed);

      const voiceChannelAdd = new RichEmbed()
        .setColor("RANDOM")
        .setDescription(`Lütfen herhangi bir sesli kanala katılınız.`);
      if (!voiceChannel) return message.channel.send(voiceChannelAdd);
      var permissions = voiceChannel.permissionsFor(message.client.user);
      if (!permissions.has("CONNECT")) {
        const warningErr = new RichEmbed()
          .setColor("RANDOM")
          .setDescription(
            `Herhangi bir sesli kanala katılabilmek için yeterli iznim yok.`
          );
        return message.channel.send(warningErr);
      }
      if (!permissions.has("SPEAK")) {
        const musicErr = new RichEmbed()
          .setColor("RANDOM")
          .setDescription(
            `Müzik açamıyorum/şarkı çalamıyorum çünkü kanalda konuşma iznim yok veya mikrofonum kapalı.`
          );
        return message.channel.send(musicErr);
      }
      if (
        url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)
      ) {
        var playlist = await youtube.getPlaylist(url);
        var videos = await playlist.getVideos();
        for (const video of Object.values(videos)) {
          var video2 = await youtube.getVideoByID(video.id);
          await handleVideo(video2, message, voiceChannel, true);
        }
        const PlayingListAdd = new RichEmbed()
          .setColor("RANDOM")
          .setDescription(
            `[${playlist.title}](https://www.youtube.com/watch?v=${playlist.id}) İsimli şarkı oynatma listesine Eklendi.`
          );
        return message.channel.send(PlayingListAdd);
      } else {
        try {
          var video = await youtube.getVideo(url);
        } catch (error) {
          try {
            var videos = await youtube.searchVideos(searchString, 10);

            var r = 1;

            var video = await youtube.getVideoByID(videos[r - 1].id);
          } catch (err) {
            console.error(err);
            const songNope = new RichEmbed()
              .setColor("RANDOM")
              .setDescription(`Aradığınız isimde bir şarkı bulamadım.`);
            return message.channel.send(songNope);
          }
        }
        return handleVideo(video, message, voiceChannel);
      }
      break;
    case "tekrar":
      const e = new RichEmbed()
        .setColor("RANDOM")
        .setDescription(`Bir sesli kanalda değilsin.`);
      if (!message.member.voiceChannel) return message.channel.send(e);
      const p = new RichEmbed()
        .setColor("RANDOM")
        .setDescription(`Şuanda herhangi bir şarkı çalmıyor.`);
      if (!serverQueue) return message.channel.send(p);

      var u = serverQueue.songs[0];

      /*var pla = await youtube.getPlaylist(u);
      var v = await pla.getVideos();*/
      var vi2 = await youtube.getVideoByID(u.id);
      await handleVideo(vi2, message, voiceChannel, true);
      const PlayingListAdd = new RichEmbed()
        .setColor("RANDOM")
        .setDescription(
          `[${u.title}](https://www.youtube.com/watch?v=${u.id}) İsimli şarkı bitince tekrar oynatılacak.`
        );
      return message.channel.send(PlayingListAdd);

      break;
    case "geç":
      const err0 = new RichEmbed()
        .setColor("RANDOM")
        .setDescription(`Bir sesli kanalda değilsin.`);
      if (!message.member.voiceChannel) return message.channel.send(err0);
      const err05 = new RichEmbed()
        .setColor("RANDOM")
        .setDescription(`Şuanda herhangi bir şarkı çalmıyor.`);
      if (!serverQueue) return message.channel.send(err05);
      const songSkip = new RichEmbed()
        .setColor("RANDOM")
        .setDescription(`Şarkı başarıyla geçildi!`);
      serverQueue.connection.dispatcher.end("");
      message.channel.send(songSkip);
      return undefined;
      break;
    case "durdur":
      const err1 = new RichEmbed()
        .setColor("RANDOM")
        .setDescription(`Bir sesli kanalda değilsin.`);
      if (!message.member.voiceChannel) return message.channel.send(err1);
      const err2 = new RichEmbed()
        .setColor("RANDOM")
        .setDescription(`Şuanda herhangi bir şarkı çalmıyor.`);
      if (!serverQueue) return message.channel.send(err2);
      serverQueue.songs = [];
      const songEnd = new RichEmbed()
        .setColor("RANDOM")
        .setDescription(`Şarkı başarıyla durduruldu ve odadan ayrıldım!`);
      serverQueue.connection.dispatcher.end("");
      message.channel.send(songEnd);
      return undefined;
      break;
    case "ses":
      const asd1 = new RichEmbed()
        .setColor("RANDOM")
        .setDescription(`Bir sesli kanalda değilsin.`);
      if (!message.member.voiceChannel) return message.channel.send(asd1);
      const asd2 = new RichEmbed()
        .setColor("RANDOM")
        .setDescription(`Şuanda herhangi bir şarkı çalmıyor.`);
      if (!serverQueue) return message.channel.send(asd2);

      if (!args[1])
        return message.reply("Ses seviyesi ayarlamak için bir sayı yaz!");
      serverQueue.volume = args[1];
      if (args[1] > 10)
        return message.channel.send(
          `Ses seviyesi en fazla \`10\` olarak ayarlanabilir.`
        );
      serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 5);
      const volumeLevelEdit = new RichEmbed()
        .setColor("RANDOM")
        .setDescription(`Ayarlanan Ses Seviyesi: **${args[1]}**`);
      return message.channel.send(volumeLevelEdit);
      break;
    case "kuyruk":
      var siralama = 0;
      const a = new RichEmbed()
        .setColor("RANDOM")
        .setDescription(`Bir sesli kanalda değilsin.`);
      if (!message.member.voiceChannel) return message.channel.send(a);
      const b = new RichEmbed()
        .setColor("RANDOM")
        .setDescription(`Şuanda herhangi bir şarkı çalmıyor.`);
      if (!serverQueue) return message.channel.send(b);

      var k = serverQueue.songs
        .map(
          song =>
            `${++siralama} - [${song.title}](https://www.youtube.com/watch?v=${
              song.id
            })`
        )
        .join("\n")
        .replace(
          serverQueue.songs[0].title,
          `**${serverQueue.songs[0].title}**`
        );

      const kuyruk = new Discord.RichEmbed()
        .setColor("RANDOM")
        .addField("Şarkı Kuyruğu", k);
      return message.channel.send(kuyruk);
      break;
    case "duraklat":
      if (serverQueue && serverQueue.playing) {
        serverQueue.playing = false;
        serverQueue.connection.dispatcher.pause();
        const asjdhsaasjdha = new RichEmbed()
          .setColor("RANDOM")
          .setDescription(`Şarkı başarıyla duraklatıldı!`);
        return message.channel.send(asjdhsaasjdha);
      }
      return message.channel.send("Şuanda herhangi bir şarkı çalmıyor.");
      break;
    case "devamet":
      if (serverQueue && !serverQueue.playing) {
        serverQueue.playing = true;
        serverQueue.connection.dispatcher.resume();
        const asjdhsaasjdhaadssad = new RichEmbed()
          .setColor("RANDOM")
          .setDescription(`Şarkı başarıyla devam ettiriliyor...`);
        return message.channel.send(asjdhsaasjdhaadssad);
      }
      return message.channel.send("Şuanda herhangi bir şarkı çalmıyor.");

      return undefined;
      break;
  }
  async function handleVideo(video, message, voiceChannel, playlist = false) {
    var serverQueue = queue.get(message.guild.id);
    //console.log(video);
    var song = {
      id: video.id,
      title: video.title,
      durationh: video.duration.hours,
      durationm: video.duration.minutes,
      durations: video.duration.seconds,
      url: `https://www.youtube.com/watch?v=${video.id}`,
      thumbnail: `https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`,
      requester: message.author.id
    };
    if (!serverQueue) {
      var queueConstruct = {
        textChannel: message.channel,
        voiceChannel: voiceChannel,
        connection: null,
        songs: [],
        volume: 3,
        playing: true
      };
      queue.set(message.guild.id, queueConstruct);

      queueConstruct.songs.push(song);

      try {
        var connection = await voiceChannel.join();
        queueConstruct.connection = connection;
        play(message.guild, queueConstruct.songs[0]);
      } catch (error) {
        console.error(`Ses kanalına giremedim HATA: ${error}`);
        queue.delete(message.guild.id);
        return message.channel.send(`Ses kanalına giremedim HATA: ${error}`);
      }
    } else {
      serverQueue.songs.push(song);
      //console.log(serverQueue.songs);
      if (playlist) return undefined;

      const songListBed = new RichEmbed()
        .setColor("RANDOM")
        .setDescription(
          `[${song.title}](https://www.youtube.com/watch?v=${song.id}) isimli şarkı kuyruğa eklendi!`
        );
      return message.channel.send(songListBed);
    }
    return undefined;
  }
  function play(guild, song) {
    var serverQueue = queue.get(guild.id);

    if (!song) {
      serverQueue.voiceChannel.leave();
      voiceChannel.leave();
      queue.delete(guild.id);
      return;
    }
    //console.log(serverQueue.songs);

    const dispatcher = serverQueue.connection
      .playStream(ytdl(song.url))
      .on("end", reason => {
        if (
          reason ===
          "İnternetten kaynaklı bir sorun yüzünden şarkılar kapatıldı."
        );
        else console.log(reason);
        serverQueue.songs.shift();
        play(guild, serverQueue.songs[0]);
      })
      .on("error", error => console.error(error));
    dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);

    const playingBed = new RichEmbed()
      .setColor("RANDOM")
      .setAuthor(
        `Şuanda Oynatılıyor`,
        "https://davidjhinson.files.wordpress.com/2015/05/youtube-icon.png"
      )
      .setDescription(`[${song.title}](${song.url})`)
      .addField("Şarkı Süresi", `${song.durationm}:${song.durations}`, true)
      .addField("Şarkıyı Açan Kullanıcı", `<@${song.requester}>`, true)
      .setThumbnail(song.thumbnail);
    serverQueue.textChannel.send(playingBed);
  }
});

client.on("message", async message => {
  if (!message.guild) return;

  let prefix =
    (await db.fetch(`prefix_${message.guild.id}`)) || client.ayarlar.prefix;

  if (message.content.startsWith(prefix)) {
    let komutum = client.cmdd;
    if (komutum[message.guild.id]) {
      for (var i = 0; i < Object.keys(komutum[message.guild.id]).length; i++) {
        if (
          message.content.slice(prefix.length) ===
          Object.keys(komutum[message.guild.id][i])[0]
        ) {
          message.channel.send(
            komutum[message.guild.id][i][
              Object.keys(komutum[message.guild.id][i])
            ]
          );

          return;
        }
      }
    }
  }
});

client.on("message", async msg => {
  if (!msg.guild) return;

  let prefix =
    (await db.fetch(`prefix_${msg.guild.id}`)) || client.ayarlar.prefix;

  if (!msg.guild.channels.get(db.fetch(`destekK_${msg.guild.id}`))) return;
  var s = "tr";
  var r = "Destek Ekibi";
  var k = "destek-kanalı";
  if (db.has(`dil_${msg.guild.id}`) === true) {
    var s = "en";
    var r = "Support Team";
    var k = "support-channel";
  }
  const dil = s;

  let rol = "";
  let kanal = "";

  if (db.has(`destekK_${msg.guild.id}`) === true) {
    kanal = msg.guild.channels.get(db.fetch(`destekK_${msg.guild.id}`)).name;
  }

  if (db.has(`destekK_${msg.guild.id}`) === false) {
    kanal = k;
  }

  if (db.has(`destekR_${msg.guild.id}`) === true) {
    rol = msg.guild.roles.get(db.fetch(`destekR_${msg.guild.id}`));
  }

  if (db.has(`destekR_${msg.guild.id}`) === false) {
    rol = r;
  }

  const reason = msg.content
    .split(" ")
    .slice(1)
    .join(" ");
  if (msg.channel.name == kanal) {
    if (msg.author.bot) return;
    /*if (!msg.guild.roles.exists("name", rol)) return msg.reply(client[dil].desteksistem.rolyok.replace("{rol}", r)).then(m2 => {
            m2.delete(5000)});*/
    if (
      msg.guild.channels.find(
        c =>
          c.name ===
          `${client[dil].desteksistem.talep}-${msg.author.discriminator}`
      )
    ) {
      msg.author.send(
        client[dil].desteksistem.aciktalepozel
          .replace("{kisi}", msg.author.tag)
          .replace(
            "{kanal}",
            `${msg.guild.channels.get(
              msg.guild.channels.find(
                c =>
                  c.name ===
                  `${client[dil].desteksistem.talep}-${msg.author.discriminator}`
              ).id
            )}`
          )
      );
      msg.guild.channels
        .find(
          c =>
            c.name ===
            `${client[dil].desteksistem.talep}-${msg.author.discriminator}`
        )
        .send(
          client[dil].desteksistem.aciktalep
            .replace("{kisi}", msg.author.tag)
            .replace("{sebep}", msg.content)
        );

      msg.delete();
      return;
    }
    if (
      msg.guild.channels.find(c => c.name === client[dil].desteksistem.kategori)
    ) {
      msg.guild
        .createChannel(
          `${client[dil].desteksistem.talep}-${msg.author.discriminator}`,
          "text"
        )
        .then(c => {
          const category = msg.guild.channels.find(
            c => c.name === client[dil].desteksistem.kategori
          );
          c.setParent(category.id);
          let role = msg.guild.roles.find(r => r.name === rol.name);
          let role2 = msg.guild.roles.find(r => r.name === "@everyone");
          c.overwritePermissions(role, {
            SEND_MESSAGES: true,
            READ_MESSAGES: true
          });
          c.overwritePermissions(role2, {
            SEND_MESSAGES: false,
            READ_MESSAGES: false
          });
          c.overwritePermissions(msg.author, {
            SEND_MESSAGES: true,
            READ_MESSAGES: true
          });

          const embed = new Discord.RichEmbed()
            .setColor("RANDOM")
            .setAuthor(
              `${client.user.username} | Destek Sistemi`,
              client.user.avatarURL
            )
            .setTitle(`_Merhaba ${msg.author.username}!_`)
            .addField(
              `» Destek Talebi Hakkında Bilgilendirme «`,
              `Yetkililerimiz en yakın zamanda burada sorunun ile ilgilenecektir! \nDestek talebini kapatmak için \`${prefix}kapat\` yazabilir, \nSunucudaki tüm Destek Taleplerini kapatmak için ise \`${prefix}talepleri-kapat\` yazabilirsin!`
            )
            .addField(`» Destek Talebi Sebebi «`, `${msg.content}`, true)
            .addField(
              `» Destek Talebini Açan Kullanıcı «`,
              `<@${msg.author.id}>`,
              true
            )
            .setFooter(
              `${msg.guild.name} adlı sunucu ${client.user.username} Destek Sistemi'ni kullanıyor teşekkürler!`,
              msg.guild.iconURL
            );
          c.send({ embed: embed });
          c.send(
            `** @here | 📞Destek Talebi! ** \n**${msg.author.tag}** adlı kullanıcı \`${msg.content}\` sebebi ile Destek Talebi açtı!`
          );
          msg.delete();
        })
        .catch(console.error);
    }
  }

  if (msg.channel.name == kanal) {
    if (
      !msg.guild.channels.find(
        c => c.name === client[dil].desteksistem.kategori
      )
    ) {
      msg.guild
        .createChannel(client[dil].desteksistem.kategori, "category")
        .then(category => {
          category.setPosition(1);
          let every = msg.guild.roles.find(c => c.name === "@everyone");
          category.overwritePermissions(every, {
            VIEW_CHANNEL: false,
            SEND_MESSAGES: false,
            READ_MESSAGE_HISTORY: false
          });
          msg.guild
            .createChannel(
              `${client[dil].desteksistem.talep}-${msg.author.discriminator}`,
              "text"
            )
            .then(c => {
              c.setParent(category.id);
              let role = msg.guild.roles.find(c => c.name === rol.name);
              let role2 = msg.guild.roles.find(c => c.name === "@everyone");
              c.overwritePermissions(role, {
                SEND_MESSAGES: true,
                READ_MESSAGES: true
              });
              c.overwritePermissions(role2, {
                SEND_MESSAGES: false,
                READ_MESSAGES: false
              });
              c.overwritePermissions(msg.author, {
                SEND_MESSAGES: true,
                READ_MESSAGES: true
              });

              const embed = new Discord.RichEmbed()
                .setColor("RANDOM")
                .setAuthor(
                  `${client.user.username} | Destek Sistemi`,
                  client.user.avatarURL
                )
                .setTitle(`_Merhaba ${msg.author.username}!_`)
                .addField(
                  `» Destek Talebi Hakkında Bilgilendirme «`,
                  `Yetkililerimiz en yakın zamanda burada sorunun ile ilgilenecektir! \nDestek talebini kapatmak için \`${prefix}kapat\` yazabilir, \nSunucudaki tüm Destek Taleplerini kapatmak için ise \`${prefix}talepleri-kapat\` yazabilirsin!`
                )
                .addField(`» Destek Talebi Sebebi «`, `${msg.content}`, true)
                .addField(
                  `» Destek Talebini Açan Kullanıcı «`,
                  `<@${msg.author.id}>`,
                  true
                )
                .setFooter(
                  `${msg.guild.name} adlı sunucu ${client.user.username} Destek Sistemi'ni kullanıyor teşekkürler!`,
                  msg.guild.iconURL
                );
              c.send({ embed: embed });
              c.send(
                `** @here | 📞Destek Talebi! ** \n**${msg.author.tag}** adlı kullanıcı \`${msg.content}\` sebebi ile Destek Talebi açtı!`
              );
              msg.delete();
            })
            .catch(console.error);
        });
    }
  }
});

client.on("message", async message => {
  if (!message.guild.channels.get(db.fetch(`destekK_${message.guild.id}`)))
    return;

  if (!message.guild) return;

  let prefix =
    (await db.fetch(`prefix_${message.guild.id}`)) || client.ayarlar.prefix;

  var s = "tr";
  var r = "Destek Ekibi";
  if (db.has(`dil_${message.guild.id}`) === true) {
    var s = "en";
    var r = "Support Team";
  }
  const dil = s;

  if (message.content.toLowerCase().startsWith(prefix + `kapat`)) {
    if (!message.channel.name.startsWith(`${client[dil].desteksistem.talep}-`))
      return message.channel.send(
        `Bu komut sadece Destek Talebi kanallarında kullanılabilir.`
      );

    const embed = new Discord.RichEmbed()
      .setColor("RANDOM")
      .setAuthor(`Destek Talebi Kapatma İşlemi!`)
      .setDescription(
        `Destek talebini kapatma işlemini onaylamak için, \n10 saniye içinde \`evet\` yazınız.`
      )
      .setFooter(
        `${client.user.username} | Destek Sistemi`,
        client.user.avatarURL
      );
    message.channel.send({ embed }).then(m => {
      message.channel
        .awaitMessages(response => response.content === "evet", {
          max: 1,
          time: 10000,
          errors: ["time"]
        })
        .then(collected => {
          message.channel.delete();
        })
        .catch(() => {
          m.edit("Destek talebi kapatma isteği zaman aşımına uğradı.").then(
            m2 => {
              m2.delete();
            },
            3000
          );
        });
    });
  }

  //if (!message.guild) return;

  // let prefix = await db.fetch(`prefix_${message.guild.id}`) || client.ayarlar.prefix;

  // const dil = s
});

//log sistemi

//let logA = JSON.parse(fs.readFileSync("./jsonlar/log.json", "utf8"));

client.on("guildMemberAdd", member => {
  //if (member.author.bot) return;

  // if (!logA[member.guild.id]) return;

  var user = member.user;
  var tarih = "";
  if (moment(user.createdAt).format("MM") === "01") {
    var tarih = `${moment(user.createdAt).format("DD")} Ocak ${moment(
      user.createdAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.createdAt).format("MM") === "02") {
    var tarih = `${moment(user.createdAt).format("DD")} Şubat ${moment(
      user.createdAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.createdAt).format("MM") === "03") {
    var tarih = `${moment(user.createdAt).format("DD")} Mart ${moment(
      user.createdAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.createdAt).format("MM") === "04") {
    var tarih = `${moment(user.createdAt).format("DD")} Nisan ${moment(
      user.createdAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.createdAt).format("MM") === "05") {
    var tarih = `${moment(user.createdAt).format("DD")} Mayıs ${moment(
      user.createdAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.createdAt).format("MM") === "06") {
    var tarih = `${moment(user.createdAt).format("DD")} Haziran ${moment(
      user.createdAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.createdAt).format("MM") === "07") {
    var tarih = `${moment(user.createdAt).format("DD")} Temmuz ${moment(
      user.createdAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.createdAt).format("MM") === "08") {
    var tarih = `${moment(user.createdAt).format("DD")} Ağustos ${moment(
      user.createdAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.createdAt).format("MM") === "09") {
    var tarih = `${moment(user.createdAt).format("DD")} Eylül ${moment(
      user.createdAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.createdAt).format("MM") === "10") {
    var tarih = `${moment(user.createdAt).format("DD")} Ekim ${moment(
      user.createdAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.createdAt).format("MM") === "11") {
    var tarih = `${moment(user.createdAt).format("DD")} Kasım ${moment(
      user.createdAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.createdAt).format("MM") === "12") {
    var tarih = `${moment(user.createdAt).format("DD")} Aralık ${moment(
      user.createdAt
    ).format("YYYY HH:mm:ss")} `;
  }

  var tarih2 = "";
  if (moment(user.joinedAt).format("MM") === "01") {
    var tarih2 = `${moment(user.joinedAt).format("DD")} Ocak ${moment(
      user.joinedAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.joinedAt).format("MM") === "02") {
    var tarih2 = `${moment(user.joinedAt).format("DD")} Şubat ${moment(
      user.joinedAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.joinedAt).format("MM") === "03") {
    var tarih2 = `${moment(user.joinedAt).format("DD")} Mart ${moment(
      user.joinedAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.joinedAt).format("MM") === "04") {
    var tarih2 = `${moment(user.joinedAt).format("DD")} Nisan ${moment(
      user.joinedAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.joinedAt).format("MM") === "05") {
    var tarih2 = `${moment(user.joinedAt).format("DD")} Mayıs ${moment(
      user.joinedAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.joinedAt).format("MM") === "06") {
    var tarih2 = `${moment(user.joinedAt).format("DD")} Haziran ${moment(
      user.joinedAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.joinedAt).format("MM") === "07") {
    var tarih2 = `${moment(user.joinedAt).format("DD")} Temmuz ${moment(
      user.joinedAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.joinedAt).format("MM") === "08") {
    var tarih2 = `${moment(user.joinedAt).format("DD")} Ağustos ${moment(
      user.joinedAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.joinedAt).format("MM") === "09") {
    var tarih2 = `${moment(user.joinedAt).format("DD")} Eylül ${moment(
      user.joinedAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.joinedAt).format("MM") === "10") {
    var tarih2 = `${moment(user.joinedAt).format("DD")} Ekim ${moment(
      user.joinedAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.joinedAt).format("MM") === "11") {
    var tarih2 = `${moment(user.joinedAt).format("DD")} Kasım ${moment(
      user.joinedAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.joinedAt).format("MM") === "12") {
    var tarih2 = `${moment(user.joinedAt).format("DD")} Aralık ${moment(
      user.joinedAt
    ).format("YYYY HH:mm:ss")} `;
  }

  //var kanal = member.guild.channels.get(logA[member.guild.id].log);

  if (db.has(`log_${member.guild.id}`) === false) return;

  var kanal = member.guild.channels.get(db.fetch(`log_${member.guild.id}`));
  if (!kanal) return;

  const embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setAuthor(`Sunucuya Bir Kullanıcı Katıldı!`, member.user.avatarURL)
    .addField("Kullanıcı Tag", member.user.tag, true)
    .addField("ID", member.user.id, true)
    .addField("Discord Kayıt Tarihi", tarih, true)
    .addField("Sunucuya Katıldığı Tarih", tarih2, true)
    .setThumbnail(member.user.avatarURL);
  kanal.send(embed);
});

client.on("guildMemberRemove", member => {
  //if (member.author.bot) return;

  // if (!logA[member.guild.id]) return;

  var user = member.user;
  var tarih = "";
  if (moment(user.createdAt).format("MM") === "01") {
    var tarih = `${moment(user.createdAt).format("DD")} Ocak ${moment(
      user.createdAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.createdAt).format("MM") === "02") {
    var tarih = `${moment(user.createdAt).format("DD")} Şubat ${moment(
      user.createdAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.createdAt).format("MM") === "03") {
    var tarih = `${moment(user.createdAt).format("DD")} Mart ${moment(
      user.createdAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.createdAt).format("MM") === "04") {
    var tarih = `${moment(user.createdAt).format("DD")} Nisan ${moment(
      user.createdAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.createdAt).format("MM") === "05") {
    var tarih = `${moment(user.createdAt).format("DD")} Mayıs ${moment(
      user.createdAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.createdAt).format("MM") === "06") {
    var tarih = `${moment(user.createdAt).format("DD")} Haziran ${moment(
      user.createdAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.createdAt).format("MM") === "07") {
    var tarih = `${moment(user.createdAt).format("DD")} Temmuz ${moment(
      user.createdAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.createdAt).format("MM") === "08") {
    var tarih = `${moment(user.createdAt).format("DD")} Ağustos ${moment(
      user.createdAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.createdAt).format("MM") === "09") {
    var tarih = `${moment(user.createdAt).format("DD")} Eylül ${moment(
      user.createdAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.createdAt).format("MM") === "10") {
    var tarih = `${moment(user.createdAt).format("DD")} Ekim ${moment(
      user.createdAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.createdAt).format("MM") === "11") {
    var tarih = `${moment(user.createdAt).format("DD")} Kasım ${moment(
      user.createdAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.createdAt).format("MM") === "12") {
    var tarih = `${moment(user.createdAt).format("DD")} Aralık ${moment(
      user.createdAt
    ).format("YYYY HH:mm:ss")} `;
  }

  var tarih2 = "";
  if (moment(user.joinedAt).format("MM") === "01") {
    var tarih2 = `${moment(user.joinedAt).format("DD")} Ocak ${moment(
      user.joinedAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.joinedAt).format("MM") === "02") {
    var tarih2 = `${moment(user.joinedAt).format("DD")} Şubat ${moment(
      user.joinedAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.joinedAt).format("MM") === "03") {
    var tarih2 = `${moment(user.joinedAt).format("DD")} Mart ${moment(
      user.joinedAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.joinedAt).format("MM") === "04") {
    var tarih2 = `${moment(user.joinedAt).format("DD")} Nisan ${moment(
      user.joinedAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.joinedAt).format("MM") === "05") {
    var tarih2 = `${moment(user.joinedAt).format("DD")} Mayıs ${moment(
      user.joinedAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.joinedAt).format("MM") === "06") {
    var tarih2 = `${moment(user.joinedAt).format("DD")} Haziran ${moment(
      user.joinedAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.joinedAt).format("MM") === "07") {
    var tarih2 = `${moment(user.joinedAt).format("DD")} Temmuz ${moment(
      user.joinedAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.joinedAt).format("MM") === "08") {
    var tarih2 = `${moment(user.joinedAt).format("DD")} Ağustos ${moment(
      user.joinedAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.joinedAt).format("MM") === "09") {
    var tarih2 = `${moment(user.joinedAt).format("DD")} Eylül ${moment(
      user.joinedAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.joinedAt).format("MM") === "10") {
    var tarih2 = `${moment(user.joinedAt).format("DD")} Ekim ${moment(
      user.joinedAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.joinedAt).format("MM") === "11") {
    var tarih2 = `${moment(user.joinedAt).format("DD")} Kasım ${moment(
      user.joinedAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.joinedAt).format("MM") === "12") {
    var tarih2 = `${moment(user.joinedAt).format("DD")} Aralık ${moment(
      user.joinedAt
    ).format("YYYY HH:mm:ss")} `;
  }

  //var kanal = member.guild.channels.get(logA[member.guild.id].log);

  if (db.has(`log_${member.guild.id}`) === false) return;

  var kanal = member.guild.channels.get(db.fetch(`log_${member.guild.id}`));
  if (!kanal) return;

  const embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setAuthor(`Sunucudan Bir Kullanıcı Ayrıldı!`, member.user.avatarURL)
    .addField("Kullanıcı Tag", member.user.tag, true)
    .addField("ID", member.user.id, true)
    .addField("Discord Kayıt Tarihi", tarih, true)
    .addField("Sunucuya Katıldığı Tarih", tarih2, true)
    .setThumbnail(member.user.avatarURL);
  kanal.send(embed);
});

client.on("messageDelete", message => {
  if (message.author.bot) return;

  db.set(`atan_${message.channel.id}`, `${message.author.tag}`);
  db.set(`mesaj_${message.channel.id}`, message.content);

  //if (!logA[message.guild.id]) return;

  var user = message.author;

  //var kanal = message.guild.channels.get(logA[message.guild.id].log);

  if (db.has(`log_${message.guild.id}`) === false) return;

  var kanal = message.guild.channels.get(db.fetch(`log_${message.guild.id}`));
  if (!kanal) return;

  const embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setAuthor(`Bir Mesaj Silindi!`, message.author.avatarURL)
    .addField("Kullanıcı Tag", message.author.tag, true)
    .addField("ID", message.author.id, true)
    .addField("Silinen Mesaj", "```" + message.content + "```")
    .setThumbnail(message.author.avatarURL);
  kanal.send(embed);
});

client.on("messageUpdate", async (oldMsg, newMsg) => {
  if (oldMsg.author.bot) return;

  // if (!logA[oldMsg.guild.id]) return;

  var user = oldMsg.author;

  //var kanal = oldMsg.guild.channels.get(logA[oldMsg.guild.id].log);

  if (db.has(`log_${oldMsg.guild.id}`) === false) return;

  var kanal = oldMsg.guild.channels.get(db.fetch(`log_${oldMsg.guild.id}`));
  if (!kanal) return;

  const embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setAuthor(`Bir Mesaj Düzenlendi!`, oldMsg.author.avatarURL)
    .addField("Kullanıcı Tag", oldMsg.author.tag, true)
    .addField("ID", oldMsg.author.id, true)
    .addField("Eski Mesaj", "```" + oldMsg.content + "```")
    .addField("Yeni Mesaj", "```" + newMsg.content + "```")
    .setThumbnail(oldMsg.author.avatarURL);
  kanal.send(embed);
});

client.on("roleCreate", role => {
  // if (!logA[role.guild.id]) return;

  if (db.has(`log_${role.guild.id}`) === false) return;

  var kanal = role.guild.channels.get(db.fetch(`log_${role.guild.id}`));
  if (!kanal) return;

  const embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setAuthor(`Bir Rol Oluşturuldu!`, role.guild.iconURL)
    .addField("Rol", `\`${role.name}\``, true)
    .addField("Rol Rengi Kodu", `${role.hexColor}`, true);
  kanal.send(embed);
});

client.on("roleDelete", role => {
  // if (!logA[role.guild.id]) return;

  if (db.has(`log_${role.guild.id}`) === false) return;

  var kanal = role.guild.channels.get(db.fetch(`log_${role.guild.id}`));
  if (!kanal) return;

  const embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setAuthor(`Bir Rol Kaldırıldı!`, role.guild.iconURL)
    .addField("Rol", `\`${role.name}\``, true)
    .addField("Rol Rengi Kodu", `${role.hexColor}`, true);
  kanal.send(embed);
});

client.on("roleUpdate", role => {
  // if (!logA[role.guild.id]) return;

  if (db.has(`log_${role.guild.id}`) === false) return;

  var kanal = role.guild.channels.get(db.fetch(`log_${role.guild.id}`));
  if (!kanal) return;

  const embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setAuthor(`Bir Rol Güncellendi!`, role.guild.iconURL)
    .addField("Rol", `\`${role.name}\``, true)
    .addField("Rol Rengi Kodu", `${role.hexColor}`, true);
  kanal.send(embed);
});

client.on("voiceStateUpdate", (oldMember, newMember) => {
  // if (!logA[oldMember.guild.id]) return;

  if (db.has(`log_${oldMember.guild.id}`) === false) return;

  var kanal = oldMember.guild.channels.get(
    db.fetch(`log_${oldMember.guild.id}`)
  );
  if (!kanal) return;

  let newUserChannel = newMember.voiceChannel;
  let oldUserChannel = oldMember.voiceChannel;

  if (oldUserChannel === undefined && newUserChannel !== undefined) {
    const embed = new Discord.RichEmbed()
      .setColor("RANDOM")
      .setDescription(
        `${newMember.user.tag} adlı kullanıcı \`${newUserChannel.name}\` isimli sesli kanala giriş yaptı!`
      );
    kanal.send(embed);
  } else if (newUserChannel === undefined) {
    const embed = new Discord.RichEmbed()
      .setColor("RANDOM")
      .setDescription(
        `${newMember.user.tag} adlı kullanıcı bir sesli kanaldan çıkış yaptı!`
      );
    kanal.send(embed);
  }
});

// PROFİL SİSTEMİ BROOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO BAŞLAR BU ARADA --------------------------------------------

client.on("message", async message => {
  var onay = client.emojis.get(client.emojiler.evet);
  var red = client.emojis.get(client.emojiler.hayır);
  const prefixMention = new RegExp(`^<@!?${client.user.id}>`);
  if (message.channel.type === "dm") return;

  if (message.author.bot) return;

  var user = message.mentions.users.first() || message.author;
  if (!message.guild) user = message.author;

  var user = message.mentions.users.first() || message.author;
  if (!message.guild) user = message.author;

  let i =
    (await db.fetch(`prefix_${message.guild.id}`)) || client.ayarlar.prefix;

  let prefix;
  if (i) {
    prefix = message.content.match(prefixMention)
      ? message.content.match(prefixMention)[0] + " "
      : i;
  } else {
    prefix = message.content.match(prefixMention)
      ? message.content.match(prefixMention)[0] + " "
      : `${message.guild.commandPrefix}`;
  }

  if (message.author.bot) return;
  if (message.author.id === client.user.id) return;
  if (message.content.indexOf(prefix) !== 0) return;
  const args = message.content.substring(prefix.length).split(" ");
  const command = args.shift().toLowerCase();

  if (command === "profil" || command === "profile") {
    message.channel.startTyping();
    var xp = db.fetch(`puancik_${user.id + message.guild.id}`);
    var lvl = db.fetch(`seviye_${user.id + message.guild.id}`);
    var user = message.mentions.users.first() || message.author;
    let memberID = await db.fetch(`memberID_${user.id}`);
    if (memberID == null) memberID = "Biyografi mesaji ayarlanmamis.";
    let membername = await db.fetch(`membername_${user.id}`);
    if (membername == null) membername = `${user.tag}`;
    let memberBadge = await db.fetch(`memberBadge_${user.id}`);

    if (memberBadge == null)
      memberBadge = `https://cdn.discordapp.com/attachments/461622592688619520/472923575049781268/profile.png`;
    let memberBadge2 = await db.fetch(`memberBadge2_${user.id}`);
    if (memberBadge2 == null)
      memberBadge2 = `https://cdn.discordapp.com/attachments/461622592688619520/472923575049781268/profile.png`;
    let memberBadge3 = await db.fetch(`memberBadge3_${user.id}`);
    if (memberBadge3 == null)
      memberBadge3 = `https://cdn.discordapp.com/attachments/461622592688619520/472923575049781268/profile.png`;
    let memberBadge4 = await db.fetch(`memberBadge4_${user.id}`);
    if (memberBadge4 == null)
      memberBadge4 = `https://cdn.discordapp.com/attachments/461622592688619520/472923575049781268/profile.png`;
    let memberBadge5 = await db.fetch(`memberBadge5_${user.id}`);
    if (memberBadge5 == null)
      memberBadge5 = `https://cdn.discordapp.com/attachments/461622592688619520/472923575049781268/profile.png`;
    let memberBadge6 = await db.fetch(`memberBadge6_${user.id}`);
    if (memberBadge6 == null)
      memberBadge6 = `https://cdn.discordapp.com/attachments/461622592688619520/472923575049781268/profile.png`;
    // https://cdn.discordapp.com/attachments/531535859594297364/533260601162465280/paraR.png

    const bg = await Jimp.read(
      "https://cdn.discordapp.com/attachments/521363740755623986/528277129989849130/unknown.png"
    );
    const userimg = await Jimp.read(user.avatarURL);
    const onay = await Jimp.read(`${memberBadge}`);
    const ekip = await Jimp.read(`${memberBadge2}`);
    const destek = await Jimp.read(`${memberBadge3}`);
    const mod = await Jimp.read(`${memberBadge4}`);
    const partner = await Jimp.read(`${memberBadge5}`);
    const paraR = await Jimp.read(`${memberBadge6}`);
    var font;
    if (membername.length < 12)
      font = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);
    else if (membername.length > 12)
      font = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);
    else font = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);
    var font2;
    if (user.tag.length < 15)
      font2 = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);
    else if (user.tag.length > 15)
      font2 = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);
    else font2 = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);
    var font3;
    if (user.tag.length < 34)
      font3 = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);
    else if (user.tag.length > 34)
      font3 = await Jimp.loadFont(Jimp.FONT_SANS_16_WHITE);
    else font3 = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);
    var font4;
    if (user.tag.length < 15)
      font4 = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);
    else if (user.tag.length > 15)
      font4 = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);
    else font4 = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);
    await bg.print(font, 365, 45, `${membername}`);
    await bg.print(font2, 40, 300, `Xp: ${xp || 0}`);
    await bg.print(font2, 40, 340, `Seviye: ${lvl || 0}`);
    await bg.print(font3, 40, 380, `Biyografi: ${memberID}`);
    await userimg.resize(210, 220);
    await !userimg.resize(214, 220);
    await onay.resize(32, 32);
    await ekip.resize(32, 32);
    await destek.resize(32, 32);
    await mod.resize(32, 32);
    await partner.resize(32, 32);
    await paraR.resize(32, 32);
    await bg
      .composite(paraR, 370, 100)
      .write("./img/paraR/" + client.user.id + "-" + user.id + ".png");
    await bg
      .composite(onay, 410, 100)
      .write("./img/onay/" + client.user.id + "-" + user.id + ".png");
    await bg
      .composite(ekip, 490, 100)
      .write("./img/ekip/" + client.user.id + "-" + user.id + ".png");
    await bg
      .composite(destek, 450, 100)
      .write("./img/destek/" + client.user.id + "-" + user.id + ".png");
    await bg
      .composite(mod, 530, 100)
      .write("./img/mod/" + client.user.id + "-" + user.id + ".png");
    await bg
      .composite(partner, 500, 100)
      .write("./img/mod/" + client.user.id + "-" + user.id + ".png");
    await bg
      .composite(userimg, 143, 27.8)
      .write("./img/userimg/" + client.user.id + "-" + user.id + ".png");

    setTimeout(function() {
      message.channel.send(
        `:pencil: **| ${user.username} adlı kullanıcının profil kartı**`
      );
      message.channel.send(
        new Discord.Attachment(
          "./img/userimg/" + client.user.id + "-" + user.id + ".png"
        )
      );
    }, 1000);
    setTimeout(function() {
      fs.unlink("./img/userimg/" + client.user.id + "-" + user.id + ".png");
    }, 10000);
    message.channel.stopTyping();
  }

  /*
    if (command === 'rütbe' || command === 'rank') {
      message.channel.startTyping()
        var user = message.mentions.users.first() || message.author;
        let membername = await db.fetch(`membername_${user.id}`);
        if (membername == null) membername = `${user.tag}`
				const bg = await Jimp.read("https://cdn.discordapp.com/attachments/458732340491845633/482242581040988160/fadawdawdawd.png");
				const userimg = await Jimp.read(user.avatarURL);
				var font;
				if (user.tag.length < 12) font = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);
				else if (user.tag.length > 15) font = await Jimp.loadFont(Jimp.FONT_SANS_16_BLACK);
				else font = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);
				var font2;
				if (user.tag.length < 15) font2 = await Jimp.loadFont(Jimp.FONT_SANS_16_BLACK);
				else if (user.tag.length > 15) font2 = await Jimp.loadFont(Jimp.FONT_SANS_16_BLACK);
				else font2 = await Jimp.loadFont(Jimp.FONT_SANS_16_BLACK);
				await bg.print(font2, 100, 75, `GP: ${userData.points}`);
				await bg.print(font2, 100, 55, `Level: ${userData.level}`);
				await bg.print(font, 103, 10, membername);
				await userimg.resize(90, 90);
				await (!userimg.resize(90, 90));
        await bg.composite(userimg, 5, 5).write("./img/rank/" + client.user.id + "-" + user.id + ".png");
				  setTimeout(function () {
message.channel.send(`:pencil: **| ${user.username} adlı kullanıcının rütbe kartı**`)
						message.channel.send(new Discord.Attachment("./img/rank/" + client.user.id + "-" + user.id + ".png"));
				  }, 1000);
				  setTimeout(function () {
					fs.unlink("./img/rank/" + client.user.id + "-" + user.id + ".png");
				  }, 10000);
      message.channel.stopTyping()
    }
    */

  if (
    command === "bioayarla" ||
    command === "biyografi" ||
    command === "biyografi-ayarla" ||
    command === "hakkında"
  ) {
    var biyo = args.slice(0).join(" ");
    if (biyo.length < 1) return message.reply("Lütfen biyografinizi yazınız!");

    if (args.join(" ").length > 35)
      return message.channel.send(
        `${red} En fazla 35 karakter girebilirsiniz.`
      );

    if (!args.join(" ") && args.join(" ").toLowerCase() === `none`)
      return message.channel.send(
        `Uyarı: Geçerli bir yazı yazmalısın.\nDoğru kullanım: ${prefix}biyografi KU-Pİ bot adamdır.`
      );
    let newMessage;
    if (args.join(" ").toLowerCase() === `none`) newMessage = "";
    else newMessage = args.join(" ").trim();
    const i = await db.set(`memberID_${message.author.id}`, newMessage);
    return message.channel.send(`${onay} Yeni biyografin ayarlandı.`);
  }

  if (command === "isim" || command === "isimayarla") {
    if (args.join(" ").length > 15)
      return message.channel.send(
        `${red} En fazla 15 karakter girebilirsiniz.`
      );

    var isim = args.slice(0).join(" ");
    if (isim.length < 1) return message.reply("Lütfen bir isim giriniz!");

    let newMessage;

    if (args.join(" ").toLowerCase() === `none`) newMessage = "";
    else newMessage = args.join(" ").trim();
    const i = await db.set(`membername_${message.author.id}`, newMessage);
    return message.channel.send(`${onay} Yeni ismin ayarlandı.`);
  }

  if (command === "rozet-parar") {
    if (
      message.author.id !== "560073681162731541" &&
      message.author.id !== "560073681162731541"
    )
      return message.channek.send(
        `${red} Bu komutu kullanmak için yetkin bulunmuyor.`
      );
    const i = await db.set(
      `memberBadge6_${user.id}`,
      "https://cdn.discordapp.com/attachments/531535859594297364/533260601162465280/paraR.png"
    );
    return message.channel.send(`${onay} Verdım aşkm.`);
  }

  if (command === "rozet-onayla") {
    if (
      message.author.id !== "560073681162731541" &&
      message.author.id !== "560073681162731541"
    )
      return message.channek.send(
        `${red} Bu komutu kullanmak için yetkin bulunmuyor.`
      );
    const i = await db.set(
      `memberBadge_${user.id}`,
      "https://cdn.discordapp.com/attachments/474685686075621376/480845736347435015/401725450470031362.png"
    );
    return message.channel.send(`${onay} Kullanıcıya onay rozeti verilmiştir.`);
  }

  if (command === "rozet-konay" || command === "rozet-konayla") {
    if (
      message.author.id !== "560073681162731541" &&
      message.author.id !== "560073681162731541"
    )
      return message.channel.send(
        `${red} Bu komutu kullanmak için yetkin bulunmuyor.`
      );
    const i = await db.set(
      `memberBadge_${user.id}`,
      "https://cdn.discordapp.com/attachments/461622592688619520/472923575049781268/profile.png"
    );
    return message.channel.send(`${onay} Kullanıcıdan onay rozeti alınmıştır.`);
  }

  if (command === "rozet-yetkili" || command === "rozet-ekip") {
    if (
      message.author.id !== "560073681162731541" &&
      message.author.id !== "560073681162731541"
    )
      return message.channel.send(
        `${red} Bu komutu kullanmak için yetkin bulunmuyor.`
      );
    const i = await db.set(
      `memberBadge2_${user.id}`,
      "https://cdn.discordapp.com/attachments/474685686075621376/480845736347435009/401723658491527168.png"
    );
    return message.channel.send(`${onay} Kullanıcıya ekip rozeti verilmiştir.`);
  }

  if (command === "rozet-kyetkili" || command === "rozet-kekip") {
    if (
      message.author.id !== "560073681162731541" &&
      message.author.id !== "560073681162731541"
    )
      return message.channel.send(
        `${red} Bu komutu kullanmak için yetkin bulunmuyor.`
      );
    const i = await db.set(
      `memberBadge2_${user.id}`,
      "https://cdn.discordapp.com/attachments/461622592688619520/472923575049781268/profile.png"
    );
    return message.channel.send(`${onay} Kullanıcıdan ekip rozeti alınmıştır.`);
  }

  if (command === "rozet-destekci" || command === "rozet-destekçi") {
    if (
      message.author.id !== "560073681162731541" &&
      message.author.id !== "560073681162731541"
    )
      return message.channel.send(
        `${red} Bu komutu kullanmak için yetkin bulunmuyor.`
      );
    const i = await db.set(
      `memberBadge3_${user.id}`,
      "https://cdn.discordapp.com/attachments/474685686075621376/480845737006202881/401725034453925889.png"
    );
    return message.channel.send(
      `${onay} Kullanıcıya destekçi rozeti verilmiştir.`
    );
  }

  if (command === "rozet-kdestekci" || command === "rozet-kdestekçi") {
    if (
      message.author.id !== "560073681162731541" &&
      message.author.id !== "560073681162731541"
    )
      return message.channel.send(
        `${red} Bu komutu kullanmak için yetkin bulunmuyor.`
      );
    const i = await db.set(
      `memberBadge3_${user.id}`,
      "https://cdn.discordapp.com/attachments/461622592688619520/472923575049781268/profile.png"
    );
    return message.channel.send(
      `${onay} Kullanıcıdan destekçi rozeti alınmıştır.`
    );
  }

  if (command === "rozet-mod" || command === "rozet-moderator") {
    if (
      message.author.id !== "560073681162731541" &&
      message.author.id !== "560073681162731541"
    )
      return message.channel.send(
        `${red} Bu komutu kullanmak için yetkin bulunmuyor.`
      );
    const i = await db.set(
      `memberBadge4_${user.id}`,
      "https://cdn.discordapp.com/attachments/474685686075621376/480845735647117312/401724520806875139.png"
    );
    return message.channel.send(
      `${onay} Kullanıcıya moderator rozeti verilmiştir.`
    );
  }

  if (command === "rozet-kmod" || command === "rozet-kmoderator") {
    if (
      message.author.id !== "560073681162731541" &&
      message.author.id !== "560073681162731541"
    )
      return message.channel.send(
        `${red} Bu komutu kullanmak için yetkin bulunmuyor.`
      );
    const i = await db.set(
      `memberBadge4_${user.id}`,
      "https://cdn.discordapp.com/attachments/461622592688619520/472923575049781268/profile.png"
    );
    return message.channel.send(
      `${onay} Kullanıcıdan moderator rozeti alınmıştır.`
    );
  }
});

// PROFİL SİSTEMİ BROOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO BİTER BU ARADA ---------------------------------------------

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${chalk.red(files.length)} ${chalk.green("komut yüklenecek.")}`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`${chalk.green("Yüklenen komut:")} ${chalk.blue(props.help.name)}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.english = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  //log(`${chalk.red(files.length)} ${chalk.green("komut yüklenecek.")}`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    //log(`${chalk.green("Yüklenen komut:")} ${chalk.blue(props.help.name)}.`);
    client.english.set(props.help.enname, props);
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

/// LEVEL BOT.JS ///

client.on("message", async message => {
  let prefix = ayarlar.prefix;

  var id = message.author.id;
  var gid = message.guild.id;

  let hm = await db.fetch(`seviyeacik_${gid}`);
  let kanal = await db.fetch(`svlog_${gid}`);
  let xps = await db.fetch(`verilecekxp_${gid}`);
  let seviyerol = await db.fetch(`svrol_${gid}`);
  let rollvl = await db.fetch(`rollevel_${gid}`);

  if (!hm) return;
  if (message.content.startsWith(prefix)) return;
  if (message.author.bot) return;

  var xp = await db.fetch(`xp_${id}_${gid}`);
  var lvl = await db.fetch(`lvl_${id}_${gid}`);
  var xpToLvl = await db.fetch(`xpToLvl_${id}_${gid}`);

  if (!lvl) {
    if (xps) {
      db.set(`xp_${id}_${gid}`, xps);
    }
    db.set(`xp_${id}_${gid}`, 4);
    db.set(`lvl_${id}_${gid}`, 1);
    db.set(`xpToLvl_${id}_${gid}`, 100);
  } else {
    if (xps) {
      db.add(`xp_${id}_${gid}`, xps);
    }
    db.add(`xp_${id}_${gid}`, 4);

    if (xp > xpToLvl) {
      db.add(`lvl_${id}_${gid}`, 1);
      db.add(
        `xpToLvl_${id}_${gid}`,
        (await db.fetch(`lvl_${id}_${gid}`)) * 100
      );
      if (kanal) {
        client.channels
          .get(kanal.id)
          .send(
            message.member.user.username +
              "** Seviye Atladı! Yeni seviyesi; `" +
              lvl +
              "` Tebrikler! :tada: **"
          );
      }
    }

    if (seviyerol) {
      if (lvl >= rollvl) {
        message.guild.member(message.author.id).addRole(seviyerol);
        if (kanal) {
          client.channels
            .get(kanal.id)
            .send(
              message.member.user.username +
                "** Seviyesi **" +
                rollvl +
                "** e ulaştı ve " +
                seviyerol +
                " Rolünü kazandı! :tada: **"
            );
        }
      }
    }
  }
});

const DBL = require("dblapi.js");
const dbl = new DBL(client.ayarlar.dbltoken, client);

client.on("ready", () => {
  setInterval(() => {
    dbl.postStats(client.guilds.size);
  }, 1800);
});

dbl.getStats("613168038526713858").then(stats => {
  console.log("DBL ye gerekli verileri girdim."); // {"server_count":2,"shards":[]}
});
//sunucu panel
client.on("guildMemberAdd", async member => {
  let sunucupaneli = await db.fetch(`sunucupanel_${member.guild.id}`);
  if (sunucupaneli) {
    let rekoronline = await db.fetch(`panelrekor_${member.guild.id}`);
    let toplamuye = member.guild.channels.find(x =>
      x.name.startsWith("Toplam Üye •")
    );
    let toplamaktif = member.guild.channels.find(x =>
      x.name.startsWith("Aktif Üye •")
    );
    let botlar = member.guild.channels.find(x => x.name.startsWith("Botlar •"));
    let rekoraktif = member.guild.channels.find(x =>
      x.name.startsWith("Rekor Aktiflik •")
    );

    if (
      member.guild.members.filter(off => off.presence.status !== "offline")
        .size > rekoronline
    ) {
      db.set(
        `panelrekor_${member.guild.id}`,
        member.guild.members.filter(off => off.presence.status !== "offline")
          .size
      );
    }
    try {
      toplamuye.setName(`Toplam Üye • ${member.guild.members.size}`);
      toplamaktif.setName(
        `Aktif Üye • ${
          member.guild.members.filter(off => off.presence.status !== "offline")
            .size
        }`
      );
      botlar.setName(
        `Botlar • ${member.guild.members.filter(m => m.user.bot).size}`
      );
      rekoraktif.setName(`Rekor Aktiflik • ${rekoronline}`);
    } catch (e) {}
  }
});
//Efe Tarafından Kodlanmıştır Çalınması Kesinlikle YASAKTIR !
client.on("guildMemberRemove", async member => {
  let sunucupaneli = await db.fetch(`sunucupanel_${member.guild.id}`);
  if (sunucupaneli) {
    let rekoronline = await db.fetch(`panelrekor_${member.guild.id}`);
    let toplamuye = member.guild.channels.find(x =>
      x.name.startsWith("Toplam Üye •")
    );
    let toplamaktif = member.guild.channels.find(x =>
      x.name.startsWith("Aktif Üye •")
    );
    let botlar = member.guild.channels.find(x => x.name.startsWith("Botlar •"));
    let rekoraktif = member.guild.channels.find(x =>
      x.name.startsWith("Rekor Aktiflik •")
    );

    if (
      member.guild.members.filter(off => off.presence.status !== "offline")
        .size > rekoronline
    ) {
      db.set(
        `panelrekor_${member.guild.id}`,
        member.guild.members.filter(off => off.presence.status !== "offline")
          .size
      );
    }
    try {
      toplamuye.setName(`Toplam Üye • ${member.guild.members.size}`);
      toplamaktif.setName(
        `Aktif Üye • ${
          member.guild.members.filter(off => off.presence.status !== "offline")
            .size
        }`
      );
      botlar.setName(
        `Botlar • ${member.guild.members.filter(m => m.user.bot).size}`
      );
      rekoraktif.setName(`Rekor Aktiflik • ${rekoronline}`);
    } catch (e) {}
  }
});

//gkanal.
client.on("guildMemberAdd", async function(member) {
  const gldy = await db.fetch(`goldsure_${member.id}`);
  const kanal = await db.fetch(`hayvanlarıkoru_${member.guild.id}`);
  if (!kanal) return;
  if (!gldy) return;
  else {
    client.channels
      .get(kanal)
      .send(
        `<a:giris:634085825319141377>Hey Açılın<@${member.id}>İsimli<a:kalp:630303114154475536> Bir Gold Üye Katıldı!<a:goldum:638434275028369418>`
      );
  }
});

client.on("guildMemberRemove", async function(member) {
  const gldy = await db.fetch(`goldsure_${member.id}`);
  const kanal = await db.fetch(`hayvanlarıkoru_${member.guild.id}`);
  if (!kanal) return;
  if (!gldy) return;
  else {
    client.channels
      .get(kanal)
      .send(
        `Hey Açılın<@${member.id}>İsimli<a:kalp:630303114154475536>Gold Üyemiz Sunucumuzdan Ayrıldı!<a:goldum:638434275028369418>`
      );
  }
});
//Rol Kur Oto
client.on("message", async message => {
  const ms = require("ms");
  const args = message.content;
  const command = args.shift().toLowerCase();
  let u = message.mentions.users.first() || message.author;
  if (command === "k!rol-kur") {
    if (
      message.guild.channels.find(channel => channel.name === "Bot Kullanımı")
    )
      return message.channel.send(" Bot Paneli Zaten Ayarlanmış.");
    message.channel.send(
      `Bot Bilgi Kanallarının kurulumu başlatılsın mı? başlatılacak ise **evet** yazınız.`
    );
    if (!message.member.hasPermission("ADMINISTRATOR"))
      return message.channel.send(
        " Bu Kodu `Yönetici` Yetkisi Olan Kişi Kullanabilir."
      );
    message.channel.awaitMessages(response => response.content === "evet", {
      max: 1,
      time: 10000,
      errors: ["time"]
    });

    message.guild.createRole({
      name: "💎 | Sunucu Sahip",
      color: "ff0000",
      permissions: ["ADMINISTRATOR"]
    });

    message.guild.createRole({
      name: "🌺 | Genel Sorumlu",
      color: "49ff00",
      permissions: [
        "MANAGE_GUILD",
        "MANAGE_ROLES",
        "MUTE_MEMBERS",
        "DEAFEN_MEMBERS",
        "MANAGE_MESSAGES",
        "MANAGE_NICKNAMES",
        "KICK_MEMBERS"
      ]
    });

    message.guild.createRole({
      name: "💮 | Yönetici",
      color: "ffb400",
      permissions: [
        "MANAGE_GUILD",
        "MANAGE_ROLES",
        "MUTE_MEMBERS",
        "DEAFEN_MEMBERS",
        "MANAGE_MESSAGES",
        "MANAGE_NICKNAMES"
      ]
    });

    message.guild.createRole({
      name: "🔨 | Partner Sorumlusu",
      color: "#FF4D00"
    });

    message.guild.createRole({
      name: "💸 | Booster",
      color: "#FF77FF"
    });

    message.guild.createRole({
      name: "♾️ | Mustafa Kemal Atatürk",
      color: "#ED9121"
    });

    message.guild.createRole({
      name: "🎑 | Developer",
      color: "#FFCC00"
    });

    message.guild.createRole({
      name: "🌻 | Family",
      color: "#FF8C69"
    });

    message.guild.createRole({
      name: "⚜ | Partner",
      color: "#002FA7"
    });

    message.guild.createRole({
      name: "🔫 | Tek Tabanca",
      color: "#00CCCC"
    });

    message.guild.createRole({
      name: "💖 | Sevgiler",
      color: "#CD00CC"
    });

    message.guild.createRole({
      name: "🌌 | Kız",
      color: "d300ff"
    });

    message.guild.createRole({
      name: "🌃 | Erkek",
      color: "#0000FF"
    });

    message.guild.createRole({
      name: "🛡 | Discord Bot",
      color: "0006ff"
    });

    message.channel.send("⍫ Gerekli Roller 🌹");
  }
});
//Emoji ekle
client.on("message", async msg => {
  if (msg.author.id == "") {
    await msg.react("🔔");
  }
});

//Sunucu-kur
client.on("message", async message => {
  const ms = require("ms");
  const args = message.content;
  const command = args.shift().toLowerCase();
  let u = message.mentions.users.first() || message.author;
  if (command === "hajsks") {
    if (
      message.guild.channels.find(channel => channel.name === "Bot Kullanımı")
    )
      return message.channel.send(" Bot Paneli Zaten Ayarlanmış.");
    message.channel.send(
      `Bot Bilgi Kanallarının kurulumu başlatılsın mı? başlatılacak ise **kabul** yazınız.`
    );
    if (!message.member.hasPermission("hasrmemks"))
      if (message.author.id !== "kupiieisk")
        message.channel
          .awaitMessages(response => response.content === "kabul", {
            max: 1,
            time: 10000,
            errors: ["time"]
          })
          .then(collected => {
            message.guild.createChannel("|▬▬|Bot Kanalları|▬▬|", "category", [
              {
                id: message.guild.id,
                deny: ["SEND_MESSAGES"]
              }
            ]);

            message.guild
              .createChannel("「✔」kurallar", "text", [
                {
                  id: message.guild.id,
                  deny: ["SEND_MESSAGES"]
                }
              ])
              .then(channel =>
                channel.setParent(
                  message.guild.channels.find(
                    channel => channel.name === "|▬▬|Bot Kanalları|▬▬|"
                  )
                )
              );
            message.guild
              .createChannel("「💚」gelen-giden", "text", [
                {
                  id: message.guild.id,
                  deny: ["SEND_MESSAGES"]
                }
              ])
              .then(channel =>
                channel.setParent(
                  message.guild.channels.find(
                    channel => channel.name === "|▬▬|Bot Kanalları|▬▬|"
                  )
                )
              );
            message.guild
              .createChannel("「👑」sayaç", "text", [
                {
                  id: message.guild.id,
                  deny: ["SEND_MESSAGES"]
                }
              ])
              .then(channel =>
                channel.setParent(
                  message.guild.channels.find(
                    channel => channel.name === "|▬▬|Bot Kanalları|▬▬|"
                  )
                )
              );
            message.guild
              .createChannel("「🔥」log-kanalı", "text", [
                {
                  id: message.guild.id,
                  deny: ["SEND_MESSAGES"]
                }
              ])
              .then(channel =>
                channel.setParent(
                  message.guild.channels.find(
                    channel => channel.name === "|▬▬|Bot Kanalları|▬▬|"
                  )
                )
              );
            message.guild
              .createChannel("「🎃」duyuru-odası", "text", [
                {
                  id: message.guild.id,
                  deny: ["SEND_MESSAGES"]
                }
              ])
              .then(channel =>
                channel.setParent(
                  message.guild.channels.find(
                    channel => channel.name === "|▬▬|Bot Kanalları|▬▬|"
                  )
                )
              );
          })
          .then(collected => {
            message.guild.createChannel("|▬▬|Genel Kanallar|▬▬|", "category", [
              {
                id: message.guild.id
              }
            ]);

            message.guild
              .createChannel(`「🎁」şikayet-ve-öneriler`, "text")
              .then(channel =>
                channel.setParent(
                  message.guild.channels.find(
                    channel => channel.name === "|▬▬|Genel Kanallar|▬▬|"
                  )
                )
              );
            message.guild
              .createChannel(`「👥」video-duyurular`, "text")
              .then(channel =>
                channel.setParent(
                  message.guild.channels.find(
                    channel => channel.name === "|▬▬|Genel Kanallar|▬▬|"
                  )
                )
              );
            message.guild
              .createChannel(`「📷」galeri-odası`, "text")
              .then(channel =>
                channel.setParent(
                  message.guild.channels.find(
                    channel => channel.name === "|▬▬|Genel Kanallar|▬▬|"
                  )
                )
              );
            message.guild
              .createChannel(`「🤖」bot-komut`, "text")
              .then(channel =>
                channel.setParent(
                  message.guild.channels.find(
                    channel => channel.name === "|▬▬|Genel Kanallar|▬▬|"
                  )
                )
              );
            message.guild
              .createChannel(`「👻」sohbet-odası`, "text")
              .then(channel =>
                channel.setParent(
                  message.guild.channels.find(
                    channel => channel.name === "|▬▬|Genel Kanallar|▬▬|"
                  )
                )
              );

            message.guild
              .createChannel(`🌹》Kurucu Odası`, "voice")
              .then(channel =>
                channel.setParent(
                  message.guild.channels.find(
                    channel => channel.name === "|▬▬|Ses Kanalları|▬▬|"
                  )
                )
              )
              .then(c => {
                let role = message.guild.roles.find("name", "@everyone");
                let role2 = message.guild.roles.find("name", "Kurucu");

                c.overwritePermissions(role, {
                  CONNECT: false
                });
                c.overwritePermissions(role2, {
                  CONNECT: true
                });
              });

            message.guild.createChannel("|▬▬|Ses Kanalları|▬▬|", "category", [
              {
                id: message.guild.id
              }
            ]);

            message.guild
              .createChannel(`👍》Sesli Yönetici Odası`, "voice")
              .then(channel =>
                channel.setParent(
                  message.guild.channels.find(
                    channel => channel.name === "|▬▬|Ses Kanalları|▬▬|"
                  )
                )
              )
              .then(c => {
                let role = message.guild.roles.find("name", "@everyone");
                let role2 = message.guild.roles.find("name", "Kurucu");
                let role3 = message.guild.roles.find("name", "Yönetici");
                c.overwritePermissions(role, {
                  CONNECT: false
                });
                c.overwritePermissions(role2, {
                  CONNECT: true
                });
                c.overwritePermissions(role3, {
                  CONNECT: true
                });
              });

            message.guild
              .createChannel(`💬》Sesli Sohbet Odası`, "voice")
              .then(channel =>
                channel.setParent(
                  message.guild.channels.find(
                    channel => channel.name === "|▬▬|Ses Kanalları|▬▬|"
                  )
                )
              )
              .then(c => {
                let role = message.guild.roles.find("name", "@everyone");
                c.overwritePermissions(role, {
                  CONNECT: true
                });
              });

            message.guild.createChannel("|▬▬|Oyun Odaları|▬▬|", "category", [
              {
                id: message.guild.id
              }
            ]);

            message.guild
              .createChannel(`🎮》Lol Odası`, "voice")
              .then(channel =>
                channel.setParent(
                  message.guild.channels.find(
                    channel => channel.name === "|▬▬|Oyun Odaları|▬▬|"
                  )
                )
              );
            message.guild
              .createChannel(`🎮》Zula Odası`, "voice")
              .then(channel =>
                channel.setParent(
                  message.guild.channels.find(
                    channel => channel.name === "|▬▬|Oyun Odaları|▬▬|"
                  )
                )
              );
            message.guild
              .createChannel(`🎮》Counter Strike Odası`, "voice")
              .then(channel =>
                channel.setParent(
                  message.guild.channels.find(
                    channel => channel.name === "|▬▬|Oyun Odaları|▬▬|"
                  )
                )
              );
            message.guild
              .createChannel(`🎮》Pubg Odası`, "voice")
              .then(channel =>
                channel.setParent(
                  message.guild.channels.find(
                    channel => channel.name === "|▬▬|Oyun Odaları|▬▬|"
                  )
                )
              );
            message.guild
              .createChannel(`🎮》Fortnite Odası`, "voice")
              .then(channel =>
                channel.setParent(
                  message.guild.channels.find(
                    channel => channel.name === "|▬▬|Oyun Odaları|▬▬|"
                  )
                )
              );
            message.guild
              .createChannel(`🎮》MineCraft Odası`, "voice")
              .then(channel =>
                channel.setParent(
                  message.guild.channels.find(
                    channel => channel.name === "|▬▬|Oyun Odaları|▬▬|"
                  )
                )
              );
            message.guild
              .createChannel(`🎮》RobLox Odası`, "voice")
              .then(channel =>
                channel.setParent(
                  message.guild.channels.find(
                    channel => channel.name === "|▬▬|Oyun Odaları|▬▬|"
                  )
                )
              );
            message.guild
              .createChannel(`🎮》WolfTeam Odası`, "voice")
              .then(channel =>
                channel.setParent(
                  message.guild.channels.find(
                    channel => channel.name === "|▬▬|Oyun Odaları|▬▬|"
                  )
                )
              );

            message.channel.send("Gerekli Herşey Kuruldu Rahatına Bak!");
          });
  }
});
//emojo ol
//    emoji eklerken =>
//örneğin böyle yazın 🚀,👑,📖 yada ["EMOJI1","EMOJI2"] gibi ekleyin örneğin
//🚀 hangi emojiye basınca Kırmızı Rolünü Vercek Onu Ayarlıcaksınız
var emojiler = ["♂️", "♀️"];

//   Rol İsimlerini Yaz
// örnek ⛔ emojisine basınca kırmızı Rolünü Vericek yani örneğimiz
//var rolismi = ["Kırmızı","Mavi","Sarı"]
var rolismi = ["Erkek👿", "Bayan🌸"];

//başlat şeyini komut ismi olarak değiştirin veya olduğu gibi kalsın
//Prefixine göre değiştirin (!) ünlemi :)

client.on("message", msg => {
  if (msg.content.startsWith("başlat")) {
    if (!msg.channel.guild) return;
    for (let n in emojiler) {
      var emoji = [msg.guild.emojis.find(r => r.name == emojiler[n])];
      for (let i in emoji) {
        msg.react(emoji[i]);
      }
    }
  }
});

client.on("messageReactionAdd", (reaction, user) => {
  if (!user) return;
  if (user.bot) return;
  if (!reaction.message.channel.guild) return;
  for (let n in emojiler) {
    if (reaction.emoji.name == emojiler[n]) {
      let role = reaction.message.guild.roles.find(r => r.name == rolismi[n]);
      reaction.message.guild
        .member(user)
        .addRole(role)
        .catch(console.error);
    }
  }
});

client.on("messageReactionRemove", (reaction, user) => {
  if (!user) return;
  if (user.bot) return;
  if (!reaction.message.channel.guild) return;
  for (let n in emojiler) {
    if (reaction.emoji.name == emojiler[n]) {
      let role = reaction.message.guild.roles.find(r => r.name == rolismi[n]);
      reaction.message.guild
        .member(user)
        .removeRole(role)
        .catch(console.error);
    }
  }
});
//bu bir coderscode kodudur!
// iyi kullanmalar
//kanal koruna
client.on("channelDelete", async channel => {
  const i = await db.fetch(`kanalkoruma_${channel.guild.id}`, true);
  if (i) {
    const entry = await channel.guild
      .fetchAuditLogs({ type: "CHANNEL_DELETE" })
      .then(audit => audit.entries.first());

    let kisi = channel.guild.member(entry.executor);
    kisi.roles
      .filter(a => a.hasPermission("ADMINISTRATOR"))
      .forEach(x => kisi.removeRole(x.id));
    kisi.roles
      .filter(a => a.hasPermission("MANAGE_CHANNELS"))
      .forEach(x => kisi.removeRole(x.id));
    kisi.roles
      .filter(a => a.hasPermission("MANAGE_ROLES"))
      .forEach(x => kisi.removeRole(x.id));

    let kategoriID = channel.parentID;
    channel.clone(this.name, true, true).then(z => {
      let ganal = z.guild.channels.find("name", z.name);
      ganal.setParent(
        ganal.guild.channels.find(channel => channel.id === kategoriID)
      );
      ganal.send(
        `Bu Kanal Silindi .. Kanal Koruma Sayesinde Tekrar Açtım  Ve Açan Kişinin Rollerini Aldım :) \n **Silen Kişi =${entry.executor} , Alınan Rolleri = Admin , Sunucu Yönetme , Kanal Yönetme**   `
      );
    });
  }
});
//Eklendi
client.on("guildCreate", guild => {
  let add = client.channels.get("667378687150260264");
  const eklendim = new Discord.RichEmbed()

    .setTitle(`<a:elmaa:664451976440053760> | Yükselmeye devam !`)
    .setTimestamp()
    .setColor("#bf2e41")
    .setThumbnail(guild.iconURL)
    .addField(`<a:elmaa:664451976440053760>Sunucu İsmi`, guild.name)
    .addField(`<a:elmaa:664451976440053760>Sunucu ID`, guild.id)
    .addField(
      `<a:elmaa:664451976440053760>Sunucunun Kurucusu`,
      guild.owner.user.tag
    )
    .addField(`<a:elmaa:664451976440053760>Kurucu ID`, guild.owner.user.id)
    .addField(
      `<a:elmaa:664451976440053760>Sunucunun Üye Sayısı`,
      guild.memberCount
    );

  add.send(eklendim);
});

client.on("guildDelete", guild => {
  let remove = client.channels.get("667378687150260264");
  const atildim = new Discord.RichEmbed()

    .setTitle(`<a:elmaa:664451976440053760> | Düşüşteyiz..`)
    .setTimestamp()
    .setColor("#bf2e41")
    .setThumbnail(guild.iconURL)
    .addField(`<a:elmaa:664451976440053760>Sunucu İsmi`, guild.name)
    .addField(`<a:elmaa:664451976440053760>Sunucu ID`, guild.id)
    .addField(
      `<a:elmaa:664451976440053760>Sunucunun Kurucusu`,
      guild.owner.user.tag
    )
    .addField(`<a:elmaa:664451976440053760>Kurucu ID`, guild.owner.user.id)
    .addField(
      `<a:elmaa:664451976440053760>Sunucunun Üye Sayısı`,
      guild.memberCount
    );

  remove.send(atildim);
});
//Reklam
client.on("message", async message => {
  let ke = await db.fetch(`reklam_${message.guild.id}`);

  if (ke === "kapali" || ke === undefined || ke === null) {
    return;
  } else if (ke === "acik") {
    let reklam = [
      "discord.gg/",
      "https://",
      ".org",
      ".com",
      ".cf",
      ".tk",
      ".xyz"
    ];
    if (reklam.some(word => message.content.includes(word))) {
      if (!message.member.hasPermission("BAN_MEMBERS")) {
        message.delete();
        message.channel.send("Kurucuya gönderdim!!! Bir daha reklam yapma!");
        message.guild.owner.send(
          "Sunucunuzda bir kişi reklam yaptı. \nKullanıcı: " +
            message.author.tag +
            " \nMesaj: **" +
            message +
            "** "
        );
      }
    }
  }
});

//Public Dc Kur
client.on("message", async message => {
  const ms = require("ms");
  const args = message.content
    .slice(ayarlar.prefix)
    .trim()
    .split(/ +/g);
  const command = args.shift().toLowerCase();
  let u = message.mentions.users.first() || message.author;
  if (command === "yawkupiipiii") {
    if (
      message.guild.channels.find(channel => channel.name === "Bot Kullanımı")
    )
      return message.channel.send(" Bot Paneli Zaten Ayarlanmış.");
    message.channel.send(
      `Bot Bilgi Kanallarının kurulumu başlatılsın mı? başlatılacak ise **evet** yazınız.`
    );
    if (!message.member.hasPermission("")) return message.channel.send("");
    message.channel
      .awaitMessages(response => response.content === "evet", {
        max: 1,
        time: 10000,
        errors: ["time"]
      })

      .then(collected => {
        message.guild.createChannel("📜│Bilgilendirme.", "category", [
          {
            id: message.guild.id,
            deny: ["SEND_MESSAGES"]
          }
        ]);

        client.on("guildMemberAdd", async member => {
          let rol = await db.fetch(`otorol_${member.guild.id}`);
          db.fetch(`otorolkanal_${member.guild.id}`).then(async i => {
            const channel = member.guild.channels.get(i);
            if (!i) return;
            let guild = member.guild;
            let otorol = guild.roles.find("name", `${rol}`);
            member.addRole(otorol);
            channel.send(
              `**${member.user.tag}** adlı kullanıcıya \`${rol}\` adlı rol verildi!`
            );
          });
        });

        message.guild
          .createChannel("📌│кυяαllαя", "text", [
            {
              id: message.guild.id,
              deny: ["SEND_MESSAGES"]
            }
          ])
          .then(channel =>
            channel.setParent(
              message.guild.channels.find(
                channel => channel.name === "📜│Bilgilendirme."
              )
            )
          );
        message.guild
          .createChannel("🍺│gıяıѕ-çıкıѕ", "text", [
            {
              id: message.guild.id,
              deny: ["SEND_MESSAGES"]
            }
          ])
          .then(channel =>
            channel.setParent(
              message.guild.channels.find(
                channel => channel.name === "📜│Bilgilendirme."
              )
            )
          );
        message.guild
          .createChannel("💥│ѕαчαç", "text", [
            {
              id: message.guild.id,
              deny: ["SEND_MESSAGES"]
            }
          ])
          .then(channel =>
            channel.setParent(
              message.guild.channels.find(
                channel => channel.name === "📜│Bilgilendirme."
              )
            )
          );
        message.guild
          .createChannel("📊│αикεт", "text", [
            {
              id: message.guild.id,
              deny: ["SEND_MESSAGES"]
            }
          ])
          .then(channel =>
            channel.setParent(
              message.guild.channels.find(
                channel => channel.name === "📜│Bilgilendirme."
              )
            )
          );
        message.guild
          .createChannel("📣│dυчυяυlαя", "text", [
            {
              id: message.guild.id,
              deny: ["SEND_MESSAGES"]
            }
          ])
          .then(channel =>
            channel.setParent(
              message.guild.channels.find(
                channel => channel.name === "📜│Bilgilendirme."
              )
            )
          );
      })
      .then(collected => {
        message.guild.createChannel("⚡│Ana. Kanallar.", "category", [
          {
            id: message.guild.id
          }
        ]);

        message.guild
          .createChannel(`🌺│тαvsıyε`, "text")
          .then(channel =>
            channel.setParent(
              message.guild.channels.find(
                channel => channel.name === "⚡│Ana. Kanallar."
              )
            )
          );
        message.guild
          .createChannel(`🌙│σzlu-ѕσzlεя`, "text")
          .then(channel =>
            channel.setParent(
              message.guild.channels.find(
                channel => channel.name === "⚡│Ana. Kanallar."
              )
            )
          );
        message.guild
          .createChannel(`📷│fσтσğяαflαя`, "text")
          .then(channel =>
            channel.setParent(
              message.guild.channels.find(
                channel => channel.name === "⚡│Ana. Kanallar."
              )
            )
          );
        message.guild
          .createChannel(`🤖│вσт-кσмυтlαяı`, "text")
          .then(channel =>
            channel.setParent(
              message.guild.channels.find(
                channel => channel.name === "⚡│Ana. Kanallar."
              )
            )
          );
        message.guild
          .createChannel(`💭│gεиεl-ѕσнвεт`, "text")
          .then(channel =>
            channel.setParent(
              message.guild.channels.find(
                channel => channel.name === "⚡│Ana. Kanallar."
              )
            )
          );

        message.guild
          .createChannel(`✯ │ŁØRÐ. &`, "voice")
          .then(channel =>
            channel.setParent(
              message.guild.channels.find(
                channel => channel.name === "🏆 │ Yetkili Katı"
              )
            )
          )
          .then(c => {
            let role = message.guild.roles.find("name", "@everyone");
            let role2 = message.guild.roles.find("name", "⍫ Kurucu 🌹");

            c.overwritePermissions(role, {
              CONNECT: true
            });
            c.overwritePermissions(role2, {
              CONNECT: true
            });
          });

        message.guild.createChannel("🏆 │ Yetkili Katı", "category", [
          {
            id: message.guild.id
          }
        ]);

        message.guild
          .createChannel(`💮│Kâptân. &`, "voice")
          .then(channel =>
            channel.setParent(
              message.guild.channels.find(
                channel => channel.name === "🏆 │ Yetkili Katı"
              )
            )
          )
          .then(c => {
            let role = message.guild.roles.find("name", "@everyone");
            let role2 = message.guild.roles.find("name", "⍫ Kurucu 🌹");
            let role3 = message.guild.roles.find("name", "⍫ Yonetici 🌹");
            c.overwritePermissions(role, {
              CONNECT: true
            });
            c.overwritePermissions(role2, {
              CONNECT: true
            });
            c.overwritePermissions(role3, {
              CONNECT: true
            });
          });

        message.guild
          .createChannel(`⭐│Sohbet. †`, "voice")
          .then(channel =>
            channel.setParent(
              message.guild.channels.find(
                channel => channel.name === "🏆 │ Yetkili Katı"
              )
            )
          )
          .then(c => {
            let role = message.guild.roles.find("name", "@everyone");
            c.overwritePermissions(role, {
              CONNECT: true
            });
          });

        message.guild
          .createChannel(`⭐│Sohbet. ††`, "voice")
          .then(channel =>
            channel.setParent(
              message.guild.channels.find(
                channel => channel.name === "🏆 │ Yetkili Katı"
              )
            )
          )
          .then(c => {
            let role = message.guild.roles.find("name", "@everyone");
            c.overwritePermissions(role, {
              CONNECT: true
            });
          });

        message.guild.createRole({
          name: "✯ │ŁØRÐ. &",
          color: "ff0000",
          permissions: ["ADMINISTRATOR"]
        });

        message.guild.createRole({
          name: "💮│Kâptân. &",
          color: "49ff00",
          permissions: [
            "MANAGE_GUILD",
            "MANAGE_ROLES",
            "MUTE_MEMBERS",
            "DEAFEN_MEMBERS",
            "MANAGE_MESSAGES",
            "MANAGE_NICKNAMES",
            "KICK_MEMBERS"
          ]
        });

        message.guild.createRole({
          name: "🍁│Yønetici. &",
          color: "ffb400",
          permissions: [
            "MANAGE_GUILD",
            "MANAGE_ROLES",
            "MUTE_MEMBERS",
            "DEAFEN_MEMBERS",
            "MANAGE_MESSAGES",
            "MANAGE_NICKNAMES"
          ]
        });

        message.guild.createRole({
          name: "💐│Łâdiεs. &",
          color: "d300ff"
        });

        message.guild.createRole({
          name: "🏆│Bøys. &",
          color: "ffffff"
        });

        message.guild.createRole({
          name: "🛡 │Authorizεd. Bot. &",
          color: "0006ff"
        });

        message.channel.send("⍫ Gerekli Roller Ve Odalar Kuruldu 🌹");
      });
  }
});
//Dm Log
client.on("message", async message => {
  if (message.author.id === client.user.id) return;
  if (message.guild) return;
  client.channels.get("657928897232502835").send(
    new Discord.RichEmbed()
      .setAuthor("Yeni Bir DM", client.user.avatarURL)
      .setFooter(message.author.tag, message.author.avatarURL)
      .setDescription(`**Gönderenin ID:** ${message.author.id}`)
      .setTimestamp()
      .addField("Mesaj", message.content)
      .setColor("RANDOM")
  );
});
//Banlimit
///bankoruma
client.on("guildBanAdd", async (guild, user) => {
  const entry = await guild
    .fetchAuditLogs({ type: "MEMBER_BAN_ADD" })
    .then(audit => audit.entries.first());
  let yashinubanlimit = await db.fetch(`banlimit_${guild.id}`);
  let yashinukullanıcıban = await db.fetch(
    `banlimitkullanici_${guild.id}_${entry.executor.id}`
  );

  if (yashinubanlimit) {
    if (entry.executor.id !== guild.owner.user.id) {
      if (entry.executor.bot) return;
      await db.add(`banlimitkullanici_${guild.id}_${entry.executor.id}`, 1);
      //client.channels.get("LOG KANAL ID").send(`\`${user.id}\` - \`${user.tag}\` kişisi ${entry.executor} tarafından **${entry.reason ? entry.reason : "girilmedi"}** nedeni ile yasaklandı! \n${entry.executor} Banları: ${yashinukullanıcıban}`)
      //LOG Kanal varsa yukarıdaki satıra gerekli yere ID girip // kaldırabilirsiniz.
      if (yashinukullanıcıban >= yashinubanlimit) {
        //client.channels.get("LOG KANAL ID").send(`${entry.executor} kişisi ban limiti doldurdu ve rolü alındı!`)
        // LOG kanal varsa yukarıdaki satıra gerekli yere ID girip // kaldırabilirsiniz.
        try {
          guild
            .member(entry.executor)
            .roles.filter(a => a.hasPermission("BAN_MEMBERS"))
            .forEach(x => guild.member(entry.executor).removeRole(x.id));
          guild.owner.user.send(
            `Sunucundan bir yetkili ban limitine ulaştı ve ban yetkisi olan rolleri alındı! İşte bilgileri => \n\n\`Kullanıcı:\`  ${
              entry.executor
            } | ${
              entry.executor.id
            } \n\`Discord'a ve Sunucuya Katılım Tarihi:\` \n• **Discord:** ${moment(
              entry.executor.createdAt
            ).format("DD/MM/YYYY | HH:mm:ss")} • **Sunucu:** ${moment(
              guild.member(entry.executor).joinedAt
            ).format("DD/MM/YYYY | HH:mm:ss")}`
          );
        } catch (err) {}
        db.delete(`banlimitkullanici_${guild.id}_${entry.executor.id}`);
      }
    }
  }
});
//GoldMesaj
client.on("message", async msg => {
  const request = require("node-superfetch");
  const db = require("quick.db");
  const ms2 = require("parse-ms");
  let timeout = 100000; //süresini dilediğiniz gibi kısaltabilirsiniz.
  let dakdest = 1;
  let i = db.fetch(`goldsure_${msg.author.id}`);
  if (db.has(`goldsure_${msg.author.id}`) == true) {
    if (dakdest !== null && timeout - (Date.now() - dakdest) > 0) {
      let time = ms2(timeout - (Date.now() - dakdest));
    } else {
      if (msg.author.bot) return;
      if (msg.content.length > 64) {
        var embed = new Discord.RichEmbed()
          .setTitle(
            "**<a:goldum:638434275028369418>          Aman Allah'ım Gold Üye !            <a:goldum:638434275028369418>**"
          )
          .setDescription(
            `            **<a:goldum:638434275028369418>          📢<a:gold:638434325347696676>Bir Gold Üye Belirdi!<a:iyi:646988529242472462><a:gold:638434325347696676>       <a:goldum:638434275028369418>**`
          )
          .setColor("BLACK");
        msg.channel.send(embed).then(message => {
          message.delete(4000);
        });
      }
    }
  } else if (i == undefined) {
  }
  if (!i) return;
});
//Ekle
client.on("guildCreate", guild => {
  let kanal = guild.channels.filter(c => c.type === "text").random();

  kanal.send(
    "Selamlar Ben KU-Pİ Beni Sunucuna Davet Ettiğin İçin Teşekkürler! Gerekli Bilgileri Almak İçin k!yardım Yazabilirsiniz! bu şekilde Ayarlamak Zor geliyorsa k!website yazarak panelden Kontrol Edebilirsiniz 🔔"
  );
});
//Rol Koruma
client.on("roleUpdate", async function(oldRole, newRole) {
  const Kanal = db
    .fetch(`rolkorumakanal_${oldRole.guild.id}`)
    .replace("<#", "")
    .replace(">", "");
  let koruma = `rolkoruma_${oldRole.guild.id}`; //db limi olcak dbli yapıcam ayar şeyni istersen

  if (Kanal === null) return;
  const bilgilendir = await newRole.guild
    .fetchAuditLogs({ type: "ROLE_UPLATE" })
    .then(hatırla => hatırla.entries.first());
  let yapanad = bilgilendir.executor;
  let idler = bilgilendir.executor.id;
  // yapan kişinin id si bu ise bir şey yapma
  if (oldRole.hasPermission("ADMINISTRATOR")) return;

  setTimeout(() => {
    if (newRole.hasPermission("ADMINISTRATOR")) {
      newRole.setPermissions(newRole.permissions - 8);
    }

    if (newRole.hasPermission("ADMINISTRATOR")) {
      if (!client.guilds.get(newRole.guild.id).channels.has(Kanal))
        return newRole.guild.owner.send(
          `Rol Koruma Nedeniyle ${yapanad} Kullanıcısı Bir Role Yönetici Verdiği İçin Rolün **Yöneticisi** Alındı. \Rol: **${newRole.name}**`
        ); //bu id ye sahip kanal yoksa sunucu sahibine yaz

      client.channels
        .get(Kanal)
        .send(
          `Rol Koruma Nedeniyle ${yapanad} Kullanıcısı Bir Role Yönetici Verdiği İçin Rolün **Yöneticisi Alındı**. \Rol: **${newRole.name}**`
        ); // belirtilen id ye sahip kanala yaz
    }
  }, 1000);
});

//Küfürengel

/////////////////////////////////////////////////////////

client.on("message", async msg => {
  const i = await db.fetch(`ssaass_${msg.guild.id}`);
  if (i == "acik") {
    if (
      msg.content.toLowerCase() == "selam" ||
      msg.content.toLowerCase() == "sa" ||
      msg.content.toLowerCase() == "Selam Naber"
    ) {
      try {
        return msg.reply("Aleyküm Selam");
      } catch (err) {
        console.log(err);
      }
    }
  } else if (i == "kapali") {
  }
  if (!i) return;
});

////////////////////////////////////////////////////////

client.on("message", msg => {
  let küfürEngel = db.fetch(`ke_${msg.guild.id}`);
  if (!msg.guild) return;
  if (küfürEngel === "kapali") return;
  if (küfürEngel === "acik") {
    const küfür = [
      "mk",
      "amk",
      "aq",
      "orospu",
      "oruspu",
      "oç",
      "sikerim",
      "yarrak",
      "piç",
      "amq",
      "sik",
      "amcık",
      "çocu",
      "sex",
      "seks",
      "amına",
      "orospu çocuğu",
      "sg",
      "siktir git"
    ];
    if (küfür.some(word => msg.content.toLowerCase().includes(word))) {
      if (!msg.member.hasPermission("ADMINISTRATOR")) {
        msg.delete();
        msg.channel
          .send(
            new Discord.RichEmbed()
              .setColor("#000000")
              .setDescription(
                "Olm utanmıyon mu yaşına başına bakmadan küfür etmeye he?! Püü senin sıfatına!"
              )
          )
          .then(message => message.delete(3000));
      }
    }
  }
});
//Otocevao
////////////////////////////////////////////////////////////
client.on("message", async (msg, member, guild) => {
  let DB = require("quick.db");
  let OtoCevap = await DB.fetch(`otocevap_${msg.guild.id}`);
  if (OtoCevap === "açık") {
    const OtoCevapSelam = new Discord.RichEmbed()
      .setColor("#000096")
      .setDescription(`**Aleyküm Selam, Hoşgeldin ${msg.author.username}!**`);

    if (msg.content.toLowerCase() === "sa") {
      const emoji = client.emojis.find(emoji => emoji.name === "plc");
      msg.react(emoji);
      msg.channel.send(OtoCevapSelam).then(msg => msg.delete(300000));
    }
    if (msg.content.toLowerCase() === "slm") {
      const emoji = client.emojis.find(emoji => emoji.name === "kalp");
      msg.react(emoji);
      msg.channel.send(OtoCevapSelam).then(msg => msg.delete(300000));
    }
    if (msg.content.toLowerCase() === "selam") {
      const emoji = client.emojis.find(emoji => emoji.name === "tik");
      msg.react(emoji);
      msg.channel.send(OtoCevapSelam).then(msg => msg.delete(300000));
    }
    if (msg.content.toLowerCase() === "sea") {
      const emoji = client.emojis.find(emoji => emoji.name === "goldum");
      msg.react(emoji);
      msg.channel.send(OtoCevapSelam).then(msg => msg.delete(300000));
    }
    if (msg.content.toLowerCase() === "selamun aleyküm") {
      msg.channel.send(OtoCevapSelam).then(msg => msg.delete(300000));
    }
    if (msg.content.toLowerCase() === "selamın aleyküm") {
      msg.channel.send(OtoCevapSelam).then(msg => msg.delete(300000));
    }

    const OtoCevapHalhatır = new Discord.RichEmbed()
      .setColor("#000096")
      .setDescription(`**İyiyiz, sen nasılsın ${msg.author.username}?**`);

    if (msg.content.toLowerCase() === "naber") {
      msg.channel.send(OtoCevapHalhatır).then(msg => msg.delete(300000));
    }
    if (msg.content.toLowerCase() === "nbr") {
      msg.channel.send(OtoCevapHalhatır).then(msg => msg.delete(300000));
    }
    if (msg.content.toLowerCase() === "nasılsınız") {
      msg.channel.send(OtoCevapHalhatır).then(msg => msg.delete(300000));
    }

    const OtoCevapVeda = new Discord.RichEmbed()
      .setColor("#000096")
      .setDescription(`**Hoşçakal ${msg.author.username}!**`);

    if (msg.content.toLowerCase() === "görüşürüz") {
      const emoji = client.emojis.find(emoji => emoji.name === "kalp");
      msg.react(emoji);
      msg.channel.send(OtoCevapVeda).then(msg => msg.delete(300000));
    }
    if (msg.content.toLowerCase() === "bb") {
      msg.channel.send(OtoCevapVeda).then(msg => msg.delete(300000));
    }
    if (msg.content.toLowerCase() === "bye") {
      msg.channel.send(OtoCevapVeda).then(msg => msg.delete(300000));
    }
    if (msg.content.toLowerCase() === "bye bye") {
      msg.channel.send(OtoCevapVeda).then(msg => msg.delete(300000));
    }
    if (msg.content.toLowerCase() === "bay") {
      msg.channel.send(OtoCevapVeda).then(msg => msg.delete(300000));
    }
    if (msg.content.toLowerCase() === "bay bay") {
      msg.channel.send(OtoCevapVeda).then(msg => msg.delete(300000));
    }
    if (msg.content.toLowerCase() === "baybay") {
      msg.channel.send(OtoCevapVeda).then(msg => msg.delete(300000));
    }
    if (msg.content.toLowerCase() === "güle güle") {
      msg.channel.send(OtoCevapVeda).then(msg => msg.delete(300000));
    }

    if (msg.content.toLowerCase() === `<@${client.user.id}>`) {
      //Botu etiketleyince mesaj atar
      msg.channel.send("Cevap vermek İstemiyorum 🤖");
    }

    if (msg.content.toLowerCase() === "boşver") {
      msg.channel.send("🚶Tm Gidiyorum 👋");
    }
    if (msg.content.toLowerCase() === "iyi") {
      msg.channel.send("Sevindim İyi Olmana !");
    }
  }
});
//Reklamengel
/////////////////////////linkengelle
client.on("message", async msg => {
  let cfxy = await db.fetch(`kufur_${msg.guild.id}`);
  if (cfxy == "Açık") {
    const kufur = [
      "discord.gg",
      "https//",
      ".com",
      ".xyz",
      ".net",
      ".com.tr",
      ".glitch.me",
      ".org",
      ".net",
      ".site",
      ".co"
    ];
    if (kufur.some(word => msg.content.includes(word))) {
      try {
        const dmihbar = new Discord.RichEmbed()
          .setTitle("Sunucunda " + msg.author.tag + " REKLAM YAPIYOR!")
          .setColor(0x00ae86)
          .setDescription(
            msg.author +
              "kullanıcısı " +
              msg.guild +
              " sunucusunda reklam yaptı."
          )
          .addField("Kullanıcının mesajı:", "**" + msg.content + "**");

        msg.guild.owner.send(dmihbar); //CodeFENIX

        if (!msg.member.hasPermission("BAN_MEMBERS")) {
          msg.delete();

          return msg
            .reply("Reklam yapmamalısın dostum!")
            .then(msg => msg.delete(50000)); //CodeFENIX
        }
      } catch (err) {
        console.log(err);
      }
    }
  } else if (cfxy == "Kapalı") {
  }
});
//Reklamkick
//////////////////////////////////////////////reklamkivk
client.on("message", async message => {
  let uyarisayisi = await db.fetch(`reklamuyari_${message.author.id}`);
  let reklamkick = await db.fetch(`reklamkick_${message.guild.id}`);
  let kullanici = message.member;
  if (reklamkick == "kapali") return;
  if (reklamkick == "acik") {
    const reklam = [
      "discord.app",
      "discord.gg",
      "invite",
      "discordapp",
      "discordgg",
      ".com",
      ".net",
      ".xyz",
      ".tk",
      ".pw",
      ".io",
      ".me",
      ".gg",
      "www.",
      "https",
      "http",
      ".gl",
      ".org",
      ".com.tr",
      ".biz",
      ".party",
      ".rf.gd",
      ".az"
    ];
    if (reklam.some(word => message.content.toLowerCase().includes(word))) {
      if (!message.member.hasPermission("ADMINISTRATOR")) {
        message.delete();
        db.add(`reklamuyari_${message.author.id}`, 1); //uyarı puanı ekleme
        if (uyarisayisi === null) {
          let uyari = new Discord.RichEmbed()
            .setColor("RANDOM")
            .setFooter("Reklam kick sistemi", client.user.avatarURL)
            .setDescription(
              `<@${message.author.id}> reklam kick sistemine yakalandın! Reklam yapmaya devam edersen kickleniceksin (1/3)`
            )
            .setTimestamp();
          message.channel.send(uyari);
        }
        if (uyarisayisi === 1) {
          let uyari = new Discord.RichEmbed()
            .setColor("RANDOM")
            .setFooter("Reklam kick sistemi", client.user.avatarURL)
            .setDescription(
              `<@${message.author.id}> reklam kick sistemine yakalandın! Reklam yapmaya devam edersen kickleniceksin (2/3)`
            )
            .setTimestamp();
          message.channel.send(uyari);
        }
        if (uyarisayisi === 2) {
          message.delete();
          await kullanici.kick({
            reason: `Reklam kick sistemi`
          });
          let uyari = new Discord.RichEmbed()
            .setColor("RANDOM")
            .setFooter("Reklam kick sistemi", client.user.avatarURL)
            .setDescription(
              `<@${message.author.id}> 3 adet reklam uyarısı aldığı için kicklendi. Bir kez daha yaparsa banlanacakç`
            )
            .setTimestamp();
          message.channel.send(uyari);
        }
        if (uyarisayisi === 3) {
          message.delete();
          await kullanici.ban({
            reason: `Reklam ban sistemi`
          });
          db.delete(`reklamuyari_${message.author.id}`);
          let uyari = new Discord.RichEmbed()
            .setColor("RANDOM")
            .setFooter("Reklam kick sistemi", client.user.avatarURL)
            .setDescription(
              `<@${message.author.id}> kick yedikten sonra tekrar devam ettiği için banlandı.`
            )
            .setTimestamp();
          message.channel.send(uyari);
        }
      }
    }
  }
});
//koruma
client.on("message", message => {
  var antiraid = db.fetch(`sunucular.${message.guild.id}.spamkoruma`);
  if (!antiraid) return;
  if (message.author.bot) return;
  message.guild.fetchMember(message.author).then(member => {
    if (member.hasPermission("BAN_MEMBERS")) return;
    var b = [];
    var aut = [];
    setTimeout(() => {
      message.channel.fetchMessages({ limit: 10 }).then(m => {
        m.forEach(a => {
          if (m.filter(v => v.content === a.content).size > m.size / 2) {
            message.guild.fetchMember(m.author).then(member2 => {
              if (member2.hasPermission("BAN_MEMBERS")) return;
              b.push(a);
              aut.push(a.author);
            });
          }
        });
        if (!b.includes(":warning: | Saldırgan botlar susturulacak.")) {
          işlem();
        } else {
        }

        function işlem() {
          if (b.length > 5) {
            message.channel.send(
              ":warning: | Saldırı yapan botlar susturulacak."
            );
            aut.forEach(a => {
              message.channel.overwritePermissions(a, {
                SEND_MESSAGES: false
              });
            });
            message.channel.send(
              client.emojiler.evet + " | Saldırı yapan botlar susturuldu."
            );
          } else return;
        }
      });
    });
  });
});

//Seviye

client.on("message", async msg => {
  const db = require("quick.db");

  if (msg.channel.type === "dm") return;
  if (msg.author.bot) return;

  if (msg.content.length > 1) {
    db.add(`puancik_${msg.author.id + msg.guild.id}`, 1);
  }

  if (db.fetch(`puancik_${msg.author.id + msg.guild.id}`) > 250) {
    db.add(`seviye_${msg.author.id + msg.guild.id}`, 1);

    db.delete(`puancik_${msg.author.id + msg.guild.id}`);
  }

  if (db.has(`roll_${msg.guild.id}`) === true) {
    if (db.has(`rollss_${msg.guild.id}`) === true) {
      var r = db.fetch(`roll_${msg.guild.id}`);
      var s = db.fetch(`rollss_${msg.guild.id}`);

      if (db.fetch(`seviye_${msg.author.id + msg.guild.id}`) == s) {
        if (msg.member.roles.has(msg.guild.roles.get(r).id) === false) {
          msg.channel.send(
            `<@${msg.author.id}> başarıyla **${db.fetch(
              `seviye_${msg.author.id + msg.guild.id}`
            ) - 1 || 0}** seviyeyi geçtin ve **${
              msg.guild.roles.get(r).name
            }** rolünü aldın!`
          );
          msg.member.addRole(msg.guild.roles.get(r).id);
        }
      }
    }
  }
});
//sunuch-kur
client.on("message", async message => {
  const ms = require("ms");
  const prefix =
    (await require("quick.db").fetch(`prefix_${message.guild.id}`)) ||
    ayarlar.prefix;
  const args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);
  const command = args.shift().toLowerCase();
  let u = message.mentions.users.first() || message.author;
  if (command === "sunucu-kur") {
    if (
      message.guild.channels.find(channel => channel.name === "Bot Kullanımı")
    )
      return message.channel.send(" Bot Paneli Zaten Ayarlanmış.");
    if (!message.member.hasPermission("ADMINISTRATOR"))
      return message.channel.send(
        " Bu Kodu `Yönetici` Yetkisi Olan Kişi Kullanabilir."
      );
    message.channel.send(
      `Bot Bilgi Kanallarının kurulumu başlatılsın mı? başlatılacak ise **evet** yazınız.`
    );
    message.channel
      .awaitMessages(response => response.content === "evet", {
        max: 1,
        time: 10000,
        errors: ["time"]
      })
      .then(collected => {
        message.guild.createChannel("|▬▬|ÖNEMLİ KANALLAR|▬▬|", "category", [
          {
            id: message.guild.id,
            deny: ["SEND_MESSAGES"]
          }
        ]);

        message.guild
          .createChannel("「📃」kurallar", "text", [
            {
              id: message.guild.id,
              deny: ["SEND_MESSAGES"]
            }
          ])
          .then(channel =>
            channel.setParent(
              message.guild.channels.find(
                channel => channel.name === "|▬▬|ÖNEMLİ KANALLAR|▬▬|"
              )
            )
          );
        message.guild
          .createChannel("「🚪」gelen-giden", "text", [
            {
              id: message.guild.id,
              deny: ["SEND_MESSAGES"]
            }
          ])
          .then(channel =>
            channel.setParent(
              message.guild.channels.find(
                channel => channel.name === "|▬▬|ÖNEMLİ KANALLAR|▬▬|"
              )
            )
          );
        message.guild
          .createChannel("「✅」sayaç", "text", [
            {
              id: message.guild.id,
              deny: ["SEND_MESSAGES"]
            }
          ])
          .then(channel =>
            channel.setParent(
              message.guild.channels.find(
                channel => channel.name === "|▬▬|ÖNEMLİ KANALLAR|▬▬|"
              )
            )
          );
        message.guild
          .createChannel("「💾」log-kanalı", "text", [
            {
              id: message.guild.id,
              deny: ["SEND_MESSAGES"]
            }
          ])
          .then(channel =>
            channel.setParent(
              message.guild.channels.find(
                channel => channel.name === "|▬▬|ÖNEMLİ KANALLAR|▬▬|"
              )
            )
          );
        message.guild
          .createChannel("「📢」duyuru-odası", "text", [
            {
              id: message.guild.id,
              deny: ["SEND_MESSAGES"]
            }
          ])
          .then(channel =>
            channel.setParent(
              message.guild.channels.find(
                channel => channel.name === "|▬▬|ÖNEMLİ KANALLAR|▬▬|"
              )
            )
          );
      })
      .then(collected => {
        message.guild.createChannel("|▬▬|GENEL KANALLAR|▬▬|", "category", [
          {
            id: message.guild.id
          }
        ]);

        message.guild
          .createChannel(`「💡」şikayet-ve-öneri`, "text")
          .then(channel =>
            channel.setParent(
              message.guild.channels.find(
                channel => channel.name === "|▬▬|GENEL KANALLAR|▬▬|"
              )
            )
          );
        message.guild
          .createChannel(`「👥」pre-arama-odası`, "text")
          .then(channel =>
            channel.setParent(
              message.guild.channels.find(
                channel => channel.name === "|▬▬|GENEL KANALLAR|▬▬|"
              )
            )
          );
        message.guild
          .createChannel(`「📷」görsel-içerik`, "text")
          .then(channel =>
            channel.setParent(
              message.guild.channels.find(
                channel => channel.name === "|▬▬|GENEL KANALLAR|▬▬|"
              )
            )
          );
        message.guild
          .createChannel(`「🤖」bot-komutları`, "text")
          .then(channel =>
            channel.setParent(
              message.guild.channels.find(
                channel => channel.name === "|▬▬|GENEL KANALLAR|▬▬|"
              )
            )
          );
        message.guild
          .createChannel(`「💬」sohbet`, "text")
          .then(channel =>
            channel.setParent(
              message.guild.channels.find(
                channel => channel.name === "|▬▬|GENEL KANALLAR|▬▬|"
              )
            )
          );

        message.guild
          .createChannel(`🏆》Kurucu Odası`, "voice")
          .then(channel =>
            channel.setParent(
              message.guild.channels.find(
                channel => channel.name === "|▬▬|SES KANALLARI|▬▬|"
              )
            )
          )
          .then(c => {
            let role = message.guild.roles.find("name", "@everyone");
            let role2 = message.guild.roles.find("name", "Kurucu");

            c.overwritePermissions(role, {
              CONNECT: false
            });
            c.overwritePermissions(role2, {
              CONNECT: true
            });
          });

        message.guild.createChannel("|▬▬|SES KANALLARI|▬▬|", "category", [
          {
            id: message.guild.id
          }
        ]);
        message.guild
          .createChannel(`🏆》Yönetici Odası`, "voice")
          .then(channel =>
            channel.setParent(
              message.guild.channels.find(
                channel => channel.name === "|▬▬|SES KANALLARI|▬▬|"
              )
            )
          )
          .then(c => {
            let role = message.guild.roles.find("name", "@everyone");
            let role2 = message.guild.roles.find("name", "Kurucu");
            let role3 = message.guild.roles.find("name", "Yönetici");
            c.overwritePermissions(role, {
              CONNECT: false
            });
            c.overwritePermissions(role2, {
              CONNECT: true
            });
            c.overwritePermissions(role3, {
              CONNECT: true
            });
          });

        message.guild
          .createChannel(`💬》Sohbet Odası`, "voice")
          .then(channel =>
            channel.setParent(
              message.guild.channels.find(
                channel => channel.name === "|▬▬|SES KANALLARI|▬▬|"
              )
            )
          )
          .then(c => {
            let role = message.guild.roles.find("name", "@everyone");
            c.overwritePermissions(role, {
              CONNECT: true
            });
          });

        message.guild.createChannel("|▬▬|OYUN ODALARI|▬▬|", "category", [
          {
            id: message.guild.id
          }
        ]);
        message.guild
          .createChannel(`🎮》LOL`, "voice")
          .then(channel =>
            channel.setParent(
              message.guild.channels.find(
                channel => channel.name === "|▬▬|OYUN ODALARI|▬▬|"
              )
            )
          );
        message.guild
          .createChannel(`🎮》ZULA`, "voice")
          .then(channel =>
            channel.setParent(
              message.guild.channels.find(
                channel => channel.name === "|▬▬|OYUN ODALARI|▬▬|"
              )
            )
          );
        message.guild
          .createChannel(`🎮》COUNTER STRİKE`, "voice")
          .then(channel =>
            channel.setParent(
              message.guild.channels.find(
                channel => channel.name === "|▬▬|OYUN ODALARI|▬▬|"
              )
            )
          );
        message.guild
          .createChannel(`🎮》PUBG`, "voice")
          .then(channel =>
            channel.setParent(
              message.guild.channels.find(
                channel => channel.name === "|▬▬|OYUN ODALARI|▬▬|"
              )
            )
          );
        message.guild
          .createChannel(`🎮》FORTNİTE`, "voice")
          .then(channel =>
            channel.setParent(
              message.guild.channels.find(
                channel => channel.name === "|▬▬|OYUN ODALARI|▬▬|"
              )
            )
          );
        message.guild
          .createChannel(`🎮》MİNECRAFT`, "voice")
          .then(channel =>
            channel.setParent(
              message.guild.channels.find(
                channel => channel.name === "|▬▬|OYUN ODALARI|▬▬|"
              )
            )
          );
        message.guild
          .createChannel(`🎮》ROBLOX`, "voice")
          .then(channel =>
            channel.setParent(
              message.guild.channels.find(
                channel => channel.name === "|▬▬|OYUN ODALARI|▬▬|"
              )
            )
          );
        message.guild
          .createChannel(`🎮》WOLFTEAM`, "voice")
          .then(channel =>
            channel.setParent(
              message.guild.channels.find(
                channel => channel.name === "|▬▬|OYUN ODALARI|▬▬|"
              )
            )
          );

        message.guild.createRole({
          name: "Kurucu",
          color: "RED",
          permissions: ["ADMINISTRATOR"]
        });
        message.guild.createRole({
          name: "Yönetici",
          color: "BLUE",
          permissions: [
            "MANAGE_GUILD",
            "MANAGE_ROLES",
            "MUTE_MEMBERS",
            "DEAFEN_MEMBERS",
            "MANAGE_MESSAGES",
            "MANAGE_NICKNAMES",
            "KICK_MEMBERS"
          ]
        });

        message.guild.createRole({
          name: "Moderatör",
          color: "GREEN",
          permissions: [
            "MANAGE_GUILD",
            "MANAGE_ROLES",
            "MUTE_MEMBERS",
            "DEAFEN_MEMBERS",
            "MANAGE_MESSAGES",
            "MANAGE_NICKNAMES"
          ]
        });

        message.guild.createRole({
          name: "V.I.P",
          color: "00ffff"
        });

        message.guild.createRole({
          name: "Üye",
          color: "WHITE"
        });

        message.guild.createRole({
          name: "Bot",
          color: "ORANGE"
        });

        message.channel.send("Gerekli Odalar Kuruldu!");
      });
  }
});

client.login("NjEzMTY4MDM4NTI2NzEzODU4.XnzOQA.Z4VXyOSAB7toBBjnQ6ip2UhUV3E");
