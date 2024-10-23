"use client";

import React from "react";
import Link from "next/link";
import useUser from "@/hooks/useUser";
import BookIcon from "@/Icons/BookIcon";
import WishListIcon from "@/Icons/WishListIcon";

const Header = () => {
  const { user, logout } = useUser();

  return (
    <header className="w-full h-20 bg-blue-cream">
      <div className="container mx-auto h-full max-w-desktop flex justify-between items-center font-raleway">
        <div className="text-2xl text-white">
          <Link href="/">
            <span>Book</span>
            <span className="font-semibold">Review</span>
          </Link>
        </div>

        {!user ? (
          <div>
            <Link
              className="w-44 text-2xl btn rounded-3xl bg-blue-cream border-none text-white hover:bg-white hover:text-modern-primary mr-8"
              href="/auth/register"
            >
              sign up
            </Link>
            <Link
              className="w-44 text-2xl btn rounded-3xl bg-modern-secondary border-none text-modern-primary hover:bg-modern-primary hover:text-white"
              href="/auth/login"
            >
              login
            </Link>
          </div>
        ) : (
          <div className="flex text-xl text-white gap-9">
            <div className="flex gap-3 items-center">
              <BookIcon fillColor="#3A7CA5" />
              <Link href="/my-books">my books</Link>
            </div>

            <div className="flex gap-3 items-center">
              <WishListIcon fillColor="#3A7CA5" />
              <Link href="/wishlist">wishlist</Link>
            </div>

            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="avatar placeholder">
                <div className="bg-modern-accent w-11 rounded-full">
                  <span>{user.username.charAt(0).toUpperCase()}</span>
                </div>
              </div>
              <ul className="dropdown-content menu min-w-[180px] bg-white font-semibold text-base text-blue-cream rounded-box rounded-bl-none rounded-br-none w-fit border-2 p-0 mt-1 border-blue-cream">
                <li className="text-blue-cream hover:text-white rounded-none">
                  <a
                    className="dropdown-item pl-4 hover:bg-blue-cream rounded-bl-none rounded-br-none focus:bg-transparent active:bg-transparent"
                    href="/profile"
                  >
                    Profile settings
                  </a>
                </li>
                <li className="text-blue-cream hover:text-white rounded-none">
                  <button
                    className="dropdown-item pl-4 hover:bg-blue-cream rounded-none focus:bg-transparent active:bg-transparent"
                    onClick={logout}
                  >
                    Log out
                  </button>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
