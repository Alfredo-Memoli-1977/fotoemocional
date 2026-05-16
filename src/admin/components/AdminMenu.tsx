import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { XMarkIcon } from "@heroicons/react/24/outline";

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const AdminMenu = ({ open, setOpen }: Props) => {
  return (
    <div
      className="flex flex-col w-full bg-black p-5 rounded-2xl border-2 border-yellow-400"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="grid grid-cols-2  items-center">
        <h4 className="font-medium text-start text-yellow-400">
          Administración
        </h4>
        <Button
          onClick={() => setOpen(!open)}
          variant={"myVariant"}
          className="ms-15 border-0 "
        >
          <XMarkIcon className="h-6" />
        </Button>
      </div>
      {/* <Separator className=" w-full border-2 border-yellow-700  my-2" /> */}

      <Separator className=" w-full border-2 border-yellow-700  my-2" />
      <Link
        to="/admin"
        onClick={() => setOpen(!open)}
        className="text-yellow-500"
      >
        Administrar Fotos
      </Link>

      <Separator className=" w-full border-2 border-yellow-700  my-2" />
      <Link
        to="/admin/users"
        onClick={() => setOpen(!open)}
        className="text-yellow-500"
      >
        Administrar Usuarios
      </Link>
    </div>
  );
};
