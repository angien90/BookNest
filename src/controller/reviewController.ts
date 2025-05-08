import { Request, Response } from "express";
import Review from "../models/Review";
import Book from "../models/Books";
import mongoose from "mongoose";

/*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*/
//Hämta alla reviews med GET: http://localhost:3000/review
export const fetchAllReviews = async (req: Request, res: Response) => {
    try {
        const review = await Review.find().populate('book');;
        res.json(review);
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
        const review = await Review.findById(req.params.id).populate('book');
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
    const { name, content, rating, bookId } = req.body;

    //Validate input
    if (!name || typeof name !== "string" || name.trim().length === 0) {
        res.status(400).json({ success: false, message: "Vänligen ange ett namn" });
        return;
      }
    
      if (!content || typeof content !== "string" || content.trim().length === 0) {
        res.status(400).json({ success: false, message: "Vänligen ange en recension" });
        return;
      }

    if (typeof rating !== "number" || rating < 1 || rating > 5) {
        res.status(400).json({ success: false, message: "Ange ett betyg mellan 1 och 5" });
        return;
      }

      if (!mongoose.Types.ObjectId.isValid(bookId)) {
        res.status(400).json({ success: false, message: "Ogiltigt bookId" });
        return;
      }

      try {
        const book = await Book.findById(bookId);
    
        if (!book) {
          res.status(404).json({ success: false, message: "Boken hittades inte" });
          return;
        }

        const review = new Review({ 
            name: name, 
            content: content, 
            rating: rating,
            created_at: new Date(),
            book: bookId
        });
        const savedReview = await review.save();

        book.reviews.push(savedReview._id);
        await book.save();
        res.status(201).json({ message: 'New review created', data: savedReview });
    } 
    catch (error: unknown) {
        res.status(500).json({ error: error, message: "Server error" });
    }
}
/*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*/

/*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*/
//Uppdatera review med PATCH: http://localhost:3000/review/:id
export const updateReview = async (req: Request, res: Response) => {
  const {name, content, rating, bookId} = req.body // Destructur JS Object

  if (!name || typeof name !== "string" || name.trim().length === 0) {
    res.status(400).json({ success: false, message: "Vänligen ange ett namn" });
    return;
  }

  if (!content || typeof content !== "string" || content.trim().length === 0) {
    res.status(400).json({ success: false, message: "Vänligen ange en recension" });
    return;
  }

if (typeof rating !== "number" || rating < 1 || rating > 5) {
    res.status(400).json({ success: false, message: "Ange ett betyg mellan 1 och 5" });
    return;
  }

  if (!mongoose.Types.ObjectId.isValid(bookId)) {
    res.status(400).json({ success: false, message: "Ogiltigt bookId" });
    return;
  }

  try {
    const book = await Book.findById(bookId);

    if (!book) {
      res.status(404).json({ success: false, message: "Boken hittades inte" });
      return;
    }

    const updatedReview = await Review.updateOne(
      {_id : req.params.id}, 
      {$set: { 
        name: name, 
        content: content, 
        rating: rating,
        }
      }
    );

    if (updatedReview.matchedCount == 0) {
        return res.status(404).json({success: false, message: 'Review not found' });
    }

    const review = await Review.findById(req.params.id);
    if (!review) {
        return res.status(404).json({success: false, message: 'Review not found' });
    }

    res.json({message: 'Review updated', data: await Review.findById(req.params.id)});
  } catch (error: unknown) {

    const message = error  instanceof Error ? error.message : 'Unknown error'
    res.status(500).json({error: message})
  }
}
/*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*/

/*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*/
//Delete review med DELETE: http://localhost:3000/review/:id
export const deleteReview = async (req: Request, res: Response) => {
    try {
      const deletedReview = await Review.deleteOne({_id : req.params.id});
  
      if (deletedReview.deletedCount === 0) {
        res.status(404).json({success: false, message: 'Review not found' });
        return 
      }
      res.json({message: 'Review deleted'})
    } catch (error: unknown) {
      const message = error  instanceof Error ? error.message : 'Unknown error'
      res.status(500).json({error: message})
    }
  }
/*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*/