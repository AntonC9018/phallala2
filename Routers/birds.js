const express = require('express');
const router = express.Router();

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now())
  next()
})
// define the home page route
router.get('/', function(req, res) {
  res.writeHead(200, {
    'Content-Type': 'text/html'
  })
  res.write('Birds home page<br><img src="https://image.ibb.co/khXzn0/2382040-bigthumbnail.jpg">')
  res.write('<a href="./birds/about">About</a>')
  res.end();
})
// define the about route
router.get('/about', function(req, res) {
  res.send('About birds')
})

module.exports = router
