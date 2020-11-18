const mongoose = require('mongoose')

mongoose
    .connect(process.env.NODE_ENV === 'production' ? process.env.DATABASE_URL : 
     'mongodb://127.0.0.1:27017/multitenantTasksDatabase',
        {
            useUnifiedTopology: true,
            useNewUrlParser: true
        })
    .catch(error => {
        console.log('Connection error: ', error.message)
    })

const db = mongoose.connection

module.exports = db