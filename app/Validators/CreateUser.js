'use strict'

class CreateUser {
  get rules () {
    return {
      username: 'required|string|min:2|max:30',
      email: 'required|email|min:2|max:30|unique:users',
      password: 'required'
    }
  }

  get sanitizationRules () {
    return {
      email: 'normalize_email'
    }
  }
  
  get messages () {
    return {
      'username.required': 'Your must provide a username',
      'email.required': 'You must provide a email address.',
      'email.email': 'You must provide a valid email address.',
      'email.unique': 'This email is already registered.',
      'password.required': 'You must provide a password'
    }
  }
}

module.exports = CreateUser
