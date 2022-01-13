const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },
    token: {
        type: String,
    },
    gift_cash: [{
        type: Number,
        default: null
    }],
    exp: {
        type: Number,
        default: 0
    },
    level: {
        type: Number,
        default: 0

    },
    wins: {
        type: Number,
        default: 0

    },
    lose: {
        type: Number,
        default: 0
    },
    status: {
        type: Boolean,
        default: false
    },
    coins: {
        type: Number,
        default: 1000
    },
    img: {
        type: Buffer,
    },
    room: {
        type: String,

    },
    points: {
        type: Number,
        default: 100
    },
    socketID: {
        type: String
    },
    friends: [],
    requests: [],
    userNameInGame: {
        type: String,
        required: true
    }
}, { id: false })

userSchema.methods.toJSON = function () {
    const userObject = this.toObject()
    delete userObject.password
    delete userObject.token
    return userObject
}
userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, process.env.SECRET_TOKEN)
    user["token"] = token
    await user.save()
    return token
}

userSchema.set('toJSON', { virtuals: true });
const user = mongoose.model("users", userSchema);
module.exports = user;