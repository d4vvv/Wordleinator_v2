require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
app.use(cors())
app.use(express.json())
app.use(express.static('build'))

const url =  process.env.MONGODB_URI

mongoose.connect(url)

const wordSchema = new mongoose.Schema({
    word: String
  })

wordSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Word = mongoose.model('Word', wordSchema)

let words = []

app.get('/', (request, response) => {
    response.send('<h1>HEMLO SOMETHING WENT WRONG</h1>')
})

app.get('/api/words', (request, response) => {
    Word.find({}).then(words => {
        response.json(words)
    })
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})