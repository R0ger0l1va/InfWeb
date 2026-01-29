import { mockImages } from "@/mock/mockImages";
import ImagesContainer from "@/views/Images/images-Container";



const ImagesPage = () =>{
    return (
      <>
        <ImagesContainer 
        imagesData={mockImages}/>
      </>
    );
}

export default ImagesPage