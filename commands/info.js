const { MessageEmbed } = require("discord.js");
const os = require("os");
const ms = require("ms");
const { utc } = require("moment");

module.exports = {
  info: {
    name: "info",
    description: "All about 69 Musician",
    usage: "",
    aliases: ["info"]
  },

  run: async function(client, message, args) {
    let embed = new MessageEmbed()
      .setAuthor(
        "Mocha Music",
        "https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/Music.gif"
      )
      .setColor("RANDOM")
      .setThumbnail(
        "https://66.media.tumblr.com/0ba8e2989811721a348c576a1d24ce77/tumblr_pm73bqPfrx1wvmt49_540.gif"
      )
      .addField("Developer Info", [
        `**❯  Name:** AKSHAT SHUKLA`,

        `**❯  UserName:** Aкѕнaт|ℓινє fℓαmє|ﾶ#6969`,

        `**❯  UserID:** 755001695301402624`,

        `**❯  Region:** India`
      ])
      .addField("General", [
        `**❯ Client:** ${client.user.tag}`,

        `**❯  Bot Info:** A 24x7 Advanced Music Bot`,

        `**❯  Prefix:** **;**`
      ])

      .setFooter(`Pucha Kisi Ne ? | Made with love By Akshat`)
      .addField("My Inspiration", "**❯** ***MOCHA YT***")
      .setImage(
        "https://cdn.discordapp.com/attachments/796774782342660146/804032694509895710/standard_2.gif"
      )

      .setTimestamp();

    return message.channel.send(embed);
  }
};
