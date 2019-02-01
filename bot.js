
const fs = require('fs');
const Discord = require('discord.js');
const { token, prefix, currency } = require('./config.json');

const client = new Discord.Client();

let players;

function selectActiveUser(authorId) {
    for (const user of players) {
        if (authorId === user.user_id) {
            return user;
        }
    }
}

function loadPlayersData() {
    fs.readFile('./players.txt', (err, data) => {

        if (err) throw err;
    
        players = JSON.parse(data);
    });

    console.log('Info: players data loaded');
}

function savePlayersData() {

    fs.writeFile("./players.txt", JSON.stringify(players), (err) => {
                
        if (err) throw err;
    });

    console.log('Info: players data saved');
}

client.once('ready', () => {

    console.log(`Logged in as ${client.user.tag}`);

    loadPlayersData();
});

client.on('message', (message) => {

    if (message.content.startsWith(prefix)) {

        const args = message.content.slice(prefix.length).split(' ');

        const command = args.shift().toLowerCase();

        const activeUser = selectActiveUser(message.author.id);

        if (command === 'join') {

            const startingBalance = 500;

            if (activeUser) {
                return message.reply(' you already joined the casino ! :wink:');
            }

            players.push({
                "username": message.author.username,
                "user_id": message.author.id,
                "balance": startingBalance
            });

            savePlayersData();

            message.reply(` welcome ! :tada:\n\nBalance: **${startingBalance}**${currency.emote}`);

        } else if (command === 'bet') {

            if (!activeUser) {
                return message.reply(' type **!join** to join the casino :clipboard:');
            }

            const amount = parseInt(args[0]);

            if (isNaN(amount)) {
                message.reply(` you must bet a valid number !`);
            } else {
                if (amount > 0 && amount <= activeUser.balance) {

                    const roll = Math.floor(Math.random() * 99) + 1;

                    if (roll > 50) {
                        activeUser.balance += amount;
                        message.reply(` you rolled **${roll}** and won **${amount}**${currency.emote} ! :smile:\n\nBalance: **${activeUser.balance}**${currency.emote}`);
                    } else {
                        activeUser.balance -= amount;
                        message.reply(` you rolled **${roll}** and lost **${amount}**${currency.emote} ! :cry:\n\nBalance: **${activeUser.balance}**${currency.emote}`);
                    }

                    savePlayersData();

                } else if (amount > activeUser.balance) {
                    message.reply(` you only have **${activeUser.balance}**${currency.emote} on your account !`);
                } else {
                    message.reply(` you must bet a positive number !`);
                }
            }
        } else if (command === 'balance') {

            if (!activeUser) {
                return message.reply(' type **!join** to join the casino :clipboard:');
            }

            message.reply(` you currently have **${activeUser.balance}**${currency.emote} on your account !`);

        } else if (command === 'refund') {

            let refundAmount = 100;

            if (!activeUser) {
                return message.reply(' type **!join** to join the casino :clipboard:');
            }

            if (activeUser.balance !== 0) {
                return message.reply(` you still have **${activeUser.balance}**${currency.emote} on your account ! :wink:`);
            }
            
            activeUser.balance += refundAmount;

            savePlayersData();

            message.reply(` the casino has gifted you **${refundAmount}**${currency.emote} ! :gift:`);

        } else if (command === 'top') {

            message.reply(`\n:trophy: **Top 3** :trophy:\n\n:first_place: First: -\n:second_place: Second: -\n:third_place: Third: -`);
        
        } else if (command === 'help') {

            message.reply(`\n:gear: **Commands** :gear:\n\n`
                        + `:clipboard: **!join** : allows you to join the casino\n\n`
                        + `:game_die: **!bet [number_of_gems]** : bet the specified amount of ${currency.name}\n\n`
                        + `:moneybag: **!balance** : display your account balance\n\n`
                        + `:gift: **!refund** : gives you **100**${currency.emote} if you have no ${currency.name} left\n\n`
                        + `:trophy: **!top** : display the top 3 players of the server\n\n`);

        } else {

            message.reply(' unknown command !\n\nType **!help** to show the list of available commands :scroll:');
        }
    }
});

client.login(token);