const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    postID:{
        type:String,
        required:true
    },
    userID:{
        type:String,
        required:true
    },
    likes:{
        type:Array,
        default:[]
    },
    numberoflikes:{
        type:Number,
        default:0
    }
},{timestamps:true})

const Comment = mongoose.model('Comment',commentSchema);

module.exports = Comment;