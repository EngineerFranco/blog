import {Button, FileInput, Select, TextInput } from 'flowbite-react'
import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const CreatePost = () => {
    const [value, setValue] = useState('');
  return (
    <section className="min-h-screen p-3 max-w-4xl mx-auto  ">
        <h1 className="text-center text-3xl font-medium my-8">Create a post</h1>
        <form className="flex flex-col gap-4">
            <div className="w-full flex gap-4 justify-between items-center">
                <TextInput className='w-full flex-1' type='text' placeholder='Title' required id='title'>
                </TextInput>
                <Select className=''>
                    <option className='' value='uncatgerized'>Select a category</option>
                    <option className='' value='React'>React</option>
                    <option className='' value='Node'>Node.js</option>
                    <option className='' value='Next.js'>Next.js</option>
                    <option className='' value='Javascript'>Javascript</option>
                    <option className='' value='Typescript'>Typescript</option>
                </Select>
            </div>
            <div className='flex gap-4 items-center justify-start border-1 border-black'>
             <FileInput className='' type='file' accept='images/*'/>   
            <Button className='hover:scale-105 transition ease-in-out bg-gradient-to-r py-1 from-gray-900 via-blue-950 to-gray-600 border border-gray-800'size='sm' pill>Upload image</Button>
            </div>
            <div className='flex-col justify-center items-center h-[24rem]'>
            <ReactQuill theme="snow" value={value} onChange={setValue} placeholder='Write something' className='h-[18rem] mb-[3rem] ' required/>
            <Button type='submit' className='hover:scale-105 transition ease-in-out bg-gradient-to-r sm:py-1 py-0 from-gray-900 via-blue-950 to-gray-600 border border-gray-800 w-[20rem] mx-auto'>Submit</Button>
            </div>
            
        </form>
    </section>
  )
}

export default CreatePost