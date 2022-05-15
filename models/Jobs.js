const mongoose=require('mongoose')
const{Schema}=mongoose

const job=new Schema({
    image:{
        type:String
    },
    title:{
        type:String
    },
    description:{
        type:String
    },
    location:{
        type:String
    }
})
module.exports.Job=mongoose.model("Job",job)