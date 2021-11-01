const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require("cors")
const bodyParser = require("body-parser")

const userRoute = require('./routes/users')
const courseRoute = require('./routes/courses')
const roleRoute = require('./routes/roles')
const quizzRoute = require('./routes/Quizz/quizz')
const quizzQuestionsRoute = require('./routes/Quizz/quizz_questions')
const quizzQuestionOptionsRoute = require('./routes/Quizz/quizz_question_options')
const FlipCardsRoute = require('./routes/FlipCards/flip_cards')
const FlipCardsQuestionsRoute = require('./routes/FlipCards/flip_cards_questions')
const scoresRoute = require('./routes/scores')
const notesRoute = require('./routes/notes')

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
app.use('/api/notes', notesRoute)
app.use('/api/roles', roleRoute)

app.use('/api/flip-cards', FlipCardsRoute)
app.use('/api/flip-cards-questions', FlipCardsQuestionsRoute)

app.use('/api/quizz', quizzRoute)
app.use('/api/quizz-questions', quizzQuestionsRoute)
app.use('/api/quizz-questions-options', quizzQuestionOptionsRoute)
app.use('/api/scores', scoresRoute)

app.listen(PORT, () => {
    console.log(`Backend server is listening on port ${PORT} !`)
})