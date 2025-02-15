const mongoose = require('mongoose');

const dbURI = 'mongodb://127.0.0.1:27017/web3'; 

mongoose
    .connect(dbURI, {
        serverSelectionTimeoutMS: 5000, 
    })
    .then(() => console.log('Database connected successfully'))
    .catch((err) => {
        console.error('Database connection failed', err);
        process.exit(1); 
    });

const loginSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true, 
        trim: true,   
    },
    password: {
        type: String,
        required: true,
    },
});

const collection = mongoose.model('users', loginSchema);

module.exports = collection;
