const mongoose = require('mongoose')
//const uniqueValidator = require('mongoose-unique-validator')

// create schema for member class link
const member_classSchema = new mongoose.Schema(
  {
    ID: Number,
    member_ID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Member'
    },
    taken_classes: [
      {
        class_ID: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Gym_Class'
        }
      }
    ]
  },
    /*
    member_ID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Member'
    },
    class_ID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Gym_Class'
    },
    */
  { timestamps: true } 
)

// credit to this video for the inspiration in terms of counting https://www.youtube.com/watch?v=_GkujEyjJm8
// create schema for counter members
const counterMemberClassSchema = new mongoose.Schema({
  id: {
    type: String
  },
  sequence: {
    type: Number
  }
})

//member_classSchema.plugin(uniqueValidator)

// to format the objects returned by Mongoose to JSON
member_classSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Member_Class = mongoose.model('Member_Class', member_classSchema)
const counterMemberClass = mongoose.model('counterMemberClass', counterMemberClassSchema);

module.exports = { Member_Class, counterMemberClass }