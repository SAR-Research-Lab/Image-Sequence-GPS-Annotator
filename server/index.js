var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require('fs');
var path = require('path');

const htmldir = __dirname + '/../www/';

define_gets();

var frame_num = -1;
var working_directory = "/home/aaron/Repos/Image-Sequence-GPS-Annotater/data/example_set/";

io.on('connection', function (socket) {
    console.log("user connected");
    socket.on('next_image', function (req) {
        try {
            frame_num = frame_num + 1;

            var image_buffer = fs.readFileSync(working_directory + "Left/Pic" + frame_num.toString() + ".bmp");
            socket.emit('image', {found: true, frame: frame_num, buffer: image_buffer.toString('base64')});
            console.log('sent_image');
        }
        catch (e) {
            frame_num = frame_num - 1;
            socket.emit('FNF',{exception:e});
            console.log("File not found");
        }
    });
    socket.on('prev_image', function (req) {
        try {
            frame_num = frame_num - 1;
            var image_buffer = fs.readFileSync(working_directory + "Left/Pic" + frame_num.toString() + ".bmp");
            socket.emit('image', {found: true, frame: frame_num, buffer: image_buffer.toString('base64')});
            console.log('sent_image');
        }
        catch (e) {
            frame_num = frame_num + 1;
            socket.emit('FNF',{exception:e});
            console.log("File not found");
        }
    });
    socket.on('set_working_directory', function (req) {
       working_directory = req.dir;
        if(working_directory.slice(-1) != '/')
        {
            working_directory = working_directory.concat('/');
        }
        console.log("working directory set to: " + working_directory);
       frame_num = -1;
    });
});

http.listen(8181, function () {
    console.log('listening on: 8181');
});

function define_gets() {
    app.get('/', function (req, res) {
        res.sendFile(path.resolve(htmldir + "index.html"));
    });

    app.get('/start.bmp', function (req, res) {
        res.sendFile(path.resolve(htmldir + "start.bmp"));
    });

    app.get('/js/main.js', function (req, res) {
        res.sendFile(path.resolve(htmldir + "js/main.js"));
    });

    app.get('/key.txt', function (req, res) {
        res.sendFile(path.resolve(htmldir + "key.txt"));
    });

    app.get('/vendor/jquery/jquery.min.js', function (req, res) {
        res.sendFile(path.resolve(htmldir + "vendor/jquery/jquery.min.js"));
    });

    app.get('/vendor/bootstrap/js/bootstrap.bundle.min.js', function (req, res) {
        res.sendFile(path.resolve(htmldir + "vendor/bootstrap/js/bootstrap.bundle.min.js"));
    });

    app.get('/vendor/bootstrap/css/bootstrap.min.css', function (req, res) {
        res.sendFile(path.resolve(htmldir + "vendor/bootstrap/css/bootstrap.min.css"));
    });
}