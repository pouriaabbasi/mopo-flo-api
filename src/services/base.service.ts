import { Injectable } from '@nestjs/common';
import { ResponseDto } from 'src/models/dtos/common/common.dto';

@Injectable()
export class BaseService {
  protected successResponse<T>(data: T, message?: string): ResponseDto<T> {
    return {
      isSuccess: true,
      data: data,
      message: message,
      code: 200,
    };
  }
}
