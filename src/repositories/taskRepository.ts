import pool from "./../db.js";
import Task from "./../types/task.js";

export async function findAll(): Promise<Task[]> {
  const result = await pool.query(`
    SELECT id, title, done
    FROM tasks
    ORDER BY id
  `);

  return result.rows;
}

export async function findById(id: number): Promise<Task | undefined> {
  const result = await pool.query(
    `
      SELECT id, title, done
      FROM tasks
      WHERE id = $1
    `,
    [id],
  );

  return result.rows[0];
}

export async function createTask(title: string): Promise<Task> {
  const result = await pool.query(
    `
      INSERT INTO tasks (title, done)
      VALUES ($1, false)
      RETURNING id, title, done
    `,
    [title],
  );

  return result.rows[0];
}

export async function updateTask(
  id: number,
  title: string | undefined,
  done: boolean | undefined,
): Promise<Task | undefined> {
  const result = await pool.query(
    `
      UPDATE tasks
      SET
        title = COALESCE($1, title),
        done = COALESCE($2, done)
      WHERE id = $3
      RETURNING id, title, done
    `,
    [title, done, id],
  );

  return result.rows[0];
}

export async function deleteTask(id: number): Promise<boolean> {
  const result = await pool.query(
    `
      DELETE FROM tasks
      WHERE id = $1
    `,
    [id],
  );

  return result.rowCount === 1;
}
