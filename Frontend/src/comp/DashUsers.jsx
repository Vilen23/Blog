import { useRecoilState } from "recoil";
import { currentAtom, loadingAtom } from "../State/User/UserState";
import axios from "axios";
import { useEffect, useState } from "react";
import { Modal, Table } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { Loading } from "./Loading";
import { FaCheck,FaTimes } from "react-icons/fa";

export function DashUsers() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [showmore, setShowmore] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [usertodelete, setusertoDelete] = useState(null);
  const [currentuser, setCurrentUser] = useRecoilState(currentAtom);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/user/getusers`);
        if (res.status === 200) {
          setUsers(res.data.users);
          setLoading(false);
          if (res.data.users.length < 9) {
            setShowmore(false);
          }
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    if (currentuser.isAdmin) {
      fetchUsers();
    }
  }, [currentuser._id]);

  const HandleShowMore = async () => {
    const startIndex = users.length;
    try {
      const res = await axios.get(
        `http://localhost:3000/api/user/getusers?startIndex=${startIndex}` );
      if (res.status === 200) {
        setUsers((prev) => [...prev, ...res.data.users]);
        if (res.data.users.length < 9) {
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
        `http://localhost:3000/api/user/deleteuser/${usertodelete}/${currentuser._id}`
      );
      if (res.status === 200) {
        setShowModal(false);
        setUsers((prev) => prev.filter((post) => post._id !== usertodelete));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return loading ? (
    <div className="flex justify-center w-full mt-10">
      <Loading />
    </div>
  ) : (
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-600">
      <Table hoverable className="shadow-md ">
        <Table.Head className="font-bold">
          <Table.HeadCell>Date Created</Table.HeadCell>
          <Table.HeadCell>User Image</Table.HeadCell>
          <Table.HeadCell>Username</Table.HeadCell>
          <Table.HeadCell>Email</Table.HeadCell>
          <Table.HeadCell>Admin</Table.HeadCell>
          <Table.HeadCell>Delete</Table.HeadCell>
        </Table.Head>
        {users.map((user) => (
          <Table.Body className="font-semibold text-[16px] divide-y" key={user._id}>
            <Table.Row className="bg-white">
              <Table.Cell>
                {new Date(user.createdAt).toLocaleDateString()}
              </Table.Cell>
              <Table.Cell>
                <img
                  src={user.profilepicture}
                  alt={user.username}
                  className="h-10 w-10 rounded-full object-cover cursor-pointer"
                  onClick={() => {
                    navigate(`/post/${post.slug}`);
                  }}
                />
              </Table.Cell>
              <Table.Cell
                className="cursor-pointer text-black"
              >
                {user.username}
              </Table.Cell>
              <Table.Cell >{user.email}</Table.Cell>
              <Table.Cell>{user.isAdmin?<FaCheck className="text-green-500"/>:<FaTimes className="text-red-500"/>}</Table.Cell>
              <Table.Cell>
                <span
                  onClick={() => {
                    setShowModal(true);
                    setusertoDelete(user._id);
                  }}
                  className="text-red-500 font-bold cursor-pointer hover:underline"
                >
                  Delete
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
