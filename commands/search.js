const { Util, MessageEmbed } = require("discord.js");
const ytdl = require("ytdl-core");
const yts = require("yt-search");
const ytdlDiscord = require("ytdl-core-discord");
const YouTube = require("youtube-sr");
const sendError = require("../util/error");
const fs = require("fs");

module.exports = {
    info: {
        name: "search",
        description: "To search songs :D",
        usage: "<song_name>",
        aliases: ["sc"],
    },

    run: async function (client, message, args) {
        let channel = message.member.voice.channel;
        if (!channel) return sendError("ɪ'ᴍ ꜱᴏʀʀʏ ʙᴜᴛ ʏᴏᴜ ɴᴇᴇᴅ ᴛᴏ ʙᴇ ɪɴ ᴀ ᴠᴏɪᴄᴇ ᴄʜᴀɴɴᴇʟ ᴛᴏ ᴘʟᴀʏ ᴍᴜꜱɪᴄ!", message.channel);

        const permissions = channel.permissionsFor(message.client.user);
        if (!permissions.has("CONNECT")) return sendError("ɪ ᴄᴀɴɴᴏᴛ ᴄᴏɴɴᴇᴄᴛ ᴛᴏ ʏᴏᴜʀ ᴠᴏɪᴄᴇ ᴄʜᴀɴɴᴇʟ, ᴍᴀᴋᴇ ꜱᴜʀᴇ ɪ ʜᴀᴠᴇ ᴛʜᴇ ᴘʀᴏᴘᴇʀ ᴘᴇʀᴍɪꜱꜱɪᴏɴꜱ!", message.channel);
        if (!permissions.has("SPEAK")) return sendError("ɪ ᴄᴀɴɴᴏᴛ ꜱᴘᴇᴀᴋ ɪɴ ᴛʜɪꜱ ᴠᴏɪᴄᴇ ᴄʜᴀɴɴᴇʟ, ᴍᴀᴋᴇ ꜱᴜʀᴇ ɪ ʜᴀᴠᴇ ᴛʜᴇ ᴘʀᴏᴘᴇʀ ᴘᴇʀᴍɪꜱꜱɪᴏɴꜱ!", message.channel);

        var searchString = args.join(" ");
        if (!searchString) return sendError("ʏᴏᴜ ᴅɪᴅɴ'ᴛ ᴘʀᴏᴠɪᴅᴇ ᴡʜᴀᴛ ɪ ᴡᴀɴᴛ ᴛᴏ ꜱᴇᴀʀᴄʜ", message.channel);

        var serverQueue = message.client.queue.get(message.guild.id);
        try {
            var searched = await YouTube.search(searchString, { limit: 10 });
            if (searched[0] == undefined) return sendError("ɪ ᴡᴀꜱ ᴜɴᴀʙʟᴇ ᴛᴏ ꜰɪɴᴅ ᴛʜᴇ ꜱᴏɴɢ ᴏɴ ʏᴏᴜᴛᴜʙᴇ", message.channel);
            let index = 0;
            let embedPlay = new MessageEmbed()
                .setColor("BLUE")
                .setAuthor(`ʀᴇꜱᴜʟᴛꜱ ꜰᴏʀ \"${args.join(" ")}\"`, message.author.displayAvatarURL())
                .setDescription(`${searched.map((video2) => `**\`${++index}\`  |** [\`${video2.title}\`](${video2.url}) - \`${video2.durationFormatted}\``).join("\n")}`)
                .setFooter("ᴛʏᴘᴇ ᴛʜᴇ ɴᴜᴍʙᴇʀ ᴏꜰ ᴛʜᴇ ꜱᴏɴɢ ᴛᴏ ᴀᴅᴅ ɪᴛ ᴛᴏ ᴛʜᴇ ᴘʟᴀʏʟɪꜱᴛ");
            // eslint-disable-next-line max-depth
            message.channel.send(embedPlay).then((m) =>
                m.delete({
                    timeout: 15000,
                })
            );
            try {
                var response = await message.channel.awaitMessages((message2) => message2.content > 0 && message2.content < 11, {
                    max: 1,
                    time: 20000,
                    errors: ["time"],
                });
            } catch (err) {
                console.error(err);
                return message.channel.send({
                    embed: {
                        color: "RED",
                        description: "ɴᴏᴛʜɪɴɢ ʜᴀꜱ ʙᴇᴇɴ ꜱᴇʟᴇᴄᴛᴇᴅ ᴡɪᴛʜɪɴ 20 ꜱᴇᴄᴏɴᴅꜱ, ᴛʜᴇ ʀᴇQᴜᴇꜱᴛ ʜᴀꜱ ʙᴇᴇɴ ᴄᴀɴᴄᴇʟᴇᴅ.",
                    },
                });
            }
            const videoIndex = parseInt(response.first().content);
            var video = await searched[videoIndex - 1];
        } catch (err) {
            console.error(err);
            return message.channel.send({
                embed: {
                    color: "RED",
                    description: "🆘  **|**  ɪ ᴄᴏᴜʟᴅ ɴᴏᴛ ᴏʙᴛᴀɪɴ ᴀɴʏ ꜱᴇᴀʀᴄʜ ʀᴇꜱᴜʟᴛꜱ",
                },
            });
        }

        response.delete();
        var songInfo = video;

        const song = {
            id: songInfo.id,
            title: Util.escapeMarkdown(songInfo.title),
            views: String(songInfo.views).padStart(10, " "),
            ago: songInfo.uploadedAt,
            duration: songInfo.durationFormatted,
            url: `https://www.youtube.com/watch?v=${songInfo.id}`,
            img: songInfo.thumbnail.url,
            req: message.author,
        };

        if (serverQueue) {
            serverQueue.songs.push(song);
            let thing = new MessageEmbed()
                .setAuthor("ꜱᴏɴɢ ʜᴀꜱ ʙᴇᴇɴ ᴀᴅᴅᴇᴅ ᴛᴏ Qᴜᴇᴜᴇ", "https://cdn.discordapp.com/emojis/767294574212415518.gif")
                .setThumbnail(song.img)
                .setColor("RANDOM")
                .addField("Name", song.title, true)
                .addField("Duration", song.duration, true)
                .addField("Requested by", song.req.tag, true)
                .setFooter(`Views: ${song.views} | ${song.ago}`);
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
            channel.guild.voice.setSelfDeaf(true);
            play(queueConstruct.songs[0]);
        } catch (error) {
            console.error(`ɪ ᴄᴏᴜʟᴅ ɴᴏᴛ ᴊᴏɪɴ ᴛʜᴇ ᴠᴏɪᴄᴇ ᴄʜᴀɴɴᴇʟ: ${error}`);
            message.client.queue.delete(message.guild.id);
            await channel.leave();
            return sendError(`ɪ ᴄᴏᴜʟᴅ ɴᴏᴛ ᴊᴏɪɴ ᴛʜᴇ ᴠᴏɪᴄᴇ ᴄʜᴀɴɴᴇʟ: ${error}`, message.channel);
        }
    },
};