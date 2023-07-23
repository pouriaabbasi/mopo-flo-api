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

  protected errorResponse<T>(message: string, code?: number): ResponseDto<T> {
    return {
      data: null,
      isSuccess: false,
      code: code ?? 400,
      message: message,
    };
  }
}
