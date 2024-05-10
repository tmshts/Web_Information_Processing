const customersRouter = require('express').Router()
const service = require('../services/customer')


// define GET routes
customersRouter.get('/', async (request, response) => {
  const { customer_type, customer_message, customer_statusCode, customers } = await service.getCustomers()
  if (customer_type === "Error") {
    response
      .status(customer_statusCode)
      .send({customer_type, customer_message})
  }
  if (customer_type === "Success") {
    response
      .status(customer_statusCode)
      .send(customers)
  }
})

customersRouter.get('/customer/:id', async (request, response) => {
  const id = request.params.id
  const { customer_type, customer_message, customer_statusCode, customer } = await service.findCustomer(id)
  if (customer_type === "Error") {
    response
      .status(customer_statusCode)
      .send({customer_type, customer_message})
  }
  if (customer_type === "Success") {
    response
      .status(customer_statusCode)
      .send(customer)
  }
})

customersRouter.get('/:surname', async (request, response) => {
  const surname = request.params.surname
  const { customer_type, customer_message, customer_statusCode, customer }  = await service.getSelectedCustomers(surname)

  if (customer_type === "Error") {
    response
      .status(customer_statusCode)
      .send({customer_type, customer_message})
  }
  if (customer_type === "Success") {
    response
      .status(customer_statusCode)
      .send(customer)
  }
})

/*
customersRouter.get('/:mobile', async (request, response) => {
  const mobile = request.params.mobile
  const mobile_int = parseInt(mobile)

  const { customer_type, customer_message, customer_statusCode, customer_id } = await service.findCustomerBasedOnMobile(mobile_int)
  if (customer_type === "Error") {
    response
      .status(customer_statusCode)
      .send({customer_type, customer_message})
  }
  if (customer_type === "Success") {
    response
      .status(customer_statusCode)
      .send(customer_id)
  }
})
*/

customersRouter.delete('/customer/:id', async (request, response) => {

    const id = request.params.id

    const { customer_type, customer_message, customer_statusCode } = await service.deleteCustomer(id)
    if (customer_type === "Error") {
      response
        .status(customer_statusCode)
        .send({customer_type, customer_message})
    }
    if (customer_type === "Success") {
      response
        .status(customer_statusCode)
        // since customer_message not working, no customer_message is sent
        .send({customer_message})
    }
})

// define POST routes
customersRouter.post('/', async (request, response) => {

  const { title, first_name, surname, mobile, email, home_address, shipping_address } = request.body;
  const { home_address_line_1, home_address_line_2, home_town, home_city, home_eircode } = home_address;
  const { shipping_address_line_1, shipping_address_line_2, shipping_town, shipping_city, shipping_eircode } = shipping_address;

  const { customer_type, customer_message, customer_statusCode, savedCustomer }  = await service.insertCustomer( title, first_name, surname, mobile, email, home_address_line_1, home_address_line_2, home_town, home_city, home_eircode, shipping_address_line_1, shipping_address_line_2, shipping_town, shipping_city, shipping_eircode );
  
  if (customer_type === "Error") {
    response
      .status(customer_statusCode)
      .send({customer_type, customer_message})
  }
  if (customer_type === "Success") {
    response
      .status(customer_statusCode)
      .send(savedCustomer)
  }
})

customersRouter.put('/customer/:id', async (request, response) => {
  const id = request.params.id
  const { title, first_name, surname, mobile, email, home_address, shipping_address } = request.body;
  const { home_address_line_1, home_address_line_2, home_town, home_city, home_eircode } = home_address;
  const { shipping_address_line_1, shipping_address_line_2, shipping_town, shipping_city, shipping_eircode } = shipping_address;

  const { customer_type, customer_message, customer_statusCode, updatedCustomer }  = await service.updateCustomer( id, title, first_name, surname, mobile, email, home_address_line_1, home_address_line_2, home_town, home_city, home_eircode, shipping_address_line_1, shipping_address_line_2, shipping_town, shipping_city, shipping_eircode );

  if (customer_type === "Error") {
    response
      .status(customer_statusCode)
      .send({customer_type, customer_message})
  }
  if (customer_type === "Success") {
    response
      .status(customer_statusCode)
      // since updatedCustomer not working, no updatedCustomer is sent
      .send(updatedCustomer)
  }
})


module.exports = customersRouter;