import { useRecoilState } from "recoil";
import { currentAtom } from "../State/User/UserState";
import { useNavigate } from "react-router-dom";
import { Alert, Button, Textarea } from "flowbite-react";
import { CommentAtom, postCommentsAtom } from "../State/Comment/Comment";
import axios from "axios";
import { useEffect, useState } from "react";
import { CommentLayout } from "./CommentLayout";

export function CommentSection({ postID }) {
  const navigate = useNavigate();
  const [commentError, setCommentError] = useState(null);
  const [comment, setComment] = useRecoilState(CommentAtom);
  const [currentUser, setCurrentUser] = useRecoilState(currentAtom);
  const [postcomments, setPostcomments] = useRecoilState(postCommentsAtom);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/comment/getpostcomments/${postID}`
        );
        if (res.status === 200) {
          setPostcomments(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchComments();
  }, [postID]);

  const HandleSubmit = async (e) => {
    e.preventDefault();
    if (comment.length < 1 || comment.length > 300) {
      setCommentError("Comment must be between 1 and 300 characters");
      return;
    }
    try {
      const res = await axios.post("http://localhost:3000/api/comment/create", {
        postID,
        content: comment,
        userID: currentUser._id,
      });
      if (res.status === 200) {
        setComment("");
        setCommentError(null);
        setPostcomments([res.data, ...postcomments]);
      }
    } catch (error) {
      setCommentError(error.message);
      console.log(error);
    }
  };

  const HandleLike = async (commentID) => {
    try {
      if (!currentUser._id) {
        return navigate("/signin");
      }
      const res = await axios.put(
        `http://localhost:3000/api/comment/likecomment/${commentID}`
      );
      if (res.status === 200) {
        const data = await res.data;
        setPostcomments(postcomments.map((comment) => 
            comment._id === commentID ? {
                  ...comment,
                  likes: data.likes,
                  numberoflikes: data.numberoflikes,
                }: comment
                ));
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="max-w-2xl mx-auto w-full p-3">
      {currentUser._id ? (
        <div className="flex items-center gap-3 my-5 text-gray-500 text-sm">
          <p>Signed in as:</p>
          <div className="flex gap-1 items-center">
            <img
              className="h-6 w-6 object-cover rounded-full"
              src={currentUser.profilepicture}
              alt=""
            />
            <div className="flex text-cyan-600 text-xs">
              @
              <p
                onClick={() => {
                  navigate("/dashboard?tab=profile");
                }}
                className=" cursor-pointer hover:underline"
              >
                {currentUser.username}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex gap-2">
          <p>You Must be Signed in to post comment</p>
          <p
            onClick={() => {
              navigate("/signin");
            }}
            className="text-cyan-600 hover:underline cursor-pointer font-semibold"
          >
            Sign In
          </p>
        </div>
      )}
      {currentUser._id && (
        <form
          onSubmit={HandleSubmit}
          className="border-teal-500 border-[1px] rounded-md p-4"
        >
          <Textarea
            placeholder="Add a comment..."
            rows="3"
            maxLength="300"
            onChange={(e) => {
              setComment(e.target.value);
            }}
            value={comment}
            onClick={() => {
              setCommentError(null);
            }}
          />
          <div className="flex justify-between mt-4 items-center">
            <p className="text-xs text-gray-500">
              {300 - comment.length} Characters remaining
            </p>
            <Button outline gradientDuoTone="purpleToPink" type="Submit">
              Submit
            </Button>
          </div>
          {commentError && (
            <Alert color="red" className="mt-3" show={commentError}>
              {commentError}
            </Alert>
          )}
        </form>
      )}
      {postcomments.length === 0 ? (
        <p className="text-sm text-gray-500 font-semibold ml-3 my-5 ">
          No comments yet
        </p>
      ) : (
        <>
          <div className="flex items-center gap-1 my-5 text-gray-500">
            <p className="font-serif">Comments</p>
            <div className="border-[1px] border-cyan-800 hover:bg-cyan-50 hover:text-cyan-700 shadow-md cursor-pointer text-cyan-500 rounded-xl h-[30px] w-[30px] flex items-center justify-center">
              <p>{postcomments.length}</p>
            </div>
          </div>
          {postcomments.map((comment) => {
            return (
              <CommentLayout
                key={comment._id}
                comment={comment}
                onLike={HandleLike}
              />
            );
          })}
        </>
      )}
    </div>
  );
}
