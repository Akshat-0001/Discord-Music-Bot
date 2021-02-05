const pagination = require("discord.js-pagination");
const Discord = require("discord.js");

module.exports = {
  info: {
    name: "help",
    description: "To show all commands",
    usage: "[command]",
    aliases: ["commands", "help me", "pls help"]
  },

  async run(client, message, args) {
    //Sort your commands into categories, and make seperate embeds for each category

    const music = new Discord.MessageEmbed()
      .setTitle("Help Command Panel", "https://cdn.discordapp.com/emojis/767294574212415518.gif")
      .setTimestamp()
      .setColor("RANDOM")
      .setImage(
        "https://cdn.discordapp.com/attachments/796774782342660146/804032694509895710/standard_2.gif"
      )
      .setFooter(
        "Made with love by akshat",
        "https://cdn.discordapp.com/attachments/796774782342660146/804032694509895710/standard_2.gif"
      )
      .setThumbnail(
        "https://66.media.tumblr.com/66f920fdd54c519f98af3a8a24fd14a7/tumblr_prfcqeDLEY1t73js3_540.gif"
      )
      .addField("ᴍᴜꜱɪᴄ ᴄᴏᴍᴍᴀɴᴅꜱ", [ `**❯ ;ᴘʟᴀʏ :** ᴛᴏ ᴘʟᴀʏ ꜱᴏɴɢꜱ :ᴅ`,
       `**❯ ;ɴᴏᴡᴘʟᴀʏɪɴɢ :** ᴄᴜʀʀᴇɴᴛ ᴘʟᴀʏɪɴɢ ᴍᴜꜱɪᴄ`, 
       `**❯ ;ꜱᴇᴀʀᴄʜ :** ᴛᴏ ꜱᴇᴀʀᴄʜ ꜱᴏɴɢꜱ :ᴅ`, 
       `**❯ ;Qᴜᴇᴜᴇ :** ᴛᴏ ꜱʜᴏᴡ ᴛʜᴇ ꜱᴇʀᴠᴇʀ ᴍᴜꜱɪᴄ Qᴜᴇᴜᴇ`, 
       `**❯ ;ᴘʟᴀʏʟɪꜱᴛ :** ᴛᴏ ᴘʟᴀʏ ꜱᴏɴɢꜱ ꜰʀᴏᴍ ᴘʟᴀʏʟɪꜱᴛ :ᴅ`, 
       `**❯ ;ᴘᴀᴜꜱᴇ :** ᴛᴏ ᴘᴀᴜꜱᴇ ᴛʜᴇ ᴄᴜʀʀᴇɴᴛ ᴍᴜꜱɪᴄ`, 
       `**❯ ;ʀᴇꜱᴜᴍᴇ :** ᴛᴏ ʀᴇꜱᴜᴍᴇ ᴛʜᴇ ᴘᴀᴜꜱᴇᴅ ᴍᴜꜱɪᴄ`, 
       `**❯ ;ꜱᴛᴏᴘ :** ꜱᴛᴏᴘꜱ ᴛʜᴇ ᴍᴜꜱɪᴄ ᴀɴᴅ ᴄʟᴇᴀʀ ᴛʜᴇ Qᴜᴇᴜᴇ`, 
       `**❯ ;ꜱᴋɪᴘᴛᴏ :** ꜱᴋɪᴘ ᴛᴏ ᴛʜᴇ ꜱᴇʟᴇᴄᴛᴇᴅ ꜱᴏɴɢ ɴᴏ.`, 
       `**❯ ;ꜱᴋɪᴘ :** ᴛᴏ ꜱᴋɪᴘ ᴛʜᴇ ᴄᴜʀʀᴇɴᴛ ᴘʟᴀʏɪɴɢ ᴍᴜꜱɪᴄ`, 
       `**❯ ;ʀᴇᴍᴏᴠᴇ :** ʀᴇᴍᴏᴠᴇ ꜱᴏɴɢ ꜰʀᴏᴍ ᴛʜᴇ Qᴜᴇᴜᴇ`, 
       `**❯ ;ʟᴏᴏᴘ :** ᴛᴏɢɢʟᴇ ᴍᴜꜱɪᴄ ʟᴏᴏᴘ`, 
       `**❯ ;ꜱʜᴜꜰꜰʟᴇ :** ꜱʜᴜꜰꜰʟᴇꜱ ᴛʜᴇ ꜱᴇʀᴠᴇʀ Qᴜᴇᴜᴇ`, 
       `**❯ ;ᴠᴏʟᴜᴍᴇ :** ᴛᴏ ᴄʜᴀɴɢᴇ ᴛʜᴇ ꜱᴇʀᴠᴇʀ ꜱᴏɴɢ Qᴜᴇᴜᴇ ᴠᴏʟᴜᴍᴇ`, `**❯ ;ʟʏʀɪᴄꜱ :** ɢᴇᴛ ʟʏʀɪᴄꜱ ꜰᴏʀ ᴛʜᴇ ᴄᴜʀʀᴇɴᴛ ꜱᴏɴɢ`, 
       `**❯ ;24/7 :** ᴛᴏ ᴇɴᴀʙʟᴇ 24x7 ᴍᴏᴅᴇ ᴏꜰ ᴛʜᴇ ʙᴏᴛ`
      ]);

    const fun = new Discord.MessageEmbed()
      .setTitle("Help Command Panel")
      .setTimestamp()
      .setColor("RANDOM")
      .setImage(
        "https://cdn.discordapp.com/attachments/796774782342660146/804032694509895710/standard_2.gif"
      )
      .setThumbnail(
        "https://66.media.tumblr.com/66f920fdd54c519f98af3a8a24fd14a7/tumblr_prfcqeDLEY1t73js3_540.gif"
      )
      .setFooter(`Made with LovE Akshat | Pucha Kisi Ne ?`)
      .addField("Fun", [
        `**❯ ;ᴍᴇᴍᴇ :** ɢᴇɴᴇʀᴀᴛᴇꜱ ᴀ ʀᴀɴᴅᴏᴍ ᴍᴇᴍᴇ`, 
        `**❯ ;ᴘᴏʟʟ :** ᴛᴏɢɢʟᴇ ᴀ ᴘᴏʟʟ !`, 
        `**❯ ;ʙᴀᴍ :** ʙᴀᴍ ᴀ ᴜꜱᴇʀ xᴅ !`, 
        `**❯ ;8ʙᴀʟʟ :** ᴀꜱᴋ ᴍᴇ ᴀ Qᴜᴇꜱᴛɪᴏɴ!!`
      ]);

    const motivation = new Discord.MessageEmbed()
      .setTitle("Help Command Panel")
      .setTimestamp()
      .setImage(
        "https://cdn.discordapp.com/attachments/796774782342660146/804032694509895710/standard_2.gif"
      )
      .setColor("RANDOM")
      .setThumbnail(
        "https://66.media.tumblr.com/66f920fdd54c519f98af3a8a24fd14a7/tumblr_prfcqeDLEY1t73js3_540.gif"
      )
      .setFooter(`Made with LovE Akshat | Pucha Kisi Ne ?`)
      .addField("Motivation", [
       `**❯ ;ᴀᴅᴠɪᴄᴇ :** ɢᴇɴᴇʀᴀᴛᴇꜱ ᴀ ʀᴀɴᴅᴏᴍ ɢᴏᴏᴅ ᴀᴅᴠɪᴄᴇ`, 
       `**❯ ;ᴍᴏᴛɪᴠᴀᴛɪᴏɴ :** Qᴜᴏᴛᴇꜱ ᴛᴏ ᴍᴏᴛɪᴠᴀᴛᴇ ʏᴏᴜʀꜱᴇʟꜰ !`
      ]);

    const utility = new Discord.MessageEmbed()
      .setTitle("Help Command Panel")
      .setTimestamp()
      .setImage(
        "https://cdn.discordapp.com/attachments/796774782342660146/804032694509895710/standard_2.gif"
      )
      .setColor("RANDOM")
      .setThumbnail(
        "https://66.media.tumblr.com/66f920fdd54c519f98af3a8a24fd14a7/tumblr_prfcqeDLEY1t73js3_540.gif"
      )
      .addField("General", [
        `**❯ ;ɪɴꜰᴏ :** ᴀʟʟ ᴀʙᴏᴜᴛ ᴍᴏᴄʜᴀ ᴍᴜꜱɪᴄ`, 
        `**❯ ;ɪɴᴠɪᴛᴇ :** ᴛᴏ ɪɴᴠɪᴛᴇ ᴛʜᴇ ʙᴏᴛ ᴛᴏ ʏᴏᴜʀ ꜱᴇʀᴠᴇʀ`, 
        `**❯ ;ᴘɪɴɢ :** ɢᴇᴛ ᴛʜᴇ ʙᴏᴛ'ꜱ ᴘɪɴɢ`, 
        `**❯ ;ʙᴏᴛɪɴꜰᴏ :** ʙᴏᴛ ꜱᴛᴀᴛꜱ`
      ]);

    const pages = [music, fun, motivation, utility];

    const emojiList = ["⬅️", "➡️"];

    const timeout = "120000";

    pagination(message, pages, emojiList, timeout);
  }
};
