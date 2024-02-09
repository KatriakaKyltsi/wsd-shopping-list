import { sql } from "../database/database.js";

const createItem = async (id, name) => {
  await sql`INSERT INTO shopping_list_items (shopping_list_id, name)
    VALUES (${id}, ${name})`;
};

const findItems = async (id) => {
  return await sql`SELECT * FROM shopping_list_items WHERE shopping_list_id = ${id} ORDER BY collected ASC, name ASC`;
};

const deleteItems = async (id) => {
  try {
    await sql`UPDATE shopping_list_items SET collected = true WHERE id = ${ id }`;
  } catch (e) {
    console.log(e);
  }
};

const CountItems = async () => {
  const result = await sql`SELECT COUNT(*) AS count FROM shopping_list_items`;
  return result[0].count;
};

export { createItem, findItems, deleteItems, CountItems};