"use client";

import { GiCarWheel } from "react-icons/gi";
import Image from "next/image";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import InputField from "../../components/Input";
import { useState } from "react";
import { Loading } from "@/components/Loading";

const schema = z.object({
  email: z.string().email({ message: 'Email inválido' }),
  password: z.string().min(6, { message: 'Senha inválida' }),
})

type FormData = z.infer<typeof schema>;

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const handleFormSubmit: SubmitHandler<FormData> = async (data: FormData) => {
    setLoading(true);

    const result = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false
    });

    if (result?.error) {
      console.log(result)
      return;
    }
    setLoading(false);

    router.replace('/');
  }

  return (
    <div className="min-h-screen grid md:grid-cols-12">
      <div className="hidden md:flex max-h-screen col-span-7">
        <Image src="/login.jpg" alt="Login" width={1000} height={0} className="w-full object-cover"/>
      </div>
      <div className="opacity-0 animate-enter -translate-x-8 flex col-span-5 flex-col justify-center items-center text-zinc-800 px-14">
      <h2 className="text-5xl font-bold flex gap-4 items-center">
        <GiCarWheel size={32} className="text-blue-800" />
        Login
      </h2>
      {loading ? 
        <div className="my-10 animate-enter opacity-0">
          <Loading />
        </div>
      : 
        <form className="flex flex-col mt-10 items-start w-full" onSubmit={handleSubmit(handleFormSubmit)}>
        <InputField label="Email" id="email" placeholder="Digite o seu e-mail..." type="text" register={register} />
        {errors.email &&<p className="text-red-600 mb-2">{errors.email?.message}</p>}

        <InputField label="Senha" id="password" placeholder="Digite sua senha..." type="password" register={register} />
        {errors.password &&<p className="text-red-600 mb-2">{errors.password?.message}</p>}
        
        <button type="submit" className="my-5 text-sm font-semibold text-white bg-blue-700 p-2 w-full rounded hover:bg-blue-900 duration-150">
          Entrar
        </button>

          <Link href="/password" className="font-semibold text-blue-700 hover:text-blue-900 duration-150">
            Esqueceu sua senha?
          </Link>

          <div className="mt-10">
            <p className="font-semibold mb-5">
              Ainda não tem uma conta? Registre-se já.
            </p>
            <Link href="/register" className="bg-blue-700 text-sm font-semibold text-white py-2 px-4 w-full rounded hover:bg-blue-900 duration-150">
              Fazer cadastro
            </Link>
          </div>
        </form>
      }
      </div>
    </div>
  )
}