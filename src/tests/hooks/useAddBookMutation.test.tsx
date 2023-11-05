import { act, renderHook, waitFor } from "@testing-library/react";
import useAddBookMutation from "../../lib/hooks/useAddBookMutation";
import { BookFormData } from "../../lib/utils/dataTypes";
import { createQueryWrapper } from "../utils/wrappers";

describe("useAddBookMutation", () => {
  it("should add a book", async () => {
    const { result } = renderHook(() => useAddBookMutation(), {
      wrapper: createQueryWrapper(),
    });

    //Creating FileList mock
    const file = new File(["foo"], "foo.png", {
      type: "image/png",
    });
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("name", "file-upload");
    const mockFileList = Object.create(input.files);
    mockFileList[0] = file;

    //Creating BookFormData mock
    const bookData: BookFormData = {
      book: {
        userId: "123",
        title: "valid title",
        author: "bar",
        year: 2000,
        genre: "baz",
        ratings: [
          {
            userId: "123",
            grade: 3,
          },
        ],
      },
      file: mockFileList,
    };

    await act(() => result.current.handleAddBook(bookData));

    await waitFor(() =>
      expect(result.current.addBookMutation.isSuccess).toBe(true)
    );
    expect(result.current.alertMessage).toBe(null);
    expect(result.current.addBookMutation.data).toBeDefined();
  });
});
