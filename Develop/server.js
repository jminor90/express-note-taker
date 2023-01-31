const express = require('express');
const PORT = 3001; //May have something different when Heroku deployment
const app = express();
const path = require('path');

const uniqid = require('uniqid')

//-------------------------------------------------------
const fs = require('fs');
const util = require('util');
const { channel } = require('diagnostics_channel');

/**
 *  Function to write data to the JSON file given a destination and some content
 *  @param {string} destination The file you want to write to.
 *  @param {object} content The content you want to write to the file.
 *  @returns {void} Nothing
 */

const readFromFile = util.promisify(fs.readFile);

const writeToFile = (destination, content) =>
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
  );

const readAndAppend = (content, file) => {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      parsedData.push(content);
      writeToFile(file, parsedData);
    }
  });
};

//-------------------------------------------------------

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

//links to Notes.html
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, './public/notes.html')) 
  
);


//Displays database data onto notes page
app.get('/api/notes', (req,res) => {

  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));

})

//adds note to db.json
app.post('/api/notes', (req, res) => {
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

// app.post('api/notes', (req,res) => {
//   let addedNote = req.body
//   addedNote.id = uniqid();

//   const data = fs.readFileSync('./db/db.json');
//   const json = JSON.parse(data)
//   json.push(addedNote)

//   fs.writeFile('./db/db.json', JSON.stringify(json, null, 2), (err) => 
//   err ? console.log(err): console.log("SUCCESS!"))
// }) 

//Deletes data from db.JSON - still having issues...
app.delete('/api/notes/:id', (req, res) => {
  console.info(`${req.method} request received to delete note`);
  console.log("req params", req.params.id)

  fs.readFile('./db/db.json', 'utf8', (err, data) => {
  let myArray = JSON.parse(data)

  const deleteID = req.params.id

  const deleteData = myArray.filter(myArrayAaron => myArrayAaron.id !== deleteID)
  // const deleteData = myArray.find(myArray => myArray.id === deleteID)

  // if (deleteData) {
  //   myArray = myArray.filter(myArray => channel.id !== deleteID)
  // } else {
  //   console.error()
  // }

  writeToFile('./db/db.json', deleteData )
  ///file interaction
  res.json(`Removed! ${deleteID}`)
  console.log(typeof myArray)
})



  // fs.readFile('./db/db.json', 'utf8', (err, data) => {
  //   let myArray = JSON.parse(data)

  //   console.log(typeof myArray)
  //   if (err) {
  //     console.error(err);
  //   } else {
      
  //     myArray = myArray.pop(({ id }) => id !== req.params.id);
  //   }
  // });
})



// app.delete("/api/notes/:id", function(req, res) {
//   console.log("req params", req.params.id)
//   parsedData = parsedData.filter(({ id }) => id !== req.params.id);
// });

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🎵`)
);


