import { useEffect, useState  } from "react"
import { Link, useParams } from "react-router-dom"
import DotLoader from "react-spinners/DotLoader";
import {Button} from 'flowbite-react'
import CallToAction from "../components/CallToAction";
import CommentSection from "../components/CommentSection";
import PostCard from "../components/PostCard";



const PostPage = () => {

    

    const {postSlug} = useParams()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [post, setPost] = useState(null)
    const [recentPosts, setRecentPosts] = useState(null)

    useEffect(()=>{
        const fetchPost = async()=>{
            try {
                setLoading(true)
                const responseData = await fetch(`/api/post/view?slug=${postSlug}`)
                const responseAPI = await responseData.json()
                if(!responseAPI.success){
                    console.log('error',responseAPI.message)
                    setError(true)
                    setLoading(false)
                }
                if(responseAPI.success){
                    setError(false)
                    setLoading(false)
                    setPost(responseAPI.data.posts[0])
                }
                
            } catch (error) {
                console.log(error)
                setError(true)
                setLoading(false)
            }
            
        }
        fetchPost()
    },[postSlug])

    useEffect(()=>{
        try {
            const fetcRecentPosts = async() =>{
                const res = await fetch (`/api/post/view?limit=3`)
                const data = await res.json()
                
                if(data.success){
                    setRecentPosts(data.data.posts)
                }
            }
            fetcRecentPosts()
        } catch (error) {
            console.log(error)
        }
    }, [])

    if(loading){
        return (
        <div className="h-[100dvh] w-screen flex flex-col items-center gap-10">
            <DotLoader
            className="mx-auto mt-28"
            color="#007f80"
            loading={loading}
            size={200}
            aria-label="Loading Spinner"
            data-testid="loader"
        />
        <p className="text-teal-500 text-lg font-semibold">Loading ....</p>
        </div>)
    }

    if(error){
        return (
        <div className="h-[100dvh] w-screen flex flex-col items-center gap-10">
            <DotLoader
            className="mx-auto mt-28"
            color="#007f80"
            loading={loading}
            size={200}
            aria-label="Loading Spinner"
            data-testid="loader"
        />
        <p className="text-teal-500 text-lg font-semibold">{error}</p>
        </div>)
    }


    return (
        <main className="max-w-7xl h-full flex flex-col mx-auto items-center p-3 ">

            <h1 className="sm:text-3xl text-xl font-medium mt-8 text-teal-300 font-serif text-shadow-lg " >{post.title}</h1>
            <Link to={`/search?category=${post && post.category}`} className="self-end mt-5 p-3 -mb-5">
                <Button size="xs" color="gray" pill className="ml-auto">{post.category}</Button>
            </Link>

            <img src={post && post.image} alt={post && post.title} className="w-full max-h-[40rem] p-3 object-cover rounded-2xl "></img>
            
            <div className="flex justify-between w-full p-4 border-b-2">
                <p className="text-xs sm:text-sm">Last updated: <span>{post&& new Date(post.createdAt).toLocaleDateString()}</span></p> 
                <p className="text-xs sm:text-sm italic"><span>{post && (post.content.length / 400).toFixed(0)}</span> mins read</p> 
            </div>

            <div  className="p-3 mx-auto max-w-6xl my-7 sm:text-base text-sm" dangerouslySetInnerHTML={{__html: post && post.content}}/>
            <div className="max-w-5xl">
                <CallToAction/>
            </div>
           
            <CommentSection postId={post._id}/>

            <div className="flex flex-col justify-center items-center mb-5">
                <h1 className="text-xl mt-5 mb-5">Recent posts</h1>
                <div className="flex flex-wrap gap-5 justify-center">
                    {recentPosts ? 
                        recentPosts.map((post) => (
                        <PostCard key={post._id} post={post} />
                        )) : (
                        <h1 className="text-sm mx-auto font-semibold">No recent posts yet</h1>
                        )
                    }
                </div>
            </div>
                
        
            
        </main>
    )
}

export default PostPage