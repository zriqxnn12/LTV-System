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
import { AuthModule } from './features/admin/auth/auth.module';
import { UserModule } from './features/admin/user/user.module';
import { NotificationModule } from './features/admin/notification/public/notification.module';
import { InstrumentModule } from './features/admin/instrument/instrument.module';
import { MusicGenreModule } from './features/admin/music-genre/music-genre.module';
import { BranchModule } from './features/admin/branch/branch.module';
import { EventModule } from './features/admin/event/event.module';
import { ClassroomModule } from './features/admin/classroom/classroom.module';
import { StaffModule } from './features/admin/staff/staff.module';
import { StudentModule } from './features/admin/student/student.module';
import { AuthPublicModule } from './features/public/auth/auth.module';
import { EventParticipantModule } from './features/admin/event-participant/event-participant.module';
import { FeedbackModule } from './features/admin/feedback/feedback.module';
import { FeedbackPublicModule } from './features/public/feedback/feedback.module';
import { CoursePackageModule } from './features/admin/course-package/course-package.module';
import { ServiceInvoiceModule } from './features/admin/service-invoice/service-invoice.module';
import { ServiceInvoiceDocumentPublicModule } from './features/public/service-invoice-document/service-invoice-document.module';
import { ServiceInvoicePublicModule } from './features/public/service-invoice/service-invoice.module';
import { TeacherModule } from './features/admin/teacher/teacher.module';
import { EventPublicModule } from './features/public/event/event.module';
import { EventParticipantPublicModule } from './features/public/event-participant/event-participant.module';
import { CourseModule } from './features/admin/course/course.module';
import { CourseScheduleModule } from './features/admin/course-schedule/course-schedule.module';
import { AttendanceModule } from './features/admin/attendance/attendance.module';
import { CourseRescheduleModule } from './features/admin/course-reschedule/course-reschedule.module';

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
    // admin
    AuthModule,
    AttendanceModule,
    ResponseModule,
    UserModule,
    NotificationModule,
    InstrumentModule,
    MusicGenreModule,
    BranchModule,
    EventModule,
    EventParticipantModule,
    ClassroomModule,
    CourseModule,
    CourseScheduleModule,
    CourseRescheduleModule,
    StaffModule,
    TeacherModule,
    StudentModule,
    FeedbackModule,
    CoursePackageModule,
    ServiceInvoiceModule,

    // public
    AuthPublicModule,
    FeedbackPublicModule,
    ServiceInvoicePublicModule,
    ServiceInvoiceDocumentPublicModule,
    EventPublicModule,
    EventParticipantPublicModule,
  ],
  controllers: [AppController],
  providers: [AppService, NotificationListener],
})
export class AppModule {}
