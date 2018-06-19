CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE goods (
	id INT AUTO_INCREMENT NOT NULL,
    item_quant SMALLINT NOT NULL,
    item_name VARCHAR(60) NOT NULL,
    item_category VARCHAR(60) NOT NULL,
    PRIMARY KEY (id)
);

SELECT * FROM goods;