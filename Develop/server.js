const express = require('express');
const PORT = 3001; //May have something different when Heroku deployment
const app = express();
const path = require('path');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, './public/notes.html')) 
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🎵`)
);