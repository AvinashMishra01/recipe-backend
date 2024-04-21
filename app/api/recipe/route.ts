// for local postgress sql
// import { pool } from "@/database/postgres";
// import dbConnect from "@/database/postgres";

// for vercel postgres sql
import { db } from "@vercel/postgres";

import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";
import createRecipeDate from "@/utils/helper";
// const createRecipeDate = async () => {
//   let today = new Date();
//   let dd = String(today.getDate()).padStart(2, "0");
//   let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
//   let yyyy = today.getFullYear();
//   return yyyy + "-" + mm + "-" + dd;
// };

export const GET = async (req: NextApiRequest) => {
  try {
    // for vercel
    const client = await db.connect();
    const result = await client.query("select * from recipedatabase");

    // for local
    // await dbConnect();
    // const result = await pool.query("select * from recipedatabase");
    return NextResponse.json({ data: result.rows }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ erorr: "No api call" }, { status: 500 });
  }
};

export const POST = async (req: NextRequest) => {
  try {
    let body = await req.json();
    let today = await createRecipeDate();
    console.log("post in main route", body, today);
    const { recipe_name, ingredients, instructions } = body;

    //for vercel
    const client = await db.connect();
    const result = await client.query(
      "insert into recipedatabase (recipe_name, ingredients, instructions, date) values ($1, $2, $3, $4) returning *",
      [recipe_name, ingredients, instructions, today]
    );

    // for local
    // await dbConnect();
    // const result = await pool.query(
    //   "insert into recipedatabase (recipe_name, ingredients, instructions, date) values ($1, $2, $3, $4) returning *",
    //   [recipe_name, ingredients, instructions, today]
    // );
    console.log("save data -------------", result);
    // * Note if you are using the local then chage the condition=>   (result.rowsCount === 0)
    if (result.rowCount === 0) {
      return NextResponse.json(
        { data: "Recipe not save ", error: true },
        { status: 400 }
      );
    } else {
      return NextResponse.json(
        { data: "Recipe save Successfully", error: false },
        { status: 200 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: "No api call in save recipe " },
      { status: 500 }
    );
  }
};
