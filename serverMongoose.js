const express = require('express')
const app = express()
process.loadEnvFile()
const port = process.env.PORT ?? 3000
const morgan = require('morgan')
const mongoose = require('mongoose')
const { title } = require('process')

//Obtenemos la URI desde las variables de entorno
const URI = process.env.MONGODB_URLSTRING
const DATABASE_NAME = process.env.DATABASE_NAME

// Conectar a MongoDB usando Mongoose
mongoose
  .connect(URI + DATABASE_NAME)
  .then(() => console.log('Conectado a MongoDB'))
  .catch((err) => console.log('Error al conectarse : ', err))

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

//Middleware
app.use(express.json())
app.use(morgan('dev'))

//Ruta principal
app.get('/', (req, res) => {
  res.json('Bienvenido a la API de peliculas !')
})

//Inicializamos el servidor
app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`)
})
