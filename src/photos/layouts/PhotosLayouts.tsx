import { Footer } from "@/components/custom/Footer";
import { Menu } from "@/components/custom/Menu";
import { Outlet } from "react-router-dom";

export const PhotosLayouts = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <menu className="fixed top-0 left-0 w-full z-50">
        {/*  navbar */}
        <Menu />
      </menu>
      <main className="flex-1 pt-16 sm:pt-18 lg:pt-20">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
