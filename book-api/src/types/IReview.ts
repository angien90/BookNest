import { ObjectId } from 'mongoose';
import { IBook } from './IBook';

export interface IReview {
    _id: string;
    name: string;
    content: string;
    rating: number;
    created_at: Date;
    book: IBook | ObjectId;
}