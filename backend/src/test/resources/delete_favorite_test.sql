DELETE FROM saved_recipe;
INSERT INTO saved_recipe
    VALUES (
        1,
        'スパゲッティ',
        'トマトソースを絡めたスパゲッティ',
        ARRAY ['スパゲッティ','トマト']
    );