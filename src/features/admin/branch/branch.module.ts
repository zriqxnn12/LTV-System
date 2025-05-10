import { Module } from '@nestjs/common';
import { BranchService } from './branch.service';
import { BranchController } from './branch.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Branch } from '../../../models/branches/entities/branch.entity';

@Module({
  imports: [SequelizeModule.forFeature([Branch])],
  controllers: [BranchController],
  providers: [BranchService],
})
export class BranchModule {}
