import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MissionService } from './missions.service';
import { Public } from 'src/auth/common/decorators';

@Public()
@Controller('missions')
export class MissionsController {
  constructor(private readonly missionsService: MissionService) {}

  @Post()
  create(@Body() mission: any) {
    return this.missionsService.create(mission);
  }

  @Get('/availableUsers')
  getAvailableUsers() {
    return this.missionsService.getAvailableUsers();
  }
  @Get('/email/:email')
  getUserIdByEmail(@Param('email') email: string) {
    return this.missionsService.getUserIdByEmail(email);
  }

  @Patch('assign')
  async assignUsersToMission(@Body() data: any) {
    return this.missionsService.assignUserToMission(data);
  }

  @Delete(':id')
  deleteMission(@Param('missionId') missionId: string) {
    return this.missionsService.deleteMission(missionId);
  }

  @Get()
  getMissions() {
    return this.missionsService.getAllMissions();
  }

  @Patch('assignClientToMission/:id/:idMission')
  assignClientToMission(
    @Param('id') clientId: string,
    @Param('idMission') idMission: string,
  ) {
    return this.missionsService.assignClientToMission(clientId, idMission);
  }
  @Get(':userId/username')
  async getUserNameById(@Param('userId') userId: string) {
    return await this.missionsService.getUserNameById(userId);
  }
}
