import {
  categories,
  orientations,
  type Photo,
} from "@/interfaces/photo.interface";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { usePhotoUpdate } from "../hooks/usePhotoUpdate";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

export const AdminPhotoCard = ({ photo }: { photo: Photo }) => {
  const [editPhoto, setEditPhoto] = useState<Photo>(photo);
  const photoUpdateMutation = usePhotoUpdate();
  const queryClient = useQueryClient();

  const hasChanges = JSON.stringify(photo) !== JSON.stringify(editPhoto);

  const {
    id,
    title,
    description,
    orientation,
    preview_url,
    category,
    price,
    available,
  } = editPhoto;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    // const { name, value } = e.target;
    const { name } = e.target;
    const value = name === "price" ? Number(e.target.value) : e.target.value;
    setEditPhoto((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const update = async () => {
    const response = await photoUpdateMutation.mutateAsync({
      photo: editPhoto,
    });
    if (response.success) {
      queryClient.invalidateQueries({ queryKey: ["photos"] });
      toast.success("Foto actualizada correctamente");
    } else {
      toast.error(response.error);
    }
  };

  return (
    <Card
      // className="group border-0 shadow-none product-card-hover cursor-pointer w-60  m-5 xl:m-0 md:w-80 xl:w-120 bg-black"
      className="group border-0 shadow-none product-card-hover cursor-pointer w-11/12 lg:w-2/4  bg-black"
      // onClick={() => navigate(`/product/${id}`)}
    >
      <CardContent className=" p-0 rounded-2xl bg-white border-2 border-amber-400 ">
        <div className="flex justify-center">
          <img
            src={preview_url}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105 rounded-t-2xl"
          />
        </div>
        <Separator className=" w-full border-3 border-yellow-700 " />
        <div className="pt-2 px-4 space-y-3 bg-black rounded-b-2xl">
          <div className="space-y-1 ">
            <h3 className="font-medium text-yellow-600 text-xl tracking-tight text-center">
              Información de la imagen
            </h3>
            <div className="grid grid-cols-[1fr_2fr] font-medium text-yellow-500 text-sm tracking-tight gap-2 items-center">
              <p className="text-center">Identificador: </p>{" "}
              <Input name="id" className="border-0" value={id} readOnly />
              <p className="text-center">Titulo: </p>
              <Input name="title" value={title} onChange={handleInputChange} />
              <p className="text-center">Descripción: </p>
              <Input
                name="description"
                value={description}
                onChange={handleInputChange}
              />
              <p className="text-center">Catégoria: </p>
              <select
                name="category"
                value={category}
                onChange={handleInputChange}
                className="capitalize bg-black text-yellow-500 border border-yellow-500 rounded-md p-2"
              >
                {categories.map((category) => (
                  <option
                    className="capitalize"
                    key={category}
                    value={category}
                  >
                    {category}
                  </option>
                ))}
              </select>
              <p className="text-center">Orientación: </p>
              <select
                name="orientation"
                value={orientation}
                onChange={handleInputChange}
                className="capitalize bg-black text-yellow-500 border border-yellow-500 rounded-md p-2"
              >
                {orientations.map((orientation) => (
                  <option
                    className="capitalize"
                    key={orientation}
                    value={orientation}
                  >
                    {orientation}
                  </option>
                ))}
              </select>
              <p className="text-center">Precio: </p>
              <Input
                type="number"
                name="price"
                value={price}
                onChange={handleInputChange}
                className="appearance-none"
              />
              <p className="text-center">Visible: </p>{" "}
              <Checkbox
                checked={available}
                onCheckedChange={(value) => {
                  setEditPhoto((prev) => ({
                    ...prev,
                    available: Boolean(value),
                  }));
                }}
              />
            </div>
          </div>

          <div className="flex items-center justify-end">
            <Button
              size="sm"
              variant="myVariant"
              onClick={update}
              disabled={!hasChanges}
              className="mb-1 opacity-0 group-hover:opacity-100 transition-all duration-300 "
            >
              Guardar Cambios
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
