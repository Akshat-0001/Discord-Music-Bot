const Discord = require("discord.js");
const { version } = require("discord.js");
const moment = require("moment");
const m = require("moment-duration-format");
let os = require("os");
let cpuStat = require("cpu-stat");
const ms = require("ms");

module.exports = {
  info: {
    name: "botinfo",
    description: "full bot info",
    usage: "[]",
    aliases: [""]
  },

  run: async function(client, message, args) {
    let cpuLol;
    cpuStat.usagePercent(function(err, percent, seconds) {
      if (err) {
        return console.log(err);
      }
      const duration = moment
        .duration(client.uptime)
        .format(" D [days], H [hrs], m [mins], s [secs]");
      const botinfo = new Discord.MessageEmbed()
        .setAuthor(client.user.username)
        .setThumbnail(
          "https://i.pinimg.com/originals/fd/47/e5/fd47e55dfb49ae1d39675d6eff34a729.gif"
        )
        .setTitle("__**Stats:**__")
        .setColor("RANDOM")
        .addField(
          "⏳ Mem Usage",
          `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} / ${(
            os.totalmem() /
            1024 /
            1024
          ).toFixed(2)} MB`,
          true
        )
        .addField("⌚️ Uptime ", `${duration}`, true)
        .addField("👾 Discord.js", `v${version}`, true)
        .addField("🤖 Node", `${process.version}`, true)
        .addField(
          "🤖 CPU",
          `\`\`\`md\n${os.cpus().map(i => `${i.model}`)[0]}\`\`\``
        )
        .addField("🤖 CPU usage", `\`${percent.toFixed(2)}%\``, true)
        .addField("🤖 Arch", `\`${os.arch()}\``, true)
        .addField("💻 Platform", `\`\`${os.platform()}\`\``, true);
      message.channel.send(botinfo);
    });
  }
};
