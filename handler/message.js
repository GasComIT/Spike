//┌╔════『 🎐𝐈𝐧𝐟𝐨𝐫𝐦𝐚𝐭𝐢𝐨𝐧🎐 』══════
//│║⦁ 𝐧𝐚𝐦𝐞:𝐒𝐩𝐢𝐤𝐞 🍃
//│║⦁ whatsapp gaming userbot with automation,moderation,music, fun and 100+ commands!
//│║⦁ 𝐠𝐩𝐚𝐲: +254718241545
//│║⦁ 𝐮𝐩𝐢: krakinzlab@oksbi
//│║⦁ 𝐠𝐢𝐭: github.com/GasComIT
//│║⦁ 𝐠𝐫𝐨𝐮𝐩: ❝ Ⓒ𝐒𝐩𝐢𝐤𝐞 ❞.gascomit.repl.co
//│║⭕ youtube.com/@krakinzlab
// ╚═════════════════════ 🍃
// ❝ Ⓒ𝐒𝐩𝐢𝐤𝐞 ❞
// ⭕ youtube.com/channel/UCBsVizIDS4GCz90DQvkjNxA

const {
    WASocket,
    proto,
    getContentType,
    downloadContentFromMessage
} = require('@adiwajshing/baileys')
global.axios = require('axios')
    .default
const gis = require("g-i-s");
const {
    PassThrough
} = require('stream')
const yts = require("yt-search")
const {
    exec
} = require("child_process")
const moment = require('moment-timezone')
const Genius = require("genius-lyrics")
const Client = new Genius.Client();
const marika = require("@shineiichijo/marika")
const characterClient = new marika.Character();
const ffmpeg = require('fluent-ffmpeg')
const canvacord = require('canvacord')
const {
    uploadByBuffer,
    uploadByUrl
} = require('telegraph-uploader')
const FormData = require('form-data')
const chalk = require('chalk')
const fs = require('fs')
const {
    writeFile
} = require("fs/promises");
const ms = require("parse-ms");
const wiki = require('wikipedia');
const heartbeats = require('heartbeats');
const sortArray = require('sort-array')
const ytdl = require('ytdl-core')
const TD = require('better-tord');
const name = process.env.NAME || "©GasCoMIT"
let mods = process.env.MODS;
if (!mods) {
    mods = "254718241545@s.whatsapp.net";
}
const ownerNumber = mods.split(",");
const {
    Sticker,
    StickerTypes
} = require('wa-sticker-formatter')
const error = 'https://i.imgur.com/TMdJIaW.jpeg'
const {
    Database
} = require('quickmongo');
global.db = new Database(process.env.MONGODB);
var heart = heartbeats.createHeart(5000);

const color = (text, color) => {
    return !color ? chalk.green(text) : chalk.keyword(color)(text)
}

db.on("ready", () => {
    console.log("❝ Ⓒ𝐒𝐩𝐢𝐤𝐞 ❞ Connected to database🍃");
});

Array.prototype.random = function () {
    return this[Math.floor(Math.random() * this.length)]
}

module.exports = async (sock, msg) => {
    
    const time = moment()
        .tz('Africa/Nairobi')
        .format('HH:mm:ss')
        .split(":")
    if (msg.key && msg.key.remoteJid === 'status@broadcast') return
    if (!msg.message) return
    
    const type = getContentType(msg.message)
    const quotedType = getContentType(msg.message?.extendedTextMessage?.contextInfo?.quotedMessage) || null
    
    
    const botId = sock.user.id.includes(':') ? sock.user.id.split(':')[0] + '@s.whatsapp.net' : sock.user.id
    
    const from = msg.key.remoteJid
    const body = type == 'conversation' ? msg.message?.conversation : msg.message[type]?.caption || msg.message[type]?.text || ''
    const responseMessage = type == 'listResponseMessage' ? msg.message?.listResponseMessage?.singleSelectReply?.selectedRowId || '' : type == 'buttonsResponseMessage' ? msg.message?.buttonsResponseMessage?.selectedButtonId || '' : ''
    const isGroup = from.endsWith('@g.us')
    
    var sender = isGroup ? msg.key.participant : msg.key.remoteJid
    sender = sender.includes(':') ? sender.split(':')[0] + '@s.whatsapp.net' : sender
    const senderName = msg.pushName
    const senderNumber = sender.split('@')[0]
    
    const groupMetadata = isGroup ? await sock.groupMetadata(from) : null
    const groupName = groupMetadata?.subject || ''
    const groupMembers = groupMetadata?.participants || []
    const groupAdmins = groupMembers.filter((v) => v.admin)
        .map((v) => v.id)
    
    const prefix = process.env.PREFIX
    const isCmd = body.startsWith(prefix)
    const isGroupAdmins = groupAdmins.includes(sender)
    const isBotGroupAdmins = groupMetadata && groupAdmins.includes(botId)
    const isOwner = ownerNumber.includes(sender)
    const checkInGroup = (m) => {
        let members = [];
        for (let ids of groupMetadata.participants) {
            members.push(ids.id);
        }
        return members.includes(m);
    };
    
    let command = isCmd ? body.slice(1)
        .trim()
        .split(' ')
        .shift()
        .toLowerCase() : ''
    let responseId = msg.message?.listResponseMessage?.singleSelectReply?.selectedRowId || msg.message?.buttonsResponseMessage?.selectedButtonId || null
    let args = body.trim()
        .split(' ')
        .slice(1)
    let text = body.replace(command, '')
        .slice(1)
        .trim()
    const isUser = await db.get(sender) || undefined
    let mentioned = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid || []
    
    const isImage = type == 'imageMessage'
    const isVideo = type == 'videoMessage'
    const isAudio = type == 'audioMessage'
    const isSticker = type == 'stickerMessage'
    const isContact = type == 'contactMessage'
    const isLocation = type == 'locationMessage'
    
    const isQuoted = type == 'extendedTextMessage'
    const isQuotedImage = isQuoted && quotedType == 'imageMessage'
    const isQuotedVideo = isQuoted && quotedType == 'videoMessage'
    const isQuotedAudio = isQuoted && quotedType == 'audioMessage'
    const isQuotedSticker = isQuoted && quotedType == 'stickerMessage'
    const isQuotedContact = isQuoted && quotedType == 'contactMessage'
    const isQuotedLocation = isQuoted && quotedType == 'locationMessage'
    const antilink = await db.get("antilink") || []
    const nsfw = await db.get("nsfw") || []
    const banned = await db.get('banned') || []
    var mediaType = type
    var stream
    if (isQuotedImage || isQuotedVideo || isQuotedAudio || isQuotedSticker) {
        mediaType = quotedType
        msg.message[mediaType] = msg.message.extendedTextMessage.contextInfo.quotedMessage[mediaType]
        stream = await downloadContentFromMessage(msg.message[mediaType], mediaType.replace('Message', ''))
            .catch(console.error)
    }
    
    if (!isGroup && !isCmd) console.log(color(`[ ${time} ]`, 'white'), color('[ PRIVATE ]', 'aqua'), color(body.slice(0, 50), 'white'), 'from', color(senderNumber, 'yellow'))
    if (isGroup && !isCmd) console.log(color(`[ ${time} ]`, 'white'), color('[  GROUP  ]', 'aqua'), color(body.slice(0, 50), 'white'), 'from', color(senderNumber, 'yellow'), 'in', color(groupName, 'yellow'))
    if (!isGroup && isCmd) console.log(color(`[ ${time} ]`, 'white'), color('[ COMMAND ]', 'aqua'), color(body, 'white'), 'from', color(senderNumber, 'yellow'))
    if (isGroup && isCmd) console.log(color(`[ ${time} ]`, 'white'), color('[ COMMAND ]', 'aqua'), color(body, 'white'), 'from', color(senderNumber, 'yellow'), 'in', color(groupName, 'yellow'))
    
    const reply = async (text) => {
        return sock.sendMessage(from, {
            text: text
        }, {
            quoted: msg
        })
    }
    const bufferToUrl = async (buffer) => {
        const data = await uploadByBuffer(buffer)
        return data
    }
    ///try {
    if (antilink.includes(from) && !isBotGroupAdmins && !isGroupAdmins && body.includes("://chat.whatsapp.com/") && isGroup) {
        const linkThisGroup = `https://chat.whatsapp.com/${await sock.groupInviteCode(from)}`
        if (!body.includes(linkThisGroup)) {
            sock.groupParticipantsUpdate(from, [sender], 'remove')
            reply("🍃 Removed successfully")
            return;
        }
    }
    if (body.startsWith(prefix) && banned.includes(`${sender}`)) {
        reply(`Problem !🙂 You are banned from using ❝ Ⓒ𝐒𝐩𝐢𝐤𝐞 ❞ commands \nMessage owner to be unbanned ❌`)
        return;
    }
    ////catch (e) {
    ////return reply(e)
    ///}
    const sendFile = async function (jid, path, quoted, options = {}) {
        let mimetype = 'audio/mpeg' //getDevice(quoted.id) == 'ios' ? 'audio/mpeg' : 'audio/mp4'
        let opt = {
            fileName: options.fileName || '',
            ...options
        }
        if (options.audio) opt['audio'] = Buffer.isBuffer(path) ? {
            buffer: path,
            mimetype
        } : {
            url: path,
            mimetype
        }
        if (options.document) opt['document'] = Buffer.isBuffer(path) ? {
            buffer: path,
            mimetype: options.mimetype
        } : {
            url: path,
            mimetype: options.mimetype
        }
        if (options.image) opt['image'] = Buffer.isBuffer(path) ? {
            buffer: path,
            mimetype: options.mimetype
        } : {
            url: path,
            mimetype: options.mimetype
        }
        await sock.sendMessage(jid, opt, {
                quoted
            })
            .then(() => {
                try {
                    let {
                        size
                    } = fs.statSync(path)
                    statistics('filesize', size)
                    if (options.unlink) {
                        console.log('unlink');
                        fs.unlinkSync(path)
                    }
                } catch (error) {
                    console.log(error);
                }
            })
    }
    if (command) {
        let xp = Math.floor(Math.random() * 10) + 1
        await db.add(`${sender}.Xp`, xp)
        const reactionMessage = {
            react: {
                text: `🍃`,
                key: msg.key,
            },
        };
        await sock.sendMessage(from, reactionMessage);
    }
    switch (command) {
    case 'hi': {
        //console.log(msg.message.extendedTextMessage.contextInfo.participant)
        //console.log(character)
        let xp = await db.get(`${sender}.Xp`)
        console.log(xp)
        reply(`Hey ${senderName} •|•
┌╔═『🍃 Experience Card 』⦁══
│║⦁ By ❝ Ⓒ𝐒𝐩𝐢𝐤𝐞 ❞
│║⦁ Experience:[ ${xp} ]
│║⦁ *Made with ❤ By ©GasComIT*
│║⦁ https://github.com/GasComIT
.╚════════════════`)
    }
    break
    case "upload":
    case "url": {
        try {
            if (isImage || isQuotedImage) {
                let downloadFilePath;
                if (msg.message.imageMessage) {
                    downloadFilePath = msg.message.imageMessage;
                } else {
                    //tagged image
                    downloadFilePath =
                        msg.message.extendedTextMessage.contextInfo.quotedMessage.imageMessage;
                }
                //for images
                const stream = await downloadContentFromMessage(downloadFilePath, "image");
                let buffer = Buffer.from([]);
                for await (const chunk of stream) {
                    buffer = Buffer.concat([buffer, chunk]);
                }
                image = await bufferToUrl(buffer)
                
            } else if (isVideo || isQuotedVideo) {
                //for videos
                let downloadFilePath;
                if (msg.message.videoMessage) {
                    downloadFilePath = msg.message.videoMessage;
                } else {
                    downloadFilePath =
                        msg.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage;
                }
                const stream = await downloadContentFromMessage(downloadFilePath, "video");
                let buffer = Buffer.from([]);
                for await (const chunk of stream) {
                    buffer = Buffer.concat([buffer, chunk]);
                }
                image = await bufferToUrl(buffer)
            } else {
                reply("❌ Give a media to upload!\nMust be an Image or a short video.");
                return;
            }
            reply(image.link)
        } catch (e) {
            reply(e.toString())
        }
    }
    break
    case "google": {
        if (!text) {
            reply('Provide a search term!\nEg: Google GasComIT on GitHub')
            return;
        }
        let {
            data
        } = await axios.get(`https://www.googleapis.com/customsearch/v1?q=${text}&key=AIzaSyDMbI3nvmQUrfjoCJYLS69Lej1hSXQjnWI&cx=baf9bdb0c631236e5`)
        if (data.items.length == 0) {
            reply("❌ Unable to find any result")
            return;
        }
        let tex = `☆☆💥 GOOGLE SEARCH 💥☆☆\n🔍 Term ~> ${text}\n\n`;
        for (let i = 0; i < data.items.length; i++) {
            tex += `🪧 Title ~> ${data.items[i].title}\n🖥 Description ~> ${data.items[i].snippet}\n🌐 Link ~> ${data.items[i].link}\n\n`
        }
        reply(tex)
        return;
        
    }
    break
    case "githubsearch":
    case "github": {
        if (!text) {
            reply('Provide a search term\nEg: Github GasComIT!')
            return;
        }
        let {
            data: repo
        } = await axios.get(`https://api.github.com/search/repositories?q=${text}`)
        if (repo.items.length == 0) {
            reply("❌ Unable to find any result")
            return;
        }
        let tex = `❝ Ⓒ𝐒𝐩𝐢𝐤𝐞 *GitHub Search* ❞\n🔍 Term ~> ${text}\n\n`;
        for (let i = 0; i < repo.items.length; i++) {
            tex += `🪧 Name ~> ${repo.items[i].name}\n👤 Watchers ~> ${repo.items[i].watchers_count}\n⭐️ Stars ~> ${repo.items[i].stargazers_count}\n📛 Forks ~> ${repo.items[i].forks_count}\n🖥 Description ~> ${repo.items[i].description}\n🌐 Link ~> ${repo.items[i].html_url}\n\n`
        }
        reply(tex)
        return;
        
    }
    break
    case "neko": {
        try {
            const {
                data
            } = await axios.get("https://nekos.life/api/v2/img/neko");
            await sock.sendMessage(from, {
                image: {
                    url: data.url
                },
                caption: "Your neko Image is here.\n*❝ Ⓒ𝐒𝐩𝐢𝐤𝐞 ❞ Signal ©GasComIT*"
            }, {
                quoted: msg
            });
        } catch (e) {
            await sock.sendMessage(from, {
                text: `Something bad happend\n${e.message}`
            }, {
                quoted: msg
            });
        }
        
    }
    break
    case "waifu": {
        try {
            const {
                data
            } = await axios.get("https://nekos.life/api/v2/img/waifu");
            await sock.sendMessage(from, {
                image: {
                    url: data.url
                },
                caption: "Your waifu Image is here.\n*❝ Ⓒ𝐒𝐩𝐢𝐤𝐞 ❞ signal ©GasComIT*"
            }, {
                quoted: msg
            });
        } catch (e) {
            await sock.sendMessage(from, {
                text: `Something bad happend\n${e.message}`
            }, {
                quoted: msg
            });
        }
        
    }
    break
    case "dare": {
        let dare = TD.get_dare();
        reply(dare);
    }
    break
    case "truth": {
        let truth = TD.get_truth();
        reply(truth);
    }
    break
    case "sc":
    case "sadcat": {
        if (!text) {
            reply('Provide a the text!')
            return;
        }
        const response = await axios.get(`https://api.popcat.xyz/sadcat?text=${text}`, {
            responseType: 'arraybuffer'
        })
        const buffer = Buffer.from(response.data, "utf-8")
        try {
            await sock.sendMessage(from, {
                image: buffer,
                caption: "Here you go.\n*❝ Ⓒ𝐒𝐩𝐢𝐤𝐞 ❞ signal ©GasComIT"
            }, {
                quoted: msg
            });
        } catch (e) {
            await sock.sendMessage(from, {
                text: `Something bad happend\n${e.message}`
            }, {
                quoted: msg
            });
        }
    }
    break
    case 'lyrics': {
        if (!text) {
            reply('Provide a the song name to search!')
            return;
        }
        try {
            const search = await Client.songs.search(text);
            //if (!search.length == 0) {
            //reply(`No lyrics found for ${text}`);
            //return;
            //}
            const Song = search[0];
            const lyrics = await Song.lyrics();
            reply(lyrics);
        } catch (error) {
            reply(`No lyrics found for ${text}`);
            console.log(error);
        }
    }
    break
    case 'del':
    case 'delete': {
        if (!msg.message.extendedTextMessage) {
            reply("❌ Tag message to be deleted 😐");
            return;
        }
        
        //bot message, anyone can delete
        if (msg.message.extendedTextMessage.contextInfo.participant == botId) {
            // reply("❌ Tag message of bot to delete.");
            const options = {
                remoteJid: botId,
                fromMe: true,
                id: msg.message.extendedTextMessage.contextInfo.stanzaId,
            };
            await sock.sendMessage(from, {
                delete: options,
            });
            return;
        } else {
            reply("❌ Only bot massage can be delete.");
        }
    }
    break
    case 'cry':
    case 'kiss':
    case 'bully':
    case 'hug':
    case 'lick':
    case 'cuddle':
    case 'pat':
    case 'smug':
    case 'highfive':
    case 'bonk':
    case 'yeet':
    case 'blush':
    case 'wave':
    case 'smile':
    case 'handhold':
    case 'nom':
    case 'bite':
    case 'glomp':
    case 'kill':
    case 'slap':
    case 'cringe':
    case 'kick':
    case 'wink':
    case 'happy':
    case 'poke':
    case 'punch':
    case 'dance': {
        const Reactions = {
            cry: 'Cried with',
            kiss: 'Kissed',
            punch: 'punched',
            bully: 'Bullied',
            hug: 'Hugged',
            lick: 'Licked',
            cuddle: 'Cuddled with',
            pat: 'Patted',
            smug: 'Smugged at',
            highfive: 'High-fived',
            bonk: 'Bonked',
            yeet: 'Yeeted',
            blush: 'Blushed at',
            wave: 'Waved at',
            smile: 'Smiled at',
            handhold: 'is Holding Hands with',
            nom: 'is Eating with',
            bite: 'Bit',
            glomp: 'Glomped',
            kill: 'Killed',
            slap: 'Slapped',
            cringe: 'Cringed at',
            kick: 'Kicked',
            wink: 'Winked at',
            happy: 'is Happy with',
            poke: 'Poked',
            dance: 'is Dancing with'
        }
        let {
            data: gi
        } = await axios.get(`https://g.tenor.com/v1/search?q=${command}&key=LIVDSRZULELA&limit=8`)
        arr = []
        arr.push(sender)
        try {
            user2 = msg.message.extendedTextMessage.contextInfo.participant || mentioned[0] || undefined
        } catch {
            user2 = sender
        }
        arr.push(user2)
        let rec = `@${sender.split("@")[0]} ${Reactions[command]} @${user2.split("@")[0]}`
        sock.sendMessage(from, {
            video: {
                url: gi.results?.[Math.floor(Math.random() * gi.results.length)]?.media[0]?.mp4?.url
            },
            caption: rec,
            gifPlayback: true,
            mentions: arr
        }, {
            quoted: msg
        })
        
    }
    break
    case 'sticker':
    case 's': {
        if (text) {
            anu = text.split('|')
            packName = anu[0] !== '' ? anu[0] : "❝ Ⓒ𝐒𝐩𝐢𝐤𝐞 ❞"
            authorName = anu[1] !== '' ? anu[1] : "GasComIT"
        } else {
            packName = "❝ Ⓒ𝐒𝐩𝐢𝐤𝐞 ❞";
            authorName = "GasComIT";
        }
        const getRandom = (ext) => {
            return `${Math.floor(Math.random() * 10000)}${ext}`;
        };
        const stickerFileName = getRandom(".webp");
        let stickerMake;
        //for image
        if (isImage || isQuotedImage) {
            let downloadFilePath;
            if (msg.message.imageMessage) {
                downloadFilePath = msg.message.imageMessage;
            } else {
                //tagged image
                downloadFilePath =
                    msg.message.extendedTextMessage.contextInfo.quotedMessage.imageMessage;
            }
            //for images
            const stream = await downloadContentFromMessage(downloadFilePath, "image");
            let buffer = Buffer.from([]);
            for await (const chunk of stream) {
                buffer = Buffer.concat([buffer, chunk]);
            }
            
            stickerMake = new Sticker(buffer, {
                pack: packName,
                author: authorName,
                type: args.includes("--crop") || args.includes("--c") ?
                    StickerTypes.CROPPED : StickerTypes.FULL,
                quality: 100,
            });
        } else if (isVideo || isQuotedVideo) {
            //for videos
            let downloadFilePath;
            if (msg.message.videoMessage) {
                downloadFilePath = msg.message.videoMessage;
            } else {
                downloadFilePath =
                    msg.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage;
            }
            const stream = await downloadContentFromMessage(downloadFilePath, "video");
            let buffer = Buffer.from([]);
            for await (const chunk of stream) {
                buffer = Buffer.concat([buffer, chunk]);
            }
            
            stickerMake = new Sticker(buffer, {
                pack: packName, // The pack name
                author: authorName, // The author name
                type: args.includes("crop") || args.includes("c") ?
                    StickerTypes.CROPPED : StickerTypes.FULL,
                quality: 40,
            });
        } else {
            reply("❌ Give a media to convert into sticker!\nMust be an Image or a short video 😐.");
            return;
        }
        
        await stickerMake.toFile(stickerFileName);
        await sock.sendMessage(
            from, {
                sticker: fs.readFileSync(stickerFileName),
            }, {
                quoted: msg
            }
        );
        try {
            fs.unlinkSync(stickerFileName);
        } catch {
            console.log("error in deleting file.");
        }
    }
    break
    case 'photo': {
        if (!isQuoted) {
            reply("❌ Give a sticker to convert into media!\nReply to a sticker only 😐.");
            return;
        }
        const getRandom = (ext) => {
            return `${Math.floor(Math.random() * 10000)}${ext}`;
        };
        if ((isSticker && !msg.message.stickerMessage.isAnimated) || isQuotedSticker) {
            let downloadFilePath;
            if (msg.message.stickerMessage) {
                downloadFilePath = msg.message.stickerMessage;
            } else {
                downloadFilePath =
                    msg.message.extendedTextMessage.contextInfo.quotedMessage
                    .stickerMessage;
            }
            const stream = await downloadContentFromMessage(downloadFilePath, "image");
            let buffer = Buffer.from([]);
            for await (const chunk of stream) {
                buffer = Buffer.concat([buffer, chunk]);
            }
            const media = getRandom(".jpeg");
            await writeFile(media, buffer);
            
            sock.sendMessage(
                from, {
                    image: fs.readFileSync(media),
                }, {
                    mimetype: "image/png",
                    quoted: msg,
                }
            );
            
            fs.unlinkSync(media);
        } else {
            reply(
                "❌ There is some problem!\nTag a non-animated sticker with command to convert to Image!😐"
            );
        }
    }
    break
    case "image":
    case "img": {
        if (!text) {
            reply('Provide a search term!😐')
            return;
        }
        try {
            if (!text) {
                let message = `❌ Query is not given! \nSend ${prefix}is query`;
                reply(message);
                return;
            }
            
            let name = text;
            
            gis(name, (error, results) => {
                if (error) {
                    console.log(error);
                    reply(error);
                } else {
                    //   console.log(JSON.stringify(results, null, "  "));
                    let index = 0;
                    if (results.length >= 10) {
                        index = Math.floor(Math.random() * 10);
                    }
                    let img = results[index]["url"];
                    console.log(img);
                    
                    try {
                        sock.sendMessage(
                            from, {
                                image: {
                                    url: img
                                },
                                caption: " 🍃 *❝ Ⓒ𝐒𝐩𝐢𝐤𝐞 ❞ signal ©GasComIT* 🍃"
                            }, {
                                quoted: msg
                            }
                        );
                    } catch (err) {
                        console.log(err)
                        reply("❌ Error in search!");
                    }
                }
            });
        } catch (e) {
            await sock.sendMessage(from, {
                text: `Something bad happend\n${e.message}`
            }, {
                quoted: msg
            });
        }
    }
    break
    case 'steal':
    case 'take': {
        if (isQuotedSticker) {
            let downloadFilePath =
                msg.message.extendedTextMessage.contextInfo.quotedMessage.stickerMessage;
            const stream = await downloadContentFromMessage(
                downloadFilePath,
                "sticker"
            );
            let buffer = Buffer.from([]);
            for await (const chunk of stream) {
                buffer = Buffer.concat([buffer, chunk]);
            }
            if (text) {
                anu = text.split('|')
                packName = anu[0] !== '' ? anu[0] : "❝ Ⓒ𝐒𝐩𝐢𝐤𝐞 ❞"
                authorName = anu[1] !== '' ? anu[1] : "©GasComIT"
            } else {
                packName = "❝ Ⓒ𝐒𝐩𝐢𝐤𝐞 ❞";
                authorName = "©GasComIT";
            }
            
            const sticker = new Sticker(buffer, {
                pack: packName,
                author: authorName,
                type: StickerTypes.DEFAULT,
                quality: 100,
            });
            await sock.sendMessage(from, await sticker.toMessage(), {
                quoted: msg
            });
            return;
        } else {
            reply("❌ Tag a sticker to steal 😐!");
            return;
        }
    }
    break
    case 'ytsearch':
    case 'yts': {
        if (!text) {
            reply('🥴 Provide a search term!\E.g: How to code in JS ')
            return;
        }
        const term = text;
        const {
            videos
        } = await yts(term);
        if (!videos || videos.length <= 0) {
            reply(`🤨 No Matching videos found for : *${term}*!!`)
            return;
        }
        const length = videos.length < 10 ? videos.length : 10;
        let tex = `❝ Ⓒ𝐒𝐩𝐢𝐤𝐞 - *YouTube Search* ❞\n🔍 Query ~> ${term}\n\n`;
        for (let i = 0; i < length; i++) {
            tex += `🌐 Link ~> ${videos[i].url}\n👤 Channel ~> ${videos[i].author.name}\n🖥 Title ~> ${videos[i].title}\n\n`;
        }
        reply(tex)
        return;
    }
    break
    case 'play':
    case 'stream': {
        if (!text) {
            reply('Provide a search term!\nE.g: Play Quien - By Pablo Alboran')
            return;
        }
        try {
            const {
                videos
            } = await yts(text);
            if (!videos || videos.length <= 0) {
                reply(`No Matching videos found for : *${args[0]}*!!`)
                return;
            }
            let urlYt = videos[0].url
            let infoYt = await ytdl.getInfo(urlYt);
            //30 MIN
            if (infoYt.videoDetails.lengthSeconds >= 1800) {
                reply(`❌ Audio too big!\I'm Unable to download big files. 🤥`);
                return;
            }
            const getRandom = (ext) => {
                return `${Math.floor(Math.random() * 10000)}${ext}`;
            };
            let titleYt = infoYt.videoDetails.title;
            let randomName = getRandom(".mp3");
            const stream = ytdl(urlYt, {
                    filter: (info) => info.audioBitrate == 160 || info.audioBitrate == 128,
                })
                .pipe(fs.createWriteStream(`./${randomName}`));
            console.log("Audio downloading ->", urlYt);
            // reply("Downloading.. This may take upto 5 min!");
            await new Promise((resolve, reject) => {
                stream.on("error", reject);
                stream.on("finish", resolve);
            });
            
            let stats = fs.statSync(`./${randomName}`);
            let fileSizeInBytes = stats.size;
            // Convert the file size to megabytes (optional)
            let fileSizeInMegabytes = fileSizeInBytes / (1024 * 1024);
            console.log("Audio downloaded ! \n Size: " + fileSizeInMegabytes);
            if (fileSizeInMegabytes <= 40) {
                //sendFile(from, fs.readFileSync(`./${randomName}`), msg, { audio: true, jpegThumbnail: (await getBuffer(dl.meta.image)).buffer, unlink: true })
                await sock.sendMessage(
                    from, {
                        document: fs.readFileSync(`./${randomName}`),
                        mimetype: "audio/mpeg",
                        fileName: titleYt + ".mp3",
                    }, {
                        quoted: msg
                    }
                );
            } else {
                reply(`❌ File size bigger than 40mb.\nI'm unable to download large files.🤥`);
            }
            fs.unlinkSync(`./${randomName}`);
        } catch (e) {
            reply(e.toString())
        }
    }
    break
    case "ship": {
        arr = []
        const percentage = Math.floor(Math.random() * 100)
        let sentence
        if (percentage < 25) {
            sentence = `\t\t\t\t\t*ShipCent : ${percentage}%* \n\t\tThere's still time to reconsider your choices`
        } else if (percentage < 50) {
            sentence = `\t\t\t\t\t*ShipCent : ${percentage}%* \n\t\t Good enough, I guess! 💫`
        } else if (percentage < 75) {
            sentence = `\t\t\t\t\t*ShipCent : ${percentage}%* \n\t\t\tStay together and you'll find a way ⭐️`
        } else if (percentage < 90) {
            sentence = `\t\t\t\t\t*ShipCent : ${percentage}%* \n\tAmazing! You two will be a good couple 💖 `
        } else {
            sentence = `\t\t\t\t\t*ShipCent : ${percentage}%* \n\tYou two are fated to be together 💙`
        }
        try {
            user2 = msg.message.extendedTextMessage.contextInfo.participant || mentioned[0] || undefined
        } catch {
            user2 = sender
        }
        arr.push(sender)
        arr.push(user2)
        let caption = `\t❝ Ⓒ𝐒𝐩𝐢𝐤𝐞 ❞ ❣️ *Matchmaker* ❣️ \n`
        caption += `\t\t---------------------------------\n`
        caption += `@${sender.split('@')[0]}  x  @${user2.split('@')[0]}\n`
        caption += `\t\t---------------------------------\n`
        caption += `${sentence}`
        await sock.sendMessage(from, {
            text: caption,
            mentions: arr
        }, {
            quoted: msg
        })
        
    }
    break
    
    case 'ytmp4':
    case 'ytvideo':
    case 'ytv':
        const getRandom = (ext) => {
            return `${Math.floor(Math.random() * 10000)}${ext}`;
        };
        if (args.length === 0) {
            reply(`❌ URL is empty! \nSend ${prefix}ytv url`);
            return;
        }
        try {
            let urlYt = args[0];
            if (!urlYt.startsWith("http")) {
                reply(`❌ Give youtube link!`);
                return;
            }
            let infoYt = await ytdl.getInfo(urlYt);
            //30 MIN
            if (infoYt.videoDetails.lengthSeconds >= 1800) {
                reply(`❌ Video file too big! 😀`);
                return;
            }
            let titleYt = infoYt.videoDetails.title;
            let randomName = getRandom(".mp4");
            
            const stream = ytdl(urlYt, {
                    filter: (info) => info.itag == 22 || info.itag == 18,
                })
                .pipe(fs.createWriteStream(`./${randomName}`));
            //22 - 1080p/720p and 18 - 360p
            console.log("Video downloading ->", urlYt);
            // reply("Downloading.. This may take upto 5 min!");
            await new Promise((resolve, reject) => {
                stream.on("error", reject);
                stream.on("finish", resolve);
            });
            
            let stats = fs.statSync(`./${randomName}`);
            let fileSizeInBytes = stats.size;
            // Convert the file size to megabytes (optional)
            let fileSizeInMegabytes = fileSizeInBytes / (1024 * 1024);
            console.log("Video downloaded ! Size: " + fileSizeInMegabytes);
            if (fileSizeInMegabytes <= 100) {
                sock.sendMessage(
                    from, {
                        video: fs.readFileSync(`./${randomName}`),
                        caption: `${titleYt}`,
                    }, {
                        quoted: msg
                    }
                );
            } else {
                reply(`❌ File size bigger than 40mb.`);
            }
            
            fs.unlinkSync(`./${randomName}`);
        } catch (e) {
            reply(e.toString())
        }
        break
    case 'ytmp3':
    case 'yta': {
        const getRandom = (ext) => {
            return `${Math.floor(Math.random() * 10000)}${ext}`;
        };
        if (args.length === 0) {
            reply(`❌ URL is empty! \nSend ${prefix}yta url`);
            return;
        }
        try {
            let urlYt = args[0];
            if (!urlYt.startsWith("http")) {
                reply(`❌ Give youtube link!`);
                return;
            }
            let infoYt = await ytdl.getInfo(urlYt);
            //30 MIN
            if (infoYt.videoDetails.lengthSeconds >= 1800) {
                reply(`❌ Video too big!`);
                return;
            }
            let titleYt = infoYt.videoDetails.title;
            let randomName = getRandom(".mp3");
            const stream = ytdl(urlYt, {
                    filter: (info) => info.audioBitrate == 160 || info.audioBitrate == 128,
                })
                .pipe(fs.createWriteStream(`./${randomName}`));
            console.log("Audio downloading ->", urlYt);
            // reply("Downloading.. This may take upto 5 min!");
            await new Promise((resolve, reject) => {
                stream.on("error", reject);
                stream.on("finish", resolve);
            });
            
            let stats = fs.statSync(`./${randomName}`);
            let fileSizeInBytes = stats.size;
            // Convert the file size to megabytes (optional)
            let fileSizeInMegabytes = fileSizeInBytes / (1024 * 1024);
            console.log("Audio downloaded ! Size: " + fileSizeInMegabytes);
            if (fileSizeInMegabytes <= 40) {
                //sendFile(from, fs.readFileSync(`./${randomName}`), msg, { audio: true, jpegThumbnail: (await getBuffer(dl.meta.image)).buffer, unlink: true })
                await sock.sendMessage(
                    from, {
                        document: fs.readFileSync(`./${randomName}`),
                        mimetype: "audio/mpeg",
                        fileName: titleYt + ".mp3",
                    }, {
                        quoted: msg
                    }
                );
            } else {
                reply(`❌ File size bigger than 40mb.`);
            }
            fs.unlinkSync(`./${randomName}`);
        } catch (e) {
            reply(e.toString())
        }
    }
    break
    case "remove":
    case "rm": {
        if (!isGroupAdmins) return reply('This is an admin command')
        if (!isBotGroupAdmins) return reply('❝ Ⓒ𝐒𝐩𝐢𝐤𝐞 ❞ signal says: Bot is not admin')
        try {
            user = msg.message.extendedTextMessage.contextInfo.participant || mentioned[0] || undefined
        } catch {
            reply("Please tag the user")
            return;
        }
        await sock.groupParticipantsUpdate(
            from,
                [user],
            "remove"
        );
        return reply("✔ Number removed from group!\nLet there be peace 😉 ❝ Ⓒ𝐒𝐩𝐢𝐤𝐞 ❞");
        
    }
    break
    case "antilink": {
        if (!text) return reply('Please put the option name')
        if (!isGroupAdmins) return reply('This is an admin command')
        if (!isBotGroupAdmins) return reply('❝ Ⓒ𝐒𝐩𝐢𝐤𝐞 ❞ signal says: Bot is not admin')
        switch (text) {
        case "on": {
            let its = await db.get('antilink') || []
            
            if (its.includes(from)) return reply("❝ Ⓒ𝐒𝐩𝐢𝐤𝐞 ❞ signal says: Already registered")
            await db.push('antilink', from)
            return reply('❝ Ⓒ𝐒𝐩𝐢𝐤𝐞 ❞ signal says: Antilink has been registered!')
        }
        break
        case "off": {
            let its = await db.get('antilink') || []
            if (!its.includes(from)) return reply('Already off')
            await db.pull('antilink', from)
            return reply("Antilink has been trurned off here")
        }
        break
        default:
            reply(`No such option please choose between [ on / off ]`)
            return;
        }
    }
    break
    case "event": {
        if (!text) return reply('Please put the option name\nE.g: Event on/off.')
        if (!isGroupAdmins) return reply('This is an admin command!😐\nAvoid trouble if you are not an admin.  ❝ Ⓒ𝐒𝐩𝐢𝐤𝐞 ❞')
        switch (text) {
        case "on": {
            let its = await db.get('event') || []
            
            if (its.includes(from)) return reply("Already registered")
            await db.push('event', from)
            return reply('Event has been register!😐')
        }
        break
        case "off": {
            let its = await db.get('event') || []
            if (!its.includes(from)) return reply('Already off 😐')
            await db.pull('event', from)
            return reply("Event has been turned off here😐")
        }
        break
        default:
            reply(`No such option please choose between [ on / off ]`)
            return;
        }
    }
    break
    case "ban": {
        if (!isOwner) {
            reply("This command is For Owner only !😐\nAvoid trouble if you are not the owner [❝ Ⓒ𝐒𝐩𝐢𝐤𝐞 ❞]")
            return;
        }
        arr = []
        try {
            user = msg.message.extendedTextMessage.contextInfo.participant || mentioned[0] || undefined
        } catch {
            reply("Please tag the user 😐")
            return;
        }
        arr.push(user)
        let ban = await db.get('banned') || []
        
        if (ban.includes(user)) return reply("User already banned 😐")
        await db.push('banned', user)
        await sock.sendMessage(from, {
            text: `Succesfully banned @${user.split("@")[0]}`,
            mentions: arr
        }, {
            quoted: msg
        })
    }
    break
    case "unban": {
        if (!isOwner) {
            reply("This command if for Owner only! 😐\nAvoid trouble if your arw not the owner. ❝ Ⓒ𝐒𝐩𝐢𝐤𝐞 ❞")
            return;
        }
        arr = []
        try {
            user = msg.message.extendedTextMessage.contextInfo.participant || mentioned[0] || undefined
        } catch {
            reply("Please tag the user 😐")
            return;
        }
        arr.push(user)
        let ban = await db.get('banned') || []
        
        if (!ban.includes(user)) return reply("User not banned 😐")
        await db.pull('banned', user)
        await sock.sendMessage(from, {
            text: `Succesfully unbanned @${user.split("@")[0]}`,
            mentions: arr
        }, {
            quoted: msg
        })
    }
    break
    case 'fact': {
        await axios
            .get(`https://nekos.life/api/v2/fact`)
            .then((response) => {
                // console.log(response);
                const tet = `🍃 Fact:~> *By ❝ Ⓒ𝐒𝐩𝐢𝐤𝐞 ❞*\n\n${response.data.fact}`
                reply(tet)
            })
            .catch((err) => {
                reply(`✖  An error occurred, \n Please report that command to \n*GasComIT Developers*. ❝ Ⓒ𝐒𝐩𝐢𝐤𝐞 ❞`)
            })
    }
    break
    case 'advice': {
        await axios
            .get(`https://api.adviceslip.com/advice`)
            .then((response) => {
                // console.log(response);
                const tet = `Advice for you by *❝ Ⓒ𝐒𝐩𝐢𝐤𝐞 ❞ AI*\n:~> ${response.data.slip.advice}`
                reply(tet)
            })
            .catch((err) => {
                reply(`🔍 Error: ${err}`)
            })
    }
    break
    case 'getgif':
    case 'gify': {
        if (!text) return reply("❌ No query provided!")
        try {
            let {
                data: gi
            } = await axios.get(`https://g.tenor.com/v1/search?q=${text}&key=LIVDSRZULELA&limit=8`)
            sock.sendMessage(from, {
                video: {
                    url: gi.results?.[Math.floor(Math.random() * gi.results.length)]?.media[0]?.mp4?.url
                },
                caption: "Here you go",
                gifPlayback: true
            }, {
                quoted: msg
            })
        } catch (err) {
            reply("Couldn't find")
            console.log(err)
        }
        
    }
    
    break
    case "nsfw": {
        if (!text) return reply('Please incluse switch word.\nE.g [ on / off ]')
        if (!isGroupAdmins) return reply('This is an admin command')
        switch (text) {
        case "on": {
            let its = await db.get('nsfw') || []
            
            if (its.includes(from)) return reply("Already registered")
            await db.push('nsfw', from)
            return reply(`┌╔═『 ❝ Ⓒ𝐒𝐩𝐢𝐤𝐞 ❞ 🔞 』⦁══
│║ NSFW has been enabled!
│║ Please dont get horny 🤯
│║⦁---⭕16+ zone ⭕--- 
.╚════════════════`)
        }
        break
        case "off": {
            let its = await db.get('nsfw') || []
            if (!its.includes(from)) return reply('🔞NSFW is already turned off 🥴')
            await db.pull('nsfw', from)
            return reply(`┌╔═『 ❝ Ⓒ𝐒𝐩𝐢𝐤𝐞 ❞ 🔞 』⦁══
│║ NSFW has been disabled!
│║ hope no one was horny 😐
│║⦁---⭕16+ zone ⭕--- 
.╚════════════════`)
        }
        break
        default:
            reply(`No such option please choose between [ on / off ]`)
            return;
        }
    }
    break
    case 'wiki':
    case 'wikipedia': {
        try {
            if (!text) return reply(`Provide the term to search,\nE.g *Rongo university* `)
            const con = await wiki.summary(text);
            const tex = `Title:~> ${con.title}
                  
Desc:~> ${con.description}

Summary:~> ${con.extract}

URL:~> ${con.content_urls.mobile.page}
        `
            reply(tex)
        } catch (err) {
            console.log(err)
            return reply(`❌ Your text isn't valid`)
        }
    }
    break
    case "tag": {
        console.log(groupAdmins)
        if (!text || !(text == "--admin")) {
            if (!isGroupAdmins) return reply('This is and an admin command! 😐')
            let mention = []
            let result = `*${groupName}-Members tag by ${senderName}*\n\n`
            for (let i = 0; i < groupMembers.length; i++) {
                let no = i + 1
                result += `│║⦁ ➼ ${no}| @${groupMembers[i].id.split("@")[0]}\n`
                mention.push(groupMembers[i].id)
            }
            await sock.sendMessage(from, {
                text: result,
                mentions: mention
            }, {
                quoted: msg
            })
        } else if (text == "--admin") {
            let mention = []
            let result = `*${groupName}-Members tag only admins by ${senderName}*\n\n`
            for (let i = 0; i < groupAdmins.length; i++) {
                let no = i + 1
                result += `│║⦁ ➼ ${no}| @${groupAdmins[i].split("@")[0]}\n`
                mention.push(groupAdmins[i])
            }
            await sock.sendMessage(from, {
                text: result,
                mentions: mention
            }, {
                quoted: msg
            })
        }
    }
    break
    case "leaderboard":
    case "lb": {
        if ((groupMembers.length - 10) < 0) return reply("Sorry leaderboard is not possible in less then 10 members group")
        let arr = []
        let mention = []
        for (let i = 0; i < groupMembers.length; i++) {
            let exp = await db.get(`${groupMembers[i].id}.Xp`) || 0
            let obj = {
                id: groupMembers[i].id,
                xp: exp
            }
            arr.push(obj)
        }
        console.log(arr)
        let res = sortArray(arr, {
            by: 'xp',
            order: 'desc'
        })
        let result = `❝ Ⓒ𝐒𝐩𝐢𝐤𝐞 *LEADERBOARD* ❞\n*---❝ ⒸWa-Bot ❞  By ©GasComIT---*\n🌐 Type ~> Experience\n`
        for (let i = 0; i < 10; i++) {
            mention.push(arr[i].id)
            let character = await db.get(`${arr[i].id}.marry`) || "None"
            let no = i + 1
            result += `│║⦁ 👤 Person : @${arr[i].id.split("@")[0]}
            │║⦁ 🪧 Place : ${no}
            │║⦁ 🖥 Experience : ${arr[i].xp}
            │║⦁ \n`
        }
        //reply(result)
        await sock.sendMessage(from, {
            text: result,
            mentions: mention
        }, {
            quoted: msg
        })
        
    }
    break
    case "anime": {
        if (!text) return reply("Please provide the anime name")
        const {
            data
        } = await axios.get(
                `https://api.jikan.moe/v4/anime?q=${text}`
            )
            .catch((err) => {
                return reply("Unable to find the anime")
            });
        results = ""
        for (let i = 0; i < data.data.length; i++) {
            results += `📗Name: ${data.data[i].title}\n📘Airing: ${data.data[i].title}\n↝More Info: ${prefix}aid ${data.data[i].mal_id}\n\n`
        }
        return sock.sendMessage(from, {
            image: {
                url: data.data[0].images.jpg.image_url
            },
            caption: results
        }, {
            quoted: msg
        })
    }
    break
    case "aid": {
        if (!args[0]) {
            reply("Please provide the ID")
            return;
        }
        if (isNaN(args[0])) {
            reply("Please provide the ID")
            return;
        }
        if (args[0].includes("-") || args[0].includes("+")) {
            reply("Please provide the ID")
            return;
        }
        const {
            data
        } = await axios.get(
                `https://api.jikan.moe/v4/anime/${args[0]}/full`
            )
            .catch((err) => {
                return reply("Unable to find the anime")
            });
        let txt = `┌╔═『 *${data.data.title}*』⦁══
│║⦁ *Title En:* ${data.data.title_english}
│║⦁ *Title Jp:* ${data.data.title_japanese}
│║⦁ *Type:* ${data.data.type}
│║⦁ *Source:* ${data.data.source}
│║⦁ *Status:* ${data.data.status}
│║⦁ *Airing:* ${data.data.airing}
│║⦁ *Aired:* ${data.data.aired.from}
│║⦁ *Duration:* ${data.data.duration}
│║⦁ *Rating:* ${data.data.rating}
│║⦁ *Score:* ★${data.data.score}
│║⦁ *Rank:* ${data.data.rank}
│║⦁ *Popularity:* ${data.data.popularity}
│║⦁ *Members:* ${data.data.members}
.╚════════════════

*Synopsis:* ${data.data.synopsis}

🌐 *Link:* ${data.data.url}
`
        return sock.sendMessage(from, {
            image: {
                url: data.data.images.jpg.large_image_url
            },
            caption: txt
        }, {
            quoted: msg
        })
        
    }
    break
    case "character": {
        if (!text) return reply("Please provide the character name")
        const {
            data: chara
        } = await axios
            .get(`https://api.jikan.moe/v4/characters?q=${text}`)
            .catch((err) => {
                return reply(`Couldn't find any matching character.`);
            });
        
        let txt = "";
        for (let i = 0; i < chara.data.length; i++) {
            txt += `📗Name: ${chara.data[i].name}\n📘URL: ${chara.data[i].url}\n↝More Info: ${prefix}charid ${chara.data[i].mal_id}\n\n`;
        }
        return sock.sendMessage(from, {
            image: {
                url: chara.data[0].images.jpg.image_url
            },
            caption: txt
        }, {
            quoted: msg
        })
    }
    break
    case "charid": {
        if (!args[0]) {
            reply("Please provide the ID")
            return;
        }
        if (isNaN(args[0])) {
            reply("Please provide the ID")
            return;
        }
        if (args[0].includes("-") || args[0].includes("+")) {
            reply("Please provide the ID")
            return;
        }
        const {
            data
        } = await axios
            .get(`https://api.jikan.moe/v4/characters/${args[0]}/full`)
            .catch((err) => {
                return reply(`Couldn't find any character id.`);
            });
        
        let txt = `┌╔═══『 *Name: ${data.data.name}* 』⦁══\n`;
        txt += `│║⦁ *Name:* ${data.data.name}\n`;
        txt += `│║⦁ *Kanji name:* ${data.data.name_kanji}\n`;
        txt += `│║⦁ *Nicknames:* ${data.data.nicknames.join(", ")}\n`;
        txt += `│║⦁ *Favorites:* ${data.data.favorites}
.╚════════════════\n\n`;
        txt += `*Description:* ${data.data.about}\n`
        txt += `🌐 *URL:* ${data.data.url}\n\n`;
        return sock.sendMessage(from, {
            image: {
                url: data.data.images.jpg.image_url
            },
            caption: txt
        }, {
            quoted: msg
        })
        
    }
    break
    case "haigusha": {
        try {
            let data = await characterClient.getRandomCharacter();
            
            let txt = `┌╔═══『 *Name: ${data.name}* 』⦁══\n`;
            txt += `│║⦁ *Name:* ${data.name}\n*Mal_ID:* ${data.mal_id}\n`;
            txt += `│║⦁ *Kanji name:* ${data.name_kanji}\n`;
            txt += `│║⦁ *Nicknames:* ${data.nicknames.join(", ")}\n`;
            txt += `│║⦁ *Favorites:* ${data.favorites}
.╚════════════════\n\n`;
            txt += `*Description:* ${data.about}\n`
            txt += `🌐 *URL:* ${data.url}\n\n`;
            return sock.sendMessage(from, {
                image: {
                    url: data.images.jpg.image_url
                },
                caption: txt
            }, {
                quoted: msg
            })
        } catch (e) {
            reply(e.toString())
        }
        
    }
    break
    case "open": {
        if (!isGroupAdmins) return reply('This is an admin command')
        if (!isBotGroupAdmins) return reply('❝ Ⓒ𝐒𝐩𝐢𝐤𝐞 ❞ signal says: Bot is not admin')
        if (!groupMetadata) return reply('Try Again!')
        const {
            announce
        } = await sock.groupMetadata(from)
        if (!announce) return reply('❝ Ⓒ𝐒𝐩𝐢𝐤𝐞 ❞ signal says: Already opened!')
        await sock.groupSettingUpdate(from, 'not_announcement')
        reply("❝ Ⓒ𝐒𝐩𝐢𝐤𝐞 ❞ siganl says: Group opened")
    }
    break
    case "close":
        {
        if (!isGroupAdmins) return reply('This is an admin command')
        if (!isBotGroupAdmins) return reply('❝ Ⓒ𝐒𝐩𝐢𝐤𝐞 ❞ signal says: Bot is not admin')
        if (!groupMetadata) return reply('Try Again!')
        const {
            announce
        } = await sock.groupMetadata(from)
        if (announce) return reply('*Already closed!*')
        await sock.groupSettingUpdate(from, 'announcement')
        reply("*Group Closed*")
    }
    break
    case 'flip': {
        const side = Math.floor(Math.random() * 2) + 1
        if (side == 1) {
            sock.sendMessage(from, {
                image: {
                    url: 'https://i.ibb.co/LJjkVK5/heads.png'
                },
                caption: "Heads"
            }, {
                quoted: msg
            })
        } else {
            sock.sendMessage(from, {
                image: {
                    url: 'https://i.ibb.co/wNnZ4QD/tails.png'
                },
                caption: "Tails"
            }, {
                quoted: msg
            })
        }
    }
    break
    case 'meme': {
        const response = await axios.get('https://meme-api.herokuapp.com/gimme/wholesomeanimemes')
        const {
            title,
            url
        } = response.data
        await sock.sendMessage(from, {
            image: {
                url: url
            },
            caption: title
        }, {
            quoted: msg
        })
    }
    break
    case "demote": {
        if (!isGroupAdmins) return reply('This is an admin command')
        if (!isBotGroupAdmins) return reply('❝ Ⓒ𝐒𝐩𝐢𝐤𝐞 ❞ siganl says: Bot is not admin')
        try {
            user = msg.message.extendedTextMessage.contextInfo.participant || mentioned[0] || undefined
        } catch {
            reply("Please tag the user")
            return;
        }
        if (user === groupMetadata.owner || '') {
            return reply(`You cannot remove the owner`)
            //return reply(`${tex}`)
        }
        if (!groupAdmins.includes(user)) {
            return reply(`User provided is not an admin`)
            //return reply(`${tex}`)
        }
        await sock.groupParticipantsUpdate(from, [user], 'demote')
    }
    break
    case "promote": {
        if (!isGroupAdmins) return reply('This is an admin command')
        if (!isBotGroupAdmins) return reply('❝ Ⓒ𝐒𝐩𝐢𝐤𝐞 ❞ signal says: Bot is not admin')
        try {
            user = msg.message.extendedTextMessage.contextInfo.participant || mentioned[0] || undefined
        } catch {
            reply("Please tag the user")
            return;
        }
        if (groupAdmins.includes(user)) {
            return reply(`That user is already an admin`)
            //return reply(`${tex}`)
        }
        await sock.groupParticipantsUpdate(from, [user], 'promote')
    }
    break
    case "hornycard":
    case "hc": {
        try {
            user = msg.message.extendedTextMessage.contextInfo.participant || mentioned[0] || undefined
        } catch {
            user = sender
        }
        try {
            ppuser = await sock.profilePictureUrl(user, 'image')
        } catch {
            ppuser = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMxMUXFtd5GrFkxyrU-f5zA2IH8MZ-U-cFKg&usqp=CAU'
        }
        const response = await axios.get(ppuser, {
            responseType: 'arraybuffer'
        })
        const buffer = Buffer.from(response.data, "utf-8")
        let image = await bufferToUrl(buffer)
        let url = `https://some-random-api.ml/canvas/horny?avatar=${image.link}`
        try {
            await sock.sendMessage(from, {
                image: {
                    url: url
                },
                caption: "Your horny card here.\nMade by ❝ Ⓒ𝐒𝐩𝐢𝐤𝐞 ❞"
            }, {
                quoted: msg
            });
        } catch (e) {
            await sock.sendMessage(from, {
                text: `Something bad happend\n${e.message}`
            }, {
                quoted: msg
            });
        }
    }
    break
    case 'pokemon': {
        if (!text) return reply("❌ No query provided!")
        try {
            let {
                data: data
            } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${text}`)
            if (!data.name) return reply(`❌ No such pokemon`)
            let yu = `┌╔═══『 *Name: ${data.name}* 』⦁══
│║⦁ *Pokedex ID: ${data.id}*
│║⦁ *Weight: ${data.weight}*
│║⦁ *Height: ${data.height}*
│║⦁ *Base Experience: ${data.base_experience}*
│║⦁ *Abilities: ${data.abilities[0].ability.name}, ${data.abilities[1].ability.name}*
│║⦁ *Type: ${data.types[0].type.name}*
│║⦁ *HP: ${data.stats[0].base_stat}*
│║⦁ *Attack: ${data.stats[1].base_stat}*
│║⦁ *Defense: ${data.stats[2].base_stat}*
│║⦁ *Special Attack: ${data.stats[3].base_stat}*
│║⦁ *Special Defense:${data.stats[4].base_stat}*
│║⦁ *Speed: ${data.stats[5].base_stat}*
.╚════════════════\n`
            sock.sendMessage(from, {
                image: {
                    url: data.sprites.front_default
                },
                caption: yu
            }, {
                quoted: msg
            })
        } catch (err) {
            reply("An Error Occurred")
            console.log(err)
        }
    }
    break
    case "owner": {
        reply(`👋 Hi ${senderName}, I'm ${name} ♡! 
💡 *PREFIX:* ${prefix} *❝ Ⓒ𝐒𝐩𝐢𝐤𝐞 ❞ by GasComIT*

┌╔═══『 *Owner Info* 』⦁══
│║ *Dev:* Benson Mugwe 
│║ A 23 yrs old programmer & student
│║ At Rongo Uni, taking Comp science
│║ Support by following on GitHub:
│║ https://github.com/GasComIT
│║⦁---- 『 *Social Media* 』-----⦁
│║ Fb: facebook.com/five34
│║ IG: instagram.com/gascomit
│║ Twitter: twitter.com/gascomit
│║⭕ youtube.com/@krakinzlab
.╚════════════════`)
    }
    break
    case "alive": {
        let ram_size = [Math.floor(Math.random() * 64)]
        let dyt = Date.now();
        reply(`👋 Hi ${senderName}  
┌╔═══『 ❝ Ⓒ𝐒𝐩𝐢𝐤𝐞 ❞ 』⦁══
│║ Status ⦁ online
│║ Speed  ⦁ 43 ms
│║ RAM    ⦁ ${ram_size}/64GB
│║ Time   ⦁ ${dyt}
│║ https://GitHub.com/GasComIT
.╚════════════════`)
    }
    break
    case "help":
    case "menu": {
        try {
            reply(`👋 Hi ${senderName}, I'm ${name} ♡! 

💡 *PREFIX:* ${prefix} *❝ Ⓒ𝐒𝐩𝐢𝐤𝐞 ❞ by GasComIT*

┌╔══『 *COMMAND LIST* 』⦁════
│║⦁------- 👑『 *Owner* 』---⦁
│║⦁ ban, unban, bc, join, mode
│║⦁------- 🖥 『 *General* 』---⦁
│║⦁ hi, del, delete, lb, alive
│║⦁-------- 👤『 *User* 』---⦁---⦁
│║⦁ profile, rank, check, sr, owner
│║⦁-------- 📥『 *Media* 』---⦁
│║⦁ ytsearch, yts , play, yta, ytmp3
│║⦁ lyrics, ytvideo, ytmp4, ytv, stream
│║⦁-------- ⭐️『 *Fun* 』---⦁
│║⦁ reaction, truth, sadcat, dare
│║⦁ advise, fact, check, ship, meme
│║⦁ flip, solemate, hornycard, hc
│║⦁-------- 💮『 *Weeb* 』---⦁
│║⦁ anime, aid, charid, pokemon 
│║⦁ character, haigusha, waifu, neko
│║⦁-------- 🌐『 *Utils* 』---⦁
│║⦁ githubsearch, github, google, upload
│║⦁ image, img, define, wikipedia, url
│║⦁ gify, sticker, photo, subreddit, getgif
│║⦁-------- 🔰『 *Admin* 』---⦁
│║⦁ event, antilink, nsfw, remove, rm
│║⦁ tag, open, close, promote, demote
│║⦁-------- 📗 『 *Note* 』---⦁ 
│║ Calls and spamming in bot Dm will
│║ cause a ban so be aware !
│║ Support by following on GitHub:
│║⦁ https://github.com/GasComIT
│║⭕ youtube.com/@krakinzlab
.╚════════════════════
`)
            return;
        } catch (e) {
            reply(e)
        }
        
    }
    break
    case "check": {
        reply(`👋 Hi ${senderName}, I'm ${name} ♡! 

💡 *PREFIX:* ${prefix} *❝ Ⓒ𝐒𝐩𝐢𝐤𝐞 ❞ by GasComIT*

┌╔═══『 *CHECK LIST* 』⦁══
│║⦁  awesome, great, character 
│║⦁  lesbian, gay, horny
│║⦁  pretty, cute, beautiful
│║⦁  lovely, handsome, ugly
│║⦁------ 📗 『 *Note* 』-------⦁ 
│║ Calls and spamming in bot Dm will
│║ cause a ban so be aware !
│║ Support by following on GitHub:
│║⦁ https://github.com/GasComIT
│║⭕ youtube.com/@krakinzlab
.╚═══════════════`)
    }
    break
    case "reaction": {
        reply(`👋 Hi ${senderName}, I'm ${name} ♡! 

💡 *PREFIX:* ${prefix} *❝ Ⓒ𝐒𝐩𝐢𝐤𝐞 ❞ by GasComIT*

┌╔═『 *REACTION LIST* 』⦁══
│║⦁ cry, kiss, bully, hug, dane
│║⦁ lick, cuddle, pat, smug, punch
│║⦁ highfive, bonk, yeet, blush
│║⦁ wave, smile, handhold, nom
│║⦁ bite, glomp, kill, slap, poke
│║⦁ cringe, kick, wink, happy
│║⦁-------- _Let's React_ 🔰
│║ Support by following on GitHub:
│║⦁ https://github.com/GasComIT
│║⭕ youtube.com/@krakinzlab
.╚════════════════`)
    }
    break
    case 'define':
    case 'dictionary': {
        if (!text) return reply(`Please provide me the search term.`)
        try {
            def = await axios.get(`http://api.urbandictionary.com/v0/define?term=${text}`)
            if (!def) return reply(`${text} isn't a valid text`)
            const defi = `
Word:~> ${text}

Definition:~> ${def.data.list[0].definition
    .replace(/\[/g, "")
    .replace(/\]/g, "")}

💭 Example:~> ${def.data.list[0].example
    .replace(/\[/g, "")
    .replace(/\]/g, "")}
               `
            reply(defi)
        } catch (err) {
            console.log(err.toString())
            return reply("Sorry could not find the result!!!!!")
        }
    }
    break
    case "profile": {
        let exp = await db.get(`${sender}.Xp`)
        let role = "";
        if (exp < 500) {
            role = "🌸 Citizen";
        } else if (exp < 1000) {
            role = "🔎 Cleric";
        } else if (exp < 2000) {
            role = "🔮 Wizard";
        } else if (exp < 5000) {
            role = "♦️ Mage";
        } else if (exp < 10000) {
            role = "🎯 Noble";
        } else if (exp < 25000) {
            role = "✨ Elite";
        } else if (exp < 50000) {
            role = "🔶️ Ace";
        } else if (exp < 75000) {
            role = "🌀 Hero";
        } else if (exp < 100000) {
            role = "💎 Supreme";
        } else {
            role = "❄️ Mystic";
        }
        
        let level = "";
        if (exp < 500) {
            level = 1;
        } else if (exp < 1000) {
            level = 2;
        } else if (exp < 2000) {
            level = 3;
        } else if (exp < 5000) {
            level = 4;
        } else if (exp < 10000) {
            level = 5;
        } else if (exp < 25000) {
            level = 6;
        } else if (exp < 50000) {
            level = 7;
        } else if (exp < 75000) {
            level = 8;
        } else if (exp < 100000) {
            level = 9;
        } else {
            level = 10;
        }
        let required = "";
        if (exp < 500) {
            required = 500;
        } else if (exp < 1000) {
            required = 1000;
        } else if (exp < 2000) {
            required = 2000;
        } else if (exp < 5000) {
            required = 5000;
        } else if (exp < 10000) {
            required = 10000;
        } else if (exp < 25000) {
            required = 25000;
        } else if (exp < 50000) {
            required = 50000;
        } else if (exp < 75000) {
            required = 75000;
        } else if (exp < 100000) {
            required = 100000;
        } else {
            required = 0;
        }
        
        try {
            ppuser = await sock.profilePictureUrl(sender, 'image')
        } catch {
            ppuser = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMxMUXFtd5GrFkxyrU-f5zA2IH8MZ-U-cFKg&usqp=CAU'
        }
        let bio = ''
        try {
            bio = (await sock.fetchStatus(sender))
                .status
        } catch (error) {
            console.log(error)
            bio = 'None'
        }
        let ban = banned.includes(sender) || false
        let contant = `*User Profile* ✨️ \n\n❢ Name ❢: ${senderName}\n\n➽ Exp ➽: ${exp} / ${required}\n\n◔ Level ◔: ${level}\n\n♕ Role ♕: ${role}\n\n⎙ User Notice ⎙: ${bio}\n\n⊝ Clan ⊝: ${groupName}\n\n♛ Admin ♛: ${isGroupAdmins}\n\n⌀ Ban ⌀: ${ban}\nBy ❝ Ⓒ𝐒𝐩𝐢𝐤𝐞 ❞ AutoLM\n`
        return sock.sendMessage(from, {
            image: {
                url: ppuser
            },
            caption: contant
        }, {
            quoted: msg
        })
    }
    break
    case "rank": {
        let exp = await db.get(`${sender}.Xp`)
        let role = "";
        if (exp < 500) {
            role = "🌸 Citizen";
        } else if (exp < 1000) {
            role = "🔎 Cleric";
        } else if (exp < 2000) {
            role = "🔮 Wizard";
        } else if (exp < 5000) {
            role = "♦️ Mage";
        } else if (exp < 10000) {
            role = "🎯 Noble";
        } else if (exp < 25000) {
            role = "✨ Elite";
        } else if (exp < 50000) {
            role = "🔶️ Ace";
        } else if (exp < 75000) {
            role = "🌀 Hero";
        } else if (exp < 100000) {
            role = "💎 Supreme";
        } else {
            role = "❄️ Mystic";
        }
        
        let level = "";
        if (exp < 500) {
            level = 1;
        } else if (exp < 1000) {
            level = 2;
        } else if (exp < 2000) {
            level = 3;
        } else if (exp < 5000) {
            level = 4;
        } else if (exp < 10000) {
            level = 5;
        } else if (exp < 25000) {
            level = 6;
        } else if (exp < 50000) {
            level = 7;
        } else if (exp < 75000) {
            level = 8;
        } else if (exp < 100000) {
            level = 9;
        } else {
            level = 10;
        }
        let required = "";
        if (exp < 500) {
            required = 500;
        } else if (exp < 1000) {
            required = 1000;
        } else if (exp < 2000) {
            required = 2000;
        } else if (exp < 5000) {
            required = 5000;
        } else if (exp < 10000) {
            required = 10000;
        } else if (exp < 25000) {
            required = 25000;
        } else if (exp < 50000) {
            required = 50000;
        } else if (exp < 75000) {
            required = 75000;
        } else if (exp < 100000) {
            required = 100000;
        } else {
            required = 0;
        }
        let disec = sender.substring(3, 7)
        try {
            ppuser = await sock.profilePictureUrl(sender, 'image')
        } catch {
            ppuser = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMxMUXFtd5GrFkxyrU-f5zA2IH8MZ-U-cFKg&usqp=CAU'
        }
        let card = `┌╔═『 ❝ Ⓒ𝐒𝐩𝐢𝐤𝐞 ❞ *Rank Card*』⦁══
│║⦁ ❢ Name ❢: ${senderName}
│║⦁ ⊷ User xp ⊷: ${exp} / ${required}
│║⦁ ❈ Stage ❈: ${role}
│║⦁ ✾ Level ✾ ${level}
│║⦁--------『 *GasComIT* 』---⦁ 
│║ Support by following on GitHub:
│║ https://github.com/GasComIT
│║ ⭕ youtube.com/@krakinzlab
.╚════════════════`
        const rank = new canvacord.Rank()
            .setAvatar(ppuser)
            .setLevel(level)
            .setLevelColor('#39FF14', '#39FF14')
            .setCurrentXP(exp)
            .setOverlay('#000000', 100, false)
            .setRequiredXP(required)
            .setProgressBar('#39FF14', 'COLOR')
            .setRank(0, role, false)
            .setBackground('COLOR', '#000000')
            .setUsername(senderName)
            .setDiscriminator(disec)
        rank.build()
            .then(async (data) => {
                sock.sendMessage(from, {
                    image: data,
                    caption: card
                }, {
                    quoted: msg
                })
            })
    }
    break
    
    case 'soulmate': {
        if (!isGroup) return replay("This is agroup command, cannot be used in private")
        let member = groupMembers.map(u => u.id)
        let me = sender
        let user2 = member[Math.floor(Math.random() * member.length)]
        let jawab = `👫 Soulmates
@${me.split('@')[0]} ❤️ @${user2.split('@')[0]}`
        let ments = [me, user2]
        await sock.sendMessage(from, {
            text: jawab,
            mentions: ments
        }, {
            quoted: msg
        })
    }
    break
    case 'awesome':
    case 'great':
    case 'gay':
    case 'cute':
    case 'lesbian':
    case 'horny':
    case 'pretty':
    case 'lovely':
    case 'ugly':
    case 'beautiful':
    case 'handsome': {
        arr = []
        try {
            user2 = msg.message.extendedTextMessage.contextInfo.participant || mentioned[0] || undefined
        } catch {
            user2 = sender
        }
        arr.push(user2)
        let per = Math.floor(Math.random() * 100) + 1
        let sentence = command.toLowerCase()
        let cc = command.toUpperCase()
        await sock.sendMessage(from, {
            text: `*=======[${cc}CHECK]=======*\n\n @${user2.split('@')[0]} is ${per}% ${sentence[0]}`,
            mentions: arr
        }, {
            quoted: msg
        })
    }
    break
    case 'character': {
        arr = []
        try {
            user2 = msg.message.extendedTextMessage.contextInfo.participant || mentioned[0] || undefined
        } catch {
            user2 = sender
        }
        arr.push(user2)
        const Mikutttt = ['Compassionate', 'Generous', 'Grumpy', 'Forgiving', 'Obedient', 'Good', 'Simp', 'Kind-Hearted', 'patient', 'UwU', 'top, anyway', 'Helpful']
        const taky = Mikutttt[Math.floor(Math.random() * Mikutttt.length)]
        let per = Math.floor(Math.random() * 100) + 1
        let cc = command.toUpperCase()
        await sock.sendMessage(from, {
            text: `*=======[${cc}CHECK]=======*\n\n @${user2.split('@')[0]} is ${per}% ${taky}`,
            mentions: arr
        }, {
            quoted: msg
        })
    }
    break
    //////////NSFW///////////////
    
    case "subreddit":
    case 'sr': {
        if (!text) {
            reply('Provide a search term!')
            return;
        }
        const sr = text
        try {
            const {
                data
            } = await axios.get(`https://meme-api.herokuapp.com/gimme/${sr}`);
            if (!nsfw.includes(from) && data.nsfw) return reply(`Hentai is not registered on ${groupName}`)
            const xz = `┌╔═『 ❝ Ⓒ𝐒𝐩𝐢𝐤𝐞 ❞ ${data.subreddit}』⦁══
│║⦁ Title : ${data.title} 
│║⦁ Postlink : ${data.postLink}     
│║⦁ Subreddit: ${data.subreddit}
│║⦁ Nsfw : ${data.nsfw}
│║⦁ Spoiler: ${data.spoiler}
│║⦁------❝ Ⓒ𝐒𝐩𝐢𝐤𝐞 ❞-----
.╚════════════════`
            
            await sock.sendMessage(from, {
                image: {
                    url: data.url
                },
                caption: xz
            }, {
                quoted: msg
            });
        } catch (err) {
            await reply('There is no such subreddit, Baka!')
            console.log(err)
        }
    }
    break
    case 'bc': {
        if (!isOwner) {
            reply("Command meant for Owner only!!!!")
            return;
        }
        if (!text) {
            reply("❌ No query provided!")
            return;
        }
        let getGroups = await sock.groupFetchAllParticipating()
        let groups = Object.entries(getGroups)
            .slice(0)
            .map(entry => entry[1])
        let res = groups.map(v => v.id)
        reply(` Broadcasting in ${res.length} Group Chat, in ${res.length * 1.5} seconds`)
        for (let i of res) {
            let txt = `🔰</ *${name} Broadcast* >🔰\n\n🏮 Message:~> ${text}\n\nAll chats broadcasted by ❝ Ⓒ𝐒𝐩𝐢𝐤𝐞 ❞`
            await sock.sendMessage(i, {
                image: {
                    url: "https://i.imgur.com/73j3KQg.jpeg"
                },
                caption: `${txt}`
            })
        }
        reply(`${name} Successfuly Broadcasted to ${res.length} Groups 🧐\n\nPowered by ❝ Ⓒ𝐒𝐩𝐢𝐤𝐞 ❞`)
    }
    break
    default:
        if (body.startsWith(prefix)) {
            reply(`┌╔═『 ❝ Ⓒ𝐒𝐩𝐢𝐤𝐞 ❞ ERROR 』⦁══
│║⦁ BAKA!! This is an unlisted command,
│║⦁ read the commands in ${prefix}help
│║⦁ To help add this command report to
│║⦁ GasComIT developers.『 *❝ Ⓒ𝐒𝐩𝐢𝐤𝐞 ❞* 』
.╚════════════════`)
        }
        break
    }
    
}

//┌╔════『 🎐𝐈𝐧𝐟𝐨𝐫𝐦𝐚𝐭𝐢𝐨𝐧🎐 』---⦁════
//│║⦁ 𝐧𝐚𝐦𝐞:𝐒𝐩𝐢𝐤𝐞
//│║⦁ whatsapp gaming userbot with automation,moderation,music, fun and 100+ commands!
//│║⦁ 𝐠𝐩𝐚𝐲: +254718241545
//│║⦁ 𝐮𝐩𝐢: krakinzlab@oksbi
//│║⦁ 𝐠𝐢𝐭: github.com/GasComIT
//│║⦁ 𝐠𝐫𝐨𝐮𝐩: ❝ Ⓒ𝐒𝐩𝐢𝐤𝐞 ❞.gascomit.repl.co
//│║⭕ youtube.com/@krakinzlab
// ╚═════════════════════
// ❝ Ⓒ𝐒𝐩𝐢𝐤𝐞 ❞
// ⭕ youtube.com/channel/UCBsVizIDS4GCz90DQvkjNxA
