import { ImageForm, ImagesResponse } from "@/types/images";
import apiClient from "./api-client";

export const imagesService = {
  async getAllImages(): Promise<ImagesResponse[]> {
    const res = await apiClient.get("/album", {
      headers: {
        cache: "no-store",
      },
    });
    return res.data;
  },

  async uploadImages(
    formData: FormData,
    onUploadProgress?: (progressEvent: {
      loaded: number;
      total?: number;
    }) => void,
  ): Promise<ImageForm> {
    const res = await apiClient.post("/album/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      timeout: 300000, // 5 minutos para archivos grandes
      onUploadProgress,
    });
    return res.data;
  },

  async deleteImages(id: number): Promise<void> {
    const res = await apiClient.delete(`/album/${id}`);
    return res.data;
  },
};
