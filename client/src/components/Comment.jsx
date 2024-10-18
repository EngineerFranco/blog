import { useEffect, useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { AiFillLike } from "react-icons/ai";
import { useSelector } from 'react-redux';
import { Textarea } from 'flowbite-react';
import { FaRegEdit } from "react-icons/fa";
import { BsFillSaveFill } from "react-icons/bs";
import { AiFillDelete } from "react-icons/ai";

dayjs.extend(relativeTime);

const Comment = ({ comment, onLike, onEdit, onDelete }) => {
  const [user, setUser] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);
  const { currentUser } = useSelector((state) => state.user);

  const fetchUser = async () => {
    try {
      const responseData = await fetch(`/api/user/${comment.userId}`);
      const responseAPI = await responseData.json();
      setUser(responseAPI.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [comment]);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedContent(comment.content);
  };

  const handleSave = async () => {
    try {
      const res = await fetch(`/api/comment/editComment/${comment._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: editedContent,
        }),
      });
      if (res.ok) {
        setIsEditing(false);
        onEdit(comment, editedContent);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="p-5 flex border-b dark:border-gray-600 text-sm bg-gray-100 rounded-md mb-2 dark:bg-gray-800">
      <div className="flex-shrink-0 mr-3">
        <img
          className="w-[2rem] h-[2rem] rounded-full bg-gray-200"
          src={user.profilePicture}
          alt={user.username}
        />
      </div>
      <div className="flex-1">
        <div className="flex items-center mb-2">
          <span className="font-bold mr-1 text-xs truncate">
            {user.username ? `@${user.username}` : `anonymous user`}
          </span>
          <span className="text-gray-500 text-xs">
            {dayjs(comment.createdAt).fromNow()}
          </span>
        </div>
        {isEditing ? (
          <Textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            className="dark:text-gray-300 text-sm"
          />
        ) : (
          <p className="dark:text-gray-300 text-sm">{comment.content}</p>
        )}
        <div className="mt-5 flex justify-start items-center">
          <button
            className={`text-gray-400 hover:text-teal-500 hover:scale-110 transition ${
              currentUser &&
              comment.likes.includes(currentUser._id) &&
              '!text-teal-500'
            }`}
            onClick={() => onLike(comment._id)}
          >
            <AiFillLike />
          </button>
          <p className="text-gray-400 ">
            {comment.numberOfLikes > 0 &&
              comment.numberOfLikes +
                ' ' +
                (comment.numberOfLikes === 1 ? 'like' : 'likes')}
          </p>
          {currentUser &&
            (currentUser._id === comment.userId || currentUser.isAdmin) && (
              <div className="flex gap-5 ml-auto">
                <button
                  type="button"
                  onClick={handleEdit}
                  className="text-gray-400 hover:text-teal-500 flex justify-center items-center gap-1"
                >
                  <p>Edit</p> <FaRegEdit/>
                </button>
                {isEditing && (
                  <button
                    type="button"
                    onClick={handleSave}
                    className="text-gray-400 hover:text-green-500 flex justify-center items-center gap-1 "
                  >
                    <p>Save</p> <BsFillSaveFill/>
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => onDelete(comment._id)}
                  className="text-gray-400 hover:text-red-500 flex justify-center items-center gap-1"
                >
                  <p>Delete</p> <AiFillDelete/>
                </button>
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default Comment;
