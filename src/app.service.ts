import { Injectable } from '@nestjs/common';
import { ReportType, data } from './data';
import { v4 as uuid } from 'uuid';

interface Report {
  amount: number;
  source: string;
}
@Injectable()
export class AppService {
  getAllReports(type: ReportType) {
    return data.report.filter((report) => report.type === type);
  }
  getReportById(type: ReportType, id: string) {
    const dataType = data.report.filter((report) => report.type === type);
    return dataType.find((report) => report.id === id);
  }
  postReport({ amount, source }: Report, type: ReportType) {
    const newReport = {
      id: uuid() as string,
      source,
      amount,
      created_at: new Date(),
      updated_at: new Date(),
      type,
    };
    data.report.push(newReport);
    return newReport;
  }

  updateReportById(type: ReportType, id: string, body: Report) {
    const report = data.report.findIndex((report) => report.id === id);
    data.report[report] = {
      ...data.report[report],
      ...body,
      updated_at: new Date(),
    };
    return data.report[report];
  }

  deleteReportById(id: string) {
    const report = data.report.findIndex((report) => report.id === id);
    data.report.splice(report, 1);
    return data.report;
  }
}
