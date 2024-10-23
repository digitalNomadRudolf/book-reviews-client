import axios from "axios";

const GOOGLE_BOOKS_API = "https://www.googleapis.com/books/v1/volumes";

export const fetchBooks = async (query: string) => {
  const response = await axios.get(GOOGLE_BOOKS_API, {
    params: {
      q: query,
      maxResults: 20,
    },
  });
  return response.data.items;
};
