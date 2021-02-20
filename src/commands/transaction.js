const { RichEmbed } = require('discord.js');

const config = require('../config.json');

const discordHelper = require('../helpers/discord');
const markdownHelper = require('../helpers/markdown');
const numbersHelper = require('../helpers/numbers');

const User = require('../models/User');

module.exports = async function (message, args) {
    // Compute price stored in first argument
    const price = Number.parseInt(args.shift().replace('k', '')) * 1000;

    // Find advertiser
    const advertiser = await User.findOne({ user_id: message.author.id }).exec();

    // Apply cuts to advertiser balance
    advertiser.balance += price * config.cuts.advertiser;
    await advertiser.save();

    // Find boosters
    const boostersId = args.map((mention) => discordHelper.extractIdFromMention(mention));
    const boosters = await User.find({
        user_id: { $in: boostersId },
    }).exec();

    // Apply cuts to boosters balance
    for (const booster of boosters) {
        booster.balance += price * config.cuts.booster;
        await booster.save();
    }

    // TODO: Find staff members and apply cuts

    // Send embed message with transaction summary
    const embed = new RichEmbed()
        .setColor(config.colors.orange)
        .setTitle(markdownHelper.bold('Nouvelle transaction créé :'))
        .addField(
            markdownHelper.bold('Prix:'),
            `${numbersHelper.format(price)} ${config.currency.emote}`
        )
        .addField(markdownHelper.bold('Advertiser:'), message.author.toString())
        .addField(markdownHelper.bold('Boosters:'), args.join(' '));

    message.channel.send(embed);
};
