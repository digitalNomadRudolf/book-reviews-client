"use client";

import AboutAuthor from "@/components/AboutAuthor";
import { renderStars } from "@/components/BookCard";
import BookImageSection from "@/components/BookImageSection";
import BookInfoSection from "@/components/BookInfoSection";
import ReviewModal from "@/components/ReviewModal";
import SectionContainer from "@/components/SectionContainer";
import useUser from "@/hooks/useUser";
import { Book } from "@/types/book";
import axiosInstance from "@/utils/axios";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";

interface BookDetailsProps {
  book: Book;
}

const BookDetails = ({ book }: BookDetailsProps) => {
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const { user } = useUser();
  const [reviewedBook, setReviewedBook] = useState(false);

  useEffect(() => {
    const fetchReviewsByUser = async () => {
      try {
        const response = await axiosInstance.get(
          `/api/books/${book._id}/reviews/getReviewByUser/${user?.userId}`
        );
        console.log("response data: ", response.data);

        const review = response.data.review;
        setReviewedBook(!!review);

        // Check if user has already reviewed current book
        const isReviewed = review.bookId === book._id;
        console.log({ isReviewed });
        setReviewedBook(!!isReviewed);
      } catch (error) {
        console.log(error);
      }
    };

    if (user?.userId && book._id) {
      fetchReviewsByUser();
    }
  }, [user?.userId, book._id]);

  const {
    _id,
    title,
    imageUrl,
    authors,
    averageRating,
    description,
    pageCount,
    publishedDate,
  } = book;

  const bookInfo = {
    title,
    authors,
    averageRating,
    renderStars,
    description,
    pageCount,
    publishedDate,
  };

  const addToWishlist = (bookId: string) => {
    console.log("Adding book with id ", bookId);
  };

  if (!book) {
    notFound();
  }

  const handleReviewModal = (isOpen: boolean) => {
    setIsReviewModalOpen(isOpen);
  };

  const handleClose = () => {
    handleReviewModal(false);
  };

  return (
    <>
      <div className="flex flex-col md:max-w-screen-lg xl:max-w-screen-xl mx-auto w-full flex-grow my-28">
        <div className="container flex flex-col lg:flex-row gap-20 w-full md:max-w-screen-lg lg:max-w-screen-xl mb-14">
          <BookImageSection
            bookId={_id}
            title={title}
            imageUrl={imageUrl}
            addToWishList={addToWishlist}
            handleReviewModal={handleReviewModal}
            reviewedBook={reviewedBook}
          />

          <BookInfoSection {...bookInfo} />
        </div>
      </div>

      <SectionContainer className="!bg-modern-secondary min-h-48 !py-9">
        <AboutAuthor authors={authors} />
      </SectionContainer>

      {isReviewModalOpen && (
        <ReviewModal
          bookId={_id}
          setReviewedBook={setReviewedBook}
          onClose={handleClose}
        />
      )}
    </>
  );
};

export default BookDetails;
