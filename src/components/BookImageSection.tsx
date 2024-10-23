import useFetchUserReviews from "@/hooks/useFetchUserReviews";
import useUser from "@/hooks/useUser";
import Link from "next/link";
import React, { useEffect, useState } from "react";

type BookImageSectionProps = {
  bookId: string;
  imageUrl: string;
  title: string;
  addToWishList(id: string): void;
  handleReviewModal(isOpen: boolean): void;
  reviewedBook: boolean;
};

const BookImageSection = ({
  bookId,
  imageUrl,
  title,
  addToWishList,
  handleReviewModal,
  reviewedBook,
}: BookImageSectionProps) => {
  const { user } = useUser();

  const handleWishListClick = (id: string) => {
    addToWishList(id);
  };

  const onRateHandler = () => {
    handleReviewModal(true);
  };

  return (
    <div className="container flex-none text-center w-full h-auto lg:max-w-[345px] lg:max-h-[465px] grid gap-y-8 mb-7">
      <img src={imageUrl} alt={title} className="w-full h-auto object-cover" />

      <div className="flex flex-col items-center mx-auto gap-8">
        <button
          onClick={() => handleWishListClick(bookId)}
          className="btn rounded-[30px] bg-blue-cream text-white h-11"
        >
          Add to Wishlist
        </button>
        {!user && (
          <Link
            className="hover:border-b border-black pb-1 transition-all w-fit"
            href="/auth/login"
          >
            Login to rate this book
          </Link>
        )}
        {user &&
          (!reviewedBook ? (
            <button
              className="hover:border-b border-black pb-1 transition-all w-fit"
              onClick={() => onRateHandler()}
            >
              Rate this book
            </button>
          ) : null)}
      </div>
    </div>
  );
};

export default BookImageSection;
