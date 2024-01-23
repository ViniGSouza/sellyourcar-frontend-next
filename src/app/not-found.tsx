import { Metadata } from "next";
import Link from "next/link";
import { GiFlatTire } from "react-icons/gi";

export const metadata: Metadata = {
  title: 'SellYourCar | 404',
}

export default function NotFound() {
  return (
    <div className="flex flex-col items-center min-h-screen justify-center opacity-0 animate-enter px-5">
      <h1 className="text-3xl md:text-5xl my-2 font-bold text-zinc-900 flex gap-3 items-center">
      <GiFlatTire size={40} className="text-blue-800"/>
        404 - Not Found
      </h1>
      <p className="text-lg md:text-2xl">A Página que você acessou <span className="text-red-600 font-semibold">não existe.</span></p>
      <p className="text-sm md:text-lg mt-5">Clique <Link href="/" className="text-blue-800 font-bold">aqui</Link> para voltar para a página inicial.</p>
    </div>
  )
}