const { Schema } = require('mongoose')

module.exports = new Schema(
    {
        summary: { type: String, required: true },
        description: { type: String, required: true },
        status: { type: String, required: true },
        priority: { type: String, required: true },
        creator_id:
        {
            type: Schema.Types.ObjectId,
            ref: 'users'
        },
        assignee_id:
        {
            type: Schema.Types.ObjectId,
            ref: 'users'
        }
    },
    { timestamps: true }
)