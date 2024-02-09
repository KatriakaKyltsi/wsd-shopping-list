import { sql } from "../database/database.js";

const completeById = async(id) => {
    await sql`UPDATE shopping_lists SET active = false WHERE id = ${id}`;
};

const create = async (name1) => {
    await sql`INSERT INTO shopping_lists (name) VALUES (${name1})`;  
};

const findAllNonCompletedLists = async () => {
    return await sql`SELECT * FROM shopping_lists WHERE active = true`;
};

const findById = async (id) => {
    const rows = await sql`SELECT * FROM shopping_lists WHERE id = ${id}`;

    if (rows && rows.length > 0){
        return rows[0];
    }
    return {id: 0, name:"Unknown"};
};

const CountLists = async () => {
    const rows = await sql`SELECT COUNT(*) AS count FROM shopping_lists`;
    return rows[0].count;
};

export { completeById, CountLists, create, findAllNonCompletedLists, findById };
