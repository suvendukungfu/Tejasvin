import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

export const mysqlPool = mysql.createPool({
    uri: process.env.MYSQL_URI || 'mysql://root:rootpassword@localhost:3306/hidden_heritage',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const connectMysql = async (retries = 5, delay = 2000) => {
    for (let i = 0; i < retries; i++) {
        try {
            const connection = await mysqlPool.getConnection();
            console.log('MySQL Connected successfully');
            connection.release();
            return;
        } catch (error) {
            console.error(`MySQL Connection failed (Attempt ${i + 1}/${retries}):`, (error as any).message);
            if (i < retries - 1) {
                await wait(delay);
            } else {
                console.error('Max retries reached. Could not connect to MySQL.');
                throw error;
            }
        }
    }
};
