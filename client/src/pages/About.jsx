import React from 'react';

const About = () => {
  return (
    <div className='flex flex-col'>
      <div
        className='min-h-screen flex justify-start items-center flex-col gap-4 p-6 relative'
        style={{
          backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/blog-2bc26.appspot.com/o/undraw_blogging_re_kl0d.svg?alt=media&token=8a7e3766-8638-46d0-865c-81e55d95df94)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black opacity-40"></div>

        <div className="relative z-10 max-w-2xl w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg sm:mt-24 mt-10 p-10">
          <h1 className='text-3xl font-bold text-gray-800 dark:text-white text-center mb-4  sm:text-5xl'>
            About DevFranco Blog
          </h1>
          <div className='text-md text-gray-700 dark:text-gray-300 space-y-4'>
            <p>
              Welcome to <span className="font-semibold text-teal-500 dark:text-teal-400">DevFranco Blog</span>! This blog was created by Franco, a passionate developer, to share his knowledge, ideas, and experiences in the world of software development.
            </p>

            <p>
              On DevFranco Blog, you’ll find a variety of weekly articles and tutorials covering topics like web development, software engineering, JavaScript frameworks, and more. Franco loves to explore cutting-edge technologies and share insights with fellow developers.
            </p>

            <p>
              We encourage readers to engage with the content by leaving comments, sharing their thoughts, and discussing ideas. At DevFranco Blog, we believe in fostering a supportive learning community where everyone can grow together and stay updated with the latest in tech.
            </p>
          </div>
          <div className="flex justify-center mt-4">
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

export default About;
