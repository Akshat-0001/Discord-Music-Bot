const { MessageEmbed } = require("discord.js");

module.exports = {
  info: {
    name: "sayy",
    description: "Types the text you wrote !",
    usage: "[]",
    aliases: [""],
  },

  run: async function (client, message, args) {
    let msg;
        let textChannel = message.mentions.channels.first()
        message.delete()

        if(textChannel) {
            msg = args.slice(1).join(" ");
            textChannel.send(msg)
        } else {
            msg = args.join(" ");
            message.channel.send(msg)
        }
    }
}