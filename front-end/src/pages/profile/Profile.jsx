import './profile.css';
import Topbar from '../../components/topbar/Topbar';
import { useEffect, useState } from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import Feed from '../../components/feed/Feed';
import RightBar from '../../components/rightbar/Rightbar';
import { useParams } from 'react-router-dom';

import { getUser } from '../../utils/apiRequest';

function Profile() {
    const params = useParams();

    const [user, setUser] = useState({});

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    useEffect(() => {
        const getUserComment = async () => {
            const user = await getUser(params.userId);
            setUser(user.user);
        };
        getUserComment();
    }, [params.userId]);

    useEffect(() => {
        document.documentElement.scrollTop = document.body.scrollTop = 0;
    }, []);

    return (
        <>
            <Topbar />
            <div className="profile">
                <Sidebar />
                <div className="profileRight">
                    <div className="profileTop">
                        <div className="profileCover">
                            <img
                                className="profileCoverImg"
                                src={user?.coverPicture ? user?.coverPicture : `${PF}person/no.jpg`}
                                alt=""
                            />
                            <img
                                className="profileUserImg"
                                src={user?.profilePicture ? user?.profilePicture : `${PF}person/noAvatar.png`}
                                alt=""
                            />
                        </div>
                        <div className="profileInfo">
                            <h4 className="profileInfoName">{user.username}</h4>
                            <span className="profileInfoDesc">{user.desc}</span>
                        </div>
                    </div>
                    <div className="profileRightBottom">
                        <Feed userId={params.userId} />
                        <RightBar profile={user} />
                    </div>
                </div>
            </div>
        </>
    );
}
export default Profile;
