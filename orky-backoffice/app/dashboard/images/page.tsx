import { mockImages } from "@/mock/mockImages";
import { imagesService } from "@/services/images";
import ImagesContainer from "@/views/Images/images-Container";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

 
const ImagesPage = async () =>{
    
        const imagesData = await imagesService.getAllImages()
      return  <ImagesContainer imagesData={imagesData} />
    
}

export default ImagesPage