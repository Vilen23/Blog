const bcrypt = require('bcrypt')

const hashpass = async (password)=>{
    try{
        return await bcrypt.hash(password,10)
    }catch(error){
        return json({
            msg:"there was some internal error"
        })
    }
}

module.exports={
    hashpass
}