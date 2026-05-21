import { JumButron } from "@/components/custom/JumButron";
import { GalleryPage } from "@/photos/pages/gallery/GalleryPage";
export const AdminPhotosPage = () => {
  return (
    <div className=" flex flex-col text-yellow-500  bg-black">
      <JumButron
        title={"Administrar Imágenes"}
        subTitle="En esta página puedes editar tus imágenes"
      />
      <GalleryPage />
    </div>
  );
};
