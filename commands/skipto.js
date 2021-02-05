const { MessageEmbed } = require("discord.js");
const sendError = require("../util/error");

module.exports = {
  info: {
    name: "skipto",
    description: "Skip to the selected queue number",
    usage: "skipto <number>",
    aliases: ["st"]
  },

  run: async function(client, message, args) {
    if (!args.length || isNaN(args[0]))
      return message.channel
        .send({
          embed: {
            color: "RANDOM",
            description: `**ᴜꜱᴀɢᴇ**: \`${client.config.prefix}skipto <number>\``
          }
        })
        .catch(console.error);

    const queue = message.client.queue.get(message.guild.id);
    if (!queue)
      return sendError("ᴛʜᴇʀᴇ ɪꜱ ɴᴏ Qᴜᴇᴜᴇ.", message.channel).catch(
        console.error
      );
    if (args[0] > queue.songs.length)
      return sendError(
        `ᴛʜᴇ Qᴜᴇᴜᴇ ɪꜱ ᴏɴʟʏ ${queue.songs.length} ꜱᴏɴɢꜱ ʟᴏɴɢ!`,
        message.channel
      ).catch(console.error);

    queue.playing = true;

    if (queue.loop) {
      for (let i = 0; i < args[0] - 2; i++) {
        queue.songs.push(queue.songs.shift());
      }
    } else {
      queue.songs = queue.songs.slice(args[0] - 2);
    }
    try {
      queue.connection.dispatcher.end();
    } catch (error) {
      queue.voiceChannel.leave();
      message.client.queue.delete(message.guild.id);
      return sendError(
        `:notes: ᴛʜᴇ ᴘʟᴀʏᴇʀ ʜᴀꜱ ꜱᴛᴏᴘᴘᴇᴅ ᴀɴᴅ ᴛʜᴇ Qᴜᴇᴜᴇ ʜᴀꜱ ʙᴇᴇɴ ᴄʟᴇᴀʀᴇᴅ.: ${error}`,
        message.channel
      );
    }

    queue.textChannel
      .send({
        embed: {
          color: "RANDOM",
          description: `${message.author} ⏭ ꜱᴋɪᴘᴘᴇᴅ \`${args[0] - 1}\` ꜱᴏɴɢꜱ`
        }
      })
      .catch(console.error);
    message.react("✅");
  }
};
