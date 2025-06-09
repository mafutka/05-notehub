import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import css from './NoteModal.module.css';
import { NoteForm } from '../NoteForm/NoteForm';

interface NoteModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

const modalRoot = document.getElementById('modal-root')!;

export const NoteModal: React.FC<NoteModalProps> = ({ onClose, onSuccess }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div className={css.backdrop} role="dialog" aria-modal="true" onClick={handleBackdropClick}>
      <div className={css.modal}>
        <NoteForm onCancel={onClose} onSuccess={onSuccess} />
      </div>
    </div>,
    modalRoot
  );
};

// Модальне вікно має створюватись через createPortal, 
// щоб рендерити модалку поза межами основного дерева компонентів,
//  та закриватися при кліку на бекдроп і натисканням на клавішу Escape.