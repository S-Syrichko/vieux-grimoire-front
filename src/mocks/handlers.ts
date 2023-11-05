import { http, HttpResponse } from "msw";

const apiURL = "http://localhost:4000/api";

export const handlers = [
  //loginAPI
  http.post(`${apiURL}/auth/login`, async ({ request }) => {
    const { email } = (await request.json()) as { email: string };
    if (email === "validate@request.com") {
      return new HttpResponse(
        JSON.stringify({ userId: "id123", token: "token123" }),
        { status: 201 }
      );
    } else {
      return new HttpResponse(
        JSON.stringify({ message: "Invalid credentials" }),
        {
          status: 401,
        }
      );
    }
  }),
  //signupAPI
  http.post(`${apiURL}/auth/signup`, async ({ request }) => {
    const { email } = (await request.json()) as { email: string };
    if (email === "valid@email.com") {
      return new HttpResponse(
        JSON.stringify({ message: "Utilisateur créé !" }),
        { status: 201 }
      );
    } else {
      return new HttpResponse(JSON.stringify({ message: "Signup error" }), {
        status: 500,
      });
    }
  }),
  //addBookAPI
  http.post(`${apiURL}/books`, async () => {
    return new HttpResponse(
      JSON.stringify({ message: "Book saved successfully!" }),
      { status: 201 }
    );
  }),
  //getOneBookAPI
  http.get(`${apiURL}/books/123`, async () => {
    return new HttpResponse(
      JSON.stringify({
        userId: "1",
        title: "foo",
        author: "bar",
        year: 2000,
        genre: "baz",
        ratings: [
          {
            userId: "1",
            grade: 3,
          },
        ],
        averageRating: 3,
        _id: "123",
        imageUrl: "test",
      }),
      { status: 200 }
    );
  }),
  //updateBookAPI
  http.put(`${apiURL}/books/123`, async () => {
    return new HttpResponse(
      JSON.stringify({ message: "Book updated successfully!" }),
      { status: 201 }
    );
  }),
];
