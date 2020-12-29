require("dotenv").config(); //Loading .env
const fs = require("fs");
const { Collection, Client } = require("discord.js");
const fetch = require("node-fetch");
const DBL = require("dblapi.js");



const client = new Client(); //Making a discord bot client
client.commands = new Collection(); //Making client.commands as a Discord.js Collection
client.queue = new Map();
const dbl = new DBL('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijc3Mzg3MTQ2OTkxMzU3MTM2MCIsImJvdCI6dHJ1ZSwiaWF0IjoxNjA3NDQ1OTIwfQ.1toLADm2Fys3pc10mcGhpv8AL91nK8yAvhuo3l0aTB0', client);
dbl.on('error', e => {
 console.log(`Oops! ${e}`);
})

client.config = {
  prefix: process.env.PREFIX
};

//Loading Events
fs.readdir(__dirname + "/events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    const event = require(__dirname + `/events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, client));
    console.log("Loading Event: " + eventName);
  });
});

//Loading Commands
fs.readdir("./commands/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/${file}`);
    let commandName = file.split(".")[0];
    client.commands.set(commandName, props);
    console.log("Loading Command: " + commandName);
  });
});

//Logging in to discord
client.login(process.env.TOKEN);
