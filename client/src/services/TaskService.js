import ApiClient from './ApiClient'

export const __GetTasks = async (user_id) => {
  console.log("GetTasks User: ", user_id)
  try {
    const res = await ApiClient.get(`/users/${user_id}/tasks`)
    console.log('Tasks Received in Service: ', res.data)
    return res.data.tasks
  } catch (error) {
    console.log('***Trouble getting tasks')
    throw error
  }
}

export const __CreateTask = async (formData) => {
  try {
    const res = await ApiClient.post('/tasks', formData)
    return res.data
  } catch (error) {
    throw error
  }
}

export const __UpdateTask = async (_id, formData) => {
  try {
    const res = await ApiClient.put(`/tasks/${_id}`, formData)
    return res.data
  } catch (error) {
    throw error
  }
}

export const __DeleteTask = async (_id) => {
  try {
    const res = await ApiClient.delete(`/tasks/${_id}`)
    return res.data
  } catch (error) {
    throw error
  }
}