import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import css from './NoteForm.module.css';
import { createNote } from '../../services/noteService';

interface NoteFormProps {
  onCancel: () => void;
  onSuccess: () => void;
}

const validationSchema = Yup.object().shape({
  title: Yup.string().min(3).max(50).required('Title is required'),
  content: Yup.string().max(500, 'Maximum length is 500'),
  tag: Yup.string()
    .oneOf(['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'], 'Invalid tag')
    .required('Tag is required'),
});

export const NoteForm: React.FC<NoteFormProps> = ({ onCancel, onSuccess }) => {
  return (
    <Formik
      initialValues={{ title: '', content: '', tag: '' }}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          await createNote(values);
          onSuccess();
        } catch (error) {
          console.error('Create failed:', error);
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form className={css.form}>
          <div className={css.formGroup}>
            <label htmlFor="title">Title</label>
            <Field id="title" name="title" type="text" className={css.input} />
            <ErrorMessage name="title" component="span" className={css.error} />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="content">Content</label>
            <Field as="textarea" id="content" name="content" rows={8} className={css.textarea} />
            <ErrorMessage name="content" component="span" className={css.error} />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="tag">Tag</label>
            <Field as="select" id="tag" name="tag" className={css.select}>
              <option value="">Select a tag</option>
              <option value="Todo">Todo</option>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Meeting">Meeting</option>
              <option value="Shopping">Shopping</option>
            </Field>
            <ErrorMessage name="tag" component="span" className={css.error} />
          </div>

          <div className={css.actions}>
            <button type="button" className={css.cancelButton} onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className={css.submitButton} disabled={isSubmitting}>
              Create note
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

// Для керування станом форми, валідації та обробки сабміту слід використовувати бібліотеку Formik.



// Додай валідацію значень полів форми за допомогою Yup:

// заголовок нотатки має мати мінімальну довжину символів 3, максимальну – 50 
// та бути обовязковим полем;
// контент нотатки має мати максимальну довжину символів 500;
// тег нотатки має бути одним із таких значень: Todo, Work, Personal, Meeting, Shopping, 
// і є обов’язковим полем.

// Видалення нотатки

// При натисканні на кнопку Delete в елементі списку нотатків, 
// відповідна нотатка має видалятися на бекенді та оновлюватись збережені серверні дані.