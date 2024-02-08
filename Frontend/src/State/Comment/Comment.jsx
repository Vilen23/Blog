import { atom } from "recoil";

const CommentAtom = atom({
    key: 'comment',
    default:''
})

export {
    CommentAtom
}