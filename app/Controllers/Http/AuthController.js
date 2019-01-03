'use strict'

const User = use('App/Models/User')

class AuthController {

  async show({ request, response }){
    try{
      const admins = await User.all()
      return response.status(200).json(admins)
    }catch(e){
      return response.status(409).json({ message: "I have a conflict"  })
    }
  }

  async register({request, auth, response}) {
    const { username, email, password } = request.only(['username', 'email', 'password'])
        
    const user = new User()
    user.username = username
    user.email = email
    user.password = password
    
    try{
      await user.save()
      return response.status(201).json({ message : "Successfully created user"})  
    }catch(error){
      return response.status(409).json({ message : "I can't create the user" })     
    }
  }

  async login({request, auth, response}) {    
    const { email, password } = request.only(['email', 'password'])

    try {
      if (await auth.attempt(email, password) ) {
        let user = await User.findBy('email', email)
        let accessToken = await auth.generate(user)
        return response.status(200).json({"access_token": accessToken})
      }
    }catch (e) {
      return response.status(404).json({message: "Resource not found"})
    }
  }

  async admin({response, auth}){
    const _admin = await auth.getUser()
    return response.status(200).json(_admin)
  }

}

module.exports = AuthController
