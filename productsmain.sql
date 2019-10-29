
-- ALTER TABLE bamazonDB.productsmain
	-- ADD
    -- quantity DECIMAL(10,0) NOT NULL;
  

-- UPDATE bamazonDB.productsmain
-- SET quantity = FLOOR(RAND()*(50-1+1))+1;

-- INSERT INTO productsmain (quantity)
-- VALUE (quantity);

-- SELECT * FROM bamazonDB.productsmain WHERE shelf_price BETWEEN 1 and 10 ORDER BY rand() LIMIT 10;
 -- SELECT * FROM bamazonDB.productsmain;

-- SELECT COLUMN_NAME
  -- FROM INFORMATION_SCHEMA.COLUMNS
  -- WHERE TABLE_SCHEMA = 'bamazonDB' AND TABLE_NAME = 'productsmain';



-- SELECT * FROM bamazonDB.productsmain WHERE item_description LIKE '%JIM BEAM%';

-- AS 'Currency Format' FROM bamazonDB.productsmain;

-- DELETE FROM bamazonDB.productsmain WHERE item_no IS NULL;


-- UPDATE bamazonDB.productsmain
-- SET quantity = quantity - 1
-- WHERE item_no = 185;

SELECT * FROM bamazonDB.productsmain ORDER BY item_no LIMIT 10;

UPDATE bamazonDB.productsmain
SET quantity = quantity - 20
WHERE item_no = 185 and quantity = 20;



DELIMITER $$

CREATE PROCEDURE checkInventory()

BEGIN

	IF EXISTS (SELECT * FROM bamazonDB.productsmain WHERE item_no = ? AND quantity <= 0) THEN
    
		UPDATE bamazonDB.productsmain	
		SET quantity = quantity + 20
		WHERE item_no = ? and quantity = 0;
    
    END IF;
 
 END$$;

DELIMITER ;

CALL checkInventory();
 





-- SELECT item_no FROM bamazonDB.productsmain LIMIT 10;

-- SELECT * FROM bamazonDB.productsmain WHERE shelf_price > 2000;