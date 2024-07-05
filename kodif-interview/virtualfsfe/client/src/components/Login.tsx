import React, { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css';

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);
    const history = useHistory();

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            await login(username, password);
            history.push('/');
        } catch (error) {
            // @ts-ignore
            if (error.response && error.response.data && error.response.data.message) {
                // @ts-ignore
                toast.error(`Login failed: ${error.response.data.message}`);
            } else { // @ts-ignore
                if (error.request) {
                                toast.error('Login failed: No response from server');
                            } else {
                                // @ts-ignore
                    toast.error(`Login failed: ${error.message}`);
                            }
            }
        }
    };


    return (
        <div className="Login">
            <ToastContainer />
            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input id="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
