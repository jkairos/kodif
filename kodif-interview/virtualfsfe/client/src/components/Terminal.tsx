import React, { useState, useEffect, useContext } from 'react';
import axios from '../services/api';
import './Terminal.css';
import { AuthContext } from '../contexts/AuthContext';
import { useHistory } from 'react-router-dom';
import TerminalHelp from './TerminalHelp'; // Import the new TerminalHelp component

const Terminal: React.FC = () => {
    const [command, setCommand] = useState('');
    const [output, setOutput] = useState<string[]>([]);
    const [cwd, setCwd] = useState('/');
    const { user, logout } = useContext(AuthContext);
    const history = useHistory();

    useEffect(() => {
        if (!user) {
            history.push('/login');
        }
    }, [user, history]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCommand(event.target.value);
    };

    const handleCommandSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const newOutput = [...output, `${cwd} $ ${command}`];
        try {
            let response;
            if (command.startsWith('cd ')) {
                response = await axios.post('/cd', { command }, { headers: { Authorization: `Bearer ${user.token}` } });
                if (response?.data) {
                    let newDir = response.data.message;
                    if (!newDir.startsWith('/')) {
                        newDir = `/${newDir}`; // Ensure it starts with a slash
                    }
                    newDir = newDir.replace(/\/+$/, ''); // Remove trailing slashes
                    setCwd(newDir || '/');
                }
            } else if (command.startsWith('mkdir ')) {
                response = await axios.post('/mkdir', { command }, { headers: { Authorization: `Bearer ${user.token}` } });
                if (response?.data) {
                    newOutput.push(response.data.message);
                }
            } else if (command.startsWith('ls')) {
                response = await axios.post('/ls', { command }, { headers: { Authorization: `Bearer ${user.token}` } });
                if (response?.data) {
                    newOutput.push(response.data.directories.join('\n'));
                }
            } else if (command === 'pwd') {
                response = await axios.get('/pwd', { headers: { Authorization: `Bearer ${user.token}` } });
                if (response?.data) {
                    newOutput.push(response.data.cwd);
                }
            } else if (command === 'logout') {
                logout();
                return;
            } else {
                newOutput.push(`Invalid command: ${command}`);
                setOutput(newOutput);
                setCommand('');
                return;
            }
        } catch (error) {
            // @ts-ignore
            if (error.response && error.response.status === 400 && error.response.data.message) {
                // @ts-ignore
                newOutput.push(`Error: ${error.response.data.message}`);
            } else {
                // @ts-ignore
                newOutput.push(`Error: ${error.message}`);
            }
        }
        setOutput(newOutput);
        setCommand('');
    };

    return (
        <div className="Terminal">
            <header className="terminal-header">
                <TerminalHelp /> {/* Add the help section to the header */}
                {user && <div className="user-info">Logged in as: {user.username}</div>}
            </header>
            <div className="output">
                <h2 className="history-title">History Panel</h2>
                {output.map((line, index) => (
                    <div key={index}>{line}</div>
                ))}
            </div>
            <form onSubmit={handleCommandSubmit}>
                <span>{cwd} $ </span>
                <input type="text" value={command} onChange={handleInputChange} autoFocus />
            </form>
        </div>
    );
};

export default Terminal;
