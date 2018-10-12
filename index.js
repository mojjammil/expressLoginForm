'use strict';

const http = require('http');
const path = require('path') ;
const express = require('express');
const app = express();

const port = 3000;
const host = 'localhost';

const server = http.createServer(app);

const users = require(path.join(__dirname, 'users.json'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'login'));

app.get('/', (req, res) => 
    res.sendFile(path.join(__dirname, 'index.html'))
);

app.post('/login', express.urlencoded({extended:false}), (req,res) => {
    if(!req.body) return res.sendStatus(400);
    if(Object.keys(users).includes(req.body.username) && 
    users[req.body.username] === req.body.password) {
        res.render('login', {data:req.body, title:'Login status', text: 'Welcome to the website'});
    } else {
        res.render('login', {data:req.body, title:'Login status', text: 'Wrong access info'});
    }
});

server.listen(port, host, () => 
console.log(`Server port ${port}`)
);
