require('dotenv').config()
const config = require('./utils/config')
const customerRouter = require('./controllers/customer');
const itemsRouter = require('./controllers/item');
const ordersRouter = require('./controllers/order');
//const middleware = require('./utils/middleware')
const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors');


// Creates the app
const app = express();


// for request.body in order to be possible to transfer data from front-end into back-end
app.use(express.json())
app.use(cors())


// hide URL path for security reasons
const mongoUrl = config.MONGODB_URI
console.log('connecting to', mongoUrl)

// add middlewares
app.use('/api/customers', customerRouter);
app.use('/api/items', itemsRouter);
app.use('/api/orders', ordersRouter);

// all the routes should be registered before this middleware
//app.use(middleware.errorHandler)

const service_customer = require('./services/customer')
const service_item = require('./services/item')
const service_order = require('./services/order')


mongoose.connect(mongoUrl)

/////// YOU CAN RUN THIS APP ONLY ONCE BECAUSE I SET COLUMNS mobile and email (in customers), and model (in items) UNIQUE  //////////
// If you want to keep running this app just delete or comment the function runCustomers() below.
run();
//Promise.allSettled([run()]);

async function run() {
    //////////// CUSTOMERS ////////////
    // inject hard-coded data for customers

    // CREATE
    const customer_1 = {
        title_1: "Mr",
        first_name_1: "Tomas",
        surname_1: "Hatas",
        mobile_1: 111,
        email_1: "tomas.hatas@mumail.ie",
        home_address_1: {
            home_address_line_1_1: "Castle Dawson 19",
            home_address_line_2_1: "Castle Dawson 19",
            home_town_1: "Maynooth",
            home_city_1: "Maynooth",
            home_eircode_1: "W7Z9U"
        },
        shipping_address_1: {
            shipping_address_line_1_1: "Castle Dawson 19",
            shipping_address_line_2_1: "Castle Dawson 19",
            shipping_town_1: "Maynooth",
            shipping_city_1: "Maynooth",
            shipping_eircode_1: "W7Z9U"
        }
    }
    const { title_1, first_name_1, surname_1, mobile_1, email_1, home_address_1, shipping_address_1 } = customer_1;
    const { home_address_line_1_1, home_address_line_2_1, home_town_1, home_city_1, home_eircode_1 } = home_address_1;
    const { shipping_address_line_1_1, shipping_address_line_2_1, shipping_town_1, shipping_city_1, shipping_eircode_1 } = shipping_address_1;

    await service_customer.insertCustomer( title_1, first_name_1, surname_1, mobile_1, email_1, home_address_line_1_1, home_address_line_2_1, home_town_1, home_city_1, home_eircode_1, shipping_address_line_1_1, shipping_address_line_2_1, shipping_town_1, shipping_city_1, shipping_eircode_1 );
    
    
    const customer_2 = {
        title_2: "Mr",
        first_name_2: "Peter",
        surname_2: "Smith",
        mobile_2: 222,
        email_2: "peter.smith@mumail.ie",
        home_address_2: {
            home_address_line_1_2: "Castle Dawson 18",
            home_address_line_2_2: "Castle Dawson 18",
            home_town_2: "Maynooth",
            home_city_2: "Maynooth",
            home_eircode_2: "W7Z9U"
        },
        shipping_address_2: {
            shipping_address_line_1_2: "Castle Dawson 18",
            shipping_address_line_2_2: "Castle Dawson 18",
            shipping_town_2: "Maynooth",
            shipping_city_2: "Maynooth",
            shipping_eircode_2: "W7Z9U"
        }
    }

    const { title_2, first_name_2, surname_2, mobile_2, email_2, home_address_2, shipping_address_2 } = customer_2;
    const { home_address_line_1_2, home_address_line_2_2, home_town_2, home_city_2, home_eircode_2 } = home_address_2;
    const { shipping_address_line_1_2, shipping_address_line_2_2, shipping_town_2, shipping_city_2, shipping_eircode_2 } = shipping_address_2;

    await service_customer.insertCustomer( title_2, first_name_2, surname_2, mobile_2, email_2, home_address_line_1_2, home_address_line_2_2, home_town_2, home_city_2, home_eircode_2, shipping_address_line_1_2, shipping_address_line_2_2, shipping_town_2, shipping_city_2, shipping_eircode_2 );
     

    const customer_3 = {
        title_3: "Mrs",
        first_name_3: "Jana",
        surname_3: "Nebeska",
        mobile_3: 333,
        email_3: "jana.nebeska@mumail.ie",
        home_address_3: {
            home_address_line_1_3: "Castle Dawson 17",
            home_address_line_2_3: "Castle Dawson 17",
            home_town_3: "Maynooth",
            home_city_3: "Maynooth",
            home_eircode_3: "W7Z9U"
        },
        shipping_address_3: {
            shipping_address_line_1_3: "Castle Dawson 17",
            shipping_address_line_2_3: "Castle Dawson 17",
            shipping_town_3: "Maynooth",
            shipping_city_3: "Maynooth",
            shipping_eircode_3: "W7Z9U"
        }
    }

    const { title_3, first_name_3, surname_3, mobile_3, email_3, home_address_3, shipping_address_3 } = customer_3;
    const { home_address_line_1_3, home_address_line_2_3, home_town_3, home_city_3, home_eircode_3 } = home_address_3;
    const { shipping_address_line_1_3, shipping_address_line_2_3, shipping_town_3, shipping_city_3, shipping_eircode_3 } = shipping_address_3;

    await service_customer.insertCustomer( title_3, first_name_3, surname_3, mobile_3, email_3, home_address_line_1_3, home_address_line_2_3, home_town_3, home_city_3, home_eircode_3, shipping_address_line_1_3, shipping_address_line_2_3, shipping_town_3, shipping_city_3, shipping_eircode_3 );
     

    const customer_4 = {
        title_4: "Ms",
        first_name_4: "Lucy",
        surname_4: "Allister",
        mobile_4: 444,
        email_4: "lucy.allister@mumail.ie",
        home_address_4: {
            home_address_line_1_4: "Castle Dawson 16",
            home_address_line_2_4: "Castle Dawson 16",
            home_town_4: "Maynooth",
            home_city_4: "Maynooth",
            home_eircode_4: "W7Z9U"
        },
        shipping_address_4: {
            shipping_address_line_1_4: "Castle Dawson 16",
            shipping_address_line_2_4: "Castle Dawson 16",
            shipping_town_4: "Maynooth",
            shipping_city_4: "Maynooth",
            shipping_eircode_4: "W7Z9U"
        }
    }

    const { title_4, first_name_4, surname_4, mobile_4, email_4, home_address_4, shipping_address_4 } = customer_4;
    const { home_address_line_1_4, home_address_line_2_4, home_town_4, home_city_4, home_eircode_4 } = home_address_4;
    const { shipping_address_line_1_4, shipping_address_line_2_4, shipping_town_4, shipping_city_4, shipping_eircode_4 } = shipping_address_4;

    await service_customer.insertCustomer( title_4, first_name_4, surname_4, mobile_4, email_4, home_address_line_1_4, home_address_line_2_4, home_town_4, home_city_4, home_eircode_4, shipping_address_line_1_4, shipping_address_line_2_4, shipping_town_4, shipping_city_4, shipping_eircode_4 );
     

    const customer_5 = {
        title_5: "",
        first_name_5: "Jan",
        surname_5: "Protro",
        mobile_5: 555,
        email_5: "jan.protro@mumail.ie",
        home_address_5: {
            home_address_line_1_5: "Castle Dawson 15",
            home_address_line_2_5: "Castle Dawson 15",
            home_town_5: "Maynooth",
            home_city_5: "Maynooth",
            home_eircode_5: "W7Z9U"
        },
        shipping_address_5: {
            shipping_address_line_1_5: "Castle Dawson 15",
            shipping_address_line_2_5: "Castle Dawson 15",
            shipping_town_5: "Maynooth",
            shipping_city_5: "Maynooth",
            shipping_eircode_5: "W7Z9U"
        }
    }

    const { title_5, first_name_5, surname_5, mobile_5, email_5, home_address_5, shipping_address_5 } = customer_5;
    const { home_address_line_1_5, home_address_line_2_5, home_town_5, home_city_5, home_eircode_5 } = home_address_5;
    const { shipping_address_line_1_5, shipping_address_line_2_5, shipping_town_5, shipping_city_5, shipping_eircode_5 } = shipping_address_5;

    await service_customer.insertCustomer( title_5, first_name_5, surname_5, mobile_5, email_5, home_address_line_1_5, home_address_line_2_5, home_town_5, home_city_5, home_eircode_5, shipping_address_line_1_5, shipping_address_line_2_5, shipping_town_5, shipping_city_5, shipping_eircode_5 );
     

    const customer_6 = {
        title_6: "",
        first_name_6: "Martin",
        surname_6: "Delete",
        mobile_6: 666,
        email_6: "martin.delete@mumail.ie",
        home_address_6: {
            home_address_line_1_6: "Castle Dawson 14",
            home_address_line_2_6: "Castle Dawson 14",
            home_town_6: "Maynooth",
            home_city_6: "Maynooth",
            home_eircode_6: "W7Z9U"
        },
        shipping_address_6: {
            shipping_address_line_1_6: "Castle Dawson 14",
            shipping_address_line_2_6: "Castle Dawson 14",
            shipping_town_6: "Maynooth",
            shipping_city_6: "Maynooth",
            shipping_eircode_6: "W7Z9U"
        }
    }

    const { title_6, first_name_6, surname_6, mobile_6, email_6, home_address_6, shipping_address_6 } = customer_6;
    const { home_address_line_1_6, home_address_line_2_6, home_town_6, home_city_6, home_eircode_6 } = home_address_6;
    const { shipping_address_line_1_6, shipping_address_line_2_6, shipping_town_6, shipping_city_6, shipping_eircode_6 } = shipping_address_6;

    await service_customer.insertCustomer( title_6, first_name_6, surname_6, mobile_6, email_6, home_address_line_1_6, home_address_line_2_6, home_town_6, home_city_6, home_eircode_6, shipping_address_line_1_6, shipping_address_line_2_6, shipping_town_6, shipping_city_6, shipping_eircode_6 );
     

    // RETRIEVE
    const customer_id_1 = await service_customer.findCustomerBasedOnMobile(customer_1.mobile_1);
    await service_customer.findCustomer(customer_id_1);


    const customer_id_2 = await service_customer.findCustomerBasedOnMobile(customer_2.mobile_2);
    await service_customer.findCustomer(customer_id_2);


    const customer_id_3 = await service_customer.findCustomerBasedOnMobile(customer_3.mobile_3);
    await service_customer.findCustomer(customer_id_3);


    const customer_id_4 = await service_customer.findCustomerBasedOnMobile(customer_4.mobile_4);
    await service_customer.findCustomer(customer_id_4);


    const customer_id_5 = await service_customer.findCustomerBasedOnMobile(customer_5.mobile_5);
    await service_customer.findCustomer(customer_id_5);


    const customer_id_6 = await service_customer.findCustomerBasedOnMobile(customer_6.mobile_6);
    await service_customer.findCustomer(customer_id_6);


    // UPDATE
    const customer_id = await service_customer.findCustomerBasedOnMobile(customer_1.mobile_1);

    const customer_to_update = {
        title: "Mr",
        first_name: "Tomas",
        surname: "Hatas",
        mobile: 111111111,
        email: "tomas.hatas@mu.ie",
        home_address: {
            home_address_line_1: "Castle Dawson 19",
            home_address_line_2: "Castle Dawson 19",
            home_town: "Maynooth",
            home_city: "Maynooth",
            home_eircode: "W7Z9U"
        },
        shipping_address: {
            shipping_address_line_1: "Castle Dawson 19",
            shipping_address_line_2: "Castle Dawson 19",
            shipping_town: "Maynooth",
            shipping_city: "Maynooth",
            shipping_eircode: "W7Z9U"
        }
    }
    const { title, first_name, surname, mobile, email, home_address, shipping_address } = customer_to_update;
    const { home_address_line_1, home_address_line_2, home_town, home_city, home_eircode } = home_address;
    const { shipping_address_line_1, shipping_address_line_2, shipping_town, shipping_city, shipping_eircode } = shipping_address;

    await service_customer.updateCustomer( customer_id, title, first_name, surname, mobile, email, home_address_line_1, home_address_line_2, home_town, home_city, home_eircode, shipping_address_line_1, shipping_address_line_2, shipping_town, shipping_city, shipping_eircode );


    // DELETE
    const customer_id_to_delete = await service_customer.findCustomerBasedOnMobile(customer_6.mobile_6);
    await service_customer.deleteCustomer(customer_id_to_delete)


    //////////// ITEMS ////////////
    // inject hard-coded data for items

    // CREATE
    const item_1 = {
        manufacturer_1: "Apple",
        model_1: "iPhone 18",
        price_1: 39
    }
    const { manufacturer_1, model_1, price_1 } = item_1;

    await service_item.insertItem( manufacturer_1, model_1, price_1 );

    const item_2 = {
        manufacturer_2: "Apple",
        model_2: "iPhone 17",
        price_2: 39
    }
    const { manufacturer_2, model_2, price_2 } = item_2;

    await service_item.insertItem( manufacturer_2, model_2, price_2 );

    const item_3 = {
        manufacturer_3: "Apple",
        model_3: "iPhone 16",
        price_3: 39
    }
    const { manufacturer_3, model_3, price_3 } = item_3;

    await service_item.insertItem( manufacturer_3, model_3, price_3 );

    const item_4 = {
        manufacturer_4: "Apple",
        model_4: "iPhone 15",
        price_4: 39
    }
    const { manufacturer_4, model_4, price_4 } = item_4;

    await service_item.insertItem( manufacturer_4, model_4, price_4 );

    const item_5 = {
        manufacturer_5: "Samsung",
        model_5: "Galaxy 1",
        price_5: 39
    }
    const { manufacturer_5, model_5, price_5 } = item_5;

    await service_item.insertItem( manufacturer_5, model_5, price_5 );

    const item_6 = {
        manufacturer_6: "Samsung",
        model_6: "Delete",
        price_6: 39
    }
    const { manufacturer_6, model_6, price_6 } = item_6;

    await service_item.insertItem( manufacturer_6, model_6, price_6 );


    // RETRIEVE
    const item_id_1 = await service_item.findItemBasedOnModel(item_1.model_1)
    await service_item.findItem(item_id_1);

    const item_id_2 = await service_item.findItemBasedOnModel(item_2.model_2)
    await service_item.findItem(item_id_2);

    const item_id_3 = await service_item.findItemBasedOnModel(item_3.model_3)
    await service_item.findItem(item_id_3);

    const item_id_4 = await service_item.findItemBasedOnModel(item_4.model_4)
    await service_item.findItem(item_id_4);

    const item_id_5 = await service_item.findItemBasedOnModel(item_5.model_5)
    await service_item.findItem(item_id_5);

    const item_id_6 = await service_item.findItemBasedOnModel(item_6.model_6)
    await service_item.findItem(item_id_6);

    // UPDATE
    const item_id = await service_item.findItemBasedOnModel(item_5.model_5);

    const item_to_update = {
        manufacturer: "Samsung",
        model: "Galaxy 10",
        price: 39
    }
    const { manufacturer, model, price } = item_to_update;

    await service_item.updateItem(item_id, manufacturer, model, price) 

    // DELETE
    const item_id_to_delete = await service_item.findItemBasedOnModel(item_6.model_6);
    await service_item.deleteItem(item_id_to_delete)

    //////////// ORDERS ////////////
    // inject hard-coded data for orders

    // CREATE
    const order_1 = {
        customer_id__1: customer_id_1,
        bought_items_1: [
            {
                item_id: item_id_1,
                quantity: 2
            },
            {
                item_id: item_id_2,
                quantity: 1
            }
        ]
    }

    const { customer_id__1, bought_items_1 } = order_1;
    await service_order.insertOrder(customer_id__1, bought_items_1);


    const order_2 = {
        customer_id__2: customer_id_1,
        bought_items_2: [
            {
                item_id: item_id_1,
                quantity: 299
            },
            {
                item_id: item_id_2,
                quantity: 100
            }
        ]
    }

    const { customer_id__2, bought_items_2 } = order_2;
    await service_order.insertOrder(customer_id__2, bought_items_2);


    const order_3 = {
        customer_id__3: customer_id_2,
        bought_items_3: [
            {
                item_id: item_id_3,
                quantity: 22
            },
            {
                item_id: item_id_4,
                quantity: 10
            }
        ]
    }

    const { customer_id__3, bought_items_3 } = order_3;

    await service_order.insertOrder(customer_id__3, bought_items_3);


    const order_4 = {
        customer_id__4: customer_id_2,
        bought_items_4: [
            {
                item_id: item_id_2,
                quantity: 4
            },
            {
                item_id: item_id_4,
                quantity: 5
            }
        ]
    }

    const { customer_id__4, bought_items_4 } = order_4;
    await service_order.insertOrder(customer_id__4, bought_items_4);


    const order_5 = {
        customer_id__5: customer_id_3,
        bought_items_5: [
            {
                item_id: item_id_1,
                quantity: 8
            },
            {
                item_id: item_id_3,
                quantity: 7
            }
        ]
    }

    const { customer_id__5, bought_items_5 } = order_5;
    await service_order.insertOrder(customer_id__5, bought_items_5);


    const order_6 = {
        customer_id__6: customer_id_3,
        bought_items_6: [
            {
                item_id: item_id_2,
                quantity: 1
            },
            {
                item_id: item_id_3,
                quantity: 1
            }
        ]
    }

    const { customer_id__6, bought_items_6 } = order_6;
    await service_order.insertOrder(customer_id__6, bought_items_6);


    // RETRIEVE
    const { order_type, order_message, order_statusCode, orders } = await service_order.getOrders();

    await service_order.findOrder(orders[0].id)
    await service_order.findOrder(orders[1].id)
    await service_order.findOrder(orders[2].id)
    await service_order.findOrder(orders[3].id)
    await service_order.findOrder(orders[4].id)
    await service_order.findOrder(orders[5].id)

    
    // UPDATE
    const order_to_update = {
        customer_id_update: customer_id_3,
        bought_items_update: [
            {
                item_id: item_id_2,
                quantity: 111
            },
            {
                item_id: item_id_3,
                quantity: 111
            }
        ]
    }
    const { customer_id_update, bought_items_update } = order_to_update;

    await service_order.updateOrder( orders[0].id, customer_id_update, bought_items_update );


    // DELETE
    await service_order.deleteOrder(orders[5].id)

}


module.exports = app

/*
Your code should include a brief description for the database design (your data modeling ap-
proach) and the impact on your code development. This should be included as a comment at the
bottom of your code submission.

Structure:
Created 3 collections in total.
1 collection for storing information about customers
1 collection for storing information about items
1 collection for storing information about orders. Each order consists of ObjectId ("kind of foreign key") for particular 
customer and array of objects storing ObjectId for particular item and quantity.

Consequences:
Since MongoDb does not have any foreign keys, it was very challenging to inject application with hard-crafted data because
the ObjectID (primary key) does not start from 0/1 but from a certain number of characters (e. g. 66255d0667c2db8d86214e34)
Therefore, I needed to help myself by creating some helper functions like for instance findCustomerBasedOnMobile in services.

*/