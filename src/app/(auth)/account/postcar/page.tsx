"use client";

import { useSession } from 'next-auth/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { GiCarWheel } from 'react-icons/gi';
import { z } from 'zod';
import { createCar } from '@/services/createCar';
import { AccountMenu } from '../../../../components/AccountMenu';
import InputField from '@/components/Input';

const schema = z.object({
  name: z.string().min(3, { message: 'O campo deve ter pelo menos 3 caracteres' }).max(50, { message: 'O campo deve ter no máximo 50 caracteres' }),
  description: z.string().min(3, { message: 'O campo deve ter pelo menos 3 caracteres' }).max(100, { message: 'O campo deve ter no máximo 100 caracteres' }),
  value: z.string().min(1, { message: 'O campo deve ter pelo menos 1 caractere' }).max(10, { message: 'O campo deve ter no máximo 10 caracteres' }),
  file: z.any(),
});

interface FormData {
  name: string;
  description: string;
  value: string;
  file: FileList;
}

export default function PostCar() {
  const { data: session } = useSession();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const handleFormSubmit: SubmitHandler<FormData> = async (data: FormData) => {
    if (!session) {
      return alert('Faça login para adicionar um veículo');
    }
    try {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('description', data.description);
      formData.append('value', data.value);
      formData.append('file', data.file[0]);

      await createCar(formData, session.user.token);
    } catch (error) {
      console.log(error);
      alert('Ocorreu um erro ao criar o veículo');
    } finally {
      reset();
    }
  };

  return (
    <div className="min-h-screen md:grid grid-cols-2 gap-20 px-5 md:px-20 lg:px-40 items-start py-20 animate-enter opacity-0 -translate-y-8">
      <div className="flex flex-col gap-3 mb-10 md:mb-0">
        <h2 className="text-5xl font-bold text-zinc-800 flex gap-3 items-center">
          <GiCarWheel size={32} className="text-blue-800" />
          Adicionar Carro
        </h2>
        <p className="text-md font-medium text-zinc-700">
          Para adicionar um novo veículo basta preencher o formulário.
          Se atente a <span className="font-semibold text-blue-800">nomenclatura e descrição</span> correta do veículo.
        </p>
        <AccountMenu />
      </div>

      <div className="flex flex-col">
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <InputField label="Nome do carro" id="name" placeholder="Digite o nome do carro..." type="text" register={register} />
          {errors.name && <p className="text-red-500 text-sm mb-2">{errors.name.message}</p>}
          <InputField label="Descreva o carro" id="description" placeholder="Descreva o veículo..." type="text" register={register} />
          {errors.description && <p className="text-red-500 text-sm mb-2">{errors.description.message}</p>}
          <InputField label="Valor do carro" id="value" placeholder="Digite em números o valor do veículo..." type="text" register={register} />
          {errors.value && <p className="text-red-500 text-sm mb-2">{errors.value.message}</p>}
          <label htmlFor="file" className="text-lg text-md font-bold text-zinc-700">
            Imagem do carro:
          </label>
          <input
            className="text-sm border border-zinc-300 p-2 w-full rounded bg-zinc-100 my-3 focus:outline-slate-600"
            type="file"
            id="file"
            {...register('file', { setValueAs: (v) => v[0] })}
          />

          <button type="submit" className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded duration-150 mt-2">
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
}
