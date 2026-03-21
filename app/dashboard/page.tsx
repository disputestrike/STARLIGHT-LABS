// app/dashboard/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import MetricCard from "@/components/dashboard/MetricCard";
import Card from "@/components/ui/Card";

interface DashboardMetrics {
  overview: {
    totalEngineers: number;
    activeProjects: number;
    totalRevenue: number;
    totalExpenses: number;
    grossMargin: number;
    pendingInvoices: number;
  };
  talent: {
    bootcampCohorts: number;
    avgUtilization: number;
  };
  sales: {
    openDeals: number;
  };
}

export default function DashboardPage() {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("/api/admin/dashboard", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.ok) {
          const data = await res.json();
          setMetrics(data);
        }
      } catch (error) {
        console.error("Error fetching dashboard:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, []);

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p>Loading dashboard...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (!metrics) {
    return (
      <Layout>
        <div className="text-center">
          <p className="text-red-600">Failed to load dashboard metrics</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Real-time operations metrics</p>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            label="Total Engineers"
            value={metrics.overview.totalEngineers}
            trend="up"
            change="+12% this month"
          />
          <MetricCard
            label="Active Projects"
            value={metrics.overview.activeProjects}
            trend="neutral"
            change="No change"
          />
          <MetricCard
            label="Total Revenue"
            value={`$${(metrics.overview.totalRevenue / 100).toLocaleString()}`}
            trend="up"
            change="+8% this month"
          />
          <MetricCard
            label="Gross Margin"
            value={`${metrics.overview.grossMargin}%`}
            trend="up"
            change="+2% this month"
          />
        </div>

        {/* Secondary Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card title="Talent Pipeline" description="Academy metrics">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Active Cohorts</span>
                <span className="font-semibold">{metrics.talent.bootcampCohorts}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Avg Utilization</span>
                <span className="font-semibold">{metrics.talent.avgUtilization}%</span>
              </div>
            </div>
          </Card>

          <Card title="Financial Overview" description="Revenue & expenses">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Expenses</span>
                <span className="font-semibold">${(metrics.overview.totalExpenses / 100).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Pending Invoices</span>
                <span className="font-semibold">{metrics.overview.pendingInvoices}</span>
              </div>
            </div>
          </Card>

          <Card title="Sales Pipeline" description="Open opportunities">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Expected Revenue</span>
                <span className="font-semibold">${(metrics.sales.openDeals / 100).toLocaleString()}</span>
              </div>
              <div className="mt-4">
                <button className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                  View Deals
                </button>
              </div>
            </div>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card title="Quick Actions" description="Common operations">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="p-4 bg-slate-50 rounded hover:bg-slate-100 transition text-center">
              <div className="text-2xl mb-2">➕</div>
              <div className="text-sm font-semibold">New Project</div>
            </button>
            <button className="p-4 bg-slate-50 rounded hover:bg-slate-100 transition text-center">
              <div className="text-2xl mb-2">👤</div>
              <div className="text-sm font-semibold">Add Engineer</div>
            </button>
            <button className="p-4 bg-slate-50 rounded hover:bg-slate-100 transition text-center">
              <div className="text-2xl mb-2">🏢</div>
              <div className="text-sm font-semibold">New Client</div>
            </button>
            <button className="p-4 bg-slate-50 rounded hover:bg-slate-100 transition text-center">
              <div className="text-2xl mb-2">💰</div>
              <div className="text-sm font-semibold">Create Invoice</div>
            </button>
          </div>
        </Card>
      </div>
    </Layout>
  );
}
