const express = require('express');
const PORT = 3001; //May have something different when Heroku deployment
const app = express();
const routes = require('./routes');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(routes);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🎵`)
);