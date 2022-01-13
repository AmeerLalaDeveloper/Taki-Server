const jwt = require('jsonwebtoken');
const user = require('../models/user.model');

const auth = async (req, res, next) => {
    try {
        const userToken = req.header("Authorization").replace("Bearer ", "");
        const verify = jwt.verify(userToken, process.env.SECRET_TOKEN)
        const loggedUser = await user.findOne({ _id: verify._id, token: userToken })
        if (!loggedUser)
            throw ''
        req.user = loggedUser
        req.token = userToken
        next();
    }
    catch (err) {
        res.status(404).send('Please Authenticate')
    }

}
module.exports = auth