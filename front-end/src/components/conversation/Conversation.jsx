import { useEffect, useState } from 'react';
import './conversation.css';
import { getUser } from '../../utils/apiRequest';

export default function Conversation({ conversation, userId }) {
    const [friendUser, setFriendUser] = useState([]);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    useEffect(() => {
        const getConversation = async () => {
            const friendId = conversation.members.find((m) => m !== userId);
            const getFriendUser = await getUser(friendId);
            setFriendUser(getFriendUser.user);
        };

        getConversation();
    }, []);

    return (
        <div className="conversation">
            <img
                className="conversationImg"
                src={friendUser.profilePicture ? friendUser.profilePicture : `${PF}person/noAvatar.png`}
                alt=""
            />
            <span className="conversationName">{friendUser.username}</span>
        </div>
    );
}
