import { IImage } from "../CommonTypes";

export type IPublishType = 'article' | 'photo' | null;

export interface IPhotoPublishForm {
  title: string;
  description?: string;
  tags?: string;
  copyright?: string;
  images: IImage[]
}

export interface IArticlePublishForm {
  title: string;
  description?: string;
  tags?: string;
  content: string;
}
