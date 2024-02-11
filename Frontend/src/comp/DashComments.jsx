import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { commentsAtom } from "../State/Comment/Comment";
import { Button, Modal, Table } from "flowbite-react";
import axios from "axios";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export function DashComments() {
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [commenttodelete, setCommenttodelete] = useState(null);
  const [comments, setComments] = useRecoilState(commentsAtom);

  useEffect(() => {
    setLoading(true);
    const fetchComments = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/comment/getComments"
        );
        if (res.status === 200) {
          setComments(res.data.comments);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchComments();
  }, []);

  const HandleDeleteComment = async () => {
    try {
      const res = await axios.delete(
        `http://localhost:3000/api/comment/deletecomment/${commenttodelete}`
      );
      if (res.status === 200) {
        setComments(comments.filter((c) => c._id !== commenttodelete));
        setShowModal(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return loading ? (
    <div>Loading...</div>
  ) : (
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-600">
      <Table hoverable className="shadow-md">
        <Table.Head className="font-bold">
          <Table.HeadCell>Date Updated</Table.HeadCell>
          <Table.HeadCell>Comment Content</Table.HeadCell>
          <Table.HeadCell>Likes</Table.HeadCell>
          <Table.HeadCell>Post ID</Table.HeadCell>
          <Table.HeadCell>User ID</Table.HeadCell>
          <Table.HeadCell>Delete</Table.HeadCell>
        </Table.Head>
        {comments.map((comment) => (
          <Table.Body className="font-semibold text-[16px] divide-y" key={comment._id}>
            <Table.Row className="bg-white">
              <Table.Cell>
                {new Date(comment.updatedAt).toLocaleDateString()}
              </Table.Cell>
              <Table.Cell className="text-sm">{comment.content}</Table.Cell>
              <Table.Cell>{comment.numberoflikes}</Table.Cell>
              <Table.Cell>{comment.postID}</Table.Cell>
              <Table.Cell>{comment.userID}</Table.Cell>
              <Table.Cell>
                <span
                  className="font-bold text-red-500 hover:underline cursor-pointer"
                  onClick={() => {
                    setShowModal(true);
                    setCommenttodelete(comment._id);
                  }}
                >
                  Delete
                </span>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        ))}
      </Table>
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
              Are you sure you want to delete the Comment?
            </h3>
            <div className="flex justify-center gap-20 mt-4">
              <button
                type="button"
                className="w-[100px] h-[50px] rounded-lg text-white font-bold text-xl bg-red-600 hover:bg-white hover:text-red-600 hover:border-red-600 border-2 border-red-600"
                onClick={HandleDeleteComment}
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
