import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtStrategy } from 'src/cores/strategies/jwt.strategy';
import { LocalStrategy } from 'src/cores/strategies/local.strategy';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User } from 'src/models/users/entities/user.entity';
import { Staff } from 'src/models/staff/entities/staff.entity';
import { Teacher } from 'src/models/staff/entities/teacher.entity';
import { Student } from 'src/models/students/entities/student.entity';

@Module({
  imports: [
    SequelizeModule.forFeature([User, Staff, Teacher, Student]),
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
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
