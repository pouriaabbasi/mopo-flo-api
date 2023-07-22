import { Body, Controller, Post, Res } from '@nestjs/common';
import { ResponseDto } from 'src/models/dtos/common/common.dto';
import {
  LoginRequestDto,
  LoginResultDto,
} from 'src/models/dtos/user/login.dto';
import { SecurityService } from 'src/services/security.service';

@Controller('security')
export class SecurityController {
  constructor(private readonly securityService: SecurityService) {}

  @Post()
  async login(
    @Body() request: LoginRequestDto,
  ): Promise<ResponseDto<LoginResultDto>> {
    const result = await this.securityService.login(request);
    return result;
  }
}
