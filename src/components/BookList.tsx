import React, { useEffect, useState } from "react";
import { BookStoreState, useBookStore } from "@/stores/useBookStore";
import BookCard from "./BookCard";

type BookListPropsType = Omit<
  BookStoreState,
  "fetchBooks" | "searchQuery" | "setSearchQuery"
>;

const BookList = ({
  books,
  currentPage,
  totalPages,
  prevPage,
  nextPage,
}: BookListPropsType) => {
  const renderPagination = () => {
    const pageNumbers = [];
    // Always show the first page
    // Show the last page
    // Show some pages around the current page
    // If there are pages between page 1 and the first of the nearby pages, add ... for showing these pages are skipped in the pagination
    // Same with the pages between the last page and the last of the nearby pages
    // We want 5 pages to be visible maximum
    const maxPageNumbers = 5;
    // Show the current page and a few pages before and after it. If we're showing 5 pages, we show the current page in the middle and 2 pages to the left of it and 2 to the right
    const halfVisible = Math.floor((maxPageNumbers - 2) / 2); // Reserve space for the first and last page
    // Display a block of pages centered around the currentPage. e.g: 48, 49, 50, 51, 52
    // startPage is the currentPage - halfVisible, endPage is the currentPage + halfVisible
    let startPage = Math.max(2, currentPage - halfVisible); // Max to make sure 2 is the minimum because we always show 1 anyway and it cant be 0 or negative
    let endPage = Math.min(totalPages - 1, currentPage + halfVisible); // endPage need to be stopped before the last page / dont go beyond last page

    // adjust for if page is out of bounds
    // current page is too close to the start
    if (currentPage <= halfVisible + 2) {
      startPage = 2;
      endPage = Math.min(totalPages - 1, maxPageNumbers - 1);
    } else if (currentPage >= totalPages - halfVisible - 1) {
      // current page is too close to the end
      // set endPage to second to last page
      endPage = totalPages - 1;
      startPage = Math.max(2, totalPages - (maxPageNumbers - 2));
    }

    pageNumbers.push(
      <button
        key={1}
        onClick={() => useBookStore.getState().fetchBooks(1)}
        className={`px-3 py-1 ${
          currentPage === 1 ? "text-white bg-blue-500" : "text-blue-500"
        }`}
      >
        1
      </button>
    );

    if (startPage > 2) {
      pageNumbers.push(
        <span key="start-ellipsis" className="px-2">
          ...
        </span>
      );
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          className={`px-3 py-1 ${
            currentPage === i ? "underline font-bold" : "text-black"
          }`}
          onClick={() => useBookStore.getState().fetchBooks(i)}
        >
          {i}
        </button>
      );
    }

    if (endPage < totalPages - 1) {
      pageNumbers.push(
        <span key="end-ellipsis" className="px-3">
          ...
        </span>
      );
    }

    if (totalPages > 1) {
      pageNumbers.push(
        <button
          key={totalPages}
          onClick={() => useBookStore.getState().fetchBooks(totalPages)}
          className={`px-3 py-1 ${
            currentPage === totalPages ? "underline font-bold" : "text-black"
          }`}
        >
          {totalPages}
        </button>
      );
    }

    return pageNumbers;
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-x-3 md:gap-3 lg:grid-cols-[repeat(auto-fit,minmax(210px,210px))] lg:gap-9 mt-14">
        {books?.map((book, index) => (
          <BookCard key={index} book={book} />
        ))}
      </div>

      {/* pagination */}
      <div className="my-24 text-center flex items-center text-xl justify-center">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className={currentPage === 1 ? "text-primary-grey" : "text-black"}
        >
          Previous
        </button>

        <div className="flex space-x-4 mx-6">{renderPagination()}</div>

        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className={
            currentPage === totalPages ? "text-primary-grey" : "text-black"
          }
        >
          Next
        </button>
      </div>
    </>
  );
};
export default BookList;
