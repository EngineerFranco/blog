import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  HiArrowNarrowUp,
  HiOutlineUserGroup,
} from 'react-icons/hi';
import { FaComments } from "react-icons/fa";
import { Button, Table } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { HiDocumentDuplicate } from "react-icons/hi";
import { FaUser } from "react-icons/fa";

const DashboardComponent = () => {
    const [users, setUsers] = useState([])
    const [comments, setComments] = useState([])
    const [posts, setPosts] = useState([])
    const [totalUsers, setTotalUsers] = useState(0)
    const [totalPosts, setTotalPosts] = useState(0)
    const [totalComments, setTotalComments] = useState(0)
    const [lastMonthUsers, setLastMonthUsers] = useState([])
    const [lastMonthPosts, setLastMonthPosts] = useState([])
    const [lastMonthComments, setLastMonthComments] = useState([])
    const { currentUser } = useSelector((state) => state.user)
    
    useEffect(()=>{
        const fetchUsers = async() =>{
            try {
                const res = await fetch(`/api/user/view?limit=5`)
                const resData = await res.json()
                if(resData.success){
                    setUsers(resData.data.users)
                    setTotalUsers(resData.data.totalUsers)
                    setLastMonthUsers(resData.data.lastMonthUsers)
                }
            } catch (error) {
                console.log(error)
            }
            
        }  
        const fetchPosts = async() =>{
            try {
                const res = await fetch(`/api/post/view?limit=5`)
                const resData = await res.json()
                if(resData.success){
                    
                    setPosts(resData.data.posts)
                    setTotalPosts(resData.data.totalPosts)
                    setLastMonthPosts(resData.data.lastMonthPosts)
                }
            } catch (error) {
                console.log(error)
            }
        } 
        const fetchComments = async() =>{
            try {
                const res = await fetch(`/api/comment/getcomments?limit=5`)
                const resData = await res.json()
                if(resData){
                    console.log(resData)
                    setComments(resData.comments)
                    setTotalComments(resData.totalComments)
                    setLastMonthComments(resData.lastMonthComments)
                }
            } catch (error) {
                console.log(error)
            }
        }  
        if(currentUser.isAdmin){
            fetchUsers()
            fetchPosts()
            fetchComments()
        }
    }, [currentUser])

    return (
        <div className='p-3 md:mx-auto'>
          <div className='flex-wrap flex gap-4 justify-center'>
            <div className='flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md'>
              <div className='flex justify-between'>
                <div className=''>
                  <h3 className='text-gray-500 text-md uppercase'>Total Users</h3>
                  <p className='text-2xl'>{totalUsers}</p>
                </div>
                <HiOutlineUserGroup className='bg-teal-600  text-white rounded-full text-5xl p-3 shadow-lg' />
              </div>
              <div className='flex  gap-2 text-sm'>
                <span className='text-teal-400 flex items-center'>
                  <HiArrowNarrowUp />
                  {lastMonthUsers}
                </span>
                <div className='text-gray-500'>Last month</div>
              </div>
            </div>
            <div className='flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md'>
              <div className='flex justify-between'>
                <div className=''>
                  <h3 className='text-gray-500 text-md uppercase'>
                    Total Comments
                  </h3>
                  <p className='text-2xl'>{totalComments}</p>
                </div>
                <FaComments className='bg-indigo-600  text-white rounded-full text-5xl p-3 shadow-lg' />
              </div>
              <div className='flex  gap-2 text-sm'>
                <span className='text-teal-400 flex items-center'>
                  <HiArrowNarrowUp />
                  {lastMonthComments}
                </span>
                <div className='text-gray-500'>Last month</div>
              </div>
            </div>
            <div className='flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md'>
              <div className='flex justify-between'>
                <div className=''>
                  <h3 className='text-gray-500 text-md uppercase'>Total Posts</h3>
                  <p className='text-2xl'>{totalPosts}</p>
                </div>
                <HiDocumentDuplicate className='bg-lime-600  text-white rounded-full text-5xl p-3 shadow-lg' />
              </div>
              <div className='flex  gap-2 text-sm'>
                <span className='text-teal-400 flex items-center'>
                  <HiArrowNarrowUp />
                  {lastMonthPosts}
                </span>
                <div className='text-gray-500'>Last month</div>
              </div>
            </div>
          </div>
          <div className='flex flex-wrap gap-4 py-3 mx-auto justify-center'>
            <div className='flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800'>
              <div className='flex justify-between  p-3 text-sm font-semibold'>
                <h1 className='text-center p-2'>Recent users</h1>
                <Button gradientMonochrome='teal'>
                  <Link to={'/dashboard?tab=users'}>See all</Link>
                </Button>
              </div>
              <Table hoverable>
                <Table.Head>
                  <Table.HeadCell>User image</Table.HeadCell>
                  <Table.HeadCell>Username</Table.HeadCell>
                </Table.Head>
                {users &&
                  users.map((user) => (
                    <Table.Body key={user._id} className='divide-y'>
                      <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                        <Table.Cell>
                            {
                                user.profilePicture ? (
                                    <img
                                    src={ user.profilePicture}
                                    alt='user'
                                    className='w-10 h-10 rounded-full bg-gray-500'
                                />
                                ):(
                                <FaUser className='w-10 h-10 rounded-full bg-gray-500' />
                                )
                            }
                          
                        </Table.Cell>
                        <Table.Cell>{user.username}</Table.Cell>
                      </Table.Row>
                    </Table.Body>
                  ))}
              </Table>
            </div>
            <div className='flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800'>
              <div className='flex justify-between  p-3 text-sm font-semibold'>
                <h1 className='text-center p-2'>Recent comments</h1>
                <Button gradientMonochrome='teal'>
                  <Link to={'/dashboard?tab=comments'}>See all</Link>
                </Button>
              </div>
              <Table hoverable>
                <Table.Head>
                  <Table.HeadCell>Comment content</Table.HeadCell>
                  <Table.HeadCell>Likes</Table.HeadCell>
                </Table.Head>
                {comments &&
                  comments.map((comment) => (
                    <Table.Body key={comment._id} className='divide-y'>
                      <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                        <Table.Cell className='w-96'>
                            <p className='line-clamp-2'>{comment.content}</p>
                        </Table.Cell>
                        <Table.Cell>{comment.numberOfLikes}</Table.Cell>
                      </Table.Row>
                    </Table.Body>
                  ))}
              </Table>
            </div>
            <div className='flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800'>
              <div className='flex justify-between  p-3 text-sm font-semibold'>
                <h1 className='text-center p-2'>Recent posts</h1>
                <Button gradientMonochrome='teal'>
                  <Link to={'/dashboard?tab=posts'}>See all</Link>
                </Button>
              </div>
              <Table hoverable>
                <Table.Head>
                  <Table.HeadCell>Post image</Table.HeadCell>
                  <Table.HeadCell>Post Title</Table.HeadCell>
                  <Table.HeadCell>Category</Table.HeadCell>
                </Table.Head>
                {posts &&
                  posts.map((post) => (
                    <Table.Body key={post._id} className='divide-y'>
                      <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                        <Table.Cell>
                          <img
                            src={post.image}
                            alt='user'
                            className='w-14 h-10 rounded-md bg-gray-500'
                          />
                        </Table.Cell>
                        <Table.Cell className='w-96'>{post.title}</Table.Cell>
                        <Table.Cell className='w-5'>{post.category}</Table.Cell>
                      </Table.Row>
                    </Table.Body>
                  ))}
              </Table>
            </div>
          </div>
        </div>
      );
    }
export default DashboardComponent