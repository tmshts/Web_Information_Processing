const members_classesRouter = require('express').Router()
const service = require('../services/member_class')
const service_member = require('../services/member')
const service_class = require('../services/class')
const { Member_Class, counterMemberClass } = require('../models/member_class');


// define GET routes
members_classesRouter.get('/', async (request, response) => {
  const { member_class_type, member_class_message, member_class_statusCode, members_classes } = await service.getMembers_Classes()
  if (member_class_type === "Error") {
    response
      .status(member_class_statusCode)
      .send({member_class_type, member_class_message})
  }
  if (member_class_type === "Success") {
    response
      .status(member_class_statusCode)
      .send(members_classes)
  }
})

members_classesRouter.get('/member_class/:id', async (request, response) => {
  const id = request.params.id
  const { member_class_type, member_class_message, member_class_statusCode, member_class } = await service.findMember_Class(id)
  if (member_class_type === "Error") {
    response
      .status(member_class_statusCode)
      .send({member_class_type, member_class_message})
  }
  if (member_class_type === "Success") {
    response
      .status(member_class_statusCode)
      .send(member_class)
  }
})

members_classesRouter.get('/member_class/objectID/:id', async (request, response) => {
  const id = request.params.id
  const { member_class_type, member_class_message, member_class_statusCode, member_class } = await service.findMemberBasedOnObjectID(id)
  if (member_class_type === "Error") {
    response
      .status(member_class_statusCode)
      .send({member_class_type, member_class_message})
  }
  if (member_class_type === "Success") {
    response
      .status(member_class_statusCode)
      .send(member_class)
  }
})

members_classesRouter.delete('/member_class/:id', async (request, response) => {

    const id = request.params.id

    // take the member class which will be deleted
    const member_class = await Member_Class.find({ID: id})

    const { member_class_type, member_class_message, member_class_statusCode } = await service.deleteMember_Class(id)
    if (member_class_type === "Error") {
      response
        .status(member_class_statusCode)
        .send({member_class_type, member_class_message})
    }
    if (member_class_type === "Success") {

        // handle taken classes
        // if member_class is found -> class_ID exists
        const { classes_type, classes_message, classes_statusCode, classes } = await service_class.findClasses(member_class[0].taken_classes)

        if (classes_type === "Success") {
    
    
            for(let i = 0; i < classes.length; i++) {
                const class_object = classes[i]

                const classToUpdate = {
                  "name": class_object.name,
                  "day": class_object.day,
                  "session_length": class_object.session_length,
                  "price": class_object.price,
                  "number_of_members": class_object.number_of_members - 1
                }

                await service_class.updateClass(classes[i].ID, classToUpdate);
            }
          }

        response
          .status(member_class_statusCode)
          // since member_class_message not working, no member_class_message is sent
          .send({member_class_message})
    }
})

// define POST routes
members_classesRouter.post('/', async (request, response) => {

  const { member_ID, taken_classes } = request.body;
  if(Object.keys(taken_classes).length != 3) {
    response
      .status(404)
      .send({"Error": "Member needs to take 3 classes"})
  }
  else {
      // check if member_id exist in database
      const { member_type, member_message, member_statusCode, member } = await service_member.findMemberBasedOnObjectID(member_ID)
      if (member_type === "Error") {
        response
          .status(member_statusCode)
          .send({member_type, member_message})
      }
      if (member_type === "Success") {

            // check if taken_classes exist in database
            const { classes_type, classes_message, classes_statusCode, classes } = await service_class.findClasses(taken_classes)

            if (classes_type === "Error") {
              response
                .status(classes_statusCode)
                .send({classes_type, classes_message})
            }
      
            if (classes_type === "Success") { 
                            
                // check if member_id has already taken some classes
                const { member_class_1_type, member_class_1_message, member_class_1_statusCode } = await service.findMemberHasClasses(member_ID);

                // no member has not taken any classes
                if(member_class_1_type === "Success") {

                    // insert member_class into mongo
                    const { member_class_type, member_class_message, member_class_statusCode, savedMemberClass } = await service.insertMember_Class(member_ID, taken_classes);
                
                    if (member_class_type === "Error") {
                      response
                        .status(member_class_statusCode)
                        .send({member_class_type, member_class_message})
                    }
                    if (member_class_type === "Success") {



                          // handle taken classes
                          for(let i = 0; i < Object.keys(taken_classes).length; i++) {

                            // update number_of_members in taken classes
                            const { class_type, class_message, class_statusCode, clas } = await service_class.findClassBasedOnObjectID(taken_classes[i].class_ID)

                            if (class_type === "Success") {

                                const class_object = clas

                                const classToUpdate = {
                                    "name": class_object.name,
                                    "day": class_object.day,
                                    "session_length": class_object.session_length,
                                    "price": class_object.price,
                                    "number_of_members": class_object.number_of_members + 1
                                }

                                await service_class.updateClass(class_object.ID, classToUpdate);
                            }
                        }

                        // update number_of_members in taken_classes in services
                        response
                          .status(member_class_statusCode)
                          .send(savedMemberClass)  

                    }
                }

                // member already took some classes
                  if(member_class_1_type === "Error") {
                    response
                    .status(member_class_1_statusCode)
                    .send({member_class_1_type, member_class_1_message})
                }
            }
        }
  }  
})


members_classesRouter.put('/member_class/:id', async (request, response) => {

  const id = request.params.id

  const { member_ID, taken_classes } = request.body;

  if(Object.keys(taken_classes).length != 3) {
    response
      .status(404)
      .send({"Error": "Member needs to take at least 3 classes"})
  }
  else {
      // check if member_id exist in database
      const { member_type, member_message, member_statusCode, member } = await service_member.findMemberBasedOnObjectID(member_ID)
      if (member_type === "Error") {
        response
          .status(member_statusCode)
          .send({member_type, member_message})
      }
      if (member_type === "Success") {

            // check if taken_classes exist in database
            const { classes_type, classes_message, classes_statusCode, classes } = await service_class.findClasses(taken_classes)

            if (classes_type === "Error") {
              response
                .status(classes_statusCode)
                .send({classes_type, classes_message})
            }
      
            if (classes_type === "Success") { 

                  // get member_class before updating
                  const member_class = await Member_Class.find({ID: id})

                  // update member_class into mongo
                  const { member_class_type, member_class_message, member_class_statusCode, updatedMember_Class } = await service.updateMember_Class(id, member_ID, taken_classes);

                  if (member_class_type === "Error") {
                    response
                      .status(member_class_statusCode)
                      .send({member_class_type, member_class_message})
                  }
                  if (member_class_type === "Success") {

                            // handle updates of number of members in taken classes

                            let old_member_class_lenght = member_class[0].taken_classes.length;

                            const updated_member_class = await Member_Class.find({ID: id})

                            let updated_member_class_length = updated_member_class[0].taken_classes.length;

                            if(old_member_class_lenght == updated_member_class_length) {
                                for(let i = 0; i < old_member_class_lenght; i++) {
        
                                    // added class in updated member classes and removed class in old member classes 
                                    if (member_class[0].taken_classes[i].class_ID.valueOf() != updated_member_class[0].taken_classes[i].class_ID.valueOf()) {

                                          // update number_of_members in taken classes -> decrease
                                          const { class_type, class_message, class_statusCode, clas } = await service_class.findClassBasedOnObjectID(member_class[0].taken_classes[i].class_ID.valueOf())

                                              const class_object = clas
                  
                                              const classToUpdate = {
                                                  "name": class_object.name,
                                                  "day": class_object.day,
                                                  "session_length": class_object.session_length,
                                                  "price": class_object.price,
                                                  "number_of_members": class_object.number_of_members - 1
                                              }
                  
                                              await service_class.updateClass(class_object.ID, classToUpdate);

                                          // update number_of_members in taken classes -> increase
                                          const { class_2_type, class_2_message, class_2_statusCode, clas_2 } = await service_class.findClassBasedOnObjectID_2(updated_member_class[0].taken_classes[i].class_ID.valueOf())

                                              const class_object_2 = clas_2

                                              const classToUpdate_2 = {
                                                  "name": class_object_2.name,
                                                  "day": class_object_2.day,
                                                  "session_length": class_object_2.session_length,
                                                  "price": class_object_2.price,
                                                  "number_of_members": class_object_2.number_of_members + 1
                                              }

                                              await service_class.updateClass(class_object_2.ID, classToUpdate_2);

                                    }
                                }
                            }
                      response
                        .status(member_class_statusCode)
                        .send(updatedMember_Class)  

                  }

            }
      }
  }
})


module.exports = members_classesRouter;