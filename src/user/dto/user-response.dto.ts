import { Expose } from 'class-transformer';

export class UserResponseDto {

  @Expose()
  id!: string;

  @Expose()
  username!: string;

  @Expose()
  email!: string;

  @Expose()
  displayName!: string;

  @Expose()
  avatarUrl?: string;

  @Expose()
  phoneNumber?: string;

  @Expose()
  createdAt!: Date;

}