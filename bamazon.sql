DROP DATABASE IF EXISTS bamazonDB;

CREATE DATABASE bamazonDB;

USE bamazonDB;

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY mykeys.ID.SECRET_ID;
