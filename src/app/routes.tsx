import { Route, Routes } from "react-router-dom";
import Layout from "../components/layout/Layout";
import { AuthPage } from "../features/auth";
import { AddBookPage, BookPage } from "../features/books";
import { HomePage } from "../features/home";

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <HomePage />
          </Layout>
        }
      />
      <Route path="/auth" element={<AuthPage />} />
      <Route
        path="/books/:bookId"
        element={
          <Layout>
            <BookPage />
          </Layout>
        }
      />
      <Route
        path="/books/add"
        element={
          <Layout>
            <AddBookPage />
          </Layout>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
