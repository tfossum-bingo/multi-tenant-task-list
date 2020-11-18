const { Organization, User } = require('../db/schema')

const getOrganizations = async (request, response) => {
    console.log('HIT getOrganizations')
    try {
        const organizations = await Organization.find()
        return response.status(200).json({organizations: organizations})
    } catch(error) {
        return response.status(500).json({error: error.message})
    }
}

const getOrganization = async (request, response) => {
    console.log('HIT getOrganization')
    try {
        const {id} = request.params
        const organization = await Organization.findById(id)
        if(organization){
            return response.status(200).json({organizations: organization})
        }
        return response.status(404).send('No organization found with that ID.')
    } catch(error) {
        return response.status(500).send(error.message)
    }
}

const createOrganization = async (request, response) => {
    console.log("HIT createOrganization")
    try {
        const organization = await new Organization(request.body)
        await organization.save()
        return response.status(201).json(organization,)
    } catch(error) {
        return response.status(500).json({error: error.message})
    }    
}

const updateOrganization = async (request, response) => {
    console.log('HIT updateOrganization')
    try {
        const {id}  = request.params
        await Organization.findByIdAndUpdate(id, request.body, {new: true}, (err, organization) => {
            if(err){
                response.status(500).send(err)
            }
            if(!organization) {
                response.status(500).send('Organization not found!')
            }
            return response.status(200).json(organization)
        })
    } catch(error) {
        return response.status(500).json({error: error.message})
    }
}

const deleteOrganization = async (request, response) => {
    console.log('HIT deleteOrganization')
    try {
        const {id} = request.params
        const deleted = await Organization.findByIdAndDelete(id)
        if(deleted){
            return response.status(200).send('Organization deleted')
        }
        throw new Error ('Organization not found!')

    } catch(error) {
        return response.status(500).send(error.message)
    }
}

const getOrganizationUsers = async (request, response) => {
    console.log("HIT getOrganizationUsers")
    try {   
        //At this step I'd like to confirm the requesting user is of the requested organization, or in some way scope the request.
        const users = await User.find({organization_id: request.params.id})
        if(users){
            return response.status(200).json({users: users})
        }
        return response.status(404).send('No users found for the requested organization.')
    } catch(error) {
        return response.status(500).send(error.message)
    } 
}

module.exports = {
    getOrganizations,
    getOrganization,
    getOrganizationUsers,
    createOrganization,
    updateOrganization,
    deleteOrganization
}