import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import css from './NoteModal.module.css';
import { NoteForm } from '../NoteForm/NoteForm';

interface NoteModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

export const NoteModal: React.FC<NoteModalProps> = ({ onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.body.style.overflow = 'hidden'; 

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div className={css.backdrop} role="dialog" aria-modal="true" onClick={handleBackdropClick}>
      <div className={css.modal}>
        <NoteForm onClose={onClose} />
      </div>
    </div>,
    document.body 
  );
};

// Критичні проблеми:

// Модальне вікно рендериться в елемент з id modal-root замість document.body. 
// Вимога полягає в тому, щоб рендерити безпосередньо у document.body використовуючи createPortal.
// Відсутня логіка для вимкнення прокручування сторінки, коли модальне вікно відкрите, 
// і відновлення прокручування, коли модальне вікно закрите.