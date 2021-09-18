const moment = require('moment');
const {Pool} = require('pg');

const poolProps = {connectionString: process.env.DATABASE_URL}

if (process.env.NODE_ENV !== 'DEV')
    poolProps.ssl = {rejectUnauthorized: false}

const pool = new Pool(poolProps);

const testConnection = async () => {
    const connection = await pool.connect();
    const res = await pool.query('SELECT NOW() as now')
    console.info('Connected with database at', moment(res.rows[0].now).format('LLLL'));
    await connection.release();
}

testConnection()
    .catch(error => {
        console.error("Could not connect to database", error);
        process.exit(-1);
    });

module.exports = pool;
