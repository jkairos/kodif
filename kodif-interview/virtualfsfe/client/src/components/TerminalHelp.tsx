import React, { useState } from 'react';
import './TerminalHelp.css';

const TerminalHelp: React.FC = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    const commands = [
        { command: 'cd <dir>', description: 'Change the current directory to <dir>' },
        { command: 'mkdir <dir>', description: 'Create a new directory named <dir>' },
        { command: 'ls', description: 'List the contents of the current directory' },
        { command: 'pwd', description: 'Print the current working directory' },
        { command: 'logout', description: 'Log out of the terminal' },
    ];

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className="terminal-help">
            <button onClick={toggleExpand} className="help-button">
                {isExpanded ? 'Hide Commands' : 'Show Commands'}
            </button>
            {isExpanded && (
                <div className="help-content">
                    <h3>Available Commands</h3>
                    <ul>
                        {commands.map((cmd, index) => (
                            <li key={index}>
                                <strong>{cmd.command}:</strong> {cmd.description}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default TerminalHelp;
