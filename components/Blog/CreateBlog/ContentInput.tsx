import { Controller } from 'react-hook-form';
// import { Editor } from '@/components/editor';
import Editor from '../Editor';
import styles from '@/styles/editor.module.css';

interface props {
  name: string;
  control: any;
  errorMessage?: string;
  disabled?: boolean;
}

function ContentInput({
  name,
  control,
  errorMessage,
  disabled,
}: props) {
  return (
    <div>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Editor
            value={field.value}
            onChange={field.onChange}
            height={400}
            className={`${
              !!errorMessage ? styles['error-editor'] : ''
            } ${disabled ? 'text-gray-500 cursor-not-allowed' : ''}`}
            disabled={disabled}
          />
        )}
      />
      <p className="text-red-500 text-xs">{errorMessage}</p>
    </div>
  );
}

export default ContentInput;
