import { atom } from "recoil";

const loadingProjectAtom = atom({
    key:"loadingProjectAtom",
    default:false
})

export {
    loadingProjectAtom
}