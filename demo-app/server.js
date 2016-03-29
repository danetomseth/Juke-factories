var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname));

var cart = [];
app.get('/api/cart', function (req, res, next) {
  res.json(cart);
});

app.post('/api/cart', function (req, res, next) {
  cart.push(req.body);
  res.sendStatus(201);
});

var port = 1337;
app.listen(port, function () {
  console.log('Listening intently on port', port);
});