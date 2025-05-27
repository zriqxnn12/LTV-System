import { RouterModule } from '@nestjs/core';
import { AuthModule } from 'src/features/admin/auth/auth.module';
import { BranchModule } from 'src/features/admin/branch/branch.module';
import { ClassroomModule } from 'src/features/admin/classroom/classroom.module';
import { EventParticipantModule } from 'src/features/admin/event-participant/event-participant.module';
import { EventModule } from 'src/features/admin/event/event.module';
import { FeedbackModule } from 'src/features/admin/feedback/feedback.module';
import { InstrumentModule } from 'src/features/admin/instrument/instrument.module';
import { MusicGenreModule } from 'src/features/admin/music-genre/music-genre.module';
import { NotificationModule } from 'src/features/admin/notification/public/notification.module';
import { UserModule } from 'src/features/admin/user/user.module';
import { CoursePackageModule } from 'src/features/admin/course-package/course-package.module';
import { AuthPublicModule } from 'src/features/public/auth/auth.module';
import { FeedbackPublicModule } from 'src/features/public/feedback/feedback.module';
import { ServiceInvoiceModule } from 'src/features/admin/service-invoice/service-invoice.module';

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
            children: [
              {
                path: ':eventId/participants',
                module: EventParticipantModule,
              },
            ],
          },
          {
            path: 'classrooms',
            module: ClassroomModule,
          },
          {
            path: 'feedbacks',
            module: FeedbackModule,
          },
          {
            path: 'course-packages',
            module: CoursePackageModule,
          },
          {
            path: 'service-invoices',
            module: ServiceInvoiceModule,
          },
        ],
      },
      {
        path: '/',
        children: [
          {
            path: 'auth',
            module: AuthPublicModule,
          },
          {
            path: 'feedbacks',
            module: FeedbackPublicModule,
          },
        ],
      },
    ],
  },
]);
