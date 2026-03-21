// components/ui/Skeleton.tsx
import React from "react";
import { clsx } from "clsx";

interface SkeletonProps {
  className?: string;
  count?: number;
  circle?: boolean;
  height?: string;
  width?: string;
}

export function Skeleton({
  className,
  count = 1,
  circle = false,
  height = "h-4",
  width = "w-full",
}: SkeletonProps) {
  const skeletons = Array.from({ length: count });

  return (
    <>
      {skeletons.map((_, i) => (
        <div
          key={i}
          className={clsx(
            "bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 animate-pulse",
            circle && "rounded-full",
            !circle && "rounded",
            height,
            width,
            className,
            i < count - 1 && "mb-2"
          )}
        />
      ))}
    </>
  );
}

export function TableSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex gap-4">
          <Skeleton width="w-12" height="h-10" />
          <Skeleton className="flex-1" height="h-10" />
          <Skeleton width="w-24" height="h-10" />
          <Skeleton width="w-20" height="h-10" />
        </div>
      ))}
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow p-6 space-y-4">
      <Skeleton height="h-6" width="w-1/3" />
      <Skeleton height="h-4" count={3} />
      <div className="flex gap-2 pt-4">
        <Skeleton height="h-10" width="w-24" className="!rounded-lg" />
        <Skeleton height="h-10" width="w-24" className="!rounded-lg" />
      </div>
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton height="h-8" width="w-1/4" />
      <div className="grid grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <Skeleton height="h-6" width="w-1/3" className="mb-4" />
        <TableSkeleton />
      </div>
    </div>
  );
}
