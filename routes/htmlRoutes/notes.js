//Dependencies
const fs = require('fs');
const express = require('express')
const router = express.Router()
const db = require('../db/notes.json');
const path = require('path');
const { v4: uuidv4 } = require('uuid');


router.use(express.json());

router.get('/notes', (req, res) => {
    res.json( db.notes );
});


router.post('/notes', (req, res) => { 

    req.body.id = uuidv4();

 
    const note = newNote(req.body, db);
    res.json(note);    
})

function newNote(body, db) {
   
    const notes = body;
  
    
    db.notes.push(notes);
    fs.writeFileSync(
        path.join(__dirname, '../db/notes.json'),
        JSON.stringify({ notes: db.notes }, null, 2)
      );

    return notes;
  }
  

module.exports = router