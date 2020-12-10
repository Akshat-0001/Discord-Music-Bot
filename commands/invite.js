const { MessageEmbed } = require("discord.js");

module.exports = {
  info: {
    name: "invite",
    description: "To add/invite the bot to your server",
    usage: "[invite]",
    aliases: ["inv"],
  },

  run: async function (client, message, args) {
    let invite = new MessageEmbed()
    .setTitle(`Invite ${client.user.username}`)
    .setThumbnail("https://media1.tenor.com/images/6dd789b67e972e0c21b69e7aba8bd4eb/tenor.gif")
    .setFooter("Invite karo and maze loo | Made with love by Akshat | Pucha Kisi Ne ?")
    .setDescription(`Want me in your server? Invite me today! \n\n [Invite Link](https://top.gg/bot/773871469913571360)`)
    .setURL(`https://top.gg/bot/773871469913571360`)
    .setColor("RANDOM")
    return message.channel.send(invite);
  },
};
