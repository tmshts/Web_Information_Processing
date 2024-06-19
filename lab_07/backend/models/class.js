const mongoose = require('mongoose')
//const uniqueValidator = require('mongoose-unique-validator')

// create schema for classes
const classSchema = new mongoose.Schema({
  ID: Number,
  name: {
    type: String,
    required: true,
    unique: true
  },
  day: {
    type: String,
    required: true
  },
  session_length: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  number_of_members: {
    type: Number,
    required: true
  }
})

// credit to this video for the inspiration in terms of counting https://www.youtube.com/watch?v=_GkujEyjJm8
// create schema for counter members
const counterClassSchema = new mongoose.Schema({
  id: {
    type: String
  },
  sequence: {
    type: Number
  }
})

//classSchema.plugin(uniqueValidator)

// to format the objects returned by Mongoose to JSON
classSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

// Create models based on schema
const Gym_Class = mongoose.model('Gym_Class', classSchema)
const counterClass = mongoose.model('counterClass', counterClassSchema);

// export models
module.exports = { Gym_Class, counterClass }