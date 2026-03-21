// app/sales/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import Card from "@/components/ui/Card";

interface Deal {
  id: string;
  title: string;
  description: string;
  value: number;
  probability: number;
  stage: string;
  status: string;
  client: { id: string; name: string };
}

interface Client {
  id: string;
  name: string;
  industry: string;
  website: string;
  contactEmail: string;
  _count: { projects: number; deals: number };
}

export default function SalesPage() {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<"deals" | "clients">("deals");
  const [pipeline, setPipeline] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = { Authorization: `Bearer ${token}` };

        const [dealsRes, clientsRes] = await Promise.all([
          fetch("/api/sales/deals", { headers }),
          fetch("/api/sales/clients", { headers }),
        ]);

        if (dealsRes.ok) {
          const data = await dealsRes.json();
          setDeals(data);
          const total = data.reduce(
            (sum: number, deal: Deal) => sum + (deal.value * deal.probability) / 100,
            0
          );
          setPipeline(total);
        }

        if (clientsRes.ok) {
          const data = await clientsRes.json();
          setClients(data);
        }
      } catch (error) {
        console.error("Error fetching sales data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getStageColor = (stage: string) => {
    const colors: Record<string, string> = {
      LEAD: "bg-gray-100 text-gray-800",
      QUALIFIED: "bg-blue-100 text-blue-800",
      PROPOSAL: "bg-yellow-100 text-yellow-800",
      NEGOTIATION: "bg-orange-100 text-orange-800",
      CLOSED_WON: "bg-green-100 text-green-800",
      CLOSED_LOST: "bg-red-100 text-red-800",
    };
    return colors[stage] || "bg-gray-100 text-gray-800";
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Sales</h1>
            <p className="text-gray-600 mt-1">Manage deals and client relationships</p>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              + New Deal
            </button>
            <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition">
              + New Client
            </button>
          </div>
        </div>

        {/* Pipeline Overview */}
        <Card>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <p className="text-sm text-gray-600 uppercase">Total Deals</p>
              <p className="text-3xl font-bold text-gray-900">{deals.length}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 uppercase">Pipeline Value</p>
              <p className="text-3xl font-bold text-gray-900">${(pipeline / 100).toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 uppercase">Win Rate</p>
              <p className="text-3xl font-bold text-gray-900">
                {deals.length > 0
                  ? Math.round(
                      (deals.filter((d) => d.stage === "CLOSED_WON").length / deals.length) * 100
                    )
                  : 0}
                %
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 uppercase">Active Clients</p>
              <p className="text-3xl font-bold text-gray-900">{clients.length}</p>
            </div>
          </div>
        </Card>

        {/* Tab Navigation */}
        <div className="flex gap-4 border-b border-gray-200">
          <button
            onClick={() => setTab("deals")}
            className={`px-4 py-2 font-semibold border-b-2 transition ${
              tab === "deals"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-600 hover:text-gray-900"
            }`}
          >
            Deals ({deals.length})
          </button>
          <button
            onClick={() => setTab("clients")}
            className={`px-4 py-2 font-semibold border-b-2 transition ${
              tab === "clients"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-600 hover:text-gray-900"
            }`}
          >
            Clients ({clients.length})
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : tab === "deals" ? (
          // Deals Tab
          <div className="grid gap-4">
            {deals.length === 0 ? (
              <Card>
                <div className="text-center py-12">
                  <p className="text-gray-600">No deals yet. Create one to get started.</p>
                </div>
              </Card>
            ) : (
              deals.map((deal) => (
                <Card key={deal.id}>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-semibold text-gray-900">{deal.title}</h3>
                        <span className={`text-xs px-3 py-1 rounded-full font-semibold ${getStageColor(deal.stage)}`}>
                          {deal.stage.replace(/_/g, " ")}
                        </span>
                      </div>
                      <p className="text-gray-600 mt-1">{deal.description || "No description"}</p>
                      <p className="text-sm text-gray-500 mt-2">Client: {deal.client.name}</p>
                      <div className="grid grid-cols-3 gap-4 mt-4">
                        <div>
                          <p className="text-xs text-gray-500 uppercase">Deal Value</p>
                          <p className="font-semibold">${(deal.value / 100).toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 uppercase">Probability</p>
                          <p className="font-semibold">{deal.probability}%</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 uppercase">Expected</p>
                          <p className="font-semibold">
                            ${(((deal.value * deal.probability) / 100) / 100).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                    <button className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded transition">
                      Edit →
                    </button>
                  </div>
                </Card>
              ))
            )}
          </div>
        ) : (
          // Clients Tab
          <div className="grid gap-4">
            {clients.length === 0 ? (
              <Card>
                <div className="text-center py-12">
                  <p className="text-gray-600">No clients yet.</p>
                </div>
              </Card>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Company</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Industry</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Email</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Projects</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Deals</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clients.map((client) => (
                      <tr key={client.id} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="px-6 py-4 font-semibold text-gray-900">{client.name}</td>
                        <td className="px-6 py-4 text-gray-600">{client.industry || "—"}</td>
                        <td className="px-6 py-4 text-gray-600">{client.contactEmail || "—"}</td>
                        <td className="px-6 py-4 text-gray-900 font-semibold">{client._count.projects}</td>
                        <td className="px-6 py-4 text-gray-900 font-semibold">{client._count.deals}</td>
                        <td className="px-6 py-4">
                          <button className="text-blue-600 hover:underline text-sm font-medium">View</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
}
