import { JumButron } from "@/components/custom/JumButron";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { useUserAdmin } from "../hooks/useUserAdmin";
import { PendingPage } from "@/components/custom/IsPending";
import { ErrorPage } from "@/components/custom/ErrorPage";
import { useEffect, useState } from "react";
import type { User } from "@/interfaces/user.interface";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useUserUpdate } from "../hooks/useUserUpdate";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

// const data = [
//   {
//     id: 1,
//     name: "Ada",
//     lastname: "Rosa",
//     email: "ada@gmail.com",
//     isAdmin: true,
//   },
//   {
//     id: 1,
//     name: "Ada",
//     lastname: "Rosa",
//     email: "ada@gmail.com",
//     isAdmin: true,
//   },
//   {
//     id: 1,
//     name: "Ada",
//     lastname: "Rosa",
//     email: "ada@gmail.com",
//     isAdmin: true,
//   },
// ];
const columns = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "name", header: "Nombre" },
  { accessorKey: "lastname", header: "Apellido" },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "isAdmin", header: "Administrador" },
];

export const AdminUserPage = () => {
  const { data, isPending, error } = useUserAdmin();
  // Carga las claves directamente del objeto y no tengo que crear las columnas a mano
  // Problemas que al cargar las claves las hace como en el back y puede ser ilegible-> id name lastname email isAdmin
  // const columns = data
  //   ? Object.keys(data[0]).map((key) => ({
  //       accessorKey: key,
  //       header: key.toUpperCase(),
  //     }))
  //   : [];

  // Crea la tabla
  const [editData, setEditData] = useState<User[]>([]);
  const updateUsers = useUserUpdate();

  // Le asigna a editData->data es al cargar
  useEffect(() => {
    if (data) {
      setEditData(data);
    }
  }, [data]);

  // Si hay cambios en editData sera true
  const hasChanges = JSON.stringify(data) !== JSON.stringify(editData);
  // tabla
  const table = useReactTable({
    data: editData ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isPending) {
    return <PendingPage />;
  }

  if (error) {
    return <ErrorPage />;
  }
  // Enva los datos de la tabla para guardar
  const update = async () => {
    const response = await updateUsers.mutateAsync(editData);
    if (response.success) {
      toast.success("Usuarios actualizados");
    } else {
      toast.error(response.error);
    }
  };

  return (
    <div className=" flex flex-col text-yellow-500  bg-black">
      <JumButron
        title="Administrar Usuarios"
        subTitle="En esta página puedes editar los usuarios"
      />
      <div className="overflow-x-auto overflow-y-hidden w-full max-w-[90vw] lg:max-w-[95vw] xl:max-w-7xl mx-auto my-5">
        <table className="w-full">
          <thead className="border-2 border-yellow-500">
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id}>
                {hg.headers.map((header) => (
                  <th key={header.id} className="border-2 border-yellow-500">
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  const originalUser = data?.find(
                    (user) => user.id === row.original.id,
                  );
                  return (
                    <td
                      className={cn(" border-2 border-yellow-500 text-center", {
                        "bg-red-500":
                          cell.getValue() !==
                          originalUser?.[cell.column.id as keyof User],
                      })}
                      key={cell.id}
                    >
                      {/* {flexRender(cell.column.columnDef.cell, cell.getContext())} */}
                      {cell.column.id !== "id" ? ( // atención condición ternaria dentro de condición ternaria
                        cell.column.id !== "isAdmin" ? ( // la otra condición
                          <Input
                            className={cn(
                              "text-center border-0 focus:border-2 focus-visible:border-yellow-500 ",
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
                              className="border-yellow-500 data-[state=checked]:bg-yellow-500 data-[state=checked]:text-black"
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
                        flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )
                      )}
                      {/* fin de las condiciones ternarias */}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex mt-3 items-center justify-end w-full">
          <Button variant={"myVariant"} disabled={!hasChanges} onClick={update}>
            Guardar cambios
          </Button>
        </div>
      </div>
    </div>
  );
};
