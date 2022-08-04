// const { Pool } = require('pg');

const {Pool} =  require('pg');


const pool = new Pool({
user:"postgres",
password:"Kuhub*28",
host:"localhost",
port:5432,
database:"perntodo"
}
);
module.exports=pool;
