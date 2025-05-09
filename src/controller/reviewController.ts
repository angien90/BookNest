import { Request, Response } from "express";
import Review from "../models/Review"; 
import Book from '../models/Books';

/*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*/
//Hämta alla reviews med GET: http://localhost:3000/review
export const fetchAllReviews = async (_: Request, res: Response) => {
    try {
      const reviews = await Review.find().populate('book');
      if (!reviews) {
        res.status(404).json({message: 'Book not found'})
        return;
      }
      res.json(reviews);
    } catch (error: unknown) {
      const message = error  instanceof Error ? error.message : 'Server error'
      res.status(500).json({error: message})
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
    const message = error  instanceof Error ? error.message : 'Server error'
    res.status(500).json({error: message})
    }
}
/*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*/


/*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*/
//Skapa ny review med POST: http://localhost:3000/review
export const createReview = async (req: Request, res: Response) => {
    const { name, content, rating, book_id } = req.body;

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

    try {
      if (!book_id) {
        res.status(400).json({ success: false, message: "Ange ett giltigt book_id" });
        return;
      }
      const review = new Review({ 
          name: name, 
          content: content, 
          rating: rating,
          book: book_id
      });
      const savedReview = await review.save();


      // Om book_id finns, uppdatera boken
    if (book_id) {
      const book = await Book.findById(book_id);
      if (!book) {
        res.status(404).json({ success: false, message: "Book not found" });
        return;
      }
      await Book.findByIdAndUpdate(book_id, {
        $push: { reviews: savedReview.id }
      });
    }

      res.status(201).json({ message: 'New review created', data: savedReview });
    } catch (error: unknown) {
      const message = error  instanceof Error ? error.message : 'Server error'
      res.status(500).json({error: message})
    }
}
/*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*/


/*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*/
//Uppdatera review med PATCH: http://localhost:3000/review/:id
export const updateReview = async (req: Request, res: Response): Promise<void> => {
  const {name, content, rating} = req.body // Destructur JS Object

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

  try {
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
        res.status(404).json({success: false, message: 'Review not found' });
        return 
    }
    res.json({message: 'Review created', data: await Review.findById(req.params.id)});
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
    const review = await Review.findById(req.params.id);

    if (!review) {
      res.status(404).json({ success: false, message: "Review not found" });
      return;
    }

    const book = review.book;

    // Ta bort review
    const deletedReview = await Review.deleteOne({ _id: req.params.id });

    if (deletedReview.deletedCount === 0) {
      res.status(404).json({ success: false, message: "Review not found" });
      return;
    }

    // Ta bort kopplingen till review i book
    if (book) {
      await Book.findByIdAndUpdate(book, { $pull: { reviews: req.params.id } });
    }

    res.json({ message: 'Review deleted' });

  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({ error: message });
  }
};
  /*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*/
