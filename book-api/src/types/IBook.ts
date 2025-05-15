import { IReview } from "./IReview";

export interface IBook {
  title: string;
  description: string;
  author: string;
  genres: string[];
  image: string;
  published_year: number;
  reviews: IReview[];
  created_at: Date;
}