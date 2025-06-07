
import { useState } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { fetchNotes } from '../../services/noteService';
import SearchBox from '../SearchBox/SearchBox';
import NoteList from '../NoteList/NoteList';
import Pagination from '../Pagination/Pagination';
import type { FetchNotesResponse } from '../../services/noteService'
import css from './App.module.css';

export default function App() {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const { data, isLoading, isError } = useQuery<FetchNotesResponse>({
    queryKey: ['notes', page, searchTerm],
    queryFn: () => fetchNotes(page, 12, searchTerm),
    placeholderData: keepPreviousData,
  });
console.log(data);
  return (
    <>
      <header className={css.header}>
        <SearchBox onSearch={setSearchTerm} />
        {/* кнопку створення нотатки */}
      </header>

      {isLoading && <p>Loading...</p>}
      {isError && <p>Something went wrong</p>}

      {data && data.results.length > 0 && (
        
        <>
          <NoteList notes={data.results} />
          {data.total > 12 && (
            <Pagination
            totalPages={Math.ceil(data.total / data.limit)}
            currentPage={page}
            onPageChange={setPage}
/>
          )}
        </>
      )}
    </>
  );
}

