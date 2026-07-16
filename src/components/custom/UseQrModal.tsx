import { useEffect, useRef, useState } from "react";
import QRCodeStyling from "qr-code-styling";
import { Button } from "../ui/button";
import logo from "@/assets/fotoEmocionalSF.png";
import XMarkIcon from "@heroicons/react/24/outline/XMarkIcon";
import { useAuthStore } from "@/auth/store/auth.store";

type Props = {
  setQrModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export const UseQrModal = ({ setQrModal }: Props) => {
  const apiUrl = import.meta.env.VITE_FRONT_URL + "/auth/qr-login";
  const { createQrCode } = useAuthStore();
  const qrRef = useRef<HTMLDivElement>(null);
  const [countdown, setCountdown] = useState(60);

  useEffect(() => {
    if (countdown <= 0) {
      setQrModal(false);
      return;
    }

    const interval = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [countdown]);

  useEffect(() => {
    const loadQr = async () => {
      try {
        const tempToken = await createQrCode();

        if (!tempToken) return;

        const qrCode = new QRCodeStyling({
          width: 368,
          height: 368,
          data: `${apiUrl}?token=${tempToken}`,
        });

        if (qrRef.current) {
          qrRef.current.innerHTML = "";
          qrCode.append(qrRef.current);
        }
      } catch (error) {
        console.error(error);
      }
    };

    loadQr();
  }, [apiUrl, createQrCode]);

  return (
    <div
      className="flex flex-col w-auto justify-center items-center gap-2 bg-black p-5 rounded-2xl border-2 border-yellow-400 text-yellow-500"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex w-92 justify-end">
        <Button variant={"myVariant"} onClick={() => setQrModal(false)}>
          <XMarkIcon className="h-6" />
        </Button>
      </div>
      <div className="relative w-92 h-92">
        <div ref={qrRef}></div>
        <img
          src={logo}
          alt="FotoEmocional"
          className="absolute top-1/2 left-1/2 w-36 h-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black p-1"
        />
      </div>
      <p className="text-yellow-500 text-xl">
        Escanea este QR para abrir en tu móvil.
      </p>
      <p className="text-yellow-500 text-xl">Valido por {countdown} segundos</p>
    </div>
  );
};
