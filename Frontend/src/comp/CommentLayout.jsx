import axios from "axios";
import { useEffect, useState } from "react";
import moment from "moment";

export function CommentLayout({ comment }) {
  const [user, setUser] = useState([]);
  useEffect(() => {
    try {
      const fetchUser = async () => {
        const getUser = await axios.get(
          `http://localhost:3000/api/user/${comment.userID}`
        );
        if (getUser.status === 200) {
          setUser(getUser.data);
          console.log(getUser.data);
        }
      };
      fetchUser();
    } catch (error) {
      console.log(error);
    }
  },[]);
  return (
    <div className="flex p-4 border-b   text-sm">
      <div className="flex shrink-0 mr-3">
        <img src={user.profilepicture} alt={user.username} className="h-10 w-10 rounded-full bg-gray-200"/>
      </div>
      <div className="flex-1">
        <div className="flex items-center mb-1" >
            <span className="font-bold mr-1 text-xs truncate flex justify-between">{user ? `@${user.username}`:'Anonymous'}</span>
            <span className="text-gray-500 text-xs">{moment(comment.createdAt).fromNow()}</span>
        </div>
        <div>
            <p className="text-gray-500 mb-2">{comment.content}</p>
        </div>
      </div>
    </div>
  );
}
