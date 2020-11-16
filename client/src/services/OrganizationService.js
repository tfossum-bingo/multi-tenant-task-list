import ApiClient from './ApiClient'

export const __GetUsers = async (organizationId) => {
    try {
      const res = await ApiClient.get(`/organizations/${organizationId}/users`)
      console.log(res.data)
      return res.data
    } catch (error) {
      throw error
    }
  }