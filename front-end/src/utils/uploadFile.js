import axios from 'axios';
const API_URL = 'http://localhost:4000';

const cloudinaryUpload = async (fileToUpload) => {
    try {
        const res = await axios.post(API_URL + '/api/post/cloudinary-upload', fileToUpload);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export default cloudinaryUpload;
