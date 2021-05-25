-- CREATE TABLE user_list(
--     list_id SERIAL PRIMARY KEY,
--     user_id INT REFERENCES users(user_id)
--     mount_id INT REFERENCES mounts(mount_id),
--     minion_id INT REFERENCES minions(minion_id)
-- );

-- CREATE TABLE user_notes(
--     note_id SERIAL PRIMARY KEY,
--     user_id INT REFERENCES users(user_id),
--     note TEXT
-- );


DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS mounts;
DROP TABLE IF EXISTS minions;
DROP TABLE IF EXISTS user_to_minion;
DROP TABLE IF EXISTS user_to_mount;
DROP TABLE IF EXISTS user_notes;

CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50),
    password VARCHAR(500)
);

CREATE TABLE mounts(
    mount_id SERIAL PRIMARY KEY,
    mount_name VARCHAR(60),
    mount_description VARCHAR(150),
    mount_picture VARCHAR(500)
);

CREATE TABLE minions(
    minion_id SERIAL PRIMARY KEY,
    minion_name VARCHAR(60),
    minion_description VARCHAR(150),
    minion_picture VARCHAR(500)
);


CREATE TABLE user_to_minion(
    user_minion_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    minion_id INT REFERENCES minions(minion_id)
);

CREATE TABLE user_to_mount(
    user_mount_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    mount_id INT REFERENCES mounts(mount_id)
);

