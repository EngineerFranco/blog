const Projects = () => {
  return (
    <div className='flex flex-col '>
      <div
        className='min-h-screen flex justify-start items-center flex-col gap-4 p-6 relative'
        style={{
          backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/blog-2bc26.appspot.com/o/undraw_blogging_re_kl0d.svg?alt=media&token=8a7e3766-8638-46d0-865c-81e55d95df94)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
     
        <div className="absolute inset-0 bg-black opacity-40"></div>
        

        <div className="relative z-10 max-w-2xl w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg sm:mt-24 mt-10 p-20">
          <h1 className='text-5xl font-bold text-gray-800 dark:text-white text-center -mt-5'>
            Projects
          </h1>
          <p className='text-lg text-gray-600 dark:text-gray-300 text-center max-w-lg mt-10'>
            Build fun and engaging projects while learning backend and frontend technologies! Explore a variety of creative ideas and enhance your skills.
          </p>
          <div className="flex justify-center mt-14">
            <a
              href="https://dev-franco.vercel.app/"
              className="px-4 py-2 text-white bg-teal-600 hover:bg-teal-700 rounded-md transition duration-300"
              target="_blank" 
              rel="noopener noreferrer" 
            >
              Contact me here
            </a>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Projects;
