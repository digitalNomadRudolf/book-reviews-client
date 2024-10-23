import { Book } from "@/types/book";
import axiosInstance from "@/utils/axios";
import axios from "axios";
import { create } from "zustand";

const ITEMS_PER_PAGE = 5;

export interface BookStoreState {
  books: Book[];
  currentPage: number;
  totalPages: number;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  fetchBooks: (page?: number) => void;
  nextPage: () => void;
  prevPage: () => void;
}

export const useBookStore = create<BookStoreState>((set, get) => ({
  books: [],
  currentPage: 1,
  totalPages: 1,
  searchQuery: "",
  setSearchQuery: (query: string) => {
    set({ searchQuery: query, currentPage: 1 });
    get().fetchBooks(1); // fetch books for the first page with the new query
  },
  fetchBooks: async (page = get().currentPage) => {
    const { searchQuery } = get();
    try {
      const response = await axiosInstance.get("/api/search", {
        params: {
          page,
          limit: ITEMS_PER_PAGE,
          query: searchQuery,
        },
      });
      set({
        books: response.data.books,
        totalPages: Math.ceil(response.data.totalCount / ITEMS_PER_PAGE),
        currentPage: page,
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          return Promise.reject({
            message: "No books found for the given query.",
            status: 404,
          });
        }
      }
      return Promise.reject({
        message: "Something went wrong while fetching the books.",
        status: 500,
      });
    }
  },
  nextPage: () => {
    const { currentPage, totalPages, fetchBooks } = get();
    if (currentPage < totalPages) {
      fetchBooks(currentPage + 1);
    }
  },
  prevPage: () => {
    const { currentPage, fetchBooks } = get();
    if (currentPage > 1) {
      fetchBooks(currentPage - 1);
    }
  },
}));
