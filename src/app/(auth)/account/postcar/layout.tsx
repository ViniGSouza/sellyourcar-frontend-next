import { nextAuthOptions } from "@/utils/auth";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "SellYourCar | Adicionar Carro",
  description: "Anuncie seu carro, sua máquina, sua nave ou como você preferir chamar. :)",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(nextAuthOptions);
  !session && redirect("/");
  
  return (
    <>
      {children}
    </>
  );
}

