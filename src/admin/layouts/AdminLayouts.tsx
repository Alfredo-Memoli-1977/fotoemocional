import { Footer } from "@/components/custom/Footer";
import { Menu } from "@/components/custom/Menu";
import { Outlet } from "react-router-dom";
import { AdminMenu } from "../components/AdminMenu";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

export const AdminLayouts = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen flex flex-col bg-black">
      <menu className="fixed top-0 left-0 w-full z-50">
        {/*  navbar */}
        <Menu />
      </menu>

      {/* <div className=" grid grid-cols-[1fr_5fr] pt-16 sm:pt-18 lg:pt-20"> */}
      <div className=" grid grid-col pt-16 sm:pt-18 lg:pt-20">
        {/* <div className="">
          <AdminMenu />
        </div> */}
        <main className="">
          <Button
            variant={"myVariant"}
            className="ms-2 mt-2"
            onClick={() => setOpen(!open)}
          >
            {open ? (
              <XMarkIcon className="h-6" />
            ) : (
              <Bars3Icon className="h-6" />
            )}
          </Button>
          <Outlet />
        </main>
        {open && (
          <div
            className="fixed inset-0 bg-transparent justify-start z-50 me-0.5 "
            onClick={() => setOpen(!open)}
          >
            <div className="flex h-full w-50 bg-transparent animate-in slide-in-from-left duration-300 mt-17 sm:mt-19 lg:mt-20.5 items-start justify-center">
              <AdminMenu open={open} setOpen={setOpen} />
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};
