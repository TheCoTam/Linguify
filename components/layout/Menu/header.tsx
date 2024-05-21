import Link from 'next/link';

interface IProps {
  title: string | null;
  btnTitle: string | null;
  href?: string;
}

function Header(props: IProps) {
  const { title, btnTitle, href } = props;

  return (
    <div className="flex flex-row items-center px-5 py-4">
      <div className="font-semibold">{title}</div>
      <div className="ml-auto">
        <Link
          href={href || '/'}
          className="w-max px-2 py-1 rounded-lg hover:bg-white active:bg-orange-100 text-red-600 text-sm"
        >
          {btnTitle}
        </Link>
      </div>
    </div>
  );
}

export default Header;
