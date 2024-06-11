CREATE TABLE saved_recipe (
    recipe_id SERIAL PRIMARY KEY,
    name TEXT,
    description TEXT,
    ingredients TEXT[]
);