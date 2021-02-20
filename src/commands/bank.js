const { RichEmbed } = require('discord.js');

const config = require('../config.json');

const numbersHelper = require('../helpers/numbers');
const markdownHelper = require('../helpers/markdown');

const User = require('../models/User');

module.exports = async function (message, args) {
    const user = await User.findOne().where('user_id').equals(message.author.id).lean().exec();

    const embed = new RichEmbed()
        .setColor(config.colors.orange)
        .setTitle(markdownHelper.bold(`Banque de ${user.pseudo}-${user.server}`))
        .addField(
            markdownHelper.bold('Argent:'),
            `${numbersHelper.format(user.balance)} ${config.currency.emote}`
        );

    message.channel.send(embed);
};
