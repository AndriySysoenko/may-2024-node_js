import { OrderEnum } from "../enums/order.enum";
import { RoleEnum } from "../enums/role.enum";
import { UserListOrderEnum } from "../enums/user-list-order.enum";

export interface IUser {
  _id: string;
  name: string;
  email: string;
  age: number;
  password: string;
  role: RoleEnum;
  phone?: string;
  avatar?: string;
  isDeleted: boolean;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type IUserCreateDto = Pick<
  IUser,
  "name" | "email" | "age" | "password" | "phone"
>;

export type IUserUpdateDto = Pick<IUser, "name" | "age" | "phone">;

export type ILogin = Pick<IUser, "email" | "password">;

export type IForgotPassword = Pick<IUser, "email">;
export type IForgotPasswordSet = Pick<IUser, "password"> & { token: string };

export type IChangePassword = {
  oldPassword: string;
  newPassword: string;
};

export type IUserListQuery = {
  limit: number;
  page: number;
  search?: string;
  order: OrderEnum;
  orderBy: UserListOrderEnum;
};

export type IUserResponse = Pick<
  IUser,
  | "_id"
  | "name"
  | "email"
  | "role"
  | "age"
  | "phone"
  | "avatar"
  | "isVerified"
  | "isDeleted"
  | "createdAt"
  | "updatedAt"
>;

export type IUserShortResponse = Pick<
  IUser,
  "_id" | "name" | "age" | "avatar" | "createdAt"
>;

export interface IUserListResponse extends IUserListQuery {
  data: IUserShortResponse[];
  total: number;
}
