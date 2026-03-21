// app/talent/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import Card from "@/components/ui/Card";

interface BootcampCohort {
  id: string;
  name: string;
  curriculum: string;
  status: string;
  startDate: string;
  endDate: string;
  _count: { enrollments: number };
}

interface Engineer {
  id: string;
  seniority: string;
  status: string;
  yearsOfExperience: number;
  utilization: number;
  user: {
    email: string;
    firstName: string;
    lastName: string;
  };
}

export default function TalentPage() {
  const [cohorts, setCohorts] = useState<BootcampCohort[]>([]);
  const [engineers, setEngineers] = useState<Engineer[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<"cohorts" | "engineers">("cohorts");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = { Authorization: `Bearer ${token}` };

        const [cohortsRes, engineersRes] = await Promise.all([
          fetch("/api/talent/bootcamp", { headers }),
          fetch("/api/users/engineers", { headers }),
        ]);

        if (cohortsRes.ok) {
          const data = await cohortsRes.json();
          setCohorts(data);
        }

        if (engineersRes.ok) {
          const data = await engineersRes.json();
          setEngineers(data);
        }
      } catch (error) {
        console.error("Error fetching talent data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getStatusBadge = (status: string) => {
    const colors: Record<string, string> = {
      RECRUITING: "bg-blue-100 text-blue-800",
      IN_PROGRESS: "bg-yellow-100 text-yellow-800",
      COMPLETED: "bg-green-100 text-green-800",
      BENCH: "bg-gray-100 text-gray-800",
      BILLABLE: "bg-green-100 text-green-800",
      TRAINING: "bg-purple-100 text-purple-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Talent Management</h1>
            <p className="text-gray-600 mt-1">Manage bootcamp cohorts and engineer profiles</p>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            + New Cohort
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-4 border-b border-gray-200">
          <button
            onClick={() => setTab("cohorts")}
            className={`px-4 py-2 font-semibold border-b-2 transition ${
              tab === "cohorts"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-600 hover:text-gray-900"
            }`}
          >
            Bootcamp Cohorts
          </button>
          <button
            onClick={() => setTab("engineers")}
            className={`px-4 py-2 font-semibold border-b-2 transition ${
              tab === "engineers"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-600 hover:text-gray-900"
            }`}
          >
            Engineers ({engineers.length})
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : tab === "cohorts" ? (
          // Cohorts Tab
          <div className="grid gap-4">
            {cohorts.length === 0 ? (
              <Card>
                <div className="text-center py-12">
                  <p className="text-gray-600">No bootcamp cohorts yet.</p>
                </div>
              </Card>
            ) : (
              cohorts.map((cohort) => (
                <Card key={cohort.id}>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-semibold text-gray-900">{cohort.name}</h3>
                        <span className={`text-xs px-3 py-1 rounded-full font-semibold ${getStatusBadge(cohort.status)}`}>
                          {cohort.status.replace(/_/g, " ")}
                        </span>
                      </div>
                      <p className="text-gray-600 mt-1">Curriculum: {cohort.curriculum}</p>
                      <div className="grid grid-cols-4 gap-4 mt-4">
                        <div>
                          <p className="text-xs text-gray-500 uppercase">Enrollees</p>
                          <p className="font-semibold">{cohort._count.enrollments}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 uppercase">Start Date</p>
                          <p className="font-semibold">{new Date(cohort.startDate).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 uppercase">End Date</p>
                          <p className="font-semibold">{new Date(cohort.endDate).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 uppercase">Duration</p>
                          <p className="font-semibold">
                            {Math.ceil(
                              (new Date(cohort.endDate).getTime() - new Date(cohort.startDate).getTime()) /
                                (1000 * 60 * 60 * 24)
                            )}{" "}
                            days
                          </p>
                        </div>
                      </div>
                    </div>
                    <button className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded transition">
                      View →
                    </button>
                  </div>
                </Card>
              ))
            )}
          </div>
        ) : (
          // Engineers Tab
          <div className="grid gap-4">
            {engineers.length === 0 ? (
              <Card>
                <div className="text-center py-12">
                  <p className="text-gray-600">No engineers on file yet.</p>
                </div>
              </Card>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Name</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Email</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Seniority</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Experience</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Utilization</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {engineers.map((engineer) => (
                      <tr key={engineer.id} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="px-6 py-4 font-semibold text-gray-900">
                          {engineer.user.firstName} {engineer.user.lastName}
                        </td>
                        <td className="px-6 py-4 text-gray-600">{engineer.user.email}</td>
                        <td className="px-6 py-4">
                          <span className="text-sm font-medium">{engineer.seniority}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`text-xs px-3 py-1 rounded-full font-semibold ${getStatusBadge(engineer.status)}`}>
                            {engineer.status.replace(/_/g, " ")}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-600">{engineer.yearsOfExperience} years</td>
                        <td className="px-6 py-4">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: `${engineer.utilization}%` }}
                            />
                          </div>
                          <span className="text-xs text-gray-600">{Math.round(engineer.utilization)}%</span>
                        </td>
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
