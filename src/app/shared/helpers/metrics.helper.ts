import { IIndicator, IMetric } from '../models/entities.models';

/**
 * Represents a metric with target and achieved values
 */
export interface MetricValues {
  target: number | null;
  achieved: number | null;
}

/**
 * Represents a collection of metrics indexed by indicator ID
 */
export type MetricsMap = Record<string, MetricValues>;

/**
 * DTO for adding or updating metrics
 */
export interface MetricDto {
  indicatorId: string;
  target: number;
  achieved: number;
}

/**
 * Initializes metrics map from indicators and existing metrics
 * @param indicators - Array of indicators
 * @param existingMetrics - Array of existing metrics to populate values
 * @returns Initialized metrics map
 */
export function initializeMetricsMap(indicators: IIndicator[], existingMetrics: IMetric[] = []): MetricsMap {
  return indicators.reduce((acc, indicator) => {
    const metric = existingMetrics.find((m) => m?.indicator?.id === indicator.id);
    acc[indicator.id] = {
      target: metric?.target ?? null,
      achieved: metric?.achieved ?? null
    };
    return acc;
  }, {} as MetricsMap);
}

/**
 * Converts metrics map to array of metric DTOs
 * @param metricsMap - Map of metrics
 * @param indicators - Array of indicators
 * @returns Array of metric DTOs
 */
export function metricsMapToDto(metricsMap: MetricsMap, indicators: IIndicator[]): MetricDto[] {
  return indicators.map((indicator) => ({
    indicatorId: indicator.id,
    target: metricsMap[indicator.id]?.target ?? 0,
    achieved: metricsMap[indicator.id]?.achieved ?? 0
  }));
}

/**
 * Calculates total from metrics map values
 * @param metricsMap - Map of metrics
 * @param field - Field to sum ('target' or 'achieved')
 * @returns Total sum
 */
export function calculateMetricsTotal(metricsMap: MetricsMap, field: 'target' | 'achieved'): number {
  return Object.values(metricsMap).reduce((sum, metric) => sum + (metric[field] ?? 0), 0);
}

/**
 * Calculates achievement percentage
 * @param totalTargeted - Total targeted value
 * @param totalAchieved - Total achieved value
 * @returns Achievement percentage (0-100)
 */
export function calculateAchievementPercentage(totalTargeted: number, totalAchieved: number): number {
  if (!totalTargeted || !totalAchieved) return 0;
  return Math.round((totalAchieved / totalTargeted) * 100);
}

/**
 * Gets performance status based on achievement percentage
 * @param percentage - Achievement percentage
 * @returns Performance status ('low', 'medium', 'high')
 */
export function getPerformanceStatus(percentage: number): 'low' | 'medium' | 'high' {
  if (percentage < 50) return 'low';
  if (percentage < 80) return 'medium';
  return 'high';
}
