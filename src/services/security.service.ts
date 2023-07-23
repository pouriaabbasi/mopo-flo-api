import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { sign } from 'jsonwebtoken';
import { Model, Types } from 'mongoose';
import {
  LoginRequestDto,
  LoginResultDto,
} from 'src/models/dtos/user/login.dto';
import { ILogin } from 'src/models/interfaces/login.interface';
import { IUser } from 'src/models/interfaces/user.interface';
import { comparePassword } from 'src/utils/password.util';
import { BaseService } from './base.service';
import { ResponseDto } from 'src/models/dtos/common/common.dto';

@Injectable()
export class SecurityService extends BaseService {
  constructor(
    @InjectModel('User') private userModel: Model<IUser>,
    @InjectModel('Login') private loginModel: Model<ILogin>,
  ) {
    super();
  }

  async login(request: LoginRequestDto): Promise<ResponseDto<LoginResultDto>> {
    try {
      const user = await this.getUserEntityByUsername(request.username);
      await this.validationUserPassword(user.password, request.password);
      const accessTokenClaims = {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
      };
      const refreshTokenClaims = {
        id: user._id,
      };
      const result: LoginResultDto = {
        accessToken: sign(accessTokenClaims, 'mopo_flo_apis', {
          expiresIn: '24h',
        }),
        refreshToken: sign(refreshTokenClaims, 'mopo_flo_apis_refresh_token', {
          expiresIn: '30d',
        }),
      };

      await this.addLoginResult(user.id, result);

      return this.successResponse(result);
    } catch (error) {
      return this.errorResponse(error.message);
    }
  }

  private async getUserEntityByUsername(username: string): Promise<IUser> {
    const user = await this.userModel.findOne<IUser>({ username: username });
    if (!user) {
      throw new Error('Username or Password is not correct');
    }
    return user;
  }

  private async validationUserPassword(
    userPassword: string,
    loginPassword: string,
  ): Promise<void> {
    const isPasswordCorrect = await comparePassword(
      loginPassword,
      userPassword,
    );
    if (!isPasswordCorrect) {
      throw new Error('Username or Password is not correct');
    }
  }

  private async addLoginResult(
    userId: Types.ObjectId,
    result: LoginResultDto,
  ): Promise<void> {
    const loginModel = new this.loginModel({
      accessToken: result.accessToken,
      refreshToken: result.refreshToken,
      userId: userId,
    });

    await loginModel.save();
  }
}
