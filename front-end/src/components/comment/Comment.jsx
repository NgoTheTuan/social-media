import './comment.css';
import { useEffect, useState } from 'react';
import { getUser } from '../../utils/apiRequest';
import { format } from 'timeago.js';
import { Link } from 'react-router-dom';

function Comment({ comment }) {
    const [user, setUser] = useState({});
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    useEffect(() => {
        const getUserComment = async () => {
            const user = await getUser(comment?.userId);
            setUser(user.user);
        };
        getUserComment();
    }, [comment?._id]);

    return (
        <div className="comment">
            <div className="comment-user">
                <Link to={`/profile/${user?._id}`}>
                    <img src={user?.profilePicture ? user?.profilePicture : ` ${PF}person/noAvatar.png`} alt="" />
                </Link>
            </div>

            <div className="comment-box">
                <div className="comment-box-user">{user.username} </div>
                <div className="comment-box-desc">{comment.comment} </div>
                <div className="comment-box-time">{format(comment.createdAt)}</div>
            </div>
        </div>
    );
}
export default Comment;
