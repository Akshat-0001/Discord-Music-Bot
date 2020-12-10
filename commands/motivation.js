const { MessageEmbed } = require("discord.js");
const jsonQuotes = require('/app/util/motivational.json')

module.exports = {
  info: {
    name: "motivation",
    description: "Motivate urself !",
    usage: "[]",
    aliases: [""],
  },
  run: async function (client, message, args) {
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.member;

        const randomQuote = jsonQuotes.quotes[Math.floor((Math.random() * jsonQuotes.quotes.length))];
        if (!args[0]) {
            const quoteEmbed = new MessageEmbed()
                .setTitle(randomQuote.author)
                .setDescription(randomQuote.text)
                .setColor('GREEN')
                .setFooter(member.displayName, member.user.displayAvatarURL())
                .setTimestamp()
            return message.channel.send(quoteEmbed).then(messageReaction => {messageReaction.react('👍')})
        }
         else if (args[0]) {
            const embed = new MessageEmbed()
                .setColor("RANDOM")
                .setTitle(`${randomQuote.author} -`)
                .setDescription(`**${randomQuote.text}** \n\nBy ${message.member.displayName} to ${member.displayName}`)
                .setFooter(member.displayName, member.user.displayAvatarURL())
                .setTimestamp()
            message.channel.send(embed).then(messageReaction => {messageReaction.react('👍')})
        }
    }
};