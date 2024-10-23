import BookCarousel from "@/components/BookCarousel";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import SectionContainer from "@/components/SectionContainer";
import TextContainer from "@/components/TextContainer";
import TitleContainer from "@/components/TitleContainer";
import { Book } from "@/types/book";
import Head from "next/head";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { DecodedToken } from "@/types/token";
import axiosInstance from "@/utils/axios";
import QuoteCarousel from "@/components/QuoteCarousel";
import GenreSection from "@/components/GenreSection";
import Footer from "@/components/Footer";

export default async function Home() {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;

  let userId = null;
  let decodedToken = null;
  let wishlist = [];
  let books: Book[] = [];

  if (token) {
    try {
      const decoded = jwt.verify(
        token,
        process.env.NEXT_PUBLIC_JWT_SECRET ?? ""
      ) as DecodedToken;
      userId = decoded.userId;
      decodedToken = decoded;

      const [wishlistResponse, booksResponse] = await Promise.all([
        axiosInstance.get(
          `${process.env.NEXT_PUBLIC_API_URL}api/users/${userId}/wishlist`
        ),
        axiosInstance.get(`${process.env.NEXT_PUBLIC_API_URL}api/books`),
      ]);

      wishlist = wishlistResponse.data;
      books = booksResponse.data;
    } catch (error) {
      console.log("something went wrong with verifying the token", error);
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>BookReviews: Find Your Next Literary Adventure</title>
        <meta
          name="description"
          content="Dive into a Sea of Stories with BookReviews"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Hero />
      <SectionContainer>
        <TitleContainer
          className="bg-white text-center"
          title="Dive into a Sea of Stories with BookReviews"
          coloredText={{ color: "#3A7CA5", text: "Sea of Stories" }}
        />
        <TextContainer
          text="Feeling shelf-ish about your reading list? At BookReviews, we believe that finding your next great read shouldn't be a tough shelf to climb. Dive into our treasure trove of book reviews and let us guide you through the literary waves with a smile!"
          className="text-center mt-12"
        />
      </SectionContainer>
      <SectionContainer fullWidth className="overflow-x-hidden">
        <TitleContainer title="Most Liked" className="text-center pb-20" />
        <BookCarousel
          books={books}
          decodedToken={decodedToken as DecodedToken}
        />
      </SectionContainer>
      <SectionContainer fullWidth>
        <QuoteCarousel />
      </SectionContainer>
      <SectionContainer>
        <GenreSection />
      </SectionContainer>
      <Footer />
    </div>
  );
}
