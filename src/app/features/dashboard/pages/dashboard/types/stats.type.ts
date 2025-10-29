export interface IAdminStats {
  totalUsers: number;
  totalPrograms: number;
  totalSubprograms: number;
  totalProjects: number;
  totalEvents: number;
  totalArticles: number;
}

export interface IUserStats {
  totalVentures: number;
  referralsCount: number;
}

export interface IndicatorReport {
  name: string;
  target: number | null;
  achieved: number;
  performance: number;
}

export interface ProgramReport {
  name: string;
  indicators: IndicatorReport[];
  performance: number;
}
