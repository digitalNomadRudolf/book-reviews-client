import React, { ReactNode } from "react";

interface SectionContainerProps {
  children: ReactNode;
  className?: string;
  fullWidth?: boolean;
}

const SectionContainer = ({
  children,
  className,
  fullWidth,
}: SectionContainerProps) => {
  return (
    <section className={`bg-white py-14 ${className}`}>
      <div className={`${fullWidth ? "" : "mx-auto"}`}>{children}</div>
    </section>
  );
};

export default SectionContainer;
