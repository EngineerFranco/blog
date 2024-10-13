import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import OAth from '../components/OAth'

const SignUp = () => {
    const [formData, setFormData] = useState({})
    const [errorMessage, setErrorMessage] = useState(null)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleChange = (e) =>{
        setFormData({
            ...formData,
            [e.target.id] : e.target.value.trim(),
        })
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        setErrorMessage(null)
        if(!formData.username || !formData.email || !formData.password){
            return setErrorMessage('Please fill out all fields')
        }
        setLoading(true)
        try {
            const responseData = await fetch('/api/auth/signup',{
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(formData)
            })
            const responseAPI = await responseData.json()
            if(!responseAPI.success){
                setErrorMessage(responseAPI.message)
            }
            setLoading(false)
            if(responseAPI.success){
                navigate('/sign-in')
            }
        } catch (error) {
            setErrorMessage(error.message)
            setLoading(false)
        }
    }

  return (
    <section className='min-h-[70dvh] bg-white mt-20'>
        <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-start gap-12'>
            <div className='flex-1 sm:mt-10'>
                <Link to={"/"} className='text-4xl font-bold dark:text-white'>
                    <span className="px-2 py-1 bg-gradient-to-r from-gray-950 via-gray-700 to-gray-400 rounded-lg text-white">DevFranco</span>
                    Blog
                </Link>
                <p className='text-sm mt-5'>
                    This is DevFranco Blog wep application. You can sign up using your email and password or with Google.
                </p>
            </div>
            <div className='flex-1'>
                <form 
                    className="flex max-w-md flex-col gap-4 min-h-[300px]" 
                    onSubmit={handleSubmit}>
                    <div>    
                        <Label value="Username" />
                        <TextInput 
                            id="username" 
                            name = "username"
                            type="text" 
                            placeholder="Username" 
                            onChange={handleChange}
                        />
                    </div>
                    <div>    
                        <Label value="Email" />
                        <TextInput 
                            id="email" 
                            name = "email"
                            type="email" 
                            placeholder="Franco@gmail.com" 
                            onChange={handleChange}
                        />
                    </div>
                    <div>    
                        <Label value="Password" />
                        <TextInput 
                            id="password"
                            name = 'password'
                            type="password" 
                            placeholder="Password"
                            onChange={handleChange}
                        />
                    </div>
                    <Button color='dark' type='submit' disabled={loading}>
                        {
                            loading? (
                                <>
                                 <Spinner size='sm'/> 
                                 <span className='pl-3'>Loading....</span>
                                </>
                            ) 
                            : <span>Sign Up</span>
                        }
                    </Button>
                    <OAth/>
                </form>
                <div className='flex gap-2 text-sm mt-5'>
                    <span>Have an account?</span>
                    <Link to={'/sign-in'} className='text-blue-500'>
                    Sign In
                    </Link>
                </div>
                {
                    errorMessage && (
                        <Alert className='bg-red-50 mt-5 border' color='failure'>
                            {errorMessage}
                        </Alert>
                    )
                }
        
            </div>
        </div>
    </section>
  )
}

export default SignUp