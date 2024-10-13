import { Button } from "flowbite-react"
import { FcGoogle } from "react-icons/fc";
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth'
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../user/userSlice";
import { useNavigate } from "react-router-dom";

const OAth = () => {

    const auth = getAuth(app)
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const handeGoogleClick = async() =>{
       const provider = new GoogleAuthProvider()
       provider.setCustomParameters({prompt:'select_account'})

       try {
        const resultsFromGoogle = await signInWithPopup(auth, provider)
        const responseData = await fetch('api/auth/google',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                username: resultsFromGoogle.user.displayName,
                email: resultsFromGoogle.user.email,
                googlePhotoURL: resultsFromGoogle.user.photoURL
            })
        })

        const responseAPI = await responseData.json()
        if(responseAPI.success){
            dispatch(signInSuccess(responseAPI))
            navigate('/');
        }

    } catch (error) {
        console.log(error)
    }
    }
    

  return (
    <Button className="bg-gradient-to-r from-red-600 via-yellow-500 to-blue-600"  type="button" outline 
        onClick={handeGoogleClick}>
          <FcGoogle className="my-auto mr-2 text-lg"/>
        <p className="">Continue with Google</p>
       
    </Button>
  )
}

export default OAth