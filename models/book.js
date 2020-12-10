const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type : String,
        required : true
    },
    ISBN: {
        type: String,
        required: true,
        min : 13,
        max : 13
    },
    genre: {
        type : String,
        required : true
    },
    authorId: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Author',
        required: true
    },
    description: {
        type: String,
        max: 150,
        required : true
    },
    publisher: {
        type : String,
        required : true
    },
    pages: {
        type : Number,
        required : true
    },
});

module.exports = mongoose.model('Book', bookSchema);