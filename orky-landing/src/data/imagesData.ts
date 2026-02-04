import { ImagesResponse } from "../types/images";
import apiClient from "./api/api-client";

const imagesData = {
  getImages: async (): Promise<ImagesResponse[]> => {
    const res = await apiClient.get("/album");
    return res.data;
  },
};

export default imagesData;
