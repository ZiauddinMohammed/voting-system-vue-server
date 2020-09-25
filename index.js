const express = require('express');
const app = express()
const port = 3000;

const admin = require('./admin');
const candidate = require('./candidate');
const voter = require('./voter');

app.use('/admin', admin);
app.use('/candidate', candidate);
app.use('/voter', voter);

app.listen(port, () => {
    console.log('Server Listening On Port: '+ port);
})
