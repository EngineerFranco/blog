import {Link} from 'react-router-dom'

const PostCard = ({post}) => {
  return (
    <div className="group relative w-full border h-[23rem] overflow-hidden mt-5 rounded-lg sm:w-[24rem] border-teal-600/30 hover:border-3 transition-all ">
        <Link to={`/post/${post.slug}`}>
            <img src={post.image} alt='recent-posts' className='h-[17rem] w-full object-cover group-hover:h-[15rem] transition-all duration-300 z-20'/>
        </Link>
        <div className='p-3 flex flex-col gap-2'>
            <p className='text-lg font-semibold line-clamp-2'>{post.title}</p>
            <span className='italic text-sm'>{post.category}</span>
            <Link to={`/post/${post.slug}`} className='z-10 group-hover:bottom-0 absolute bottom-[-15rem] left-0 right-0 border border-teal-400 text-teal-400 hover:bg-teal-400 hover:text-white transition-all duration-300 text-center py-2 rounded-xl !rounded-tl-none m-2'>
            <p className='text-lg font-bold tracking-wider uppercase'>Read</p>
            </Link>
        </div>
    </div>
  )
}

export default PostCard