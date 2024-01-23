import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import './globals.css';
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import NextAuthSessionProvider from "@/providers/sessionProvider";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "SellYourCar | Home",
  description: "Anuncie seu carro, sua máquina, sua nave ou como você preferir chamar. :)",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="pt-br">
      <body className={poppins.className}>
        <NextAuthSessionProvider>
          <Header />
            {children}
          <Footer />
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}
