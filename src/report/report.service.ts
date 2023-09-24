import { Injectable } from '@nestjs/common';
import { ReportType, data } from 'src/data';
import { v4 as uuid } from 'uuid';
import { ReportResponseDto } from 'src/dtos/report.dto';

interface Report {
  amount: number;
  source: string;
}

interface UpdateReport {
  amount?: number;
  source?: string;
}
@Injectable()
export class ReportService {
  getAllReports(type: ReportType): ReportResponseDto[] {
    return data.report
      .filter((report) => report.type === type)
      .map((report) => new ReportResponseDto(report));
  }
  getReportById(type: ReportType, id: string): ReportResponseDto {
    const dataType = data.report.filter((report) => report.type === type);
    const report = dataType.find((report) => report.id === id);
    if (!report) return;
    return new ReportResponseDto(report);
  }
  postReport({ amount, source }: Report, type: ReportType): ReportResponseDto {
    const newReport = {
      id: uuid() as string,
      source,
      amount,
      created_at: new Date(),
      updated_at: new Date(),
      type,
    };
    data.report.push(newReport);
    return new ReportResponseDto(newReport);
  }

  updateReportById(id: string, body: UpdateReport): ReportResponseDto {
    const report = data.report.findIndex((report) => report.id === id);
    data.report[report] = {
      ...data.report[report],
      ...body,
      updated_at: new Date(),
    };
    const updatedReport = data.report[report];
    return new ReportResponseDto(updatedReport);
  }

  deleteReportById(id: string) {
    const report = data.report.findIndex((report) => report.id === id);
    data.report.splice(report, 1);
    return data.report;
  }
}
