require("dotenv").config();

const mysql = require("mysql2/promise");
const fs = require("fs");
const path = require("path");

async function run() {
  let connection;

  try {
    // Connect without specifying database first (schema.sql will CREATE DATABASE and USE styla)
    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT || 3306,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      multipleStatements: true,
    });
    console.log("Connected to MySQL successfully!");
    console.log("\n--- Applying schema.sql ---");
    const schema = fs.readFileSync(path.join(__dirname, "schema.sql"), "utf8");
    await connection.query(schema);
    console.log("Schema applied successfully!");

    // Close and reconnect with database specified for seed data
    await connection.end();
    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT || 3306,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      multipleStatements: true,
    });

    console.log("\n--- Applying seed.sql ---");
    const seed = fs.readFileSync(path.join(__dirname, "seed.sql"), "utf8");
    await connection.query(seed);
    console.log("Seed data applied successfully!");

    const dbName = process.env.DB_NAME;

    const [products] = await connection.query(
      `SELECT COUNT(*) AS count FROM ${dbName}.PRODUCTS`,
    );

    console.log(`Total products: ${products[0].count}`);

    const [women] = await connection.query(
      `SELECT COUNT(*) AS count FROM ${dbName}.PRODUCTS WHERE gender='women'`,
    );

    console.log(`Women products: ${women[0].count}`);

    const [men] = await connection.query(
      `SELECT COUNT(*) AS count FROM ${dbName}.PRODUCTS WHERE gender='men'`,
    );

    console.log(`Men products: ${men[0].count}`);

    const [categories] = await connection.query(
      `SELECT COUNT(*) AS count FROM ${dbName}.CATEGORIES`,
    );

    console.log(`Categories: ${categories[0].count}`);

    const [images] = await connection.query(
      `SELECT COUNT(*) AS count FROM ${dbName}.PRODUCTS_IMAGES`,
    );

    console.log(`Product images: ${images[0].count}`);

    const [variants] = await connection.query(
      `SELECT COUNT(*) AS count FROM ${dbName}.VARIANT`,
    );

    console.log(`Variants: ${variants[0].count}`);

    const [reviews] = await connection.query(
      `SELECT COUNT(*) AS count FROM ${dbName}.REVIEWS`,
    );

    console.log(`Reviews: ${reviews[0].count}`);

    console.log("\n✅ Database setup complete!");
  } catch (error) {
    console.error(error);

    if (error.sql) {
      console.log(error.sql.substring(0, 300));
    }
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

run();
