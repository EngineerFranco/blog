import { Modal, Table, Button } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { MdDelete, MdEditSquare } from 'react-icons/md';

const DashPost = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [userPosts, setUserPosts] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const responseData = await fetch(`/api/post/view?userId=${currentUser._id}`);
        const responseAPI = await responseData.json();
        setUserPosts(responseAPI.data.posts);

        if (responseAPI.data.totalPosts > 9) {
          setShowMore(true);
        } else {
          setShowMore(false);
        }
      } catch (error) {
        console.log(error.message || error);
      }
    };

    if (currentUser?.isAdmin) {
      fetchPosts();
    }
  }, [currentUser?._id]);

  const handleShowMore = async () => {
    const startIndex = userPosts.length;
    try {
      const responseData = await fetch(`/api/post/view?userId=${currentUser._id}&startIndex=${startIndex}`);
      const responseAPI = await responseData.json();
      if (responseAPI.success) {
        setUserPosts((prev) => [...prev, ...responseAPI.data.posts]);
        if (responseAPI.data.posts.length <= 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeletePost = async () => {
    setShowModal(false);
    try {
      const responseData = await fetch(`/api/post/delete/${postIdToDelete}/${currentUser._id}`, {
        method: 'DELETE',
      });
      const responseAPI = await responseData.json();
      if (responseAPI.success) {
        setUserPosts((prev) => prev.filter((post) => post._id !== postIdToDelete));
      } else {
        console.log(responseAPI.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
      {currentUser?.isAdmin && userPosts.length > 0 ? (
        <>
          <Table hoverable className='shadow-md md:table-fixed'>
            <Table.Head className='text-center'>
              <Table.HeadCell>Date updated</Table.HeadCell>
              <Table.HeadCell>Post image</Table.HeadCell>
              <Table.HeadCell>Post title</Table.HeadCell>
              <Table.HeadCell>Category</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
              <Table.HeadCell>Edit</Table.HeadCell>
            </Table.Head>
            <Table.Body className='divide-y'>
              {userPosts.map((post) => (
                <Table.Row key={post._id} className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                  <Table.Cell className='text-center'>{new Date(post.updatedAt).toLocaleDateString()}</Table.Cell>
                  <Table.Cell className='text-center'>
                    <Link to={`/post/${post.slug}`}>
                      <img src={post.image} alt={post.title} className='w-20 h-10 rounded-sm object-cover bg-gray-500 mx-auto' />
                    </Link>
                  </Table.Cell>
                  <Table.Cell className='text-center'>
                    <Link className='font-medium text-gray-900 dark:text-white md:text-wrap text-nowrap' to={`/post/${post.slug}`}>
                      {post.title}
                    </Link>
                  </Table.Cell>
                  <Table.Cell className='text-center'>{post.category}</Table.Cell>
                  <Table.Cell className='text-center'>
                    <span
                      onClick={() => {
                        setShowModal(true);
                        setPostIdToDelete(post._id);
                      }}
                      className='font-medium text-red-400 hover:text-red-500 cursor-pointer flex justify-center gap-1 items-center hover:underline'
                    >
                      Delete
                      <MdDelete className='w-5 h-5' />
                    </span>
                  </Table.Cell>
                  <Table.Cell className='text-center'>
                    <Link className='text-teal-500 hover:text-teal-600 hover:underline flex justify-center gap-1 items-center' to={`/post-update/${post._id}`}>
                      <span>Edit</span>
                      <MdEditSquare className='w-5 h-5' />
                    </Link>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
          {showMore && (
            <button onClick={handleShowMore} className='w-full text-teal-500 self-center text-sm py-7'>
              {showMore ? 'Show more' : 'Show less'}
            </button>
          )}
        </>
      ) : (
        <p>You have no posts yet!</p>
      )}

      {/* Modal for delete confirmation */}
      <Modal show={showModal} onClose={() => setShowModal(false)} popup size='md'>
        <Modal.Header />
        <Modal.Body>
          <div className='text-center'>
            <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
            <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>Are you sure you want to delete this post?</h3>
            <div className='flex justify-center gap-4'>
              <Button color='failure' onClick={handleDeletePost}>
                Yes, I`m sure
              </Button>
              <Button color='gray' onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default DashPost;
