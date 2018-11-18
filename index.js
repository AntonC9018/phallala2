console.log('server starting');

const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;
const db = require('./data/connection.js');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);


// app.get('/a', (req, res, next) => {
//   console.log('got this');
//   res.setHeader('Content-Type', 'text/html');
//   res.write(`<html><body><script>setTimeout(function(){  console.log('redirecting');  window.location.href = '../birds'}, 2000);</script>shoot</body></html>`);
//   res.end()
// });

//use sessions for tracking logins
app.use(session({
  secret: 'work hard',
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: db
  })
}));

// parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

// include routes
var routes = require('./routes/router');

app.use('/', routes);

app.use(express.static(__dirname + '/public'));

// const birds = require('./Routers/birds')
// app.use('/birds', birds)


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('File Not Found');
  err.status = 404;
  next(err);
});

// error handler
// define as the last app.use callback
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send(err.message);
});

app.listen(port, () => console.log(`App listening on port ${port}.`));
