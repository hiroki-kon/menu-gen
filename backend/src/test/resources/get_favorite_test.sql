DELETE FROM saved_recipe;
INSERT INTO saved_recipe (name, description, ingredients)
    VALUES (
        'スパゲッティ',
        'トマトソースを絡めたスパゲッティ',
        ARRAY ['スパゲッティ','トマト']
    );