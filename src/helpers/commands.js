const config = require('../config.json');

const commands = require('../commands');

module.exports = {
    getCommand,
    verifyChannel,
    verifyRoles,
};

function getCommand(commandString) {
    const command = commands[commandString];

    if (!command) {
        throw 'ClientError: Command does not exist.';
    }

    return command;
}

function verifyChannel(command, channel) {
    if (channel !== command.requiredChannel) {
        throw 'ClientError: Invalid channel.';
    }
}

function verifyRoles(command, memberRoles) {
    if (command.requiredRoles) {
        const roles = memberRoles.map((role) => role.name);

        const hasRequiredRole = roles.some((role) => command.requiredRoles.includes(role));

        if (!hasRequiredRole) {
            throw 'ClientError: User does not have required role.';
        }
    }
}
