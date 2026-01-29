import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface ImagesFormProps {
    onClose: () => void  
}

const ImagesForm = ( {onClose}: ImagesFormProps) => {
  return (
    <>
      <DialogContent className="border border-amber-300">
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>

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

export default ImagesForm