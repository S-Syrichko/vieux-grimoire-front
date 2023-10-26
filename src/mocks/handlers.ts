import { rest } from "msw";

export const handlers = [
  rest.post("http://localhost:4000/api/auth/login", (req, res, ctx) => {
    if (req.body.email === "validate@request.com") {
        return res(
            ctx.status(200),
            ctx.json({
                userId: "id123",
                token: "token123",
            })
        );
    } else {
        return res(
            ctx.status(401),
            ctx.json({
                message: "Invalid credentials",
            })
        );
    }
    
  }),
];
