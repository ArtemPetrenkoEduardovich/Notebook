const mysql = require("mysql2");
  
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "notebook",
    password: "1243"
});

    // тестирование подключения
function setConnection() {
    connection.connect(function(err){
        if (err) {
            return console.error("Ошибка: " + err.message);
        }
        else{
            console.log("Подключение к серверу MySQL успешно установлено");
        }
    });
}

    // закрытие подключения
function closeConnection() {
    connection.end(function(err) {
        if (err) {
            return console.log("Ошибка: " + err.message);
        }
        console.log("Подключение закрыто");
    });
}

function showData() {
    connection.query("SELECT * FROM notes",
    function(err, results, fields) {
        console.log(err);
        console.log(results); // собственно данные
        // console.log(fields); // мета-данные полей 
    });
}module.exports.showData = showData;

module.exports.connection = connection;
module.exports.setConnection = setConnection;
module.exports.closeConnection = closeConnection;