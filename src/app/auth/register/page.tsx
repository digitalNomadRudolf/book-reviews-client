"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "@/utils/axios";

interface IRegisterFormInput {
  username: string;
  email: string;
  password?: string;
  confirmPassword?: string;
}

const schema = yup.object().shape({
  username: yup.string().required("Username is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup.string().min(8, "Password must be at least 8 characters long"),
  confirmPassword: yup.string(),
});

const TIMEOUT = 3500;

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterFormInput>({
    resolver: yupResolver(schema),
  });
  const [apiError, setApiError] = useState("");
  const router = useRouter();

  const onSubmit = async (data: IRegisterFormInput) => {
    try {
      await axiosInstance.post("/api/users/register", {
        username: data.username,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
      });

      toast.success(
        "Registration successful! Redirecting to the login page...",
        {
          position: "top-center",
          autoClose: 3000,
        }
      );

      setTimeout(() => {
        router.push("/auth/login");
      }, TIMEOUT);
    } catch (error: any) {
      if (error?.response?.data) {
        setApiError(error.response.data.error);
      } else {
        setApiError("Sorry, an unexpected error ocurred.");
      }
      console.error(
        "Registration failed: ",
        error.response?.data?.message || error.message
      );
    }
  };

  return (
    <div className="min-h-screen mx-5 flex flex-col items-center justify-center bg-off-white">
      <h1 className="text-black mb-11 text-3xl">
        Book<span className="font-bold">Review</span>
      </h1>
      <div className="bg-white w-full md:w-[700px] shadow-custom-black pb-10">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white p-8 rounded mx-auto xs:w-full md:w-1/2"
        >
          <h2 className="text-center text-3xl font-medium mb-6">
            Create Account
          </h2>
          {apiError && <p className="text-red-500 text-sm mb-4">{apiError}</p>}
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Username</label>
            <input
              type="text"
              {...register("username")}
              className="input input-bordered w-full h-8 rounded-3xl border-gray-500"
              required
            />
            {errors.username && (
              <p className="text-red-500 text-sm">{errors.username.message}</p>
            )}
          </div>
          <div className="mb-6">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              {...register("email")}
              className="input input-bordered w-full h-8 rounded-3xl border-gray-500"
              required
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>
          <div className="mb-6">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              {...register("password")}
              className="input input-bordered w-full h-8 rounded-3xl border-gray-500"
              required
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>
          <div className="mb-6">
            <label className="block text-gray-700">Confirm Password</label>
            <input
              type="confirm Password"
              {...register("confirmPassword")}
              className="input input-bordered w-full h-8 rounded-3xl border-gray-500"
              required
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="btn bg-black text-white w-full h-8 min-h-0 mb-8 rounded-3xl"
          >
            Sign in
          </button>
          <p className="text-sm mb-6">
            By signing up, you agree to the terms of service and our privacy
            policy
          </p>
          <div className="flex">
            <p className="text-sm">Already have an account?</p>
            <Link
              href="/auth/login"
              className="text-black ml-2 text-sm underline hover:underline"
            >
              Sign in
            </Link>
          </div>

          <ToastContainer />
        </form>
      </div>
    </div>
  );
};

export default Register;
