const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

// create schema for customers
const orderSchema = new mongoose.Schema(
  {
    customer_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customer'
    },
    bought_items: [
      {
        item_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Item'
        },
        quantity: {
          type: Number,
          required: true
        }
      }
    ]
  },
  { timestamps: true } 
)

orderSchema.plugin(uniqueValidator)

// to format the objects returned by Mongoose to JSON
orderSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Order = mongoose.model('Order', orderSchema)

module.exports = Order