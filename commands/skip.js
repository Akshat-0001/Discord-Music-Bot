const { Util, MessageEmbed } = require("discord.js");
const sendError = require("../util/error");

module.exports = {
  info: {
    name: "skip",
    description: "To skip the current music",
    usage: "",
    aliases: ["s"]
  },

  run: async function(client, message, args) {
    const channel = message.member.voice.channel;
    if (!channel)
      return sendError("https://cdn.discordapp.com/emojis/797082334415421465.gif",
        "ɪ'ᴍ ꜱᴏʀʀʏ ʙᴜᴛ ʏᴏᴜ ɴᴇᴇᴅ ᴛᴏ ʙᴇ ɪɴ ᴀ ᴠᴏɪᴄᴇ ᴄʜᴀɴɴᴇʟ ᴛᴏ ᴘʟᴀʏ ᴍᴜꜱɪᴄ!",
        message.channel
      );
    const serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue)
      return sendError("https://cdn.discordapp.com/emojis/797082334415421465.gif",
        "ᴛʜᴇʀᴇ ɪꜱ ɴᴏᴛʜɪɴɢ ᴘʟᴀʏɪɴɢ ᴛʜᴀᴛ ɪ ᴄᴏᴜʟᴅ ꜱᴋɪᴘ ꜰᴏʀ ʏᴏᴜ.",
        message.channel
      );
    if (!serverQueue.connection) return;
    if (!serverQueue.connection.dispatcher) return;
    if (serverQueue && !serverQueue.playing) {
      serverQueue.playing = true;
      serverQueue.connection.dispatcher.resume();
      let xd = new MessageEmbed()
        .setDescription("▶ ʀᴇꜱᴜᴍᴇᴅ ᴛʜᴇ ᴍᴜꜱɪᴄ ꜰᴏʀ ʏᴏᴜ!")
        .setColor("RANDOM")
        .setTitle("ᴍᴜꜱɪᴄ ʜᴀꜱ ʙᴇᴇɴ ʀᴇꜱᴜᴍᴇᴅ!");

      return message.channel.send(xd).catch(err => console.log(err));
    }

    try {
      serverQueue.connection.dispatcher.end();
    } catch (error) {
      serverQueue.voiceChannel.leave();
      message.client.queue.delete(message.guild.id);
      return sendError(
        `:notes: ᴛʜᴇ ᴘʟᴀʏᴇʀ ʜᴀꜱ ꜱᴛᴏᴘᴘᴇᴅ ᴀɴᴅ ᴛʜᴇ Qᴜᴇᴜᴇ ʜᴀꜱ ʙᴇᴇɴ ᴄʟᴇᴀʀᴇᴅ.: ${error}`,
        message.channel
      );
    }
    message.react("✅");
  }
};
