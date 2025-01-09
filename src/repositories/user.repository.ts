import { FilterQuery } from "mongoose";

import { IUser, IUserCreateDto } from "../interfaces/user.interface";
import { User } from "../models/user.model";

class UserRepository {
  public async getList(query: any): Promise<IUser[]> {
    const filterObject: FilterQuery<IUser> = { isDeleted: false };
    const skip = query.limit * (query.page - 1);
    return await User.find(filterObject).limit(query.limit).skip(skip);
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
