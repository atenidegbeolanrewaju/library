const express = require('express');
const router = express.Router();
const Author = require('../models/author');
const { AuthorValidation } = require('../validation');

router.get('/', (req, res) => {
    Author.find()
        .then(docs => {
            res.status(201).send({
                counts : docs.length,
                Authors : docs
            })        
        })
        .catch (err => console.log(err))
    
});

router.post('/', (req, res) => {
    const { error } = AuthorValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message)

    const author = new Author ({
        name : req.body.name,
        gender : req.body.gender,
        email : req.body.email,
        bio : req.body.bio,
        country : req.body.country,
        publication_no : req.body.publication_no 
    })
    author.save()
            .then(result => {
                console.log(result);
                res.status(201).send({
                    meassage : 'Author created successfully',
                    Author_created : result
                })
            })
            .catch(err => console.log(err))
});

router.get('/:id', (req, res) => {
    const id = req.params.id
    Author.findById(id)
        .then(result => {
            if (result != null) {
                res.status(201).send({
                    Author_info : result 
                })
            } else {
                res.status(404).send({
                    message : 'Author not found'
                })
            }            
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({error : err})
        })
});

router.patch('/:id', (req, res) => {
    const id = req.params.id
    const updateInfo = {};
    for (const info of req.body) {
        updateInfo[info.propName] = info.value;
    }
    Author.update({_id : id}, {$set : updateInfo})
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
    Author.findById(id)
        .then(result => {
            result.remove()
                .then(res.status(200).send('Author info deleted successfully'))
                .catch(err => {
                    res.status(500).send({message: err})
                })
        })
});

module.exports = router