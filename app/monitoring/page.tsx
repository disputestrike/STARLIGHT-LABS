// app/monitoring/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import Card from "@/components/ui/Card";

interface PerformanceMetrics {
  apiMetrics: {
    avgResponseTime: number;
    p95ResponseTime: number;
    p99ResponseTime: number;
    requestsPerSecond: number;
    errorRate: number;
    uptime: number;
  };
  databaseMetrics: {
    activeConnections: number;
    maxConnections: number;
    avgQueryTime: number;
    slowQueries: number;
    cacheHitRate: number;
  };
  systemMetrics: {
    cpuUsage: number;
    memoryUsage: number;
    diskUsage: number;
    networkIn: number;
    networkOut: number;
  };
  endpointStats: Array<{
    path: string;
    method: string;
    calls: number;
    avgTime: number;
    errors: number;
  }>;
  alerts: Array<{
    id: string;
    level: "info" | "warning" | "error";
    message: string;
    timestamp: string;
  }>;
}

export default function MonitoringPage() {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(true);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("/api/monitoring/metrics", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.ok) {
          const data = await res.json();
          setMetrics(data);
        }
      } catch (error) {
        console.error("Error fetching metrics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();

    if (autoRefresh) {
      const interval = setInterval(fetchMetrics, 10000); // Refresh every 10 seconds
      return () => clearInterval(interval);
    }
  }, [autoRefresh]);

  const getStatusColor = (value: number, threshold: number) => {
    if (value > threshold) return "text-red-600 bg-red-50";
    if (value > threshold * 0.75) return "text-yellow-600 bg-yellow-50";
    return "text-green-600 bg-green-50";
  };

  const getAlertColor = (level: string) => {
    switch (level) {
      case "error":
        return "bg-red-100 text-red-800 border-red-300";
      case "warning":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      default:
        return "bg-blue-100 text-blue-800 border-blue-300";
    }
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
            <h1 className="text-3xl font-bold text-gray-900">System Monitoring</h1>
            <p className="text-gray-600 mt-1">Real-time performance and health metrics</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                autoRefresh
                  ? "bg-blue-600 text-white"
                  : "bg-gray-300 text-gray-700 hover:bg-gray-400"
              }`}
            >
              {autoRefresh ? "🔴 Live" : "⚫ Manual"}
            </button>
            <button className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition">
              📊 Export
            </button>
          </div>
        </div>

        {metrics && (
          <>
            {/* Alerts */}
            {metrics.alerts.length > 0 && (
              <div className="space-y-2">
                {metrics.alerts.map((alert) => (
                  <div
                    key={alert.id}
                    className={`p-4 rounded-lg border ${getAlertColor(alert.level)}`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold">{alert.message}</p>
                        <p className="text-xs opacity-75 mt-1">
                          {new Date(alert.timestamp).toLocaleString()}
                        </p>
                      </div>
                      <button className="text-lg">✕</button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* API Performance */}
            <Card title="API Performance" description="Real-time API metrics">
              <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
                <div className="p-3 bg-blue-50 rounded">
                  <p className="text-xs text-gray-600 uppercase">Avg Response</p>
                  <p className="text-2xl font-bold text-blue-600">{metrics.apiMetrics.avgResponseTime}ms</p>
                </div>
                <div className="p-3 bg-blue-50 rounded">
                  <p className="text-xs text-gray-600 uppercase">P95</p>
                  <p className="text-2xl font-bold text-blue-600">{metrics.apiMetrics.p95ResponseTime}ms</p>
                </div>
                <div className="p-3 bg-blue-50 rounded">
                  <p className="text-xs text-gray-600 uppercase">P99</p>
                  <p className="text-2xl font-bold text-blue-600">{metrics.apiMetrics.p99ResponseTime}ms</p>
                </div>
                <div className="p-3 bg-green-50 rounded">
                  <p className="text-xs text-gray-600 uppercase">RPS</p>
                  <p className="text-2xl font-bold text-green-600">{metrics.apiMetrics.requestsPerSecond}</p>
                </div>
                <div className={`p-3 rounded ${getStatusColor(metrics.apiMetrics.errorRate, 1)}`}>
                  <p className="text-xs text-gray-600 uppercase">Error Rate</p>
                  <p className="text-2xl font-bold">{metrics.apiMetrics.errorRate}%</p>
                </div>
                <div className="p-3 bg-green-50 rounded">
                  <p className="text-xs text-gray-600 uppercase">Uptime</p>
                  <p className="text-2xl font-bold text-green-600">{metrics.apiMetrics.uptime}%</p>
                </div>
              </div>
            </Card>

            {/* Database Health */}
            <Card title="Database Health" description="PostgreSQL metrics">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                <div className="p-3 bg-slate-50 rounded">
                  <p className="text-xs text-gray-600 uppercase">Connections</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {metrics.databaseMetrics.activeConnections}/{metrics.databaseMetrics.maxConnections}
                  </p>
                  <div className="w-full bg-gray-200 rounded-full h-1 mt-2">
                    <div
                      className="bg-blue-600 h-1 rounded-full"
                      style={{
                        width: `${(metrics.databaseMetrics.activeConnections / metrics.databaseMetrics.maxConnections) * 100}%`,
                      }}
                    />
                  </div>
                </div>
                <div className="p-3 bg-slate-50 rounded">
                  <p className="text-xs text-gray-600 uppercase">Avg Query Time</p>
                  <p className="text-2xl font-bold text-gray-900">{metrics.databaseMetrics.avgQueryTime}ms</p>
                </div>
                <div className={`p-3 rounded ${getStatusColor(metrics.databaseMetrics.slowQueries, 10)}`}>
                  <p className="text-xs text-gray-600 uppercase">Slow Queries</p>
                  <p className="text-2xl font-bold">{metrics.databaseMetrics.slowQueries}</p>
                </div>
                <div className="p-3 bg-green-50 rounded">
                  <p className="text-xs text-gray-600 uppercase">Cache Hit</p>
                  <p className="text-2xl font-bold text-green-600">{metrics.databaseMetrics.cacheHitRate}%</p>
                </div>
              </div>
            </Card>

            {/* System Resources */}
            <Card title="System Resources" description="Server utilization">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {[
                  { label: "CPU Usage", value: metrics.systemMetrics.cpuUsage, unit: "%" },
                  { label: "Memory", value: metrics.systemMetrics.memoryUsage, unit: "%" },
                  { label: "Disk", value: metrics.systemMetrics.diskUsage, unit: "%" },
                  { label: "Network In", value: metrics.systemMetrics.networkIn, unit: "Mbps" },
                  { label: "Network Out", value: metrics.systemMetrics.networkOut, unit: "Mbps" },
                ].map((metric) => (
                  <div key={metric.label} className="p-4 bg-gray-50 rounded">
                    <p className="text-sm text-gray-600 uppercase">{metric.label}</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">
                      {metric.value}
                      <span className="text-lg">{metric.unit}</span>
                    </p>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div
                        className={`h-2 rounded-full ${
                          metric.value > 80 ? "bg-red-600" : metric.value > 60 ? "bg-yellow-600" : "bg-green-600"
                        }`}
                        style={{ width: `${Math.min(metric.value, 100)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Endpoint Statistics */}
            <Card title="Top Endpoints" description="API endpoint performance">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Endpoint</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Calls</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Avg Time</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Errors</th>
                    </tr>
                  </thead>
                  <tbody>
                    {metrics.endpointStats.slice(0, 10).map((stat) => (
                      <tr key={`${stat.method}-${stat.path}`} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div>
                            <span className="inline-block px-2 py-1 text-xs font-semibold rounded bg-blue-100 text-blue-800 mr-2">
                              {stat.method}
                            </span>
                            <code className="text-sm text-gray-700">{stat.path}</code>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900 font-semibold">{stat.calls}</td>
                        <td className="px-6 py-4 text-sm text-gray-700">{stat.avgTime}ms</td>
                        <td className="px-6 py-4">
                          {stat.errors > 0 ? (
                            <span className="text-red-600 font-semibold">{stat.errors}</span>
                          ) : (
                            <span className="text-green-600">0</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </>
        )}
      </div>
    </Layout>
  );
}
