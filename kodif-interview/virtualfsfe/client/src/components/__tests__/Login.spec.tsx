// src/components/Login.test.tsx

import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { toast } from 'react-toastify';
import Login from "../Login";
import { AuthContext } from '../../contexts/AuthContext';

// Mock the toast functions
jest.mock('react-toastify', () => ({
    toast: {
        error: jest.fn(),
    },
    ToastContainer: () => <div>ToastContainer</div>,
}));

const mockLogin = jest.fn();
const mockLogout = jest.fn();
const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useHistory: () => ({
        push: mockHistoryPush,
    }),
}));

describe('Login Component', () => {
    beforeEach(() => {
        mockLogin.mockClear();
        mockLogout.mockClear();
        mockHistoryPush.mockClear();
    });

    it('renders Login component', () => {
        const { getByLabelText, getByText } = render(
            <Router>
                <AuthContext.Provider value={{ user: null, login: mockLogin, logout: mockLogout }}>
                    <Login />
                </AuthContext.Provider>
            </Router>
        );

        expect(getByLabelText(/Username/i)).toBeInTheDocument();
        expect(getByLabelText(/Password/i)).toBeInTheDocument();
        expect(getByText(/Login/i)).toBeInTheDocument();
    });

    it('calls login function with username and password on form submission', async () => {
        const { getByLabelText, getByText } = render(
            <Router>
                <AuthContext.Provider value={{ user: null, login: mockLogin, logout: mockLogout }}>
                    <Login />
                </AuthContext.Provider>
            </Router>
        );

        const usernameInput = getByLabelText(/Username/i);
        const passwordInput = getByLabelText(/Password/i);
        const loginButton = getByText(/Login/i);

        fireEvent.change(usernameInput, { target: { value: 'testuser' } });
        fireEvent.change(passwordInput, { target: { value: 'password' } });
        fireEvent.click(loginButton);

        await waitFor(() => {
            expect(mockLogin).toHaveBeenCalledWith('testuser', 'password');
        });
    });

    it('redirects to home page on successful login', async () => {
        mockLogin.mockResolvedValueOnce({});
        const { getByLabelText, getByText } = render(
            <Router>
                <AuthContext.Provider value={{ user: null, login: mockLogin, logout: mockLogout }}>
                    <Login />
                </AuthContext.Provider>
            </Router>
        );

        const usernameInput = getByLabelText(/Username/i);
        const passwordInput = getByLabelText(/Password/i);
        const loginButton = getByText(/Login/i);

        fireEvent.change(usernameInput, { target: { value: 'testuser' } });
        fireEvent.change(passwordInput, { target: { value: 'password' } });
        fireEvent.click(loginButton);

        await waitFor(() => {
            expect(mockHistoryPush).toHaveBeenCalledWith('/');
        });
    });

    it('displays error toast on failed login with response message', async () => {
        const errorMessage = 'Invalid credentials';
        mockLogin.mockRejectedValueOnce({ response: { data: { message: errorMessage } } });

        const { getByLabelText, getByText } = render(
            <Router>
                <AuthContext.Provider value={{ user: null, login: mockLogin, logout: mockLogout }}>
                    <Login />
                </AuthContext.Provider>
            </Router>
        );

        const usernameInput = getByLabelText(/Username/i);
        const passwordInput = getByLabelText(/Password/i);
        const loginButton = getByText(/Login/i);

        fireEvent.change(usernameInput, { target: { value: 'testuser' } });
        fireEvent.change(passwordInput, { target: { value: 'password' } });
        fireEvent.click(loginButton);

        await waitFor(() => {
            expect(toast.error).toHaveBeenCalledWith(`Login failed: ${errorMessage}`);
        });
    });

    it('displays error toast on failed login with no response', async () => {
        mockLogin.mockRejectedValueOnce({ request: {} });

        const { getByLabelText, getByText } = render(
            <Router>
                <AuthContext.Provider value={{ user: null, login: mockLogin, logout: mockLogout }}>
                    <Login />
                </AuthContext.Provider>
            </Router>
        );

        const usernameInput = getByLabelText(/Username/i);
        const passwordInput = getByLabelText(/Password/i);
        const loginButton = getByText(/Login/i);

        fireEvent.change(usernameInput, { target: { value: 'testuser' } });
        fireEvent.change(passwordInput, { target: { value: 'password' } });
        fireEvent.click(loginButton);

        await waitFor(() => {
            expect(toast.error).toHaveBeenCalledWith('Login failed: No response from server');
        });
    });

    it('displays error toast on failed login with generic error message', async () => {
        const genericErrorMessage = 'Something went wrong';
        mockLogin.mockRejectedValueOnce(new Error(genericErrorMessage));

        const { getByLabelText, getByText } = render(
            <Router>
                <AuthContext.Provider value={{ user: null, login: mockLogin, logout: mockLogout }}>
                    <Login />
                </AuthContext.Provider>
            </Router>
        );

        const usernameInput = getByLabelText(/Username/i);
        const passwordInput = getByLabelText(/Password/i);
        const loginButton = getByText(/Login/i);

        fireEvent.change(usernameInput, { target: { value: 'testuser' } });
        fireEvent.change(passwordInput, { target: { value: 'password' } });
        fireEvent.click(loginButton);

        await waitFor(() => {
            expect(toast.error).toHaveBeenCalledWith(`Login failed: ${genericErrorMessage}`);
        });
    });
});
