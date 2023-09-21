import axios from "axios";
import { getCookie } from "typescript-cookie";
import { BookFormData, User } from "../lib/utils/dataTypes";

axios.defaults.baseURL = "http://localhost:4000/api";

export const loginAPI = async ({ email, password }: User) => {
  try {
    const res = await axios.post("/auth/login", { email, password });
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const signupAPI = async ({ email, password }: User) => {
  try {
    const res = await axios.post("/auth/signup", { email, password });
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const addBookAPI = async (data: BookFormData) => {
  try {
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
  } catch (err) {
    throw err;
  }
};

export const getAllBooksAPI = async () => {
  try {
    const res = await axios.get("/books");

    return res.data;
  } catch (err) {
    throw err;
  }
};

export const getOneBookAPI = async (id: string) => {
  try {
    const res = await axios.get(`/books/${id}`);
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const getBestRatedBooksAPI = async () => {
  try {
    const res = await axios.get("/books/bestrating");
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const rateBookAPI = async (
  bookId: string,
  userId: string,
  rating: number
) => {
  try {
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
  } catch (err) {
    throw err;
  }
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
  try {
    const res = await axios.put(`/books/${data.book._id}`, newData, {
      headers: {
        Authorization: `Bearer ${getCookie("token")}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const deleteBookAPI = async (id: string) => {
  try {
    const res = await axios.delete(`/books/${id}`, {
      headers: {
        Authorization: `Bearer ${getCookie("token")}`,
      },
    });
    return res.data;
  } catch (err) {
    throw err;
  }
};
