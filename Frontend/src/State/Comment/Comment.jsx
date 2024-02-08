import { atom } from "recoil";

const CommentAtom = atom({
    key: 'comment',
    default:''
})

const postCommentsAtom = atom({
    key:'postComments',
    default:[]
})

export {
    CommentAtom,
    postCommentsAtom
}