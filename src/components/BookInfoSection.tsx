import React, { useState } from "react";

type BookInfoSection = {
  title: string;
  authors: string[];
  averageRating: number;
  renderStars(averageRating: number): React.JSX.Element;
  description: string;
  pageCount: number;
  publishedDate: string;
};

const BookInfoSection = ({
  authors,
  averageRating,
  description,
  pageCount,
  publishedDate,
  renderStars,
  title,
}: BookInfoSection) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="book-info flex flex-col gap-3 lg:max-w-2xl xl:max-w-4xl">
      <h1 className="text-modern-primary font-bold text-5xl leading-[0.8]">
        {title}
      </h1>
      <div className="author">
        {authors.map((author, index) => (
          <span key={index}>{author}</span>
        ))}
      </div>
      <div className="star-rating">{renderStars(averageRating)}</div>

      <div
        className={`description relative overflow-hidden transition-all duration-500 ease-in-out ${
          isExpanded ? "max-h-full" : ""
        }`}
      >
        <p
          className={`text-modern-primary transition-all leading-relaxed text-base font-bold duration-700 ${
            isExpanded ? "max-h-screen" : "max-h-32"
          }`}
        >
          {description}
        </p>

        {/* Gradient overlay for truncated text */}
        {!isExpanded && (
          <div className="absolute bottom-0 left-0 w-full h-10 bg-gradient-to-t from-off-white to-transparent pb-4"></div>
        )}
      </div>
      {/* Show More/Less button */}
      <button
        onClick={toggleDescription}
        className="text-modern-primary font-semibold text-base text-left"
      >
        {isExpanded ? "Show less" : "Show more"}
      </button>

      {/* Additional info */}
      <div className="flex flex-col mt-9 gap-3">
        <div className="flex flex-wrap">{pageCount} pages.</div>
        <span>First published {publishedDate}</span>
      </div>
    </div>
  );
};

export default BookInfoSection;
