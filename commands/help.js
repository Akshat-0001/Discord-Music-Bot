const pagination = require('discord.js-pagination');
const Discord = require('discord.js');

module.exports = {
    info: {
        name: "help",
        description: "To show all commands",
        usage: "[command]",
        aliases: ["commands", "help me", "pls help"]
    },

    async run (client, message, args){

        //Sort your commands into categories, and make seperate embeds for each category

        const moderation = new Discord.MessageEmbed()
        .setTitle('Help Command Panel')
        .setTimestamp()
        .addField("Music Commands", [
            `**❯  ;play <YouTube_URL> | <song_name> :** To play songs :D`,
            `**❯  ;nowplaying :** To show the music which is currently playing in this server`,
            `**❯  ;queue :** To show the server music queue`,
            `**❯  ;playlist <YouTube Playlist URL | <song_name> :** To play songs from playlist :D`,
            `**❯  ;pause :** To pause the current music in the server`,
            `**❯  ;resume :** To resume the paused music`,
            `**❯  ;stop :** To stop the music and clearing the queue`,
            `**❯  ;skipto <number>:** Skip to the selected queue number`,
            `**❯  ;skip :** To skip the current playing music`,
            `**❯  ;remove <number> :** Remove song from the queue`,
            `**❯  ;loop :** Toggle music loop`,
            `**❯  ;shuffle :** Shuffles the server queue`,
            `**❯  ;volume :** Toggle music loop`,
            `**❯  ;volume :** To change the server song queue volume`,
            `**❯  ;lyrics :** Get lyrics for the currently playing song`,
            `**❯  ;afk :** To enable 24x7 mode of the bot`
        
    ])

        const fun = new Discord.MessageEmbed()
        .setTitle('Help Command Panel')
        .setTimestamp()
        .addField("Fun", [
            `**❯  ;meme :** Generates a random meme`,
            `**❯  ;ascii <text> :** Converts text into ascii`
        
    ])
        const utility = new Discord.MessageEmbed()
        .setTitle('Help Command Panel')
        .setTimestamp()
        .addField("Fun", [
            `**❯  ;info :** All about Mocha Music`,
            `**❯  ;invite :** To add/invite the bot to your server`,
            `**❯  ;status :** Current Status of the Bot`,
            `**❯  ;ping :** Get the bot\'s API ping`,
            `**❯  ;afk :** To enable/disable 24x7`
        
    ])

        const pages = [
                moderation,
                fun,
                utility
        ]

      const emojiList = ["⏪", "⏩"];

        const timeout = '120000';

        pagination(message, pages, emojiList, timeout)
    }
}