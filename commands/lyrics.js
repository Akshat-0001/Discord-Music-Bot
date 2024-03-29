const { MessageEmbed } = require("discord.js");
const lyricsFinder = require("lyrics-finder");
const sendError = require("../util/error");

module.exports = {
  info: {
    name: "lyrics",
    description: "Get lyrics for the currently playing song",
    usage: "[lyrics]",
    aliases: ["ly"]
  },

  run: async function(client, message, args) {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue)
      return sendError("There is nothing playing.", message.channel).catch(
        console.error
      );

    let lyrics = null;

    try {
      lyrics = await lyricsFinder(queue.songs[0].title, "");
      if (!lyrics) lyrics = `No lyrics found for ${queue.songs[0].title}.`;
    } catch (error) {
      lyrics = `No lyrics found for ${queue.songs[0].title}.`;
    }

    let lyricsEmbed = new MessageEmbed()
      .setAuthor(
        `${queue.songs[0].title} — Lyrics`,
        "https://cdn.discordapp.com/emojis/767294574212415518.gif"
      )
      .setThumbnail(queue.songs[0].img)
      .setColor("RANDOM")
      .setDescription(lyrics)
      .setFooter(
        "Songs ke lyrics tak nhi yaad !! Mujhse mehnat karwate ho ??? xD"
      )
      .setTimestamp();

    if (lyricsEmbed.description.length >= 2048)
      lyricsEmbed.description = `${lyricsEmbed.description.substr(0, 2045)}...`;
    return message.channel.send(lyricsEmbed).catch(console.error);
  }
};
