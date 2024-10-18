import { Modal, Table, Button } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { MdDelete, MdEditSquare } from 'react-icons/md';
import { FaUser } from "react-icons/fa";
import { signOutSuccess } from "../redux/user/userSlice";
import { GrUserAdmin } from "react-icons/gr";
import { RiUserFill } from "react-icons/ri";

const DashUsers = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState('');
  const [deleteMessage, setDeleteMessage] = useState(null)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  console.log("users: ", users)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await fetch(`/api/user/view`);
        const responseAPI = await responseData.json();
        console.log("total users", responseAPI.data.totalUsers)
        setUsers(responseAPI.data.users);
        if(responseAPI.data.totalUsers > 9){
          setShowMore(true)
        } else{
          setShowMore(false)
        }
        
      } catch (error) {
        console.log(error.message || error);
      }
    };
    
    if (currentUser?.isAdmin) {
      fetchUsers();
    }
  }, [currentUser?._id]);

  const handleShowMore = async () => {
    const startIndex = users.length;
    try {
      const responseData = await fetch(
        `/api/user/view?startIndex=${startIndex}`
      );
      const responseAPI = await responseData.json();
      
      if (responseAPI.success) {
        setUsers((prev) => [...prev, ...responseAPI.data.users]);
        if (responseAPI.data.users.length <= 9) {
          setShowMore(false); 
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeleteUser = async () => {
    console.log("currentUser to be deleted: ", userIdToDelete)

    try {
      const responseData = await fetch(
        `/api/user/delete/${userIdToDelete}`,
        {
          method: 'DELETE',
        }
      );
      const responseAPI = await responseData.json();
      if (responseAPI.success) {
     
        setShowModal(false);
        setUsers((prev) =>
          prev.filter((user) => user._id !== userIdToDelete)
        );
        navigate('/sign-in')
        dispatch(signOutSuccess())
      } else {
        setShowModal(true);
        setDeleteMessage(responseAPI.message)
        console.log(responseAPI.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
      {currentUser?.isAdmin? (
        <>
          <Table hoverable className='shadow-md lg:table-fixed'>
            <Table.Head className='text-center'>
              <Table.HeadCell>Date updated</Table.HeadCell>
              <Table.HeadCell>Photo</Table.HeadCell>
              <Table.HeadCell>Username</Table.HeadCell>
              <Table.HeadCell>Email</Table.HeadCell>
              <Table.HeadCell>Role</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
              <Table.HeadCell>Edit</Table.HeadCell>
            </Table.Head>
            <Table.Body className='divide-y'>
              {users.map((user) => (
                <Table.Row key={user._id} className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                  <Table.Cell className='text-center'>
                    {new Date(user.updatedAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell className='text-center'>
                      {
                        user.profilePicture? <img
                        src={user.profilePicture}
                        alt={user.username}
                        className='w-[3rem] h-[3rem] object-cover bg-gray-500 rounded-full mx-auto'
                      /> : <FaUser
                      className='w-[3rem] h-[3rem] object-cover rounded-full mx-auto border border-gray-200/65' />
                      }
                  </Table.Cell>
                  <Table.Cell className='text-center'>
                      {user.username}
                  </Table.Cell>
                  <Table.Cell className='text-center'>
                      {user.email}
                  </Table.Cell>
                  <Table.Cell >
                    <div className='flex justify-center items-center  text-gray-900 dark:text-gray-100 gap-1'>
                    {user.isAdmin ? (
                      <>
                        Admin <GrUserAdmin />
                      </>
                    ) : (
                      <>
                        User <RiUserFill />
                      </>
                    )}
                    </div>
                  </Table.Cell>
                  <Table.Cell className=''>
                    <span 
                      onClick={() => {
                        setDeleteMessage(null)
                        setShowModal(true);
                        setUserIdToDelete(user._id);
                      }}
                      className='font-medium text-red-400 hover:text-red-500 cursor-pointer flex justify-center items-center gap-1'
                    >
                      Delete
                      <MdDelete className='w-5 h-5'/>
                    </span>
                  </Table.Cell>
                  <Table.Cell>
                    <Link
                      className='text-teal-500 hover:underline flex justify-center items-center gap-1'
                      to={`/user-update/${user._id}`}
                    >
                      <span>Edit</span>
                      <MdEditSquare className='w-5 h-5'/>
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
        <p>You have no users yet!</p>
      )}

      {/* Modal for delete confirmation */}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size='md'
      >
        <Modal.Header />
        <Modal.Body>
          <div className='text-center'>
            <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
            <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
              {deleteMessage? deleteMessage : `Are you sure you want to delete this user?`} 
            </h3>
            <div className='flex justify-center gap-4'>

              {!deleteMessage && 
              <Button color='failure' onClick={handleDeleteUser}>
              Yes, Im sure
              </Button> 
              }

              <Button color='gray' onClick={() => setShowModal(false)}>
              {deleteMessage? `Cancel` : `No, cancel`} 
              </Button>

            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default DashUsers;
