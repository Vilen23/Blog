const bcrypt = require('bcrypt')
const { errorHandler } = require('../utils/error')

const hashpass = async (password)=>{
    try{
        return await bcrypt.hash(password,10)
    }catch(error){
        errorHandler(400,"something went wrong")
    }
}

module.exports={
    hashpass
}