const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = 8000;
require('dotenv').config(); //index file could identify the env file and access the url
const app = express();
require('./db');

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req,res) => {
    res.send('API working!');
});

app.listen(PORT, ()=>{
    console.log(`server is listening to port ${PORT} `);
});
