import { atom } from "recoil";

const userInfoAtom = atom({
    key:"userInfoAtom",
    default:{
        username:"",
        password:"",
        email:""
    }
})

export{
    userInfoAtom
}