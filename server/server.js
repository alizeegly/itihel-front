const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require("cors")

const PORT = process.env.PORT || 8800

app.use(cors())
app.use(express.json())

app.listen(PORT, () => {
    console.log(`Backend server is listening on port ${PORT} !`)
})