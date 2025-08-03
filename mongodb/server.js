import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import router from './src/routes/users.js'

dotenv.config();

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(express.json())
app.use('/api', router)

app.get('/', (req, res) => {
	res.send('Hola mundo');
});

mongoose.connect(process.env.MONGODB_KEY)
    .then(() => console.log('Conectado'))
    .catch(err => console.log(err))

app.listen(PORT, () => {
	console.log(`Servidor corriendo en: http://localhost:${PORT}`);
});
