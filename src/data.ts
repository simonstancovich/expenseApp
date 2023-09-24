export const data: Data = {
  report: [],
};

interface Data {
  report: {
    id: string;
    source: string;
    amount: number;
    createad_at: Date;
    updated_at: Date;
    type: ReportType;
  }[];
}

enum ReportType {
  INCOME = 'income',
  EXPENSE = 'expense',
}