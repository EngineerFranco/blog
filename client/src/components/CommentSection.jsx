import { Button, Textarea } from 'flowbite-react'
import { useState } from 'react'
import {useSelector} from 'react-redux'
import { Link } from 'react-router-dom'

const CommentSection = () => {
    const {currentUser} = useSelector(state => state.user)
    const [comment, setComment] = useState(null)


    const handeSubmit = async() =>{
        
    }
  return (
    <div className='w-full mt-20 mb-20'>
        {currentUser?
        (
            <div className='flex gap-2 w-full items-center my-5 text-gray-400'>
                <p className=' text-sm my-auto'>Sign in as</p>
                <img src={currentUser.profilePicture} alt={currentUser.username} className='w-[2rem] h-[2rem] rounded-full'></img>
                <Link to={`/dashboard?tab=profile`} className='text-sm my-auto '>
                    @{currentUser? currentUser.email : `guest`}
                </Link>
                
            </div>
        )
        :
        (
            <div className=''>
                You must be sign in to comment.
                <Link to={'/sign-sin'}>
                    Signin
                </Link>
            </div>
        )}
        {currentUser &&(
            <form className='border border-teal-300/60 p-3 rounded-md items-center justify-center' onSubmit={handeSubmit}>
                <Textarea
                placeholder='Add a comment...'
                rows='3'
                maxLength='200'
                onChange={(e)=> setComment(e.target.value)}
                value={comment}
                />

                <div className='flex justify-between items-center p-1 mt-2'>
                    <p className=' italic text-xs sm:text-sm '><span className='not-italic'>{comment? 200 - comment.length : `200`}</span> characters remaining</p>
                    <Button size='xs'className='hover:scale-105 transition' type='submit' gradientMonochrome='teal' pill>Submit</Button>
                </div>

        
              
            </form>
        )}
    </div>
  )
}

export default CommentSection