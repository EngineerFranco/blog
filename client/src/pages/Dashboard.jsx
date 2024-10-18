import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import DashSidebar from '../components/DashSideBar'
import DashProfile from '../components/DashProfile'
import DashPost from '../components/DashPost'
import DashUsers from '../components/DashUsers'

const Dashboard = () => {

  const location = useLocation()
  const [tab, setTab] = useState('')

  useEffect(()=>{
    const urlParams = new URLSearchParams(location.search)
    const tabFromUrl = urlParams.get('tab')

    if(tabFromUrl){
      setTab(tabFromUrl)
    }
  }, [location.search])

  return (
    <div className='min-h-[100dvh] flex sm:flex-row flex-col'>
      <div className='md:w-56'>
        <DashSidebar/>
      </div>
        {tab === 'profile' && <DashProfile/>}
        {tab === 'posts' && <DashPost/>}
        {tab === 'users' && <DashUsers/>}
    </div>
  )
}

export default Dashboard