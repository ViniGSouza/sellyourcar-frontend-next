import { FaCarTunnel } from "react-icons/fa6"

export const Footer = () => {

  return (
    <footer className="flex items-center justify-between px-5 py-12 md:px-40 lg:px-72 bg-gradient-to-b from-blue-800 to-blue-900">
      <div className="mx-auto flex flex-col md:flex-row items-center text-white drop-shadow">
        <div className="flex items-center gap-3 mb-2 md:mb-0">
          <p className="text-xl text-center md:text-3xl font-semibold">SellYourCar</p>
          <FaCarTunnel size={32} />
        </div>
        <p className="md:ms-2 text-center">
          <span className="hidden md:inline-flex">-</span> O melhor site de vendas automotivas do Brasil.</p>
      </div>
    </footer>
  )
}