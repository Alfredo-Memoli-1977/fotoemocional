import { useAuthStore } from "@/auth/store/auth.store";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

type VerifyStatus = "checking" | "success" | "error";

export const QrLoginPage = () => {
  const { verifyQrCode } = useAuthStore();
  const [verify, setVerify] = useState<VerifyStatus>("checking");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  if (!token) {
    navigate("/");
    return;
  }
  const data = async () => {
    return await verifyQrCode(token);
  };

  //   const verifyLogin = async () => {
  //     setVerify(await data());
  //   };
  const verifyLogin = async () => {
    if (await data()) {
      setVerify("success");
      return;
    }
    setVerify("error");
  };
  useEffect(() => {
    verifyLogin();
  }, []);
  const handleRedirect = async () => {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    // Esto se ejecuta 3 segundos después
    if (verify === "success") {
      navigate("/");
    }
    if (verify === "error") {
      navigate("/auth/login");
    }
  };
  if (verify === "success") {
    handleRedirect();
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-black">
        <h1 className="text-3xl text-yellow-600">Sesión Iniciada</h1>
      </div>
    );
  }
  if (verify === "checking") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-black">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-yellow-600/30 border-t-yellow-600"></div>
        <p className="text-lg text-yellow-600">Cargando...</p>
      </div>
    );
  }
  if (verify === "error") {
    handleRedirect();
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-black">
        <h1 className="text-3xl text-yellow-600">Error al cargar la Página</h1>
      </div>
    );
  }
};
