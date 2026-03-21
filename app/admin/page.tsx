// app/admin/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Layout from "@/components/layout/Layout";
import Card from "@/components/ui/Card";

interface SystemMetrics {
  uptime: number;
  responseTime: number;
  errorRate: number;
  activeUsers: number;
  dbConnections: number;
  apiCallsPerMinute: number;
}

interface AuditLog {
  id: string;
  action: string;
  user: { email: string; firstName: string; lastName: string };
  resource: string;
  resourceId: string;
  changes: Record<string, unknown>;
  timestamp: string;
  ip: string;
}

export default function AdminPage() {
  const router = useRouter();
  const [metrics, setMetrics] = useState<SystemMetrics | null>(null);
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "users" | "projects" | "financial">("all");

  useEffect(() => {
    const checkAuth = () => {
      const user = localStorage.getItem("user");
      if (user) {
        const parsed = JSON.parse(user);
        if (parsed.role !== "ADMIN" && parsed.role !== "FOUNDER") {
          router.push("/dashboard");
          return;
        }
      } else {
        router.push("/auth/login");
        return;
      }

      fetchData();
    };

    checkAuth();
  }, [router]);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };

      const [dashRes, logsRes] = await Promise.all([
        fetch("/api/admin/dashboard", { headers }),
        fetch("/api/admin/audit-logs", { headers }),
      ]);

      if (dashRes.ok) {
        const data = await dashRes.json();
        setMetrics(data.metrics);
      }

      if (logsRes.ok) {
        const data = await logsRes.json();
        setLogs(data);
      }
    } catch (error) {
      console.error("Error fetching admin data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getActionColor = (action: string) => {
    const colors: Record<string, string> = {
      CREATE: "bg-green-100 text-green-800",
      UPDATE: "bg-blue-100 text-blue-800",
      DELETE: "bg-red-100 text-red-800",
      LOGIN: "bg-purple-100 text-purple-800",
      LOGOUT: "bg-gray-100 text-gray-800",
      EXPORT: "bg-orange-100 text-orange-800",
    };
    return colors[action] || "bg-gray-100 text-gray-800";
  };

  const filteredLogs = logs.filter((log) => {
    if (filter === "all") return true;
    return log.resource.toLowerCase().includes(filter);
  });

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
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-1">System monitoring and audit logs</p>
        </div>

        {/* System Health Metrics */}
        {metrics && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <div>
                <p className="text-sm text-gray-600 uppercase">System Uptime</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {(metrics.uptime / 3600).toFixed(1)}h
                </p>
                <p className="text-sm text-green-600 mt-2">✓ Healthy</p>
              </div>
            </Card>
            <Card>
              <div>
                <p className="text-sm text-gray-600 uppercase">Avg Response Time</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {metrics.responseTime}ms
                </p>
                <p className="text-sm text-gray-600 mt-2">API latency</p>
              </div>
            </Card>
            <Card>
              <div>
                <p className="text-sm text-gray-600 uppercase">Error Rate</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {metrics.errorRate}%
                </p>
                {metrics.errorRate > 5 && (
                  <p className="text-sm text-red-600 mt-2">⚠ Elevated</p>
                )}
              </div>
            </Card>
            <Card>
              <div>
                <p className="text-sm text-gray-600 uppercase">Active Users</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {metrics.activeUsers}
                </p>
              </div>
            </Card>
            <Card>
              <div>
                <p className="text-sm text-gray-600 uppercase">DB Connections</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {metrics.dbConnections}/20
                </p>
              </div>
            </Card>
            <Card>
              <div>
                <p className="text-sm text-gray-600 uppercase">API Calls/min</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {metrics.apiCallsPerMinute}
                </p>
              </div>
            </Card>
          </div>
        )}

        {/* Admin Actions */}
        <Card title="System Actions" description="Administrative operations">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <button className="p-3 bg-blue-50 rounded hover:bg-blue-100 transition text-center">
              <div className="text-xl mb-1">🔄</div>
              <div className="text-sm font-semibold">Restart Services</div>
            </button>
            <button className="p-3 bg-green-50 rounded hover:bg-green-100 transition text-center">
              <div className="text-xl mb-1">💾</div>
              <div className="text-sm font-semibold">Backup DB</div>
            </button>
            <button className="p-3 bg-yellow-50 rounded hover:bg-yellow-100 transition text-center">
              <div className="text-xl mb-1">📊</div>
              <div className="text-sm font-semibold">Generate Report</div>
            </button>
            <button className="p-3 bg-red-50 rounded hover:bg-red-100 transition text-center">
              <div className="text-xl mb-1">🔐</div>
              <div className="text-sm font-semibold">Security Audit</div>
            </button>
          </div>
        </Card>

        {/* Audit Logs */}
        <Card title="Audit Logs" description="Activity log of all system changes">
          <div className="flex gap-2 mb-4">
            {["all", "users", "projects", "financial"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f as typeof filter)}
                className={`px-3 py-1 rounded text-sm font-semibold transition ${
                  filter === f
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>

          {filteredLogs.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600">No audit logs found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                      Action
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                      Resource
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                      Timestamp
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                      IP
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLogs.slice(0, 20).map((log) => (
                    <tr key={log.id} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="text-sm font-semibold text-gray-900">
                          {log.user.firstName} {log.user.lastName}
                        </div>
                        <div className="text-xs text-gray-600">{log.user.email}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`text-xs px-3 py-1 rounded-full font-semibold ${getActionColor(log.action)}`}>
                          {log.action}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-600">{log.resource}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {new Date(log.timestamp).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{log.ip}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </div>
    </Layout>
  );
}
