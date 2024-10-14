import { Alert, Button, TextInput } from 'flowbite-react'
import { useEffect, useRef, useState } from 'react';
import {useSelector} from 'react-redux'
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import { app } from '../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const DashProfile = () => {
    const {currentUser} = useSelector(state => state.user)
    const [imageFile, setImageFile] = useState(null);
    const [imageFileURL, setimageFileURL] = useState(null)
    const [imageFileUploadProgress, setImageUploadProgress] = useState(null)
    const [imageFileUploadError, setImageFileUploadError] = useState(null)
    const filePickerRef = useRef()

    const handleImageChange = (e)=>{
        const file = e.target.files[0]
        if(file){
            setImageFile(file)
            setimageFileURL(URL.createObjectURL(file))
        }
    }

    const uploadImage = () =>{
        setImageFileUploadError(null)
        const storage = getStorage(app);
        const fileName = new Date().getTime() + imageFile.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, imageFile);
        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress =(snapshot.bytesTransferred/snapshot.totalBytes) * 100
                setImageUploadProgress(progress.toFixed(0))
            },
            (error)=>{
                console.log(error)
                setImageFileUploadError('File too large')
                setImageUploadProgress(null)
                setImageFile(null)
                setimageFileURL(null)
            },
            ()=>{
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>{
                    setimageFileURL(downloadURL)
                })
            }
        )
    }

    useEffect(() => {
        if (imageFile) {
          uploadImage();
          console.log(imageFile)
        }
      }, [imageFile]);

   
  return (
    <div className='max-w-lg mx-auto p-3 w-full mt-5'>
        <h1 className='text-3xl text-center font-medium mb-4 mt-2'>{currentUser.data.username}</h1>
        <form className='flex flex-col gap-4 mt-5'>
            <input type="file" accept='image/*'onChange={handleImageChange} ref={filePickerRef} hidden/>
            <div
                className='relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full '
                onClick={() => filePickerRef.current.click()}
                >
                {imageFileUploadProgress && (
                    <CircularProgressbar
                    
                    value={imageFileUploadProgress || 0}
                    text={`${imageFileUploadProgress}%`}
                    strokeWidth={5}
                    styles={{
                        root: {
                        width: '100%',
                        height: '100%',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        },
                        pathColor: `rgba(62, 152, 199, ${imageFileUploadProgress / 100})`,
                        textColor: '#f88',
                        trailColor: '#d6d6d6',
                        backgroundColor: '#3e98c7',
                    }}
                    />
                )}
                <img
                    src={imageFileURL || currentUser.profilePicture}
                    alt='user'
                    className={`rounded-full w-full h-full object-cover border-1 border-[lightgray] ${
                    imageFileUploadProgress &&
                    imageFileUploadProgress < 100 &&
                    'opacity-60'
                    }`}
                />
                </div>
            {imageFileUploadError &&  <Alert color='failure' className='py-3 font-semibold'>{imageFileUploadError}</Alert>}
            
            <TextInput type='text' id='username' name='username' placeholder='Username' defaultValue={currentUser.data.username}/>
            <TextInput type='email' id='email' name='email' placeholder='Email' defaultValue={currentUser.data.email}/>
            <TextInput type='password' id='password'placeholder='Password' name='password'/>
            <Button type='submit' className='bg-gradient-to-r from-gray-900 via-blue-950 to-gray-600 border border-gray-800'>
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