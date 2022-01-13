const User = require("../models/user.model");
const vaildateUser = require("../middleware/validation");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const register = async (req, res) => {

    const { username, password, userNameInGame } = req.body;
    try {
        if (!vaildateUser(req.body))
            throw 'User Or Password Is Invalid';
        //User Already Exist

        const userExist = await User.findOne({ username })
        if (userExist)
            return res.status(400).send('User Already Exist')

        const hashedPassword = await bcrypt.hash(password, 8)
        const user = new User({
            username: username,
            password: hashedPassword,
            userNameInGame: userNameInGame
        })

        res.status(200).json(await user.save())

    }
    catch (err) {
        return res.status(400).send(err)

    }

}

const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        if (!vaildateUser(req.body))
            throw 'User Or Password Is Invalid';
        const userExist = await User.findOne({ username: username })
        if (!userExist)
            throw 'User Doesn\'t Exist';

        const isMatched = await bcrypt.compare(password, userExist.password)
        if (!isMatched)
            throw 'Password Doesn\'t Match'

        console.log(userExist);

        res.status(200).json({
            user: userExist
        })

    } catch (err) { res.status(400).send(err) }

}
const logout = async (req, res) => {
    try {
        const user = req.user
        user.token = null
        user.status = false;

        await user.save()
        res.status(200).json(user)
    } catch (e) {
        res.status(400).send(e)
    }

}
const updateStatus = async (req, res) => {
    const { id } = req.params
    const { status } = req.body
    try {
        const user = await User.findByIdAndUpdate(id, { status: status }, { new: true })
        res.status(200).json({ user, token: req.token })

    } catch (err) {
        res.status(400).send(err)
    }
}


const getUsers = async (req, res) => {

    try {
        const users = await User.find({})
        res.status(200).json(users)

    } catch (err) { res.status(400).send("Error Getting Users") }


}
const getUser = async (req, res) => {
    const { id } = req.params
    try {
        const user = await User.findOne({ _id: id })
        res.status(200).json(user)
    } catch (err) {
        res.status(400).send("Error Getting User")
    }

}
const updateWinnerStats = async (req, res) => {
    try {
        const player = req.body.player
        const users = await User.find({ username: player })
        const user = users[0]
        user.exp = (user.exp + 20) % 100
        user.points += 200
        user.wins += 1;
        user.level = parseInt(user.exp / 100)
        const updatedUser = await user.save()
        res.status(200).json(updatedUser)
    }
    catch (err) {
        res.status(400).send('Something Went Wrong')
    }
}
const updateLoseStats = async (req, res) => {
    try {
        const { id } = req.params
        const { lose } = req.body
        const user = await User.findOneAndUpdate(id, { lose: lose }, { new: true })
        res.status(200).json(user)
    }
    catch (err) {
        res.status(400).send('Something Went Wrong')
    }

}
const updateUsername = async (req, res) => {

    try {
        const { id } = req.params;
        const userNameInGame = req.body.userNameInGame
        const user = await User.findByIdAndUpdate({ _id: id }, { userNameInGame: userNameInGame }, { new: true })
        res.status(200).json(user)
    }
    catch (err) {
        res.status(400).send('Something Went Wrong')
    }
}
const updateUserRequests = async (req, res) => {
    try {
        const { id } = req.params;
        const { requests } = req.body
        const user = await User.findByIdAndUpdate({ _id: id }, { requests: requests }, { new: true })
        res.status(200).json(user)
    } catch (err) {
        res.status(400).send('Error')
    }
}
const updateUserFriends = async (req, res) => {
    try {
        const { id } = req.params;
        const { friends } = req.body
        const user = await User.findByIdAndUpdate({ _id: id }, { friends: friends }, { new: true })
        res.status(200).json(user)
    } catch (err) {
        res.status(400).send('Error')
    }
}
const updateUserImage = async (req, res) => {
    try {

        const { id } = req.params
        const user = await User.findById(id)
        user.img = req.file.buffer
        const updatedUser = await user.save()
        res.status(200).json(updatedUser)
    } catch (err) {
        res.status(400).json(err)

    }
}
module.exports = {
    register,
    login,
    logout,
    updateStatus,
    getUsers,
    getUser, updateWinnerStats, updateLoseStats, updateUsername, updateUserRequests,
    updateUserFriends, updateUserImage

}