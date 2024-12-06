export interface Statistics {
  plannedTotal: string;
  actualTotal: string;
  overtime: Array<{ section: string; duration: string }>;
  undertime: Array<{ section: string; duration: string }>;
}
