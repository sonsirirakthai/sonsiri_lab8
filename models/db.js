const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root', // เปลี่ยนตามผู้ใช้งาน MySQL ของคุณ
    password: '', // เปลี่ยนตามรหัสผ่าน MySQL ของคุณ
    database: 'supermarket_db'
});

module.exports = pool;