// routes/htmlRoutes
const app = require('express').Router();
const path = require('path');

//links to Notes.html
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '../../public/notes.html')) 
  
);

module.exports = app;