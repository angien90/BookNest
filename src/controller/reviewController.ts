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


/*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*/
//Skapa ny review med POST: http://localhost:3000/review

export const createReview = async (req: Request, res: Response) => {
    const { name, content, rating } = req.body;

    try {
        const review = new Review({ 
            name: name, 
            content: content, 
            rating: rating,
            created_at: new Date()
        });
        const savedReview = await review.save();
        res.status(201).json({ message: 'New review created', data: savedReview });
    } 
    catch (error: unknown) {
        res.status(500).json({ error: error, message: "Server error" });
    }
}
/*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*/