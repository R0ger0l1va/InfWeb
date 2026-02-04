"use client";
import Image from "next/image";
import { useDropzone } from "react-dropzone";
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
import { toast } from "sonner";

import { X } from "lucide-react";

interface OrkyDropProps {
  onFilesChange: (files: FileWithPreview[]) => void;
  onFolderChange: (folder: string) => void;
  files: FileWithPreview[];
  folder: string;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB en bytes

const OrkyDrop = ({
  onFilesChange,
  onFolderChange,
  files,
  folder,
}: OrkyDropProps) => {
  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({
      accept: { "image/*": [] },
      maxSize: MAX_FILE_SIZE,
      onDrop: (acceptedFiles, rejectedFiles) => {
        // Mostrar error si hay archivos rechazados por tamaño
        if (rejectedFiles.length > 0) {
          const oversizedFiles = rejectedFiles.filter((file) =>
            file.errors.some((error) => error.code === "file-too-large"),
          );
          if (oversizedFiles.length > 0) {
            toast.error(
              `${oversizedFiles.length} archivo(s) exceden el límite de 5MB`,
            );
          }
        }

        const filesWithPreview = acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          }),
        ) as FileWithPreview[];

        // Acumular archivos en lugar de reemplazar
        onFilesChange([...files, ...filesWithPreview]);
      },
    });

  // Maneja la eliminación de un archivo individual
  const handleRemoveFile = (fileName: string) => {
    onFilesChange(files.filter((file) => file.name !== fileName));
  };

  // Maneja el cambio del Select
  const handleFolderChange = (value: string) => {
    onFolderChange(value);
  };

  const thumbs = files.map((file) => (
    <div key={file.name} className="m-2 relative group">
      <Image
        src={file.preview}
        alt="Vista previa"
        width={100}
        height={100}
        onLoad={() => {
          URL.revokeObjectURL(file.preview);
        }}
        className="object-cover rounded w-24 h-24"
      />
      <button
        type="button"
        onClick={() => handleRemoveFile(file.name)}
        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
        aria-label={`Eliminar ${file.name}`}
      >
        <X size={14} />
      </button>
    </div>
  ));

  return (
    <>
      {" "}
      <div className="flex flex-col gap-3">
        <div
          {...getRootProps({})}
          className={`rounded-lg hover:cursor-pointer hover:border-amber-300 mx-auto
        border-4 border-dashed w-full max-h-[30vh] overflow-hidden
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
          <div className="flex flex-col items-center w-full h-full relative ">
            <input {...getInputProps()} />
            <div className="relative  ">
              <Image
                src="/assets/images/orkyLayout.png"
                alt="foto de orky"
                width={700}
                height={400}
                className="opacity-60 object-contain"
              />
            </div>
            <p className="text-xs sm:text-sm absolute inset-0 mt-36 flex items-center justify-center font-medium text-muted-foreground">
              Máximo 5MB por archivo
            </p>
          </div>
        </div>{" "}
        <section className="flex items-center flex-col gap-3">
          <Select onValueChange={handleFolderChange} value={folder}>
            <SelectTrigger>
              <SelectValue placeholder="Seleccione una carpeta de almacenamiento" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Carpeta</SelectLabel>
                {Object.entries(Folder)
                  .filter(
                    ([, value]) =>
                      value !== "todos" && value !== "subidaRapida",
                  )
                  .map(([key, value]) => (
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
        </section>
      </div>
    </>
  );
};
export default OrkyDrop;
