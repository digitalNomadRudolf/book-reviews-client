import React from "react";

interface FullStarIconProps {
  size: "small" | "medium" | "large";
}

const sizeMapper = {
  small: "24",
  medium: "32",
  large: "48",
};

const FullStarIcon = ({ size }: FullStarIconProps) => (
  <svg
    width={sizeMapper[size] || "24"}
    height={sizeMapper[size] || "24"}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5.825 22L7.45 14.975L2 10.25L9.2 9.625L12 3L14.8 9.625L22 10.25L16.55 14.975L18.175 22L12 18.275L5.825 22Z"
      fill="#FFCC00"
    />
  </svg>
);

export default FullStarIcon;
