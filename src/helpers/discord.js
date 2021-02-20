module.exports = { extractIdFromMention };

/**
 * Extract IDs from mentions.
 * A mention is formatted like this: <@user_id> or <@!user_id>
 * @param {*} mention
 */
function extractIdFromMention(mention) {
    return mention.includes('<@!')
        ? mention.replace('<@!', '').replace('>', '')
        : mention.includes('<@')
        ? mention.replace('<@', '').replace('>', '')
        : '';
}
