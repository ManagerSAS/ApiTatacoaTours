const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORDB,
    database: process.env.DB
})

mysqlConnection.connect(function(err){
    if(err){
        console.log(err)
        return
    }else{
        console.log('Database is connected')
    }
})

module.exports = mysqlConnection