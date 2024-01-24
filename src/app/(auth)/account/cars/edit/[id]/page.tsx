"use client";

import { updateCar } from "@/services/updateCar";
import { SubmitHandler, useForm } from 'react-hook-form';
import { useSession } from "next-auth/react";
import { GiCarWheel } from "react-icons/gi";
import { AccountMenu } from "../../../../../../components/AccountMenu";
import InputField from "@/components/Input";

interface FormData {
  name: string;
  description: string;
  value: string;
  file: FileList;
}

export default function EditCar({ params }: { params: { id: number }}) {
  const { data: session } = useSession();
  const { register, handleSubmit, reset } = useForm<FormData>();

  const handleFormSubmit: SubmitHandler<FormData> = async (data: FormData) => {
    if (!session) {
      return alert('Faça login para editar um veículo');
    }
    try {
      const formData = new FormData();
      data.name && data.name.length > 0 && formData.append('name', data.name);
      data.description && data.description.length > 0 && formData.append('description', data.description);
      data.value && data.value.length > 0 && formData.append('value', data.value);
      data.file && data.file.length > 0 && formData.append('file', data.file[0]);
      await updateCar(params.id, formData, `${session?.user?.token}`);
    } catch (error) {
      console.log(error);
      alert('Ocorreu um erro ao atualizar o veículo');
    } finally {
      reset();
    }
  }


  return (
    <div className="min-h-screen md:grid grid-cols-2 gap-20 px-5 md:px-20 lg:px-40 items-start py-20 animate-enter opacity-0 -translate-y-8">
      <div className="flex flex-col gap-3 mb-10 md:mb-0">
        <h2 className="text-5xl font-bold text-zinc-800 flex gap-3 items-center">
          <GiCarWheel size={40} className="text-blue-800" />
          Editar Veículo
        </h2>
        <p className="text-md font-medium text-zinc-700">Edite o veículo preenchendo o formulário. Os campos não são obrigatórios, basta preencher o campo que você deseja alterar.</p>
        <AccountMenu />
      </div>

      <div>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <InputField label="Nome do carro" id="name" placeholder="Digite o nome do carro..." type="text" register={register} />
          <InputField label="Descreva o carro" id="description" placeholder="Descreva o veículo..." type="text" register={register} />
          <InputField label="Valor do carro" id="value" placeholder="Digite em números o valor do veículo..." type="text" register={register} />
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
  )
}