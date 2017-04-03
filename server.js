var express = require('express');

var app = express();

app.use('/styles', express.static(__dirname + '/tmp/styles'));
app.use('/views', express.static(__dirname + '/tmp/views'));
app.use('/scripts', express.static(__dirname + '/tmp/scripts'));


app.all('/*', function(req, res, next) {
    res.sendFile('index.html', { root: __dirname  + '/tmp'});
});

app.listen(3000, function(){
    console.log('running');
});
