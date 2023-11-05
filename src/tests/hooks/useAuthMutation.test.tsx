import { act, renderHook, waitFor } from "@testing-library/react";
import useAuthMutation from "../../lib/hooks/useAuthMutation";
import { createQueryWrapper } from "../utils/wrappers";


describe("useAuthMutation", () => {
  describe("login", () => {
    it("should return success with valid credentials", async () => {
      const { result } = renderHook(() => useAuthMutation(), {
        wrapper: createQueryWrapper(),
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
        wrapper: createQueryWrapper(),
      });

      await act(() => {
        expect(
          result.current.handleLogin("unvalidate@request.com", "foobar")
        ).rejects.toThrow("Request failed with status code 401");
      });

      await waitFor(() => {
        expect(result.current.loginMutation.isError).toBe(true);
      });

      expect(result.current.alertType).toBe("error");
      expect(result.current.alertMessage).toBe("Invalid credentials");
      expect(result.current.loginMutation.data).toBeUndefined();
    });
  });
  describe("signup", () => {
    it("should return success with valid credentials", async () => {
      const { result } = renderHook(() => useAuthMutation(), {
        wrapper: createQueryWrapper(),
      });
      await act(() => result.current.handleSignup("valid@email.com", "foobar"));

      await waitFor(() =>
        expect(result.current.signupMutation.isSuccess).toBe(true)
      );
      expect(result.current.alertMessage).toBe(
        "Compte créé. Vous pouvez maintenant vous connecter"
      );
      expect(result.current.alertType).toBe("success");
      expect(result.current.signupMutation.data).toBeDefined();
    });
    it("should return error with invalid credentials", async () => {
      const { result } = renderHook(() => useAuthMutation(), {
        wrapper: createQueryWrapper(),
      });

      await act(() => {
        expect(
          result.current.handleSignup("unvalid@email.com", "foobar")
        ).rejects.toThrow("Request failed with status code 500");
      });

      await waitFor(() => {
        expect(result.current.signupMutation.isError).toBe(true);
      });

      expect(result.current.alertType).toBe("error");
      expect(result.current.alertMessage).toBe("Signup error");
      expect(result.current.signupMutation.data).toBeUndefined();
    });
  });
});
