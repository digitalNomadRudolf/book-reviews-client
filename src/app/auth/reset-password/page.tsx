"use client";

import axiosInstance from "@/utils/axios";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import * as yup from "yup";

interface IFormInput {
  email: string;
  password: string;
  confirmPassword?: string;
}

const TIMEOUT = 3500;

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters long")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match"),
});

const ResetPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });
  const router = useRouter();

  const onSubmit = async (data: IFormInput) => {
    try {
      await axiosInstance.post("/users/reset-password", {
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
      });

      toast.success(
        "Password changed successfully! Redirecting to login page..."
      );
      setTimeout(() => {
        router.push("/auth/login");
      }, TIMEOUT);
    } catch (error) {
      toast.error("Failed to change password");
      console.error("Reset password error: ", error);
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
            Reset Password
          </h2>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Username</label>
            <input
              type="email"
              {...register("email")}
              className="input input-bordered w-full h-8 rounded-3xl border-gray-500"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>
          <div className="mb-6">
            <label className="block text-gray-700">New Password</label>
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
            Change Password
          </button>

          <ToastContainer />
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
