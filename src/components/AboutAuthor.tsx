import axiosInstance from "@/utils/axios";
import React, { useEffect, useState } from "react";

type AboutAuthorSectionProps = {
  authors: string[];
};

const AboutAuthorSection = ({ authors }: AboutAuthorSectionProps) => {
  const [totalBooks, setTotalBooks] = useState(0);

  useEffect(() => {
    const fetchBookCount = async () => {
      try {
        const response = await axiosInstance.post("/api/books/count", {
          authors,
        });
        setTotalBooks(response.data.totalBooks);
      } catch (error) {
        console.error("Error fetching book count: ", error);
      }
    };

    fetchBookCount();
  }, [authors]);

  return (
    <div className="md:max-w-screen-lg xl:max-w-screen-xl mx-auto w-full bg-modern-secondary">
      <h1 className="mb-6 font-medium text-xl">About the Author</h1>
      <div className="authors-wrapper">
        {authors?.map((author, index) => {
          console.log({ author });
          const authorLastName = author.split(" ")[1].charAt(0);
          console.log({ authorLastName });

          return (
            <div className="author flex items-center">
              <div className="avatar placeholder pr-6">
                <div className="bg-neutral justify-center text-neutral-content w-16 rounded-full">
                  <span className="text-3xl">{authorLastName}</span>
                </div>
              </div>
              <div className="flex flex-col">
                <div className="font-medium text-base">{author}</div>

                <div>{totalBooks} books</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AboutAuthorSection;
