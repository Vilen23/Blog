import { useRecoilState } from "recoil";
import { currentAtom, loadingAtom } from "../State/User/UserState";
import axios from "axios";
import { useEffect, useState } from "react";
import { Modal, Table } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export function DashPosts() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [showmore, setShowmore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [postidtodelete, setPostidtodelete] = useState(null);
  const [currentuser, setCurrentUser] = useRecoilState(currentAtom);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/post/getPosts?userId=${currentuser._id}`
        );
        if (res.status === 200) {
          setPosts(res.data.posts);
          if (res.data.posts.length < 9) {
            setShowmore(false);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (currentuser._id) {
      fetchPosts();
    }
  }, [currentuser._id]);

  const HandleShowMore = async () => {
    const startIndex = posts.length;
    try {
      const res = await axios.get(
        "http://localhost:3000/api/post/getPosts?userId=" +
          currentuser._id +
          "&startIndex=" +
          startIndex
      );
      if (res.status === 200) {
        setPosts((prev) => [...prev, ...res.data.posts]);
        if (res.data.posts.length < 9) {
          setShowmore(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const HandleDeletePost = async () => {
    try {
      const res = await axios.delete(
        `http://localhost:3000/api/post/delete/${postidtodelete}/${currentuser._id}`
      );
      if (res.status === 200) {
        setShowModal(false);
        setPosts((prev) => prev.filter((post) => post._id !== postidtodelete));
      }
    } catch (error) {
      console.log(error);
    }
  };

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
                <span
                  onClick={() => {
                    setShowModal(true);
                    setPostidtodelete(post._id);
                  }}
                  className="text-red-500 font-bold cursor-pointer hover:underline"
                >
                  Delete
                </span>
              </Table.Cell>
              <Table.Cell>
                <span
                  onClick={() => {
                    navigate(`/update-post/${post._id}`);
                  }}
                  className="text-teal-500 cursor-pointer font-bold hover:underline"
                >
                  Edit
                </span>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        ))}
      </Table>
      {showmore && (
        <button
          onClick={HandleShowMore}
          className="w-full py-7 font-semibold hover:underline  self-center text-sm text-teal-500"
        >
          Show more
        </button>
      )}
      <Modal
        show={showModal}
        onClose={() => {
          setShowModal(false);
        }}
        popup
        size="md"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center ">
            <HiOutlineExclamationCircle className="text-9xl text-gray-500 mx-auto" />
            <h3 className="text-lg text-gray-500">
              Are you sure you want to delete the Post?
            </h3>
            <div className="flex justify-center gap-20 mt-4">
              <button
                type="button"
                className="w-[100px] h-[50px] rounded-lg text-white font-bold text-xl bg-red-600 hover:bg-white hover:text-red-600 hover:border-red-600 border-2 border-red-600"
                onClick={HandleDeletePost}
              >
                <p className="text-xl">Delete</p>
              </button>
              <button
                type="button"
                className="w-[100px] rounded-lg text-white font-bold text-xl bg-red-600 hover:bg-white hover:text-red-600 hover:border-red-600 border-2 border-red-600"
                onClick={() => {
                  setShowModal(false);
                }}
              >
                <p className="text-xl">Cancel</p>
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
