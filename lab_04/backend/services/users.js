const db = require('../db')

// query for all users
getUsers = async () => {
    try {
        let sql = "SELECT * FROM users, home_address, shipping_address WHERE home_address.user_id = users.user_id AND shipping_address.user_id = users.user_id ORDER BY users.user_id";
        // using destructing index to get 1st element of the entire array
        const [users] = await db.query(sql)
        return users;
    }
    catch (error) {
        return error.sqlMessage;
    }
}

// query for matching users based on name
getSelectedUsers = async (name) => {
    try {
        let sql = `SELECT * FROM users, home_address, shipping_address WHERE surname LIKE '%${name}%' AND home_address.user_id = users.user_id AND shipping_address.user_id = users.user_id ORDER BY users.user_id`;
        const [users] = await db.query(sql)
        return users;
    }
    catch (error) {
        return error.sqlMessage;
    }
}

// query for particular user based on id
getSelectedUserById = async (id) => {
    try {
        let sql = 'SELECT * FROM users, home_address, shipping_address WHERE users.user_id = ? AND home_address.user_id = users.user_id AND shipping_address.user_id = users.user_id';
        let values = parseInt(id);
        const [user] = await db.query(sql, values)
        return user;
    }
    catch (error) {
        return error.sqlMessage;
    }
}

// create new user
createUser = async ( title, first_name, surname, mobile, email, home_address_1, home_address_2, home_town, home_city, home_eircode, shipping_address_1, shipping_address_2, shipping_town, shipping_city, shipping_eircode) => {
    if (title === "Mx" || title === "Ms" || title === "Mr" || title === "Mrs" || title === "Miss" || title === "Dr" || title === "Other" || title === "") {
        try {
            // create entry in users
            let sql_user = 'INSERT INTO users (title, first_name, surname, mobile, email) VALUES (?, ?, ?, ?, ?)';
            let values_user = [ title, first_name, surname, mobile, email ];
            const [rows_user] = await db.query(sql_user, values_user)
            const user_id = rows_user.insertId;

            // create entry in home_address
            let sql_home = 'INSERT INTO home_address (home_address_line_1, home_address_line_2, home_town, home_city, home_eircode, user_id) VALUES (?, ?, ?, ?, ?, ?)';
            let values_home = [home_address_1, home_address_2, home_town, home_city, home_eircode, user_id];
            await db.query(sql_home, values_home)
        
            // create entry in shipping_address
            let sql_shipping = 'INSERT INTO shipping_address (shipping_address_line_1, shipping_address_line_2, shipping_town, shipping_city, shipping_eircode, user_id) VALUES (?, ?, ?, ?, ?, ?)';
            let values_shipping = [shipping_address_1, shipping_address_2, shipping_town, shipping_city, shipping_eircode, user_id];
            await db.query(sql_shipping, values_shipping)

            // return created user including addresses
            let sql_the_user = "SELECT * FROM users, home_address, shipping_address WHERE users.user_id = ? AND home_address.user_id = users.user_id AND shipping_address.user_id = users.user_id ";
            //let sql_the_user = "SELECT * FROM users JOIN home_address ON users.user_id = home_address.user_id JOIN shipping_address ON shipping_address.user_id = home_address.user_id ";
            let values_the_user = [user_id]
            const [created_user] = await db.query(sql_the_user, values_the_user);
                
            return created_user;
        }
        catch (error) {
            return error.sqlMessage;
        }
    }
    else {
        let response = title + " is not recognized."
        return response
    }
}

// update mobile, email, title and all or some address data
updateUser = async ( id, title, mobile, email, home_address_1, home_address_2, home_town, home_city, home_eircode, shipping_address_1, shipping_address_2, shipping_town, shipping_city, shipping_eircode ) => {
    if (title === "Mx" || title === "Ms" || title === "Mr" || title === "Mrs" || title === "Miss" || title === "Dr" || title === "Other" || title === "") {
        try {
            // update user in users
            let sql = "UPDATE users SET title = ?, mobile = ?, email = ? WHERE user_id = ?";
            let values =[ title, mobile, email, id ]
            await db.query(sql, values);
    
            // update home address
            let sql_home_address = "UPDATE home_address SET home_address_line_1 = ?, home_address_line_2 = ?, home_town = ?, home_city = ?, home_eircode = ? WHERE user_id = ?";
            let values_home_address =[ home_address_1, home_address_2, home_town, home_city, home_eircode, id]
            await db.query(sql_home_address, values_home_address);
        
            // update shipping address
            let sql_shipping_address = "UPDATE shipping_address SET shipping_address_line_1 = ?, shipping_address_line_2 = ?, shipping_town = ?, shipping_city = ?, shipping_eircode = ? WHERE user_id = ?";
            let values_shipping_address =[ shipping_address_1, shipping_address_2, shipping_town, shipping_city, shipping_eircode, id]
            await db.query(sql_shipping_address, values_shipping_address);
    
            // return updated user including addresses
            let sql_the_user = "SELECT * FROM users, home_address, shipping_address WHERE users.user_id = ? AND home_address.user_id = users.user_id AND shipping_address.user_id = users.user_id ";
            //let sql_the_user = "SELECT * FROM users JOIN home_address ON users.user_id = home_address.user_id JOIN shipping_address ON shipping_address.user_id = home_address.user_id ";
            let values_the_user = [id]
            const [updated_user] = await db.query(sql_the_user, values_the_user);
        
            return updated_user;
        }
        catch (error) {
            return error.sqlMessage;
        }
    }
    else {
        let response = title + " is not recognized."
        return response
    }

}

deleteUser = async (first_name, surname, mobile, email) => {
    try {
       let sql = "DELETE FROM users WHERE first_name = ? AND surname = ? AND mobile = ? AND email = ? ";
       let values =  [first_name, surname, mobile, email];
       const [user] = await db.query(sql, values);
       //let response = first_name + " " + surname + " has been successfully deleted."
       return user;
    }
    catch (error) {
        return error.sqlMessage;
    }
}

module.exports = { getUsers, getSelectedUsers, createUser, updateUser, deleteUser, getSelectedUserById }