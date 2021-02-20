const Discord = require('discord.js');
const dotenv = require('dotenv');
dotenv.config();

const config = require('./config.json');
const commandsHelper = require('./helpers/commands');
const databaseHelper = require('./helpers/database');

databaseHelper.connect({ uri: global.process.env.DB_URI, name: global.process.env.DB_NAME });
const client = new Discord.Client();

client.login(global.process.env.TOKEN);

client.once('ready', function () {
    console.log(`Logged in as ${client.user.tag}`);
});

client.on('message', async function (message) {
    if (message.content.startsWith(config.prefix)) {
        const args = message.content.slice(config.prefix.length).trim().split(/ +/);

        try {
            const command = commandsHelper.getCommand(args.shift().toLowerCase());
            commandsHelper.verifyChannel(command, message.channel.name);
            commandsHelper.verifyRoles(command, message.member.roles);
            await command.exec(message, args);
        } catch (error) {
            console.log(error);
            message.delete();
        }
    }
});
