const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require("cors")
const bodyParser = require("body-parser")
const session = require('express-session')
const cookieParser = require('cookie-parser')
const MongoDBSession = require('connect-mongodb-session')(session)

const userRoute = require('./routes/Users/users')
const categoryRoute = require('./routes/Courses/categories')
const courseRoute = require('./routes/Courses/courses')
const coursesSharedRoute = require('./routes/Courses/courses_shared')
const roleRoute = require('./routes/Users/roles')
const quizzRoute = require('./routes/Quizz/quizz')
const quizzQuestionsRoute = require('./routes/Quizz/quizz_questions')
const quizzQuestionOptionsRoute = require('./routes/Quizz/quizz_question_options')
const FlipCardsQuestionsRoute = require('./routes/FlipCards/flip_cards_questions')
const scoresRoute = require('./routes/Quizz/scores')
const path = require("path")
require("dotenv").config()

const PORT = process.env.PORT || 8800

app.use(cors())
app.use(express.json())
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "client", "build")))


// BDD + Session
mongoose.connect( process.env.MONGODB_URI, {useNewUrlParser: true} )
.then(() => console.log("DB Connection Successful !"))
.catch((err) => console.log(err))

const store = new MongoDBSession({
    uri: process.env.MONGODB_URI,
    collection: "sessions"
})

app.use(
    session({
        secret: "itihel",
        resave: false,
        saveUninitialized: false,
        store: store
    })
)


// Routes
app.get('/', function(req, res) {
    res.send('API is working perfectly');
});
  
app.use('/api/users', userRoute)
app.use('/api/courses', courseRoute)
app.use('/api/categories', categoryRoute)
app.use('/api/courses-shared', coursesSharedRoute)
app.use('/api/roles', roleRoute)
app.use('/api/flip-cards', FlipCardsQuestionsRoute)
app.use('/api/quizz', quizzRoute)
app.use('/api/quizz-questions', quizzQuestionsRoute)
app.use('/api/quizz-questions-options', quizzQuestionOptionsRoute)
app.use('/api/scores', scoresRoute)

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(PORT, () => {
    console.log(`Backend server is listening on port ${PORT} !`)
})