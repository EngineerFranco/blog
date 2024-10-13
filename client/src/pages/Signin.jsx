import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInStart, signInSuccess, signInFailure } from '../user/userSlice';
import { useDispatch, useSelector } from 'react-redux'

const SignIn = () => {
    const [formData, setFormData] = useState({});

    const {loading, error: errorMessage} = useSelector(state => state.user)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value.trim(),
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(signInStart())

        if (!formData.email || !formData.password) {
            return dispatch(signInFailure('Please fill all the fields'))
        }

        try {
            const responseData = await fetch('/api/auth/signin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const responseAPI = await responseData.json();
            if (!responseAPI.success) {
                dispatch(signInFailure(responseAPI.message))
            }

            if (responseAPI.success) {
                dispatch(signInSuccess(responseAPI.data))
                navigate('/');
            }
        } catch (error) {
            dispatch(signInFailure(error.message))
        }
    };

    return (
        <section className='min-h-[70dvh] bg-white mt-20'>
            <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-start gap-12'>
                <div className='flex-1 sm:mt-10'>
                    <Link to={"/"} className='text-4xl font-bold dark:text-white'>
                        <span className="px-2 py-1 bg-gradient-to-r from-gray-950 via-gray-700 to-gray-400 rounded-lg text-white">DevFranco</span>
                        Blog
                    </Link>
                    <p className='text-sm mt-5'>
                        This is DevFranco Blog web application. You can sign in using your email and password or with Google.
                    </p>
                </div>
                <div className='flex-1 '>
                    <form 
                        className="flex max-w-md flex-col gap-4 min-h-[300px]"  
                        onSubmit={handleSubmit}>
                        <div>    
                            <Label value="Email" />
                            <TextInput 
                                id="email" 
                                name="email"
                                type="email" 
                                placeholder="Email" 
                                onChange={handleChange}
                            />
                        </div>
                        <div>    
                            <Label value="Password" />
                            <TextInput 
                                id="password"
                                name='password'
                                type="password" 
                                placeholder="Password"
                                onChange={handleChange}
                            />
                        </div>
                        <div>    
                            <Label value="Confirm password" />
                            <TextInput 
                                id="confirmPassword"
                                name='confirmPassword'
                                type="password" 
                                placeholder="Confirm Password"
                                onChange={handleChange}
                            />
                        </div>
                        <Button color='dark' type='submit' disabled={loading}>
                            {
                                loading ? (
                                    <>
                                        <Spinner size='sm'/> 
                                        <span className='pl-3'>Loading....</span>
                                    </>
                                ) : <span>Sign In</span>
                            }
                        </Button>
                    </form>
                    <div className='flex gap-2 text-sm mt-5'>
                        <span>Don`t have an account?</span>
                        <Link to={'/sign-up'} className='text-blue-500'>
                            Sign Up
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
    );
};

export default SignIn;
