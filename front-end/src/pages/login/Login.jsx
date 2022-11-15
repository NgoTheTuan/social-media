import './login.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../utils/apiRequest';

import { Link } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [user, setUser] = useState({
        email: null,
        password: null,
    });

    const handleUser = (e, type) => {
        if (type === 'email') {
            setUser({
                email: e.target.value,
                password: user.password,
            });
        } else if (type === 'password') {
            setUser({
                email: user.email,
                password: e.target.value,
            });
        }
    };

    const submitLogin = async () => {
        loginUser(user, dispatch, navigate);
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
                        <input placeholder="Email" className="loginInput" onChange={(e) => handleUser(e, 'email')} />
                        <input
                            placeholder="Password"
                            className="loginInput"
                            onChange={(e) => handleUser(e, 'password')}
                        />
                        <button className="loginButton" onClick={submitLogin}>
                            Log In
                        </button>
                        <span className="loginForgot">Forgot Password?</span>
                        <Link to="/register" className="loginRegisterButton">
                            Create a New Account
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
