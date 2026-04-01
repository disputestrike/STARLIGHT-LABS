"use client";

import type { ComponentType } from "react";
import dynamic from "next/dynamic";
import "swagger-ui-react/swagger-ui.css";

type SwaggerProps = { url: string };

const SwaggerUI = dynamic(() => import("swagger-ui-react"), {
  ssr: false,
}) as ComponentType<SwaggerProps>;

export default function ApiDocsPage() {
  return (
    <div className="min-h-screen bg-white">
      <SwaggerUI url="/openapi.json" />
    </div>
  );
}
