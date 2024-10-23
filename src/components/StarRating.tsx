import EmptyStarIcon from "@/Icons/EmptyStarIcon";
import FullStarIcon from "@/Icons/FullStarIcon";
import React, { useState } from "react";

interface StarRatingProps {
  onRatingChange(rating: number): void;
}

const StarRating = ({ onRatingChange }: StarRatingProps) => {
  const [rating, setRating] = useState<number>(0);
  const [hoveredStar, setHoveredStar] = useState<number | null>(null);

  const handleMouseEnter = (index: number) => setHoveredStar(index);
  const handleMouseLeave = () => setHoveredStar(null);
  const handleClick = (index: number) => {
    setRating(index);
    onRatingChange(index); // notify parent about rating change
  };

  return (
    <div className="flex items-center mt-8 justify-center">
      {[1, 2, 3, 4, 5].map((index) => (
        <span
          key={index}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={() => handleMouseLeave}
          onClick={() => handleClick(index)}
          className="cursor-pointer"
        >
          {hoveredStar && index <= hoveredStar ? (
            <FullStarIcon size="large" />
          ) : rating && index <= rating ? (
            <FullStarIcon size="large" />
          ) : (
            <EmptyStarIcon size="large" />
          )}
        </span>
      ))}
    </div>
  );
};

export default StarRating;
