import { Button, TextInput } from 'flowbite-react'
import {useSelector} from 'react-redux'

const DashProfile = () => {
    const {currentUser} = useSelector(state => state.user)
  return (
    <div className='max-w-lg mx-auto p-3 w-full '>
        <h1 className='text-3xl text-center font-medium mb-4 mt-2'>Profile</h1>
        <form className='flex flex-col gap-4'>
            <img src={currentUser.data.profilePicture} alt="userProfilePic" className='mx-auto rounded-full w-32 h-32 object-cover border-2 border-gray-600 cursor-pointer'></img>
            <TextInput type='text' id='username' name='username' placeholder='Username' defaultValue={currentUser.data.username}/>
            <TextInput type='email' id='email' name='email' placeholder='Email' defaultValue={currentUser.data.email}/>
            <TextInput type='password' id='password'placeholder='Password' name='password'/>
            <Button type='submit' className='bg-gradient-to-r from-gray-900 via-blue-950 to-gray-600 border border-gray-700'>
                Update
            </Button>
        </form>
        <div className='flex justify-between mt-5 px-1'>
            <span className='cursor-pointer text-red-500'>Delete Account</span>
            <span className='cursor-pointer'>Signout</span>
        </div>
        
    </div>
  )
}

export default DashProfile