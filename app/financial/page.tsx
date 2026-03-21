// app/financial/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import Card from "@/components/ui/Card";

interface Invoice {
  id: string;
  invoiceNumber: string;
  status: string;
  issueDate: string;
  dueDate: string;
  totalAmount: number;
  client: { name: string };
  project: { name: string };
}

export default function FinancialPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalRevenue: 0,
    paidInvoices: 0,
    pendingInvoices: 0,
    overdue: 0,
  });

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("/api/financial/invoices", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.ok) {
          const data = await res.json();
          setInvoices(data);

          // Calculate stats
          const paid = data.filter((inv: Invoice) => inv.status === "PAID");
          const pending = data.filter(
            (inv: Invoice) => inv.status === "DRAFT" || inv.status === "SENT"
          );
          const overdue = data.filter(
            (inv: Invoice) =>
              inv.status === "OVERDUE" &&
              new Date(inv.dueDate) < new Date()
          );

          setStats({
            totalRevenue: paid.reduce((sum: number, inv: Invoice) => sum + inv.totalAmount, 0),
            paidInvoices: paid.length,
            pendingInvoices: pending.length,
            overdue: overdue.length,
          });
        }
      } catch (error) {
        console.error("Error fetching invoices:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInvoices();
  }, []);

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      DRAFT: "bg-gray-100 text-gray-800",
      SENT: "bg-blue-100 text-blue-800",
      ACCEPTED: "bg-green-100 text-green-800",
      PAID: "bg-green-100 text-green-800",
      OVERDUE: "bg-red-100 text-red-800",
      CANCELLED: "bg-yellow-100 text-yellow-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Financial</h1>
            <p className="text-gray-600 mt-1">Manage invoices, expenses, and payroll</p>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            + New Invoice
          </button>
        </div>

        {/* Financial Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <div>
              <p className="text-sm text-gray-600 uppercase">Total Revenue</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                ${(stats.totalRevenue / 100).toLocaleString()}
              </p>
              <p className="text-sm text-green-600 mt-2">↑ 12% this month</p>
            </div>
          </Card>
          <Card>
            <div>
              <p className="text-sm text-gray-600 uppercase">Paid Invoices</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.paidInvoices}</p>
              <p className="text-sm text-gray-600 mt-2">of {invoices.length} total</p>
            </div>
          </Card>
          <Card>
            <div>
              <p className="text-sm text-gray-600 uppercase">Pending</p>
              <p className="text-3xl font-bold text-yellow-600 mt-2">{stats.pendingInvoices}</p>
              <p className="text-sm text-gray-600 mt-2">awaiting payment</p>
            </div>
          </Card>
          <Card>
            <div>
              <p className="text-sm text-gray-600 uppercase">Overdue</p>
              <p className="text-3xl font-bold text-red-600 mt-2">{stats.overdue}</p>
              <p className="text-sm text-gray-600 mt-2">past due date</p>
            </div>
          </Card>
        </div>

        {/* Invoices Table */}
        <Card title="Recent Invoices" description="Latest invoicing activity">
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : invoices.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">No invoices yet.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                      Invoice #
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                      Client
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                      Project
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                      Due Date
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.slice(0, 10).map((invoice) => (
                    <tr key={invoice.id} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="px-6 py-4 font-semibold text-gray-900">
                        {invoice.invoiceNumber}
                      </td>
                      <td className="px-6 py-4 text-gray-600">{invoice.client.name}</td>
                      <td className="px-6 py-4 text-gray-600">{invoice.project?.name || "—"}</td>
                      <td className="px-6 py-4 font-semibold text-gray-900">
                        ${(invoice.totalAmount / 100).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {new Date(invoice.dueDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`text-xs px-3 py-1 rounded-full font-semibold ${getStatusColor(
                            invoice.status
                          )}`}
                        >
                          {invoice.status.replace(/_/g, " ")}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button className="text-blue-600 hover:underline text-sm font-medium">
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>

        {/* Quick Actions */}
        <Card title="Financial Tools" description="Common operations">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="p-4 bg-slate-50 rounded hover:bg-slate-100 transition text-center">
              <div className="text-2xl mb-2">📄</div>
              <div className="text-sm font-semibold">View Reports</div>
            </button>
            <button className="p-4 bg-slate-50 rounded hover:bg-slate-100 transition text-center">
              <div className="text-2xl mb-2">💳</div>
              <div className="text-sm font-semibold">Expenses</div>
            </button>
            <button className="p-4 bg-slate-50 rounded hover:bg-slate-100 transition text-center">
              <div className="text-2xl mb-2">👥</div>
              <div className="text-sm font-semibold">Payroll</div>
            </button>
            <button className="p-4 bg-slate-50 rounded hover:bg-slate-100 transition text-center">
              <div className="text-2xl mb-2">📊</div>
              <div className="text-sm font-semibold">Analytics</div>
            </button>
          </div>
        </Card>
      </div>
    </Layout>
  );
}
