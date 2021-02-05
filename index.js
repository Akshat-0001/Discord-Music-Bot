require("dotenv").config(); //Loading .env
const fs = require("fs");
const { Collection, Client } = require("discord.js");
const fetch = require("node-fetch");
const AutoPoster = require('topgg-autoposter');
const keepAlive = require("./server");

const client = new Client(); //Making a discord bot client
client.commands = new Collection(); //Making client.commands as a Discord.js Collection
client.queue = new Map();

const ap = AutoPoster('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijc3Mzg3MTQ2OTkxMzU3MTM2MCIsImJvdCI6dHJ1ZSwiaWF0IjoxNjEwNTcwMTYxfQ.bNPWN40oOjd80wlYjY3QRKx4GGTlEc6hcYM2VVOBayE', client)

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

keepAlive();
//Logging in to discord
client.login(process.env.TOKEN);
