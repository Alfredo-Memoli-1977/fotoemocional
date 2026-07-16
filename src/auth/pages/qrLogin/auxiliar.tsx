import { useAuthStore } from "@/auth/store/auth.store";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

type VerifyStatus = "checking" | "success" | "error";

export const QrLoginPage = () => {
  const { verifyQrCode } = useAuthStore();
  const [verify, setVerify] = useState<VerifyStatus>("checking");
  const hasVerified = useRef(false);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    if (hasVerified.current) return;
    hasVerified.current = true;

    if (!token) {
      navigate("/");
      return;
    }

    const verifyLogin = async () => {
      const success = await verifyQrCode(token);

      if (success) {
        setVerify("success");
      } else {
        setVerify("error");
      }

      await new Promise((resolve) => setTimeout(resolve, 5000));

      if (success) {
        navigate("/");
      } else {
        navigate("/auth/login");
      }
    };

    verifyLogin();
  }, [token, navigate, verifyQrCode]);

  if (verify === "checking") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-black">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-yellow-600/30 border-t-yellow-600" />
        <p className="text-lg text-yellow-600">Cargando...</p>
      </div>
    );
  }

  if (verify === "error") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-black">
        <h1 className="text-3xl text-yellow-600">Error al iniciar sesión</h1>
        <p className="text-white">
          Serás enviado a la página de inicio de sesión.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-black">
      <h1 className="text-3xl text-yellow-600">
        Sesión iniciada correctamente
      </h1>
      <p className="text-white">Serás enviado a la página principal.</p>
    </div>
  );
};
