const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

// create schema for customers
const customerSchema = new mongoose.Schema({
  title: String,
  first_name: {
    type: String,
    required: true
  },
  surname: {
    type: String,
    required: true
  },
  mobile: {
    type: Number,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  home_address: {
      home_address_line_1: {
        type: String,
        required: true
      },
      home_address_line_2: {
        type: String,
        default: ""
      },
      home_town: {
        type: String,
        required: true
      },
      home_city: {
        type: String,
        required: true
      },
      home_eircode: {
        type: String,
        default: ""
      }
  },
  shipping_address: {
      shipping_address_line_1: {
        type: String,
        required: true
      },
      shipping_address_line_2: {
        type: String,
        default: ""
      },
      shipping_town: {
        type: String,
        required: true
      },
      shipping_city: {
        type: String,
        required: true
      },
      shipping_eircode: {
        type: String,
        default: ""
      }
  }
  /*
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order'
    }
  ],
  */
})

customerSchema.plugin(uniqueValidator)

// to format the objects returned by Mongoose to JSON
customerSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Customer = mongoose.model('Customer', customerSchema)

module.exports = Customer