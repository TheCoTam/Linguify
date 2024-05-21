import { Controller } from 'react-hook-form';

interface props {
  name: string;
  control: any;
  errorMessage?: string;
}

function TitleInput({ name, control, errorMessage }: props) {
  const className = `w-full pl-3 py-3 text-2xl bg-inherit focus:outline-none focus:bg-slate-200 rounded-lg ${
    !!errorMessage ? 'border-2 border-red-500 border-dashed' : ''
  }`;

  return (
    <div className="w-[80%]">
      <Controller
        name={name}
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <textarea
            value={field.value}
            onChange={field.onChange}
            placeholder="Title"
            className={className}
          />
        )}
      />
      <p className="text-red-500 text-xs">{errorMessage}</p>
    </div>
  );
}

export default TitleInput;
