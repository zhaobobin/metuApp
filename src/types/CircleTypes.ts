import { IUserInfo } from "./CommonTypes";

export type ICircleType = 'popular' | 'interest' | 'study' | 'region';

export interface ICircleState {

}

export interface ICircleItem {
  _id: string;
  name: string;
  description: string;
  admin?: IUserInfo;
  avatar_url?: string;
  member_number: number;
  activity_number: number;
  photo_number: number;
  create_at: string;
  update_at: string;
  status: number;
  following_state?: boolean;
}

export interface ICircleList {

}

export interface ICircleValues {
  name: string;
  description: string;
}