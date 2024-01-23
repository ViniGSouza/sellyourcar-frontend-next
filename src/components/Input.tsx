interface InputFieldProps {
  label: string;
  id: string;
  placeholder: string;
  type: string;
  register: any;
}

const InputField = ({ label, id, placeholder, type, register }: InputFieldProps) => {
  return (
    <>
      <label className="text-lg text-md font-bold text-zinc-700" htmlFor={id}>
        {label}:
      </label>
      <input
        className="text-sm border border-zinc-300 p-2 w-full rounded bg-zinc-100 my-3 focus:outline-slate-600"
        id={id}
        placeholder={placeholder}
        type={type}
        {...register(id)}
      />
    </>
  );
};

export default InputField;
