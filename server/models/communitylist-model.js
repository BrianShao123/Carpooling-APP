const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CommunityListSchema = new Schema(
    {
        name: { type: String, required: true },
        items: { type: [{ item : String, points: Number }], required: true },
        likes: { type: [String], required: true },
        dislikes: { type: [String], required: true },
        numViews: { type: Number, required: true }, 
        comments: { type: [{ username : String, comment : String }], required: false },
        lastUpdateTime: { type: Number, required: false },
        lastUpdate: { type: String, required: false },
        datePublished: { type: Number, required: true }
    },
    { timestamps: true },
)

module.exports = mongoose.model('CommunityList', CommunityListSchema)