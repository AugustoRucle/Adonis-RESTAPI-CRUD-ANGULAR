'use strict'

class CreateContacts {
  get rules () {
    return {
      name: 'required|string|min:2|max:40',
      email: 'required|email|min:2|max:40|unique:contacts',
      rol: 'required|string|min:2|max:40',
      tel: 'required|integer|min:10|max:10'
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
  
  get messages () {
    return {
      'name.required': 'Nombre de contacto requerido',
      'email.required': 'Correo de contacto requerido',
      'email.email': 'Correo de contacto invalido',
      'email.unique': 'Correo electronico de contacto existente',
      'rol.required': 'Rol de contacto requerido',
      'tel.required': 'Numero telefonico de contacto requerido',
      'tel.integer': 'Numero telefonico invalido',
      'tel.min': 'Numero telefonico invalido',
      'tel.max': 'Numero telefonico invalido'
    }
  }
}

module.exports = CreateContacts
