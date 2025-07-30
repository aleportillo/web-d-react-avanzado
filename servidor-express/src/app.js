require('dotenv').config()

const express = require('express')

const { infoPeliculas } = require('./peliculas')

const app = express()

const PORT = process.env.PORT

app.get('/', (req, res) => {
  res.send('Hola mundo')
})

app.get('/segundaruta', (req, res) => {
  res.send('Hola desde la segunda ruta')
})

app.get('/api/peliculas', (req, res) => {
  res.send(infoPeliculas)
})

app.get('/api/peliculas/accion/:titulo/:year', (req, res) => {
  const { year, titulo } = req.params

  const response = infoPeliculas.accion.filter(p => p.titulo === titulo && p.year === Number(year))

  if (!response.length) {
    res.status(400).send(`No se encuentran resultados con: ${titulo}, ${year}`)
    return
  }

  res.send(response)
})

app.get('/api/peliculas/comedia/:pais', (req, res) => {
  const { ordenar } = req.query
  const { pais } = req.params

  const resultados = infoPeliculas.comedia.filter(p => p.pais === pais)

  if (ordenar === 'year') {
    res.send(resultados.sort((a, b) => b.year - a.year))
  }

  res.send(resultados)
})

app.use(express.json())
app.post('/api/peliculas', (req, res) => {
  const nuevaPelicula = req.body

  console.log(nuevaPelicula)

  res.status(200).send({
    mensaje: 'La pelicula se recibio con exito',
    datos: nuevaPelicula
  })
})

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
})
