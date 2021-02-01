const { MessageEmbed } = require("discord.js");
const sendError = require("../util/error");

module.exports = {
  info: {
    name: "volume",
    description: "To change the server song queue volume",
    usage: "[volume]",
    aliases: ["v", "vol"]
  },

  run: async function(client, message, args) {
    const channel = message.member.voice.channel;
    if (!channel)
      return sendError(
        "I'm sorry but you need to be in a voice channel to play music!",
        message.channel
      );
    const serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue)
      return sendError(
        "There is nothing playing in this server.",
        message.channel
      );
    if (!args[0])
      return message.channel.send(
        `The current volume is: **${serverQueue.volume}**`
      );
    if (isNaN(args[0]))
      return message.channel
        .send(":notes: Numbers only!")
        .catch(err => console.log(err));
    if (parseInt(args[0]) > 150 || args[0] < 0)
      return sendError(
        "You can't set the volume more than 150. or lower than 0",
        message.channel
      ).catch(err => console.log(err));
    serverQueue.volume = args[0];
    serverQueue.connection.dispatcher.setVolumeLogarithmic(args[0] / 100);
    let xd = new MessageEmbed()
      .setDescription(`I set the volume to: **${args[0] / 1}/100**`)
      .setAuthor(
        "Server Volume Manager",
        "https://cdn.discordapp.com/emojis/767294574212415518.gif"
      )
      .setColor("RANDOM")
      .setThumbnail(
        "https://66.media.tumblr.com/5c712c9fc3f17b1735a36b8ec65996ba/tumblr_pnm6xffHNP1t73js3_540.gif"
      )
      .setFooter("Did Anyone Asked You to change the volume ??? xD");
    return message.channel.send(xd);
  }
};
