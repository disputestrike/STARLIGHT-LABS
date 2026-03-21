// lib/middleware.ts
import { NextRequest, NextResponse } from "next/server";

export function logRequest(req: NextRequest) {
  const { pathname, searchParams } = req.nextUrl;
  const method = req.method;
  const timestamp = new Date().toISOString();

  console.log(
    `[${timestamp}] ${method} ${pathname}${searchParams ? `?${searchParams}` : ""}`
  );
}

export function withErrorHandler(
  handler: (req: NextRequest) => Promise<NextResponse>
) {
  return async (req: NextRequest) => {
    try {
      logRequest(req);
      return await handler(req);
    } catch (error) {
      console.error("API Error:", error);

      if (error instanceof SyntaxError) {
        return NextResponse.json(
          { error: "Invalid request body" },
          { status: 400 }
        );
      }

      if (error instanceof TypeError) {
        return NextResponse.json(
          { error: "Invalid request" },
          { status: 400 }
        );
      }

      return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 }
      );
    }
  };
}

export function withAuth(
  handler: (req: NextRequest) => Promise<NextResponse>
) {
  return async (req: NextRequest) => {
    const authHeader = req.headers.get("authorization");
    const token = authHeader?.replace("Bearer ", "");

    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Token verification would happen here
    return handler(req);
  };
}

export function withRateLimit(maxRequests = 100, windowMs = 15 * 60 * 1000) {
  const requestMap = new Map<string, number[]>();

  return (handler: (req: NextRequest) => Promise<NextResponse>) => {
    return async (req: NextRequest) => {
      const ip = req.headers.get("x-forwarded-for") || "unknown";
      const now = Date.now();
      const windowStart = now - windowMs;

      const requests = requestMap.get(ip) || [];
      const recentRequests = requests.filter((time) => time > windowStart);

      if (recentRequests.length >= maxRequests) {
        return NextResponse.json(
          { error: "Rate limit exceeded" },
          { status: 429 }
        );
      }

      recentRequests.push(now);
      requestMap.set(ip, recentRequests);

      return handler(req);
    };
  };
}

export function withCors(handler: (req: NextRequest) => Promise<NextResponse>) {
  return async (req: NextRequest) => {
    if (req.method === "OPTIONS") {
      return new NextResponse(null, {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": process.env.CORS_ORIGIN || "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
      });
    }

    const response = await handler(req);
    response.headers.set(
      "Access-Control-Allow-Origin",
      process.env.CORS_ORIGIN || "*"
    );
    return response;
  };
}
