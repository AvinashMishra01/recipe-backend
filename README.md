This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

# Make the .env.local
* for the local Postgres SQL use make your own .env.local and config it with these credentials:

USER_NAME= "postgres"
DB_PASSWORD= "< Your Password"
HOST_NAME= "localhost"
DB_PORT= "5432" // default port 
DB_NAME= "<Your Database Name "

* Make the table name recipedatabase inside this and make the col name 
id-> primary autoincrement ;
recipe_name: varchar
instruction; varchar
ingredients: varchar
data: date

## SQL command :
CREATE TABLE recipedatabase (
    id SERIAL PRIMARY KEY,
    recipe_name VARCHAR(255),
    instructions VARCHAR(1024),
    ingredients VARCHAR(1024),
    date DATE
);

## Run the application 
now run the application with the command: "npm run dev" 
* Ensure that it's running on 3000 otherwise you have to change the angular mainUrl in the service 

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
