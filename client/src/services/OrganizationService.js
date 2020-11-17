import ApiClient from './ApiClient'

export const __GetOrganizations = async () => {
  try {
    const response = await ApiClient.get(`/organizations`)
    return response.data
  }catch(error) {
    throw error
  }

}

export const __GetUsers = async (organizationId) => {
    try {
      const res = await ApiClient.get(`/organizations/${organizationId}/users`)
      return res.data
    } catch (error) {
      throw error
    }
  }

  export const __CreateOrganization = async (formData) => {
    try {
      const res = await ApiClient.post('/organizations/', formData)
      return res.data
    } catch (error) {
      throw error
    }
  }