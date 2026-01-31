"use client";
import Image from "next/image";
import { useForm } from "react-hook-form";
import Dropzone, { useDropzone } from "react-dropzone";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Folder } from "@/types/folderType";
import { FileWithPreview } from "@/types/fileWithPreview";
import { ImageForm } from "@/types/images";
import { toast } from "sonner";
import { imagesService } from "@/services/images";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

const OrkyDrop = () => {
  const router  = useRouter()
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const {
    register,
    watch,
    setValue,
    formState: { isSubmitting },
    handleSubmit,
  } = useForm<ImageForm>({
    defaultValues: {
      folder: "",
    },
  });
  const folder = watch("folder");
  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({
      accept: { "image/*": [] },
      onDrop: (acceptedFiles) => {
        setFiles(
          acceptedFiles.map((file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            }),
          ) as FileWithPreview[],
        );
      },
    });

  // Maneja el cambio del Select
  const handleFolderChange = (value: string) => {
    setValue("folder", value);
  };

  // Envía cada archivo al backend
  const onSubmit = async (data: ImageForm) => {
    if (files.length === 0) {
      toast.error("Por favor seleccione al menos una imagen");
      return;
    }
    if (!data.folder) {
      toast.error("Por favor seleccione una carpeta");
      return;
    }

    try {
      // Sube cada archivo individualmente
      for (const file of files) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("folder", data.folder);

        await imagesService.uploadImages(formData); // tu función debe aceptar FormData
      }

      toast.success(`${files.length} imagen(es) subida(s) correctamente`);
      router.refresh();
      setFiles([]); // limpia después de subir
    } catch (error) {
      console.error(error);
      toast.error("Error al subir las imágenes");
    }
  };

    const thumbs = files.map((file) => (
      <div key={file.name} className="m-2">
        <Image
          src={file.preview}
          alt="Vista previa"
          width={150}
          height={150}
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
          className="object-cover rounded"
        />
      </div>
    ));

    return (
      <>
        {" "}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          <div
            {...getRootProps({})}
            className={`  rounded-lg  hover:cursor-pointer hover:border-amber-300   mx-auto
        border-4 border-dashed 
        flex items-center justify-center
        transition-colors duration-200 ${
          isDragAccept
            ? "border-green-500 bg-green-800"
            : isDragReject
              ? "border-red-500 bg-red-800"
              : isFocused
                ? "border-amber-300 bg-amber-500"
                : ""
        }
                `}
          >
            <input {...getInputProps()} />
            <Image
              src="/assets/images/orkyLayout.png"
              alt="foto de orky"
              width={400}
              height={225}
              className="opacity-60"
            />
          </div>{" "}
          <section className="flex items-center flex-col gap-3">
            <Select onValueChange={handleFolderChange} value={folder}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccione una carpeta de almacenamiento" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Carpeta</SelectLabel>
                  {Object.entries(Folder).map(([key, value]) => (
                    <SelectItem key={key} value={value}>
                      {value.charAt(0).toUpperCase() + value.slice(1)}{" "}
                      {/* Primera letra mayúscula */}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            {files.length > 0 && (
              <aside className="flex flex-row flex-wrap justify-center">
                {thumbs}
              </aside>
            )}
            <Button
              type="submit"
              disabled={isSubmitting || files.length === 0 || !folder}
              className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
            >
              {isSubmitting ? "Subiendo..." : "Subir imágenes"}
            </Button>
          </section>
        </form>
      </>
    );
  };
;

export default OrkyDrop;
