import ReactPaginate from 'react-paginate'
import css from './Psginstion.module.css'

interface PaginateProps {
  totalPages: number,
  pageCount: number;
  currentPage: number;
  onPageChange: (selected: number) => void;
}

export default function Pagination({ totalPages, currentPage, onPageChange }: PaginateProps) {
    return (
        <ReactPaginate
      pageCount={totalPages}
      pageRangeDisplayed={5}
      marginPagesDisplayed={1}
      onPageChange={({ selected }) => onPageChange(selected + 1)}
      forcePage={currentPage - 1}
      containerClassName={css.pagination}
      activeClassName={css.active}
      nextLabel="→"
      previousLabel="←"
      />
    )
}

// Бекенд завжди повертає пагіновану колекцію нотатків. 
// Тому потрібно додати до компонента App компонент Pagination, 
// який надає користувачеві можливість перемикатися між сторінками колекції. 
// Реалізуйте компонент Pagination з використанням бібліотеки React Paginate.

// До http-запиту потрібно додати параметри page та perPage. Наприклад:
// GET https://notehub-public.goit.study/api/notes?page=1&perPage=12

// Додайте умову, щоб компонент Pagination рендерився лише в тому випадку, 
// якщо кількість сторінок колекції нотатків більше 1.




