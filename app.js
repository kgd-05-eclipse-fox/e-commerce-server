if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const route = require('./routes/index')
const errorHandler = require('./middlewares/errorHandler')
const cors = require('cors');

//body parser
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cors())

app.use(route);

app.use(errorHandler)

app.listen(port, () => {
    console.log(`listening to the port ${port}`);
})

module.exports = app;