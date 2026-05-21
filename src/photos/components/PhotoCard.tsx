import { useLocation, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Photo } from "@/interfaces/photo.interface";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart } from "lucide-react";

export const PhotoCard = ({ photo }: { photo: Photo }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id, title, description, orientation, preview_url, category, price } =
    photo;
  const photoView = () => {
    if (location.pathname === "/admin/photos") {
      navigate("/admin/photo-editor");
      return;
    }
    navigate(`/photo/${id}?orientation=${orientation}`);
  };

  return (
    <Card
      // className="group border-0 shadow-none product-card-hover cursor-pointer w-60  m-5 xl:m-0 md:w-80 xl:w-120 bg-black"
      className="group border-0 shadow-none product-card-hover cursor-pointer w-full   bg-black"
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
        <div
          className="pt-2 px-4 space-y-3 bg-black rounded-b-2xl"
          // onClick={() => navigate(`/photo/${id}?orientation=${orientation}`)}
          onClick={photoView}
        >
          <div className="space-y-1 ">
            <h3 className="font-medium text-yellow-600 text-sm tracking-tight">
              {title}
            </h3>
            <p className="text-xs text-yellow-300 uppercase ">
              {category} - {description}
              <br />
              {orientation}
            </p>
            {/* <p className="text-xs text-muted-foreground uppercase">
              Orientacion- <span> {orientation}</span>
            </p> */}
          </div>
          {/* <div>
            <p>Tallas</p>
            {sizes.map((size) => (
              <Button variant="outline" className="mx-0.5">
                {size}
              </Button>
            ))} 
          </div>*/}
          <div className="flex items-center justify-between ">
            <p className="font-semibold text-yellow-600 text-lg">${price}</p>
            <Button
              size="sm"
              variant="myVariant"
              className="mb-1 opacity-0 group-hover:opacity-100 transition-all duration-300 "
            >
              <ShoppingCart />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
