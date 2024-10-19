import { Link } from 'react-router-dom';
import CallToAction from '../components/CallToAction';
import { useEffect, useState } from 'react';
import PostCard from '../components/PostCard';
import DotLoader from "react-spinners/DotLoader";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/post/view`);
        const data = await res.json();
        if (data.success) {
          setPosts(data.data.posts);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false); 
      }
    };
    fetchPosts();
  }, []);

  return (
    <div>
      {/* Loading Spinner */}
      {loading ? (
        <div className="h-[100dvh] w-screen flex flex-col items-center justify-center">
          <DotLoader
            className="mx-auto"
            color="#007f80"
            loading={loading}
            size={200}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
          <p className="text-teal-500 text-lg font-semibold">Loading ....</p>
        </div>
      ) : (
        <>
          <div className="bg-cover bg-center h-screen flex flex-col items-center text-center"
            style={{
              backgroundImage: `url('https://firebasestorage.googleapis.com/v0/b/blog-2bc26.appspot.com/o/undraw_real_time_collaboration_c62i.svg?alt=media&token=8e9e6710-dede-43f9-9998-edc4a5a1ed19')`
            }}>
            <div className="bg-opacity-50 p-10 rounded-full max-w-5xl dark:bg-opacity-0 sm:mt-28 mt-10">
              <h1 className="text-6xl lg:text-6xl font-bold dark:text-white text-gray-950 pb-10">Welcome to my Blog</h1>
              <p className="text-black text-sm sm:text-lg mt-4 dark:text-gray-300 font-semibold">
                Welcome! I'm Franco Santos, a full-stack developer. This personal blog serves as a space for my development practice. You're welcome to browse, read, and even contribute by creating your own posts. Enjoy exploring!
              </p>
              <Link to={'/search'} className='py-10 sm:text-sm'>
                <p className='text-2xl text-teal-400 font-semibold hover:underline py-10'>View all posts</p>
              </Link>
            </div>
          </div>

          <div className='px-4 pb-10 mb-24'>
            <CallToAction />
          </div>

          <div className='max-w-7xl mx-auto p-3 flex flex-col gap-8 py-7'>
            {posts.length > 0 ? (
              <div>
                <h2 className='text-2xl font-semibold text-center'>Recent Posts</h2>
                <div className='flex flex-wrap sm:gap-4 gap-2 justify-center'>
                  {posts.map((post) => (
                    <PostCard key={post._id} post={post} />
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-center text-lg">No posts available.</p>
            )}
            <Link to={`/search`} className='text-2xl text-center text-teal-300 hover:text-teal-500'>View all posts</Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
