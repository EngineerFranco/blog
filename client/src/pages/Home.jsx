import {Link} from 'react-router-dom'
import CallToAction from '../components/CallToAction'
import { useEffect, useState } from 'react'
import PostCard from '../components/PostCard'
const Home = () => {
  const [posts, setPosts] = useState([])

  useEffect(()=>{
    const fetchPosts = async()=>{
      const res = await fetch(`/api/post/view`)
      const data = await res.json()
      if(data.success){
        setPosts(data.data.posts)
      }
    }
    fetchPosts()
  },[])
  console.log(posts)

  return (
    <div>
        <div className="flex flex-col gap-6 lg:p-44 md:p-28 p-10 max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold lg:text-6xl">Welcome to my Blog</h1>
          <p className="text-gray-600 text-sm sm:text-lg">Welcome! I'm Franco Santos, a full-stack developer.
          This personal blog serves as a space for my development practice. You're welcome to browse, read, and even contribute by creating your own posts. Enjoy exploring!</p>
          <Link to={'/search'} className='text-xs sm:text-sm hover:underline text-teal-400 font-semibold'>
          View all posts
        </Link>
        </div>
        <div className='px-4 pb-10 mb-24'>
          <CallToAction/>
        </div>
        <div className='max-w-7xl mx-auto p-3 flex flex-col gap-8 py-7'>
              {
                posts && posts.length > 0 && (
                  <div>
                    <h2 className='text-2xl font-semibold text-center'>Recent Posts</h2>
                    <div className='flex flex-wrap sm:gap-4  gap-2 justify-center'>
                    {posts.map((post) => (
                      <PostCard key={post._id} post={post} />
                    ))}
                    </div>
                    
                  </div>
                )
              }
              <Link to={`/search`} className='text-2xl text-center text-teal-300 hover:text-teal-500'>View all posts</Link>
        </div>
    </div>
   
  )
}

export default Home