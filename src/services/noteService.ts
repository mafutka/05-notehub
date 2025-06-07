import axios from "axios";
import type { Note } from '../types/note';

export interface FetchNotesResponse {
  results: Note[];
  total: number;
  page: number;
  limit: number;
}

const myToken = import.meta.env.VITE_NOTEHUB_TOKEN;

const api = axios.create({
    baseURL: 'https://notehub-public.goit.study/api',
    headers: {
    Authorization: `Bearer ${myToken}`,
  },
});

interface FetchNotesResponse {
  results: Note[];
  total: number;
  page: number;
  limit: number;
}

export const fetchNotes = async (
  page = 1,
  perPage = 12,
  search = ''
): Promise<FetchNotesResponse> => {
  const response = await api.get<FetchNotesResponse>('/notes', {
    params: {
      page,
      perPage,
      search,
    },
  });
  return response.data;
};

export const createNote = async (
  content: string
): Promise<Note> => {
  const response = await api.post<Note>('/notes', { content });
  return response.data;
};

export const deleteNote = async (
  id: number
): Promise<Note> => {
  const response = await api.delete<Note>(`/notes/${id}`);
  return response.data;
};



// Для роботи з колекцією нотатків використовуйте готовий бекенд. 
// Документація до нього доступна за посиланням:

// https://notehub-public.goit.study/api/docs

// Щоб працювати з бекендом, вам потрібно отримати персональний ключ доступу 
// прив’язаний до вашої пошти. Це буде зручно зробити прямо в документації бекенда.

// Функції для виконання HTTP-запитів винесіть в окремий файл src/services/noteService.ts. 
// Типізуйте їх параметри, результат, який вони повертають, та відповідь від Axios. 
// У вас мають бути наступні функції:

// fetchNotes : має виконувати запит для отримання колекції нотатків із сервера. 
// Повинна підтримувати пагінацію (через параметр сторінки) та фільтрацію за ключовим словом (пошук);
// createNote: має виконувати запит для створення нової нотатки на сервері. 
// Приймає вміст нової нотатки та повертає створену нотатку у відповіді;
// deleteNote: має виконувати запит для видалення нотатки за заданим ідентифікатором. 
// Приймає ID нотатки та повертає інформацію про видалену нотатку у відповіді.