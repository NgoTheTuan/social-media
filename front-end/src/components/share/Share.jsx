import './share.css';
import { PermMedia, Label, Room, EmojiEmotions } from '@mui/icons-material';
import cloudinaryUpload from '../../utils/uploadFile';
import { useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { userSelector } from '../../redux/selector';
import { createPost } from '../../utils/apiRequest';
import { Link } from 'react-router-dom';

function Share({ loadFeed }) {
    const [textPost, setTextPost] = useState('');
    const userCurrent = useSelector(userSelector);
    const [file, setFile] = useState(new File([''], 'filename'));
    const showImg = useRef();
    const divImg = useRef();
    const reader = new FileReader();
    const dispatch = useDispatch();

    const handleFileUpload = (e) => {
        setFile(e.target.files);
        const files = e.target.files;
        const file = files[0];
        reader.readAsDataURL(file);

        reader.addEventListener('load', (event) => {
            const urlImg = event.target.result;
            showImg.current.src = urlImg;
        });

        divImg.current.style.display = 'block';
    };

    const handleTextPost = (e) => {
        setTextPost(e.target.value);
    };

    const submitPost = async () => {
        let imgUrl;
        if (file.length > 0) {
            const uploadData = new FormData();
            uploadData.append('file', file[0], 'file');
            imgUrl = await cloudinaryUpload(uploadData);
        }

        const newPost = {
            userId: userCurrent._id,
            desc: textPost,
            img: imgUrl?.secure_url ? imgUrl?.secure_url : '',
            likes: [],
        };

        console.log(newPost);

        createPost(newPost, dispatch);
        divImg.current.style.display = 'none';
        setTextPost('');

        loadFeed();
    };

    return (
        <div className="share">
            <div className="shareWrapper">
                <div className="shareTop">
                    <Link to={`/profile/${userCurrent?._id}`}>
                        <img className="shareProfileImg" src={userCurrent?.profilePicture} alt="" />
                    </Link>

                    <input
                        type="text"
                        placeholder="What's in your mind Safak?"
                        className="shareInput"
                        value={textPost}
                        onChange={(e) => handleTextPost(e)}
                    />
                </div>

                <hr className="shareHr" />
                <div className="show-img" ref={divImg}>
                    <img src="/assets/person/1.jpeg" ref={showImg} alt="" />
                </div>
                <div className="shareBottom">
                    <div className="shareOptions">
                        <div className="shareOption">
                            <label htmlFor="upload-photo" className="upload-img">
                                <PermMedia htmlColor="tomato" className="shareIcon" /> Photo or Video
                            </label>
                            <input
                                type="file"
                                onChange={(e) => handleFileUpload(e)}
                                accept=".jpg, .png"
                                name="photo"
                                id="upload-photo"
                            />
                        </div>
                        <div className="shareOption">
                            <Label htmlColor="blue" className="shareIcon" />
                            <span className="shareOptionText">Tag</span>
                        </div>
                        <div className="shareOption">
                            <Room htmlColor="green" className="shareIcon" />
                            <span className="shareOptionText">Location</span>
                        </div>
                        <div className="shareOption">
                            <EmojiEmotions htmlColor="goldenrod" className="shareIcon" />
                            <span className="shareOptionText">Feelings</span>
                        </div>
                    </div>
                    <button className="shareButton" onClick={submitPost}>
                        Share
                    </button>
                </div>
            </div>
        </div>
    );
}
export default Share;
