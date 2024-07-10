import Image from 'next/image';

import Header from './header';

interface IProps {
  title: string | null;
  btnTitle: string | null;
  items: Array<any>;
  href?: string;
}

function Course(props: IProps) {
  const { title, btnTitle, items, href } = props;
  return (
    <div className="flex flex-col gap-1 bg-white  rounded-lg  overflow-hidden w-[380px] max-h-[70vw] pb-2">
      <Header title={title} btnTitle={btnTitle} href={href} />
      <div className="flex flex-col gap-3 max-h-[500px] overflow-y-auto">
        {items.map((item, index) => {
          return (
            <div
              className="flex flex-row mx-2 px-3 py-2 gap-2 rounded-lg hover:bg-slate-100"
              key={index}
            >
              <div className="flex justify-center items-center rounded-lg overflow-hidden cursor-pointer flex-shrink-0">
                <Image
                  src={item.image}
                  width={120}
                  height={67.5}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="font-semibold cursor-pointer">
                  {item.title}
                </div>
                {item.desc && (
                  <div className="text-sm">{item.desc}</div>
                )}
                {item.lastComplete && (
                  <div className="text-xs mt-1">
                    {item.lastComplete}
                  </div>
                )}
                {item.progress && (
                  <div className="mt-2 w-52 h-[6px] bg-slate-400 rounded-full overflow-hidden">
                    <div
                      className="h-[100%] bg-orange-500"
                      style={{ width: `${item.progress}%` }}
                    ></div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Course;
