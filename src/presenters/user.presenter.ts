import { config } from "../configs/config";
import { IUser } from "../interfaces/user.interface";

class UserPresenter {
  public toResponse(entity: IUser) {
    return {
      _id: entity._id,
      name: entity.name,
      email: entity.email,
      age: entity.age,
      password: entity.password,
      role: entity.role,
      phone: entity.phone,
      avatar: entity.avatar
        ? `${config.AWS_S3_ENDPOINT}/${entity.avatar}`
        : null,
      isDeleted: entity.isDeleted,
      isVerified: entity.isVerified,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  public toShortResponse(entity: IUser) {
    return {
      _id: entity._id,
      name: entity.name,
      avatar: entity.avatar
        ? `${config.AWS_S3_ENDPOINT}/${entity.avatar}`
        : null,
      createdAt: entity.createdAt,
    };
  }
}

export const userPresenter = new UserPresenter();
