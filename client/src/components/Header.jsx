
import { Avatar, Button, Dropdown, Navbar, TextInput } from "flowbite-react";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { CiSearch } from "react-icons/ci";
import { CiDark, CiLight } from "react-icons/ci";
import { useSelector, useDispatch  } from "react-redux"
import { toggleTheme } from "../redux/theme/themeSlice";
import { signOutSuccess } from "../redux/user/userSlice";
import { useEffect, useState } from "react";

const Header = () => {
  const path = useLocation().pathname
  const {currentUser} = useSelector(state => state.user)
  const {theme} = useSelector(state=> state.theme)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);


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

const handeSubmit = (e)=>{
  e.preventDefault()
  const urlParams = new URLSearchParams(location.search)
  urlParams.set('searchTerm', searchTerm)
  const searchQuery = urlParams.toString()
  navigate(`search?/${searchQuery}`)
}

  return (
    <header>
      <Navbar className='border-b-2' fluid rounded>
        <Link to={"/"} className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white '>
          <span className="px-2 py-1 bg-gradient-to-r from-gray-900 via-blue-950 to-gray-600 rounded-md shadow-xl text-gray-50 ">DevFranco</span>
          Blog
        </Link>
        <form onSubmit={handeSubmit}>
          <TextInput
            type="text"
            placeholder="Search..."
            rightIcon={CiSearch}
            className="hidden lg:inline"
            value={searchTerm}
            onChange={(e)=>setSearchTerm(e.target.value)}
          />
        </form>
        <Button className="w-12 h-10 rounded-full lg:hidden" color="gray">
          <CiSearch className="mx-auto my-auto"/>
        </Button>
        <div className="flex gap-2 md:order-2">
          <Button className="w-12 h-10 rounded-full hidden sm:inline " color="gray" onClick={()=>{dispatch(toggleTheme())}}>
            {
              theme === 'light' ? <CiLight/> : <CiDark />
            }
          </Button>
          {
            currentUser?
            (<Dropdown
              arrowIcon={false}
              inline
              label={
                <Avatar
                alt="user"
                img={currentUser.profilePicture}
                rounded/>
              }
            >
              <Dropdown.Header>
                <span className="block text-sm">@{currentUser.username}</span>
                <span className="block truncate text-sm font-medium">{currentUser.email}</span>
              </Dropdown.Header>
              <Link to={'/dashboard?tab=profile'}>
                <Dropdown.Item>Profile</Dropdown.Item>
              </Link>
              <Dropdown.Item>Settings</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={handleSignOut}>Sign out</Dropdown.Item>
            </Dropdown>
            )
            :
            (<Link to="/sign-in">
              <Button color="dark" className="" outline >
                Sign In
              </Button>
            </Link>)
          }
         
          
          <Navbar.Toggle/>
        </div>
        <Navbar.Collapse>
              <Navbar.Link active={path === "/"} as={'div'}>
                <Link to="/">Home</Link>
              </Navbar.Link>
              <Navbar.Link active={path === "/about"} as={'div'}>
                <Link to="/about">About</Link>
              </Navbar.Link>
              <Navbar.Link active={path === "/projects"} as={'div'}>
                <Link to="/projects">Project</Link>
              </Navbar.Link>           
        </Navbar.Collapse>
      </Navbar>
     
    </header>
   
  )
}

export default Header