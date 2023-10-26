import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient({
    logger: {
      log: console.log,
      warn: console.warn,
      // ✅ no more errors on the console for tests
      error: process.env.NODE_ENV === 'test' ? () => {} : console.error,
    },
  })

export default queryClient;