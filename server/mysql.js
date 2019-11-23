const mysql = require("mysql2");
  
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "notebook",
    password: "1243"
});

function setConnection() {
    connection.connect(function(err){
        if (err) return console.error("Ошибка: " + err.message);
        else console.log("Подключение к серверу MySQL успешно установлено");
    });
}

function closeConnection() {
    connection.end(function(err) {
        if (err) return console.log("Ошибка: " + err.message);
        console.log("Подключение закрыто");
    });
}

module.exports.connection = connection;
module.exports.setConnection = setConnection;
module.exports.closeConnection = closeConnection
