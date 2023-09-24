import {
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Param,
  Body,
} from '@nestjs/common';
import { ReportType, data } from './data';

import { AppService } from './app.service';

@Controller('report/:type')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getAllReports(@Param('type') type: ReportType) {
    return this.appService.getAllReports(type);
  }

  @Get(':id')
  getReportById(@Param('type') type: ReportType, @Param('id') id: string) {
    return this.appService.getReportById(type, id);
  }

  @Post()
  postReport(
    @Body() { amount, source }: { amount: number; source: string },
    @Param('type') type: ReportType,
  ) {
    return this.appService.postReport({ amount, source }, type);
  }

  @Put(':id')
  updateReportById(
    @Body() body: { amount: number; source: string },
    @Param('id') id: string,
    @Param('type') type: ReportType,
  ) {
    return this.appService.updateReportById(type, id, body);
  }

  @Delete(':id')
  deleteReportById(@Param('id') id: string) {
    return this.appService.deleteReportById(id);
  }
}
