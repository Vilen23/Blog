import axios from "axios";
import { useEffect, useState } from "react";
import moment from "moment";
import { FaThumbsUp } from "react-icons/fa";
import { useRecoilState } from "recoil";
import { currentAtom } from "../State/User/UserState";
import { Alert, Button, Textarea } from "flowbite-react";
import { postCommentsAtom } from "../State/Comment/Comment";

export function CommentLayout({ comment, onLike }) {
  const [user, setUser] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedComment, setEditedComment] = useState(comment.content);
  const [commentError, setCommentError] = useState(null);
  const [comments, setComments] = useRecoilState(postCommentsAtom);
  const [currentUser, setCurrentUser] = useRecoilState(currentAtom);
  useEffect(() => {
    try {
      const fetchUser = async () => {
        const getUser = await axios.get(
          `http://localhost:3000/api/user/${comment.userID}`
        );
        if (getUser.status === 200) {
          setUser(getUser.data);
        }
      };
      fetchUser();
    } catch (error) {
      console.log(error);
    }
  }, [comments]);

  const HandleEdit = async () => {
    setIsEditing(true);
    setEditedComment(comment.content);
  };

  const HandleEditComment = async () => {
    if (editedComment.length < 1 || editedComment.length > 300) {
      setCommentError("Comment must be between 1 and 300 characters");
      return;
    }
    try {
        const res = await axios.put(`http://localhost:3000/api/comment/editcomment/${comment._id}`,{
            content:editedComment
        });
        if(res.status === 200){
            setIsEditing(false);
            setCommentError(null);      
            setComments(comments.map((c)=>{
                if(c._id === comment._id){
                    return {...c,content:editedComment}
                }
                return c;
            }))
        }
    } catch (error) {
        setCommentError(error.message);
        console.log(error);
    }
  }

    const HandleDeleteComment = async () => {
        try {
            const res = await axios.delete(`http://localhost:3000/api/comment/deletecomment/${comment._id}`);
            if(res.status === 200){
                setCommentError(null);
                setComments(comments.filter((c)=>c._id !== comment._id));
            }
        } catch (error) {
            console.log(error);
            setCommentError(error.message);
        }
    }

  return (
    <div className="flex p-4 border-b   text-sm">
      <div className="flex shrink-0 mr-3">
        <img
          src={user.profilepicture}
          alt={user.username}
          className="h-10 w-10 rounded-full bg-gray-200"
        />
      </div>
      <div className="flex-1">
        <div className="flex items-center mb-1">
          <span className="font-bold mr-1 text-xs truncate flex justify-between">
            {user ? `${user.username}` : "Anonymous"}
          </span>
          <span className="text-gray-500 text-xs">
            {moment(comment.createdAt).fromNow()}
          </span>
        </div>
        <div>
          {isEditing ? (
            <>
            {commentError && <Alert color="failure" className="my-2 h-[10px] flex justify-center text-sm" >{commentError}</Alert>}
            <Textarea
              placeholder="Add a comment..."
              rows="3"
              maxLength="300"
              onChange={(e) => {
                setEditedComment(e.target.value);
              }}
              value={editedComment}
              onClick={() => {
                setCommentError(null);
              }}
            />
            <div className="flex gap-2 my-2 justify-end">
                <Button type='button' size='sm'  gradientDuoTone='purpleToBlue' onClick={HandleEditComment}>Save</Button>
                <Button type='button' outline  gradientDuoTone='purpleToBlue' size='sm' onClick={()=>setIsEditing(false)}>Cancel</Button>
            </div>
            </>
          ) : (
            <>
              <p className="text-gray-500 mb-2">{comment.content}</p>
              <div className="flex gap-2 items-center max-w-fit">
                <button
                  className={` text-gray-400 hover:text-blue-500 ${
                    currentUser &&
                    comment.likes.includes(currentUser._id) &&
                    "!text-blue-500"
                  }`}
                  onClick={() => {
                    onLike(comment._id);
                  }}
                >
                  <FaThumbsUp className="text-sm" />
                </button>
                <p className="text-gray-400 text-xs ">
                  {comment.numberoflikes > 0 &&
                    comment.numberoflikes +
                      " " +
                      (comment.numberoflikes === 1 ? "like" : `likes`)}
                </p>
                {currentUser &&
                  (currentUser._id === comment.userID ||
                    currentUser.isAdmin) && (
                        <>
                    <button
                      type="button"
                      className="hover:text-green-500 text-gray-500 text-xs font-semibold"
                      onClick={HandleEdit}
                    >
                      Edit
                    </button>
                    <button type="button" className="hover:underline text-red-500 text-xs font-semibold" onClick={HandleDeleteComment}>Delete</button>
                    </>
                  )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
