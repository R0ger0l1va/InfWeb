"use client";

import Image from "next/image";
import { Card, CardFooter } from "../ui/card";
import { Eraser, Folder, Trash } from "lucide-react";
import { formatBytes } from "@/utils/formatBytes";
import { ImagesResponse } from "@/types/images";
import { useState } from "react";
import ImagePreview from "../previews/imagePreview";
import { Dialog, DialogTrigger } from "../ui/dialog";
import { imagesService } from "@/services/images";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Spinner } from "../ui/spinner";

interface ImageCardProps {
  image: ImagesResponse;
}

const ImageCard = ({ image }: ImageCardProps) => {
  const router = useRouter();
  const [openPreview, setOpenPreview] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const handleDelete = async (id: number, e: React.MouseEvent) => {
    e.stopPropagation(); // 👈 ¡Detiene la propagación!
    setIsDeleting(true);
    try {
      await imagesService.deleteImages(id);
      toast.success("Imagen eliminada");
      router.refresh();
      // Si usas router.refresh(), no necesitas más aquí
    } catch (error) {
      console.error("Error al eliminar:", error);
      toast.error("Error al eliminar la imagen");
    } finally {
      setIsDeleting(false);
    }
  };
  return (
    <>
      <Dialog open={openPreview} onOpenChange={setOpenPreview}>
        <DialogTrigger asChild>
          <Card
            key={image.id}
            className="relative hover:cursor-pointer mx-auto w-full pt-0 overflow-hidden rounded-xl transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl hover:z-10"
            onClick={() => setOpenPreview(!openPreview)}
          >
            {" "}
            {/* 👈 altura fija, ancho completo */}
            <Image
              src={image.url}
              alt={image.originalName}
              width={400} // Ancho máximo esperado
              height={225} // Alto para 16:9 (400 * 9/16 = 225)
              className=" z-20 h-full  w-full object-cover "
              unoptimized
              // 👈 cubre todo el contenedor sin distorsionar
            />
            <div className="absolute inset-0 in-dark:bg-linear-to-t from-black/90 via-black/90 to-transparent " />
            <div />
            <CardFooter className="bg-amber-300  font-semibold py-4 px-3 rounded-b-xl flex items-start justify-between gap-3">
              {/* Contenedor izquierdo: nombre y carpeta */}
              <div className="min-w-0 z-50 flex flex-col">
                <h3 className=" font-bold truncate ">{image.originalName}</h3>
                <div className="flex items-center in-dark:text-gray-300 gap-1.5 pt-1.5 mt-0.5 text-xs">
                  <Folder size={16} className=" shrink-0" />
                  <span className=" font-medium truncate">{image.folder}</span>
                </div>
              </div>

              {/* Tamaño del archivo */}
              <div className="text-neutral-500 text-[9px]  justify-between z-50 flex-col flex items-end pt-0  whitespace-nowrap shrink-0">
                {formatBytes(image.size)}
                <button
                  type="button"
                  onClick={(e) => handleDelete(image.id, e)}
                  disabled={isDeleting}
                  className="p-2.5 rounded-full hover:bg-red-500/20 transition-colors shrink-0 hover:cursor-pointer disabled:opacity-50"
                  aria-label="Eliminar imagen"
                >
                  {isDeleting ? (
                    <Spinner className="text-red-600 w-4 h-4" />
                  ) : (
                    <Trash className="text-red-600 hover:text-red-700 w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Botón de eliminar */}
            </CardFooter>
          </Card>
        </DialogTrigger>
        {openPreview ? (
          <ImagePreview imageName={image.originalName} imageSrc={image.url} />
        ) : (
          <></>
        )}
      </Dialog>
    </>
  );
};

export default ImageCard;
