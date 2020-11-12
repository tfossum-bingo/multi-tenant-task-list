import ApiClient from './ApiClient'

export const __GetTasks = async (page, limit) => {
    try {
      const res = await ApiClient.get(`/tasks`)
      console.log('Tasks Received in Service: ', res.data)
      return res.data.tasks
    } catch (error) {
      console.log('***Trouble getting tasks')
      throw error
    }
  }