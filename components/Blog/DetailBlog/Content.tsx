interface IProps {
  title: string;
  content: string;
}

function Content(props: IProps) {
  const { title, content } = props;
  return (
    <div className="flex flex-col gap-[70px] w-[100%] lg:w-[70%] xl:w-[60%]">
      <div className="font-bold text-4xl">{title}</div>
      <div dangerouslySetInnerHTML={{ __html: content }}></div>
    </div>
  );
}

export default Content;
