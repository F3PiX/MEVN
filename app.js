const express = require('express');
const exphbs = require('express-handlebars');

const app = express(); //this will init the application

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
app.listen(port, ()=> {
  console.log(`Server started on port ${port}`);
});

