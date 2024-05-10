const ordersRouter = require('express').Router()
const service = require('../services/order')
const service_customer = require('../services/customer')
const service_item = require('../services/item')

// define GET routes
ordersRouter.get('/', async (request, response) => {
  const { order_type, order_message, order_statusCode, orders } = await service.getOrders()
  if (order_type === "Error") {
    response
      .status(order_statusCode)
      .send({order_type, order_message})
  }
  if (order_type === "Success") {
    response
      .status(order_statusCode)
      .send(orders)
  }
})

ordersRouter.get('/order/:id', async (request, response) => {
  const id = request.params.id
  const { order_type, order_message, order_statusCode, order } = await service.findOrder(id)
  if (order_type === "Error") {
    response
      .status(order_statusCode)
      .send({order_type, order_message})
  }
  if (order_type === "Success") {
    response
      .status(order_statusCode)
      .send(order)
  }
})

ordersRouter.delete('/order/:id', async (request, response) => {

  const id = request.params.id

  const { order_type, order_message, order_statusCode } = await service.deleteOrder(id)
  if (order_type === "Error") {
    response
      .status(order_statusCode)
      .send({order_type, order_message})
  }
  if (order_type === "Success") {
    response
      .status(order_statusCode)
      // since order_message not working, no order_message is sent
      .send({order_message})
  }
})

// define POST routes
ordersRouter.post('/', async (request, response) => {

  const { customer_id, bought_items } = request.body;

  // check if customer_id exist in database
  const { customer_type, customer_message, customer_statusCode, customer } = await service_customer.findCustomer(customer_id)
  if (customer_type === "Error") {
    response
      .status(customer_statusCode)
      .send({customer_type, customer_message})
  }
  if (customer_type === "Success") {

      // check if bought_items exist in database
      const { item_type, item_message, item_statusCode, items } = await service_item.findItems(bought_items)

      if (item_type === "Error") {
        response
          .status(item_statusCode)
          .send({item_type, item_message})
      }

      if (item_type === "Success") {    
        // insert order into mongo
        const { order_type, order_message, order_statusCode, savedOrder } = await service.insertOrder(customer_id, bought_items);
    
          if (order_type === "Error") {
            response
              .status(order_statusCode)
              .send({order_type, order_message})
          }
          if (order_type === "Success") {
            response
              .status(order_statusCode)
              .send(savedOrder)
          }
      }
  }
})


ordersRouter.put('/order/:id', async (request, response) => {
    const id = request.params.id
    const { customer_id, bought_items } = request.body;

      // check if customer_id exist in database
    const { customer_type, customer_message, customer_statusCode, customer } = await service_customer.findCustomer(customer_id)
    if (customer_type === "Error") {
      response
        .status(customer_statusCode)
        .send({customer_type, customer_message})
    }
    
    if (customer_type === "Success") {

          // check if item_ids in bought_items exist in database
          const { item_type, item_message, item_statusCode, items } = await service_item.findItems(bought_items)

          if (item_type === "Error") {
            response
              .status(item_statusCode)
              .send({item_type, item_message})
          }

          if (item_type === "Success") {   

              const { order_type, order_message, order_statusCode, updatedOrder }  = await service.updateOrder( id, customer_id, bought_items );

              if (order_type === "Error") {
                response
                  .status(order_statusCode)
                  .send({order_type, order_message})
              }
              if (order_type === "Success") {
                response
                  .status(order_statusCode)
                  // since updatedCustomer not working, no updatedCustomer is sent
                  .send(updatedOrder)
              }
        }
    }

})


module.exports = ordersRouter;