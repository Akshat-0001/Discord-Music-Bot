const { MessageEmbed } = require('discord.js');
const roasts = require('/app/util/roast.json');

module.exports = {
  info: {
    name: "say",
    description: "Types the text you wrote !",
    usage: "[]",
    aliases: [""],
  },

  run: async function (client, message, args) {
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase() === args.join(' ').toLocaleLowerCase());

        let roast = roasts.roast[Math.floor((Math.random() * roasts.roast.length))];

        if(!args[0]) {
            const sembed = new MessageEmbed()
                .setColor("RANDOM")
                .setDescription("**Do You Really Want To Roast Yourself?**")
                .setFooter('Apne aap ko roast karega ? xD')
            message.channel.send(sembed);
        }
        else if (args[0]) {
            const embed = new MessageEmbed()
                .setTitle(`${member.displayName}-`)
                .setColor("RANDOM")
                .setDescription(`${roast}`)
                .setFooter('Roast Hokar kaisa laga ?')
            message.channel.send(embed).then(messageReaction => {messageReaction.react('👍'), messageReaction.react('👎')})
        }
    }
}