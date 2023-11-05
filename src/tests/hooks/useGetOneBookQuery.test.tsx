import { renderHook, waitFor } from "@testing-library/react";
import useGetOneBookQuery from "../../lib/hooks/useGetOneBookQuery";
import { createQueryWrapper } from "../utils/wrappers";

describe("useGetOneBookQuery", () => {
  it("should get one book", async () => {
    const { result } = renderHook(() => useGetOneBookQuery("123"), {
      wrapper: createQueryWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toBeDefined();
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isError).toBe(false);
    
  });
});
