import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/Models/Schemas/user.schema';
import { SecurityController } from 'src/controllers/security.controller';
import { LoginSchema } from 'src/models/schemas/login.schema';
import { SecurityService } from 'src/services/security.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017', { dbName: 'MopoFlo' }),
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'Login', schema: LoginSchema },
    ]),
  ],
  controllers: [SecurityController],
  providers: [SecurityService],
})
export class AppModule {}
