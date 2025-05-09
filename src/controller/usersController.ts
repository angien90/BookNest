import { Request, Response } from 'express';
import User from '../models/User';
import bcrypt from 'bcrypt';

// GET all users
export const fetchAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find();

        res.status(200).json(users);
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        res.status(500).json({ error: message });
    }
};

// GET specific user
export const fetchUserById = async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.params.id);
        
        // If no user found
        if (!user) {
            res.status(404).json({ error: '⚠️ User not found' });
            return;
        }

        res.status(200).json(user);
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        res.status(500).json({ error: message });
    }
};

// PATCH user - TOKEN required
export const updateUser = async (req: Request, res: Response) => {
    try {
        // If body is empty
        if (!req.body || Object.keys(req.body).length === 0) {
            res.status(400).json({ error: '⚠️ No data provided' });
            return;
        }

        // Fields that can be updated
        const allowedUpdates = ['username', 'password'];
        const updates = Object.keys(req.body);
        const isValid = updates.every((field) => allowedUpdates.includes(field));

        if (!isValid) {
            res.status(400).json({ error: '⚠️ Invalid fields in update' });
        }

        // Hash password if it's being updated
        if (req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, 10);
        }

        // Update
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

        // If no user found
        if (!updatedUser) {
            res.status(404).json({ error: '⚠️ User not found' });
            return;
        }

        res.status(200).json({ message: '✅ User updated', user: updatedUser });
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        res.status(500).json({ error: message });
    }
};

// DELETE user - TOKEN required
export const deleteUser = async (req: Request, res: Response) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);

        // If no user found
        if (!deletedUser) {
            res.status(404).json({ error: '⚠️ User not found' });
            return;
        }

        res.status(200).json({ message: '✅ User deleted' });
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        res.status(500).json({ error: message });
    }
};