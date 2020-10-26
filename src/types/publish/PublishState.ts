export type PublishType = 'article' | 'photo' | null;

export interface IImageSchema {
  title: string;
  description?: string;
  tags?: string;
  url: string;
  width?: number;
  height?: number;
  exif?: any;
  camera?: {
    brand: string;
    brandName: string;
    model: string;
    modelName: string;
  };
  lens?: {
    brand: string;
    brandName: string;
    model: string;
    modelName: string;
  },
  exposure?: {
    FNumber: string;
    ExposureTime: string;
    ISOSpeedRatings: string;
  },
}

export interface IPhotoPublishForm {
  title: string;
  description?: string;
  tags?: string;
  images: IImageSchema[],
  thumb?: {
    url: string;
    width?: number;
    height?: number;
  }
}

export interface IArticlePublishForm {
  title: string;
  description?: string;
  tags?: string;
  content: string;
}
