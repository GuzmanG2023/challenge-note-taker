const express = require('express');
const app = express();
const path = require('path');
const {notePad} = require('./db/db.json');
const fs = require('fs');
const uuid = require('uuid');

const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
})

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
})

app.get('/api/notes', (req, res) => {
    res.json(notePad);
})

const newNote = (arr, data) => {
    arr.push(data);
    fs.writeFileSync(path.join(__dirname, './db/db.json'), JSON.stringify({notePad: arr}));
    return data
}

app.post('/api/notes', (req, res) => {
    req.body.id = uuid.v4();
    const note = newNote(notePad, req.body)
    res.json(note);
})

app.listen(PORT, () => {
    console.log(`listening On Port ${PORT}`);
})

