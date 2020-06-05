export interface IPageInfo {
  page: number;
  per_page?: number;
  count?: number;
  has_more?: boolean;
}

export interface IPhoto {
  view_number: number;
  favor_number: number;
  collect_number: number;
  comment_number: number;
  editor: number;
  status: number;
  _id: string;
  title: string;
  thumb: {
    url: string;
    width: number;
    height: number;
  };
  author?: {
    type: string;
    level: number;
    point: number;
    status: number;
    _id: string;
    nickname: string;
    username: string;
    create_at: string;
    update_at: string;
  };
  create_at: string;
  update_at: string;
};

export interface IArticle {
  
}
