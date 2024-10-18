import { Alert, Button, Textarea } from 'flowbite-react'
import { useEffect, useState } from 'react'
import {useSelector} from 'react-redux'
import { Link } from 'react-router-dom'
import Comment from './Comment'

const CommentSection = ({ postId }) => {
    const { currentUser } = useSelector(state => state.user);
    const [comment, setComment] = useState(''); 
    const [commentError, setCommentError] = useState(null);
    const [comments, setComments] = useState([]);

    const fetchComment = async () => {
        try {
            const response = await fetch(`/api/comment/comment-view/${postId}`);
            if (!response.ok) {
                console.log(`HTTP error! Status: ${response.status}`);
            }

            const contentType = response.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                const responseAPI = await response.json();

                if (!responseAPI.success) {
                    console.log(responseAPI.message);
                }

                if (responseAPI.success) {
                    setComments(responseAPI.data);
                }
            } else {
                console.error("Received non-JSON response.");
            }
        } catch (error) {
            console.error("Error fetching comments:", error);
        }
    };

    useEffect(() => {
        fetchComment();
    }, [postId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (comment.length > 200) {
            return;
        }
        try {
            const responseData = await fetch(`/api/comment/comment-create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ content: comment, postId, userId: currentUser._id })
            });

            const responseAPI = await responseData.json();

            if (responseAPI.success) {
                setComment(''); 
                setCommentError(null);
                fetchComment();
            } else {
                setCommentError(responseAPI.message);
            }
        } catch (error) {
            console.log(error);
            setCommentError(error);
        }
    };

    return (
        <div className='w-full mt-20 mb-20 px-2'>
            {currentUser ? (
                <div className='flex gap-2 w-full items-center mb-2 text-gray-400 px-1'>
                    <p className=' text-sm my-auto'>Sign in as</p>
                    <img src={currentUser.profilePicture} alt={currentUser.username} className='w-[2rem] h-[2rem] rounded-full'></img>
                    <Link to={`/dashboard?tab=profile`} className='text-sm my-auto '>
                        @{currentUser ? currentUser.email : `guest`}
                    </Link>
                </div>
            ) : (
                <div>
                    You must be signed in to comment.
                    <Link to={'/sign-sin'}>
                        Sign in
                    </Link>
                </div>
            )}
            {currentUser && (
                <form className='border border-teal-300/60 p-3 rounded-md items-center justify-center' onSubmit={handleSubmit}>
                    <Textarea
                        placeholder='Add a comment...'
                        rows='3'
                        maxLength='200'
                        onChange={(e) => setComment(e.target.value)}
                        value={comment}
                    />

                    <div className='flex justify-between items-center p-1 mt-2'>
                        <p className='italic text-xs sm:text-sm '>
                            <span className='not-italic'>{200 - comment.length}</span> characters remaining
                        </p>
                        <Button size='xs' className='hover:scale-105 transition' type='submit' gradientMonochrome='teal' pill>Submit</Button>
                    </div>
                    {commentError && <Alert color='failure'>{commentError}</Alert>}
                </form>
            )}
            {comments && comments.length === 0 ? (
                <p className='mt-5 p-2 mx-auto'>No comments yet</p>
            ) : (
                <>
                    <div className='flex mt-5 items-center px-1 mb-5'>
                        <p className='tracking-tight'>Comments</p>
                        <div className=''>
                            <p className='ml-2 px-2 bg-teal-500 text-white rounded-full text-center sm:text-sm text-xs'>{comments.length}</p>
                        </div>
                    </div>
                    {comments.map((comment) => (
                        <Comment key={comment._id} comment={comment} />
                    ))}
                </>
            )}
        </div>
    );
};

export default CommentSection;
