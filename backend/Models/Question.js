const mongoose = require('mongoose')

const questionSchema = new mongoose.Schema({
    title: String,
    body: String,
    tags : [],
    createdAt: {
        type:Date,
        default : Date.now(),
    },
    user:Object,
    views: {type :Number, default :0},
    answers: {type :Number, default :0},
})

module.exports=mongoose.model("Question",questionSchema);