const express = require('express');
const router = express.Router();
const Author = require('../models/author');
const Book = require('../models/book');
const { BookValidation } = require('../validation');

router.get('/', (req, res) => {
    Book.find()
        .then(docs => {
            res.status(201).send({
                counts : docs.length,
                Books : docs
            })        
        })
        .catch (err => console.log(err))
});

router.post('/', (req, res) => {
    const { error } = BookValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message)

    const id = req.body.authorId
    Author.findById(id)
        .then(result => {
            if (!result) return res.status(404).send('Author not registered with the database');
            
            const book = new Book ({
                title : req.body.title,
                ISBN : req.body.ISBN,
                genre : req.body.genre,
                authorId : req.body.authorId,
                description : req.body.description,
                publisher : req.body.publisher,
                pages : req.body.pages
            })
            book.save()
                .then(result => {
                    res.status(201).send({
                        message: 'Book saved successfully',   
                    })
                })
                .catch(err => {
                    res.status(500).json({message : err})
                })
        }) 
        .catch(err => {
            console.log(err);
            res.status(500).json({message : err});
        })
        
})

router.get('/:id', (req, res) => {
    const id = req.params.id
    Book.findById(id)
        .then(result => {
            if (result) {
                res.status(201).json({
                    message : 'Book fetched successfully',
                    Book : result
                })
            } else {
                res.status(404).json({
                    message : 'Book not found'
                })
            }
        })
        .catch (err => {
            console.log(err)
        })
});

router.patch('/:id', (req, res) => {
    const id = req.params.id
    for (const info of req.body) {
        updateInfo[info.propName] = info.value;
    }
    Book.update({_id : id}, {$set : updateInfo})
        .exec()
        .then(result => {
            console.log(result)
            res.status(201).json('Succesfully updated')
        })
        .catch(err => {
            console.log(err)
            res.status(500).send('Error occured while trying to update')
        })
});

router.delete('/:id', (req, res) => {
    const id = req.params.id
    Book.findById(id)
        .then(result => {
            result.remove()
                .then(res.status(200).send('Book info deleted successfully'))
                .catch(err => {
                    res.status(500).send({message: err})
                })
        })
});

module.exports = router