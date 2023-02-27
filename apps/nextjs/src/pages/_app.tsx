// src/pages/_app.tsx
import "../styles/globals.css";
import type { AppType } from "next/app";
import { ClerkProvider } from "@clerk/nextjs";
import { trpc } from "../utils/trpc";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const MyApp: AppType = ({ Component, pageProps: { ...pageProps } }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      },
    },
  });

  return (
    <ClerkProvider {...pageProps}>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ClerkProvider>
  );
};

export default trpc.withTRPC(MyApp);
