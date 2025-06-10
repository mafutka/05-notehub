import ReactPaginate from 'react-paginate'
import css from './Pagination.module.css'

interface PaginationProps {
  totalPages: number,
  currentPage: number;
  onPageChange: (selected: number) => void;
}

export default function Pagination({ totalPages, currentPage, onPageChange }: PaginationProps) {
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

// Критичні проблеми:

// Інтерфейс пропсів має назву PaginateProps, але назва компонента - Pagination. 
// Інтерфейс повинен мати назву PaginationProps для відповідності вимогам назв.
// Інструкція імпорту для модуля CSS використовує файл з назвою Paginstion.module.css, 
// що, ймовірно, є друкарською помилкою і може спричинити помилки імпорту.




