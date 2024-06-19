const membersRouter = require('express').Router()
const service = require('../services/member')


// define GET routes
membersRouter.get('/', async (request, response) => {
  const { member_type, member_message, member_statusCode, members } = await service.getMembers()
  if (member_type === "Error") {
    response
      .status(member_statusCode)
      .send({member_type, member_message})
  }
  if (member_type === "Success") {
    response
      .status(member_statusCode)
      .send(members)
  }
})

membersRouter.get('/member/:id', async (request, response) => {
  const id = request.params.id
  const { member_type, member_message, member_statusCode, member } = await service.findMember(id)
  if (member_type === "Error") {
    response
      .status(member_statusCode)
      .send({member_type, member_message})
  }
  if (member_type === "Success") {
    response
      .status(member_statusCode)
      .send(member)
  }
})

membersRouter.get('/member/objectID/:id', async (request, response) => {
  const id = request.params.id
  const { member_type, member_message, member_statusCode, member } = await service.findMemberBasedOnObjectID(id)
  if (member_type === "Error") {
    response
      .status(member_statusCode)
      .send({member_type, member_message})
  }
  if (member_type === "Success") {
    response
      .status(member_statusCode)
      .send(member)
  }
})


membersRouter.get('/:surname', async (request, response) => {
  const surname = request.params.surname
  const { member_type, member_message, member_statusCode, member }  = await service.getSelectedMembers(surname)

  if (member_type === "Error") {
    response
      .status(member_statusCode)
      .send({member_type, member_message})
  }
  if (member_type === "Success") {
    response
      .status(member_statusCode)
      .send(member)
  }
})


membersRouter.delete('/member/:id', async (request, response) => {

    const id = request.params.id

    const { member_type, member_message, member_statusCode } = await service.deleteMember(id)
    if (member_type === "Error") {
      response
        .status(member_statusCode)
        .send({member_type, member_message})
    }
    if (member_type === "Success") {
      response
        .status(member_statusCode)
        // since member_message not working, no member_message is sent
        .send({member_message})
    }
})

// define POST routes
membersRouter.post('/', async (request, response) => {

  const { title, first_name, surname, email, premium_membership } = request.body;

  const { member_type, member_message, member_statusCode, savedMember }  = await service.insertMember( title, first_name, surname, email, premium_membership );
  
  if (member_type === "Error") {
    response
      .status(member_statusCode)
      .send({member_type, member_message})
  }
  if (member_type === "Success") {
    response
      .status(member_statusCode)
      .send(savedMember)
  }
})

membersRouter.put('/member/:id', async (request, response) => {
  const id = request.params.id

  const { title, first_name, surname, email, premium_membership } = request.body;

  const { member_type, member_message, member_statusCode, updatedMember }  = await service.updateMember( id, title, first_name, surname, email, premium_membership );

  if (member_type === "Error") {
    response
      .status(member_statusCode)
      .send({member_type, member_message})
  }
  if (member_type === "Success") {
    response
      .status(member_statusCode)
      .send(updatedMember)
  }
})


module.exports = membersRouter;