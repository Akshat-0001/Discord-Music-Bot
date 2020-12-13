const { MessageEmbed } = require("discord.js");

module.exports = {
  info: {
    name: "8ball",
    description: "Ask me a question !!",
    usage: "[]",
    aliases: ["ask"]
  },

  run: async function(client, message, args) {
    if (!args[0]) {
      message.react("👎");
      message.channel.send("**Please ask me a question.**");
    } else {
      let eightball = [
        "Certainly.",
        "It is decidedly so.",
        "Without a doubt.",
        "Yes definitely.",
        "Probably.",
        "As I see it, yes.",
        "Most likely.",
        "Outlook good.",
        "Yes.",
        "Signs point to yes.",
        "Yes'nt",
        "No'nt",
        "Maybe.",
        "My conscience says no.",
        "Yep.",
        "hmm",
        "nikal",
        "Mein nhi batayunga !",
        "Tumse yeh puchne ke liye Pucha Kisi ne ??",
        "Tumse yeh puchne ke liye Pucha Kisi ne ??",
        "Tumse yeh puchne ke liye Pucha Kisi ne ??",
        "Google se puch looo : https://www.google.com/",
        "Youtube se puch looo : https://www.youtube.com/",
        "Nahi",
        "Nooooooooo",
        "God Knows",
        "Im not here to answer you !",
        "Nah.",
        "My reply is no.",
        "My sources say no.",
        "Outlook not so good.",
        "Very doubtful.",
        "No way.",
        "Maybe",
        "The answer is hiding inside you",
        "No.",
        "Nope.",
        "If it rains today, then yes.",
        "It's over",
        "It's just the beginning",
        "Probably not."
      ];
      let index = Math.floor(Math.random() * Math.floor(eightball.length));
      message.channel.send(eightball[index]);
    }
  }
};
