import { Request, Response } from 'express';

interface FileSystem {
    [key: string]: string[];
}

const usersFileSystem: { [key: string]: { cwd: string; fs: FileSystem } } = {};

export const changeDirectory = (req: Request, res: Response) => {
    // @ts-ignore
    const username = req.user.username;
    const { command } = req.body;
    const path = command.split(' ')[1];
    const newPath = resolvePath(usersFileSystem[username].cwd, path);
    if (usersFileSystem[username].fs[newPath]) {
        usersFileSystem[username].cwd = newPath;
        res.json({ message: newPath });
    } else {
        res.status(400).json({ message: `cd: no such file or directory: ${path}` });
    }
};

export const makeDirectory = (req: Request, res: Response) => {
    // @ts-ignore
    const username = req.user.username;
    const { command } = req.body;
    const path = command.split(' ')[1];
    const fullPath = resolvePath(usersFileSystem[username].cwd, path);
    if (!usersFileSystem[username].fs[fullPath]) {
        usersFileSystem[username].fs[fullPath] = [];
        usersFileSystem[username].fs[usersFileSystem[username].cwd].push(fullPath);
        res.json({ message: 'Directory created' });
    } else {
        res.status(400).json({ message: `mkdir: cannot create directory ‘${path}’: File exists` });
    }
};

export const listDirectories = (req: Request, res: Response) => {
    // @ts-ignore
    const username = req.user.username;
    const { command } = req.body;
    const path = command.split(' ')[1] || '.';
    const fullPath = resolvePath(usersFileSystem[username].cwd, path);
    if (usersFileSystem[username].fs[fullPath]) {
        res.json({ directories: usersFileSystem[username].fs[fullPath] });
    } else {
        res.status(400).json({ message: `ls: cannot access '${path}': No such file or directory` });
    }
};

export const printWorkingDirectory = (req: Request, res: Response) => {
    // @ts-ignore
    const username = req.user.username;
    res.json({ cwd: usersFileSystem[username].cwd });
};

const resolvePath = (cwd: string, path: string): string => {
    const parts = path.split('/');
    const resultParts: string[] = cwd.split('/');
    parts.forEach(part => {
        if (part === '' || part === '.') {
            // do nothing
        } else if (part === '..') {
            resultParts.pop();
        } else {
            resultParts.push(part);
        }
    });
    return resultParts.join('/') || '/';
};

export const initializeUserFileSystem = (username: string) => {
    usersFileSystem[username] = {
        cwd: '/',
        fs: { '/': [] }
    };
};
