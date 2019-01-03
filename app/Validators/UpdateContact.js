'use strict'

class UpdateContact {
  get rules () {
    return {
      name: 'string|min:2|max:40',
      email: 'email|min:2|max:40|unique:contacts',
      rol: 'string|min:2|max:40',
      tel: 'integer|min:10|max:10'
    }
  }

  get sanitizationRules () {
    return {
      name: 'escape',
      name: 'trim',
      email: 'normalize_email',
      rol: 'escape',
      rol: 'trim',
      tel: 'escape',
      tel: 'trim'
    }
  }
  
}

module.exports = UpdateContact
