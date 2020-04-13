/*
* 封装数据库通用api
* */
const mysql = require('mysql');
exports.base = (sql,data,callback)=>{
    const connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : '',
        database : 'book'
    });
    connection.connect();
    //数据库的操作也是异步的
    connection.query(sql,data, function (error, results, fields) {
        if (error) throw error;
        callback(results);
    });
    connection.end();
};