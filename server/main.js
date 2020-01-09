var express = require('express');
var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

const mysql = require('./mysql');

app.use(express.static(__dirname + "/dist"));

app.get("/", function(request, response){
    response.sendFile('index.html');
});

app.get("/getAllNotes", function(request, response){
    mysql.connection.query("SELECT * FROM notes",
    function(err, result, fields) {
        // console.log(result);
        if (err) response.send(err);
        else response.json({notes: result});
    });
});

app.get("/addNote", function(request, response){
    mysql.connection.query("INSERT INTO notes(text, date) VALUES(?, now())", request.query.text,
    function(err, result, fields) {
        if (err) response.send(err);
        else response.send(result);
    });
});

app.get("/deleteNoteById", function(request, response){
    mysql.connection.query("DELETE FROM notes WHERE id=?", request.query.id,
    function(err, result, fields) {
        if (err) response.send(err);
        else response.send(result);
    });
});

app.get("/upDateNoteById", function(request, response){
    mysql.connection.query("UPDATE notes SET text=? WHERE id=?", [request.query.text ,request.query.id],
    function(err, result, fields) {
        console.log(result);
        if (err) response.send(err);
        else response.send(result);
    });
});

// app.listen(3000);

io.on('connection', function(socket){
    socket.on('updateList', function() {
        socket.broadcast.emit('updateList');
    });
});

http.listen(3000, function(){
    console.log('listening on *:3000');
});









/*
const http = require("http");
const fs = require("fs");

const Connection = require('./connectionDB');
  
http.createServer(function(request, response){
    console.log(`Запрошенный адрес: ${request.url}`);

    var filePath = request.url.substr(1);
    switch (filePath) {
        case "":
        case "/":
        filePath = 'dist/index.html';
            break;
    
        default:
            break;
    }

    fs.readFile(filePath, function(error, data){
        if(error){
            response.statusCode = 404;
            response.end("Resourse not found!");
        }   
        else{
            response.end(data);
        }
    });

}).listen(3000, function(){
    console.log("Server started at 3000");
//     Connection.setConnection();
//     Connection.showData();
//     Connection.closeConnection();
});
*/