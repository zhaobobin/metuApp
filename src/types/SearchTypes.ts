export type SearchType = 'photo' | 'author' | 'circle' | 'article' | 'activity' | 'topic';

export interface ISearchCate {
  name: string;
  key: SearchType;
  route: string;
}