const mongoose = require('mongoose')

// Definir el esquema y el modelo de Mongoose
const movieSchema = new mongoose.Schema({
  title: String,
  year: Number,
  director: String,
  duration: Number,
  poster: String,
  genre: [String],
  rate: Number,
})
const Movie = mongoose.model('Movie', movieSchema)

module.exports = Movie
