export interface Book {
  _id: string;
  title: string;
  imageUrl: string;
  authors: string[];
  averageRating: number;
  isbn: string;
  description: string;
  publishedDate: string;
  pageCount: number;
  categories: string[];
  language: string;
  bookType: string;
  wishlist: string[];
}
