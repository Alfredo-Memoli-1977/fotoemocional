import { useAuthStore } from "@/auth/store/auth.store";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Link } from "react-router-dom";
import { QrCode } from "lucide-react";

type Props = {
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  qrModal: boolean;
  setQrModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export const UserModal = ({ modal, setModal, qrModal, setQrModal }: Props) => {
  const { user, logout } = useAuthStore();

  const closeSesion = () => {
    logout();
    setModal(!modal);
  };
  return (
    <div
      className="flex flex-col w-full bg-black p-5 rounded-2xl border-2 border-yellow-400"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex flex-col items-end">
        <Button
          onClick={() => setModal(!modal)}
          variant={"myVariant"}
          className="w-1/4 border-0"
        >
          X
        </Button>
      </div>
      <Separator className=" w-full border-2 border-yellow-700  my-2" />
      <h4 className="font-medium text-yellow-400">
        {user?.name + " " + user?.lastname}
      </h4>

      {user?.isAdmin && (
        <>
          <Separator className=" w-full border-2 border-yellow-700  my-2" />
          <Link
            to="/admin"
            onClick={() => setModal(!modal)}
            className="text-yellow-500"
          >
            Panel de Aministrador
          </Link>
        </>
      )}
      <Separator className=" w-full border-2 border-yellow-700  my-2" />
      <Button
        onClick={() => {
          setModal(false);
          setQrModal(!qrModal);
        }}
        className="flex items-center justify-start ps-0 gap-2 bg-black text-yellow-500 "
      >
        Abrir en el Móvil <QrCode className="w-5 h-5" />
      </Button>
      <Separator className=" w-full border-2 border-yellow-700  my-2" />
      <Button onClick={closeSesion} variant={"myVariant"}>
        Cerrar Sesión
      </Button>
    </div>
  );
};
