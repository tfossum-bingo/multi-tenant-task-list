import ApiClient from './ApiClient'

export const __GetOrganizations = async () => {
  console.log("Org Service Called")
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
      console.log(res.data)
      return res.data
    } catch (error) {
      throw error
    }
  }