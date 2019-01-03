'use strict'
const { validate } = use('Validator')
class ValidationController {
    async CreateUser({ request, response }){
        let validation; 

        const { username, email, password } = request.only(['username', 'email', 'password'])
    
        const messages = {
          'username.required': 'Nombre de administrador requerido',
          'email.required': 'Correo electronico de administrador requerido',
          'email.email': 'Correo invalido',
          'email.min': 'Correo electronico  de administrador invalido',
          'email.max': 'Correo electronico  de administrador invaldo',
          'email.unique': 'Correo electronico existente',
          'password.required': 'Contraseña de administrador requerida'
        }
    
        if(username != undefined){
          validation = await validate(username, { username : 'required|string|min:2|max:40' }, messages)
        }
    
        if(email != undefined){
          validation = await validate(email, { email: 'required|email|min:2|max:40|unique:users' }, messages)
        }
    
        if(password != undefined){
          validation = await validate(password, { password: 'required' }, messages)
        }
    
        if(validation.fails()){
          return response.status(406).json(validation.messages())
        }
        
        return response.status(200).json({message:"All it's okay"})
    }

    async CreateContact({ request, response }){
        let validation , _field, _dataField;

        const _only = [ 'name', 'email', 'rol', 'tel' ]
        const { name, email, rol, tel } = request.only(_only)

        const rules_name = { name: 'required|string|min:2|max:40' }
        const rules_email = { email: 'required|email|min:2|max:40|unique:contacts' }
        const rules_rol = { rol: 'required|string|min:2|max:40' }
        const rules_tel = { tel: 'required|integer|min:10|max:10' }

        const messages = {
            'name.required': 'Nombre de contacto requerido',
            'email.required': 'Correo de contacto requerido',
            'email.email': 'Correo de contacto invalido',
            'email.unique': 'Correo electronico de contacto existente',
            'email.min': 'Correo electronico  de contacto invalido',
            'email.max': 'Correo electronico  de contacto invaldo',
            'rol.required': 'Rol de contacto requerido',
            'tel.required': 'Numero telefonico de contacto requerido',
            'tel.integer': 'Numero telefonico invalido',
            'tel.min': 'Numero telefonico invalido',
            'tel.max': 'Numero telefonico invalido'
        }
      
        if(name != undefined){
            _field = "name"
            _dataField = name
            validation = await validate(name, rules_name , messages)
        }else if(email != undefined){
            _field = "email"
            _dataField = email
            validation = await validate(email, rules_email, messages)
        }else if(rol != undefined){
            _field = "rol"
            _dataField = rol
            validation = await validate(rol, rules_rol, messages)
        }else if(tel != undefined){
            _field = "tel"
            _dataField = tel
            validation = await validate(tel, rules_tel, messages)
        }
      
        if(validation.fails()){
            return response.status(406).json(validation.messages())
        }
        
          
        return response.status(200).json({ field: _field, data: _dataField, message:"All it's okay"})  

    }

}

module.exports = ValidationController
