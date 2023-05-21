var express = require('express');
var app = express();
var cors = require('cors');

var indexRouter = require('./routes');

require('dotenv').config();

app.use(cors())

app.use('/', indexRouter)

app.get('/', (req, res) => res.json('My API running'))



const port = process.env.PORT || 4000;
app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
