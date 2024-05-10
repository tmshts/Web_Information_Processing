const itemsRouter = require('express').Router()
const service = require('../services/item')

// define GET routes
itemsRouter.get('/', async (request, response) => {
  const { item_type, item_message, item_statusCode, items } = await service.getItems()
  if (item_type === "Error") {
    response
      .status(item_statusCode)
      .send({item_type, item_message})
  }
  if (item_type === "Success") {
    response
      .status(item_statusCode)
      .send(items)
  }
})

itemsRouter.get('/item/:id', async (request, response) => {
  const id = request.params.id
  const { item_type, item_message, item_statusCode, item } = await service.findItem(id)
  if (item_type === "Error") {
    response
      .status(item_statusCode)
      .send({item_type, item_message})
  }
  if (item_type === "Success") {
    response
      .status(item_statusCode)
      .send(item)
  }
})

itemsRouter.get('/:model', async (request, response) => {
  const model = request.params.model
  const { item_type, item_message, item_statusCode, item }  = await service.getSelectedItems(model)
  console.log("item")
  console.log(item)

  if (item_type === "Error") {
    response
      .status(item_statusCode)
      .send({item_type, item_message})
  }
  if (item_type === "Success") {
    response
      .status(item_statusCode)
      .send(item)
  }
})

itemsRouter.delete('/item/:id', async (request, response) => {

  const id = request.params.id

  const { item_type, item_message, item_statusCode } = await service.deleteItem(id)
  if (item_type === "Error") {
    response
      .status(item_statusCode)
      .send({item_type, item_message})
  }
  if (item_type === "Success") {
    response
      .status(item_statusCode)
      // since item_message not working, no item_message is sent
      .send({item_message})
  }
})

// define POST routes
itemsRouter.post('/', async (request, response) => {

  const { manufacturer, model, price } = request.body;
  const { item_type, item_message, item_statusCode, savedItem }  = await service.insertItem( manufacturer, model, price );
  
  if (item_type === "Error") {
    response
      .status(item_statusCode)
      .send({item_type, item_message})
  }
  if (item_type === "Success") {
    response
      .status(item_statusCode)
      .send(savedItem)
  }
})

itemsRouter.put('/item/:id', async (request, response) => {
  const id = request.params.id
  const { manufacturer, model, price } = request.body;
  const { item_type, item_message, item_statusCode, updatedItem }  = await service.updateItem( id, manufacturer, model, price );

  if (item_type === "Error") {
    response
      .status(item_statusCode)
      .send({item_type, item_message})
  }
  if (item_type === "Success") {
    response
      .status(item_statusCode)
      // since updatedCustomer not working, no updatedCustomer is sent
      .send(updatedItem)
  }
})



module.exports = itemsRouter;