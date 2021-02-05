const { MessageEmbed } = require("discord.js");
const sendError = require("../util/error");

module.exports = {
  info: {
    name: "stop",
    description: "To stop the music and clearing the queue",
    usage: "",
    aliases: []
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
        "ᴛʜᴇʀᴇ ɪꜱ ɴᴏᴛʜɪɴɢ ᴘʟᴀʏɪɴɢ ᴛʜᴀᴛ ɪ ᴄᴏᴜʟᴅ ꜱᴛᴏᴘ ꜰᴏʀ ʏᴏᴜ.",
        message.channel
      );
    if (!serverQueue.connection) return;
    if (!serverQueue.connection.dispatcher) return;
    try {
      serverQueue.connection.dispatcher.end();
    } catch (error) {
      message.guild.me.voice.channel.leave();
      message.client.queue.delete(message.guild.id);
      return sendError(
        `:notes: ᴛʜᴇ ᴘʟᴀʏᴇʀ ʜᴀꜱ ꜱᴛᴏᴘᴘᴇᴅ ᴀɴᴅ ᴛʜᴇ Qᴜᴇᴜᴇ ʜᴀꜱ ʙᴇᴇɴ ᴄʟᴇᴀʀᴇᴅ.: ${error}`,
        message.channel
      );
    }
    message.client.queue.delete(message.guild.id);
    serverQueue.songs = [];
    message.react("✅");
  }
};
