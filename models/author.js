const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
    name: {
        type : String,
        required : true
    },
    gender: {
        type : String,
        required : true
    },
    email: {
        type : String,
        required : true
    },
    bio: {
        type: String,
        max: 150,
        required : true
    },
    country: {
        type : String,
        required : true
    },
    publication_no: {
        type : Number
    },
});

module.exports = mongoose.model('Author', authorSchema);