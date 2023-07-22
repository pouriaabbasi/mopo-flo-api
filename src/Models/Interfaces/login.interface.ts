import { Document } from 'mongoose';

export interface ILogin extends Document {
  userId: string;
  accessToken: string;
  refreshToken: string;
  refreshTokenUsed: boolean;
}
