export type User = {
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

export type BookFormData = {
  book: Book;
  file: FileList;
};
