const express = require('express');
const path = require('path');
const app = express();

// Configuración
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
// Agregar esta línea después de las otras configuraciones de app.use
app.use(express.json());

// Almacenamiento temporal de palabras
let words = ['CASA', 'PERRO', 'GATO', 'COMPUTADORA'];

// Rutas
app.get('/', (req, res) => {
    res.render('words', { words });
});

app.post('/add-word', (req, res) => {
    if (req.body.action === 'update') {
        words = req.body.words;
        res.sendStatus(200);
    } else if (req.body.word) {
        const newWord = req.body.word.toUpperCase();
        if (newWord && !words.includes(newWord)) {
            words.push(newWord);
        }
        res.redirect('/');
    } else {
        res.sendStatus(400);
    }
});

app.get('/game', (req, res) => {
    const randomWord = words[Math.floor(Math.random() * words.length)];
    res.render('game', { word: randomWord });
});

app.post('/reset', (req, res) => {
    res.redirect('/game');
});

/*
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
*/
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});