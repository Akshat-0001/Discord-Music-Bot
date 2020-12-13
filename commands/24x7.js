const { MessageEmbed } = require("discord.js");
const sendError = require("../util/error");
const fs = require("fs");

module.exports = {
  info: {
    name: "24/7",
    description: "use 24x7",
    usage: "[]",
    aliases: ["24/7"]
  },

  run: async function(client, message, args) {
    let afk = JSON.parse(fs.readFileSync("./afk.json", "utf8"));
    if (!afk[message.guild.id])
      afk[message.guild.id] = {
        afk: false
      };
    var serverQueue = afk[message.guild.id];
    if (serverQueue) {
      serverQueue.afk = !serverQueue.afk;
      message.channel.send({
        embed: {
          color: "RANDOM",
          thumbnail:
            "https://66.media.tumblr.com/66f920fdd54c519f98af3a8a24fd14a7/tumblr_prfcqeDLEY1t73js3_540.gif",
          description: `💤  **|**  24/7 mode is **\`${
            serverQueue.afk === true ? "enabled" : "disabled"
          }\`**`
        }
      });
      return fs.writeFile("./afk.json", JSON.stringify(afk), err => {
        if (err) console.error(err);
      });
    }
    return sendError(
      "There is nothing playing in this server.",
      message.channel
    );
  }
};
