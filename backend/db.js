import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'
import { join } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = join(__filename, '..')
const file = join(__dirname, 'db.json')
const adapter = new JSONFile(file)
const defaultData = { messages: [] }

const db = new Low(adapter, defaultData)

await db.read()
await db.write()

export default db
// console.log('RUTA:', __filename)
// console.log('RUTA:', import.meta.url)
