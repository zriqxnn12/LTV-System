import { Module } from '@nestjs/common';
import { AuthPublicController } from './auth.controller';
import { AuthPublicService } from './auth.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/models/users/entities/user.entity';
import { Student } from 'src/models/students/entities/student.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Teacher } from 'src/models/staff/entities/teacher.entity';
import { Staff } from 'src/models/staff/entities/staff.entity';
import { PublicStrategy } from 'src/cores/strategies/public.strategy';
import { JwtPublicStrategy } from 'src/cores/strategies/jwt-public.strategy';

@Module({
  imports: [
    SequelizeModule.forFeature([User, Student, Staff, Teacher]),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('SECRET_KEY'),
        signOptions: { expiresIn: '1y' },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthPublicController],
  providers: [AuthPublicService, PublicStrategy, JwtPublicStrategy],
  exports: [AuthPublicService],
})
export class AuthPublicModule {}
