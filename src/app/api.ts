import axios from "axios";
import { getCookie } from "typescript-cookie";
axios.defaults.baseURL = "http://localhost:4000/api";

type User = {
  email: string;
  password: string;
};

export type Book = {
  userId: string;
  title: string;
  author: string;
  year: number;
  genre: string;
  ratings: [{ userId: string; grade: number }];
  averageRating: number;
  _id?: string;
  imageUrl?: string;
};

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

export const addBookAPI = async ({ book, imageFile }: { book: Book, imageFile: File }) => {
  try {
    const jwt = getCookie("token");
    

    const formData = new FormData();
    formData.append("book", JSON.stringify(book));
    formData.append("image", imageFile);

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
    console.log(res.data);
    
    return res.data;
  } catch (err) {
    throw err;
  }
}
