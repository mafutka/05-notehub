import { useState, useEffect } from 'react';
import { useDebounce } from 'use-debounce';
import css from './SearchBox.module.css';

interface SearchBoxProps {
  onSearch: (value: string) => void;
}

export default function SearchBox({ onSearch }: SearchBoxProps) {
  const [input, setInput] = useState('');
  const [debouncedValue] = useDebounce(input, 500);

  useEffect(() => {
    onSearch(debouncedValue.trim());
  }, [debouncedValue, onSearch]);

  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search notes"
      value={input}
      onChange={(e) => setInput(e.target.value)}
    />
  );
}