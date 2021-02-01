const { MessageEmbed } = require("discord.js");

module.exports = {
  info: {
    name: "poll",
    description: "Poll any thing you want !",
    usage: "[]",
    aliases: ["vote"]
  },

  run: async function(client, message, args) {
    let msgArgs = args.join(" ");

    if (!args[0])
      return message.channel.send(
        "Please tell me what you would like the poll to ask!"
      );
    else {
      message.channel.send(`**${msgArgs}**`).then(messageReaction => {
        messageReaction.react("👍"), messageReaction.react("👎");
      });
      message.delete();
    }
  }
};
