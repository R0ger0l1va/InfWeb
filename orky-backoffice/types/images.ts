

export type ImagesResponse = {
  id: number;
  originalName: string;
  mimeType: string;
  size: number;
  url: string;
  publicId: string;
  folder:string;
  isImage: boolean;
  uploadedBy: string;
  createdAt: Date;
  updatedAt: Date;
};

export type ImageForm = {
    image:File;
    folder?:string;
    user?:string;
}

export type Images = {
  id: number;
  url: string;
  name: string;
};
