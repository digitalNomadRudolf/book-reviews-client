"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ToastContainer, toast } from "react-toastify";
import Cookies from "js-cookie";
import useUser from "@/hooks/useUser";
import { jwtDecode } from "jwt-decode";
import { UserType } from "@/types/user";
import axiosInstance from "@/utils/axios";

interface IFormInput {
  email: string;
  password: string;
}

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

const TIMEOUT = 3500;

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });

  // Error if something goes wrong logging in
  const [apiError, setApiError] = useState("");
  // Remember me flag
  const [rememberMe, setRememberMe] = useState(false);
  // import useRouter
  const router = useRouter();
  const { user, setUser, logout } = useUser();

  // handleSubmit async function with a React FormEvent
  const onSubmit = async (data: IFormInput) => {
    try {
      // use signIn function from next-auth/react
      // res = the signIn function with redirect to false and the email and password passed
      const response = await axiosInstance.post("/api/users/login", {
        email: data.email,
        password: data.password,
        rememberMe,
      });
      // if there is a res ok
      if (response.data) {
        const token = response.data.token;
        Cookies.set("token", token, { expires: rememberMe ? 7 : 1 });
        const decodedUser = jwtDecode<UserType>(token);
        setUser(decodedUser);
        router.refresh();

        toast.success("Logged in successfully! Redirecting to home page...", {
          position: "top-center",
          autoClose: 3000,
        });
        // push to the main page '/' using router
        setTimeout(() => {
          router.push("/");
        }, TIMEOUT);
      }
    } catch (error: any) {
      if (error?.response?.data) {
        setApiError(error.response.data.error);
      } else {
        setApiError("Sorry, an unexpected error occurred.");
      }
    }
  };

  if (user) {
    router.push("/");
  }

  return (
    <div className="min-h-screen mx-5 flex flex-col items-center justify-center bg-off-white">
      <h1 className="text-black mb-11 text-3xl">
        Book<span className="font-bold">Review</span>
      </h1>
      <div className="bg-white sm:w-full md:w-[700px] shadow-custom-black pb-10">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white p-8 rounded mx-auto xs:w-full md:w-1/2"
        >
          <h2 className="text-center text-3xl font-medium mb-6">Sign In</h2>
          {apiError && <p className="text-red-500 text-sm mb-4">{apiError}</p>}
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Email</label>
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
            <div className="flex justify-between">
              <label className="block text-gray-700 mb-2">Password</label>
              <Link
                href="/auth/reset-password"
                className="text-black text-sm underline mt-0.5 hover:underline"
              >
                Forgot password?
              </Link>
            </div>
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
          <button
            type="submit"
            className="btn bg-black text-white w-full h-8 min-h-0 mb-8 rounded-3xl"
          >
            Sign in
          </button>
          <p className="text-sm mb-6">
            By signing in, you agree to the terms of service and our privacy
            policy
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center mb-8">
              <input
                type="checkbox"
                name="rememberCheckbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                className="checkbox checkbox-xs rounded-none border-black mr-2.5"
              />
              <label className="text-sm text-gray-700">Keep me signed in</label>
            </div>
          </div>
          <div className="flex">
            <p className="text-sm">Don’t have an account yet?</p>
            <Link
              href="/auth/register"
              className="text-black ml-2 text-sm underline hover:underline"
            >
              Sign up
            </Link>
          </div>

          <ToastContainer />
        </form>
      </div>
    </div>
  );
};

export default SignIn;
