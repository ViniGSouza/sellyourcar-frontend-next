import Link from "next/link";
import { IoLogOut } from "react-icons/io5";
import { MdAddBox, MdGarage } from "react-icons/md";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export const AccountMenu = () => {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({
      redirect: false
    })
    router.replace('/')
  }

  return (
    <div className="flex gap-2">
      <Link href="/account">
        <MdGarage size={40} className="text-blue-700 hover:text-blue-900 cursor-pointer border-[3px] border-blue-700 p-[2px] rounded duration-150 ease-in-out hover:border-blue-900" />
      </Link>
      <Link href="/account/postcar">
        <MdAddBox size={40} className="text-blue-700 hover:text-blue-900 cursor-pointer border-[3px] border-blue-700 p-[2px] rounded duration-150 ease-in-out hover:border-blue-900" />
      </Link>
      <button onClick={handleLogout}>
      <IoLogOut size={40} className="text-blue-700 hover:text-blue-900 cursor-pointer border-[3px] border-blue-700 p-[2px] rounded duration-150 ease-in-out hover:border-blue-900" />
      </button>
    </div>
  )
}