const mongoose=require('mongoose')
const{Schema}=mongoose

const ContactSchema=new Schema({ 
    FirstName:{
        type:String
    },
    LastName:{
        type:String
    },
    Email:{
        type:String
    },
    PhoneNumber:{
        type:Number
    },
   Message:{
        type:String
    }
})

module.exports.Contact=mongoose.model('Contact',ContactSchema)