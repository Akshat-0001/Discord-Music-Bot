const client = require('nekos.life');
const Discord = require('discord.js')
const neko = new client();

module.exports = {
  info: {
    name: "feed",
    description: "feed a user",
    usage: "[]",
    aliases: [""],
  },

  run: async function (client, message, args) {

         const user = message.mentions.users.first();
        if(!user)
        return message.reply('Mention someone to cuddle');

        async function work() {
        let owo = (await neko.sfw.feed());

        const feedembed = new Discord.MessageEmbed()
        .setTitle(user.username + " You have been fed! ")
        .setDescription((user.toString() + " got fed by " + message.author.toString()))
        .setImage(owo.url)
        .setColor(`#000000`)
        .setURL(owo.url);
        message.channel.send(feedembed);

}

      work();
}
                };
