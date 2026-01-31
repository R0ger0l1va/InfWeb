import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

interface ImagePreviewProps {
  imageSrc: string;
  imageName:string
}

const ImagePreview = ({ imageSrc,imageName }: ImagePreviewProps) => {
  return (
    <>
      <DialogContent className="border-amber-300 sm:max-w-lvh border-4 max-w-full flex flex-col justify-center ">
        <DialogHeader className=" flex items-start px-4 w-full">
          <DialogTitle className="truncate w-full">{imageName}</DialogTitle>
        </DialogHeader>
        <Image
          src={imageSrc}
          alt="Imagen Previsualizada"
          width={800}
          height={1000}
        />
      </DialogContent>
    </>
  );
};

export default ImagePreview;
