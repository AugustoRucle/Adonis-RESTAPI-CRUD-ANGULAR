'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.on('/').render('welcome')

Route.group(() =>{

    /*Contacts*/
    Route
        .put('contacts/:id', 'ContactController.update')
        .validator('UpdateContact')
        .middleware(['auth'])
    Route
        .delete('contacts/:id', 'ContactController.destroy')
        .middleware(['auth'])
    Route
        .post('contacts', 'ContactController.store')
        .validator('CreateContacts')
        .middleware(['auth'])

    Route
        .post('showContact', 'ContactController.index')
        .middleware(['auth'])

    Route
        .get('contact/:id', 'ContactController.contact')

    /*User*/  
    Route
        .post('validation/user', 'ValidationController.CreateUser')
    Route
        .post('validation/contact', 'ValidationController.CreateContact')
    Route
        .post('login', 'AuthController.login')
    Route
        .post('register', 'AuthController.register')
        .validator('CreateUser')
        .middleware(['auth'])
    Route
        .post('admins', 'AuthController.show')
        .middleware(['auth'])
    Route
        .post('admin', 'AuthController.admin')
        .middleware(['auth'])

}).prefix('api/v1')