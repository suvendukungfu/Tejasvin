import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

export const mysqlPool = mysql.createPool({
    uri: process.env.MYSQL_URI || 'mysql://root:rootpassword@localhost:3306/hidden_heritage',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

export const connectMysql = async () => {
    try {
        const connection = await mysqlPool.getConnection();
        console.log('MySQL Connected successfully');
        connection.release();
    } catch (error) {
        console.error('MySQL Connection failed:', error);
        throw error;
    }
};
