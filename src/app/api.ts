import axios from "axios";
import { getCookie } from "typescript-cookie";
import { BookFormData, User } from "../lib/utils/dataTypes";

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

export const loginAPI = async ({ email, password }: User) => {
  const res = await axios.post("/auth/login", { email, password });
  return res.data;
};

export const signupAPI = async ({ email, password }: User) => {
  const res = await axios.post("/auth/signup", { email, password });
  return res.data;
};

export const addBookAPI = async (data: BookFormData) => {
  const jwt = getCookie("token");

  const formData = new FormData();
  formData.append("book", JSON.stringify(data.book));
  formData.append("image", data.file[0]);
  
  const res = await axios.post("/books", formData, {
    headers: {
      Authorization: `Bearer ${jwt}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const getAllBooksAPI = async () => {
  const res = await axios.get("/books");

  return res.data;
};

export const getOneBookAPI = async (id: string) => {
  const res = await axios.get(`/books/${id}`);
  return res.data;
};

export const getBestRatedBooksAPI = async () => {
  const res = await axios.get("/books/bestrating");
  return res.data;
};

export const rateBookAPI = async (
  bookId: string,
  userId: string,
  rating: number
) => {
  const res = await axios.post(
    `/books/${bookId}/rating`,
    { userId, rating },
    {
      headers: {
        Authorization: `Bearer ${getCookie("token")}`,
      },
    }
  );
  return res.data;
};

export const updateBookAPI = async (data: BookFormData) => {
  let newData;
  if (data.file[0]) {
    newData = new FormData();
    newData.append("book", JSON.stringify(data.book));
    newData.append("image", data.file[0]);
  } else {
    newData = { ...data.book };
  }
  const res = await axios.put(`/books/${data.book._id}`, newData, {
    headers: {
      Authorization: `Bearer ${getCookie("token")}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const deleteBookAPI = async (id: string) => {
  const res = await axios.delete(`/books/${id}`, {
    headers: {
      Authorization: `Bearer ${getCookie("token")}`,
    },
  });
  return res.data;
};
