import { useRecoilState } from "recoil";
import { currentAtom } from "../State/User/UserState";
import { useNavigate } from "react-router-dom";
import { Alert, Button,Textarea } from "flowbite-react";
import { CommentAtom } from "../State/Comment/Comment";
import axios from "axios";
import { useState } from "react";

export function CommentSection({postID}){
    const navigate = useNavigate();
    const [commentError, setCommentError] = useState(null);
    const [comment,setComment] = useRecoilState(CommentAtom);
    const [currentUser, setCurrentUser] = useRecoilState(currentAtom);

    const HandleSubmit = async (e) => {
        e.preventDefault();
        if(comment.length < 1 || comment.length > 300){
            setCommentError('Comment must be between 1 and 300 characters');
            return;
        }
        try {
            const res = await axios.post('http://localhost:3000/api/comment/create',{
                postID,
                content:comment,
                userID:currentUser._id
            })
            if(res.status===200){
                setComment('');
                setCommentError(null);
            }
        } catch (error) {
            setCommentError(error.message);
            console.log(error);
        }
        
    }
    return (
        <div className="max-w-2xl mx-auto w-full p-3">
            {currentUser._id ? (
                <div className="flex items-center gap-3 my-5 text-gray-500 text-sm">
                    <p>Signed in as:</p>
                    <div className="flex gap-1 items-center">
                    <img className="h-6 w-6 object-cover rounded-full" src={currentUser.profilepicture} alt="" />
                    <div className="flex text-cyan-600 text-xs">
                    @<p onClick={()=>{
                        navigate('/dashboard?tab=profile')
                    }} className=" cursor-pointer hover:underline">{currentUser.username}</p>
                    </div>
                    </div>
                </div>
            ):(
                <div className="flex gap-2">
                    <p>You Must be Signed in to post comment</p>
                    <p onClick={()=>{
                        navigate('/signin')
                    }} className="text-cyan-600 hover:underline cursor-pointer font-semibold">Sign In</p>
                </div>
            )}
            {currentUser._id && (
                <form onSubmit={HandleSubmit} className="border-teal-500 border-[1px] rounded-md p-4" >
                    <Textarea placeholder="Add a comment..." rows='3' maxLength='300' onChange={(e)=>{
                        setComment(e.target.value);
                    }} value={comment} onClick={()=>{
                        setCommentError(null);
                    }}/>
                    <div className="flex justify-between mt-4 items-center">
                        <p className="text-xs text-gray-500">{300 - comment.length} Characters remaining</p>
                        <Button outline gradientDuoTone='purpleToPink' type="Submit">Submit</Button>
                    </div>
                    {commentError && (<Alert color='red' className="mt-3" show={commentError}>{commentError}</Alert>)}
                </form>
            )}
        </div>
    )
}