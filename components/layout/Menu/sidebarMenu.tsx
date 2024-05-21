import Link from 'next/link';

interface IProps {
  items: Array<any>;
}

function SidebarMenu(props: IProps) {
  const { items } = props;

  return (
    <div className="flex flex-col gap-2 py-2 w-[200px] bg-white rounded-lg">
      {items.map((item, index) => {
        return (
          <Link
            key={index}
            href={item.href}
            className="flex justify-center items-center w-full py-2 cursor-pointer hover:bg-slate-100 active:bg-slate-200"
          >
            {item.title}
          </Link>
        );
      })}
    </div>
  );
}

export default SidebarMenu;
