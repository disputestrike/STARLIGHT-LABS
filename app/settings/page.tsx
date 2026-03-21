// app/settings/page.tsx
"use client";

import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import Card from "@/components/ui/Card";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<"account" | "notifications" | "security" | "integrations" | "preferences">("account");
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">("idle");

  const tabs = [
    { id: "account", label: "Account", icon: "👤" },
    { id: "notifications", label: "Notifications", icon: "🔔" },
    { id: "security", label: "Security", icon: "🔐" },
    { id: "integrations", label: "Integrations", icon: "🔗" },
    { id: "preferences", label: "Preferences", icon: "⚙️" },
  ];

  const handleSave = async () => {
    setSaveStatus("saving");
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSaveStatus("saved");
    setTimeout(() => setSaveStatus("idle"), 2000);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-1">Manage your account and preferences</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 border-b border-gray-200 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-3 font-semibold whitespace-nowrap border-b-2 transition ${
                activeTab === tab.id
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-600 hover:text-gray-900"
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* Account Settings */}
        {activeTab === "account" && (
          <div className="space-y-4">
            <Card>
              <h2 className="text-xl font-bold mb-4">Profile Information</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      defaultValue="John"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      defaultValue="Doe"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    defaultValue="john@example.com"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title/Role
                  </label>
                  <input
                    type="text"
                    defaultValue="Project Manager"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button
                  onClick={handleSave}
                  className={`px-4 py-2 rounded-lg font-semibold transition ${
                    saveStatus === "saved"
                      ? "bg-green-600 text-white"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
                >
                  {saveStatus === "saving" ? "Saving..." : saveStatus === "saved" ? "✓ Saved" : "Save Changes"}
                </button>
              </div>
            </Card>

            <Card>
              <h2 className="text-xl font-bold mb-4">Danger Zone</h2>
              <div className="space-y-3">
                <p className="text-gray-600">
                  Once you delete your account, there is no going back. Please be certain.
                </p>
                <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-semibold">
                  Delete Account
                </button>
              </div>
            </Card>
          </div>
        )}

        {/* Notification Settings */}
        {activeTab === "notifications" && (
          <div className="space-y-4">
            <Card>
              <h2 className="text-xl font-bold mb-4">Notification Preferences</h2>
              <div className="space-y-4">
                {[
                  { id: "email", label: "Email Notifications", description: "Receive important updates via email" },
                  { id: "sms", label: "SMS Notifications", description: "Get alerts via text message" },
                  { id: "push", label: "Push Notifications", description: "In-app push notifications" },
                  { id: "slack", label: "Slack Integration", description: "Send notifications to Slack" },
                ].map((notif) => (
                  <div key={notif.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="mt-1 w-4 h-4 text-blue-600 rounded"
                    />
                    <div>
                      <p className="font-semibold text-gray-900">{notif.label}</p>
                      <p className="text-sm text-gray-600">{notif.description}</p>
                    </div>
                  </div>
                ))}
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
                >
                  Save Preferences
                </button>
              </div>
            </Card>
          </div>
        )}

        {/* Security Settings */}
        {activeTab === "security" && (
          <div className="space-y-4">
            <Card>
              <h2 className="text-xl font-bold mb-4">Password</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Current Password
                  </label>
                  <input type="password" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    New Password
                  </label>
                  <input type="password" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm Password
                  </label>
                  <input type="password" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                </div>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold">
                  Update Password
                </button>
              </div>
            </Card>

            <Card>
              <h2 className="text-xl font-bold mb-4">Two-Factor Authentication</h2>
              <div className="space-y-4">
                <p className="text-gray-600">
                  Add an extra layer of security to your account
                </p>
                <div className="flex items-center justify-between p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div>
                    <p className="font-semibold text-gray-900">2FA not enabled</p>
                    <p className="text-sm text-gray-600">Enable two-factor authentication</p>
                  </div>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold">
                    Enable 2FA
                  </button>
                </div>
              </div>
            </Card>

            <Card>
              <h2 className="text-xl font-bold mb-4">Active Sessions</h2>
              <div className="space-y-3">
                <div className="p-3 border border-gray-200 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold text-gray-900">Current Session</p>
                      <p className="text-sm text-gray-600">Chrome on macOS</p>
                      <p className="text-xs text-gray-500">Last active: Just now</p>
                    </div>
                    <button className="px-3 py-1 text-red-600 hover:bg-red-50 rounded text-sm font-semibold">
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Integrations */}
        {activeTab === "integrations" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { name: "Slack", icon: "💬", connected: true, description: "Send notifications to Slack" },
              { name: "Google Calendar", icon: "📅", connected: false, description: "Sync meetings and events" },
              { name: "Zapier", icon: "⚡", connected: false, description: "Automate workflows" },
              { name: "GitHub", icon: "🐙", connected: false, description: "Track development work" },
            ].map((integration) => (
              <Card key={integration.name}>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-lg font-semibold">{integration.icon} {integration.name}</p>
                    <p className="text-sm text-gray-600">{integration.description}</p>
                  </div>
                  <button
                    className={`px-3 py-1 rounded-lg font-semibold transition ${
                      integration.connected
                        ? "bg-red-100 text-red-600 hover:bg-red-200"
                        : "bg-blue-600 text-white hover:bg-blue-700"
                    }`}
                  >
                    {integration.connected ? "Disconnect" : "Connect"}
                  </button>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Preferences */}
        {activeTab === "preferences" && (
          <Card>
            <h2 className="text-xl font-bold mb-4">Display & Language</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Theme
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Light</option>
                  <option>Dark</option>
                  <option>Auto</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Language
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>English</option>
                  <option>Spanish</option>
                  <option>French</option>
                  <option>German</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Timezone
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>UTC-8 (PST)</option>
                  <option>UTC-5 (EST)</option>
                  <option>UTC (GMT)</option>
                  <option>UTC+1 (CET)</option>
                </select>
              </div>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
              >
                Save Preferences
              </button>
            </div>
          </Card>
        )}
      </div>
    </Layout>
  );
}
