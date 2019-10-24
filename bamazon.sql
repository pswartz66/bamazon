DROP DATABASE IF EXISTS bamazonDB;

CREATE DATABASE bamazonDB;

USE bamazonDB;

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY mysql_native_password;


CREATE TABLE products (

    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(30) NULL,
    dept_name VARCHAR(30) NULL,
    price DECIMAL(10, 2) NULL,
    stock_quantity INT default 0

);

INSERT INTO products (product_name, dept_name, price, stock_quantity) 
VALUE ('samsung tv', 'electronics', 500.00, 3);

INSERT INTO products (product_name, dept_name, price, stock_quantity) 
VALUE ('trek bike', 'outdoors', 300.00, 5);

INSERT INTO products (product_name, dept_name, price, stock_quantity) 
VALUE ('peanut butter', 'foods', 4.00, 20);