const util = require('util');  
const fs = require('fs-extra');  
const { zokou } = require(__dirname + "/../framework/zokou");  
const { format } = require(__dirname + "/../framework/mesfonctions");  
const os = require("os");  
const moment = require("moment-timezone");  
const s = require(__dirname + "/../set");  

const more = String.fromCharCode(8206);  
const readMore = more.repeat(4001);  

zokou({ nomCom: "menu", categorie: "General" }, async (dest, zk, commandeOptions) => {  
    let { ms, repondre, prefixe, nomAuteurMessage } = commandeOptions;  
    let { cm } = require(__dirname + "/../framework/zokou");  
    var coms = {};  
    var mode = (s.MODE.toLowerCase() === "yes") ? "🌍 PUBLIC" : "🔒 PRIVATE";  

    cm.map((com) => {  
        if (!coms[com.categorie]) coms[com.categorie] = [];  
        coms[com.categorie].push(com.nomCom);  
    });  

    moment.tz.setDefault("Africa/Nairobi");  
    const temps = moment().format('🕰️ HH:mm:ss');  
    const date = moment().format('📅 DD/MM/YYYY');  

    let infoMsg = `  
╔════❖⚡ *PKXMD-BOT* ⚡❖════╗  
║ 👋 𝗛𝗲𝗹𝗹𝗼, *${nomAuteurMessage}*!  
║━━━━━━━━━━━━━━━━━━━━━  
║ 🖥️ *System Info:*  
║ 🌐 Platform: *${os.platform()}*  
║━━━━━━━━━━━━━━━━━━━━━  
║ ⚙️ *Bot Status:*  
║ 🔘 Mode: *${mode}*  
║ 🚀 Prefix: *[ ${prefixe} ]*  
║ ⏳ Time: *${temps}*  
║ 📆 Date: *${date}*  
╚═════❖════════❖═════╝  

${readMore}  

🛠️ *COMMAND MENU* 🛠️  
`;  

    let menuMsg = ``;  

    for (const cat in coms) {  
        menuMsg += `\n🔹 *${cat.toUpperCase()}* 🔹\n`;  
        for (const cmd of coms[cat]) {  
            menuMsg += `🛑 ${cmd}\n`;  
        }  
    }  

    menuMsg += `\n✨ *PKXMD-BOT - Developed by The Best!* ✨`;  

    let imageUrl = "https://files.catbox.moe/k3pmh3.jpg";  

    try {  
        zk.sendMessage(dest, {   
            image: { url: imageUrl },   
            caption: infoMsg + menuMsg,   
            footer: "© PKXMD-BOT"   
        }, { quoted: ms });  
    } catch (e) {  
        console.log("🥵 Menu error: " + e);  
        repondre("🥵 Menu error: " + e);  
    }  
});
