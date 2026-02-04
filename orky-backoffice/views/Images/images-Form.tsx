"use client";
import OrkyDrop from "@/components/OrkyDrop/orkyDrop";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FileWithPreview } from "@/types/fileWithPreview";
import { useState } from "react";
import { toast } from "sonner";
import { imagesService } from "@/services/images";
import { useRouter } from "next/navigation";
import { Progress } from "@/components/ui/progress";
import { Spinner } from "@/components/ui/spinner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
interface ImagesFormProps {
  onClose: () => void;
}

const ImagesForm = ({ onClose }: ImagesFormProps) => {
  const router = useRouter();
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [folder, setFolder] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [currentFile, setCurrentFile] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);

  // Función de subida de imágenes
  const handleUpload = async () => {
    if (files.length === 0) {
      toast.error("Por favor seleccione al menos una imagen");
      return;
    }
    if (!folder) {
      toast.error("Por favor seleccione una carpeta");
      return;
    }

    setIsSubmitting(true);
    setUploadProgress(0);
    setIsProcessing(false);
    try {
      const totalFiles = files.length;

      // Sube cada archivo individualmente
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        setCurrentFile(file.name);
        setIsProcessing(false);

        const formData = new FormData();
        formData.append("file", file);
        formData.append("folder", folder);

        // Progreso ponderado: cada archivo contribuye proporcionalmente al total
        const baseProgress = (i / totalFiles) * 100;
        const fileWeight = 100 / totalFiles;

        await imagesService.uploadImages(formData, (progressEvent) => {
          if (progressEvent.total) {
            // Calcula el progreso del archivo actual (0-95% para dejar espacio al procesamiento)
            const fileProgress =
              (progressEvent.loaded / progressEvent.total) * 95; // Cap at 95%

            // Progreso total = archivos completados + progreso del archivo actual
            const totalProgress =
              baseProgress + (fileProgress * fileWeight) / 100;

            setUploadProgress(Math.round(totalProgress));
          }
        });

        // Después de que se sube, mostrar estado de procesamiento
        setIsProcessing(true);
      }

      toast.success(`${files.length} imagen(es) subida(s) correctamente`);
      router.refresh();
      setFiles([]); // limpia después de subir
      setFolder(""); // limpia la carpeta seleccionada
      setUploadProgress(0); // resetea el progreso
      setCurrentFile(""); // limpia el nombre del archivo
      setIsProcessing(false);
      onClose(); // cierra el diálogo
    } catch (error) {
      console.error(error);
      toast.error("Error al subir las imágenes");
      setUploadProgress(0); // resetea el progreso en caso de error
      setCurrentFile(""); // limpia el nombre del archivo
      setIsProcessing(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <DialogContent
        className="border border-amber-300 sm:max-w-lg max-h-[90vh] overflow-y-auto flex flex-col"
        onPointerDownOutside={(e) => {
          if (isSubmitting) e.preventDefault();
        }}
        onEscapeKeyDown={(e) => {
          if (isSubmitting) e.preventDefault();
        }}
      >
        <DialogHeader className="flex items-center shrink-0">
          <DialogTitle>Selecciona o Arrastra una Imagen</DialogTitle>
        </DialogHeader>

        {isSubmitting && (
          <Alert
            variant="destructive"
            className="border-amber-500 bg-amber-50/10 text-amber-500"
          >
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Subida en progreso</AlertTitle>
            <AlertDescription>
              Por favor, no cierres esta ventana hasta que la subida finalice.
            </AlertDescription>
          </Alert>
        )}
        <OrkyDrop
          files={files}
          folder={folder}
          onFilesChange={setFiles}
          onFolderChange={setFolder}
        />

        {/* Barra de progreso */}
        {isSubmitting && (
          <div className="space-y-2">
            <Progress value={uploadProgress} className="w-full" />
            <div className="flex items-center justify-between text-sm">
              <p className="text-muted-foreground">
                {isProcessing
                  ? "Procesando en servidor..."
                  : `Subiendo: ${uploadProgress}%`}
              </p>
              {currentFile && !isProcessing && (
                <p className="text-xs text-muted-foreground truncate max-w-50">
                  {currentFile}
                </p>
              )}
            </div>
          </div>
        )}

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
            Cancelar
          </Button>
          <Button
            className="bg-amber-300 text-black hover:bg-amber-400"
            onClick={handleUpload}
            disabled={isSubmitting || files.length === 0 || !folder}
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <Spinner className="text-black" />
                <span>Subiendo...</span>
              </div>
            ) : (
              "Subir"
            )}
          </Button>
        </div>
      </DialogContent>
    </>
  );
};

export default ImagesForm;
