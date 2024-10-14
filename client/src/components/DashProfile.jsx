import { Alert, Button, TextInput } from 'flowbite-react'
import { useEffect, useRef, useState } from 'react';
import {useSelector} from 'react-redux'
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import { app } from '../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { updateStart, updateSuccess, updateFailure } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';

const DashProfile = () => {
    const {currentUser} = useSelector(state => state.user)
    const [imageFile, setImageFile] = useState(null);
    const [imageFileURL, setimageFileURL] = useState(null)
    const [imageFileUploadProgress, setImageUploadProgress] = useState(null)
    const [imageFileUploadError, setImageFileUploadError] = useState(null)
    const [imageFileUploading, setImageFileUploading] = useState(false)
    const [updateUserSuccess, setUpdateUserSuccess] = useState(null)
    const [updateUserError, setUpdateUserError] = useState(null)
    const [formData, setFormData] = useState({});
    const filePickerRef = useRef()
    const dispatch = useDispatch()

    const handleImageChange = (e)=>{
        const file = e.target.files[0]
        if(file){
            setImageFile(file)
            setimageFileURL(URL.createObjectURL(file))
        }
    }

    const uploadImage = () =>{
        setImageFileUploading(true)
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
                setImageFileUploading(false)
            },
            ()=>{
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>{
                    setimageFileURL(downloadURL)
                    setFormData({...formData, profilePicture:downloadURL    })
                    setImageFileUploading(false)
                    
                })
            }
        )
    }

    useEffect(() => {
        setUpdateUserSuccess(null)
        setUpdateUserError(null)
        if (imageFile) {
        uploadImage();
        }
    }, [imageFile]);

    const handleChange = (e) =>{
        setFormData({...formData, [e.target.id]: e.target.value})

    }

    const handleSubmit = async (e) =>{
        e.preventDefault()
        setUpdateUserSuccess(null)
        setUpdateUserError(null)
        if(Object.keys(formData).length === 0 ){
            setUpdateUserError('No changes made')
            return
        }
        if(imageFileUploading){
            setUpdateUserError('Please wait for image to upload')
            return
        }
        try {
            dispatch(updateStart())
            const responseData = await fetch(`/api/user/update/${currentUser._id}`,{
                method: 'PUT',
                headers: {'Content-Type' : 'application/json'},
                body: JSON.stringify(formData)
            })
            const responseAPI = await responseData.json()
            if(!responseAPI.success){
                dispatch(updateFailure(responseAPI.message))
                setUpdateUserError(responseAPI.message)
            }else{
                dispatch(updateSuccess(responseAPI.data))
                setUpdateUserSuccess(responseAPI.message)
            }
        } catch (error) {
            console.log(error.message)
            dispatch(updateFailure(error.message))
            setUpdateUserError(error.message)       
        }
    }



return (
    <div className='max-w-lg mx-auto p-3 w-full mt-5'>
        <h1 className='text-3xl text-center font-medium mb-4 mt-2'>{currentUser.username}</h1>
        <form className='flex flex-col gap-4 mt-5' onSubmit={handleSubmit}>
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
            
            <TextInput type='text' id='username' name='username' placeholder='Username' defaultValue={currentUser.username} onChange={handleChange}/>
            <TextInput type='email' id='email' name='email' placeholder='Email' defaultValue={currentUser.email} onChange={handleChange}/>
            <TextInput type='password' id='password'placeholder='Password' name='password' onChange={handleChange}/>
            <Button type='submit' className='bg-gradient-to-r from-gray-900 via-blue-950 to-gray-600 border border-gray-800'>
                Update
            </Button>
        </form>
        <div className='flex justify-between mt-5 px-1'>
            <span className='cursor-pointer text-red-500'>Delete Account</span>
            <span className='cursor-pointer'>Signout</span>
        </div>
        <div>
        {updateUserSuccess &&(
            <Alert color='success' className='mt-5'>{updateUserSuccess}</Alert>
        )}
         {updateUserError &&(
            <Alert color='failure' className='mt-5'>{updateUserError}</Alert>
        )}
        
        </div>
       
    </div>
)
}

export default DashProfile