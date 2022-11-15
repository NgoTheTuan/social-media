import { useState, useEffect } from 'react';
import './post.css';
import { MoreVert, ThumbUpOffAlt, ThumbUp, Send } from '@mui/icons-material';
import { Link, useParams } from 'react-router-dom';
import { format } from 'timeago.js';
import { getUser, deletePost } from '../../utils/apiRequest';

import { likeOrDislikePost, createComment, getAllComment } from '../../utils/apiRequest';
import { useDispatch, useSelector } from 'react-redux';

import Comment from '../comment/Comment';

function Post({ post, loadFeed }) {
    const [like, setLike] = useState(post.likes.length);
    const [isLiked, setIsLiked] = useState(false);
    const [user, setUser] = useState({});

    const userId = useSelector((state) => state.auth.login.currentUser._id);
    const userProfilePicture = useSelector((state) => state.auth.login.currentUser.profilePicture);
    const dispatch = useDispatch();

    const [comment, setComment] = useState('');
    const [allComment, setAllComment] = useState([]);
    const [createCommentNow, setCreateCommentNow] = useState(false);

    const [showDeletePost, setShowDeletePost] = useState(false);
    const params = useParams();
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    useEffect(() => {
        if (post.likes.length > 0) {
            post.likes.forEach((like) => {
                if (like === userId) {
                    setIsLiked(true);
                }
            });
        }

        if (params.userId === userId) {
            setShowDeletePost(true);
        }
    }, []);

    const likeHandler = () => {
        setLike(isLiked ? like - 1 : like + 1);
        setIsLiked(!isLiked);

        likeOrDislikePost(post?._id, userId, dispatch);
    };

    useEffect(() => {
        const getUserPost = async () => {
            const getUserById = await getUser(post?.userId);
            setUser(getUserById?.user);
        };
        getUserPost();
    }, [post?.userId]);

    useEffect(() => {
        const getAllComments = async () => {
            const allComments = await getAllComment(post?._id, dispatch);

            const getAllCommentSort = allComments.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

            setAllComment(getAllCommentSort);
        };
        getAllComments();
    }, [createCommentNow]);

    const submitComment = async () => {
        const newComment = {
            postId: post?._id,
            userId: userId,
            comment: comment,
            likes: [],
        };

        await createComment(newComment, dispatch);
        setComment('');
        setCreateCommentNow(!createCommentNow);
    };

    const deletePostUser = async () => {
        await deletePost(post?._id, userId);
        loadFeed();
    };

    return (
        <div className="post">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <Link to={`/profile/${user?._id}`} className="postProfileLink">
                            <img
                                className="postProfileImg"
                                src={user.profilePicture ? user.profilePicture : PF + 'person/noAvatar.png'}
                                alt=""
                            />
                            <span className="postUsername">{user.username}</span>
                        </Link>

                        <span className="postDate">{format(post.createdAt)}</span>
                    </div>

                    {showDeletePost ? (
                        <div className="postTopRight" onClick={deletePostUser}>
                            <MoreVert />
                        </div>
                    ) : (
                        ''
                    )}
                </div>
                <div className="postCenter">
                    <span className="postText">{post?.desc}</span>
                    {post?.img ? <img className="postImg" src={post?.img} alt="" /> : ''}
                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        <div className="likeBox" onClick={likeHandler}>
                            {isLiked ? (
                                <>
                                    <ThumbUp className="likeIcon likeIconSuccess" />
                                    <span className="likeText likeIconSuccess">Thích</span>
                                </>
                            ) : (
                                <>
                                    <ThumbUpOffAlt className="likeIcon " />
                                    <span className="likeText">Thích</span>
                                </>
                            )}
                        </div>

                        <span className="postLikeCounter">{like > 0 ? `${like} people like it` : ''} </span>
                    </div>
                    <div className="postBottomRight">
                        <span className="postCommentText">
                            {allComment.length > 0 ? `${allComment.length} comment` : ''}
                        </span>
                    </div>
                </div>

                <div className="postCommnet">
                    <div className="postCommnetWrite">
                        <div className="postCommnet-img">
                            <Link to={`/profile/${user?._id}`}>
                                <img
                                    className="postProfileImg"
                                    src={userProfilePicture ? userProfilePicture : PF + 'person/noAvatar.png'}
                                    alt=""
                                />
                            </Link>
                        </div>

                        <div className="postCommnet-input-wrapper">
                            <div className="postCommnet-input">
                                <input
                                    type="text"
                                    placeholder="Viết bình luận..."
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                />
                            </div>
                            <div className="button-send" onClick={submitComment}>
                                <Send />
                            </div>
                        </div>
                    </div>

                    <div className="postAllComment">
                        {allComment.length > 0
                            ? allComment.map((comment) => <Comment key={comment?._id} comment={comment} />)
                            : ''}
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Post;
