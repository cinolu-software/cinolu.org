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
 * Performance status levels
 */
export type PerformanceStatus = 'low' | 'medium' | 'high';

/**
 * Performance thresholds configuration
 */
export interface PerformanceThresholds {
  medium: number; // percentage threshold for medium performance (default: 50)
  high: number; // percentage threshold for high performance (default: 80)
}

/**
 * Default performance thresholds
 */
const DEFAULT_THRESHOLDS: PerformanceThresholds = {
  medium: 50,
  high: 80
};

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
 * @param thresholds - Optional custom thresholds
 * @returns Performance status ('low', 'medium', 'high')
 */
export function getPerformanceStatus(
  percentage: number,
  thresholds: PerformanceThresholds = DEFAULT_THRESHOLDS
): PerformanceStatus {
  if (percentage < thresholds.medium) return 'low';
  if (percentage < thresholds.high) return 'medium';
  return 'high';
}

/**
 * Gets CSS color class for performance status
 * @param status - Performance status
 * @returns Tailwind CSS color class
 */
export function getPerformanceColor(status: PerformanceStatus): string {
  const colorMap: Record<PerformanceStatus, string> = {
    low: 'bg-red-500',
    medium: 'bg-yellow-500',
    high: 'bg-green-500'
  };
  return colorMap[status];
}

/**
 * Validates metrics values
 * @param metricsMap - Metrics map to validate
 * @returns True if all metrics have valid values
 */
export function validateMetrics(metricsMap: MetricsMap): boolean {
  return Object.values(metricsMap).every(
    (metric) => metric.target !== null && metric.achieved !== null && metric.target >= 0 && metric.achieved >= 0
  );
}

/**
 * Gets metrics summary statistics
 * @param metricsMap - Metrics map
 * @returns Summary object with totals and percentage
 */
export function getMetricsSummary(metricsMap: MetricsMap) {
  const totalTargeted = calculateMetricsTotal(metricsMap, 'target');
  const totalAchieved = calculateMetricsTotal(metricsMap, 'achieved');
  const percentage = calculateAchievementPercentage(totalTargeted, totalAchieved);
  const status = getPerformanceStatus(percentage);

  return {
    totalTargeted,
    totalAchieved,
    percentage,
    status,
    color: getPerformanceColor(status)
  };
}
