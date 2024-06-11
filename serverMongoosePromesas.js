const express = require('express')
const app = express()
const connectDB = require('./src/mongoose')
const port = process.env.PORT ?? 3000
const morgan = require('morgan')
const Movie = require('./src/movieModel')

// Conectar a MongoDB usando Mongoose
connectDB()

//Middleware
app.use(express.json())
app.use(morgan('dev'))

//Ruta principal
app.get('/', (req, res) => {
  res.json('Bienvenido a la API de peliculas !')
})

// Obtener todas las peliculas y opcionalmente de UN genero
app.get('/peliculas', (req, res) => {
  const { genero } = req.query
  const query = !genero ? {} : { genre: { $regex: genero, $options: 'i' } }
  Movie.find(query)
    .then((peliculas) => {
      res.json(peliculas)
    })
    .catch((error) => {
      console.error('Error al obtener peliculas: ', error)
      res.status(500).send('Error al obtener las peliculas')
    })
})

// Mostrar peliculas de varios generos
app.get('/peliculas/generos', (req, res) => {
  let { generos } = req.query
  // generos = generos.replace(',', '|')
  // const query = { genre: { $regex: `(?i)^${generos}$` } }
  const generosArray = generos.split(',').map((genre) => new RegExp(genre, 'i'))
  const query = { genre: { $in: generosArray } }

  Movie.find(query)
    .then((peliculas) => {
      res.json(peliculas)
    })
    .catch((error) => {
      console.error('Error al obtener peliculas: ', error)
      res.status(500).send('Error al obtener las peliculas')
    })
})

// Mostrar peliculas mas recientes
app.get('/peliculas/recientes', (req, res) => {
  const { cantidad } = req.query
  Movie.find()
    .sort({ year: -1 })
    .limit(!cantidad ? 10 : parseInt(cantidad))
    .then((peliculas) => {
      res.json(peliculas)
    })
    .catch((error) => {
      console.error('Error al obtener peliculas: ', error)
      res.status(500).send('Error al obtener las peliculas')
    })
})

// Mostrar peliculas en un rango de años
app.get('/peliculas/epoca', (req, res) => {
  let { inicio, fin } = req.query
  const query = { year: { $gte: inicio, $lte: fin } }
  Movie.find(query)
    .then((peliculas) => {
      res.json(peliculas)
    })
    .catch((error) => {
      console.error('Error al obtener peliculas: ', error)
      res.status(500).send('Error al obtener las peliculas')
    })
})

//Mostrar una peli por id
app.get('/peliculas/:id', (req, res) => {
  const { id } = req.params
  Movie.findById(id)
    .then((pelicula) => {
      if (pelicula) {
        res.json(pelicula)
      } else {
        res.status(404).json({ message: 'Peli no encontrada' })
      }
    })
    .catch((error) => {
      console.error('Error al obtener la pelicula: ', error)
      res.status(500).send('Error al obtener la pelicula')
    })
})

//Agregar una peli
app.post('/peliculas', (req, res) => {
  const nuevaPeli = new Movie(req.body)
  nuevaPeli
    .save()
    .then((peliculaGuardada) => {
      res.status(201).json(peliculaGuardada)
    })
    .catch((error) => {
      console.error('Error al agregar la pelicula: ', error)
      res.status(500).send('Error al agregar la pelicula')
    })
})

//Borrar una peli por id
app.delete('/peliculas/:id', (req, res) => {
  const { id } = req.params

  Movie.findByIdAndDelete(id)
    .then((resultado) => {
      if (resultado) {
        res.json({ message: 'Peli borrada con exito' })
      } else {
        res.status(404).json({ message: 'Peli no encontrada para borrar' })
      }
    })
    .catch((error) => {
      console.error('Error al borrar la pelicula: ', error)
      res.status(500).send('Error al borrar la pelicula')
    })
})

//Modificar/Actualizar una peli parcialmente
app.patch('/peliculas/:id', (req, res) => {
  const { id } = req.params

  Movie.findByIdAndUpdate(id, req.body, {
    new: true,
  })
    .then((peliActualizada) => {
      if (peliActualizada) {
        res.json({ message: 'Peli actualizada con exito', peliActualizada })
      } else {
        res.status(404).json({ message: 'Peli no encontrada para borrar' })
      }
    })
    .catch((error) => {
      console.error('Error al modificar la pelicula: ', error)
      res.status(500).send('Error al modificar la pelicula')
    })
})

//Modificar/Actualizar una peli completamente
app.put('/peliculas/:id', (req, res) => {
  const { id } = req.params

  Movie.findByIdAndUpdate(id, req.body, {
    new: true,
    overwrite: true,
  })
    .then((peliActualizada) => {
      if (peliActualizada) {
        res.json({ message: 'Peli actualizada con exito', peliActualizada })
      } else {
        res.status(404).json({ message: 'Peli no encontrada para borrar' })
      }
    })
    .catch((error) => {
      console.error('Error al modificar la pelicula: ', error)
      res.status(500).send('Error al modificar la pelicula')
    })
})

//Inicializamos el servidor
app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`)
})
