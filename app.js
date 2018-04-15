const express = require('express');
const app = express(); //this will init the application

//routes
app.get('/', (req, res) => {
  res.send('INDEX');
});

app.get('/about', (req, res) => {
  res.send("Talking about me...");
});

const port = 5000;
//take the app and listen :
app.listen(port, ()=> {
  console.log(`Server started on port ${port}`);
});

