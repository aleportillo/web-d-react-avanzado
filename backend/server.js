import express from 'express'
import cors from 'cors'
import { generateFromOllama } from './ollamaService.js'
import db from './db.js'

const app = express()
const PORT = 3001

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hola mundo')
})

app.post('/api/chat', async (req, res) => {
  const { prompt } = req.body

  try {
    const response = await generateFromOllama(prompt)
    res.json({ response })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Error procesando la solicitud' })
  }
})

// GET: Obtener mensajes
app.get('/api/messages', async (req, res) => {
  await db.read()
  res.json(db.data.messages)
})

app.post('/api/messages', async (req, res) => {
  const { text, sender } = req.body
  if (!text || !sender) {
    return res.status(400).json({ error: 'Faltan campos en el objeto' })
  }

  const newMessage = {
    id: Date.now(),
    text,
    sender,
    timestamp: new Date().toISOString()
  }

  await db.read()
  db.data.messages.push(newMessage)
  await db.write()

  res.status(201).json(newMessage)
})

app.listen(PORT, () => {
  console.log(`Servidor corriendo en: http://localhost:${PORT}`)
})
