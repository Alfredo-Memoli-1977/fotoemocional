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
import { Trash2 } from "lucide-react";
import { AlertDialogDelUsr } from "../components/AlertDialogDelUsr";

const columns = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "name", header: "Nombre" },
  { accessorKey: "lastname", header: "Apellido" },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "isAdmin", header: "Administrador" },
  {
    accessorKey: "delete",
    header: () => <Trash2 className="w-4 h-4 text-yellow-500 mx-auto" />,
  },
];

export const AdminUserPage = () => {
  const { data, isPending, error } = useUserAdmin();

  // Crea la tabla
  const [editData, setEditData] = useState<User[]>([]);
  const [del, setDel] = useState<Record<number, boolean>>({});
  const [open, setOpen] = useState(false);
  const updateUsers = useUserUpdate();

  // Le asigna a editData->data es al cargar
  useEffect(() => {
    if (data) {
      setEditData(data);
    }
  }, [data]);

  // Si hay cambios en editData sera true
  const hasChanges =
    JSON.stringify(data) !== JSON.stringify(editData) ||
    Object.values(del).some(Boolean); // si hay cambios en el estado de del
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

  // Envia los datos de la tabla para guardar
  const update = async () => {
    // si usamos editData del primera no se actualiza antes de enviar al back mejor usar un auxiliar
    const newEditData = editData.filter((user) => !del[user.id]);

    const response = await updateUsers.mutateAsync(newEditData);
    if (response.success) {
      setEditData(newEditData);
      setDel({});
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
                  const cellName = cell.column.id;
                  return (
                    <td
                      className={cn("border-2 border-yellow-500 text-center", {
                        "w-12": cellName === "id" || cellName === "delete",
                        "bg-red-500":
                          cellName === "delete"
                            ? (del[row.original.id] ?? false)
                            : cell.getValue() !==
                              originalUser?.[cell.column.id as keyof User],
                      })}
                      key={cell.id}
                    >
                      {/* {flexRender(cell.column.columnDef.cell, cell.getContext())} */}
                      {(() => {
                        switch (cellName) {
                          case "id":
                            return flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext(),
                            );

                          case "isAdmin":
                            return (
                              <div
                                className={cn(
                                  "flex justify-center items-center",
                                  {
                                    "bg-red-500":
                                      cell.getValue() !==
                                      originalUser?.[
                                        cell.column.id as keyof User
                                      ],
                                  },
                                )}
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
                              </div>
                            );
                          case "delete": {
                            const isDeleting = del[row.original.id] ?? false;

                            return (
                              <div
                                className={cn(
                                  "flex justify-center items-center",
                                  {
                                    "bg-red-500": isDeleting,
                                  },
                                )}
                              >
                                <Checkbox
                                  className="border-yellow-500 hover:cursor-pointer data-[state=checked]:bg-yellow-500 data-[state=checked]:text-black"
                                  checked={isDeleting}
                                  onCheckedChange={(checked) => {
                                    setDel({
                                      ...del,
                                      [row.original.id]: checked === true,
                                    });
                                  }}
                                />
                              </div>
                            );
                          }

                          default:
                            return (
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
                            );
                        }
                      })()}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex mt-3 items-center justify-end w-full">
          <Button
            variant={"myVariant"}
            disabled={!hasChanges}
            onClick={
              Object.values(del).some(Boolean) ? () => setOpen(!open) : update
            }
          >
            Guardar cambios
          </Button>
        </div>
        {open && (
          <AlertDialogDelUsr update={update} open={open} setOpen={setOpen} />
        )}
      </div>
    </div>
  );
};
