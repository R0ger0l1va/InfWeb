// export interface ImageContainerProps {

import { Images } from "@/types/images";
import ImagesList from "./images-List";
import AddElementButton from "@/components/Generics/addElementButton";
import { buttonDataType } from "@/types/buttonDataType";

// }
interface ImagesContainerProps {
  imagesData: Images[];
}

const ImagesContainer = ({ imagesData }: ImagesContainerProps) => {
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

          <h3 className="text-gray-300 max-w-full wrap-break-word">
            Este es un texto de prueba para los detalles de la vista
          </h3>
        </div>
        <AddElementButton
          buttonName="Subir Imagen"
          dataType={buttonDataType.IMAGE}
        />
      </div>

      <ImagesList imagesData={imagesData} />
    </>
  );
};

export default ImagesContainer;
