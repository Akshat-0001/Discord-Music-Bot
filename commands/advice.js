const { MessageEmbed } = require("discord.js");
const request = require("superagent");

module.exports = {
  info: {
    name: "advice",
    description: "Take some free advice from me !!",
    usage: "[]",
    aliases: ["lifeadvice", "advise", "lifeadvise", "adv"]
  },

  run: async function(client, message, args) {
    request.get("http://api.adviceslip.com/advice").end((err, res) => {
      if (!err && res.status === 200) {
        try {
          JSON.parse(res.text);
        } catch (e) {
          return message.reply(", an api error occurred.");
        }
        const advice = JSON.parse(res.text);
        message.channel.send(advice.slip.advice);
      } else {
        console.error(`REST call failed: ${err}, status code: ${res.status}`);
      }
    });
  }
};
