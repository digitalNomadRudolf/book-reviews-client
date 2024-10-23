"use client";

import { Quote } from "@/types/quote";
import axiosInstance from "@/utils/axios";
import React, { useEffect, useState } from "react";

const QuoteCarousel = () => {
  // state for setting quotes
  const [quotes, setQuotes] = useState<Quote[] | []>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  // useEffect
  useEffect(() => {
    // fetchQuotes function for getting quotes from backend
    const fetchQuotes = async () => {
      try {
        const response = await axiosInstance.get("/api/quotes");
        // set the quotes in state
        setQuotes(response.data);
      } catch (error) {
        console.log("Error fetching quotes: ", error);
      }
    };
    // call fetchQuotes
    fetchQuotes();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) =>
        prevIndex === quotes.length - 1 ? 0 : prevIndex + 1
      );
    }, 10000);

    return () => clearInterval(interval);
  }, [quotes.length]);

  return (
    <div className="hidden md:block w-full relative h-[686px] overflow-hidden">
      <div className="absolute ml-[76px] font-raleway text-modern-primary text-center text-6xl font-bold inset-0 w-14 h-20 z-10 bg-white px-3 py-5">
        “
      </div>
      {quotes?.map((quote, index) => (
        <div
          key={index}
          className={`quote-carousel-item absolute transition-opacity duration-1000 ease-in-out w-full xl:bg-center ${
            index === activeIndex ? "opacity-100" : "opacity-0"
          } h-full`}
          style={{
            backgroundImage: `url(${quote.backgroundImage})`,
            backgroundSize: "cover",
          }}
        >
          <div
            className="absolute inset-0 bg-black opacity-50"
            style={{ opacity: 0.6 }}
          ></div>
          <div className="relative z-10 flex flex-col justify-center h-full mx-52">
            <p className="text-white text-6xl leading-[74px] mb-24">
              {quote.text}
            </p>
            {quote.author && (
              <p className="flex justify-end text-white mt-2 text-3xl italic mr-7 xl:mr-28">
                {quote.author}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuoteCarousel;
