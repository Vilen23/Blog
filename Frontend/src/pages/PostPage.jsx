import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Button, Spinner } from "flowbite-react";
import { CalltoAction } from "../comp/CalltoAction";
import { CommentSection } from "../comp/CommenstSection";
import { PostCard } from "../comp/PostCard";
export function PostPage() {
  const { postSlug } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [recentpost, setRecentPost] = useState(null);

  useEffect(() => {
    setLoading(true);
    try {
      const fetchPost = async () => {
        const res = await axios.get(
          `http://localhost:3000/api/post/getposts?slug=${postSlug}`
        );
        if (res.status === 200) {
          setPost(res.data.posts[0]);
          setLoading(false);
        } else {
          setError("Something went wrong");
          setLoading(false);
        }
      };
      fetchPost();
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, [postSlug]);

  useEffect(() => {
    try {
      const fetchrecentpost = async () => {
        const res = await axios.get(
          "http://localhost:3000/api/post/getposts?limit=3"
        );
        if (res.status === 200) {
          setRecentPost(res.data.posts);
        }
      };
      fetchrecentpost();
    } catch (error) {
      console.log(error);
    }
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="xl" />
      </div>
    );
  }

  return (
    <main className="p-3 flex flex-col min-h-screen max-w-6xl mx-auto">
      <h1 className="text-3xl mt-10 mx-auto lg:text-4xl p-3 text-center font-serif max-w-2xl">
        {post && post.title}
      </h1>
      <div className="self-center mt-5">
        <Button color="gray" pill size="xs">
          {post && post.category}
        </Button>
      </div>
      <div className="w-full flex justify-center items-center">
        <img
          src={post && post.image}
          alt={post && post.title}
          className="mt-10 p-3 object-cover"
        />
      </div>
      <div
        className="p-3 mx-auto max-w-2xl w-full post-content"
        dangerouslySetInnerHTML={{ __html: post && post.content }}
      ></div>
      <div className="max-w-4xl mx-auto w-full">
        <CalltoAction />
      </div>
      <CommentSection postID={post._id} />
      <div className="flex flex-col justify-center items-center mb-5  ">
        <h1 className="text-xl mt-5">Recent Posts</h1>
        <div className="flex flex-col sm:flex-row gap-4 mt-5">
          {recentpost &&
            recentpost.map((post) => {
              return <PostCard key={post._id} post={post} />;
            })}
        </div>
      </div>
    </main>
  );
}
