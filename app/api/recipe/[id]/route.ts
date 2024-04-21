import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/database/postgres";
import dbConnect from "@/database/postgres";
export const GET = async (req: NextRequest) => {
  const urlParts = req.url ? req.url.split("/") : [];
  const recipeId = urlParts[5];
  try {
    await dbConnect();
    // const client = await pool.connect();
    // const result = await client.query(
    const result = await pool.query(
      "SELECT * FROM recipedatabase WHERE id = $1",
      [recipeId]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { data: result.rows, error: "Recipe not found" },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { data: result.rows, error: false },
        { status: 200 }
      );
    }
  } catch (err) {
    console.error("Error executing query", err);
    return NextResponse.json(
      { error: "Recipe not found catch" },
      { status: 500 }
    );
  }
};

export const date = async () => {
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  let yyyy = today.getFullYear();
  return yyyy + "-" + mm + "-" + dd;
};

export const PUT = async (
  req: NextRequest,
  { params }: { params: { id: number } }
) => {
  let body = await req.json();
  let recipeId = params.id;
  const { recipe_name, ingredients, instructions } = body;
  let today = date();
  try {
    await dbConnect();
    // const client = await pool.connect();
    // const result = await client.query(
    const result = await pool.query(
      "UPDATE recipedatabase SET recipe_name=$1, ingredients=$2, instructions=$3, date=$4 WHERE id=$5 RETURNING *",
      [recipe_name, ingredients, instructions, today, recipeId]
    );

    console.log("result is ", result);
    if (result.rowsCount === 0) {
      return NextResponse.json(
        { data: "Recipe not Not Update", erorr: true },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { data: "Recipe Updated Successfully", error: false },
        { status: 200 }
      );
    }
  } catch (err) {
    console.error("Error executing query", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { id: number } }
) => {
  const recipeId = params.id;
  try {
    const client = await pool.connect();
    await client.query("DELETE FROM recipedatabase WHERE id=$1", [recipeId]);
    return NextResponse.json(
      { data: "Recipe Deleted Successfully", error: false },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error executing query", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
