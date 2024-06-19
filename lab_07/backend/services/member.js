const { Member, counterMember } = require('../models/member');
const service_member_class = require('./member_class')
const service_class = require('./class')
const { Member_Class, counterMemberClass } = require('../models/member_class');


// get all members
getMembers = async () => {
    try {
        const members = await Member
                                    .find({})
                                    
        console.log("Retrieved all members")
        console.log(members)
            return {
                member_type: 'Success',
                member_statusCode: 200,
                members
             };
    }
    catch (error) {
        return {
            member_type: 'Error',
            member_statusCode: 404,
            member_member_message: error.message
          };
    }
}


// get particular member based on id
findMember = async (id) => {
    try {
        const member = await Member.find({ID: id})

        if (member.length === 0) {
            return {
                member_type: 'Error',
                member_statusCode: 404,
                member_message: `No member found with id ${id}`
             }
        }
        else {
            console.log("Retrieved a particular member " + member[0].first_name + " " + member[0].surname)
            console.log(member)
            return {
                member_type: 'Success',
                member_statusCode: 200,
                member
            }
        }
    }
    catch (error) {
        return {
            member_type: 'Error',
            member_statusCode: 404,
            member_message: error.message
          };
    }
}

// get particular member based on Object id
findMemberBasedOnObjectID = async (id) => {
    try {
        const member = await Member.findById(id)

        if (member === null) {
            return {
                member_type: 'Error',
                member_statusCode: 404,
                member_message: `No member found with id ${id}`
             }
        }
        else {
            console.log("Retrieved a particular member based on Object ID " + member.first_name + " " + member.surname)
            console.log(member)
            return {
                member_type: 'Success',
                member_statusCode: 200,
                member
            }
        }
    }
    catch (error) {
        return {
            member_type: 'Error',
            member_statusCode: 404,
            member_message: error.message
          };
    }
}

// query for matching customers based on name
getSelectedMembers = async (name) => {
    try {
        const member = await Member.find({surname: new RegExp(name)})

        console.log("Retrieved selected members based on surname")
        console.log(member)

        return {
            member_type: 'Success',
            member_statusCode: 200,
            member
        }
    }
    catch (error) {
        return {
            member_type: 'Error',
            member_statusCode: 404,
            member_message: error.message
          };
    }
}


// delete particular member based on id
deleteMember = async (id) => {
    try {
        const memberFind = await Member.find({ID: id})

        if (memberFind.length === 0) {
            return {
                member_type: 'Error',
                member_statusCode: 404,
                member_message: `No member found with id ${id}`
             }
        }

        let generated_id = memberFind[0].id

            // take the Member Class which will be deleted
            const member_class = await Member_Class.find({member_ID: generated_id})

            //await service_member_class.deleteMember_Class(member_class[0].ID)
            
                 // if member has taken some classes -> Member Class exists
                if(member_class.length != 0) {

                    const { member_class_type, member_class_message, member_class_statusCode, members_classes } = await service_member_class.getMembers_Classes()
        
                    for(let i = 0; i < members_classes.length; i++) {

                        let particular_objectID = members_classes[i].member_ID.valueOf()

                        // class is in list -> class is deleted
                        if(generated_id == particular_objectID) {
                            // delete Member Class containing member ID
                            await service_member_class.deleteMember_Class(members_classes[i].ID)
                        }
                    }

                    // decrease number of members in the taken classes from the member who has just been deleted
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
                }

        const deletedMember = await Member.findByIdAndDelete(generated_id)

        console.log("Deleted a particular member " + memberFind[0].first_name + " " + memberFind[0].surname)
        console.log(memberFind[0])

        return {
            member_type: 'Success',
            member_statusCode: 204,
            // message not working
            member_message: `Member ${memberFind[0].first_name} deleted`
        }
    }
    catch (error) {
        return {
            member_type: 'Error',
            member_statusCode: 404,
            member_message: error.message
          };
    }
}

// create new member
insertMember = async ( title, first_name, surname, email, premium_membership) => {

    if (title === "Mx" || title === "Ms" || title === "Mr" || title === "Mrs" || title === "Miss" || title === "Dr" || title === "Other" ) {
        try {

            let updatedID;
            updatedCounter = await counterMember.findOneAndUpdate(
                {id: "autoval"},
                {"$inc":{"sequence":1}},
                {new: true})

                
            if(updatedCounter == null) {
                const new_value = new counterMember({id: "autoval",sequence: 1})
                new_value.save();
                updatedID = 1;
            } else {
                updatedID = updatedCounter.sequence;
            }        
                  
          const member = new Member({
            ID: updatedID,
            title: title,
            first_name: first_name,
            surname: surname,
            email: email,
            premium_membership: premium_membership
          })

          const savedMember = await member.save()
          console.log("Inserted new member " + savedMember.first_name + " " + savedMember.surname)
          console.log(savedMember)
          return {
            member_type: 'Success',
            member_statusCode: 201,
            savedMember
            };
        }
        catch (error) {
            return {
                member_type: 'Error',
                member_statusCode: 400,
                member_message: error.message
              };
        }
      }
    else {
        return {
            member_type: 'Error',
            member_statusCode: 400,
            member_message: "title is not recognized."
        };
    }
}

// update a particular member based on id
updateMember = async (id, title, first_name, surname, email, premium_membership) => {
    if (title === "Mx" || title === "Ms" || title === "Mr" || title === "Mrs" || title === "Miss" || title === "Dr" || title === "Other" ) {

        try {

            const memberToUpdate = {
                title: title,
                first_name: first_name,
                surname: surname,
                email: email,
                premium_membership: premium_membership
            }

            const member = await Member.find({ID: id})

            if (member.length === 0) {
                return {
                    member_type: 'Error',
                    member_statusCode: 404,
                    member_message: `No member found with id ${id}`
                 }
            }

            let generated_id = member[0].id
        
            const updatedMember = await Member.findByIdAndUpdate(generated_id, memberToUpdate, { runValidators: true, new: true })

            console.log("Updated a particular member " + first_name + " " + surname)
            console.log(updatedMember)
            return {
                member_type: 'Success',
                member_statusCode: 202,
                updatedMember
            }
        }
        catch (error) {
            return {
                member_type: 'Error',
                member_statusCode: 404,
                member_message: error.message
            };
        }
    }
    else {
        return {
            member_type: 'Error',
            member_statusCode: 400,
            member_message: "title is not recognized."
        };
    }
}


module.exports = { getMembers, findMember, findMemberBasedOnObjectID, getSelectedMembers, insertMember, deleteMember, updateMember }