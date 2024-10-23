"use client";

import BookList from "@/components/BookList";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import SearchForm from "@/components/SearchForm";
import TitleContainer from "@/components/TitleContainer";
import { useBookStore } from "@/stores/useBookStore";
import axios from "axios";
import Head from "next/head";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const SearchResults = () => {
  const {
    books,
    currentPage,
    totalPages,
    setSearchQuery,
    nextPage,
    prevPage,
    fetchBooks,
  } = useBookStore();

  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  const [error, setError] = useState<string | null>("");
  // useEffect that is called each time the query changes
  useEffect(() => {
    // do nothing if there is no query
    if (query) {
      // set search query
      setSearchQuery(query);

      const fetchBooksWithErrorHandling = async () => {
        try {
          await fetchBooks(1);
          setError(null);
        } catch (err) {
          console.log("something going wrong");
          if (axios.isAxiosError(err) && err.response?.status === 404) {
            setError(`No books found for your query: ${query}`);
          } else {
            // Set generic error message
            setError("An error occurred while fetching books");
          }
        }
      };

      fetchBooksWithErrorHandling();
    }
  }, [query, fetchBooks, setSearchQuery]);

  const setLocalQuery = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>
          BookReviews: Search and Find Your Next Literary Adventure.
        </title>
        <meta
          name="description"
          content="BookReviews: Search and Find Your Next Literary Adventure"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className="mx-auto w-screen max-w-screen-lg flex-grow">
        {/* Title div with search results query */}
        <TitleContainer
          title={`Search results: ${query}`}
          className="text-center pt-24 mb-20 bg-none"
        />
        {/* SearchForm */}
        <SearchForm
          initialQuery={query as string}
          setInitialQuery={setLocalQuery}
        />
        {/* Search Results Grid */}
        {error ? (
          <div className="error-message py-3">
            No books found for query:{" "}
            <span className="font-semibold">{query}</span>
          </div>
        ) : (
          <BookList
            books={books}
            currentPage={currentPage}
            nextPage={nextPage}
            prevPage={prevPage}
            totalPages={totalPages}
          />
        )}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default SearchResults;
