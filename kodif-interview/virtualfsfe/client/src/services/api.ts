import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:3001/api', // Change this if your backend is hosted elsewhere
    timeout: 1000,
});

export default instance;
