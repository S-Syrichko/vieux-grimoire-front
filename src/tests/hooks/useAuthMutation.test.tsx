import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { act, renderHook, waitFor } from "@testing-library/react";
import useAuthMutation from "../../lib/hooks/useAuthMutation";
import { ReactNode } from "react";
import { BrowserRouter } from "react-router-dom";

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
    logger: {
      log: console.log,
      warn: console.warn,
      error: () => {},
    },
  });
  const Wrapper: React.FC<{ children: ReactNode }> = ({ children }) => (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>{children}</BrowserRouter>
    </QueryClientProvider>
  );
  Wrapper.displayName = "QueryClientWrapper";
  return Wrapper;
};

describe("useAuthMutation", () => {
  describe("login", () => {
    it("should return success with valid credentials", async () => {
      const { result } = renderHook(() => useAuthMutation(), {
        wrapper: createWrapper(),
      });
      await act(() =>
        result.current.handleLogin("validate@request.com", "foobar")
      );

      await waitFor(() =>
        expect(result.current.loginMutation.isSuccess).toBe(true)
      );
      expect(result.current.alertMessage).toBe(null);
      expect(result.current.alertType).toBe(null);
      expect(result.current.loginMutation.data).toBeDefined();
    });
    it("should return error with invalid credentials", async () => {
      const { result } = renderHook(() => useAuthMutation(), {
        wrapper: createWrapper(),
      });

      await act(() => {
        result.current.handleLogin("unvalidate@request.com", "foobar");
      });

      await waitFor(() => {
        expect(result.current.loginMutation.isError).toBe(true);
      });

      expect(result.current.alertType).toBe("error");
      expect(result.current.alertMessage).toBe("Invalid credentials");
      expect(result.current.loginMutation.data).toBeUndefined();
    });
  });
});
