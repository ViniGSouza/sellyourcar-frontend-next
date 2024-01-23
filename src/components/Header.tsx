"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { FaCarTunnel } from "react-icons/fa6";
import { IoPersonCircleSharp } from "react-icons/io5";


export const Header = () => {
  const { data: session } = useSession();

  return (
    <header className="flex flex-col gap-3 md:flex-row md:gap-0 items-center justify-between p-5 md:px-40 lg:px-40 border-b shadow">
      <Link href="/" className="flex items-center bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent rounded gap-3">
        <p className="text-2xl font-bold">sellyourcar</p>
        <FaCarTunnel size={26} className="text-blue-800" />
      </Link>
      { session ?
        <Link href="/account" className="font-semibold text-blue-800 flex items-center gap-2">
         Olá, {session?.user?.name}. <IoPersonCircleSharp size={24} />
        </Link>
      : 
      <Link href="/login" className="px-4 py-2 text-xs font-semibold text-white duration-150 ease-in-out bg-blue-700 rounded hover:bg-blue-800 flex gap-2 items-center">
      <IoPersonCircleSharp size={20} />
        Fazer login
      </Link>}
  </header>
  )
}