// app/analytics/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import Card from "@/components/ui/Card";

interface AnalyticsMetrics {
  totalRevenue: number;
  revenueGrowth: number;
  totalExpenses: number;
  expenseGrowth: number;
  grossMargin: number;
  marginTrend: number;
  activeProjects: number;
  projectGrowth: number;
  engineerUtilization: number;
  utilizationTrend: number;
  salesPipeline: number;
  pipelineGrowth: number;
  conversionRate: number;
  conversionTrend: number;
  avgProjectDuration: number;
  timelineAccuracy: number;
  customerSatisfaction: number;
  nps: number;
}

interface TimeSeriesData {
  date: string;
  value: number;
}

interface ChartData {
  revenueByMonth: TimeSeriesData[];
  expensesByCategory: Array<{ name: string; value: number }>;
  projectStatus: Array<{ status: string; count: number }>;
  engineerSkills: Array<{ skill: string; count: number }>;
  dealStages: Array<{ stage: string; value: number }>;
  utilization: Array<{ engineer: string; rate: number }>;
}

export default function AnalyticsPage() {
  const [metrics, setMetrics] = useState<AnalyticsMetrics | null>(null);
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<"7d" | "30d" | "90d">("30d");

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = { Authorization: `Bearer ${token}` };

        const [metricsRes, chartRes] = await Promise.all([
          fetch(`/api/analytics/metrics?range=${timeRange}`, { headers }),
          fetch(`/api/analytics/charts?range=${timeRange}`, { headers }),
        ]);

        if (metricsRes.ok) {
          const data = await metricsRes.json();
          setMetrics(data);
        }

        if (chartRes.ok) {
          const data = await chartRes.json();
          setChartData(data);
        }
      } catch (error) {
        console.error("Error fetching analytics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [timeRange]);

  const getTrendColor = (trend: number) => {
    if (trend > 0) return "text-green-600";
    if (trend < 0) return "text-red-600";
    return "text-gray-600";
  };

  const getTrendIcon = (trend: number) => {
    if (trend > 0) return "↑";
    if (trend < 0) return "↓";
    return "→";
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Analytics & Reporting</h1>
            <p className="text-gray-600 mt-1">Real-time business insights and performance metrics</p>
          </div>
          <div className="flex gap-2">
            {["7d", "30d", "90d"].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range as "7d" | "30d" | "90d")}
                className={`px-4 py-2 rounded-lg font-semibold transition ${
                  timeRange === range
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>

        {metrics && (
          <>
            {/* Revenue & Profitability */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <div>
                  <p className="text-sm text-gray-600 uppercase">Total Revenue</p>
                  <div className="flex items-baseline gap-2 mt-2">
                    <p className="text-3xl font-bold text-gray-900">
                      ${(metrics.totalRevenue / 100).toLocaleString()}
                    </p>
                    <span className={`text-sm font-semibold ${getTrendColor(metrics.revenueGrowth)}`}>
                      {getTrendIcon(metrics.revenueGrowth)} {Math.abs(metrics.revenueGrowth)}%
                    </span>
                  </div>
                </div>
              </Card>

              <Card>
                <div>
                  <p className="text-sm text-gray-600 uppercase">Total Expenses</p>
                  <div className="flex items-baseline gap-2 mt-2">
                    <p className="text-3xl font-bold text-gray-900">
                      ${(metrics.totalExpenses / 100).toLocaleString()}
                    </p>
                    <span className={`text-sm font-semibold ${getTrendColor(-metrics.expenseGrowth)}`}>
                      {getTrendIcon(-metrics.expenseGrowth)} {Math.abs(metrics.expenseGrowth)}%
                    </span>
                  </div>
                </div>
              </Card>

              <Card>
                <div>
                  <p className="text-sm text-gray-600 uppercase">Gross Margin</p>
                  <div className="flex items-baseline gap-2 mt-2">
                    <p className="text-3xl font-bold text-gray-900">{metrics.grossMargin}%</p>
                    <span className={`text-sm font-semibold ${getTrendColor(metrics.marginTrend)}`}>
                      {getTrendIcon(metrics.marginTrend)} {Math.abs(metrics.marginTrend)}%
                    </span>
                  </div>
                </div>
              </Card>

              <Card>
                <div>
                  <p className="text-sm text-gray-600 uppercase">Net Profit</p>
                  <p className="text-3xl font-bold text-green-600 mt-2">
                    ${((metrics.totalRevenue - metrics.totalExpenses) / 100).toLocaleString()}
                  </p>
                </div>
              </Card>
            </div>

            {/* Operational Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <div>
                  <p className="text-sm text-gray-600 uppercase">Active Projects</p>
                  <div className="flex items-baseline gap-2 mt-2">
                    <p className="text-3xl font-bold text-gray-900">{metrics.activeProjects}</p>
                    <span className={`text-sm font-semibold ${getTrendColor(metrics.projectGrowth)}`}>
                      {getTrendIcon(metrics.projectGrowth)} {Math.abs(metrics.projectGrowth)}%
                    </span>
                  </div>
                </div>
              </Card>

              <Card>
                <div>
                  <p className="text-sm text-gray-600 uppercase">Engineer Utilization</p>
                  <div className="flex items-baseline gap-2 mt-2">
                    <p className="text-3xl font-bold text-gray-900">{metrics.engineerUtilization}%</p>
                    <span className={`text-sm font-semibold ${getTrendColor(metrics.utilizationTrend)}`}>
                      {getTrendIcon(metrics.utilizationTrend)} {Math.abs(metrics.utilizationTrend)}%
                    </span>
                  </div>
                </div>
              </Card>

              <Card>
                <div>
                  <p className="text-sm text-gray-600 uppercase">Timeline Accuracy</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{metrics.timelineAccuracy}%</p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${metrics.timelineAccuracy}%` }}
                    />
                  </div>
                </div>
              </Card>

              <Card>
                <div>
                  <p className="text-sm text-gray-600 uppercase">Avg Project Duration</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{metrics.avgProjectDuration}d</p>
                  <p className="text-xs text-gray-500 mt-2">days</p>
                </div>
              </Card>
            </div>

            {/* Sales & Customer Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <div>
                  <p className="text-sm text-gray-600 uppercase">Sales Pipeline</p>
                  <div className="flex items-baseline gap-2 mt-2">
                    <p className="text-3xl font-bold text-gray-900">
                      ${(metrics.salesPipeline / 100).toLocaleString()}
                    </p>
                    <span className={`text-sm font-semibold ${getTrendColor(metrics.pipelineGrowth)}`}>
                      {getTrendIcon(metrics.pipelineGrowth)} {Math.abs(metrics.pipelineGrowth)}%
                    </span>
                  </div>
                </div>
              </Card>

              <Card>
                <div>
                  <p className="text-sm text-gray-600 uppercase">Conversion Rate</p>
                  <div className="flex items-baseline gap-2 mt-2">
                    <p className="text-3xl font-bold text-gray-900">{metrics.conversionRate}%</p>
                    <span className={`text-sm font-semibold ${getTrendColor(metrics.conversionTrend)}`}>
                      {getTrendIcon(metrics.conversionTrend)} {Math.abs(metrics.conversionTrend)}%
                    </span>
                  </div>
                </div>
              </Card>

              <Card>
                <div>
                  <p className="text-sm text-gray-600 uppercase">Customer Satisfaction</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{metrics.customerSatisfaction}%</p>
                  <div className="flex gap-1 mt-2">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-4 h-4 rounded-full ${
                          i < Math.round(metrics.customerSatisfaction / 20) ? "bg-yellow-400" : "bg-gray-200"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </Card>

              <Card>
                <div>
                  <p className="text-sm text-gray-600 uppercase">NPS Score</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{metrics.nps}</p>
                  <p className="text-xs text-gray-500 mt-2">Net Promoter Score</p>
                </div>
              </Card>
            </div>

            {/* Charts Section */}
            {chartData && (
              <>
                {/* Revenue Trend */}
                <Card title="Revenue Trend" description={`Last ${timeRange}`}>
                  <div className="h-64 bg-gray-50 rounded flex items-end justify-between p-4">
                    {chartData.revenueByMonth.map((data, idx) => (
                      <div key={idx} className="flex flex-col items-center gap-2">
                        <div
                          className="bg-blue-600 rounded-t"
                          style={{
                            width: "20px",
                            height: `${(data.value / Math.max(...chartData.revenueByMonth.map((d) => d.value))) * 200}px`,
                          }}
                        />
                        <span className="text-xs text-gray-600">{data.date}</span>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Project Status Distribution */}
                <Card title="Project Status Distribution" description="Current project breakdown">
                  <div className="space-y-3">
                    {chartData.projectStatus.map((status) => (
                      <div key={status.status}>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-semibold text-gray-700">{status.status}</span>
                          <span className="text-sm text-gray-600">{status.count} projects</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{
                              width: `${(status.count / Math.max(...chartData.projectStatus.map((s) => s.count))) * 100}%`,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Engineer Skills */}
                <Card title="Team Skills Inventory" description="Engineer skill distribution">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {chartData.engineerSkills.map((skill) => (
                      <div key={skill.skill} className="text-center p-3 bg-gray-50 rounded">
                        <p className="font-semibold text-gray-900">{skill.count}</p>
                        <p className="text-xs text-gray-600">{skill.skill}</p>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Sales Pipeline Stages */}
                <Card title="Sales Pipeline by Stage" description="Deal value by stage">
                  <div className="space-y-4">
                    {chartData.dealStages.map((stage) => (
                      <div key={stage.stage}>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-semibold text-gray-700">{stage.stage}</span>
                          <span className="text-sm font-semibold text-gray-900">
                            ${(stage.value / 100).toLocaleString()}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div
                            className="bg-green-600 h-3 rounded-full"
                            style={{
                              width: `${(stage.value / Math.max(...chartData.dealStages.map((s) => s.value))) * 100}%`,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Engineer Utilization */}
                <Card title="Engineer Utilization Rates" description="Individual engineer utilization">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="px-4 py-2 text-left text-sm font-semibold text-gray-900">Engineer</th>
                          <th className="px-4 py-2 text-right text-sm font-semibold text-gray-900">Utilization</th>
                        </tr>
                      </thead>
                      <tbody>
                        {chartData.utilization.map((eng) => (
                          <tr key={eng.engineer} className="border-b border-gray-200">
                            <td className="px-4 py-3 text-sm text-gray-700">{eng.engineer}</td>
                            <td className="px-4 py-3 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <div className="w-32 bg-gray-200 rounded-full h-2">
                                  <div
                                    className="bg-blue-600 h-2 rounded-full"
                                    style={{ width: `${eng.rate}%` }}
                                  />
                                </div>
                                <span className="text-sm font-semibold text-gray-900">{eng.rate}%</span>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Card>
              </>
            )}
          </>
        )}
      </div>
    </Layout>
  );
}
