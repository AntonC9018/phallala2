var express = require('express');
var router = express.Router();
var User = require('../data/models/user');
const getUser = require('./getUser.js')

let q = __dirname.lastIndexOf('\\');
var rootPath = __dirname.slice(0, q);

// GET route for reading data
router.get('/', function(req, res, next) {
  getUser(req).then(function(user, error) {
    if (error) {
      err.status = 401;
      return next(err);
    } else if (user) {
      //res.redirect('/profile')
      next();
    } else {
      res.redirect('/login');
    }
  });
});

// load login/reg template if there's no session
router.get('/login', function(req, res, next) {
  return res.sendFile(rootPath + '/public/login/index.html')
})

//POST route for updating data
router.post('/', function(req, res, next) {
  console.log('Post to \'/\'');
  // confirm that user typed same password twice
  if (req.body.password !== req.body.passwordConf) {
    var err = new Error('Passwords do not match.');
    err.status = 400;
    res.send("passwords dont match");
    return next(err);
  }

  if (req.body.email &&
    req.body.username &&
    req.body.password &&
    req.body.passwordConf) {

    var userData = {
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
    }

    User.create(userData, function(error, user) {
      if (error) {
        return next(error);
      } else {
        req.session.userId = user._id;
        return res.redirect('/profile');
      }
    });

  } else if (req.body.logemail && req.body.logpassword) {
    User.authenticate(req.body.logemail, req.body.logpassword, function(error, user) {
      if (error || !user) {
        var err = new Error('Wrong email or password.');
        err.status = 401;
        return next(err);
      } else {
        req.session.userId = user._id;
        return res.redirect('/');
      }
    });
  } else {
    var err = new Error('All fields required.');
    err.status = 400;
    return next(err);
  }
})

// GET route after registering
router.get('/profile', function(req, res, next) {
  getUser(req).then(function(user, error) {
    if (error || !user) {
      return res.redirect('/');
    } else {
      return res.send('<h1>Name: </h1>' + user.username + '<h2>Mail: </h2>' + user.email + '<br><a type="button" href="/logout">Logout</a>')
    }
  })
});

// GET for logout logout
router.get('/logout', function(req, res, next) {
  if (req.session) {
    // delete session object
    req.session.destroy(function(err) {
      if (err) {
        return next(err);
      } else {
        return res.redirect('/');
      }
    });
  }
});

const fs = require('fs');

router.use('/links', function(req, res, next) {
  console.log("something");
  let temp = fs.readFileSync(rootPath + "/data/links.json");
  let d = JSON.parse(temp);
  res.writeHead(200, {
    'Content-Type': 'application/json'
  });
  res.end(JSON.stringify(d));
});


module.exports = router;
