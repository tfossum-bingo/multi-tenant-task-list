const Router = require('express').Router()
const OrganizationController = require('../controllers/OrganizationController')

Router.get('/', OrganizationController.getOrganizations)
Router.get('/:id', OrganizationController.getOrganization)
Router.get('/:id/users', OrganizationController.getOrganizationUsers)
Router.post('/', OrganizationController.createOrganization)
Router.put('/:id', OrganizationController.updateOrganization)
Router.delete('/:id', OrganizationController.deleteOrganization)

module.exports = Router