const { MessageEmbed } = require("discord.js");
const sendError = require("../util/error");

module.exports = {
  info: {
    name: "volume",
    description: "ᴛᴏ ᴄʜᴀɴɢᴇ ᴛʜᴇ ꜱᴇʀᴠᴇʀ ꜱᴏɴɢ Qᴜᴇᴜᴇ ᴠᴏʟᴜᴍᴇ",
    usage: "[volume]",
    aliases: ["v", "vol"]
  },

  run: async function(client, message, args) {
    const channel = message.member.voice.channel;
    if (!channel)
      return sendError(
        "ɪ'ᴍ ꜱᴏʀʀʏ ʙᴜᴛ ʏᴏᴜ ɴᴇᴇᴅ ᴛᴏ ʙᴇ ɪɴ ᴀ ᴠᴏɪᴄᴇ ᴄʜᴀɴɴᴇʟ ᴛᴏ ᴘʟᴀʏ ᴍᴜꜱɪᴄ!",
        message.channel
      );
    const serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue)
      return sendError(
        "ᴛʜᴇʀᴇ ɪꜱ ɴᴏᴛʜɪɴɢ ᴘʟᴀʏɪɴɢ ɪɴ ᴛʜɪꜱ ꜱᴇʀᴠᴇʀ.",
        message.channel
      );
    if (!args[0])
      return message.channel.send(
        `ᴛʜᴇ ᴄᴜʀʀᴇɴᴛ ᴠᴏʟᴜᴍᴇ ɪꜱ: **${serverQueue.volume}**`
      );
    if (isNaN(args[0]))
      return message.channel
        .send(":notes: Numbers only!")
        .catch(err => console.log(err));
    if (parseInt(args[0]) > 150 || args[0] < 0)
      return sendError(
        "ʏᴏᴜ ᴄᴀɴ'ᴛ ꜱᴇᴛ ᴛʜᴇ ᴠᴏʟᴜᴍᴇ ᴍᴏʀᴇ ᴛʜᴀɴ 150. ᴏʀ ʟᴏᴡᴇʀ ᴛʜᴀɴ 0",
        message.channel
      ).catch(err => console.log(err));
    serverQueue.volume = args[0];
    serverQueue.connection.dispatcher.setVolumeLogarithmic(args[0] / 100);
    let xd = new MessageEmbed()
      .setDescription(`ɪ ꜱᴇᴛ ᴛʜᴇ ᴠᴏʟᴜᴍᴇ ᴛᴏ: **${args[0] / 1}/100**`)
      .setAuthor(
        "ꜱᴇʀᴠᴇʀ ᴠᴏʟᴜᴍᴇ ᴍᴀɴᴀɢᴇʀ",
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
