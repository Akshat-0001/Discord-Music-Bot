const { MessageEmbed } = require("discord.js");

module.exports = {
  info: {
    name: "bam",
    description: "Bam A User !!",
    usage: "[]",
    aliases: ["bam"]
  },

  run: async function(client, message, args) {
    message.channel.send("✅ User has been bammed !");
  }
};
