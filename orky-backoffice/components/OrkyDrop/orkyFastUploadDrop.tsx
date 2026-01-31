"use client";

import { Plus } from "lucide-react";
import { Card } from "../ui/card";
import { useDropzone } from "react-dropzone";
import { imagesService } from "@/services/images";
import { toast } from "sonner";
import { useState } from "react";
import { useRouter } from "next/navigation";

const FastUpload = () => {
  const router = useRouter();
  const [isUploading, setIsUploading] = useState(false);

  // 👇 Maneja la subida inmediata al soltar
  const onDrop = async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;

    const file = acceptedFiles[0]; // Solo tomamos la primera (puedes ajustar para múltiples)

    // 👉 Aquí decides la carpeta por defecto para "subida rápida"
    

    const formData = new FormData();
    formData.append("file", file);
    

    setIsUploading(true);
    try {
      await imagesService.uploadImages(formData);
      toast.success("Imagen subida correctamente");
      router.refresh(); // Recarga la lista de imágenes
    } catch (error) {
      console.error(error);
      toast.error("Error al subir la imagen");
    } finally {
      setIsUploading(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({
      accept: { "image/*": [] },
      maxFiles: 1,
      onDrop,
      disabled: isUploading,
    });

  return (
    <Card
      {...getRootProps()}
      className={`border-dashed border-2 border-amber-300 flex mb-20 gap-2 items-center justify-center
        h-32 cursor-pointer transition-colors
        ${isDragActive ? "border-green-500 bg-green-50" : ""}
        ${isDragReject ? "border-red-500 bg-red-50" : ""}
        ${isUploading ? "opacity-70 pointer-events-none" : ""}
      `}
    >
      <input {...getInputProps()} />
      <Plus
        className={`p-1 rounded-full ${
          isUploading ? "bg-gray-300" : "bg-amber-300"
        }`}
        size={45}
      />
      {isUploading ? "Subiendo..." : "Subida Rapida"}
    </Card>
  );
};

export default FastUpload;
