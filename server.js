#!/usr/bin/env node
var express = require('express')
var path = require('path')
var bodyParser = require('body-parser')
var sslRedirect = require('heroku-ssl-redirect')
var compression = require('compression')
var app = express()

app.use(compression())
app.use(sslRedirect())
app.use(bodyParser.json())
app.set('etag', false)

app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private')
  next()
})

app.use(express.static(__dirname + '/dist'/*,{
    maxAge: "1d"
}*/))

app.get('*', function(req, res){
	res.sendFile('index.html', { root: __dirname + '/dist' })
})

app.set('port', process.env.PORT || 3000)

var server = app.listen(app.get('port'), function() {
  console.log('Express server listening at http://localhost:' + server.address().port);
})