module.exports = {
    banque: {
        name: 'banque',
        requiredChannel: 'banque',
        exec: require('./bank'),
    },
    role: {
        name: 'role',
        requiredChannel: 'roles',
        requiredRoles: ['Staff'],
        exec: require('./role'),
    },
    transaction: {
        name: 'transaction',
        requiredChannel: 'transactions',
        requiredRoles: ['Staff', 'Advertiser'],
        exec: require('./transaction'),
    },
};
