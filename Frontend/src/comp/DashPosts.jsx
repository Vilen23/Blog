import { useRecoilState } from "recoil";
import { currentAtom, loadingAtom } from "../State/User/UserState";
import axios from "axios";
import { useEffect, useState } from "react";
import { Table } from "flowbite-react";
import { useNavigate } from "react-router-dom";

export function DashPosts() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [currentuser, setCurrentUser] = useRecoilState(currentAtom);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/post/getPosts?userId=${currentuser._id}`
        );
        if (res.status === 200) {
          setPosts(res.data.posts);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (currentuser._id) {
      fetchPosts();
    }
  }, [currentuser._id]);

  return (
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-600">
      <Table hoverable className="shadow-md ">
        <Table.Head className="font-bold">
          <Table.HeadCell>Date Updated</Table.HeadCell>
          <Table.HeadCell>Post Image</Table.HeadCell>
          <Table.HeadCell>Post title</Table.HeadCell>
          <Table.HeadCell>Category</Table.HeadCell>
          <Table.HeadCell>Delete</Table.HeadCell>
          <Table.HeadCell>
            <span>Edit</span>
          </Table.HeadCell>
        </Table.Head>
        {posts.map((post) => (
          <Table.Body className="font-semibold text-[16px] divide-y">
            <Table.Row className="bg-white">
              <Table.Cell>
                {new Date(post.updatedAt).toLocaleDateString()}
              </Table.Cell>
              <Table.Cell>
                <img
                  src={post.image}
                  alt={post.title}
                  className="h-10 w-20 object-cover cursor-pointer"
                  onClick={() => {
                    navigate(`/post/${post.slug}`);
                  }}
                />
              </Table.Cell>
              <Table.Cell
                className="cursor-pointer font-bold text-black"
                onClick={() => {
                  navigate(`/post/${post.slug}`);
                }}
              >
                {post.title}
              </Table.Cell>
              <Table.Cell>{post.category}</Table.Cell>
              <Table.Cell>
                <span className="text-red-500 font-bold cursor-pointer hover:underline">Delete</span>
              </Table.Cell>
              <Table.Cell>
                <span onClick={()=>{
                  navigate(`/update-post/${post._id}`)
                }} className="text-teal-500 cursor-pointer font-bold hover:underline" >Edit</span>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        ))}
      </Table>
    </div>
  );
}
