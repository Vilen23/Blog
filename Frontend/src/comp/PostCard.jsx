import { useNavigate } from "react-router-dom";

export function PostCard({ post }) {
  const navigate = useNavigate();
  return (
    <div className='group relative border border-teal-500 hover:border-2 h-[340px] w-[450px] overflow-hidden rounded-lg transition-all'>
      
        <img
          src={post.image}
          alt='post cover'
          className='h-[220px] w-full object-cover group-hover:h-[200px] transition-all duration-300'
        onClick={()=>{
          navigate(`/post/${post.slug}`)
        }}/>
      
      <div className='p-3 flex flex-col gap-2 h-[140px]'> 
        <p className='text-lg text-gray-700 font-bold line-clamp-1 text-center'>{post.title}</p>
        <span className='italic text-sm text-center'>{post.category}</span>
      </div>
      <p
        onClick={()=>{
          navigate(`/post/${post.slug}`)
        }}
        className='cursor-pointer z-10 group-hover:bottom-0 absolute bottom-[-200px] left-0 right-0 border border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white transition-all duration-300 text-center py-2 rounded-md !rounded-tl-none m-2'
      >
        Read article
      </p>
    </div>
  );
}
