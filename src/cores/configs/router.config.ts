import { RouterModule } from '@nestjs/core';
import { AuthModule } from 'src/features/auth/auth.module';
import { BranchModule } from 'src/features/branch/branch.module';
import { EventModule } from 'src/features/event/event.module';
import { InstrumentModule } from 'src/features/instrument/instrument.module';
import { MusicGenreModule } from 'src/features/music-genre/music-genre.module';
import { NotificationModule } from 'src/features/notification/public/notification.module';
import { UserModule } from 'src/features/user/user.module';

export default RouterModule.register([
  {
    path: '/api/v1',
    children: [
      {
        path: 'auth',
        module: AuthModule,
      },
      {
        path: 'users',
        module: UserModule,
      },
      {
        path: 'notifications',
        module: NotificationModule,
      },
      {
        path: 'instruments',
        module: InstrumentModule,
      },
      {
        path: 'music-genres',
        module: MusicGenreModule,
      },
      {
        path: 'branches',
        module: BranchModule,
      },
      {
        path: 'events',
        module: EventModule,
      },
    ],
  },
]);
