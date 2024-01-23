"use client";

import Link from "next/link";
import Image from "next/image";
import { GiCarWheel } from "react-icons/gi";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { registerUser } from "@/services/register";
import InputField from "../../components/Input";

const schema = z.object({
  name: z.string().min(3, { message: 'O campo deve ter pelo menos 3 caracteres' }).max(100, { message: 'O campo deve ter no máximo 100 caracteres' }),
  email: z.string().email({ message: 'Email inválido' }),
  password: z.string().min(6, { message: 'A senha deve ter pelo menos 6 caracteres' }).max(100, { message: 'A senha deve ter no máximo 100 caracteres' }),
  phone: z.string().min(10, { message: 'O telefone deve ter pelo menos 10 caracteres' }).max(11, { message: 'O telefone deve ter no máximo 11 caracteres' }),
})

type FormData = {
  name: string;
  email: string;
  password: string;
  phone: string;
}

export default function Register() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const [message, setMessage] = useState("");

  const handleFormSubmit: SubmitHandler<FormData> = async ({ name, email, password, phone }: FormData) => {
    setMessage("");

    try {
      const result = await registerUser(name, email, password, phone);
      setMessage(result.message);
    } catch (error) {
      console.log(error);
      setMessage("Ocorreu um erro ao criar a conta");
    }
  }

  return (
    <div className="min-h-screen grid md:grid-cols-12">
      <div className="hidden md:flex max-h-screen col-span-7">
        <Image src="/login.jpg" alt="Login" width={1000} height={0} className="w-full object-cover"/>
      </div>
      <div className="opacity-0 animate-enter -translate-x-8 flex col-span-5 flex-col justify-center items-center text-zinc-800 px-14">
      <h2 className="text-5xl font-bold flex gap-4 items-center">
        <GiCarWheel size={32} className="text-blue-800" />
        Cadastre-se
      </h2>
      <form className="flex flex-col mt-10 items-start w-full" onSubmit={handleSubmit(handleFormSubmit)}>
      <InputField label="Nome & Sobrenome" id="name" placeholder="Digite o seu nome e sobrenome..." type="text" register={register} />
      {errors.name && <p className="text-red-600 mb-2">{errors.name?.message}</p>}

      <InputField label="Email" id="email" placeholder="Digite o seu e-mail..." type="text" register={register} />
      {errors.email && <p className="text-red-600 mb-2">{errors.email?.message}</p>}

      <InputField label="Senha" id="password" placeholder="Digite sua senha..." type="password" register={register} />
      {errors.password && <p className="text-red-600 mb-2">{errors.password?.message}</p>}

      <InputField label="Telefone (Whatsapp)" id="phone" placeholder="Ex: 81985335268" type="text" register={register} />
      {errors.phone && <p className="text-red-600 mb-2">{errors.phone?.message}</p>}

        <button type="submit" className="my-5 text-sm font-semibold text-white bg-blue-700 p-2 w-full rounded hover:bg-blue-900 duration-150">Cadastrar</button>
        {message && <p className="mb-3 text-blue-700 font-bold text-lg">{message}</p>}
        <p className="text-sm font-medium">
          Ja tem uma conta? <Link href="/login" className="text-blue-700 font-semibold">Clique aqui</Link>
        </p>
      </form>
      </div>
    </div>
  )
}