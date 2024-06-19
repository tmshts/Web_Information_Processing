const mongoose = require('mongoose')
//const uniqueValidator = require('mongoose-unique-validator')

// create schema for members
const memberSchema = new mongoose.Schema({
  ID: Number,
  title: {
    type: String,
    required: true
  },
  first_name: {
    type: String,
    required: true
  },
  surname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  premium_membership: {
    type: Boolean,
    required: true
  }
})

// credit to this video for the inspiration in terms of counting https://www.youtube.com/watch?v=_GkujEyjJm8
// create schema for counter members
const counterMemberSchema = new mongoose.Schema({
  id: {
    type: String
  },
  sequence: {
    type: Number
  }
})


//memberSchema.plugin(uniqueValidator)

// to format the objects returned by Mongoose to JSON
memberSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Member = mongoose.model('Member', memberSchema)
const counterMember = mongoose.model('counterMember', counterMemberSchema);

module.exports = { Member, counterMember }