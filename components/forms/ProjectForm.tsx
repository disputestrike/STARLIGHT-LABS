// components/forms/ProjectForm.tsx
"use client";

import React, { useState } from "react";
import { z } from "zod";

const projectFormSchema = z.object({
  name: z.string().min(3, "Project name must be at least 3 characters"),
  description: z.string().optional(),
  clientId: z.string().min(1, "Client is required"),
  startDate: z.string().datetime("Start date is required"),
  targetEndDate: z.string().datetime("Target end date is required"),
  budget: z.coerce.number().positive("Budget must be positive"),
});

type ProjectFormData = z.infer<typeof projectFormSchema>;

interface ProjectFormProps {
  onSubmit: (data: ProjectFormData) => Promise<void>;
  isLoading?: boolean;
  clients?: Array<{ id: string; name: string }>;
}

export default function ProjectForm({
  onSubmit,
  isLoading = false,
  clients = [],
}: ProjectFormProps) {
  const [formData, setFormData] = useState<Partial<ProjectFormData>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Set<string>>(new Set());

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name } = e.target;
    setTouched((prev) => new Set([...prev, name]));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Validate form
      const validated = projectFormSchema.parse(formData);
      await onSubmit(validated);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          const path = err.path[0] as string;
          newErrors[path] = err.message;
        });
        setErrors(newErrors);
      }
    }
  };

  const getFieldError = (fieldName: string) => {
    return touched.has(fieldName) ? errors[fieldName] : undefined;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Project Name *
        </label>
        <input
          type="text"
          name="name"
          value={formData.name || ""}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
            getFieldError("name")
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:ring-blue-600"
          }`}
          placeholder="e.g., E-commerce Platform"
        />
        {getFieldError("name") && (
          <p className="text-red-600 text-sm mt-1">{getFieldError("name")}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description || ""}
          onChange={handleChange}
          onBlur={handleBlur}
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          placeholder="Project description..."
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Client *
        </label>
        <select
          name="clientId"
          value={formData.clientId || ""}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
            getFieldError("clientId")
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:ring-blue-600"
          }`}
        >
          <option value="">Select a client...</option>
          {clients.map((client) => (
            <option key={client.id} value={client.id}>
              {client.name}
            </option>
          ))}
        </select>
        {getFieldError("clientId") && (
          <p className="text-red-600 text-sm mt-1">{getFieldError("clientId")}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Start Date *
          </label>
          <input
            type="datetime-local"
            name="startDate"
            value={formData.startDate || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
              getFieldError("startDate")
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-600"
            }`}
          />
          {getFieldError("startDate") && (
            <p className="text-red-600 text-sm mt-1">{getFieldError("startDate")}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Target End Date *
          </label>
          <input
            type="datetime-local"
            name="targetEndDate"
            value={formData.targetEndDate || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
              getFieldError("targetEndDate")
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-600"
            }`}
          />
          {getFieldError("targetEndDate") && (
            <p className="text-red-600 text-sm mt-1">{getFieldError("targetEndDate")}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Budget (USD) *
        </label>
        <input
          type="number"
          name="budget"
          value={formData.budget || ""}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
            getFieldError("budget")
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:ring-blue-600"
          }`}
          placeholder="0.00"
        />
        {getFieldError("budget") && (
          <p className="text-red-600 text-sm mt-1">{getFieldError("budget")}</p>
        )}
      </div>

      <div className="flex gap-2 pt-4">
        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition disabled:bg-blue-400"
        >
          {isLoading ? "Creating..." : "Create Project"}
        </button>
        <button
          type="button"
          className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-400 transition"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
