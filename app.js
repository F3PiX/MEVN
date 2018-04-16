const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express(); //this will init the application
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/vidjot-dev')
  .then(() => console.log('mongoDB connected'))
  .catch(error => console.log(error));

// Load Idea Model
require('./models/Idea');
const Idea = mongoose.model('ideas');  


// Middlewares
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

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
app.get('/ideas/add', (req, res) => {
  res.render('ideas/add');
});
app.post('/ideas', (req, res) => {
  let errors = [];
  if(!req.body.title){
    errors.push({text: "Please add a title"});
  }
  if(errors.length > 0) { 
    res.render('ideas/add', {
      errors: errors,
      title: req.body.title,
      details: req.body.details
    });
  } else {
    const newUser = {
      title: req.body.title,
      details: req.body.details
    }
    new Idea(newUser)
      .save() //or just pass in req.body; does this look like premature optimization?
      .then(idea => {
        res.redirect('/ideas');
      })
    }
}); 

const port = 5000;
//take the app and listen :
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

