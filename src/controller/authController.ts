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