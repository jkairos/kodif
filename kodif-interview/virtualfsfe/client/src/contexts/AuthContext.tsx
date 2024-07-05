import React, { createContext, useState, useContext } from 'react';
import { loginUser } from '../services/auth';

interface AuthContextProps {
    user: any;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextProps>({
    user: null,
    login: async () => {},
    logout: () => {},
});

export const AuthProvider: React.FC = ({ children }) => {
    const [user, setUser] = useState<any>(null);

    const login = async (username: string, password: string) => {
        const userData = await loginUser(username, password);
        setUser(userData);
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
