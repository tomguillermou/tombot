const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    pseudo: { type: String, required: true, unique: true },
    user_id: { type: String, required: true, unique: true },
    roles: [String],
    server: { type: String, default: 'Hyjal' },
    balance: { type: Number, default: 0 },
});

module.exports = model('User', UserSchema);
