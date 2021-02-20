const mongoose = require('mongoose');

module.exports = {
    connect,
};

/**
 * Connect to MongoDB database.
 */
async function connect({ uri, name }) {
    try {
        await mongoose.connect(`${uri}/${name}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`Connected to database: ${name}.`);
    } catch (error) {
        console.log(error);
        global.process.exit(1);
    }
}
