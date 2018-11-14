console.log('server starting');

const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;
app.use(express.static(__dirname + '/public'));

app.get('/a', (req, res, next) => {
  console.log('got this');
  res.setHeader('Content-Type', 'text/html');
  res.write(`<html>
    <body>
    <script>
    setTimeout(function(){
      console.log('redirecting');
      window.location.href = '../birds'
    }, 2000);
    </script>
    shoot</body>
    </html>`);
  res.end()
})

app.get('/links', (req, res, next) => {
  let temp = fs.readFileSync("data/links.json");
  let d = JSON.parse(temp);
  res.writeHead(200, {
    'Content-Type': 'application/json'
  });
  res.end(JSON.stringify(d));
  next()
// you might just use this
// res.json(d);
});

const birds = require('./Routers/birds')
app.use('/birds', birds)

app.listen(port, () => console.log(`App listening on port ${port}.`));
