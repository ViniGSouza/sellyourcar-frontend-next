import { Loading } from "@/components/Loading";
import { getCars } from "@/services/getCars";
import { DataCars } from "@/types/DataCars";

export const revalidate = 60;

export default async function Home() {
  const cars = await getCars();
  const sortedCars = cars.sort((a: DataCars, b: DataCars) => a.value - b.value);
  
  return (
    <main className="flex flex-col items-center py-10 px-3 md:p-20 min-h-screen">
      <h1 className="text-3xl font-bold text-zinc-800 mb-2 text-center">Seja bem-vindo ao SellYourCar!</h1>

      <p className="font-semibold text-center text-gray-600 md:mt-0">Aqui você pode <span className="text-blue-600">anunciar seu veículo</span> ou encontrar <span className="text-blue-600">o carro dos seus sonhos</span>, confira as opções abaixo.</p>


      <section className="grid gap-6 p-6 my-10 -translate-y-8 rounded-lg opacity-0 md:grid-cols-2 lg:grid-cols-3 animate-enter">

    {sortedCars ? sortedCars.map((car: DataCars) => (
      <div key={car.id} className="flex flex-col rounded border-[1px]">
        <img className="object-cover w-full rounded-t h-60" src={car.image_url} alt={car.name} />
        <div className="flex flex-col flex-grow p-4">
          <h1 className="mt-3 text-xl font-semibold">{car.name}</h1>
          <p className="text-sm text-gray-600">{car.description}</p>
          <div className="flex flex-col mt-auto">
            <p className="mt-2 text-3xl font-bold text-gray-800"><span className="text-sm">R$</span> {car.value}</p>
            <a href={`https://api.whatsapp.com/send?phone=+55${car.carOwnerPhone}&text=Olá%2C+vi+seu+anúncio+no+SellYourCar+e+tenho+interesse+na+compra+do+veículo.`} target="_blank" className="w-full text-center px-3 py-2 mt-3 text-sm font-bold text-white duration-150 ease-in-out bg-blue-600 rounded hover:bg-blue-800 hover:scale-95">
              Comprar agora
            </a>
          </div>
        </div>
      </div>
    )) : <Loading />}


      </section>
    </main>
  )
}