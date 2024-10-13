import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

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
        setLoading(true)

        if(!formData.username || !formData.email || !formData.password){
            return setErrorMessage('Please fill out all fields')
        }
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
    <section className='min-h-screen bg-white mt-20'>
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
                <form 
                    className="flex max-w-md flex-col gap-4 " 
                    onSubmit={handleSubmit}>
                    <div>    
                        <Label value="Your username" />
                        <TextInput 
                            id="username" 
                            name = "username"
                            type="text" 
                            placeholder="Username" 
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>    
                        <Label value="Your email" />
                        <TextInput 
                            id="email" 
                            name = "email"
                            type="email" 
                            placeholder="Franco@gmail.com" 
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>    
                        <Label value="Your password" />
                        <TextInput 
                            id="password"
                            name = 'password'
                            type="password" 
                            placeholder="Password"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <Button gradientDuoTone='purpleToPink' type='submit' disabled={loading}>
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