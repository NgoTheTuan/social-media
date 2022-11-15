import './register.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { registerUser } from '../../utils/apiRequest';

export default function Register() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [user, setUser] = useState({
        username: null,
        email: null,
        password: null,
        passwordAgain: null,
    });

    const handleUser = (e, type) => {
        setUser({
            ...user,
            [type]: e.target.value,
        });
    };

    const signIn = () => {
        console.log('dang ki');

        if (user.password === user.passwordAgain) {
            console.log('success');

            const newUser = {
                username: user.username,
                email: user.email,
                password: user.password,
            };

            registerUser(newUser, dispatch, navigate);
        }
    };

    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">Lamasocial</h3>
                    <span className="loginDesc">Connect with friends and the world around you on Lamasocial.</span>
                </div>
                <div className="loginRight">
                    <div className="loginBox">
                        <input
                            placeholder="Username"
                            className="loginInput"
                            onChange={(e) => handleUser(e, 'username')}
                        />
                        <input placeholder="Email" className="loginInput" onChange={(e) => handleUser(e, 'email')} />
                        <input
                            placeholder="Password"
                            className="loginInput"
                            onChange={(e) => handleUser(e, 'password')}
                        />
                        <input
                            placeholder="Password Again"
                            className="loginInput"
                            onChange={(e) => handleUser(e, 'passwordAgain')}
                        />
                        <button className="loginButton" onClick={signIn}>
                            Sign Up
                        </button>
                        <Link to="/login" className="loginRegisterButton">
                            Log into Account
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
