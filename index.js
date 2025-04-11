const express = require('express')
const bodyParser = require('body-parser')
const routes = require('./routes/index')
const cors = require('cors')

const app = express()
app.use(cors({
    origin: '*'
}))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(routes)
app.use(express.static('assets'));
const port = 4024

app.listen(port, () => console.log(`Server running on port ${port}`))
