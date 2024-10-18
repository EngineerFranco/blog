import { useEffect, useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const Comment = ({ comment }) => {
    const [user, setUser] = useState({});

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

    return (
        <div className="p-5 flex border-b dark:border-gray-600 text-sm bg-teal-100 rounded-md mb-2 dark:bg-gray-800">
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
                    <span className="text-gray-500 text-xs ">
                        {dayjs(comment.createdAt).fromNow()}
                    </span>
                </div>
                <p className=" dark:text-gray-300 text-sm" >{comment.content}</p>
            </div>
            
        </div>
    );
};

export default Comment;
