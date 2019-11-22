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
