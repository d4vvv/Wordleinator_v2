const mongoose = require('mongoose')
const axios = require('axios')

const password = process.argv[2]

const url =
  `mongodb+srv://fullstack:${password}@kcluster.0fmqm.mongodb.net/wordleinator?retryWrites=true&w=majority`

mongoose.connect(url)

const wordSchema = new mongoose.Schema({
  word: String
})

const Word = mongoose.model('Word', wordSchema)

axios.get('http://localhost:3001/words').then(response => {
      response.data.forEach(w => {
            //let x = w.word;
            //console.log(x)
            const word = new Word({
            word: w.word
      })
       word.save().then(result => {
          console.log('word saved')
      }) 
    })

    //mongoose.connection.close()
})

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

/* const word = new Word({
  content: 'HTML is Easy',
  date: new Date(),
  important: true,
}) */