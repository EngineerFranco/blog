import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import DashSidebar from '../components/DashSidebar'
import DashProfile from '../components/DashProfile'
import DashPost from '../components/DashPost'
import DashUsers from '../components/DashUsers'
import DashComment from '../components/DashComment'
import DashboardComponent from '../components/DashboardComponent'


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
    <div className="min-h-[100dvh] flex sm:flex-row flex-col relative">
        <div className="md:w-56 z-10">
            <DashSidebar />
        </div>
        <div className="z-10 w-full">
            {tab === 'profile' && <DashProfile />}
            {tab === 'posts' && <DashPost />}
            {tab === 'users' && <DashUsers />}
            {tab === 'comments' && <DashComment />}
            {tab === 'dash' && <DashboardComponent />}
        </div>
    </div>
  );

}

export default Dashboard