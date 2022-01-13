const upload = require('../middleware/upload')
const express = require('express')
const router = express.Router();

router.post('/upload', upload.single('file'), (req, res) => {
    if (req.file === undefined) return res.send('You Must Select A File')
    const imageURL = process.env.PORT || `http://localhost:4001/file/${req.file.filename}`

    return res.send(imgURL)

})


module.exports = router;