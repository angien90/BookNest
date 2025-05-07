import { IReview } from "./IReview";

export interface IBook {
  title: string;
  description: string;
  author: string;
  genres: string[];
  images: string;
  published_year: number;
  reviews: IReview[],
}