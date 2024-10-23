"use client";

import { useRouter } from "next/navigation";
import React, { FormEventHandler, useEffect, useState } from "react";

interface SearchFormProps {
  initialQuery: string;
  setInitialQuery: (query: string) => void;
  handleSubmit?: (e: React.FormEvent) => void;
}

const SearchForm = ({ initialQuery, setInitialQuery }: SearchFormProps) => {
  const router = useRouter();
  const [localQuery, setLocalQuery] = useState(initialQuery);

  useEffect(() => {
    if (initialQuery !== localQuery) {
      setLocalQuery(initialQuery);
    }
  }, [initialQuery]);

  // handleSearch function that preventsDefault & doesnt do anything if query is empty string
  const handleSearch: FormEventHandler = (e) => {
    e.preventDefault();

    if (localQuery) {
      // Redirect to the search results page with the query as a URL parameter
      router.push(`/search?query=${encodeURIComponent(localQuery)}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex items-center">
      <input
        type="text"
        placeholder="Title, author, name, publisher..."
        className="input border-black input-primary w-full h-11 max-w-md mr-2"
        value={localQuery}
        onChange={(e) => setLocalQuery(e.target.value)}
      />
      <button
        type="submit"
        className="btn w-36 h-11 font-normal text-xl font-raleway text-white bg-blue-cream hover:text-white hover:bg-black rounded-xl ml-4"
      >
        search
      </button>
    </form>
  );
};

export default SearchForm;
