import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import type { Orientation, Category } from "@/interfaces/photo.interface";
import { useSearchParams } from "react-router-dom";

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
export const FiltersGallery = ({ open, setOpen }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const orientation = (searchParams.get("orientation") ||
    "landscape") as Orientation;
  const category = (searchParams.get("category") || "all") as Category;
  const minPrice = searchParams.get("minPrice") || "any";

  const handlePriceChanged = (price: string) => {
    const params = new URLSearchParams(searchParams);
    switch (price) {
      case "0":
        params.set("minPrice", "0");
        params.set("maxPrice", "10");
        break;

      case "10":
        params.set("minPrice", "10");
        params.set("maxPrice", "20");
        break;

      default:
        params.delete("minPrice");
        params.delete("maxPrice");
    }
    setSearchParams(params);
  };

  const handleOrientationChanged = (orientation: Orientation) => {
    const params = new URLSearchParams(searchParams);
    params.set("orientation", orientation);
    setSearchParams(params);
  };

  const HandleCategoryChanged = (category: Category) => {
    const params = new URLSearchParams(searchParams);
    if (category === "all") {
      params.delete("category");
      setSearchParams(params);
      return;
    }
    params.set("category", category);
    setSearchParams(params);
  };

  return (
    <div
      className="flex flex-col w-full bg-black p-5 rounded-2xl border-2 border-yellow-400"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex flex-col items-end">
        <Button
          onClick={() => setOpen(!open)}
          variant={"myVariant"}
          className="w-1/4 border-0"
        >
          X
        </Button>
      </div>
      <Separator className=" w-full border-2 border-yellow-700  my-2" />

      <div className="space-y-4">
        <h4 className="font-medium text-yellow-400">Precio</h4>
        <RadioGroup defaultValue="" className="space-y-3">
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="any"
              id="priceAny"
              checked={minPrice === "any"}
              onClick={() => handlePriceChanged("any")}
              //   onChange={(e) => handlePriceChanged(e.target.value)}
            />
            <Label
              htmlFor="priceAny"
              className="text-sm cursor-pointer text-yellow-400"
            >
              Cualquier precio
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value={minPrice}
              id="price1"
              checked={minPrice === "0"}
              onClick={() => handlePriceChanged("0")}
              //   onChange={(e) => handlePriceChanged(e.target.value)}
            />
            <Label
              // htmlFor="price1"
              className="text-sm cursor-pointer  text-yellow-400"
            >
              0€ - 10€
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="10-20"
              id="price2"
              checked={minPrice === "10"}
              onClick={() => handlePriceChanged("10")}
              //   onChange={(e) => handlePriceChanged(e.target.value)}
            />
            <Label
              // htmlFor="price2"
              className="text-sm cursor-pointer  text-yellow-400"
            >
              10€ - 20€
            </Label>
          </div>
        </RadioGroup>
      </div>

      <Separator className=" w-full border-2 border-yellow-700  my-2" />

      <div className="space-y-4">
        <h4 className="font-medium text-yellow-400">Orientación</h4>
        <RadioGroup defaultValue="" className="space-y-3">
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="landscape"
              id="landscape"
              checked={orientation === "landscape"}
              onClick={() => handleOrientationChanged("landscape")}
            />
            <Label
              // htmlFor="price1"
              className="text-sm cursor-pointer  text-yellow-400"
            >
              Landscape
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="portrait"
              id="portrait"
              checked={orientation === "portrait"}
              onClick={() => handleOrientationChanged("portrait")}
            />
            <Label
              // htmlFor="price2"
              className="text-sm cursor-pointer  text-yellow-400"
            >
              Portait
            </Label>
          </div>
        </RadioGroup>
      </div>

      <Separator className=" w-full border-2 border-yellow-700  my-2" />

      <div className="space-y-4">
        <h4 className="font-medium text-yellow-400">Tipo de paisaje</h4>
        <RadioGroup defaultValue="" className="space-y-3">
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="all"
              id="all"
              checked={category === "all"}
              onClick={() => HandleCategoryChanged("all")}
            />
            <Label
              // htmlFor="price1"
              className="text-sm cursor-pointer  text-yellow-400"
            >
              Todos
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="rural"
              id="rural"
              checked={category === "rural"}
              onClick={() => HandleCategoryChanged("rural")}
            />
            <Label
              // htmlFor="price1"
              className="text-sm cursor-pointer  text-yellow-400"
            >
              Rural
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="urban"
              id="urban"
              checked={category === "urban"}
              onClick={() => HandleCategoryChanged("urban")}
            />
            <Label
              // htmlFor="price2"
              className="text-sm cursor-pointer  text-yellow-400"
            >
              Urbano
            </Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};
