import React from "react";
import BookDetails from "./BookDetail";
import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

type BookDetailPageProps = {
  params: {
    id: string;
  };
};

async function getBook(bookId: string) {
  const res = await fetch(`http://localhost:5000/api/books/${bookId}`);

  if (!res.ok) {
    throw new Error("Failed to fetch book data");
  }

  const book = await res.json();
  return book;
}

export default async function BookDetailPage({ params }: BookDetailPageProps) {
  const { id } = params;
  const book = await getBook(id);
  console.log({ book });

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
      <BookDetails book={book} />
      <Footer />
    </div>
  );
}
