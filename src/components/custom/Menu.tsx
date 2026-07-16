import { useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { Search } from "lucide-react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import logo from "@/assets/fotoEmocionalSF.png";
import { Button } from "../ui/button";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/auth/store/auth.store";
import { UserModal } from "./UserModal";
import { UseQrModal } from "./UseQrModal";

type NavItem = {
  name: string;
  to: string;
};

const navigation: NavItem[] = [
  { name: "Inicio", to: "/" },
  { name: "Galeria", to: "/gallery" },
  { name: "Nosotros", to: "/about" },
  { name: "Contacto", to: "/contact" },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export function Menu() {
  const { authStatus, user } = useAuthStore();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [modal, setModal] = useState(false);
  const [qrModal, setQrModal] = useState(false);
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  // const inputRef = useRef<HTMLInputElement>(null);// lo cambie, ya no es necesario, ver en la funcion setSearch
  const query = searchParams.get("q") || "";

  const shortName = user
    ? user?.name.charAt(0).toUpperCase() +
      user?.lastname.charAt(0).toUpperCase()
    : "";
  // const setFilter = (event: React.KeyboardEvent<HTMLInputElement>) => {
  //   searchParams.set("q", inputRef.current?.value || "");
  //   setSearchParams(searchParams);
  // };

  const setFilter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== "Enter") return;
    // const query = inputRef.current?.value; // cambio por la siguiente line y saco el inputref
    const query = event.currentTarget.value;
    event.currentTarget.value = "";
    if (location.pathname !== "/gallery") {
      navigate(`/gallery?q=${query}`);
      return;
    }
    // const newSearchParams = new URLSearchParams(); // Se borran los parametros solo queda q si no esta vacio
    const newSearchParams = new URLSearchParams(searchParams); //Mantiene los filtros ya seleccionados

    if (!query) {
      newSearchParams.delete("q");
    } else {
      newSearchParams.set("q", query);
    }
    setSearchParams(newSearchParams);
  };
  return (
    <nav className="relative  bg-black border-b-4 border-yellow-500">
      <div className="mx-auto px-4 ">
        <div className="flex h-16 items-center justify-center gap-10 sm:gap-1 sm:h-18 lg:h-20  ">
          {/* Logo */}
          <img
            // src=".\src\assets\fotoEmocional.png"
            src={logo} //es mejor importarla para evitar rotura de rutas
            alt="FotoEmocional Logo"
            className="h-16 w-auto sm:h-18 lg:h-20"
          />

          {/* Botón mobile */}
          <button
            onClick={() => setOpen(!open)}
            className="sm:hidden rounded-md p-2 text-yellow-300 hover:text-yellow-500"
          >
            {open ? (
              <XMarkIcon className="h-6" />
            ) : (
              <Bars3Icon className="h-6" />
            )}
          </button>

          {/* Desktop */}
          <div className="hidden gap-2 sm:flex space-x-4 ">
            {navigation.map((item) => {
              const active = location.pathname === item.to;

              return (
                <Link
                  key={item.name}
                  to={item.to}
                  className={classNames(
                    active
                      ? "sm:text-yellow-400 border-b-4 border-b-amber-400"
                      : "sm:text-yellow-300 hover:text-yellow-500 ",
                    "px-3 py-2 sm:px-1 font-medium lg:text-3xl",
                  )}
                >
                  {item.name}
                </Link>
              );
            })}

            <div className="relative flex flex-col lg:ms-20 items-center justify-center">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-yellow-500 w-4 h-4" />
              <Input
                // ref={inputRef}
                type="search"
                className="pl-8"
                placeholder="Buscar en galeria..."
                onKeyDown={setFilter}
                defaultValue={query}
              ></Input>
            </div>
          </div>
          <div className=" flex flex-col lg:ms-20 items-center justify-center">
            {authStatus === "not-authenticated" ? (
              <Link to={"auth/login"}>
                <Button variant={"myVariant"}>Iniciar Sesión</Button>
              </Link>
            ) : (
              <Button
                title={user ? user?.name + " " + user?.lastname : ""}
                variant={"myVariant"}
                className="size-10 rounded-full  "
                onClick={() => setModal(!modal)}
              >
                {shortName}
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menú */}
      {open && (
        <div className="sm:hidden px-4 pt-2 pb-3 space-y-1">
          {navigation.map((item) => {
            const active = location.pathname === item.to;

            return (
              <Link
                key={item.name}
                to={item.to}
                onClick={() => setOpen(false)}
                className={classNames(
                  active
                    ? "text-yellow-400  underline underline-amber-400 underline-offset-8 decoration-2"
                    : "text-yellow-300 hover:text-yellow-500",
                  "block px-3 py-2",
                )}
              >
                {item.name}
              </Link>
            );
          })}

          <div className="relative flex flex-col w-40 mt-5 lg:ms-20 items-center justify-center">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-yellow-500 w-4 h-4" />
            <Input
              // ref={inputRef}
              type="search"
              className="pl-8"
              placeholder="Buscar..."
              onKeyDown={setFilter}
              defaultValue={query}
            ></Input>
          </div>
        </div>
      )}

      {modal && (
        <div
          className="fixed inset-0 bg-transparent flex justify-end  z-50 me-0.5"
          onClick={() => setModal(!modal)}
        >
          <div className="flex h-full w-60 bg-transparent animate-in slide-in-from-right duration-300 mt-20 items-start justify-center">
            <UserModal
              modal={modal}
              setModal={setModal}
              qrModal={qrModal}
              setQrModal={setQrModal}
            />
          </div>
        </div>
      )}
      {qrModal && (
        <div
          className="fixed inset-0 bg-transparent flex justify-center z-50 me-0.5"
          onClick={() => setQrModal(false)}
        >
          <div className="flex h-full w-150 bg-transparent animate-in slide-in-from-right duration-300 mt-20 items-start justify-center">
            <UseQrModal setQrModal={setQrModal} />
          </div>
        </div>
      )}
    </nav>
  );
}
