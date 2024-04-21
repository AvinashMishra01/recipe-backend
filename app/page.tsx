// import { NextRequest, NextResponse } from "next/server";

// import { NextApiRequest, NextApiResponse } from "next";

// export const dynamic = "auto";
// export const dynamicParams = true; // true | false,

// export const revalidate = false;

// export default async function handler(req: NextRequest, res: NextResponse) {
//   console.log("req in main route", req);
//   // Handle different HTTP methods
//   if (req.method === "GET") {
//     // Handle GET request to get all recipes
//     // Implement your logic here
//     // /'res.status(200).json({ message: "Recipe fetched successfully" });
//     // return NextResponse.json(
//     //   { message: "Recipe fetched successfully" },
//     //   { status: 200 }
//     // );
//   } else if (req.method === "POST") {
//     // Handle POST request to create a new recipe
//     // Implement your logic here
//     return NextResponse.json(
//       { message: "Recipe created successfully" },
//       { status: 200 }
//     );
//     // res.status(200).json({ message: "Recipe created successfully" });
//   } else {
//     console.log("req in main route", req);
//     // Handle other HTTP methods
//     return NextResponse.json(
//       { message: "Recipe fetched successfully" },
//       { status: 405 }
//     );
//     // res.status(405).end(); // Method Not Allowed
//   }
// }
// export { handler as GET, handler as PUT, handler as DELETE };
