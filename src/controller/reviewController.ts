import { Request, Response } from "express";
import Review from "../models/Review"; 

/*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*/
//Hämta alla reviews med GET: http://localhost:3000/review
export const fetchAllReviews = async (req: Request, res: Response) => {
    try {
        res.json(await Review.find());
    } 
    catch (error: unknown) {
        res.status(500).json({ error: error, message: "Server error" });
    }
} 
/*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*/

/*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*/
//Hämta enskild review med GET: http://localhost:3000/review/:id
export const fetchReviewById = async (req: Request, res: Response) => {
    try {
        const review = await Review.findById(req.params.id);
    if (!review) {
        res.status(404).json({message: 'Review hittades inte'})
        return;
    }
    res.json (review);
    } 
    catch (error: unknown) {
        res.status(500).json({ error: error, message: "Server error" });
    }
}
/*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*/