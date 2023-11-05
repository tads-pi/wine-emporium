import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { GroupController } from './group/group.controller';
import { GroupService } from './group/group.service';

@Module({
  providers: [AdminService, GroupService],
  controllers: [AdminController, GroupController]
})
export class AdminModule {}
