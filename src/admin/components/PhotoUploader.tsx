import { JumButron } from "@/components/custom/JumButron";
import { useCallback, useState } from "react";
import { useDropzone, type FileWithPath } from "react-dropzone";
import {
  // Upload,
  ImageUp,
  // FileUp,
  // FolderUp,
  // Images,
  // Aperture,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { CarouselPhotos } from "@/components/custom/CarouselPhotos";
import { usePhotoUpload } from "../hooks/usePhotoUpload";
import { toast } from "sonner";

export const PhotoUploader = () => {
  const [photoFiles, setPhotoFiles] = useState<FileWithPath[]>([]);
  const [copy, setCopy] = useState(true);
  const { mutateAsync } = usePhotoUpload();

  // const path = photoFiles.map((photo) => URL.createObjectURL(photo));
  //carga las fotos del drop y las guarda photoFiles
  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      const newFiles = acceptedFiles.filter(
        (file) =>
          !photoFiles.some(
            (photo) =>
              photo.name === file.name &&
              photo.size === file.size &&
              photo.lastModified === file.lastModified,
          ),
      );
      const updateFiles = [...photoFiles, ...newFiles].sort((a, b) =>
        a.name.localeCompare(b.name),
      );
      setPhotoFiles(updateFiles);
      photoVerify(updateFiles);
    },
    [photoFiles],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  //Enviar fotos al backend
  const handleUpload = async () => {
    try {
      const submit = await mutateAsync(photoFiles);
      if (submit.success) {
        toast.message("Imagenes guardadas con exito");
        setPhotoFiles([]);
        setCopy(true);
        return;
      }
      if (submit.duplicates) {
        toast.error(submit.error || "Error al guardar las imagenes");
        const photoDuplicate = photoFiles.filter((file) =>
          submit.duplicates?.includes(file.name),
        );

        setPhotoFiles(photoDuplicate);
        photoVerify(photoDuplicate);
      }

      toast.error(submit.error || "Error al guardar las imagenes");
    } catch (error) {
      toast.error("Error de comunicación con el servidor.");
    }
  };
  //Borrar fotos del carrusel
  const deletePhoto = (photo: FileWithPath) => {
    const photoremove = photoFiles.filter(
      (photofile) => photofile.name !== photo.name,
    );
    setPhotoFiles(photoremove);
    photoVerify(photoremove);
  };

  //Verifica que existan pares de fotos por nombre pero distinta extensión
  const photoVerify = (files: FileWithPath[]) => {
    if (files.length === 0) {
      setCopy(true);
      return;
    }

    if (files.length % 2 !== 0) {
      setCopy(false);
      return;
    }

    for (let index = 0; index < files.length; index += 2) {
      if (
        files[index].name.slice(0, -3) !== files[index + 1].name.slice(0, -3)
      ) {
        setCopy(false);
        return;
      }
    }

    setCopy(true);
  };
  return (
    <div className="flex flex-col items-center justify-center gap-2 m-2">
      <JumButron
        title="Agregar Fotografías"
        subTitle="Seleccione fotografías para cargar"
      />

      {photoFiles.length !== 0 && (
        <CarouselPhotos photos={photoFiles} deletePhoto={deletePhoto} />
      )}
      {photoFiles.length !== 0 && (
        <h1 className="text-yellow-500 text-3xl">
          Fotos seleccionadas: {photoFiles.length}
        </h1>
      )}
      {!copy && (
        <h1 className="text-yellow-500 text-3xl">Falta una o más copias</h1>
      )}
      <div
        className="flex w-full justify-center items-center"
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <div className=" text-center items-center justify-center w-3/4 min-h-120 border-2 border-dashed border-yellow-400 bg-yellow-500/10 rounded-xl p-8 text-yellow-400">
            <p className="text-yellow-500">Suelta las fotografías aquí...</p>
          </div>
        ) : (
          <div className=" text-center items-center justify-center w-3/4 min-h-120 border-2 border-dashed border-yellow-400 bg-yellow-500/10 rounded-xl p-8 text-yellow-400">
            <ImageUp className="mx-auto w-16 h-16" />
            <p className="text-2xl">Arrastra las fotografías aquí</p>
            <p className="mt-2 underline text-2xl">
              Haz clic para seleccionarlas
            </p>
          </div>
        )}
      </div>
      <Button
        variant={"myVariant"}
        disabled={photoFiles.length === 0 || !copy}
        onClick={handleUpload}
      >
        Subir imagenes
      </Button>
    </div>
  );
};
