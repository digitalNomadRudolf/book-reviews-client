import EmptyStarIcon from "@/Icons/EmptyStarIcon";
import FullStarIcon from "@/Icons/FullStarIcon";
import TrashIcon from "@/Icons/TrashIcon";
import { Book } from "@/types/book";
import Link from "next/link";
import React from "react";

interface BookCardProps {
  book: Book;
  isWishList?: boolean;
}

// function to calculate avg rating from ratings array
const calculateAvgRating = (ratings: number[] | number) => {
  if (!ratings) return 0;
  if (Array.isArray(ratings)) {
    if (!ratings.length) return 0;

    const sum = ratings.reduce((total, rating) => total + rating, 0);
    const average = sum / ratings.length;

    // Round to nearest half
    return Math.round(average * 2) / 2;
  }
};

export const renderStars = (avgRating: number) => {
  // set stars array
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (i <= avgRating) {
      stars.push(
        <span key={i} className="mr-1">
          <FullStarIcon size="small" />
        </span>
      );
    } else {
      stars.push(
        <span key={i} className="mr-1">
          <EmptyStarIcon size="small" />
        </span>
      );
    }
  }

  return <div className="flex">{stars}</div>;
};

const BookCard = ({ book, isWishList }: BookCardProps) => {
  //const avgRating = calculateAvgRating([4, 3, 1, 5, 2, 1, 3, 5, 4]);

  return (
    <Link
      href={`/books/${book._id}`}
      className="max-w-[210px] w-full flex flex-col hover:scale-110 transition ease-in"
    >
      {/* image area */}
      <div className="border border-[#CBCBCB] hover:border-modern-primary py-6 px-10 max-w-48 h-52 max-h-52 relative mb-6">
        {/* trash icon to remove book from wishlist */}
        {isWishList && (
          <div className="absolute top-3 right-3">
            <TrashIcon />
          </div>
        )}
        {/* book thumbnail */}
        <img src={book.imageUrl} alt={book.title} className="h-full" />
      </div>
      {/* title, author & rating area */}
      <div className="flex flex-col gap-y-2.5">
        {/* title */}
        <h2 className="font-medium font-raleway text-2xl">{book.title}</h2>
        {/* author */}
        {book.authors.map((author, index) => (
          <span key={index} className="text-primary-grey text-xl font-normal">
            {author}
          </span>
        ))}
        {/* rating */}
        {book.averageRating && renderStars(book.averageRating)}
      </div>
    </Link>
  );
};

export default BookCard;
