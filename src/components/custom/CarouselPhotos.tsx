import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
type Props = {
  photos: string[];
};

export const CarouselPhotos = ({ photos }: Props) => {
  // const [position, setPosition] = useState(0);
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

        if (visiblePhotos <= end) {
          setStart(end - visiblePhotos);
          setEnd(end);
          return;
        }
        setEnd(visiblePhotos);
        // console.log("Fotos visibles", visiblePhotos);
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
        variant="myVariant"
        disabled={start === 0}
        onClick={() => handleCarousel(-1)}
      >
        {"<"}
      </Button>

      <div ref={ref} className="flex min-w-32 overflow-hidden">
        <div className="flex gap-2 ps-2">
          {photos.slice(start, end + 1).map((photo) => (
            <img
              key={photo}
              src={photo}
              alt={photo}
              className="w-32 h-32 shrink-0 rounded-xl border-2 border-yellow-500 object-cover"
            />
          ))}
        </div>
      </div>

      <Button
        variant="myVariant"
        disabled={end === photos.length}
        onClick={() => handleCarousel(1)}
      >
        {">"}
      </Button>
    </div>
  );
};
