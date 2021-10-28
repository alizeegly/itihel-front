const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require("cors")

const userRoute = require('./routes/users')
const courseRoute = require('./routes/courses')
const roleRoute = require('./routes/roles')

const PORT = process.env.PORT || 8800

app.use(cors())
app.use(express.json())

mongoose.connect(
    "mongodb+srv://admin:admin@cluster0.7fyac.mongodb.net/itihel?retryWrites=true&w=majority", 
    {
        useNewUrlParser: true
    }
).then(() => console.log("DB Connection Successful !"))
.catch((err) => console.log(err))

app.use('/api/users', userRoute)
app.use('/api/courses', courseRoute)
app.use('/api/roles', roleRoute)

app.listen(PORT, () => {
    console.log(`Backend server is listening on port ${PORT} !`)
})