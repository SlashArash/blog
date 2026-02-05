import ButtonLink from "./button-link";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
};

const Pagination = ({ currentPage, totalPages }: PaginationProps) => {
  return (
    <nav className="mt-12 flex justify-center items-center gap-4 font-sans">
      {currentPage > 1 && (
        <ButtonLink href={`/blog/archive/${currentPage - 1}`}>قبلی</ButtonLink>
      )}
      <span className="text-zinc-400">
        صفحه {currentPage} از {totalPages}
      </span>

      {currentPage < totalPages && (
        <ButtonLink href={`/blog/archive/${currentPage + 1}`}>بعدی</ButtonLink>
      )}
    </nav>
  );
};

export default Pagination;
