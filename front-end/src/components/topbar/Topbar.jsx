import './topbar.css';
import { Search, Person, Chat, Notifications } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { logoutUser } from '../../utils/apiRequest';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';

function Topbar() {
    const user = useSelector((state) => state.auth.login.currentUser);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logOut = () => {
        console.log('logout');
        logoutUser(dispatch, navigate);
    };

    return (
        <div className="topbarContainer">
            <div className="topbarLeft">
                <Link to="/">
                    <span className="logo">Social Network</span>
                </Link>
            </div>
            <div className="topbarCenter">
                <div className="searchbar">
                    <Search />
                    <input type="text" placeholder="Search for friend, post or video" className="searchinput" />
                </div>
            </div>
            <div className="topbarRight">
                <div className="topbarLinks">
                    <span className="topbarLink">Homepage</span>
                    <span className="topbarLink">Timeline</span>
                </div>

                <div className="topbarUser">
                    <div className="topbarIcons">
                        <div className="topbarIconItem">
                            <Person />
                            <span className="topbarIconBadge">1</span>
                        </div>
                        <div className="topbarIconItem">
                            <Chat />
                            <span className="topbarIconBadge">2</span>
                        </div>
                        <div className="topbarIconItem">
                            <Notifications />
                            <span className="topbarIconBadge">1</span>
                        </div>
                    </div>
                    <div className="topbar-user">
                        <img
                            src={user?.profilePicture ? user?.profilePicture : PF + '/person/noAvatar.png'}
                            alt=""
                            className="topbarImg"
                        />

                        <div className="userHandle">
                            <div className="user-info">
                                <Link to={`/profile/${user?._id}`} className="user-info-link">
                                    <img
                                        src={user?.profilePicture ? user?.profilePicture : PF + '/person/noAvatar.png'}
                                        alt=""
                                        className="topbarImg"
                                    />
                                    <span className="user-info-name">{user?.username ? user?.username : ''}</span>
                                </Link>
                            </div>

                            <div className="user-logout" onClick={logOut}>
                                <div className="user-logout-icon">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20px"
                                        height="20px"
                                        viewBox="0 0 512 512"
                                    >
                                        <path d="M160 96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96C43 32 0 75 0 128V384c0 53 43 96 96 96h64c17.7 0 32-14.3 32-32s-14.3-32-32-32H96c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32h64zM504.5 273.4c4.8-4.5 7.5-10.8 7.5-17.4s-2.7-12.9-7.5-17.4l-144-136c-7-6.6-17.2-8.4-26-4.6s-14.5 12.5-14.5 22v72H192c-17.7 0-32 14.3-32 32l0 64c0 17.7 14.3 32 32 32H320v72c0 9.6 5.7 18.2 14.5 22s19 2 26-4.6l144-136z" />
                                    </svg>
                                </div>
                                <div className="">Log Out</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Topbar;
