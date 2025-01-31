const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    Name: String,
    Email: String
}, { timestamps: true })
const userData = mongoose.model('user',userSchema);
module.exports = userData;