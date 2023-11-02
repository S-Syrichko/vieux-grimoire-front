import { Route, Routes } from "react-router-dom";
import Layout from "../layout/Layout";
import { AuthPage } from "../features/auth";
import { AddBookPage, BookPage, UpdateBookPage } from "../features/books";
import { HomePage, NotFoundPage } from "../features/home";

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
      <Route
        path="/books/:bookId/update"
        element={
          <Layout>
            <UpdateBookPage />
          </Layout>
        }
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
