const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        require: true
    },
    casts: {
        type: [String],
        require: true
    },
    trailerUrl: {
        type: String,
        require: true
    },
    posterUrl: {
        type: String,
        require: true
    },
    language: {
        type: [String],
        require: true
    },
    releaseDate: {
        type: Date,
        require: true
    },
    directer: {
        type: String,
        require: true
    },
    theaters:{
         type : [mongoose.Types.ObjectId],
         ref : "Theater"
    },
    releaseStatus: {
        type: String,
        require: true,
        default: "RELEASED"
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model("Movie", movieSchema)