const { Member_Class, counterMemberClass } = require('../models/member_class');

//const service_member = require('../services/member')
const service_class = require('./class')

// get all member class links
getMembers_Classes = async () => {
    try {
        const members_classes = await Member_Class.find({})
        console.log("Retrieved all Member Class link")
        console.log(members_classes)
            return {
                member_class_type: 'Success',
                member_class_statusCode: 200,
                members_classes
             };
    }
    catch (error) {
        return {
            member_class_type: 'Error',
            member_class_statusCode: 404,
            member_class_message: error.message
          };
    }
}

// get particular member class link based on id
findMember_Class = async (id) => {
  try {
        const member_class = await Member_Class.find({ID: id})

      if (member_class.length === 0) {
          return {
              member_class_type: 'Error',
              member_class_statusCode: 404,
              member_class_message: `No Member Class link with id ${id}`
           }
      }
      else {
          console.log("Retrieved a particular Member Class link with id " + id)
          console.log(member_class)
          return {
              member_class_type: 'Success',
              member_class_statusCode: 200,
              member_class
          }
      }
  }
  catch (error) {
      return {
          member_class_type: 'Error',
          member_class_statusCode: 404,
          member_class_message: error.message
        };
  }
}

// get particular Member Class link based on Object id
findMemberBasedOnObjectID = async (id) => {
    try {
        const member_class = await Member_Class.findById(id)

        if (member_class === null) {
            return {
                member_class_type: 'Error',
                member_class_statusCode: 404,
                member_class_message: `No Member Class found with id ${id}`
             }
        }
        else {
            console.log("Retrieved a particular Member Class based on Object ID " + id)
            console.log(member_class)
            return {
                member_class_type: 'Success',
                member_class_statusCode: 200,
                member_class
            }
        }
    }
    catch (error) {
        return {
            member_class_type: 'Error',
            member_class_statusCode: 404,
            member_class_message: error.message
          };
    }
}

// get particular Member Class based on id
findMemberHasClasses = async (member_ID) => {
    try {

        const member_class = await Member_Class.find({member_ID: member_ID})
  
        if (member_class.length === 0) {
            return {
                member_class_1_type: 'Success',
                member_class_1_statusCode: 200,
                member_class_1_message: `Member with id ${member_ID} can take the classes`
             }
        }
        else {
            return {
                member_class_1_type: 'Error',
                member_class_1_statusCode: 404,
                member_class_1_message: `Member with id ${member_ID} has already taken some classes`
            }
        }
    }
    catch (error) {
        return {
            member_class_1_type: 'Error',
            member_class_1_statusCode: 404,
            member_class_1_message: error.message
          };
    }
  }


// delete particular member class link based on id
deleteMember_Class = async (id) => {
  try {
        const member_class = await Member_Class.find({ID: id})

        if (member_class.length === 0) {
            return {
                member_class_type: 'Error',
                member_class_statusCode: 404,
                member_class_message: `No Member Class link found with id ${id}`
            }
        }

                let generated_id = member_class[0].id

                const deletedMember_Class = await Member_Class.findByIdAndDelete(generated_id)

                console.log("Deleted a particular Member Class link with id " + id)
                console.log(member_class[0])
                return {
                    member_class_type: 'Success',
                    member_class_statusCode: 204,
                    // member_class_message not working
                    member_class_message: `Member Class link with id ${id} deleted`
                }
        
  }
  catch (error) {
      return {
            member_class_type: 'Error',
            member_class_statusCode: 404,
            member_class_message: error.message
        };
  }
}


// create new member class link
insertMember_Class = async ( member_ID, taken_classes ) => {

      // no need to validate the member_id neither class_id as they have already been validated in controller
      // -> if we are here -> member_id and class_id are correct
      try {
            let updatedID;
            updatedCounter = await counterMemberClass.findOneAndUpdate(
                {id: "autoval"},
                {"$inc":{"sequence":1}},
                {new: true})
                
            if(updatedCounter == null) {
                const new_value = new counterMemberClass({id: "autoval",sequence: 1})
                new_value.save();
                updatedID = 1;
            } else {
                updatedID = updatedCounter.sequence;
            }

            const member_class = new Member_Class({
                ID: updatedID,
                member_ID: member_ID,
                taken_classes: taken_classes
            })
          
            const savedMemberClass = await member_class.save()
            console.log("Inserted new Member Class link.")
            console.log(savedMemberClass)
    
            
            return {
                member_class_type: 'Success',
                member_class_statusCode: 201,
                savedMemberClass
              };
              
        }
        catch (error) {
            return {
                member_class_type: 'Error',
                member_class_statusCode: 400,
                member_class_message: error.message
              };
        }
        
}

// update a particular member class link based on id
updateMember_Class = async ( id, member_ID, taken_classes ) => {

    // no need to validate the member id neither taken classes as they have already been validated in controller
    // -> if we are here -> member id and taken classes are correct
    try {
        const member_class_ToUpdate = {
          member_ID: member_ID,
          taken_classes: taken_classes,
        }

        const member_class = await Member_Class.find({ID: id})

        if (member_class.length === 0) {
            return {
                member_class_type: 'Error',
                member_class_statusCode: 404,
                member_class_message: `No Member Class link found with id ${id}`
             }
        }

        let generated_id = member_class[0].id

      const updatedMember_Class = await Member_Class.findByIdAndUpdate(generated_id, member_class_ToUpdate, { new: true })

      /*
      if (updatedMember_Class.length === 0) {
          return {
            member_class_type: 'Error',
            member_class_statusCode: 404,
            member_class_message: `No Member Class link found with id ${id}`
        }
      }
      */

      //else {
          console.log("Updated a particular Member Class with id " + id)
          console.log(updatedMember_Class)
          return {
                member_class_type: 'Success',
                member_class_statusCode: 204,
                updatedMember_Class
          }
      //}
  }
  catch (error) {
      return {
            member_class_type: 'Error',
            member_class_statusCode: 404,
            member_class_message: error.message
      };
  }
}


module.exports = { getMembers_Classes, findMember_Class, findMemberBasedOnObjectID, findMemberHasClasses, deleteMember_Class, insertMember_Class, updateMember_Class }