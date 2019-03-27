var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require('fs');
var path = require('path');

const htmldir = __dirname + '/../www/';

define_gets();

http.listen(8181,function(){
    console.log('listening on: 8181');
});

function define_gets(){
    app.get('/',function(req,res){
        res.sendFile(path.resolve(htmldir + "index.html"));
    });

    app.get('/js/main.js',function(req,res){
        res.sendFile(path.resolve(htmldir + "js/main.js"));
    });

    app.get('/key.txt',function (req,res) {
        res.sendFile(path.resolve(htmldir + "key.txt"));
    });

    app.get('/vendor/jquery/jquery.min.js',function(req,res){
        res.sendFile(path.resolve(htmldir + "vendor/jquery/jquery.min.js"));
    });

    app.get('/vendor/bootstrap/js/bootstrap.bundle.min.js',function(req,res){
        res.sendFile(path.resolve(htmldir + "vendor/bootstrap/js/bootstrap.bundle.min.js"));
    });

    app.get('/vendor/bootstrap/css/bootstrap.min.css',function(req,res){
        res.sendFile(path.resolve(htmldir + "vendor/bootstrap/css/bootstrap.min.css"));
    });
}