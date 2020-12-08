const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const http = require('http').createServer(app);
const pug = require('pug')
const path = require('path')

//import router
const router = require('./app/index.js');

// body parser
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }))
app.use(bodyParser.json({ limit: '100mb', extended: true }))

//const router = require('./app/index.js');

//static files
//app.use('/static', express.static('static'))

// app.set('view engine', 'pug');
// app.set('views','./views');

app.set('views', [path.join(__dirname, '/views')]);
app.set('view engine', 'pug');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

  if ('OPTIONS' === req.method) {
    //respond with 200
    res.send(200);
  }
  else {
    //move on
    next();
  }
});


app.get('/', (req, res) => {
  res.send("incorrect route");
})

//add routes
//const base = '/api/v1/';
app.use(router);

// app.listen(process.env.PORT || 3000, () => console.log('Running on port 3000!'))
http.listen(1000, function(){
  console.log('listening on *:1000');
});
