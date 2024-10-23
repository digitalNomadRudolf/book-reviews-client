import React, { useState } from "react";
import { EditorProvider } from "@tiptap/react";
import EditorToolbar from "./EditorToolbar";
import { useCustomEditor } from "@/hooks/useCustomEditor";
import StarRating from "./StarRating";
import axiosInstance from "@/utils/axios";
import useUser from "@/hooks/useUser";

type ReviewModalProps = {
  bookId: string;
  onClose(): void;
  setReviewedBook(isReviewed: boolean): void;
};

const ReviewModal = ({
  bookId,
  onClose,
  setReviewedBook,
}: ReviewModalProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [rating, setRating] = useState<number>(0);
  const [reviewText, setReviewText] = useState("");

  const { extensions } = useCustomEditor();
  const { user } = useUser();

  const handleSubmitReview = async () => {
    try {
      const reviewData = {
        userName: user?.username,
        userId: user?.userId,
        rating,
        reviewText,
        bookId,
        reviewDate: new Date(),
        likeCount: 0,
        commentIds: [],
      };

      // Make API call to BE to add review
      const response = await axiosInstance.post(
        `/api/books/${bookId}/reviews`,
        reviewData
      );

      if (response.status === 201) {
        // Handle successful review submission by showing a toast message
        console.log("Review submitted successfully: ", response.data);

        // Re-fetch reviews to ensure "Rate this book text is updated"
        const reviewResponse = await axiosInstance.get(
          `/api/books/${bookId}/reviews/getReviewByUser/${user?.userId}`
        );

        const review = reviewResponse.data.review;
        const isReviewed = review.bookId === bookId;
        setReviewedBook(isReviewed);
      }

      // Reset rating and close modal
      setRating(0);
      setReviewText("");
      onClose();
    } catch (error) {
      console.log("Error submitting review: ", error);
    }
  };

  const handleCloseModal = () => {
    setRating(0);
    onClose();
  };

  const handleStarClick = (selectedRating: number) => {
    setRating(selectedRating);
  };

  const renderSteps = (currentStep: number) => {
    return currentStep === 1 ? (
      <div className="flex flex-col flex-grow">
        <h1 className="text-xl font-semibold p-5 bg-blue-cream text-white">
          Step 1: Rate book
        </h1>

        <div className="flex flex-col px-5 py-8 text-center flex-grow">
          <h2 className="text-3xl font-semibold">
            How many stars would you rate this book?
          </h2>

          <StarRating onRatingChange={handleStarClick} />
          <div className="flex justify-between mt-auto mx-auto">
            <button
              onClick={() => setCurrentStep(2)}
              className="border rounded border-transparent p-3 bg-blue-cream text-white hover:bg-white hover:border hover:border-blue-cream hover:text-blue-cream transition-all"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    ) : (
      <>
        <h1 className="text-xl font-semibold p-5 bg-blue-cream text-white">
          Step 2: Write your Review (Optional)
        </h1>

        <div className="flex flex-col px-5 py-8 gap-4">
          <EditorProvider
            slotBefore={<EditorToolbar />}
            extensions={extensions}
            autofocus
            editorProps={{
              attributes: {
                class:
                  "border-[1px] border-black focus:outline-none focus:outline-none rounded min-h-48 p-3 prose prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl prose-h4:text-xl prose-h5:text-lg prose-h6:text-base !max-w-none !max-h-[200px] !overflow-y-scroll",
              },
            }}
            onUpdate={({ editor }) => {
              const htmlContent = editor.getHTML();
              setReviewText(htmlContent);
            }}
          ></EditorProvider>

          <div className="flex justify-between">
            <button
              onClick={() => setCurrentStep(1)}
              className="border rounded border-transparent p-3 bg-blue-cream text-white hover:bg-white hover:border hover:border-blue-cream hover:text-blue-cream transition-all"
            >
              Previous
            </button>
            <button
              onClick={handleSubmitReview}
              className="border rounded border-transparent p-3 bg-blue-cream text-white hover:bg-white hover:border hover:border-blue-cream hover:text-blue-cream transition-all"
            >
              Place Review
            </button>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={handleCloseModal}
      ></div>

      <div className="flex flex-col bg-white z-[100] min-w-[50%] max-w-[50%] max-h-[50%] min-h-[350px]">
        {renderSteps(currentStep)}
      </div>
    </div>
  );
};

export default ReviewModal;
