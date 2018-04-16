const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');

const app = express(); //this will init the application
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/vidjot-dev')
  .then(() => console.log('mongoDB connected'))
  .catch(error => console.log(error));

// Load Idea Model
require('./models/Idea');
const Idea = mongoose.model('ideas');  


// Handlebars middleware
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

//routes
app.get('/', (req, res) => {
  const title = "This title is passed in via the routes";
  res.render('index', {
    title: title
  });
});

app.get('/about', (req, res) => {
  res.render('about');
});

const port = 5000;
//take the app and listen :
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

