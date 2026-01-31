import OrkyDrop from "@/components/OrkyDrop/orkyDrop";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ImagesFormProps {
  onClose: () => void;
}

const ImagesForm = ({ onClose }: ImagesFormProps) => {
  return (
    <>
      <DialogContent className="border border-amber-300 sm:max-w-lg">
        <DialogHeader className=" flex items-center">
          <DialogTitle>Selecciona o Arrastra una Imagen</DialogTitle>
        </DialogHeader>
        <OrkyDrop />
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button className="bg-amber-300 text-black">Subir</Button>
        </div>
      </DialogContent>
    </>
  );
};

export default ImagesForm;
