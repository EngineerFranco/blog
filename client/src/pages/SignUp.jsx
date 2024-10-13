import { Button, Label, TextInput } from 'flowbite-react'
import React from 'react'
import { Link } from 'react-router-dom'

const SignUp = () => {
  return (
    <section className='min-h-screen bg-red-100 mt-20'>
        <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-12'>
            <div className='flex-1'>
                <Link to={"/"} className='text-4xl font-bold dark:text-white'>
                    <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">DevFranco</span>
                    Blog
                </Link>
                <p className='text-sm mt-5'>
                    This is DevFranco Blog wep application. You can sign up using your email and password or with Google.
                </p>
            </div>
            <div className='flex-1'>
                <form className="flex max-w-md flex-col gap-4">
                    <div>    
                        <Label value="Your username" />
                        <TextInput 
                            id="username" 
                            type="text" 
                            placeholder="Username" 
                            required 
                        />
                    </div>
                    <div>    
                        <Label value="Your email" />
                        <TextInput 
                            id="email" 
                            type="email" 
                            placeholder="test@gmail.com" 
                            required 
                        />
                    </div>
                    <div>    
                        <Label value="Your password" />
                        <TextInput 
                            id="password" 
                            type="password" 
                            placeholder="Password" 
                            required 
                        />
                    </div>
                    <Button gradientDuoTone='purpleToPink' type='submit'>
                        Sign Up
                    </Button>
                </form>
                <div className='flex gap-2 text-sm mt-5'>
                    <span>Have an account?</span>
                    <Link to={'/sign-in'} className='text-blue-500'>
                    Sign In
                    </Link>
                </div>
            </div>
        </div>
    </section>
  )
}

export default SignUp