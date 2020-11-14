import ApiClient from './ApiClient'

export const __GetTasks = async (foo) => {
    console.log("GetTasks User: ", foo)
    try {
      const res = await ApiClient.get(`/users/${foo}/tasks`)
      console.log('Tasks Received in Service: ', res.data)
      return res.data.tasks
    } catch (error) {
      console.log('***Trouble getting tasks')
      throw error
    }
  }