CREATE TABLE IF NOT EXISTS shopping_lists (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  active BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS shopping_list_items (
  id SERIAL PRIMARY KEY,
  shopping_list_id INTEGER NOT NULL REFERENCES shopping_lists(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  collected BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE INDEX IF NOT EXISTS shopping_list_items_shopping_list_id_idx
  ON shopping_list_items (shopping_list_id);
