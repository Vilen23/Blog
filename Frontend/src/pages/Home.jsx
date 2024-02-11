import { useEffect, useState } from "react";
import { CalltoAction } from "../comp/CalltoAction";
import { PostCard } from "../comp/PostCard";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Home() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    try {
      const fetchPosts = async () => {
        const res = await axios.get(
          "http://localhost:3000/api/post/getposts"
        );
        if (res.status === 200) {
          setPosts(res.data.posts);
        }
      };
      fetchPosts();
    } catch (error) {
      console.log(error);
    }
  }, []);
  console.log(posts);
  return (
    <div>
      <div className="flex flex-col gap-6 px-3 p-28 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold lg:text-6xl">Welcome to my Blog</h1>
        <p className="text-gray-500 text-xs sm:text-sm">
          Welcome to our cutting-edge blogging platform, where the power of the
          MERN stack (MongoDB, Express.js, React, and Node.js) meets the finesse
          of Recoil for state management, delivering a seamless and dynamic user
          experience. Our commitment to security and personalization is evident
          through the use of cookies for authentication, ensuring that your
          session is both secure and tailored to your preferences. Furthermore,
          we've integrated advanced persistence features to guarantee that your
          interactions, from reading articles to writing posts, are smoothly
          preserved across visits. This fusion of technologies ensures that our
          platform is not only a beacon of modern web development practices but
          also a haven for users seeking a reliable, efficient, and personalized
          blogging experience.
        </p>
        <p className="text-xs sm:text-sm text-cyan-500 font-bold hover:underline cursor-pointer">
          View all Posts
        </p>
      </div>
      <div className="p-5 bg-slate-100">
        <CalltoAction />
      </div>
      <div className="w-full mx-auto flex flex-col py-7 p-3 gap-8 ">
        {posts && posts.length > 0 && (
          <div className="">
            <h2 className="text-2xl font-bold text-center my-10">Recent Posts</h2>
            <div className="flex flex-wrap gap-4 justify-center ">
              {posts &&
                posts.map((post) => {
                  return <PostCard key={post._id} post={post} />;
                })}
            </div>
          </div>
        )}
      <p className="text-cyan-500 text-center cursor-pointer hover:underline text-bold" onClick={()=>{
        navigate('/search')
      }}>View All Posts</p>
      </div>
    </div>
  );
}
