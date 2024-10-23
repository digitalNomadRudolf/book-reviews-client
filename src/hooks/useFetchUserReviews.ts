import axiosInstance from "@/utils/axios";
import { useEffect, useState } from "react";

const useFetchUserReviews = (userId: string, bookId: string) => {
  const [reviewedBook, setReviewedBook] = useState(false);
  const [userReviews, setUserReviews] = useState([]);

  useEffect(() => {
    const fetchReviewsByUser = async () => {
      try {
        const response = await axiosInstance.get(
          `/api/books/${bookId}/reviews/getReviewByUser/${userId}`
        );
        console.log("response data: ", response.data);

        const review = response.data.review;
        setUserReviews(review);

        // Check if user has already reviewed current book
        const isReviewed = review.bookId === bookId;
        setReviewedBook(!!isReviewed);
      } catch (error) {
        console.log(error);
      }
    };

    if (userId && bookId) {
      fetchReviewsByUser();
    }
  }, [userId, bookId]);

  return {
    userReviews,
    reviewedBook,
    setReviewedBook,
  };
};

export default useFetchUserReviews;
