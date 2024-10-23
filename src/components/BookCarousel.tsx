"use client";

import WishListIcon from "@/Icons/WishListIcon";
import { Book } from "@/types/book";
import React, { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import axiosInstance from "../utils/axios";
import { DecodedToken } from "@/types/token";

interface BookCarouselProps {
  books: Book[];
  decodedToken: DecodedToken;
}

const BookCarousel = ({ books, decodedToken }: BookCarouselProps) => {
  const [wishlist, setWishlist] = useState<Book[]>([]);
  const { userId } = decodedToken || {};

  // TODO: If no user, books still need to render properly

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await axiosInstance.get(
          `/api/users/${userId}/wishlist`
        );
        console.log({ response });
        setWishlist([...response.data]);
        console.log({ wishlist });
      } catch (error) {
        console.log("Error fetching wishlist: ", error);
      }
    };

    fetchWishlist();
  }, [userId]);

  useEffect(() => {
    console.log("Updated wishlist:", wishlist);
  }, [wishlist]);

  console.log("Wishlist:", wishlist);

  const handleWishlistToggle = async (book: Book) => {
    console.log("toggle wishlist!");
    const isInWishlist = wishlist.some((item) => item._id === book._id);
    try {
      // check if in wishlist
      if (isInWishlist) {
        console.log("in wishlist");
        // axios post request to remove from wishlist
        await axiosInstance.post(`/api/users/${userId}/wishlist/remove`, {
          bookId: book._id,
        });
        // update wishlist using setWishlist
        setWishlist(wishlist.filter((item) => item._id !== book._id));
      } else {
        // otherwise, axios post to add to wishlist
        await axiosInstance.post(`/api/users/${userId}/wishlist/add`, {
          bookId: book._id,
        });
        // update wishlist using setWishlist
        setWishlist((prevWishlist) => [...prevWishlist, book]);
        console.log({ wishlist });
      }
    } catch (error) {
      console.error("Error toggling wishlist: ", error);
    }
  };

  return (
    <div className="carousel rounded-box w-full ml-[-80px]">
      {books.map((book) => (
        <div key={book._id + uuid()} className="carousel-item mx-10">
          <div className="book-box max-w-64 bg-white relative">
            <div
              onClick={() => {
                console.log({ book });
                console.log({ wishlist });
                handleWishlistToggle(book);
              }}
              className="absolute z-30 flex cursor-pointer justify-center items-center bg-modern-primary w-11 h-11 rounded-full top-4 right-4"
            >
              <WishListIcon
                fillColor={
                  wishlist?.some((item) => item._id === book._id) ? "white" : ""
                }
              />
            </div>
            <img
              src={book.imageUrl}
              alt={book.title}
              className="w-full h-[408px] object-cover"
            />
            <h3 className="font-bold text-2xl py-5 pl-3 text-modern-primary">
              {book.title}
            </h3>
            <p className="pl-3 mx-10 w-full">
              {book.authors?.map((author, index) => {
                if (index !== book.authors.length - 1) {
                  return (
                    <span key={index}>
                      <span className="text-base text-left text-modern-accent font-light">
                        {author} &
                      </span>
                      <br />
                    </span>
                  );
                }
                return (
                  <span
                    key={index}
                    className="text-base text-left text-modern-accent font-light"
                  >
                    {author}
                  </span>
                );
              })}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookCarousel;
