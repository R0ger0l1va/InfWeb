import { ChangeEvent, useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Folder } from "@/types/folderType";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../ui/input-group";
import { Search } from "lucide-react";

interface FilterSearchProps {
  onSearchChange: (query: string) => void;
  onFolderChange: (folder: string) => void;
  searchQuery?: string;
  selectedFolder?: string;
}

const FilterSearch = ({
  onSearchChange,
  onFolderChange,
  searchQuery,
  selectedFolder,
}: FilterSearchProps) => {
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value);
  };

  const handleFolderChange = (value: string) => {
    onFolderChange(value);
  };

  return (
    <>
      <div className="relative rounded-xl overflow-hidden mb-6">
        {/* Fondo degradado SOLO para el filtro */}
        {/* <div className="absolute inset-0 in-dark:bg-gradient-to-b rounded-xl from-black/80 via-black/70 to-transparent z-0" /> */}

        {/* Contenido del filtro (encima del degradado) */}
        <div className="relative z-10 flex flex-row    not-dark:border-black rounded-xl gap-3 p-1 backdrop-blur-sm">
          <InputGroup className="  border-amber-300 ">
            <InputGroupInput
              type="text"
              placeholder="Buscar por nombre..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="in-dark:bg-black/30  in-dark:placeholder:text-gray-300 focus-visible:ring-amber-300"
            />
            <InputGroupAddon>
              <Search className="text-amber-300 not-dark:text-black" />
            </InputGroupAddon>
          </InputGroup>

          <Select value={selectedFolder} onValueChange={handleFolderChange} >
            <SelectTrigger className="in-dark:bg-black/30  not-dark:bg-white   border-amber-300">
              <SelectValue placeholder="Todas las carpetas" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(Folder).map(([key, value]) => (
                <SelectItem key={key} value={value}>
                  {value.charAt(0).toUpperCase() + value.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </>
  );
};

export default FilterSearch;
