import { Server } from 'http'
import express from 'express'
import { makeStore } from './store'
import listenWebSocket from './io.js'

var app = express()
var http = Server(app)
var io = require('socket.io')(http)

//configs
var rootPath = require('path').normalize(__dirname + '/../..');

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use( express.static( rootPath + '/public' ));

const store = makeStore();
listenWebSocket( io , store );

app.get('/',(req,res) => {
    res.render('index');
})

http.listen(3000, () => {
    console.log('listenning on port 3000');
})