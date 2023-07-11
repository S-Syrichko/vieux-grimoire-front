import { Route, Routes } from "react-router-dom";
import { AuthPage } from "../features/auth";
import { AddBookPage, BookPage } from "../features/books";
import { HomePage } from "../features/home";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/books/:bookId" element={<BookPage />} />
      <Route path="/books/add" element={<AddBookPage />} />
    </Routes>
  );
};



export default AppRoutes;
