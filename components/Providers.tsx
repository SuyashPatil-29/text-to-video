"use client";
import { SessionProvider } from "next-auth/react";
import React, { FC } from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

interface ProviderProps {
  children: React.ReactNode;
}

const AllProviders: FC<ProviderProps> = ({ children }) => {
    const queryClient = new QueryClient();
  return (
    <SessionProvider>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
    </SessionProvider>
  );
};

export default AllProviders;
