// configurar para proyecto express

import express from 'express'
import path from 'path';
import { fileURLToPath } from 'url';
import { PORT } from './config.js'

const app = express();

// Configura el directorio de los archivos estáticos de Angular
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const angularDistPath = path.join(__dirname, './dist/app-root');
// Sirve los archivos estáticos de Angular después del build
app.use(express.static(angularDistPath));

app.post('/login', (req, res) => {
    res.json({user:'luishi'})
})
app.post('/register', (req, res) => {})
app.post('/logout', (req, res) => {})
app.post('/protected', (req, res) => {})

// Redirige todas las rutas al index.html de Angular
app.get('*', (req, res) => {
    res.sendFile(path.join(angularDistPath, 'index.html'));
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})