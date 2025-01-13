import { FilterQuery, SortOrder } from "mongoose";

import { UserListOrderEnum } from "../enums/user-list-order.enum";
import { ApiError } from "../errors/api-error";
import {
  IUser,
  IUserCreateDto,
  IUserListQuery,
} from "../interfaces/user.interface";
import { User } from "../models/user.model";

class UserRepository {
  public async getList(
    query: IUserListQuery,
  ): Promise<{ entities: IUser[]; total: number }> {
    const filterObject: FilterQuery<IUser> = { isDeleted: false };
    if (query.search) {
      // filterObject.$or = [
      //   { name: { $regex: query.search, $options: "i" } },
      //   { email: { $regex: query.search, $options: "i" } },
      // ];
      filterObject.name = { $regex: query.search, $options: "i" };
    }
    const skip = query.limit * (query.page - 1);

    const sortObject: { [key: string]: SortOrder } = {};
    switch (query.orderBy) {
      case UserListOrderEnum.NAME:
        sortObject.name = query.order;
        break;
      case UserListOrderEnum.AGE:
        sortObject.age = query.order;
        break;
      case UserListOrderEnum.CREATED_AT:
        sortObject.createdAt = query.order;
        break;
      default:
        throw new ApiError("Invalid order by", 400);
    }

    const [entities, total] = await Promise.all([
      User.find(filterObject).sort(sortObject).limit(query.limit).skip(skip),
      User.countDocuments(filterObject),
    ]);
    return { entities, total };
  }

  public async create(dto: IUserCreateDto): Promise<IUser> {
    return await User.create(dto);
  }

  public async getById(userId: string): Promise<IUser> {
    return await User.findById(userId);
  }

  public async getByEmail(email: string): Promise<IUser> {
    return await User.findOne({ email });
  }

  public async updateById(userId: string, dto: Partial<IUser>): Promise<IUser> {
    return await User.findByIdAndUpdate(userId, dto, { new: true });
  }

  public async deleteById(userId: string): Promise<void> {
    await User.deleteOne({ _id: userId });
  }
}

export const userRepository = new UserRepository();
