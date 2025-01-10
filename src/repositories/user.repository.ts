import { FilterQuery } from "mongoose";

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

    const [entities, total] = await Promise.all([
      User.find(filterObject).limit(query.limit).skip(skip),
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
