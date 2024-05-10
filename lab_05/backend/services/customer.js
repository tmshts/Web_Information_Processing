const Customer = require('../models/customer');

// get all customers
getCustomers = async () => {
    try {
        const customers = await Customer
                                    .find({})
                                    
        console.log("Retrieved all customers")
        console.log(customers)
            return {
                customer_type: 'Success',
                customer_statusCode: 200,
                customers
             };
    }
    catch (error) {
        return {
            customer_type: 'Error',
            customer_statusCode: 404,
            customer_customer_message: error.message
          };
    }
}


// get particular user based on id
findCustomer = async (id) => {
    try {
        const customer = await Customer.findById(id)

        if (customer === null) {
            return {
                customer_type: 'Error',
                customer_statusCode: 404,
                customer_message: `No customer found with id ${id}`
             }
        }
        else {
            console.log("Retrieved a particular customer " + customer.first_name + " " + customer.surname)
            console.log(customer)
            return {
                customer_type: 'Success',
                customer_statusCode: 200,
                customer
            }
        }
    }
    catch (error) {
        return {
            customer_type: 'Error',
            customer_statusCode: 404,
            customer_message: error.message
          };
    }
}

// query for matching customers based on name
getSelectedCustomers = async (name) => {
    try {
        const customer = await Customer.find({surname: new RegExp(name)})

        console.log("Retrieved selected customers based on surname")
        console.log(customer)

        return {
            customer_type: 'Success',
            customer_statusCode: 200,
            customer
        }
    }
    catch (error) {
        return {
            customer_type: 'Error',
            customer_statusCode: 404,
            customer_message: error.message
          };
    }
}


// get particular user id based on mobile
findCustomerBasedOnMobile = async (mobile_int) => {
    try {
        //const customer = await Customer.findById(id)
        const customer = await Customer.find({mobile: mobile_int})

        if (customer.length == 0) {
            return {
                customer_type: 'Error',
                customer_statusCode: 404,
                customer_message: `No customer found with mobile ${mobile_int}`
             }
        }
        else {
            //console.log("Retrieved a particular customer id based on mobile")
            //console.log(customer[0]._id.toString())
            const customer_id = customer[0]._id.toString();
            return customer_id;
            /*
            return {
                customer_type: 'Success',
                customer_statusCode: 200,
                customer_id
            }
            */
        }
    }
    catch (error) {
        return {
            customer_type: 'Error',
            customer_statusCode: 404,
            customer_message: error.message
          };
    }
}

// delete particular user based on id
deleteCustomer = async (id) => {
    try {
        const customer = await Customer.findById(id)
        const deletedCustomer = await Customer.findByIdAndDelete(id)

        if (deletedCustomer === null) {
            return {
                customer_type: 'Error',
                customer_statusCode: 404,
                customer_message: `No customer found with id ${id}`
             }
        }
        else {
            console.log("Deleted a particular customer " + customer.first_name + " " + customer.surname)
            console.log(customer)
            return {
                customer_type: 'Success',
                customer_statusCode: 204,
                // message not working
                customer_message: `Customer ${customer.first_name} deleted`
            }
        }
    }
    catch (error) {
        return {
            customer_type: 'Error',
            customer_statusCode: 404,
            customer_message: error.message
          };
    }
}

function isNumber(value) {
    return typeof value === 'number';
  }

// create new customer
insertCustomer = async ( title, first_name, surname, mobile, email, home_address_line_1, home_address_line_2, home_town, home_city, home_eircode, shipping_address_line_1, shipping_address_line_2, shipping_town, shipping_city, shipping_eircode) => {

    if (title === "Mx" || title === "Ms" || title === "Mr" || title === "Mrs" || title === "Miss" || title === "Dr" || title === "Other" || title === "") {
        try {
                  
          const customer = new Customer({
            title: title,
            first_name: first_name,
            surname: surname,
            mobile: mobile,
            email: email,
            home_address: {
                home_address_line_1: home_address_line_1,
                home_address_line_2: home_address_line_2,
                home_town: home_town,
                home_city: home_city,
                home_eircode: home_eircode
            },
            shipping_address: {
                shipping_address_line_1: shipping_address_line_1,
                shipping_address_line_2: shipping_address_line_2,
                shipping_town: shipping_town,
                shipping_city: shipping_city,
                shipping_eircode: shipping_eircode
            }
          })

          const savedCustomer = await customer.save()
          console.log("Inserted new customer " + savedCustomer.first_name + " " + savedCustomer.surname)
          console.log(savedCustomer)
          return {
            customer_type: 'Success',
            customer_statusCode: 201,
            savedCustomer
            };
        }
        catch (error) {
            return {
                customer_type: 'Error',
                customer_statusCode: 400,
                customer_message: error.message
              };
        }
      }
    else {
        return {
            customer_type: 'Error',
            customer_statusCode: 400,
            customer_message: "title is not recognized."
        };
    }
}

// update a particular user based on id
updateCustomer = async (id, title, first_name, surname, mobile, email, home_address_line_1, home_address_line_2, home_town, home_city, home_eircode, shipping_address_line_1, shipping_address_line_2, shipping_town, shipping_city, shipping_eircode) => {
    if (title === "Mx" || title === "Ms" || title === "Mr" || title === "Mrs" || title === "Miss" || title === "Dr" || title === "Other" || title === "") {

        try {

            const customerToUpdate = {
                title: title,
                first_name: first_name,
                surname: surname,
                mobile: mobile,
                email: email,
                home_address: {
                    home_address_line_1: home_address_line_1,
                    home_address_line_2: home_address_line_2,
                    home_town: home_town,
                    home_city: home_city,
                    home_eircode: home_eircode
                },
                shipping_address: {
                    shipping_address_line_1: shipping_address_line_1,
                    shipping_address_line_2: shipping_address_line_2,
                    shipping_town: shipping_town,
                    shipping_city: shipping_city,
                    shipping_eircode: shipping_eircode
                }
            }
        
            const updatedCustomer = await Customer.findByIdAndUpdate(id, customerToUpdate, { new: true })

            if (updatedCustomer === null) {
                return {
                    customer_type: 'Error',
                    customer_statusCode: 404,
                    customer_message: `No customer found with id ${id}`
                 }
            }
            else {
                console.log("Updated a particular customer " + first_name + " " + surname)
                console.log(updatedCustomer)
                return {
                    customer_type: 'Success',
                    customer_statusCode: 204,
                    updatedCustomer
                }
            }
        }
        catch (error) {
            return {
                customer_type: 'Error',
                customer_statusCode: 404,
                customer_message: error.message
            };
        }
    }
    else {
        return {
            customer_type: 'Error',
            customer_statusCode: 400,
            customer_message: "title is not recognized."
        };
    }


}


module.exports = { getCustomers, findCustomer, getSelectedCustomers, findCustomerBasedOnMobile, insertCustomer, deleteCustomer, updateCustomer }