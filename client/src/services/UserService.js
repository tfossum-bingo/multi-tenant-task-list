import ApiClient from './ApiClient'

export const __CheckSession = async () => {
  try {
    const res = await ApiClient.get('/users/refresh/session')
    return res.data
  } catch(error) {
    throw error
  }
}

export const __GetProfile = async (userId) => {
  try {
    const res = await ApiClient.get(`/users/${userId}`)
    return res.data
  } catch (error) {
    throw error
  }
}

export const __RegisterUser = async (formData) => {
  try {
    const res = await ApiClient.post('/users/', formData)
    return res.data
  } catch (error) {
    throw error
  }
}

export const __LoginUser = async (userData) => {
  try {
    const res = await ApiClient.post('/users/login', userData)
    localStorage.setItem("token", res.data.token)
    localStorage.setItem("userId", res.data.user._id)
    localStorage.setItem("orgId", res.data.user.organization_id)
    return res.data
  } catch (error) {
    throw error
  }
}

