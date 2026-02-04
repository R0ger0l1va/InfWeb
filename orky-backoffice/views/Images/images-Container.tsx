// export interface ImageContainerProps {
"use client";

import FilterSearch from "@/components/Generics/filterSearch";
import ImagesList from "./images-List";
import AddElementButton from "@/components/Generics/addElementButton";
import { buttonDataType } from "@/types/buttonDataType";
import { ImagesResponse } from "@/types/images";
import { useMemo, useState } from "react";
import { Folder } from "@/types/folderType";

// }
interface ImagesContainerProps {
  imagesData: ImagesResponse[];
}

const ImagesContainer = ({ imagesData }: ImagesContainerProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFolder, setSelectedFolder] = useState("");

  const filteredImages = useMemo(() => {
    return imagesData.filter((image) => {
      const matchesName = image.originalName
        .toLowerCase()
        .includes(searchQuery.toLocaleLowerCase());
      const matchesFolder = selectedFolder === Folder.ALL || !selectedFolder ? 
      true : image.folder === selectedFolder
        
      return matchesName && matchesFolder;
    });
  }, [imagesData, searchQuery, selectedFolder]);

  return (
    <>
      <div className="flex  justify-between items-end pb-6">
        {" "}
        <div className="flex flex-col w-lg ">
          <div className="flex gap-3">
            {" "}
            <h1 className="not-dark:bg-black px-1 rounded-tr-2xl text-amber-300  text-4xl font-extrabold tracking-tight text-balance">
              Album
            </h1>
            <h1 className=" not-dark:bg-white text-black px-1 bg-amber-300  text-4xl font-extrabold tracking-tight text-balance">
              de
            </h1>
            <h1 className="   text-4xl font-extrabold tracking-tight text-balance">
              Fotos
            </h1>
          </div>

          <h3 className="text-gray-300 not-dark:text-gray-700 max-w-full wrap-break-word">
            Este es un texto de prueba para los detalles de la vista
          </h3>
        </div>
        <AddElementButton
          buttonName="Subir Imagen"
          dataType={buttonDataType.IMAGE}
        />
      </div>

      <div className=" flex flex-col">
        <FilterSearch
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedFolder={selectedFolder}
          onFolderChange={setSelectedFolder}
        />
        <ImagesList imagesData={filteredImages} />
      </div>
    </>
  );
};

export default ImagesContainer;
