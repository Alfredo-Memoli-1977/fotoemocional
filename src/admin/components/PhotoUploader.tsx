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

  const path = photoFiles.map((photo) => URL.createObjectURL(photo));
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

      setPhotoFiles((prev) => [...prev, ...newFiles]);

      if ((newFiles.length + photoFiles.length) % 2 === 0) {
        const auxFiles = [...newFiles, ...photoFiles];
        auxFiles.sort((a, b) => a.name.localeCompare(b.name));
        for (let index = 0; index < auxFiles.length; index += 2) {
          if (
            auxFiles[index].name.slice(0, -3) !==
            auxFiles[index + 1].name.slice(0, -3)
          ) {
            return setCopy(false);
          }

          setCopy(true);
        }
      } else {
        setCopy(false);
      }
    },
    [photoFiles],
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleUpload = async () => {
    try {
      const submit = await mutateAsync(photoFiles);
      if (submit.success) {
        toast.message("Imagenes guardadas con exito");
        setPhotoFiles([]);
        setCopy(true);
        return;
      }
      toast.error(submit.error || "Error al guardar las imagenes");
    } catch (error) {
      toast.error("Error de comunicación con el servidor.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-2 m-2">
      <JumButron
        title="Agregar Fotografías"
        subTitle="Seleccione fotografías para cargar"
      />

      {photoFiles.length !== 0 && <CarouselPhotos photos={path} />}
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
