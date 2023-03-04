const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Top5ListSchema = new Schema(
    {
        name: { type: String, required: true },
        items: { type: [String], required: true },
        ownerEmail: { type: String, required: true },
        ownerUsername: { type: String, required: true },
        likes: { type: [String], required: true },
        dislikes: { type: [String], required: true },
        numViews: { type: Number, required: true }, 
        isPublished: { type: Boolean, required: true },
        comments: { type: [{ username : String, comment : String }], required: false },
        datePublished: { type: String, required: false },
        time: { type: Number, required: false }
    },
    { timestamps: true },
)

module.exports = mongoose.model('Top5List', Top5ListSchema)