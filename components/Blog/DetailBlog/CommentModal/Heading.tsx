interface HeadingProps {
  numComments?: number;
}

function Heading({ numComments }: HeadingProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="font-semibold text-xl">
        {numComments! < 2
          ? numComments + ' comment'
          : numComments + ' comments'}{' '}
      </div>
    </div>
  );
}

export default Heading;
