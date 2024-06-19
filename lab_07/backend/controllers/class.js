const classesRouter = require('express').Router()
const service = require('../services/class')
const service_member_class = require('../services/member_class')
const { Gym_Class, counterClass } = require('../models/class');


// define GET routes
classesRouter.get('/', async (request, response) => {
  const { class_type, class_message, class_statusCode, classes } = await service.getClasses()
  if (class_type === "Error") {
    response
      .status(class_statusCode)
      .send({class_type, class_message})
  }
  if (class_type === "Success") {
    response
      .status(class_statusCode)
      .send(classes)
  }
})

classesRouter.get('/class/:id', async (request, response) => {
  const id = request.params.id
  const { class_type, class_message, class_statusCode, clas } = await service.findClass(id)
  if (class_type === "Error") {
    response
      .status(class_statusCode)
      .send({class_type, class_message})
  }
  if (class_type === "Success") {
    response
      .status(class_statusCode)
      .send(clas)
  }
})

classesRouter.get('/class/objectID/:id', async (request, response) => {
  const id = request.params.id
  const { class_type, class_message, class_statusCode, clas } = await service.findClassBasedOnObjectID(id)
  if (class_type === "Error") {
    response
      .status(class_statusCode)
      .send({class_type, class_message})
  }
  if (class_type === "Success") {
    response
      .status(class_statusCode)
      .send(clas)
  }
})

classesRouter.get('/:name', async (request, response) => {
  const name = request.params.name
  const { class_type, class_message, class_statusCode, clas }  = await service.getSelectedClasses(name)

  if (class_type === "Error") {
    response
      .status(class_statusCode)
      .send({class_type, class_message})
  }
  if (class_type === "Success") {
    response
      .status(class_statusCode)
      .send(clas)
  }
})

classesRouter.delete('/class/:id', async (request, response) => {

  const id = request.params.id

    // take the class which will be deleted
  const classFind = await Gym_Class.find({ID: id})

  const { class_type, class_message, class_statusCode } = await service.deleteClass(id)
  if (class_type === "Error") {
    response
      .status(class_statusCode)
      .send({class_type, class_message})
  }
  if (class_type === "Success") {

            let generated_id = classFind[0].id

            // delete all class_id in member_class
            const { member_class_type, member_class_message, member_class_statusCode, members_classes } = await service_member_class.getMembers_Classes()

                // if class_id exists in Member Class
                if(members_classes.length != 0) {

                        for(let i = 0; i < members_classes.length; i++) {

                            let taken_classes_length = members_classes[i].taken_classes.length

                            let valid_classes = [];

                            for(let j = 0; j < taken_classes_length; j++) {

                                let particular_objectID = members_classes[i].taken_classes[j].class_ID.valueOf()

                                // class is in list -> class is deleted
                                if(generated_id != particular_objectID) {
                                    //console.log("class is in list")
                                //}
                                // class is not in list
                                //else {
                                    // add to valid_classes a class which is not deleted
                                    valid_classes.push(members_classes[i].taken_classes[j])
                                }
                            }


                            //for(let a = 0; a < valid_classes.length; a++) {
                                // console.log("valid_classes[a]")
                                // console.log(valid_classes[a])
                            //}
                            // after each iteration add valid_classes into Member Class collection -> update Member Class collection
                            const { member_class_type, member_class_message, member_class_statusCode, updatedMember_Class } = await service_member_class.updateMember_Class(members_classes[i].ID, members_classes[i].member_ID.valueOf(), valid_classes);

                        }
                }



    response
      .status(class_statusCode)
      // since class_message not working, no class_message is sent
      .send({class_message})
  }
})

// define POST routes
classesRouter.post('/', async (request, response) => {

  const { name, day, session_length, price, number_of_members } = request.body;

  const { class_type, class_message, class_statusCode, savedClass }  = await service.insertClass( name, day, session_length, price, number_of_members );
  
  if (class_type === "Error") {
    response
      .status(class_statusCode)
      .send({class_type, class_message})
  }
  if (class_type === "Success") {
    response
      .status(class_statusCode)
      .send(savedClass)
  }
})

classesRouter.put('/class/:id', async (request, response) => {
  const id = request.params.id
  const { class_type, class_message, class_statusCode, updatedClass }  = await service.updateClass( id, request.body );
  
  if (class_type === "Error") {
    response
      .status(class_statusCode)
      .send({class_type, class_message})
  }
  if (class_type === "Success") {
    response
      .status(class_statusCode)
      .send(updatedClass)
  }
})



module.exports = classesRouter;