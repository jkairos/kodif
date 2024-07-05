import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from '../../services/api';
import TerminalHelp from '../TerminalHelp';
import { AuthContext } from '../../contexts/AuthContext';
import Terminal from "../Terminal";

// Mock axios
jest.mock('../../services/api');
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Mock the AuthContext
const mockUser = { username: 'testuser', token: 'testtoken' };
const mockLogout = jest.fn();
const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useHistory: () => ({
        push: mockHistoryPush,
    }),
}));

describe('Terminal Component', () => {
    beforeEach(() => {
        mockedAxios.post.mockClear();
        mockedAxios.get.mockClear();
        mockLogout.mockClear();
        mockHistoryPush.mockClear();
    });

    it('redirects to login if user is not authenticated', () => {
        render(
            <Router>
                <AuthContext.Provider value={{ user: null, login: jest.fn(), logout: jest.fn() }}>
                    <Terminal />
                </AuthContext.Provider>
            </Router>
        );

        expect(mockHistoryPush).toHaveBeenCalledWith('/login');
    });

    it('renders Terminal component for authenticated user', () => {
        const { getByText, getByRole } = render(
            <Router>
                <AuthContext.Provider value={{ user: mockUser, login: jest.fn(), logout: mockLogout }}>
                    <Terminal />
                </AuthContext.Provider>
            </Router>
        );

        expect(getByText(/Logged in as: testuser/i)).toBeInTheDocument();
        expect(getByText(/History Panel/i)).toBeInTheDocument();
        expect(getByRole('textbox')).toBeInTheDocument();
    });

    it('handles cd command and updates cwd', async () => {
        mockedAxios.post.mockResolvedValueOnce({ data: { message: '/newdir' } });

        const { getByRole, getByText } = render(
            <Router>
                <AuthContext.Provider value={{ user: mockUser, login: jest.fn(), logout: mockLogout }}>
                    <Terminal />
                </AuthContext.Provider>
            </Router>
        );

        const input = getByRole('textbox');
        fireEvent.change(input, { target: { value: 'cd /newdir' } });
        fireEvent.submit(input);

        await waitFor(() => {
            expect(mockedAxios.post).toHaveBeenCalledWith('/cd', { command: 'cd /newdir' }, { headers: { Authorization: `Bearer ${mockUser.token}` } });
            expect(getByText('/newdir $')).toBeInTheDocument();
        });
    });

    it('handles mkdir command and displays message', async () => {
        mockedAxios.post.mockResolvedValueOnce({ data: { message: 'Directory created' } });

        const { getByRole, getByText } = render(
            <Router>
                <AuthContext.Provider value={{ user: mockUser, login: jest.fn(), logout: mockLogout }}>
                    <Terminal />
                </AuthContext.Provider>
            </Router>
        );

        const input = getByRole('textbox');
        fireEvent.change(input, { target: { value: 'mkdir newdir' } });
        fireEvent.submit(input);

        await waitFor(() => {
            expect(mockedAxios.post).toHaveBeenCalledWith('/mkdir', { command: 'mkdir newdir' }, { headers: { Authorization: `Bearer ${mockUser.token}` } });
            expect(getByText('Directory created')).toBeInTheDocument();
        });
    });

    it('handles pwd command and displays current directory', async () => {
        mockedAxios.get.mockResolvedValueOnce({ data: { cwd: '/currentdir' } });

        const { getByRole, getByText } = render(
            <Router>
                <AuthContext.Provider value={{ user: mockUser, login: jest.fn(), logout: mockLogout }}>
                    <Terminal />
                </AuthContext.Provider>
            </Router>
        );

        const input = getByRole('textbox');
        fireEvent.change(input, { target: { value: 'pwd' } });
        fireEvent.submit(input);

        await waitFor(() => {
            expect(mockedAxios.get).toHaveBeenCalledWith('/pwd', { headers: { Authorization: `Bearer ${mockUser.token}` } });
            expect(getByText('/currentdir')).toBeInTheDocument();
        });
    });

    it('handles logout command', () => {
        const { getByRole } = render(
            <Router>
                <AuthContext.Provider value={{ user: mockUser, login: jest.fn(), logout: mockLogout }}>
                    <Terminal />
                </AuthContext.Provider>
            </Router>
        );

        const input = getByRole('textbox');
        fireEvent.change(input, { target: { value: 'logout' } });
        fireEvent.submit(input);

        expect(mockLogout).toHaveBeenCalled();
    });

    it('displays error message on invalid command', async () => {
        const { getByRole, getByText } = render(
            <Router>
                <AuthContext.Provider value={{ user: mockUser, login: jest.fn(), logout: mockLogout }}>
                    <Terminal />
                </AuthContext.Provider>
            </Router>
        );

        const input = getByRole('textbox');
        fireEvent.change(input, { target: { value: 'invalidcommand' } });
        fireEvent.submit(input);

        await waitFor(() => {
            expect(getByText('Invalid command: invalidcommand')).toBeInTheDocument();
        });
    });

    it('displays API error message on failed request', async () => {
        mockedAxios.post.mockRejectedValueOnce({ response: { status: 400, data: { message: 'Bad request' } } });

        const { getByRole, getByText } = render(
            <Router>
                <AuthContext.Provider value={{ user: mockUser, login: jest.fn(), logout: mockLogout }}>
                    <Terminal />
                </AuthContext.Provider>
            </Router>
        );

        const input = getByRole('textbox');
        fireEvent.change(input, { target: { value: 'ls non-existent-dir' } });
        fireEvent.submit(input);

        await waitFor(() => {
            expect(getByText('Error: Bad request')).toBeInTheDocument();
        });
    });
});