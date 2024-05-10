const Item = require('../models/item');
let mongoose = require('mongoose');


// get all items
getItems = async () => {
    try {
        const items = await Item
            .find({})
        console.log("Retrieved all items")
        console.log(items)
            return {
                item_type: 'Success',
                item_statusCode: 200,
                items
             };
    }
    catch (error) {
        return {
            item_type: 'Error',
            item_statusCode: 404,
            item_message: error.message
          };
    }
}

// get particular item based on id
findItem = async (id) => {
    try {
        const item = await Item.findById(id)

        if (item === null) {
            return {
                item_type: 'Error',
                item_statusCode: 404,
                item_message: `No item found with id ${id}`
             }
        }
        else {
            console.log("Retrieved a particular item " + item.model)
            console.log(item)
            return {
                item_type: 'Success',
                item_statusCode: 200,
                item
            }
        }
    }
    catch (error) {
        return {
            item_type: 'Error',
            item_statusCode: 404,
            item_message: error.message
          };
    }
}

// get particular item based on model
getSelectedItems = async (model) => {
    try {
        const item = await Item.find({model: new RegExp(model)})

        console.log("Retrieved selected items based on model")
        console.log(item)

        return {
            item_type: 'Success',
            item_statusCode: 200,
            item
        }
    }
    catch (error) {
        return {
            item_type: 'Error',
            item_statusCode: 404,
            item_message: error.message
          };
    }
}

// get items based on ids
findItems = async (bought_items) => {

    try {

        let bought_items_length = bought_items.length
        let new_array = new Array(bought_items);
        new_array = []

        for(let i = 0; i < bought_items_length; i++) {
            let the_item = bought_items[i].item_id 
            let cond = mongoose.Types.ObjectId.isValid(the_item)
            if (cond) {
                let newObjectId = new mongoose.mongo.ObjectId(the_item);
                new_array.push(newObjectId)
            }
        }
        
        const items = await Item.find({"_id" : {"$in" : new_array}});

        if (items.length === bought_items_length) {
            console.log("Retrieved items")
            console.log(items)
            return {
                item_type: 'Success',
                item_statusCode: 200,
                items
            }
        }
        else {
            return {
                item_type: 'Error',
                item_statusCode: 404,
                item_message: 'Item id is wrong'
             }
        }
        
    }
    catch (error) {
        return {
            item_type: 'Error',
            item_statusCode: 404,
            item_message: error.message
          };
    }
}

// get particular user id based on mobile
findItemBasedOnModel = async (model) => {
    try {
        const item = await Item.find({model: model})

        if (item.length == 0) {
            return {
                item_type: 'Error',
                item_statusCode: 404,
                item_message: `No item found for model ${model}`
             }
        }
        else {
            //console.log("Retrieved a particular customer id based on mobile")
            //console.log(customer[0]._id.toString())
            const item_id = item[0]._id.toString();
            return item_id;
            /*
            return {
                item_type: 'Success',
                item_statusCode: 200,
                item_id
            }
            */
        }
    }
    catch (error) {
        return {
            item_type: 'Error',
            item_statusCode: 404,
            item_message: error.message
          };
    }
}

// delete particular item based on id
deleteItem = async (id) => {
    try {
        const item = await Item.findById(id)
        const deletedItem = await Item.findByIdAndDelete(id)

        if (deletedItem === null) {
            return {
                item_type: 'Error',
                item_statusCode: 404,
                item_message: `No item found with id ${id}`
             }
        }
        else {
            console.log("Deleted a particular item " + id)
            console.log(item)
            return {
                item_type: 'Success',
                item_statusCode: 204,
                // item_message not working
                item_message: `Item ${item.model} deleted`
            }
        }
    }
    catch (error) {
        return {
            item_type: 'Error',
            item_statusCode: 404,
            item_message: error.message
          };
    }
}


function isNumber(value) {
    return typeof value === 'number';
  }

// create new item
insertItem = async ( manufacturer, model, price ) => {

        try {
          if (!manufacturer) {
            return {
                item_type: 'Error',
                item_statusCode: 400,
                item_message: 'Manufacturer is missing.'
              };
          }
  
          if (!model) {
            return {
                item_type: 'Error',
                item_statusCode: 400,
                item_message: 'Model is missing.'
              };
          }
  
          if (!price) {
            return {
                item_type: 'Error',
                item_statusCode: 400,
                item_message: 'Price is missing.'
              };
          }

  
          const item = new Item({
            manufacturer: manufacturer,
            model: model,
            price: price,
          })

          const savedItem = await item.save()
          console.log("Inserted new item " + model)
          console.log(savedItem)
          return {
            item_type: 'Success',
            item_statusCode: 201,
            savedItem
            };
        }
        catch (error) {
            return {
                item_type: 'Error',
                item_statusCode: 400,
                item_message: error.message
              };
        }
}


// update a particular item based on id
updateItem = async (id, manufacturer, model, price) => {

        try {
            if (!manufacturer) {
                return {
                    item_type: 'Error',
                    item_statusCode: 400,
                    item_message: 'Manufacturer is missing.'
                  };
              }
            
              if (!model) {
                return {
                    item_type: 'Error',
                    item_statusCode: 400,
                    item_message: 'Model is missing.'
                  };
              }
      
              if (!price) {
                return {
                    item_type: 'Error',
                    item_statusCode: 400,
                    item_message: 'Price is missing.'
                  };
              }
      

            const itemToUpdate = {
                manufacturer: manufacturer,
                model: model,
                price: price
            }
        
            const updatedItem = await Item.findByIdAndUpdate(id, itemToUpdate, { new: true })

            if (updatedItem === null) {
                return {
                    item_type: 'Error',
                    item_statusCode: 404,
                    item_message: `No item found with id ${id}`
                 }
            }
            else {
                console.log("Updated a particular item " + model)
                console.log(updatedItem)
                return {
                    item_type: 'Success',
                    item_statusCode: 204,
                    updatedItem
                }
            }
        }
        catch (error) {
            return {
                item_type: 'Error',
                item_statusCode: 404,
                item_message: error.message
            };
        }
}




module.exports = { getItems, findItem, findItemBasedOnModel, getSelectedItems, insertItem, deleteItem, updateItem, findItems }