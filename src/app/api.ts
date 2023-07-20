import axios from "axios";

axios.defaults.baseURL = "http://localhost:4000/api";

type User = {
  email: string;
  password: string;
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
