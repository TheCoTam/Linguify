import Link from 'next/link';

interface IProps {
  totalBlogs: number;
  page: number;
  perPage: number;
}

function Pagiantion(props: IProps) {
  const { totalBlogs, page, perPage } = props;

  const totalPages = Math.ceil(totalBlogs / perPage);

  const prePage = page - 1 > 0 ? page - 1 : 1;
  const nextPage = page + 1;

  const pageNumbers: Array<number> = [];
  const offsetNumber = 3;

  for (let i = page - offsetNumber; i <= page + offsetNumber; i++) {
    if (i > 0 && i <= totalPages) {
      pageNumbers.push(i);
    }
  }
  return (
    <div>
      <div className="flex justify-center items-center w-full mt-6">
        <div className="flex flex-row items-center justify-center gap-4 w-max bg-slate-200 border border-solid border-gray-400 rounded-lg overflow-hidden">
          {page === 1 ? (
            <div className="text-gray-400 px-2">Previous</div>
          ) : (
            <Link href={`?page=${prePage}`} className="px-2">
              Previous
            </Link>
          )}

          {pageNumbers.map((pageNumber, index) => (
            <Link
              key={index}
              href={`?page=${pageNumber}`}
              className={`flex justify-center items-center w-[30px] ${
                page === pageNumber
                  ? 'text-white bg-gray-400 cursor-default'
                  : ''
              }`}
            >
              {pageNumber}
            </Link>
          ))}

          {page === totalPages ? (
            <div className="text-gray-400 px-2">Next</div>
          ) : (
            <Link href={`?page=${nextPage}`} className="px-2">
              Next
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Pagiantion;
