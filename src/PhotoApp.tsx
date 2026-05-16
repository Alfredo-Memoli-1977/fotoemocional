import { RouterProvider } from "react-router-dom";
import { apprRouter } from "./app.router";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useAuthStore } from "./auth/store/auth.store";
import { PendingPage } from "./components/custom/IsPending";
import type { PropsWithChildren } from "react";
import { Toaster } from "sonner";

const queryClient = new QueryClient();

const CheckAuthProvider = ({ children }: PropsWithChildren) => {
  const { checkAuthStatus } = useAuthStore();

  const { isLoading } = useQuery({
    queryKey: ["auth"],
    queryFn: checkAuthStatus,
    retry: false, // no reitenta la petición si falla
    refetchInterval: 1000 * 60 * 1.5, // actualiza el token cada 1:30 horas así no se cierra la sesión
    refetchOnWindowFocus: true,
  });
  if (isLoading) return <PendingPage />;
  return children;
};

function PhotoApp() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster theme="dark" richColors position="top-right" />
      <CheckAuthProvider>
        <RouterProvider router={apprRouter} />
      </CheckAuthProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default PhotoApp;
