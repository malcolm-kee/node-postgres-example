CREATE TABLE end_users (
    username text PRIMARY KEY,
    password text,
    email text
);

INSERT INTO end_users (username, password, email)
VALUES ('malcolm-kee', '123456', 'malcolm.keeweeesiong@gmail.com'),
    ('stanley', 'password', 'stanley@test.com');

CREATE TABLE products (
    id bigserial PRIMARY KEY,
    name text NOT NULL,
    price numeric(10, 2)
);

INSERT INTO products (name, price)
VALUES ('Nike Fast Shoes', 350),
    ('Gior Dano Shirt', 700),
    ('iPhone X', 3700),
    ('Macbook M1 Pro', 12700),
    ('Starbucks Tumbler', 90),
    ('Think and Grow Rich', 40),
    ('Badminton Racket', 100),
    ('Hup Seng Biscuit', 700);

CREATE TABLE movies (
	id bigserial PRIMARY KEY,
	title text,
	language text
);

INSERT INTO movies(title, language) 
VALUES ('Sing 2', 'EN'),
    ('Spider-Man: No Way Home', 'EN'),
    ('Demon Slayer', 'JP'),
    ('Parasite', 'KO'),
    ('The Hows of Us', 'TL'),
    ('Ultraman: A New Power of Singapore', 'JP');