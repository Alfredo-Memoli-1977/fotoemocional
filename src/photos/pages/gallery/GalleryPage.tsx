import { ErrorPage } from "@/components/custom/ErrorPage";
import { PendingPage } from "@/components/custom/IsPending";
import { PhotoCard } from "@/photos/components/PhotoCard";
import { usePhotos } from "@/photos/hooks/usePhotos";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { Filter } from "lucide-react";
import { useState } from "react";
import { FiltersGallery } from "@/photos/components/FiltersGallery";
import { JumButron } from "@/components/custom/JumButron";

export const GalleryPage = () => {
  const [open, setOpen] = useState(false);
  const { data, isPending, error } = usePhotos();

  if (isPending) {
    return <PendingPage />;
  }

  if (error) {
    return <ErrorPage />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center  bg-black px-4 py-10">
      {/* <h1 className="text-yellow-300 text-3xl md:text-4xl italic text-center ">
        Galeria
        </h1> */}
      <JumButron
        title="Mi Galeria de Imágenes"
        subTitle="En esta sección podrás ver y adquirir mis fotos"
      />
      <img src="images/fotoEmocionalSF.png" />
      <div className="flex w-full justify-end items-end me-5">
        {/* filter desktop  */}
        <Button
          variant="myVariant"
          size="sm"
          onClick={() => setOpen(!open)}
          className="lg:text-2xl lg:p-5 "
        >
          <Filter className="h-4 w-4 mr-2" />
          Filtros
        </Button>
      </div>
      {open && (
        <div
          className="fixed inset-0 bg-transparent flex justify-end  z-50 me-0.5"
          onClick={() => setOpen(!open)}
        >
          <div className="flex h-full w-80 bg-transparent animate-in slide-in-from-right duration-300 items-center justify-center">
            <FiltersGallery open={open} setOpen={setOpen} />
          </div>
        </div>
      )}

      {/* carga de imagenes */}
      <div
        className={cn(
          !data || data.length === 0
            ? "mt-6 grid items-center justify-center"
            : "mt-6 grid  gap-2  sm:grid-cols-2 xl:grid-cols-3 ",
        )}
      >
        {!data || data.length === 0 ? (
          // <div className=" flex items-center justify-center bg-pink-600">
          <h1 className="text-yellow-400 text-3xl ">
            No hay fotos para la selección actual
          </h1>
        ) : (
          // </div>
          data?.map((photo) => (
            // <img
            //   key={photo.id}
            //   src={photo.preview_url}
            //   className="w-40 h-40 object-cover bg-white"
            // />

            <PhotoCard key={photo.id} photo={photo} />
          ))
        )}
      </div>
    </div>
  );
};
