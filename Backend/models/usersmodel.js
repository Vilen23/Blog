const { configDotenv } = require('dotenv')
const mongoose = require('mongoose')
configDotenv();
mongoose.connect(process.env.MONGO)

const userSchema = mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    }
    },{
        timestamps:true
    })

const User = mongoose.model('User',userSchema)

module.exports={
    User
}