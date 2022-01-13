const router = require('express').Router()
const { register, login, updateStatus, getUsers, logout, getUser, updateWinnerStats, updateLoseStats, updateUsername, updateUserRequests, updateUserFriends, updateUserImage } = require('../controller/user.controller')
const auth = require('../middleware/authentication')
const multer = require('multer')
const upload = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpeg|jpg|png)$/))
            return cb(new Error('file must be in JPEG JPG PNG formats'))
        cb(undefined, true)
    }
})
router.get('/', (req, res) => {
    res.status(200).send('In')
})
router.post('/register', (req, res) => {
    register(req, res)
})
router.post('/login', (req, res) => {
    login(req, res)
})
router.get('/profile', auth, (req, res) => {
    console.log('ss');
    res.status(200).send(req.user)

})
router.get('/getusers', (req, res) => {
    getUsers(req, res)
})

router.get('/users', (req, res) => {

    getUsers(req, res)
})
router.put('/logout', auth, (req, res) => {
    logout(req, res)
})
router.put('/updateStatus/:id', auth, (req, res) => {
    updateStatus(req, res)
})
router.put('/updateWinnerStats', (req, res) => {
    updateWinnerStats(req, res)
})
router.put('/updateLoseStats/:id', (req, res) => {
    updateLoseStats(req, res)
})
router.get('/getUser/:id', (req, res) => {
    getUser(req, res)
})
router.put('/updateUsername/:id', (req, res) => {
    updateUsername(req, res)
})
router.put('/updateUserRequests/:id', (req, res) => {
    updateUserRequests(req, res)
})
router.put('/updateUserFriends/:id', (req, res) => {
    updateUserFriends(req, res)
})
router.put('/updateUserImage/:id', upload.single('img'), (req, res) => {
    updateUserImage(req, res)
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})
module.exports = router
