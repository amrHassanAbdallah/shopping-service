CREATE TABLE users(id SERIAL PRIMARY KEY, username VARCHAR unique, first_name VARCHAR(100) not null , last_name varchar(100) not null , password_digest VARCHAR);
