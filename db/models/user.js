const { Schema } = require('mongoose')

module.exports = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        organization_id:
        {
            type: Schema.Types.ObjectId,
            ref: 'organizations'
        }
    },
    { timestamps: true }
)