const {Pool} = require('pg');

const pool =new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'apec_lk_db',
    password: 'avishka.1997',
    port: 5432,
});

module.exports ={
    pool,
}