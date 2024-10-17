import {Alert, Button, FileInput, Select, TextInput } from 'flowbite-react'
import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { app } from '../firebase'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {useNavigate} from 'react-router-dom'

const CreatePost = () => {
    
    const [file, setFile] = useState(null)
    const [imageFileUploadProgress, setImageUploadProgress] = useState(null)
    const [imageFileUploadError, setImageFileUploadError] = useState(null)
    const [formData, setFormData] = useState({});
    const [publishError, setPublishError] = useState(null);
    const [publishSuccess, setPublishSuccess] = useState(false)
    const navigate = useNavigate()

    const handleUploadImage = async() =>{
        
        try {
            if(!file){
                setImageFileUploadError('No image uploaded')
                return
            }
            const storage = getStorage(app)
            const fileName = new Date().getTime() + '-' + file.fileNameconst 
            const storageRef = ref(storage, fileName)
            const uploadTask = uploadBytesResumable(storageRef, file)
            uploadTask.on(
                'state_changed',
                (snapshot) =>{
                    const progress =(snapshot.bytesTransferred/snapshot.totalBytes) * 100
                    setImageUploadProgress(progress.toFixed(0));
                },
                (error) => {
                    console.log(error.message|| error)
                    setImageFileUploadError('Image upload failed')
                    setImageUploadProgress(null)
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>{
                        setImageUploadProgress(null)
                        setImageFileUploadError(null)
                        setFormData({...formData, image:downloadURL    })
                        
                    })
                }

            )
        } catch (error) {
            console.log("error uploading image: ", error)
            setImageFileUploadError(null)
            setImageFileUploadError(error.message || error)

        }
    }


    const handleSubmit = async(e) =>{
        e.preventDefault()
        try {
            const responseData = await fetch('/api/post/create',{
                method: 'POST',
                headers: {
                    'Content-Type' : ' application/json'
                },
                body: JSON.stringify(formData)
            })

            const responseAPI = await responseData.json()
            if(!responseAPI.success){
                console.log(responseAPI.message)
                setPublishError(responseAPI.message)
                setPublishSuccess(false)
            }else{
                console.log(responseAPI.message)
                setPublishSuccess(true)
                setPublishError(null)
                navigate(`/post/${responseAPI.data.slug}`)
            }
        } catch (error) {
            console.log(error)
            setPublishSuccess(false)
            setPublishError('Something went wrong')
        }
    }

  return (
    <section className="min-h-screen p-3 max-w-4xl mx-auto  ">
        <h1 className="text-center text-3xl font-medium my-8">Create a post</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="w-full flex gap-4 justify-between items-center">
                <TextInput className='w-full flex-1' type='text' placeholder='Title' required id='title' onChange={(e)=> setFormData({...formData, title: e.target.value})}>
                </TextInput>
                <Select className='' onChange={(e)=> setFormData({...formData, category: e.target.value})}>
                    <option className='' value='uncatgerized'>Select a category</option>
                    <option className='' value='React'>React</option>
                    <option className='' value='Node'>Node.js</option>
                    <option className='' value='Next.js'>Next.js</option>
                    <option className='' value='Javascript'>Javascript</option>
                    <option className='' value='Typescript'>Typescript</option>
                </Select>
            </div>
            <div className='flex gap-4 items-center justify-start border-1 border-black max-h-[5rem] min-h-[4rem]'>
                <FileInput className='' type='file' accept='images/*' onChange={(e)=>setFile(e.target.files[0])}/>   
                <Button className='hover:scale-105 transition ease-in-out bg-gradient-to-r py-1 from-gray-900 via-blue-950 to-gray-600 border border-gray-800'size='sm' pill
                    onClick={handleUploadImage}
                    >{
                        imageFileUploadProgress? <CircularProgressbar className='w-[2rem] h-[2rem] -p-2 text-3xl' value={imageFileUploadProgress} text={`${imageFileUploadProgress || 0}% `}></CircularProgressbar> : <>Upload Image</>
                    }
                </Button>
            </div>
            {imageFileUploadError && (
                <Alert
                 color='failure'
                 className='max-w-sm'
                 >{imageFileUploadError}</Alert>
            )}
            {formData.image && (
                <img src={formData.image} alt='uploaded image' className='w-full h-full object-cover'>
                </img>
            )}

            
            <div className='flex-col justify-center items-center h-[24rem]'>
                <ReactQuill theme="snow" onChange={(value)=>setFormData({...formData, content:value})} placeholder='Write something' className='h-[18rem] mb-[3rem] ' required/>
                <Button  type='submit' className='hover:scale-105 transition ease-in-out bg-gradient-to-r sm:py-1 py-0 from-gray-900 via-blue-950 to-gray-600 border border-gray-800 w-[20rem] mx-auto'>Submit</Button>
            </div>
            {
                publishError && <Alert color='failure' className='mt-5 max-w-lg mx-auto p-3'>{publishError}</Alert>
            }
            {
                publishSuccess && <Alert color='success' className='mt-5 max-w-lg mx-auto p-3'>Post submitted successfully</Alert>
            }

        </form>
    </section>
  )
}

export default CreatePost