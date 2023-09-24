import { Controller, Delete, Get, Post, Put } from '@nestjs/common';

@Controller('report/:type')
export class AppController {
  @Get('')
  getAllReports() {
    return [];
  }

  @Get(':id')
  getReportById() {
    return 'reportById';
  }

  @Post()
  postReport() {
    return 'postIncomeReport';
  }

  @Put(':id')
  updateReportById() {
    return 'updateIncomeReportById';
  }

  @Delete(':id')
  deleteReportById() {
    return 'deleteReportById';
  }
}
