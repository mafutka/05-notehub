import css from './SearchBox.module.css';

interface SearchBoxProps {
  value: string;                
  onSearch: (value: string) => void;
  
}

export default function SearchBox({ value, onSearch }: SearchBoxProps) {
  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search notes"
      value={value}          
      onChange={(e) => onSearch(e.target.value.trim())} 
    />
  );
}

// Критичні проблеми:

// Компонент не приймає або не використовує prop для поточного значення тексту пошуку.
// Логіка дебаунсу має бути розміщена в Арр. Дана реалізація некоректна, ви це могли б побачити, якби додали потрібне скидання сторінки до 1 в Арр під час пошуку, але ви цього не зробили поки.
// Інтерфейс SearchBoxProps не містить обов'язкового string prop для поточного тексту пошуку. Компонент приймає лише onSearch і управляє своїм станом самостійно, замість того, щоб бути повністю контрольованим через props.
// Значення вводу управляється внутрішньо за допомогою useState, замість того, щоб бути контрольованим через prop. Це не відповідає вимогам для контрольованого компонента, значення якого управляється зовнішньо.