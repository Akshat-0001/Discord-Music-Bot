const { MessageEmbed } = require("discord.js");

module.exports = {
  info: {
    name: "invite",
    description: "To add/invite the bot to your server",
    usage: "[invite]",
    aliases: ["inv"]
  },

  run: async function(client, message, args) {
    let invite = new MessageEmbed()
      .setTitle(`Invite ${client.user.username}`)
      .setThumbnail(
        "https://media1.tenor.com/images/6dd789b67e972e0c21b69e7aba8bd4eb/tenor.gif"
      )
      .setFooter("Invite karo and maze loo | Made with love by Akshat")
      .setImage(
        "https://cdn.discordapp.com/attachments/796774782342660146/804032694509895710/standard_2.gif"
      )
      .setDescription(
        `Invite me to have fun with me xD ! \n\n [Invite nhi kiya toh gay :)](https://top.gg/bot/773871469913571360)`
      )
      .setURL(`https://top.gg/bot/773871469913571360`)
      .setColor("RANDOM");
    return message.channel.send(invite);
  }
};
