import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Images } from "@/types/images";
import { DownloadCloud, DownloadIcon, Plus } from "lucide-react";
import Image from "next/image";

interface ImagesListProps {
  imagesData: Images[];
}

const ImagesList = ({ imagesData }: ImagesListProps) => {
  return (
    <>
      {" "}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
        {imagesData.map((image) => (
          <Card
            key={image.id}
            className="relative hover:cursor-pointer  mx-auto w-full max-w-sm pt-0 overflow-hidden rounded-xl  " // 👈 sin border ni bg amarillo
          >
            {" "}
            {/* 👈 altura fija, ancho completo */}
            <Image
              src={image.url}
              alt={image.name}
              width={400} // Ancho máximo esperado
              height={400} // Alto para 16:9 (400 * 9/16 = 225)
              className="relative pb-0 z-20 h-full  w-full object-cover "
              // 👈 cubre todo el contenedor sin distorsionar
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/70 to-transparent" />
            <div />
            <CardFooter className="bg-amber-300 text-white truncate font-semibold justify-between py-2 rounded-b-xl">
              <h3 className="font-semibold z-50 text-white truncate">
                {image.name}
              </h3>
              <DownloadIcon  className="z-50 truncate text-white "  size={15}/>
            </CardFooter>
          </Card>
        ))}
        <Card className=" border-dashed border-2 border-amber-300 flex mb-20 gap-2 items-center justify-center"><Plus className="p-1 bg-amber-300 rounded-full" size={45}/> Subida Rapida</Card>
      </div>
    </>
  );
};

export default ImagesList;
