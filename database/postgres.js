import { Pool } from "pg";

export const pool = new Pool({
  user: process.env.USER_NAME,
  password: process.env.DB_PASSWORD,
  host: process.env.HOST_NAME,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
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
