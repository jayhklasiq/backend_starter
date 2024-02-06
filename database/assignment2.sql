-- query 1
INSERT INTO account
(
	account_firstname,
	account_lastname,
	account_email,
	account_password
)	
	VALUES
(
	'Tony',
	'Stark',
	'tony@starknet.com',
	'Iam1ronM@n'
)


-- query 2
UPDATE account
SET account_type = 'Admin' 
WHERE account_firstname = 'Tony';


-- query 3
DELETE FROM account
WHERE account_firstname = 'Tony';


-- query 4
UPDATE inventory
SET inv_description = REPLACE (inv_description, 'small interiors', 'a huge interior')
WHERE inv_make = 'GM' and inv_model = 'Hummer';


-- query 5
SELECT 
	i.inv_make,
	i.inv_model,
	c.classification_name
FROM
	inventory AS i
INNER JOIN 
	classification AS c
ON 
	i.classification_id = c.classification_id
WHERE
	c.classification_name = 'Sport';


--  query 6
UPDATE inventory
SET inv_image = REPLACE (inv_image, 'images/', 'images/vehicles/'), 
	inv_thumbnail = REPLACE (inv_thumbnail, 'images/', 'images/vehicles/')