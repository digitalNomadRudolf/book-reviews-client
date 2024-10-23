import React from "react";

interface TextContainerProps {
  text: string;
  className?: string;
}

const TextContainer = ({ text, className }: TextContainerProps) => {
  return (
    <p
      className={`font-light text-2xl text-modern-primary tracking-wide leading-8 w-3/5 mx-auto ${className}`}
    >
      {text}
    </p>
  );
};

export default TextContainer;
