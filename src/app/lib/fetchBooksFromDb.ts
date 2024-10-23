import axiosInstance from "@/utils/axios";

const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/";

export const fetchBooksFromDb = async () => {
  try {
    const response = await axiosInstance.get(`/api/books`);
    return response.data;
  } catch (error: any) {
    console.error(
      "Error fetching books from database: ",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};
