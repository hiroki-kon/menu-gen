CREATE TABLE week (
    week_id SERIAL PRIMARY KEY,
    start_at DATE
);

CREATE TABLE weekly_recipe (
    recipe_id SERIAL PRIMARY KEY,
    name TEXT,
    description TEXT,
    ingredients TEXT[]
);

CREATE TABLE weekly_recipes (
    week_id INTEGER,
    recipe_id INTEGER,
    day_num INTEGER,

    PRIMARY KEY(week_id, recipe_id),
    FOREIGN KEY (week_id) REFERENCES week(week_id),
    FOREIGN KEY (recipe_id) REFERENCES weekly_recipe(recipe_id)
);