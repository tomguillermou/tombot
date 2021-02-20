const config = require('../config.json');

const discordHelper = require('../helpers/discord');

const User = require('../models/User');

module.exports = async function (message, args) {
    // Parse message content
    const [role, userId, pseudo] = args;

    if (['Booster', 'Advertiser'].includes(role)) {
        const newUser = new User({
            pseudo,
            user_id: userId,
            roles: [role],
        });

        await newUser.save();
        message.react(config.emotes.validate);
    } else {
        throw 'ClientError: This role cannot be added.';
    }
};
