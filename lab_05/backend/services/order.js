const Order = require('../models/order');
const service_customer = require('../services/customer')
const service_item = require('../services/item')


// get all orders
getOrders = async () => {
    try {
        const orders = await Order.find({})
        console.log("Retrieved all orders")
        console.log(orders)
            return {
                order_type: 'Success',
                order_statusCode: 200,
                orders
             };
    }
    catch (error) {
        return {
            order_type: 'Error',
            order_statusCode: 404,
            order_message: error.message
          };
    }
}

// get particular item based on id
findOrder = async (id) => {
  try {
      const order = await Order.findById(id)

      if (order === null) {
          return {
              order_type: 'Error',
              order_statusCode: 404,
              order_message: `No order found with id ${id}`
           }
      }
      else {
          console.log("Retrieved a particular order " + id)
          console.log(order)
          return {
              order_type: 'Success',
              order_statusCode: 200,
              order
          }
      }
  }
  catch (error) {
      return {
          order_type: 'Error',
          order_statusCode: 404,
          order_message: error.message
        };
  }
}


// delete particular item based on id
deleteOrder = async (id) => {
  try {
      const order = await Order.findById(id)
      const deletedOrder = await Order.findByIdAndDelete(id)
      if (deletedOrder === null) {
          return {
              order_type: 'Error',
              order_statusCode: 404,
              order_message: `No order found with id ${id}`
           }
      }
      else {
          console.log("Deleted a particular order " + id)
          console.log(order)
          return {
              order_type: 'Success',
              order_statusCode: 204,
              // item_message not working
              order_message: `Order ${id} deleted`
          }
      }
  }
  catch (error) {
      return {
          order_type: 'Error',
          order_statusCode: 404,
          order_message: error.message
        };
  }
}

function isNumber(value) {
    return typeof value === 'number';
  }

// create new order
insertOrder = async ( customer_id, bought_items, items ) => {

      // no need to validate the customer_id neither item_id as they have already been validated in controller
      // -> if we are here -> customer_id and item_id are correct
      try { 
            const order = new Order({
              customer_id: customer_id,
              bought_items: bought_items
            })
            
            const savedOrder = await order.save()
            console.log("Inserted new order of customer " + customer_id)
            console.log(savedOrder)
    
            
            return {
              order_type: 'Success',
              order_statusCode: 201,
              savedOrder
              };
        }
        catch (error) {
            return {
                order_type: 'Error',
                order_statusCode: 400,
                order_message: error.message
              };
        }
}

// update a particular item based on id
updateOrder = async ( id, customer_id, bought_items ) => {

    // no need to validate the customer_id neither item_id as they have already been validated in controller
    // -> if we are here -> customer_id and item_id are correct
    try {
        const orderToUpdate = {
          customer_id: customer_id,
          bought_items: bought_items,
        }

      const updatedOrder = await Order.findByIdAndUpdate(id, orderToUpdate, { new: true })

      if (updatedOrder === null) {
          return {
              order_type: 'Error',
              order_statusCode: 404,
              order_message: `No order found with id ${id}`
           }
      }

      else {
          console.log("Updated a particular order " + id)
          console.log(updatedOrder)
          return {
              order_type: 'Success',
              order_statusCode: 204,
              updatedOrder
          }
      }
  }
  catch (error) {
      return {
          order_type: 'Error',
          order_statusCode: 404,
          order_message: error.message
      };
  }
}


module.exports = { getOrders, findOrder, deleteOrder, insertOrder, updateOrder }