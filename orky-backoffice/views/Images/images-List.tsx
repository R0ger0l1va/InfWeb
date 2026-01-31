import ImageCard from "@/components/Generics/imageCard";
import FastUpload from "@/components/OrkyDrop/orkyFastUploadDrop";
import {  ImagesResponse } from "@/types/images";



interface ImagesListProps {
  imagesData: ImagesResponse[];
}

const ImagesList = ({ imagesData }: ImagesListProps) => {
  return (
    <>
      {" "}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
        {imagesData.map((image) => (
         <ImageCard image={image} key={image.id} />
        ))}
        <FastUpload/>
      </div>
    </>
  );
};

export default ImagesList;
