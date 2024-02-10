import { useNavigate } from "react-router-dom";

export function PostCard({ post }) {
    const navigate = useNavigate();
  return (
    <div className=" border-teal-500 hover:border-2 transition-all duration-200  group flex flex-col relative w-full h-[380px] border overflow-hidden rounded-lg sm:w-[460px]">
      <img
        src={post.image}
        alt=""
        className="cursor-pointer h-[260px] w-[500px] self-center object-cover group-hover:h-[200px] transition-all duration-300 z-20"
      onClick={()=>{
        navigate(`/post/${post.slug}`)
      }}/>
      <div className="p-3 flex flex-col gap-2">
        <p className="text-lg font-bold line-clamp-2 text-center">{post.title}</p>
        <span className="text-sm text-gray-500 italic text-center">{post.category}</span>
        <p className="z-10 group-hover:bottom-0 absolute bottom-[-200px] opacity-0 group-hover:opacity-100 border-teal-500 left-0 right-0 text-teal-500 hover:bg-teal-500 hover:text-white transition-all border-[1px]  duration-300 text-center py-2 m-2 cursor-pointer  !rounded-tl-none rounded-md "
        onClick={()=>{
            navigate(`/post/${post.slug}`)
          }}>
          Read More
        </p>
      </div>
    </div>
  );
}
