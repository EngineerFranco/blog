import {Sidebar} from 'flowbite-react'
import { useEffect, useState } from 'react';
import { HiArrowSmRight, HiUser  } from "react-icons/hi";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { signOutSuccess } from '../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';

const DashSidebar = () => {
  
    const [tab, setTab] = useState('')

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()
    const {currentUser} = useSelector(state => state.user)
    console.log(currentUser.isAdmin)
    useEffect(()=>{
        const urlParams = new URLSearchParams(location.search)
        const tabFromUrl = urlParams.get('tab')

        if(tabFromUrl){
        setTab(tabFromUrl)
        }
    }, [location.search])

    const handleSignOut = async()=>{
      try {
          const responseData = await fetch(`/api/user/signout`,{
              method: 'POST'
          })
          const responseAPI = await responseData.json()
          if(!responseAPI){
              console.log(responseAPI.message)
          } else{
              navigate('/sign-in')
              dispatch(signOutSuccess())
             
          }
      } catch (error) {
          console.log(error.message)
      }
  }

  return (
    <Sidebar aria-label="Sidebar with content separator example" className='w-full md:w-56'>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
            <Link to={'/dashboard?tab=profile'}>
                <Sidebar.Item active={tab === 'profile'} icon={HiUser} label={currentUser?.isAdmin === true ? "Admin":"User"} labelColor='dark' as='div'>
                Profile
                </Sidebar.Item>
            </Link>
            <Sidebar.Item icon={HiArrowSmRight} onClick={handleSignOut} >
                Sign out
            </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  )
}

export default DashSidebar