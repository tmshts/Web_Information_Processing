
/* use USERS database */
/* USE cs230_u240829; */


/* create schema in database before running app */
/* create table users in USERS database with foreign keys */
CREATE TABLE IF NOT EXISTS users (
    user_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(10),
    first_name VARCHAR(50) NOT NULL,
    surname VARCHAR(50) NOT NULL,
    mobile VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL
);

/* create table home_address in USERS database */
CREATE TABLE IF NOT EXISTS home_address (
    home_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    home_address_line_1 VARCHAR(70) NOT NULL,
    home_address_line_2 VARCHAR(70),
    home_town VARCHAR(50) NOT NULL,
    home_city VARCHAR(50) NOT NULL,
    home_eircode VARCHAR(50),
    user_id INT UNSIGNED,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE ON UPDATE CASCADE
);

/* create table shipping_address in USERS database */
CREATE TABLE IF NOT EXISTS shipping_address (
    shipping_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    shipping_address_line_1 VARCHAR(70) NOT NULL,
    shipping_address_line_2 VARCHAR(70),
    shipping_town VARCHAR(50) NOT NULL,
    shipping_city VARCHAR(50) NOT NULL,
    shipping_eircode VARCHAR(50),
    user_id INT UNSIGNED,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE ON UPDATE CASCADE
);


/* insert some values into table users in USERS database */
INSERT INTO users (title, first_name, surname, mobile, email) VALUES ('Mr.', 'Tomas', 'Hatas', '7897987979', 'tomas.hatas@mu.ie');
INSERT INTO users (title, first_name, surname, mobile, email) VALUES ('Mr.', 'Petr', 'Smith', '53456', 'peter.smith@mu.ie');
INSERT INTO users (title, first_name, surname, mobile, email) VALUES ('Mr.', 'Jan', 'Tuc', '987654', 'jan.tuc@mu.ie');
INSERT INTO users (title, first_name, surname, mobile, email) VALUES ('Mrs', 'Jana', 'Tok', '2345699', 'jana.tok@mu.ie');
INSERT INTO users (title, first_name, surname, mobile, email) VALUES ('Ms', 'Zuzana', 'Pavla', '9712442', 'zuzana.pavla@mu.ie');


/* insert some values into table home_address in USERS database */
INSERT INTO home_address (home_address_line_1, home_town, home_city, user_id) VALUES ('Castle Dawson 19', 'Maynooth', 'Kildare', 1);
INSERT INTO home_address (home_address_line_1, home_address_line_2, home_town, home_city, home_eircode, user_id) VALUES ('Castle Dawson 33', 'No name', 'Maynooth', 'Kildare', 'WE3YZE', 2);
INSERT INTO home_address (home_address_line_1, home_address_line_2, home_town, home_city, user_id) VALUES ('Castle Dawson 89', 'No name', 'Maynooth', 'Kildare', 3);
INSERT INTO home_address (home_address_line_1, home_town, home_city, user_id) VALUES ('Springs Road 39', 'Dublin', 'Dublin', 4);
INSERT INTO home_address (home_address_line_1, home_town, home_city, user_id) VALUES ('Springs Road 12', 'Dublin', 'Dublin', 5);


/* insert some values into table shipping_address in USERS database */
INSERT INTO shipping_address (shipping_address_line_1, shipping_town, shipping_city, user_id) VALUES ('Castle Dawson 99', 'Maynooth', 'Kildare', 1);
INSERT INTO shipping_address (shipping_address_line_1, shipping_address_line_2, shipping_town, shipping_city, shipping_eircode, user_id) VALUES ('Castle Dawson 33', 'No name', 'Maynooth', 'Kildare', 'WE3YZE', 2);
INSERT INTO shipping_address (shipping_address_line_1, shipping_address_line_2, shipping_town, shipping_city, user_id) VALUES ('Castle Dawson 89', 'No name', 'Maynooth', 'Kildare', 3);
INSERT INTO shipping_address (shipping_address_line_1, shipping_town, shipping_city, user_id) VALUES ('Springs Road 99', 'Dublin', 'Dublin', 4);
INSERT INTO shipping_address (shipping_address_line_1, shipping_town, shipping_city, user_id) VALUES ('Springs Road 12', 'Dublin', 'Dublin', 5);
