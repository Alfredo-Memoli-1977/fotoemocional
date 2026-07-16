import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import type { FileWithPath } from "react-dropzone";
type Props = {
  // photos: string[];
  photos: FileWithPath[];
  deletePhoto: (photo: FileWithPath) => void;
};

export const CarouselPhotos = ({ photos, deletePhoto }: Props) => {
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(1);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new ResizeObserver(() => {
      if (ref.current?.clientWidth) {
        const visiblePhotos =
          Math.floor(ref.current.clientWidth / 136) > 1
            ? Math.floor(ref.current.clientWidth / 136)
            : 1;

        if (visiblePhotos < end) {
          setStart(end - visiblePhotos);
          setEnd(visiblePhotos);
          return;
        }
        setEnd(visiblePhotos);
      }
    });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end]);

  const handleCarousel = (num: number) => {
    setEnd((prev) => prev + num);
    setStart((prev) => prev + num);
  };

  return (
    <div className="flex items-center gap-2 w-3/4 justify-center">
      <Button
        className="border-0 hover:rounded-3xl size-10"
        variant="myVariant"
        disabled={start === 0}
        onClick={() => handleCarousel(-1)}
      >
        <ChevronLeft className="rounded-3xl size-10 border-2 border-yellow-500" />
      </Button>

      <div ref={ref} className="flex min-w-32 overflow-hidden">
        <div className="flex gap-2 ps-2">
          {photos.slice(start, end + 1).map((photo) => (
            <img
              key={photo.name}
              src={URL.createObjectURL(photo)}
              alt={photo.name}
              title={`Click Para Eliminar ${photo.name}`}
              onClick={() => {
                setEnd((prev) => prev - 1);
                deletePhoto(photo);
              }}
              className="w-32 h-32 shrink-0 rounded-xl border-2 border-yellow-500 object-cover"
            />
          ))}
        </div>
      </div>

      <Button
        className="border-0 hover:rounded-3xl size-10 "
        variant="myVariant"
        disabled={end === photos.length}
        onClick={() => handleCarousel(1)}
      >
        <ChevronRight className="rounded-3xl size-10 border-2 border-yellow-500" />
      </Button>
    </div>
  );
};
