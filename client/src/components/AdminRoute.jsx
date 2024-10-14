import { useSelector } from "react-redux"
import { Outlet, Navigate } from "react-router-dom"

const AdminRoute = () => {

    const {currentUser} = useSelector((state) => state.user)
    console.log(currentUser)
      console.log(currentUser.isAdmin)
  return (
      
     currentUser?.isAdmin? <Outlet/> : <Navigate to={'/sign-in'}/>
  )
}

export default AdminRoute