"use client";

import { Book } from "@/types/book";
import axiosInstance from "@/utils/axios";
import React, { useEffect, useState } from "react";

const GenreSection = () => {
  const [genres, setGenres] = useState<string[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axiosInstance.get(
          `${process.env.NEXT_PUBLIC_API_URL}api/books`
        );
        console.log(response.data);

        const books = response.data as Book[];

        // Extract & aggregate genres (categories)
        const genreSet = new Set();
        books.forEach((book) => {
          if (book.categories) {
            book.categories.forEach((category) => {
              genreSet.add(category);
            });
          }
        });

        const sortedGenres = Array.from(genreSet).sort((a, b) =>
          (a as string).localeCompare(b as string)
        );

        setGenres(sortedGenres as string[]);
      } catch (error) {
        console.log("something went wrong fetching the books...");
      }
    };

    fetchBooks();
  }, []);

  return (
    <div className="py-8 mx-auto md:max-w-screen-lg xl:max-w-screen-xl">
      <h2 className="text-3xl font-bold mb-14 text-center lg:text-left">
        Browse by genre
      </h2>
      <div className="flex justify-center md:grid lg:justify-normal">
        <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-x-3 md:gap-3 lg:grid-cols-[repeat(auto-fit,minmax(300px,1fr))] xl:gap-5">
          {genres.map((genre, index) => (
            <a
              key={index}
              href={`/genres/${genre
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/^-|-$/g, "")}`}
              className="block underline text-2xl text-modern-primary hover:underline"
            >
              {genre}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GenreSection;
