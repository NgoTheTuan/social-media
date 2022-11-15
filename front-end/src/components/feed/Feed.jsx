import './feed.css';
import Post from '../post/Post';
import Share from '../share/Share';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { allsPost, userPost } from '../../utils/apiRequest';
import { useParams } from 'react-router-dom';

function Feed({ userId }) {
    const [post, setPost] = useState([]);
    const currentUserId = useSelector((state) => state.auth.login.currentUser._id);
    const dispatch = useDispatch();

    const [loadFeed, setLoadFeed] = useState(false);
    const [showCreatePost, setShowCreatePost] = useState(true);
    const params = useParams();
    useEffect(() => {
        if (!(params.userId === undefined || params.userId === null || params.userId === '')) {
            if (params.userId !== currentUserId) {
                setShowCreatePost(false);
            }
        }

        const getProductId = async () => {
            const getAllPost = userId ? await userPost(userId, dispatch) : await allsPost(currentUserId, dispatch);
            const getAllPostSort = getAllPost.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setPost(getAllPostSort);
        };
        getProductId();
    }, [userId, loadFeed]);

    const handleLoadFeed = () => {
        setLoadFeed(!loadFeed);
    };

    return (
        <div className="feed">
            <div className="feedWrapper">
                {showCreatePost ? <Share loadFeed={handleLoadFeed} /> : ''}

                {post.length > 0 ? post.map((p) => <Post key={p._id} loadFeed={handleLoadFeed} post={p} />) : ''}
            </div>
        </div>
    );
}
export default Feed;
