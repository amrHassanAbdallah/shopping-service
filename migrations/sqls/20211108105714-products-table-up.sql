CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(64) NOT NULL,
    price NUMERIC(10,3) NOT NULL,
    category  varchar(64)
);
