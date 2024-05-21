import Image from 'next/image';
import Link from 'next/link';

interface IProps {
  category: any;
}

function Menu(props: IProps) {
  const { category } = props;
  return (
    <div className="flex flex-col gap-4 lg:gap-6">
      <h1 className="font-bold text-2xl lg:text-4xl">
        {category.title}
      </h1>
      <div className="flex overflow-x-auto overflow-y-hidden w-[100%]  lg:grid lg:grid-cols-3 xl:grid-cols-4 gap-4 xl:gap-7 pb-3 lg:pb-0">
        {category.data.map((item: any, index: number) => {
          return (
            <div
              key={index}
              className="flex flex-col gap-3 w-max lg:w-auto"
            >
              {item.image && (
                <div className="flex justify-center items-center bg-slate-300 w-[35vw] lg:w-[100%] aspect-video overflow-hidden rounded-lg relative">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={240}
                    height={135}
                    className="absolute w-full h-full"
                  />
                  <Link
                    href="/learningPath"
                    className="absolute w-full h-full"
                  >
                    <div className="group flex justify-center items-center w-full h-full hover:bg-gray-900 hover:bg-opacity-30 hover:transition-all hover:ease-in-out hover:duration-300">
                      <button className="bg-white rounded-full hidden w-1/2 py-2 group-hover:block group-hover:translate-y-0">
                        Xem khoá học
                      </button>
                    </div>
                  </Link>
                </div>
              )}
              {item.title && (
                <Link
                  href="/learningPath"
                  className="font-semibold w-[35vw] lg:w-[100%]"
                >
                  {item.title}
                </Link>
              )}
              {item.enrollers && (
                <div className="flex flex-row text-sm font-normal gap-2">
                  <Image
                    src="/icons/usersGroupIcon.svg"
                    alt=""
                    width={20}
                    height={20}
                  />
                  {item.enrollers}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Menu;
