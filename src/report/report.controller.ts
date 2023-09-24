import {
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Param,
  Body,
  ParseUUIDPipe,
  ParseEnumPipe,
} from '@nestjs/common';
import { ReportType } from '../data';

import {
  CreateReportDto,
  ReportResponseDto,
  updateReportByIdDto,
} from '../dtos/report.dto';
import { ReportService } from './report.service';
@Controller('report/:type')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get()
  getAllReports(
    @Param('type', new ParseEnumPipe(ReportType)) type: ReportType,
  ): ReportResponseDto[] {
    return this.reportService.getAllReports(type);
  }

  @Get(':id')
  getReportById(
    @Param('type', new ParseEnumPipe(ReportType)) type: ReportType,
    @Param('id', ParseUUIDPipe) id: string,
  ): ReportResponseDto {
    return this.reportService.getReportById(type, id);
  }

  @Post()
  postReport(
    @Body() { amount, source }: CreateReportDto,
    @Param('type', new ParseEnumPipe(ReportType)) type: ReportType,
  ): ReportResponseDto {
    return this.reportService.postReport({ amount, source }, type);
  }

  @Put(':id')
  updateReportById(
    @Body() body: updateReportByIdDto,
    @Param('id', ParseUUIDPipe) id: string,
  ): ReportResponseDto {
    return this.reportService.updateReportById(id, body);
  }

  @Delete(':id')
  deleteReportById(@Param('id', ParseUUIDPipe) id: string) {
    return this.reportService.deleteReportById(id);
  }
}
