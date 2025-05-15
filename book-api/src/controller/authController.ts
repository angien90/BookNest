import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User';

const JWT_SECRET = process.env.JWT_SECRET || '123qwe123';

/* ----- CREATE NEW USER ----- */
export const registerUser = async (req: Request, res: Response) => {
    try {
        const { username, password, is_admin } = req.body;

        // If user's infos are missing
        if (!username || !password) {
            res.status(400).json({ error: '⚠️ Username and password are required' });
            return;
        }

        // If user already existed
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            res.status(409).json({ error: '❌ Username already taken' });
            return;
        }

        // Encrypting user's password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Creating new user
        const newUser = await User.create({
            username,
            password: hashedPassword,
            is_admin: is_admin || false
        });

        res.status(201).json({ message: '✅ User created!', user: newUser });
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        res.status(500).json({ error: message });
    }
}

/* ----- LOGIN USER ----- */
export const loginUser = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;

        // Missing username and or password
        if (!username || !password) {
            res.status(400).json({ error: '⚠️ Username and password required' });
            return;
        }

        // Wrong username
        const user = await User.findOne({ username });
        if (!user) {
            res.status(401).json({ error : '❌ Username not found' });
            return;
        }

        // Wrong password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(401).json({ error: '❌ Invalid password' });
            return;
        }

        const token = jwt.sign({ id: user._id, is_admin: user.is_admin }, JWT_SECRET, { expiresIn: '1h' });
        res.cookie('accessToken', token, {
            httpOnly: true,
            secure: true, /* process.env.NODE_ENV === 'production' */
            sameSite: 'none', /* strict */
            maxAge: 3600000
        });

        res.status(200).json({ message: '✅ Logged in successfully' });
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        res.status(500).json({ error: message });
    }
}

/* ----- LOGOUT USER ----- */
export const logoutUser = (req: Request, res: Response) => {
    res.clearCookie('accessToken');
    res.status(200).json({ message: '👋 Logged out successfully' });
};