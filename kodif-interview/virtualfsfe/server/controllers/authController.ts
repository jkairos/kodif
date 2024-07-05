import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { initializeUserFileSystem } from './apiController';

const users = [
    { username: 'user1', password: 'password1' },
    { username: 'user2', password: 'password2' }
];

const secretKey = 'your_secret_key';

export const login = (req: Request, res: Response) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        const token = jwt.sign({ username: user.username }, secretKey, { expiresIn: '1h' });
        initializeUserFileSystem(username);
        res.json({ token, username: user.username });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
};
