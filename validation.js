const Joi = require('@hapi/joi');

const AuthorValidation = data => {
    const schema = Joi.object({
    name: Joi.string()
        .required(),
    gender : Joi.string()
        .required(),
    email: Joi.string()
        .required()
        .email(),
    bio: Joi.string()
        .min(20)
        .max(150)
        .required(),
    country: Joi.string()
        .required(),
    publication_no: Joi.number()
    });
    return schema.validate(data);
};

const BookValidation = data => {
    const schema = Joi.object({
    title: Joi.string()
        .required(),
    ISBN: Joi.string()
        .min(13)
        .max(13)
        .required(),
    genre : Joi.string()
        .required(),
    authorId : Joi.required(),
    description : Joi.string()
        .required()
        .max(150),
    publisher : Joi.string()
        .required(),
    pages : Joi.number()
        .required(),
    });
    return schema.validate(data);
};

module.exports.AuthorValidation = AuthorValidation;
module.exports.BookValidation = BookValidation;