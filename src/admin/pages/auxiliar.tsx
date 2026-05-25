import React from "react";

export const auxiliar = () => {
  return (
    <div>
      {/* {cell.column.id !== "id" ? ( // atención condición ternaria dentro de condición ternaria
        cell.column.id !== "isAdmin" ? ( // la otra condición
          <Input
            className={cn(
              "text-center border-0 focus:border-2 focus-visible:border-yellow-500 hover:cursor-pointer",
            )}
            value={String(cell.getValue())}
            onChange={(e) => {
              setEditData((prev) =>
                prev.map((user) =>
                  user.id === row.original.id
                    ? {
                        ...user,
                        [cell.column.id]: e.target.value,
                      }
                    : user,
                ),
              );
            }}
          />
        ) : (
          <div
            className={cn("flex justify-center items-center", {
              "bg-red-500":
                cell.getValue() !==
                originalUser?.[cell.column.id as keyof User],
            })}
          >
            <Checkbox
              className="border-yellow-500 hover:cursor-pointer data-[state=checked]:bg-yellow-500 data-[state=checked]:text-black"
              checked={Boolean(cell.getValue())}
              onCheckedChange={(value) => {
                setEditData((prev) =>
                  prev.map((user) =>
                    user.id === row.original.id
                      ? {
                          ...user,
                          isAdmin: Boolean(value),
                        }
                      : user,
                  ),
                );
              }}
            />
          </div> // termina la condición interior
        )
      ) : (
        flexRender(cell.column.columnDef.cell, cell.getContext())
      )} */}
      {/* fin de las condiciones ternarias */}
    </div>
  );
};
