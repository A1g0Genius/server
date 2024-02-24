const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    verificationToken: {
        type: String
    },
}, {
    timeseries: true
});

const User = mongoose.model('User', userSchema);

const validate = (user) => {
    const schema = Joi.object({
        userName: Joi.string().required(),
        email: Joi.string().email().required(),
    });
    return schema.validate(user);
};

module.exports = {
    User,
    validate,
};
