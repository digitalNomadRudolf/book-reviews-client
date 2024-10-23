"use client";

import React, { FormEventHandler, useState } from "react";
import SearchForm from "./SearchForm";
import { useBookStore } from "@/stores/useBookStore";

const Hero = () => {
  const [initialQuery, setInitialQuery] = useState("");
  const setSearchQuery = useBookStore((state) => state.setSearchQuery);

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    setSearchQuery(initialQuery);
  };

  return (
    <section className="bg-off-white h-[600px]">
      <div className="container flex h-full items-center justify-between mx-auto">
        <div className="flex flex-col mb-6 md:w-6/12">
          <h1 className="text-5xl font-bold mb-11 text-modern-primary">
            Find your next literary adventure
          </h1>
          <SearchForm
            handleSubmit={handleSubmit}
            initialQuery={initialQuery}
            setInitialQuery={setInitialQuery}
          />
        </div>
        <img className="xl:mr-10" src="/images/HeroImage.png" alt="Books" />
      </div>
    </section>
  );
};

export default Hero;
