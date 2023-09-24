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
import { v4 as uuid } from 'uuid';
import { report } from 'process';

@Controller('report/:type')
export class AppController {
  @Get()
  getAllReports(@Param('type') type: string) {
    return data.report.filter((report) => report.type === type);
  }

  @Get(':id')
  getReportById(@Param('type') type: string, @Param('id') id: string) {
    const dataType = data.report.filter((report) => report.type === type);
    return dataType.find((report) => report.id === id);
  }

  @Post()
  postReport(
    @Body() { amount, source }: { amount: number; source: string },
    @Param('type') type: string,
  ) {
    const newReport = {
      id: uuid() as string,
      source,
      amount,
      created_at: new Date(),
      updated_at: new Date(),
      type: type === ReportType.INCOME ? ReportType.INCOME : ReportType.EXPENSE,
    };
    data.report.push(newReport);
    return newReport;
  }

  @Put(':id')
  updateReportById(
    @Body() body: { amount: number; source: string },
    @Param('id') id: string,
  ) {
    const report = data.report.findIndex((report) => report.id === id);
    data.report[report] = {
      ...data.report[report],
      ...body,
    };
    data.report[report].updated_at = new Date();
    return data.report[report];
  }

  @Delete(':id')
  deleteReportById(@Param('id') id: string) {
    const report = data.report.findIndex((report) => report.id === id);
    data.report.splice(report, 1);
    return data.report;
  }
}
