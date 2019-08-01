const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        // unique: true,
        // sparse: true,
        trim: true,
    },
    wallet: {
        type: String,
        required: true,
        // unique: true,
        // sparse: true,
        trim: true,
    },
    checkbox: {
        type: Boolean,
        required: true,
    },
    transaction: {
        type: Boolean,
        default: false
    },
    balance: {
        type: Number,
        required: true
    }
}, { collection : 'monarchCollection' });

module.exports = User = mongoose.model('user', UserSchema);