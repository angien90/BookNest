import { Request, Response } from "express";
import Review from "../models/Review"; 

/*
export const fetchAllReviews = async (req: Request, res: Response) => {
        const search = req.query.search as string;
        const sort = req.query.sort as string;
    
        try {
            let sql = `SELECT * FROM posts`;
            const params: any[] = [];
    
            // Om sökord finns – lägg till WHERE
            if (search) {
                sql += ` WHERE type LIKE ?`;
                params.push(`%${search}%`);
            }
    
            // Sortera på variant i lowercase
            if (sort === "asc") {
                sql += ` ORDER BY LOWER(variant) ASC`;
            } else if (sort === "desc") {
                sql += ` ORDER BY LOWER(variant) DESC`;
            }
    
            const [rows] = await db.query(sql, params);
            res.status(200).json(rows);
        } catch (error: unknown) {
            res.status(500).json({ error: "Error fetching posts", details: error });
        }
    };
*/
/*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*/


/*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*/
export const fetchAllRewievs = async (req: Request, res: Response) => {
    //const id = req.params.id;
//    const post = posts.find(post => post.id === parseInt(id));
    

    try {
        res.json(await Review.find());
    //skriv sökfrågan här
            //if (!post) {
               // res.status(404).json({message: 'Post hittades inte, finns ej i arrayen'})
                //return;
            //}
        //res.json(rows[0]);
    } catch (error: unknown) {
        res.status(500).json({ error: error, message: "Server error vid sortering" });
    }
} 
/*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*/
