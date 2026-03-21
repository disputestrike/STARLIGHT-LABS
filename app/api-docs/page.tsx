// app/api-docs/page.tsx
"use client";

import React, { useEffect } from "react";

export default function ApiDocsPage() {
  useEffect(() => {
    // Load Swagger UI
    loadSwaggerUI();
  }, []);

  const loadSwaggerUI = async () => {
    const ui = await import("swagger-ui-react").then((m) => m.default);
    const SwaggerUIBundle = require("swagger-ui-react").default;

    const element = document.getElementById("swagger-ui");
    if (element) {
      SwaggerUIBundle({
        url: "/openapi.json",
        dom_id: "#swagger-ui",
        deepLinking: true,
        presets: [
          require("swagger-ui-react/swagger-ui").presets.apis,
          require("swagger-ui-react/swagger-ui").SwaggerUIStandalonePreset,
        ],
        plugins: [
          require("swagger-ui-react/swagger-ui").plugins.DownloadUrl,
        ],
        layout: "StandaloneLayout",
      });
    }
  };

  return (
    <div style={{ height: "100vh" }}>
      <div id="swagger-ui"></div>
    </div>
  );
}
