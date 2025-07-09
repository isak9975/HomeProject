--email 1111@1111.com 비번 11111111

INSERT INTO usertable (
    user_email,
    user_password,
    user_nickname,
    user_img,
    user_create_at,
    user_update_at
    ) VALUES (
    '1111@1111.com',
    '$2a$10$hC3rU3P2UrXSZtHgLDkvI.a1YaHs0T5YgQ22SS1c2wq.QSSxK9wbS',
    '관리자1',
    'default.jpg',
    now(),
    now()
);
