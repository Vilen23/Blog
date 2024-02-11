import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { currentAtom } from "../State/User/UserState";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Table } from "flowbite-react";
import { HiAnnotation, HiArrowNarrowUp, HiDocumentText, HiOutlineUserGroup } from "react-icons/hi";
import { Loading } from "./Loading";
export function DashboardComp() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);
  const [posts, setPosts] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [lastMonthUsers, setLastMonthUsers] = useState(0);
  const [lastMonthComments, setLastMonthComments] = useState(0);
  const [lastMonthPosts, setLastMonthPosts] = useState(0);
  const currentUser = useRecoilValue(currentAtom);

  useEffect(() => {
    setLoading(true);
    const fetchUsers = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/user/getusers?limit=5`
        );
        if (res.status === 200) {
          setUsers(res.data.users);
          setTotalUsers(res.data.totalUsers);
          setLastMonthUsers(res.data.lastMonthUsers);
        }
      } catch (error) {
        console.log(error);
      }
    };
    const fetchComments = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/comment/getComments?limit=5`
        );
        if (res.status === 200) {
          setComments(res.data.comments);
          setTotalComments(res.data.totalComments);
          setLastMonthComments(res.data.lastMonthComments);
        }
      } catch (error) {
        console.log(error);
      }
    };
    const fetchPosts = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/post/getposts?limit=5`
        );
        if (res.status === 200) {
          console.log(res.data);
          setPosts(res.data.posts);
          setTotalPosts(res.data.totalPosts);
          setLastMonthPosts(res.data.lastMonthPosts);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (currentUser.isAdmin) {
      fetchUsers();
      fetchComments();
      fetchPosts();
    }
  }, [currentUser]);

  return loading ? <div className="flex justify-center w-full">
      <Loading/>
    </div> : <div className="p-3 md:mx-auto">
    <div className='flex-wrap flex gap-4 justify-center mt-5'>
      <div className='flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md'>
        <div className='flex justify-between'>
          <div className=''>
            <h3 className='text-gray-500 text-md uppercase font-semibold'>Total Users</h3>
            <p className='text-xl '>{totalUsers}</p>
          </div>
          <HiOutlineUserGroup className='bg-red-600  text-white rounded-full text-5xl p-3 shadow-lg' />
        </div>
        <div className='flex  gap-2 text-sm items-center'>
          <span className='text-green-500 flex items-center'>
            <HiArrowNarrowUp />
            {lastMonthUsers}
          </span>
          <div className='text-gray-500 text-xs'>Last month</div>
        </div>
      </div>
      <div className='flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md'>
        <div className='flex justify-between'>
          <div className=''>
            <h3 className='text-gray-500 text-md uppercase font-semibold'>Total Comments</h3>
            <p className='text-xl '>{totalComments}</p>
          </div>
          <HiAnnotation className='bg-blue-600  text-white rounded-full text-5xl p-3 shadow-lg' />
        </div>
        <div className='flex  gap-2 text-sm items-center'>
          <span className='text-green-500 flex items-center'>
            <HiArrowNarrowUp />
            {lastMonthComments}
          </span>
          <div className='text-gray-500 text-xs'>Last month</div>
        </div>
      </div>
      <div className='flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md'>
        <div className='flex justify-between'>
          <div className=''>
            <h3 className='text-gray-500 text-md uppercase font-semibold'>Total Posts</h3>
            <p className='text-xl '>{totalPosts}</p>
          </div>
          <HiDocumentText className='bg-yellow-400  text-white rounded-full text-5xl p-3 shadow-lg' />
        </div>
        <div className='flex  gap-2 text-sm items-center'>
          <span className='text-green-500 flex items-center'>
            <HiArrowNarrowUp />
            {lastMonthPosts}
          </span>
          <div className='text-gray-500 text-xs'>Last month</div>
        </div>
      </div>
    </div>
    <div className="flex flex-wrap py-3 mx-auto justify-center gap-4 mt-10 ">
      <div className="flex flex-col w-full md:w-[460px] shadow-md p-2 rounded-md ">
        <div className="flex justify-between p-3 text-sm font-semibold items-center">
          <h1 className="uppercase text-gray-500 text-center p-2">Recent Users</h1>
          <button className="border-2 border-cyan-500 px-4 py-2 rounded-full font-semibold hover:text-white hover:bg-cyan-500 text-cyan-800"
          onClick={()=>{
            navigate('/dashboard?tab=users')
          }}>See All</button>
        </div>
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell>User Image</Table.HeadCell>
            <Table.HeadCell>Username</Table.HeadCell>
          </Table.Head>
          {users && users.map((user)=>{
            return (
              <Table.Body className="divide-y cursor-pointer" key={user._id}>
                <Table.Row className="bg-white">
                    <Table.Cell>
                      <img src={user.profilepicture} alt="" 
                      className="h-10 w-10 rounded-full bg-gray-500"/>
                    </Table.Cell>
                    <Table.Cell className="font-semibold">{user.username}</Table.Cell>
                </Table.Row>
              </Table.Body>
            )
          })}
        </Table>
      </div>
      <div className="flex flex-col w-full md:w-auto shadow-md p-2 rounded-md ">
        <div className="flex justify-between p-3 text-sm font-semibold items-center">
          <h1 className="uppercase text-gray-500 text-center p-2">Recent Comments</h1>
          <button className="border-2 border-cyan-500 px-4 py-2 rounded-full font-semibold hover:text-white hover:bg-cyan-500 text-cyan-800"
          onClick={()=>{
            navigate('/dashboard?tab=comments')
          }}>See All</button>
        </div>
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell>Comment</Table.HeadCell>
            <Table.HeadCell>Likes</Table.HeadCell>
          </Table.Head>
          {comments && comments.map((comment)=>{
            return (
              <Table.Body className="divide-y cursor-pointer" key={comment._id}>
                <Table.Row className="bg-white">
                    <Table.Cell className="text-sm ">
                      <p className="line-clamp-2 w-[300px]">{comment.content}</p>
                    </Table.Cell>
                    <Table.Cell className="font-semibold">{comment.numberoflikes}</Table.Cell>
                </Table.Row>
              </Table.Body>
            )
          })}
        </Table>
      </div>
      <div className="flex flex-col w-full md:w-auto shadow-md p-2 rounded-md ">
        <div className="flex justify-between p-3 text-sm font-semibold items-center">
          <h1 className="uppercase text-gray-500 text-center p-2">Recent Posts</h1>
          <button className="border-2 border-cyan-500 px-4 py-2 rounded-full font-semibold hover:text-white hover:bg-cyan-500 text-cyan-800"
          onClick={()=>{
            navigate('/dashboard?tab=posts')
          }}>See All</button>
        </div>
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell>Post Image</Table.HeadCell>
            <Table.HeadCell>Title</Table.HeadCell>
            <Table.HeadCell>Category</Table.HeadCell>
          </Table.Head>
          {posts && posts.map((post)=>{
            return (
              <Table.Body className="divide-y cursor-pointer" key={post._id}>
                <Table.Row className="bg-white">
                    <Table.Cell>
                      <img src={post.image} alt="" 
                      className="h-10 w-20 rounded-sm shadow-lg bg-gray-500"
                      onClick={()=>{
                        navigate(`/post/${post.slug}`)
                      }}/>
                    </Table.Cell>
                    <Table.Cell className="font-semibold"><p className="line-clamp-1">{post.title}</p></Table.Cell>
                    <Table.Cell className="font-semibold">{post.category}</Table.Cell>
                </Table.Row>
              </Table.Body>
            )
          })}
        </Table>
      </div>
      
    </div>
  </div>
 
}
