"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import StoreProvider from "@/context/StoreProvider";
import { Toaster } from "sonner";
import { SocketContextProvider } from "@/context/SocketContext";

const queryClient = new QueryClient();

export default function GlobalProvider({ children }) {
  return (
    <>
      <StoreProvider>
        <SocketContextProvider>
          <QueryClientProvider client={queryClient}>
            <Toaster position="top-center" richColors />
            {children}
          </QueryClientProvider>
        </SocketContextProvider>
      </StoreProvider>
    </>
  );
}
