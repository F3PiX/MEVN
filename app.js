const express = require('express');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


// Set up and connect to server
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
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));


// Routes
app.get('/', (req, res) => {
  const title = "This title is passed in via the routes";
  res.render('index', {
    title: title
  });
});
app.get('/about', (req, res) => {
  res.render('about'); 
});

app.get('/ideas', (req, res) => {
  Idea.find({})
    .sort({date: 'desc'})
    .then(ideas => {
      res.render('ideas/index', {
        ideas
      });
    });
});
app.get('/ideas/add', (req, res) => {
  res.render('ideas/add');
});
app.get('/ideas/edit/:id', (req, res) => {
  Idea.findOne({
    _id: req.params.id
  })
  .then(idea => {
    res.render('ideas/edit', {idea: idea});
  });
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

app.put('/ideas/:id', (req, res) => {
  Idea.findOne({
    _id: req.params.id
  })
  .then(idea => {
    idea.title = req.body.title;
    idea.details = req.body.details;
    idea.save()
      .then(idea => {res.redirect('/ideas');})
  });
});


// LISTEN
const port = 5000;
//take the app and listen :
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

