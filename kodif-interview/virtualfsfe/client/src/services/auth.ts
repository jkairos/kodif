import axios from './api';

export const loginUser = async (username: string, password: string) => {
    const response = await axios.post('/login', { username, password });
    return response.data;
};
