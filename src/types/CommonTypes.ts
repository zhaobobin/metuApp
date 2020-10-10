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

// 图像作品详情
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
  following_state?: boolean;
  favoring_state?: boolean;
  collecting_state?: boolean;
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
  exif: any;
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

export interface IImageFile {
  creationDate: string;
  cropRect: { height: number; width: number; x: number; y: number };
  data?: any;
  duration?: any;
  exif?: any;
  filename: string;
  localIdentifier: string;
  mime: string;
  modificationDate?: string;
  path: string;
  sourceURL?: string;
  width: number;
  height: number;
  size: number;
}

// 缩略图
export interface IThumb {
  url: string;
  width: number;
  height: number;
}

export interface IArticle {
  _id: string;
  title: string;
  thumb: string;
  author: IAuthor;
  view_number: number;
  favor_number: number;
  collect_number: number;
  comment_number: number;
  editor: number;
  status: number;
  create_at: string;
  update_at: string;
  following_state?: boolean;
  favoring_state?: boolean;
  collecting_state?: boolean;
}

export interface IArticleDetail extends IArticle {
  content: string;
}

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
  following_state?: boolean;
}

// 用户信息
export interface IUserInfo extends IAuthor {
  mobile?: string;
  headline?: string;
  following_number?: number;
  followers_number?: number;
  address?: string;
  location?: string;
}


export interface ILoginRedirect{
  routeName: string;
  routeParam?: any;
}
