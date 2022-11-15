import axios from 'axios';

const setAuthToken = (token) => {
    if (token) {
        localStorage.setItem('social-token', token);
        // axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        // delete axios.defaults.headers.common['Authorization'];
        localStorage.removeItem('social-token');
    }
};

export default setAuthToken;
