// routes/apiRoutes
const app = require('express').Router();
const uniqid = require('uniqid');
const fs = require('fs');
const { readFromFile, writeToFile, readAndAppend } = require('../../helpers/fsUtilites');


//Displays database data onto notes page
app.get('/notes', (req,res) => {

  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));

})

//adds note to db.json
app.post('/notes', (req, res) => {
  console.info(`${req.method} request received to add note`);

  const { title, text, uuid } = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
      id: uniqid()
    };

    readAndAppend(newNote, './db/db.json');
    res.json(`Note added successfully 🚀`);
  } else {
    res.error('Error in adding note');
  }
})

//Deletes data from db.JSON
app.delete('/notes/:id', (req, res) => {
  console.info(`${req.method} request received to delete note`);
  console.log("req params", req.params.id)

  fs.readFile('./db/db.json', 'utf8', (err, data) => {
  let myArray = JSON.parse(data)

  const deleteID = req.params.id

  const deleteData = myArray.filter(myArrayAaron => myArrayAaron.id !== deleteID)

  writeToFile('./db/db.json', deleteData )
  //file interaction
  res.json(`Removed! ${deleteID}`)
  //console.log(typeof myArray)
  })
})


module.exports = app;