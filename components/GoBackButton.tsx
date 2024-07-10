import Image from 'next/image';
import { useRouter } from 'next/navigation';

function GoBackButton() {
  const router = useRouter();

  const handleClick = () => router.back();
  return (
    <button
      onClick={handleClick}
      className="flex flex-row justify-center items-center text-gray-500 font-semibold text-[14px] w-max px-2 py-1 rounded-xl hover:bg-white active:bg-slate-200"
    >
      <Image
        src="/icons/angleLeftIcon.svg"
        alt=""
        width={22}
        height={22}
      ></Image>
      Return
    </button>
  );
}

export default GoBackButton;
