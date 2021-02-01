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
      .setTitle("Help Command Panel")
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
      .addField("Music Commands", [
        `**❯  ;play :** To play songs :D`,

        `**❯  ;nowplaying :** Current playing music`,

        `**❯  ;search :** To search songs :D`,

        `**❯  ;queue :** To show the server music queue`,

        `**❯  ;playlist :** To play songs from playlist :D`,

        `**❯  ;pause :** To pause the current music`,

        `**❯  ;resume :** To resume the paused music`,

        `**❯  ;stop :** Stops the music and clear the queue`,

        `**❯  ;skipto :** Skip to the selected song no.`,

        `**❯  ;skip :** To skip the current playing music`,

        `**❯  ;remove :** Remove song from the queue`,

        `**❯  ;loop :** Toggle music loop`,

        `**❯  ;shuffle :** Shuffles the server queue`,

        `**❯  ;volume :** To change the server song queue volume`,

        `**❯  ;lyrics :** Get lyrics for the current song`,

        `**❯  ;24/7 :** To enable 24x7 mode of the bot`
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
        `**❯  ;meme :** Generates a random meme`,

        `**❯  ;poll :** Toggle a Poll !`,

        `**❯  ;bam :** Bam a user xD !`,

        `**❯  ;8ball :** Ask me a question!!`
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
        `**❯  ;advice :** Generates a random good advice`,

        `**❯  ;motivation :** Quotes to motivate yourself !`
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
        `**❯  ;info :** All about Mocha Music`,

        `**❯  ;invite :** To invite the bot to your server`,

        `**❯  ;ping :** Get the bot's ping`,

        `**❯  ;botinfo :** Bot Stats`
      ]);

    const pages = [music, fun, motivation, utility];

    const emojiList = ["⬅️", "➡️"];

    const timeout = "120000";

    pagination(message, pages, emojiList, timeout);
  }
};
