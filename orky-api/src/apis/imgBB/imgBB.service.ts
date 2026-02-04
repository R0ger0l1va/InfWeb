// src/imgbb/imgbb.service.ts
import { Injectable } from '@nestjs/common';
import axios from 'axios';
import FormData from 'form-data';
import { ImgBBResponse } from 'src/types/imgBB';

@Injectable()
export class ImgbbService {
  private readonly apiKey = process.env.IMGBB_API_KEY;
  private readonly apiUrl = 'https://api.imgbb.com/1/upload';

  async uploadImage(imageBuffer: Buffer, imageName: string): Promise<string> {
    try {
      const formData = new FormData();
      formData.append('key', this.apiKey);
      formData.append('image', imageBuffer.toString('base64'));
      formData.append('name', imageName);

      const response = await axios.post<ImgBBResponse>(this.apiUrl, formData, {
        headers: formData.getHeaders(),
      });

      // Retorna la URL de la imagen
      return response.data.data.url;
    } catch (error) {
      throw new Error(`Error subiendo imagen a ImgBB: ${error}`);
    }
  }

  async uploadImageFromBase64(
    base64Image: string,
    imageName: string,
  ): Promise<string> {
    try {
      // Remover el prefijo "data:image/...;base64," si existe
      const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, '');

      const formData = new FormData();
      formData.append('key', this.apiKey);
      formData.append('image', base64Data);
      formData.append('name', imageName);

      const response = await axios.post<ImgBBResponse>(this.apiUrl, formData, {
        headers: formData.getHeaders(),
      });

      return response.data.data.url;
    } catch (error) {
      throw new Error(`Error subiendo imagen a ImgBB: ${error}`);
    }
  }
}
