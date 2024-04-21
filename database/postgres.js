// import { Pool } from "pg";

//   const pool = new Pool({
//   user: process.env.USER_NAME ,  //|| "postgres",
//   password: process.env.DB_PASSWORD, // || "root",
//   host: process.env.HOST_NAME,// || "localhost",
//   port: process.env.DB_PORT, // || 5432,
//   database:process.env.DB_NAME, // "new_db",
// });

// export default pool;

import { release } from "os";
import { Pool } from "pg";

export const pool = new Pool({
  user: process.env.USER_NAME, //|| "postgres",
  password: process.env.DB_PASSWORD, // || "root",
  host: process.env.HOST_NAME, // || "localhost",
  port: process.env.DB_PORT, // || 5432,
  database: process.env.DB_NAME, // "new_db",
});

export default async function dbConnect() {
  await pool.connect((error, client, release) => {
    if (error) {
      return console.error(
        "Error in connecting to db",
        error.stack,
        "erorr ",
        error
      );
    }
    client.query("SELECT NOW()", (error, result) => {
      release();
      if (error) {
        return console.error("Error in querry ", error, error.stack);
      }
      console.log(" Connected to database ", result.rows);
    });
  });
}
