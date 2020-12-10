const client = require('nekos.life');
const Discord = require('discord.js')
const neko = new client();

module.exports = {
  info: {
    name: "pat",
    description: "pats a user",
    usage: "[]",
    aliases: [""],
  },

  run: async function (client, message, args) {
    
    const user = message.mentions.users.first();
        if(!user)
        return message.reply('Mention someone to pat');

        async function work() {
        let owo = (await neko.sfw.pat());

        const patembed = new Discord.MessageEmbed()
        .setTitle(user.username + " !!! ")
        .setDescription((user.toString() + " got patted by " + message.author.toString()))
        .setImage(owo.url)
        .setColor(`#000000`)
        .setURL(owo.url);
        message.channel.send(patembed);

}

      work();
}
                };