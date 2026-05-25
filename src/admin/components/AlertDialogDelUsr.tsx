import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  //   AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
// import { Button } from "@/components/ui/button";
interface Props {
  update: () => void;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AlertDialogDelUsr = ({ update, open, setOpen }: Props) => {
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      {/* <AlertDialogTrigger asChild>
        <Button variant={"myVariant"}>Eliminar usuarios</Button>
      </AlertDialogTrigger> */}

      <AlertDialogContent className="bg-black border-2 border-yellow-500">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-yellow-500">
            ¿Eliminar usuarios?
          </AlertDialogTitle>

          <AlertDialogDescription className="text-yellow-500">
            Esta acción no se puede deshacer.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="bg-black border-2 border-yellow-500">
          <AlertDialogCancel>Cancelar</AlertDialogCancel>

          <AlertDialogAction
            onClick={() => {
              update();
              setOpen(!open);
            }}
          >
            Continuar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
