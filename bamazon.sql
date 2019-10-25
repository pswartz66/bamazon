-- DROP DATABASE IF EXISTS bamazonDB;

CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products(

    id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(30) NULL,
    dept_name VARCHAR(30) NULL,
    price DECIMAL(10, 2) NULL,
    stock_quantity INT default 0,
    PRIMARY KEY (id)

);



