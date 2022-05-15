const joi=require('joi')
const expressError=require('./utills/expressError')
const Validator=joi.object({
    FirstName:joi.string().required()
    ,
    LastName: joi.string().required()
    ,
    Email: joi.string().required()
    ,
    PhoneNumber:joi.number().required()
    ,
   Message:joi.string().required()
    
})
module.exports.Validator=(req,res,next)=>{
    const{error}=Validator.validate(req.body)
  
   if(error)
   {   const result=error.details.map(e=>e.message).join(',')
       throw new expressError(result,400)}
   else{
       next()
   }
 
 }