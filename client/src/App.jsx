import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/about';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import Header from './components/Header';
import SignUp from './pages/SignUp';
import Signin from './pages/Signin';
import FooterComponent from './components/Footer';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import CreatePost from './pages/CreatePost';
import UpdatePost from './pages/UpdatePost';
import PostPage from './pages/PostPage';
import ScrollToTop from './components/ScrollToTop';

const App = () => {
  return (
    <BrowserRouter>
    <ScrollToTop/>
      <Header />
      <Routes>
        {/* Public routes */}
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/sign-in' element={<Signin />} />
        
        
        {/* Private routes */}
        <Route element={<PrivateRoute />}>
          <Route path='/dashboard' element={<Dashboard />} />
        </Route>

        {/* Admin routes */}
        <Route element={<AdminRoute />}>
          <Route path='/post-create' element={<CreatePost />} />
          <Route path='/post-update/:postId' element={<UpdatePost />} />
        </Route>

        <Route path='/projects' element={<Projects />}/>
        <Route path='/post/:postSlug' element={<PostPage />}/>

      </Routes>
      <FooterComponent />
    </BrowserRouter>
  );
};

export default App;
