/**
 * Created by manland on 20/03/15.
 */
var app = require('http').createServer(handler);
var io = require('socket.io')(app);
var fs = require('fs');
var mime = require('mime');
var constants = require('./constants');

app.listen(constants.port);

function handler (req, res) {
    var path = req.url;
    if(path[path.length-1] === '/') {
        path = path + 'index.html';
    }
    if(path.indexOf('?') > -1) {
        path = path.split('?')[0];
    }
    fs.readFile(__dirname + '/public/' + path, function (err, data) {
        if (err) {
            res.writeHead(500);
            return res.end('Error loading index.html');
        }

        res.writeHead(200);
        res.writeHead(200, {'Content-Type': mime.lookup(path)});
        res.end(data);
    });
}

io.on('connection', function (socket) {
    socket.emit('news', { hello: 'world' });
    socket.on('my other event', function (data) {
        console.log(data);
    });
});

console.log('open webbrowser on http://127.0.0.1:' + constants.port);