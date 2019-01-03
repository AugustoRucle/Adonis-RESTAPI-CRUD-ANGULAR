'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Contact extends Model {
    user() {
        return this.belongsTo('App/Models/User');
    }
    static get hidden () {
        return ['updated_at']
    }
}

module.exports = Contact
