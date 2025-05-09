import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken'

export const verifyAccessToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.accessToken;

  if (!token) {
    res.status(401).json({ error: '⚠️ Access token missing' });
    return;
  }
 
  const JWT_SECRET = process.env.JWT_SECRET;

  jwt.verify(token, JWT_SECRET || "", function(err: jwt.VerifyErrors | null) {
    if (err) {
      res.status(403).json({ error : '❌ Invalid or expired token' });
      return;
    }

    next();
  });
}