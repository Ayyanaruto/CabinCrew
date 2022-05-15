if(process.env.NODE_ENV!=='production'){
    require('dotenv').config()
}

const express=require('express')
const app=express()
const mongoose=require('mongoose')
const dbUrl=process.env.DB_URL||'mongodb://localhost:27017/CabinCrew'

mongoose.connect(dbUrl, {
    useNewUrlParser: true,
   
    useUnifiedTopology: true,
  
});
 
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});
const path=require('path')
const ejs=require('ejs')
const ejsMate=require('ejs-mate')
const{Contact}=require('./models/Contacts')
const session=require('express-session')
const flash=require('req-flash')
const res = require('express/lib/response')
const { status } = require('express/lib/response')
const expressError=require('./utills/expressError')
const {Validator}=require('./validator')

app.use(express.urlencoded({extended:true}))
app.engine('ejs',ejsMate)
app.set('views',path.join(__dirname,'views'))
app.set('view engine','ejs')
app.use(express.static("public"))

const sessionConfig = {
    secret: 'thisshouldbeabettersecret!',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}
app.use(session(sessionConfig))
app.use(flash())
app.use((req,res,next)=>{
    res.locals.success=req.flash('success'),
    res.locals.error=req.flash('error')
    next()
})

app.get('/',(req,res)=>{
    res.render('index')
})

app.post('/admin',Validator,async(req,res)=>{
 const data= await new Contact(req.body)
await data.save()
req.flash('success', 'You have Succesfully Submitted the Form');
res.redirect('/')
})
app.get("/jobs",(req,res)=>{
    res.render('Job')
})
app.all('*',(req,res,next)=>{
    
    next(new expressError('YOU HAVE ENTERED WRONG CAMP',404))
})

app.use((error,req,res,next)=>{
   const{status=500}=error
   if (!error.message) {
    error.message='Oh No some thing went wrong'
}
res.status(status).render('error',{error})
})


app.listen(3000||process.env.PORT,()=>{
    console.log('Connected')
})
