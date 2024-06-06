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

//Obtener todas las peliculas
app.get('/peliculas', async (req, res) => {
  const { genero } = req.query
  const query = !genero ? {} : { genre: { $regex: genero, $options: 'i' } }
  try {
    const peliculas = await Movie.find(query)
    res.json(peliculas)
  } catch (error) {
    res.status(500).send('Error al obtener las peliculas')
  }
})

//Mostrar una peli por id
app.get('/peliculas/:id', async (req, res) => {
  const { id } = req.params
  const pelicula = await Movie.findById(id)
  if (pelicula) return res.json(pelicula)
  res.status(404).json({ message: 'Peli no encontrada' })
})

//Agregar una peli
app.post('/peliculas', async (req, res) => {
  const nuevaPeli = new Movie(req.body)
  try {
    await nuevaPeli.save()
    res.status(201).json(nuevaPeli)
  } catch {
    return res.status(500).json({ message: 'Error al agregar la peli' })
  }
})

//Borrar una peli por id
app.delete('/peliculas/:id', async (req, res) => {
  const { id } = req.params

  try {
    const resultado = await Movie.findByIdAndDelete(id)
    if (resultado) {
      res.json({ message: 'Peli borrada con exito' })
    } else {
      res.status(404).json({ message: 'Peli no encontrada para borrar' })
    }
  } catch (error) {
    return res.status(500).json({ message: 'Error al borrar la peli' })
  }
})

//Modificar/Actualizar una peli parcialmente
app.patch('/peliculas/:id', async (req, res) => {
  const { id } = req.params

  try {
    const peliActualizada = await Movie.findByIdAndUpdate(id, req.body, {
      new: true,
    })
    if (!peliActualizada) {
      return res.status(404).json({ message: 'Peli no encontrada para borrar' })
    }
    res.json({ message: 'Peli actualizada con exito', peliActualizada })
  } catch (error) {
    return res.status(500).json({ message: 'Error al actualizar la peli' })
  }
})

//Modificar/Actualizar una peli completamente
app.put('/peliculas/:id', async (req, res) => {
  const { id } = req.params

  try {
    const peliActualizada = await Movie.findByIdAndUpdate(id, req.body, {
      new: true,
      overwrite: true,
    })
    if (!peliActualizada) {
      return res.status(404).json({ message: 'Peli no encontrada para borrar' })
    }
    res.json({ message: 'Peli actualizada con exito', peliActualizada })
  } catch (error) {
    return res.status(500).json({ message: 'Error al actualizar la peli' })
  }
})

//Inicializamos el servidor
app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`)
})
