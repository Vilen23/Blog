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
    },
    profilepicture:{
        type:String,
        default:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
    },
    email:{
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