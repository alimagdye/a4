import { Pool } from "pg";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is not defined");
}

const pool = new Pool({
  connectionString: databaseUrl,
});

async function initializeDatabase() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS tasks (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      done BOOLEAN NOT NULL
    )
  `);

  const result = await pool.query("SELECT COUNT(*) FROM tasks");

  if (result.rows[0].count === "0") {
    await pool.query(`
      INSERT INTO tasks (title, done)
      VALUES
        ('Learn Express', true),
        ('Build Task API', false),
        ('Push to GitHub', false)
    `);
  }
}

initializeDatabase()
  .then(() => {
    console.log("Database initialized");
  })
  .catch((error) => {
    console.error("Database initialization failed:", error);
  });

export default pool;
