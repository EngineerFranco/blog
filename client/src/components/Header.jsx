
import { Button, Navbar, TextInput } from "flowbite-react";
import { Link, useLocation } from 'react-router-dom';
import { CiSearch } from "react-icons/ci";
import { CiDark } from "react-icons/ci";

const Header = () => {
  const path = useLocation().pathname
  return (
    <header>
      <Navbar className='border-b-2' fluid rounded>
        <Link to={"/"} className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white '>
          <span className="px-2 py-1 bg-gradient-to-r from-gray-950 via-gray-700 to-gray-400 rounded-lg text-white ">DevFranco</span>
          Blog
        </Link>
        <form>
          <TextInput
            type="text"
            placeholder="Search..."
            rightIcon={CiSearch}
            className="hidden lg:inline"
          />
        </form>
        <Button className="w-12 h-10 rounded-full lg:hidden" color="gray">
          <CiSearch className="mx-auto my-auto"/>
        </Button>
        <div className="flex gap-2 md:order-2">
          <Button className="w-12 h-10 rounded-full hidden sm:inline " color="gray">
            <CiDark className=""/>
          </Button>
          <Link to="/signIn"> 
          <Button color="dark" className="" outline >
            Sign In
          </Button>
          </Link>
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