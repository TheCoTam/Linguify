import Image from 'next/image';

interface props {
  onClick: () => void;
}

function CloseButton({ onClick }: props) {
  return (
    <div className="ml-auto hover:cursor-pointer" onClick={onClick}>
      <Image
        src="/icons/closeIcon.svg"
        alt=""
        width={24}
        height={24}
      />
    </div>
  );
}

export default CloseButton;
