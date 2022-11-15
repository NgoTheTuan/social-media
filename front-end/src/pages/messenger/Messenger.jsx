import './messenger.css';
import Topbar from '../../components/topbar/Topbar';
import Conversation from '../../components/conversation/Conversation';
import Message from '../../components/message/Message';
import ChatOnline from '../../components/chatOnline/ChatOnline';

import { useState, useEffect, useRef } from 'react';
import { getAllConversation, getAllMessages, createMessages } from '../../utils/apiRequest';
import { useSelector } from 'react-redux';

function Messenger() {
    const [conversation, setConversation] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    const currentUserId = useSelector((state) => state.auth.login.currentUser._id);

    const scrollRef = useRef();

    useEffect(() => {
        const getConversation = async () => {
            try {
                const conversation = await getAllConversation(currentUserId);
                setConversation(conversation);
            } catch (e) {
                console.log(e);
            }
        };

        getConversation();
    }, [currentUserId]);

    useEffect(() => {
        const getMessage = async () => {
            try {
                const message = await getAllMessages(currentChat?._id);
                setMessages(message);
            } catch (e) {
                console.log(e);
            }
        };

        getMessage();
    }, [currentChat]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const message = {
            sender: currentUserId,
            text: newMessage,
            conversationId: currentChat._id,
        };

        try {
            const addMessage = await createMessages(message);
            setMessages([...messages, addMessage]);
            setNewMessage('');
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <>
            <Topbar />
            <div className="messenger">
                <div className="chatMenu">
                    <div className="chatMenuWrapper">
                        <input placeholder="Search for friends" className="chatMenuInput" />
                        {conversation.map((c, index) => (
                            <div key={index} onClick={() => setCurrentChat(c)}>
                                <Conversation conversation={c} userId={currentUserId} />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="chatBox">
                    <div className="chatBoxWrapper">
                        {currentChat ? (
                            <>
                                <div className="chatBoxTop">
                                    {messages.map((m) => {
                                        return (
                                            <div ref={scrollRef} key={m._id}>
                                                <Message message={m} own={m?.sender === currentUserId ? true : false} />
                                            </div>
                                        );
                                    })}
                                </div>
                                <div className="chatBoxBottom">
                                    <textarea
                                        className="chatMessageInput"
                                        placeholder="write something..."
                                        onChange={(e) => setNewMessage(e.target.value)}
                                        value={newMessage}
                                    ></textarea>
                                    <button className="chatSubmitButton" onClick={handleSubmit}>
                                        Send
                                    </button>
                                </div>
                            </>
                        ) : (
                            <span className="noConversationText">Open a conversation to chat.</span>
                        )}
                    </div>
                </div>
                <div className="chatOnline">
                    <div className="chatOnlineWrapper">
                        <ChatOnline />
                        {/* <ChatOnline
                  onlineUsers={onlineUsers}
                  currentId={user._id}
                  setCurrentChat={setCurrentChat}
                /> */}
                    </div>
                </div>
            </div>
        </>
    );
}
export default Messenger;
