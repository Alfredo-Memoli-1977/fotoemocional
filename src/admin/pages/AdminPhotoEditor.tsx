import { ErrorPage } from "@/components/custom/ErrorPage";
import { PendingPage } from "@/components/custom/IsPending";
import { JumButron } from "@/components/custom/JumButron";
import type { Photo } from "@/interfaces/photo.interface";
import { usePhotos } from "@/photos/hooks/usePhotos";
import { useSearchParams } from "react-router-dom";
import { AdminPhotoCard } from "../components/AdminPhotoCard";

export const AdminPhotoEditor = () => {
  const [serchParams] = useSearchParams();
  const id = serchParams.get("id");
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

  const photo = id
    ? (data.find((photo) => photo.id === +id) as Photo)
    : undefined;

  return (
    <>
      <JumButron
        title="Edición"
        subTitle="Edición de información y visibilidad"
      />
      <div className="min-h-screen flex flex-col items-center  bg-black px-4 py-10">
        {photo ? (
          <AdminPhotoCard key={photo.id} photo={photo} />
        ) : (
          <ErrorPage />
        )}
      </div>
    </>
  );
};
