export interface Review {
  bookId: string;
  rating: number;
  reviewText: string;
  userName: string;
  reviewDate: Date;
  likeCount: number;
  commentIds: string[];
}
