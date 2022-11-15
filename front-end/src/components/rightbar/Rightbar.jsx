import './rightbar.css';
import { Users } from '../../dummyData';
import Online from '../online/Online';
import { getFriendUser } from '../../utils/apiRequest';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function RightBar({ profile }) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const params = useParams();

    const HomeRightbar = () => {
        return (
            <>
                <div className="birthdayContainer">
                    <img className="birthdayImg" src={PF + 'gift.png'} alt="" />
                    <span className="birthdayText">
                        <b>Pola Foster</b> and <b>3 other friends</b> have a birhday today.
                    </span>
                </div>
                <img className="rightbarAd" src={PF + 'ad.png'} alt="" />
                <h4 className="rightbarTitle">Online Friends</h4>
                <ul className="rightbarFriendList">
                    {Users.map((u) => (
                        <Online key={u.id} user={u} />
                    ))}
                </ul>
            </>
        );
    };

    const ProfileRightbar = () => {
        const [friendUser, setFriendUser] = useState([]);

        useEffect(() => {
            const userFriend = async () => {
                try {
                    const friend = await getFriendUser(params.userId);
                    setFriendUser(friend);
                } catch (error) {}
            };
            userFriend();
        }, [params.userId]);

        return (
            <>
                <h4 className="rightbarTitle">User information</h4>
                <div className="rightbarInfo">
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">City:</span>
                        <span className="rightbarInfoValue">{profile.city}</span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">From:</span>
                        <span className="rightbarInfoValue">{profile.from}</span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">Email:</span>
                        <span className="rightbarInfoValue">{profile.email}</span>
                    </div>
                </div>
                <h4 className="rightbarTitle">User friends</h4>
                <div className="rightbarFollowings">
                    {friendUser.map((friend) => {
                        return (
                            <div className="rightbarFollowing" key={friend._id}>
                                <img
                                    src={friend.profilePicture ? friend.profilePicture : `${PF}person/noAvatar.png`}
                                    alt=""
                                    className="rightbarFollowingImg"
                                />
                                <span className="rightbarFollowingName">{friend.username}</span>
                            </div>
                        );
                    })}
                </div>
            </>
        );
    };

    return (
        <div className="rightbar">
            <div className="rightbarWrapper">{profile ? <ProfileRightbar /> : <HomeRightbar />}</div>
        </div>
    );
}
export default RightBar;
