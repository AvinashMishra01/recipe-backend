import { pool } from "@/database/postgres";
import dbConnect from "@/database/postgres";
import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";
import { date } from "../../api/recipe/[id]/route";
export const GET = async (req: NextApiRequest) => {
  try {
    // const client = await pool.connect();
    await dbConnect();
    const result = await pool.query("select * from recipedatabase");
    // console.log("result is ", result);
    return NextResponse.json({ data: result.rows }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ erorr: "No api call" }, { status: 500 });
  }
};

export const POST = async (req: NextRequest) => {
  try {
    let body = await req.json();
    let today = await date();
    console.log("post in main route", body, today);
    const { recipe_name, ingredients, instructions } = body;
    await dbConnect();
    // const client = await pool.connect();

    const result = await pool.query(
      "insert into recipedatabase (recipe_name, ingredients, instructions, date) values ($1, $2, $3, $4) returning *",
      [recipe_name, ingredients, instructions, today]
    );
    console.log("save data -------------", result);

    if (result.rowsCount === 0) {
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
