export type Prop = {
  page: number;
  pages: number;
  onPageChange: (page: number) => void;
};

const Pagination = ({ page, pages, onPageChange }: Prop) => {
  const pageNumber = [];

  for (let i = 1; i <= pages; i++) {
    pageNumber.push(i);
  }

  return (
    <div className="flex justify-center mt-7">
      <ul className="flex border border-slate-300">
        {pageNumber.map((number) => (
          <li
            key={number}
            className={`px-2  py1 ${page === number ? "bg-gray-400" : ""}`}
          >
            <button onClick={() => onPageChange(number)}>{number}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
