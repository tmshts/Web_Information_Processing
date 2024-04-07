const usersRouter = require('express').Router()
const service = require('../services/users')

// define GET routes
usersRouter.get('/', async (request, response) => {
    const users = await service.getUsers()
    console.log("Retrieve all the users with related data")
    console.log(users)
    response.send(users)
})
usersRouter.get('/:surname', async (request, response) => {
    const surname = request.params.surname
    const users = await service.getSelectedUsers(surname)
    console.log("Retrieve all the users matching a supplied name")
    console.log(users)
    response.send(users)
})
usersRouter.get('/user/:id', async (request, response) => {
    const id = parseInt(request.params.id)
    const user = await service.getSelectedUserById(id)
    console.log("Retrive a particular user")
    console.log(user)
    response.send(user)
})

// define POST route
usersRouter.post('/', async (request, response) => {
    const { title, first_name, surname, mobile, email, home_address_1, home_address_2, home_town, home_city, home_eircode, shipping_address_1, shipping_address_2, shipping_town, shipping_city, shipping_eircode } = request.body;
    const user = await service.createUser( title, first_name, surname, mobile, email, home_address_1, home_address_2, home_town, home_city, home_eircode, shipping_address_1, shipping_address_2, shipping_town, shipping_city, shipping_eircode );
    console.log("Created user")
    console.log(user)
    response.send(user)
})

// define PUT route for update
usersRouter.put('/user/:id', async (request, response) => {
    const id = request.params.id;
    const { title, mobile, email, home_address_1, home_address_2, home_town, home_city, home_eircode, shipping_address_1, shipping_address_2, shipping_town, shipping_city, shipping_eircode } = request.body;
    const user = await updateUser(id, title, mobile, email, home_address_1, home_address_2, home_town, home_city, home_eircode, shipping_address_1, shipping_address_2, shipping_town, shipping_city, shipping_eircode);
    console.log("Updated a specified user and all or any of their address data")
    console.log(user)
    response.send(user)
})

// define DELETE route
usersRouter.delete('/', async (request, response) => {
    //const id = request.params.id
    const { first_name, surname, mobile, email } = request.body;
    const user = await deleteUser(first_name, surname, mobile, email);
    console.log(first_name + " " + surname + " has just been deleted.")
    response.send(user)
})

module.exports = usersRouter;