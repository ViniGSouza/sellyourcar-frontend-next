"use client";

import { useSession } from "next-auth/react";
import { GiCarWheel } from "react-icons/gi";
import { AccountMenu } from "../../../components/AccountMenu";
import { useEffect, useState } from "react";
import { DataCars } from "@/types/DataCars";
import { getMyCars } from "@/services/getCars";
import Link from "next/link";
import { deleteCar } from "@/services/deleteCar";
import { Loading } from "@/components/Loading";


export default function Account() {
  const [loading, setLoading] = useState<boolean>(true);
  const [cars, setCars] = useState<DataCars[]>([]);
  const { data: session, status } = useSession();

  const handleDelete = async (id: number) => {
    await deleteCar(id, session?.user?.token!);
    fetchCars();
  }

  async function fetchCars() {
    setLoading(true);
    if (status === "authenticated") {
      const cars = await getMyCars(session?.user?.token!);
      setCars(cars);
    } else {
      setCars([]);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchCars();
  }, []);

  return (

  <div className="min-h-screen md:grid grid-cols-2 gap-20 px-5 md:px-20 lg:px-40 items-start py-20">
    <div className="flex flex-col gap-3">
      <h2 className="text-5xl font-bold text-zinc-800 flex gap-3 items-center">
      <GiCarWheel size={32} className="text-blue-800" />
        Meu Painel
      </h2>
      <p className="text-md font-medium text-zinc-700">
        Olá, <span className="text-blue-700 font-semibold">{session?.user?.name}</span>. Aqui você ver seus carros e editá-los ou removê-los. Basta clicar no menu ao lado e escolher a opção que deseja.
      </p>
    </div>

    <div className="justify-center py-10 md:py-0 flex gap-2">
      <AccountMenu />
    </div>

    <div className="col-span-2">
      <h2 className="text-3xl font-bold text-zinc-800 text-center after:block after:w-16 after:h-1 after:rounded-lg after:mt-2 after:bg-blue-600 after:mx-auto">
        Meus carros
      </h2>

      <section className="grid gap-6 p-6 my-10 -translate-y-8 rounded-lg opacity-0 md:grid-cols-2 lg:grid-cols-3 animate-enter">
        {loading ? <Loading /> : cars && cars.map((car: DataCars) => (
          <div key={car.id} className="flex flex-col rounded border-[1px]">
              <img className="object-cover w-full rounded-t h-60" src={car.image_url} alt={car.name} />
              <div className="p-4">
                <h1 className="mt-3 text-xl font-semibold">{car.name}</h1>
                <p className="text-sm text-gray-600">{car.description}</p>
                <div className="flex flex-col">
                  <p className="mt-2 text-3xl font-bold text-gray-800"><span className="text-sm">
                    R$</span> {car.value}
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    <Link href={`/account/cars/edit/${car.id}`} className="w-full text-center px-3 py-2 mt-3 text-sm font-semibold text-white duration-150 ease-in-out bg-blue-700 rounded hover:bg-blue-800 hover:scale-95">
                      Editar Carro
                    </Link>
                    <button onClick={() => handleDelete(car.id)} className="w-full text-center px-3 py-2 mt-3 text-sm font-semibold text-white duration-150 ease-in-out bg-red-600 rounded hover:bg-red-800 hover:scale-95">
                      Apagar Carro
                    </button>
                  </div>
                </div>
              </div>
          </div>
        ))}
      </section>
    </div>
  </div>

  )
}