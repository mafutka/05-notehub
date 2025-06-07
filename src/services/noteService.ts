import axios from "axios";
import type { Note } from "../types/note";

// Тип відповіді на запит нотаток
export interface FetchNotesResponse {
  results: Note[];
  total: number;
  page: number;
  limit: number;
}

// Токен з .env (важливо: VITE_ префікс для Vite)
const myToken = import.meta.env.VITE_NOTEHUB_TOKEN;

// Axios-інстанс із заголовками
const api = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
  headers: {
    Authorization: `Bearer ${myToken}`,
  },
});

// Отримання нотаток з підтримкою пагінації та пошуку
export const fetchNotes = async (
  page = 1,
  perPage = 12,
  search = ""
): Promise<FetchNotesResponse> => {
  // Формуємо параметри динамічно — без порожнього search
  const params: Record<string, string | number> = {
    page,
    perPage,
  };

  if (search.trim() !== "") {
    params.search = search.trim();
  }

  // DEBUG (можна прибрати після налагодження)
  console.log("➡️ fetchNotes params:", params);

  const response = await api.get<FetchNotesResponse>("/notes", {
    params,
  });

  return response.data;
};

// Створення нової нотатки
export const createNote = async (content: string): Promise<Note> => {
  const response = await api.post<Note>("/notes", { content });
  return response.data;
};

// Видалення нотатки
export const deleteNote = async (id: number): Promise<Note> => {
  const response = await api.delete<Note>(`/notes/${id}`);
  return response.data;
};