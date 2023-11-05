import { act, renderHook } from "@testing-library/react";
import * as router from "react-router";
import { setCookie } from "typescript-cookie";
import { vi } from "vitest";
import { useLogout } from "../../lib/hooks/useLogout";
import { createQueryWrapper } from "../utils/wrappers";

const navigate = vi.fn();

beforeEach(() => {
  vi.spyOn(router, "useNavigate").mockImplementation(() => navigate);
});

vi.mock("typescript-cookie", () => ({
  setCookie: vi.fn(),
}));

describe("useLogout", () => {
  it("should call setCookie, updateUserId, and navigate to /auth when handleLogout is called", async () => {
    const { result } = renderHook(() => useLogout(), {
      wrapper: createQueryWrapper(),
    });

    await act(() => result.current.handleLogout());

    expect(setCookie).toHaveBeenCalledWith("token", "", { expires: 0 });
    expect(navigate).toHaveBeenCalledWith("/auth");
  });
});
