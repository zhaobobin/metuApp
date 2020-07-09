export interface IResponse {
  code: number;
  data: any;
  message: string;
  error_key?: any;
}

// 分页信息
export interface IPageInfo {
  page: number;
  per_page?: number;
  count?: number;
  has_more?: boolean;
}

export interface IPhoto {
  _id: string;
  title: string;
  thumb: IThumb;
  author: IAuthor;
  view_number: number;
  favor_number: number;
  collect_number: number;
  comment_number: number;
  editor: number;
  status: number;
  create_at: string;
  update_at: string;
}

// 影集、专辑信息
export interface IPhotoDetail extends IPhoto {
  images: IImage[];
}

// 图片详情信息
export interface IImage {
  _id: string;
  status: number;
  title: string;
  description: string;
  exif: string;
  camera: string;
  lens: string;
  url: string;
  exposure: {
    FNumber: string;
    ExposureTime: string;
    ISOSpeedRatings: string;
  };
  author: string;
  create_at: string;
  update_at: string;
}

// 缩略图
export interface IThumb {
  url: string;
  width: number;
  height: number;
}

export interface IArticle {}

// 作者
export interface IAuthor {
  _id: string;
  type: string;
  level: number;
  point: number;
  status: number;
  tags: string[];
  nickname: string;
  username: string;
  avatar_url?: string;
  cover_url?: string;
  create_at: string;
  update_at: string;
}

// 用户信息
export interface IUserInfo extends IAuthor {
  mobile?: string;
  headline?: string;
  following_number?: number;
  followers_number?: number;
  address?: string;
}
