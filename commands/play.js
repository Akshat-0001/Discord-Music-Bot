const { Util, MessageEmbed } = require("discord.js");
const ytdl = require("ytdl-core");
const ytdlDiscord = require("ytdl-core-discord");
const yts = require("yt-search");
const fs = require("fs");
const sendError = require("../util/error");

module.exports = {
    info: {
        name: "play",
        description: "To play songs :D",
        usage: "<YouTube_URL> | <song_name>",
        aliases: ["p"],
    },

    run: async function (client, message, args) {
        let channel = message.member.voice.channel;
        if (!channel) return sendError("ʏᴏᴜ ɴᴇᴇᴅ ᴛᴏ ʙᴇ ɪɴ ᴀ ᴠᴏɪᴄᴇ ᴄʜᴀɴɴᴇʟ ᴛᴏ ᴘʟᴀʏ ᴍᴜꜱɪᴄ!", message.channel);

        const permissions = channel.permissionsFor(message.client.user);
        if (!permissions.has("CONNECT")) return sendError("ɪ ᴄᴀɴɴᴏᴛ ᴄᴏɴɴᴇᴄᴛ ᴛᴏ ʏᴏᴜʀ ᴠᴏɪᴄᴇ ᴄʜᴀɴɴᴇʟ, ᴍᴀᴋᴇ ꜱᴜʀᴇ ɪ ʜᴀᴠᴇ ᴛʜᴇ ᴘʀᴏᴘᴇʀ ᴘᴇʀᴍɪꜱꜱɪᴏɴꜱ!", message.channel);
        if (!permissions.has("SPEAK")) return sendError("ɪ ᴄᴀɴɴᴏᴛ ꜱᴘᴇᴀᴋ ɪɴ ᴛʜɪꜱ ᴠᴏɪᴄᴇ ᴄʜᴀɴɴᴇʟ, ᴍᴀᴋᴇ ꜱᴜʀᴇ ɪ ʜᴀᴠᴇ ᴛʜᴇ ᴘʀᴏᴘᴇʀ ᴘᴇʀᴍɪꜱꜱɪᴏɴꜱ!", message.channel);

        var searchString = args.join(" ");
        if (!searchString) return sendError("ʏᴏᴜ ᴅɪᴅɴ'ᴛ ᴘʀᴏᴠɪᴅᴇᴅ ᴡʜᴀᴛ ɪ ᴡᴀɴᴛ ᴛᴏ ᴘʟᴀʏ", message.channel);
        const url = args[0] ? args[0].replace(/<(.+)>/g, "$1") : "";
        var serverQueue = message.client.queue.get(message.guild.id);

        let songInfo = null;
        let song = null;
        if (url.match(/^(https?:\/\/)?(www\.)?(m\.)?(youtube\.com|youtu\.?be)\/.+$/gi)) {
            try {
                songInfo = await ytdl.getInfo(url);
                if (!songInfo) return sendError("ɪ ᴡᴀꜱ ᴜɴᴀʙʟᴇ ᴛᴏ ꜰɪɴᴅ ᴛʜᴇ ꜱᴏɴɢ ᴏɴ ʏᴏᴜᴛᴜʙᴇ", message.channel);
                song = {
                    id: songInfo.videoDetails.videoId,
                    title: songInfo.videoDetails.title,
                    url: songInfo.videoDetails.video_url,
                    img: songInfo.player_response.videoDetails.thumbnail.thumbnails[0].url,
                    duration: songInfo.videoDetails.lengthSeconds,
                    ago: songInfo.videoDetails.publishDate,
                    views: String(songInfo.videoDetails.viewCount).padStart(10, " "),
                    req: message.author,
                };
            } catch (error) {
                console.error(error);
                return message.reply(error.message).catch(console.error);
            }
        } else {
            try {
                var searched = await yts.search(searchString);
                if (searched.videos.length === 0) return sendError("ɪ ᴡᴀꜱ ᴜɴᴀʙʟᴇ ᴛᴏ ꜰɪɴᴅ ᴛʜᴇ ꜱᴏɴɢ ᴏɴ ʏᴏᴜᴛᴜʙᴇ", message.channel);

                songInfo = searched.videos[0];
                song = {
                    id: songInfo.videoId,
                    title: Util.escapeMarkdown(songInfo.title),
                    views: String(songInfo.views).padStart(10, " "),
                    url: songInfo.url,
                    ago: songInfo.ago,
                    duration: songInfo.duration.toString(),
                    img: songInfo.image,
                    req: message.author,
                };
            } catch (error) {
                console.error(error);
                return message.reply(error.message).catch(console.error);
            }
        }

        if (serverQueue) {
            serverQueue.songs.push(song);
            let thing = new MessageEmbed()
                .setAuthor("ꜱᴏɴɢ ʜᴀꜱ ʙᴇᴇɴ ᴀᴅᴅᴇᴅ ᴛᴏ Qᴜᴇᴜᴇ",  "https://cdn.discordapp.com/emojis/767294574212415518.gif")
                .setThumbnail(song.img)
                .setColor("RANDOM")
                .addField("ꜱᴏɴɢ ɴᴀᴍᴇ", song.title, true)
                .addField("ᴅᴜʀᴀᴛɪᴏɴ", song.duration, true)
                .addField("ʀᴇQᴜᴇꜱᴛᴇᴅ ʙʏ", song.req.tag, true)
                .setFooter(`ᴠɪᴇᴡꜱ: ${song.views} | ${song.ago}`);
            return message.channel.send(thing);
        }

        const queueConstruct = {
            textChannel: message.channel,
            voiceChannel: channel,
            connection: null,
            songs: [],
            volume: 80,
            playing: true,
            loop: false,
        };
        message.client.queue.set(message.guild.id, queueConstruct);
        queueConstruct.songs.push(song);

        const play = async (song) => {
            const queue = message.client.queue.get(message.guild.id);
            let afk = JSON.parse(fs.readFileSync("./afk.json", "utf8"));
            if (!afk[message.guild.id])
                afk[message.guild.id] = {
                    afk: false,
                };
            var online = afk[message.guild.id];
            if (!song) {
                if (!online.afk) {
                    sendError(
                        "ʟᴇꜰᴛ ᴛʜᴇ ᴠᴄ ʙᴇᴄᴀᴜꜱᴇ ᴛʜᴇʀᴇ ᴀʀᴇ ɴᴏ ꜱᴏɴɢꜱ ɪɴ ᴛʜᴇ Qᴜᴇᴜᴇ. ɪꜰ ʏᴏᴜ ʟɪᴋᴇ ᴛʜᴇ ʙᴏᴛ ꜱᴛᴀʏ 24/7 ɪɴ ᴠᴏɪᴄᴇ ᴄʜᴀɴɴᴇʟ ʀᴜɴ `24/7`",
                        message.channel
                    );
                    message.guild.me.voice.channel.leave(); //If you want your bot stay in vc 24/7 remove this line :D
                    message.client.queue.delete(message.guild.id);
                }
                return message.client.queue.delete(message.guild.id);
            }
            let stream = null;
            if (song.url.includes("youtube.com")) {
                stream = await ytdl(song.url);
                stream.on("error", function (er) {
                    if (er) {
                        if (queue) {
                            queue.songs.shift();
                            play(queue.songs[0]);
                            return sendError(`An unexpected error has occurred.\nPossible type \`${er}\``, message.channel);
                        }
                    }
                });
            }
            queue.connection.on("disconnect", () => message.client.queue.delete(message.guild.id));

            const dispatcher = queue.connection.play(ytdl(song.url, { quality: "highestaudio", highWaterMark: 1 << 25, type: "opus" })).on("finish", () => {
                const shiffed = queue.songs.shift();
                if (queue.loop === true) {
                    queue.songs.push(shiffed);
                }
                play(queue.songs[0]);
            });

            dispatcher.setVolumeLogarithmic(queue.volume / 100);
            let thing = new MessageEmbed()
                .setAuthor("ꜱᴛᴀʀᴛᴇᴅ ᴘʟᴀʏɪɴɢ ᴍᴜꜱɪᴄ!", "https://cdn.discordapp.com/emojis/767294574212415518.gif")
                .setThumbnail(song.img)
                .setColor("RANDOM")
                .addField("ꜱᴏɴɢ ɴᴀᴍᴇ", song.title, true)
                .addField("ᴅᴜʀᴀᴛɪᴏɴ", song.duration, true)
                .addField("ʀᴇQᴜᴇꜱᴛᴇᴅ ʙʏ", song.req.tag, true)
                .setFooter(`ᴠɪᴇᴡꜱ: ${song.views} | ${song.ago}`);
            queue.textChannel.send(thing);
        };

        try {
            const connection = await channel.join();
            queueConstruct.connection = connection;
            play(queueConstruct.songs[0]);
        } catch (error) {
            console.error(`ɪ ᴄᴏᴜʟᴅ ɴᴏᴛ ᴊᴏɪɴ ᴛʜᴇ ᴠᴏɪᴄᴇ ᴄʜᴀɴɴᴇʟ: ${error}`);
            message.client.queue.delete(message.guild.id);
            await channel.leave();
            return sendError(`ɪ ᴄᴏᴜʟᴅ ɴᴏᴛ ᴊᴏɪɴ ᴛʜᴇ ᴠᴏɪᴄᴇ ᴄʜᴀɴɴᴇʟ: ${error}`, message.channel);
        }
    },
};