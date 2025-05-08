import { RouterModule } from '@nestjs/core';
import { AuthModule } from 'src/features/admin/auth/auth.module';
import { BranchModule } from 'src/features/admin/branch/branch.module';
import { EventModule } from 'src/features/admin/event/event.module';
import { InstrumentModule } from 'src/features/admin/instrument/instrument.module';
import { MusicGenreModule } from 'src/features/admin/music-genre/music-genre.module';
import { NotificationModule } from 'src/features/admin/notification/public/notification.module';
import { UserModule } from 'src/features/admin/user/user.module';

export default RouterModule.register([
  {
    path: '/api/v1',
    children: [
      {
        path: 'admin',
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
    ],
  },
]);
