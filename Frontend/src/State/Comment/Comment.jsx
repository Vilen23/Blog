import { atom } from "recoil";

const CommentAtom = atom({
    key: 'comment',
    default:''
})

const postCommentsAtom = atom({
    key:'postComments',
    default:[]
})

const commentsAtom = atom({
    key:'comments',
    default:[]
})

export {
    CommentAtom,
    postCommentsAtom,
    commentsAtom
}