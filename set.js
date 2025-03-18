

const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoic0hqTEtQUklJZm4rL1V3blY2OVV6emM0VGNlRVU1UE9MN0lEZXJBc1ltdz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZE83bXZRT2JjRkh3TTBoTERKNG5jL0J2dy9HZ0JabmU5L0w1N1pLK2tFWT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJtQ2QxdjNtcGlmbDZvN0FjQ2Nac2ZUWGxEbkQrL2luT05CNFhwa0dLVG5nPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCQ2s0cnFNbTNxRFAxVTE3dHNjWmloQVRzRDA5bS9nazBhWHFQcmYvQmhJPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IktKUFAzampLenQ3VWlNQU43MGFDK1VYZE1zWU5nMXlJVXc3UEFXMTZ0Vms9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImpoWXV6Wk5wdGVzekdsWWxNUjdaQ3dBeitsUEdXaWxMU25wTkpRSlBJaWc9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibUwrZE5vMWZoc3dBbHArUVM3NkNqWXA1dXdoZFlvVUI0STZnbDRqdGkyOD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTTRSUXdqRnlxYjErZFhpYnNWVXFwRjJCaVE0Tmx1UW1yVTgvZlpnSDdBZz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjY4cFNmYzliZFNsT25yRzR1UHAxazBmWTJycXVBR3R2b3NHUUVpMjhFdnphR1NNM1gyekFsbTNIU21KYmxHdFpzbjBzNXphalNCK0ZIa0gxbk1PNmhBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjYsImFkdlNlY3JldEtleSI6IkM2SENOTWV5L3gya2NCWVN1RE1MaC9Xcm80SXFhL0tGSS9FTkJEczN4Zk09IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiNDkxNTU2MjM3ODM0M0BzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiJCODlDN0Q4NzA3NUVGNkRCQkQ1OUY0OThFQzdEREQ2MSJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzQyMzEyNjA3fSx7ImtleSI6eyJyZW1vdGVKaWQiOiI0OTE1NTYyMzc4MzQzQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjJCM0U5NTYyRDk2N0I5OUZCRTk5NTIwMzMzQTU4QzI3In0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NDIzMTI2MDd9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjEsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6ImhiWWxhSnI5VHFDSnlZMnFyd3V1WkEiLCJwaG9uZUlkIjoiZmNkNjgxMWItMjJlMS00NWU1LTlmOTEtNzg0YzE5YmJlZjk1IiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlkwN1Z3WnN5SE5GNDQxOTV1Q2lUbHlXcld6dz0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJKdGYveW5nUnQ5d3hvZUM4VThaU2hlZzRUM0E9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiNktXVjlON1AiLCJtZSI6eyJpZCI6IjQ5MTU1NjIzNzgzNDM6MTNAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiLiJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDT1hQeVMwUWtxbm12Z1lZQVNBQUtBQT0iLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiNzJWMTFsSVp2YWxKdkYyNjJiTVh3MzRuS2dSTjlLbzNDT2d3KzRINGVScz0iLCJhY2NvdW50U2lnbmF0dXJlIjoienVwZ3VTUFVQUUdSWFlaeGhVNTFBbVdTak5udFRvZXpQYkxYeExkMDd0eW1tNWw0K0kxeS9hT1ViMzc0ZVJkSUczalBROURsYjNlR1M0SE51UEJCQmc9PSIsImRldmljZVNpZ25hdHVyZSI6IlJmUmV4bmZFSHpudlpKcmpXWW9TcWpMU295bW91VXp6M1BWeDd1NC95QkhIQUJaZzFXRTYvdkg3TjF4ZUxvOVZTTE1hZlNTcjErc2ZCNDJtMGFmK2hnPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiNDkxNTU2MjM3ODM0MzoxM0BzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJlOWxkZFpTR2IycFNieGR1dG16RjhOK0p5b0VUZlNxTndqb01QdUIrSGtiIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzQyMzEyNjA2LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQURDTiJ9',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Martin",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "4915563151347",  
   URL: process.env.URL || "https://i.ibb.co/YFvqwz8Y/lordcasey.jpg",
    GURL: process.env.GURL  || "https://whatsapp.com/channel/0029VakUEfb4o7qVdkwPk83",
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'BMW_MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'yes',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ANTIDELETE1 : process.env.ANTI_DELETE_MESSAGE || 'no',
    ANTICALL : process.env.ANTICALL || 'no',
                  AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'yes',
                  AUTO_READ : process.env.AUTO_READ || 'yes',
                  CHATBOT : process.env.CHATBOT || "yes",
                  AUTO_BIO : process.env.AUTO_BIO || "yes",
                  AUTO_REACT : process.env.AUTO_REACT || "yes",
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});

