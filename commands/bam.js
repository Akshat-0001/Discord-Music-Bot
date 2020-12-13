const { MessageEmbed } = require("discord.js");

module.exports = {
  info: {
    name: "bang",
    description: "Bang A User !!",
    usage: "[]",
    aliases: ["bang", "bam"]
  },

  run: async function(client, message, args) {
    message.channel.send("✅ User has been bammed !");
  }
};
