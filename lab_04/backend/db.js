let mysql = require("mysql");

// set up database connection for ingesting data
let con = mysql.createConnection({
    host: "webcourse.cs.nuim.ie",
    user: "u240829",
    password: "diighahxi7Pee2ed",
    database: "cs230_u240829"
});

/////// YOU CAN RUN THIS APP ONLY ONCE BECAUSE I SET COLUMNS mobile and email UNIQUE, and hard-crafted foreign keys -> not possible to add same hard-crafted data //////////

// pre-fill database USERS with some data

// Establish connection and perform query
con.connect(function(err) {
    if (err) throw err;

    // create schemas tables home_address, shipping_address and users
    // users
    let sql_create_table_users = "CREATE TABLE IF NOT EXISTS users (user_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,title VARCHAR(10),first_name VARCHAR(50) NOT NULL,surname VARCHAR(50) NOT NULL,mobile VARCHAR(50) UNIQUE NOT NULL,email VARCHAR(50) UNIQUE NOT NULL);";
    con.query(sql_create_table_users, function (error, result) {
        if (error) throw error;
        console.log("Created schema for table users")
        console.log(JSON.stringify(result, null, '\t'));
    });
    // home_address
    let sql_create_table_home_address = "CREATE TABLE IF NOT EXISTS home_address (home_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,home_address_line_1 VARCHAR(70) NOT NULL,home_address_line_2 VARCHAR(70),home_town VARCHAR(50) NOT NULL,home_city VARCHAR(50) NOT NULL,home_eircode VARCHAR(50),user_id INT UNSIGNED,FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE ON UPDATE CASCADE);";
    con.query(sql_create_table_home_address, function (error, result) {
        if (error) throw error;
        console.log("Created schema for table home_address")
        console.log(JSON.stringify(result, null, '\t'));
    });
    // shipping_address
    let sql_create_table_shipping_address = "CREATE TABLE IF NOT EXISTS shipping_address (shipping_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,shipping_address_line_1 VARCHAR(70) NOT NULL,shipping_address_line_2 VARCHAR(70),shipping_town VARCHAR(50) NOT NULL,shipping_city VARCHAR(50) NOT NULL,shipping_eircode VARCHAR(50),user_id INT UNSIGNED,FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE ON UPDATE CASCADE);";
    con.query(sql_create_table_shipping_address, function (error, result) {
        if (error) throw error;
        console.log("Created schema for table shipping_address")
        console.log(JSON.stringify(result, null, '\t'));
    });

    //  For the C (create) activity you should demonstrate how to create the user record (personal and address), and add it to the database
    // ingest data for table users
    let users_values = [
        "INSERT INTO users (title, first_name, surname, mobile, email) VALUES ('Mr', 'Tomas', 'Hatas', '7897987979', 'tomas.hatas@mu.ie')",
        "INSERT INTO users (title, first_name, surname, mobile, email) VALUES ('Mr', 'Petr', 'Smith', '53456', 'peter.smith@mu.ie')",
        "INSERT INTO users (title, first_name, surname, mobile, email) VALUES ('Mr', 'Jan', 'Tuc', '987654', 'jan.tuc@mu.ie')",
        "INSERT INTO users (title, first_name, surname, mobile, email) VALUES ('Mrs', 'Jana', 'Tok', '2345699', 'jana.tok@mu.ie')",
        "INSERT INTO users (title, first_name, surname, mobile, email) VALUES ('Ms', 'Zuzana', 'Pavla', '9712442', 'zuzana.pavla@mu.ie')",
        "INSERT INTO users (title, first_name, surname, mobile, email) VALUES ('Ms', 'Jiri', 'Hatas', '565656', 'jiri.hatas@mu.ie')"
        ]
    for (let i = 0; i < users_values.length; i++) {
        let sql_insert_into_users = users_values[i];
        con.query(sql_insert_into_users, function (error, result) {
            if (error) throw error;
            console.log("Ingested backend created user", i+1)
            console.log(JSON.stringify(result, null, '\t'));
        });
    }

    // ingest data for table home_address
    let home_address_values = [
        "INSERT INTO home_address (home_address_line_1, home_town, home_city, user_id) VALUES ('Castle Dawson 19', 'Maynooth', 'Kildare', 1)",
        "INSERT INTO home_address (home_address_line_1, home_address_line_2, home_town, home_city, home_eircode, user_id) VALUES ('Castle Dawson 33', 'No name', 'Maynooth', 'Kildare', 'WE3YZE', 2)",
        "INSERT INTO home_address (home_address_line_1, home_address_line_2, home_town, home_city, user_id) VALUES ('Castle Dawson 89', 'No name', 'Maynooth', 'Kildare', 3)",
        "INSERT INTO home_address (home_address_line_1, home_town, home_city, user_id) VALUES ('Springs Road 39', 'Dublin', 'Dublin', 4)",
        "INSERT INTO home_address (home_address_line_1, home_town, home_city, user_id) VALUES ('Springs Road 12', 'Dublin', 'Dublin', 5)",
        "INSERT INTO home_address (home_address_line_1, home_town, home_city, user_id) VALUES ('Springs Road 122', 'Dublin 3', 'Dublin 3', 6)"
        ]
    for (let a = 0; a < home_address_values.length; a++) {
        let sql_insert_into_home_address = home_address_values[a];
        con.query(sql_insert_into_home_address, function (error, result) {
            if (error) throw error;
            console.log("Ingested backend created home address for user", a+1)
            console.log(JSON.stringify(result, null, '\t'));
        });
    }

    // ingest data for table shipping_address
    let shipping_address_values = [
        "INSERT INTO shipping_address (shipping_address_line_1, shipping_town, shipping_city, user_id) VALUES ('Castle Dawson 99', 'Maynooth', 'Kildare', 1)",
        "INSERT INTO shipping_address (shipping_address_line_1, shipping_address_line_2, shipping_town, shipping_city, shipping_eircode, user_id) VALUES ('Castle Dawson 33', 'No name', 'Maynooth', 'Kildare', 'WE3YZE', 2)",
        "INSERT INTO shipping_address (shipping_address_line_1, shipping_address_line_2, shipping_town, shipping_city, user_id) VALUES ('Castle Dawson 89', 'No name', 'Maynooth', 'Kildare', 3)",
        "INSERT INTO shipping_address (shipping_address_line_1, shipping_town, shipping_city, user_id) VALUES ('Springs Road 99', 'Dublin', 'Dublin', 4)",
        "INSERT INTO shipping_address (shipping_address_line_1, shipping_town, shipping_city, user_id) VALUES ('Springs Road 12', 'Dublin', 'Dublin', 5)",
        "INSERT INTO shipping_address (shipping_address_line_1, shipping_town, shipping_city, user_id) VALUES ('Springs Road 122', 'Dublin 5', 'Dublin 5', 6)"
        ]
    for (let b = 0; b < shipping_address_values.length; b++) {
        let sql_insert_into_shipping_address = shipping_address_values[b]
        con.query(sql_insert_into_shipping_address, function (error, result) {
            if (error) throw error;
            console.log("Ingested backend created shipping address for user", b+1)
            console.log(JSON.stringify(result, null, '\t'));
        });
    }

    // For the R (retrieve/search) activity, you should randomly select and return all users matching a supplied name.
    con.query("SELECT * FROM users, home_address, shipping_address WHERE surname LIKE '%Hatas%' AND home_address.user_id = users.user_id AND shipping_address.user_id = users.user_id", function(err, result) {
        if (err) throw err;
        console.log("Ingested backend retrieved all users with related data when matching supplied name Hatas")
        console.log(JSON.stringify(result, null, '\t'));
    });

    //For the U (Update) you should update three elements of a specified user record (Phone, Email, Title) and all or any of their Address data.
    // update users table for user_id 1
    con.query("UPDATE users SET title = 'Dr', mobile = '9999999', email = 'test@gmail.com' WHERE user_id = 1", function(err, result) {
        if (err) throw err;
        console.log("Ingested backend updated users table for user_id 1")
        console.log(JSON.stringify(result, null, '\t'));
    });

    // update home_address table for user_id 1
    con.query("UPDATE home_address SET home_address_line_1 = 'home 1 up', home_address_line_2 = 'hope 2 up', home_town = 'home town up', home_city = 'home city up', home_eircode = 'home eir up' WHERE user_id = 1", function(err, result) {
        if (err) throw err;
        console.log("Ingested backend updated home_address table for user_id 1")
        console.log(JSON.stringify(result, null, '\t'));
    });

    // update shipping address for user_id 1
    con.query("UPDATE shipping_address SET shipping_address_line_1 = 'ship 1 up', shipping_address_line_2 = 'ship 2 up', shipping_town = 'ship town up', shipping_city = 'ship city up', shipping_eircode = 'ship eir up' WHERE user_id = 1", function(err, result) {
        if (err) throw err;
        console.log("Ingested backend updated shipping_address table for user_id 1")
        console.log(JSON.stringify(result, null, '\t'));
    });

    // For the D (delete ) activity, please delete all records for a user matching a combination of Email, Phone and Name.
    con.query("DELETE FROM users WHERE first_name = 'Jiri' AND surname = 'Hatas' AND mobile = '565656' AND email = 'jiri.hatas@mu.ie' ", function(err, result) {
        if (err) throw err;
        console.log("Ingested backend deleted user matching a combination of first_name Jiri, surname Hatas, email jiri.hatas@mu.ie, mobile 565656")
        console.log(JSON.stringify(result, null, '\t'));
    });


    // Disconnect from the database
    con.end(function(err) {
        if (err) throw err;
    });
    
});

// create a new connection for keep running the app
// mysql2 is improvement of mysql
let mysql2 = require("mysql2/promise");

// create connection with database USERS
// createPool method reduce time spent connecting to the MySQL and not necessary to close => improvement of mysql
let pool = mysql2.createPool({
    host: "webcourse.cs.nuim.ie",
    user: "u240829",
    password: "diighahxi7Pee2ed",
    database: "cs230_u240829"
})

module.exports = pool