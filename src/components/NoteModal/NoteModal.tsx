import css from './NoteModal.module.css'

<div
  className={css.backdrop}
  role="dialog"
  aria-modal="true"
>
  <div className={css.modal}>
    {/* Компонент NoteForm */}
  </div>
</div>

// Модальне вікно має створюватись через createPortal, 
// щоб рендерити модалку поза межами основного дерева компонентів,
//  та закриватися при кліку на бекдроп і натисканням на клавішу Escape.