import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import routerConfig from './cores/configs/router.config';
import { sequelizeConfigAsync } from './cores/configs/sequelize.config';
import { NotificationListener } from './cores/event-emitter/notification.listener';
import { ResponseModule } from './cores/modules/response/response.module';
import { AuthModule } from './features/auth/auth.module';
import { NotificationModule } from './features/notification/public/notification.module';
import { UserModule } from './features/user/user.module';
import { InstrumentModule } from './features/instrument/instrument.module';
import { MusicGenreModule } from './features/music-genre/music-genre.module';
import { BranchModule } from './features/branch/branch.module';
import { EventModule } from './features/event/event.module';

@Module({
  imports: [
    PassportModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      cache: true,
    }),
    SequelizeModule.forRootAsync(sequelizeConfigAsync),
    routerConfig,
    AuthModule,
    ResponseModule,
    UserModule,
    NotificationModule,
    InstrumentModule,
    MusicGenreModule,
    BranchModule,
    EventModule,
  ],
  controllers: [AppController],
  providers: [AppService, NotificationListener],
})
export class AppModule {}
