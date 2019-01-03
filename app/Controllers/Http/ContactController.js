'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with contacts
 */

const Contact = use('App/Models/Contact');
const User = use('App/Models/User')

class ContactController {

  async contact({ params, response }){
    try{
      const { id } = params;
      const contact = await Contact.find(id)
      return response.status(201).json(contact)
    }catch(e){
      return response.status(404).json({ message: "I can't found user" })
    }
  }

  /**
   * Show a list of all contacts.
   * GET contacts
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, auth }) {
    try{
      const user = await auth.getUser()
      let contacts = await user.contacts().fetch()
      
      return response.status(200).json(contacts)
    }catch(e){
      return response.status(409).json({ message : "I have a confict" } )
    }
  }

  /**
   * Create/save a new contact.
   * POST contacts
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, auth }) {
    const _only = [ 'name', 'email', 'rol', 'tel' ]
    const { name, email, rol, tel } = request.only(_only)

    try{
      const user = await auth.getUser()
      const contact = new Contact()
      contact.user_id = user.id
      contact.name = name
      contact.email = email
      contact.rol = rol
      contact.tel = tel
      await contact.save()
      return response.status(201).json({ message : "Successfully created contact"})
    }catch(e){
      return response.status(409).json({ message : "I can't create the user" })   
    }
  }

  /**
   * Update contact details.
   * PUT or PATCH contacts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {

    const only = ['name', 'email', 'rol', 'tel']
    const { name, email, rol, tel } = request.only(only)
    const { id } = params;
    try{
      let contact = await Contact.find(id)
      contact.name = name
      contact.email = email
      contact.rol = rol
      contact.tel = tel
      try{
        await contact.save()
        return response.status(201).json({ message: "User updated", user: contact })
      }catch(e){
        return response.status(409).json({ message: "I can't update user" })
      }
    }catch(e){1
      return response.status(404).json({ message: "I can't found user" })
    }
  }

  /**
   * Delete a contact with id.
   * DELETE contacts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const { id } = params
    try{
      const user = await Contact.find(id)
      try{
        await user.delete()
        return response.status(200).json({message: 'Ok'})   
      }catch(e){
        return response.status(409).json({ message: "I can't delete user" })
      }
    }catch(e){
      return response.status(404).json({ message: "I can't found user" })
    }
  }
}

module.exports = ContactController
