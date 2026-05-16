import { ErrorPage } from "@/components/custom/ErrorPage";
import { PendingPage } from "@/components/custom/IsPending";
import { cn } from "@/lib/utils";
// import { PhotoCard } from "@/photos/components/PhotoCard";
import { usePhotos } from "@/photos/hooks/usePhotos";
import { useParams } from "react-router-dom";

export const PhotoPage = () => {
  const { id } = useParams();
  const { data, isPending, error } = usePhotos();

  // if (isLoading) {
  //   return <p className="text-black">Cargando...</p>;
  // }

  if (isPending) {
    return <PendingPage />;
  }
  if (error) {
    return <ErrorPage />;
  }

  if (!data || data.length === 0) {
    return <h1 className="text-yellow-500">No hay fotos</h1>;
  }

  const photo = id ? data.find((photo) => photo.id === +id) : undefined;

  return (
    <div className="min-h-screen flex flex-col items-center  bg-black px-4 py-10">
      {/* {photo ? <PhotoCard key={photo.id} photo={photo} /> : <ErrorPage />} */}
      {photo ? (
        <img
          src={photo?.preview_url}
          className={cn(
            photo?.orientation === "landscape"
              ? "w-8/12 border-2  border-amber-400 rounded-2xl"
              : "w-3/10 border-2  border-amber-400 rounded-2xl",
          )}
        />
      ) : (
        <h1 className="text-yellow-500 text-2xl">
          Imagén no encontada para la selección actual
        </h1>
      )}
    </div>
  );
};
