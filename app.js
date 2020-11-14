if(process.env.NODE_ENV != 'production') {
  require('dotenv').config()
}

require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const { urlencoded } = require('express');
const port = process.env.PORT;
const routes = require('./routes/index');
const Error = require('./middlewares/errorHandler');

// Body Parcers
app.use(cors());
app.use(express.json());
app.use(urlencoded({extended: true}));

// Middlewares
app.use('/', routes);
app.use(Error.handle);

app.listen(port, () => {
  console.log('App running on port', port)
})

module.exports = app;