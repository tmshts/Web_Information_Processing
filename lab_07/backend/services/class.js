const { Gym_Class, counterClass } = require('../models/class');
let mongoose = require('mongoose');
const { Member_Class, counterMemberClass } = require('../models/member_class');


// get all classes
getClasses = async () => {
    try {
        const classes = await Gym_Class
            .find({})
        console.log("Retrieved all classes")
        console.log(classes)
            return {
                class_type: 'Success',
                class_statusCode: 200,
                classes
             };
    }
    catch (error) {
        return {
            class_type: 'Error',
            class_statusCode: 404,
            class_message: error.message
          };
    }
}

// get particular class based on id
findClass = async (id) => {
    try {
        const clas = await Gym_Class.find({ID: id})

        if (clas.length === 0) {
            return {
                class_type: 'Error',
                class_statusCode: 404,
                class_message: `No class found with id ${id}`
             }
        }
        else {
            console.log("Retrieved a particular class " + clas[0].name)
            console.log(clas[0])
            return {
                class_type: 'Success',
                class_statusCode: 200,
                clas
            }
        }
    }
    catch (error) {
        return {
            class_type: 'Error',
            class_statusCode: 404,
            class_message: error.message
          };
    }
}

// get particular class based on Object id
findClassBasedOnObjectID = async (id) => {
    try {

        const clas = await Gym_Class.findById(id)

        if (clas === null) {
            return {
                class_type: 'Error',
                class_statusCode: 404,
                class_message: `No class found with id ${id}`
             }
        }
        else {
            console.log("Retrieved a particular class based on Object ID " + clas.name)
            console.log(clas)
            return {
                class_type: 'Success',
                class_statusCode: 200,
                clas
            }
        }
    }
    catch (error) {
        return {
            class_type: 'Error',
            class_statusCode: 404,
            class_message: error.message
          }
    }
}

// get particular class based on Object id 2
findClassBasedOnObjectID_2 = async (id) => {
    try {
        const clas_2 = await Gym_Class.findById(id)

        if (clas_2 === null) {
            return {
                class_2_type: 'Error',
                class_2_statusCode: 404,
                class_2_message: `No class found with id ${id}`
             }
        }
        else {
            console.log("Retrieved a particular class " + clas_2.name)
            console.log(clas_2)
            return {
                class_2_type: 'Success',
                class_2_statusCode: 200,
                clas_2
            }
        }
    }
    catch (error) {
        return {
            class_2_type: 'Error',
            class_2_statusCode: 404,
            class_2_message: error.message
          }
    }
}


// get classes based on class_id
findClasses = async (taken_classes) => {

    try {

        let taken_classes_length = taken_classes.length
        let new_array = new Array(taken_classes);
        new_array = []

        for(let i = 0; i < taken_classes_length; i++) {
            let the_class = taken_classes[i].class_ID 
            let cond = mongoose.Types.ObjectId.isValid(the_class)
            if (cond) {
                let newObjectId = new mongoose.mongo.ObjectId(the_class);
                new_array.push(newObjectId)
            }
        }
        
        const classes = await Gym_Class.find({"_id" : {"$in" : new_array}});

        if (classes.length === taken_classes_length) {
            //console.log("Retrieved classes")
            //console.log(classes)
            return {
                classes_type: 'Success',
                classes_statusCode: 200,
                classes
            }
        }
        else {
            return {
                classes_type: 'Error',
                classes_statusCode: 404,
                classes_message: 'Class id is wrong'
             }
        }
        
    }
    catch (error) {
        return {
            classes_type: 'Error',
            classes_statusCode: 404,
            classes_message: error.message
          };
    }
}

// get particular class/classes based on name
getSelectedClasses = async (name) => {
    try {
        const clas = await Gym_Class.find({name: new RegExp(name)})

        console.log("Retrieved selected classes based on name")
        console.log(clas)

        return {
            class_type: 'Success',
            class_statusCode: 200,
            clas
        }
    }
    catch (error) {
        return {
            class_type: 'Error',
            class_statusCode: 404,
            class_message: error.message
          };
    }
}


// delete particular class based on id
deleteClass = async (id) => {
    try {
        const classFind = await Gym_Class.find({ID: id})

        if (classFind.length === 0) {
            return {
                class_type: 'Error',
                class_statusCode: 404,
                class_message: `No class found with id ${id}`
             }
        }

        let generated_id = classFind[0].id

        const deletedClass = await Gym_Class.findByIdAndDelete(generated_id)

        console.log("Deleted a particular class " + classFind[0].name)
        console.log(classFind[0])
        return {
            class_type: 'Success',
            class_statusCode: 204,
            // class_message not working
            class_message: `Class ${classFind[0].name} deleted`
        }
    }
    catch (error) {
        return {
            class_type: 'Error',
            class_statusCode: 404,
            class_message: error.message
          };
    }
}

// create new class
insertClass = async ( name, day, session_length, price, number_of_members ) => {

        try {
          if (!name) {
            return {
                class_type: 'Error',
                class_statusCode: 400,
                class_message: 'Name is missing.'
              };
          }
  
          if (!day) {
            return {
                class_type: 'Error',
                class_statusCode: 400,
                class_message: 'Day is missing.'
              };
          }
  
          if (!session_length) {
            return {
                class_type: 'Error',
                class_statusCode: 400,
                class_message: 'Session length is missing.'
              };
          }

          if (!price) {
            return {
                class_type: 'Error',
                class_statusCode: 400,
                class_message: 'Price is missing.'
              };
          }

          let updatedID;
          updatedCounter = await counterClass.findOneAndUpdate(
              {id: "autoval"},
              {"$inc":{"sequence":1}},
              {new: true})
              
          if(updatedCounter == null) {
              const new_value = new counterClass({id: "autoval",sequence: 1})
              new_value.save();
              updatedID = 1;
          } else {
              updatedID = updatedCounter.sequence;
          }    

          const clas = new Gym_Class({
            ID: updatedID,
            name: name,
            day: day,
            session_length: session_length,
            price: price,
            number_of_members:number_of_members
          })

          const savedClass = await clas.save()
          console.log("Inserted new class " + name)
          console.log(savedClass)
          return {
            class_type: 'Success',
            class_statusCode: 201,
            savedClass
            };
        }
        catch (error) {
            return {
                class_type: 'Error',
                class_statusCode: 400,
                class_message: error.message
              };
        }
}


// update a particular class based on id
updateClass = async (id, body) => {
    const { name, day, session_length, price, number_of_members } = body;

        try {
            if (!name) {
                return {
                    class_type: 'Error',
                    class_statusCode: 400,
                    class_message: 'Name is missing.'
                  };
              }
      
              if (!day) {
                return {
                    class_type: 'Error',
                    class_statusCode: 400,
                    class_message: 'Day is missing.'
                  };
              }
      
              if (!session_length) {
                return {
                    class_type: 'Error',
                    class_statusCode: 400,
                    class_message: 'Session length is missing.'
                  };
              }
    
              if (!price) {
                return {
                    class_type: 'Error',
                    class_statusCode: 400,
                    class_message: 'Price is missing.'
                  };
              }

            if(number_of_members < 0) {
                return {
                    class_type: 'Error',
                    class_statusCode: 404,
                    class_message: `Number of members can not be under 0`
                 }         
            }

            const classToUpdate = {
                name: name,
                day: day,
                session_length: session_length,
                price: price,
                number_of_members: number_of_members
            }

            const clas = await Gym_Class.find({ID: id})

            if (clas.length === 0) {
                return {
                    class_type: 'Error',
                    class_statusCode: 404,
                    class_message: `No class found with id ${id}`
                 }
            }
            let generated_id = clas[0].id
        
            const updatedClass = await Gym_Class.findByIdAndUpdate(generated_id, classToUpdate, { runValidators: true, new: true })

            console.log("Updated a particular class " + name)
            console.log(updatedClass)
            return {
                class_type: 'Success',
                class_statusCode: 202,
                updatedClass
            }
        }
        catch (error) {
            return {
                class_type: 'Error',
                class_statusCode: 404,
                class_message: error.message
            };
        }
}


/*
// update a particular class based on id
updateClass_helper_1 = async (id, body) => {
    const { name, day, session_length, price, number_of_members } = body;

        try {
            if(number_of_members < 0) {
                return {
                    class_helper_1_type: 'Error',
                    class_helper_1_statusCode: 404,
                    class_helper_1_message: 'Number of members can not be under 0'
                 }         
            }

            const classToUpdate = {
                name: name,
                day: day,
                session_length: session_length,
                price: price,
                number_of_members:number_of_members
            }

            const clas = await Gym_Class.find({ID: id})

            let generated_id = clas[0].id
        
            const updatedClass_helper_1 = await Gym_Class.findByIdAndUpdate(generated_id, classToUpdate, { runValidators: true, new: true })

            console.log("Updated a particular class " + name)
            console.log(updatedClass_helper_1)

            return {
                class_helper_1_type: 'Success',
                class_helper_1_statusCode: 204,
                updatedClass_helper_1
            }
        }
        catch (error) {
            return {
                class_helper_1_type: 'Error',
                class_helper_1_statusCode: 404,
                class_helper_1_message: error.message
            };
        }
}

// update a particular item based on id
updateClass_helper_2 = async (id, body) => {
    const { name, day, session_length, price, number_of_members } = body;

        try {
            if(number_of_members < 0) {
                return {
                    class_helper_2_type: 'Error',
                    class_helper_2_statusCode: 404,
                    class_helper_2_message: 'Number of members can not be under 0'
                 }         
            }

            const classToUpdate = {
                name: name,
                day: day,
                session_length: session_length,
                price: price,
                number_of_members:number_of_members
            }

            const clas = await Gym_Class.find({ID: id})

            let generated_id = clas[0].id
        
            const updatedClass_helper_2 = await Gym_Class.findByIdAndUpdate(generated_id, classToUpdate, { runValidators: true, new: true })
            console.log("Updated a particular class " + name)
            console.log(updatedClass_helper_2)

            return {
                class_helper_2_type: 'Success',
                class_helper_2_statusCode: 204,
                updatedClass_helper_2
            }
        }
        catch (error) {
            return {
                class_helper_2_type: 'Error',
                class_helper_2_statusCode: 404,
                class_helper_2_message: error.message
            };
        }
}
*/



module.exports = { getClasses, findClass, findClassBasedOnObjectID, findClassBasedOnObjectID_2, findClasses, getSelectedClasses, insertClass, deleteClass, updateClass }