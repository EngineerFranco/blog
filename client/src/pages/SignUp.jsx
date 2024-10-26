import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react'
import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { GiArchiveRegister } from "react-icons/gi";
import OAth from '../components/OAth'
import { useDispatch } from 'react-redux';

const SignUp = () => {
    const [formData, setFormData] = useState({})
    const [errorMessage, setErrorMessage] = useState(null)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const formRef = useRef(null);

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

    const handleClickOutside = (event) => {
  
        if (formRef.current && !formRef.current.contains(event.target)) {
            setErrorMessage(null)
        }
    };

    useEffect(() => {
        setErrorMessage(null)
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

  return (
    <section className='min-h-screen mt-16 md:mt-36 sm:mt-20 dark:text-gray-300'>
        <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-20 sm:min-h-[25rem]'>
            <div className='flex-1 sm:mt-10 mb-auto'>
                <Link to={"/"} className='text-4xl font-bold dark:text-white'>
                    <span className="px-2 py-1 bg-gradient-to-r from-gray-900 via-blue-950 to-gray-600 rounded-md shadow-xl text-gray-50">DevFranco</span>
                    Blog
                </Link>
                <p className='text-sm mt-5 '>
                    This is DevFranco Blog web application. You can sign up using your email and password or with Google.
                </p>
            </div>
            <div className='flex-1 mb-auto'>
                <form 
                    ref={formRef}
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
                    <div>    
                        <Label value="Confirm Password" />
                        <TextInput 
                            id="confirmPassword"
                            name = 'confirmPassword'
                            type="password" 
                            placeholder="Confirm password"
                            onChange={handleChange}
                        />
                    </div>
                    <div className='flex items-center justify-between mt-4 gap-3'>
                        <Button color='dark' type='submit' disabled={loading} className='min-w-[8rem]'>
                            {
                                loading? (
                                    <>
                                    <Spinner size='sm'/> 
                                    <span className='pl-3'>Loading..</span>
                                    </>
                                ) 
                                : <span className='flex items-center text-nowrap'>Sign Up  <GiArchiveRegister className="ml-2 h-4 w-4" /></span>
                                
                            }
                        </Button>
                        <OAth/>
                    </div>
                </form>
                <div className='flex gap-2 text-sm mt-5'>
                    <span>Have an account?</span>
                    <Link to={'/sign-in'} className='text-blue-500'>
                    Sign In
                    </Link>
                </div>
                {
                    errorMessage && (
                        <Alert className='bg-red-50 mt-5 border max-w-md text-nowrap' color='failure'>
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