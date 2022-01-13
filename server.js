const express = require('express')
const app = express();
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
// const upload = require('./routes/upload.route')
// const Grid = require('gridfs-stream')
require('dotenv').config();
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
app.use(cors())


//a
//Import Routes
const userRoute = require('./routes/user.route')
//Route MiddleWare

mongoose.connect(`mongodb+srv://ameer:ameer123@cluster0.zwqlb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, { useNewUrlParser: true }, () => {

    app.listen(process.env.PORT || 4001, () => {
        app.use('', userRoute)
        // app.use('/file', upload)
        console.log('Server up and running')
    })
}
)

