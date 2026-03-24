"use client";

import { useEffect, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { Skeleton } from "@/components/ui/skeleton";
import {
  type Activity,
  ContributionGraph,
  ContributionGraphCalendar,
  ContributionGraphBlock,
  ContributionGraphFooter,
  ContributionGraphTotalCount,
  ContributionGraphLegend,
} from "@/components/ui/contribution-graph";

type GitHubData = {
  contributions: Activity[];
  total: number;
};

type TooltipState = {
  activity: Activity;
  x: number;
  y: number;
} | null;

const SvgTooltip = ({ tooltip }: { tooltip: NonNullable<TooltipState> }) =>
  createPortal(
    <div
      className="pointer-events-none fixed z-50 transition-all duration-150 ease-out"
      style={{
        left: tooltip.x,
        top: tooltip.y,
        transform: "translate(-50%, -100%) translateY(-8px)",
      }}
    >
      <div className="rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-lg">
        <p className="font-semibold">{tooltip.activity.date}</p>
        <p>{tooltip.activity.count} contributions</p>
      </div>
      <div className="flex justify-center">
        <div className="h-0 w-0 border-x-[6px] border-t-[6px] border-x-transparent border-t-border" />
      </div>
    </div>,
    document.body,
  );

const GitHubChart = () => {
  const [data, setData] = useState<GitHubData | null>(null);
  const [tooltip, setTooltip] = useState<TooltipState>(null);

  useEffect(() => {
    fetch("/api/github")
      .then((res) => res.json())
      .then((d) => {
        if (d.contributions) setData(d);
      })
      .catch(() => {});
  }, []);

  const handleBlockHover = useCallback(
    (activity: Activity, e: React.MouseEvent<SVGRectElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      setTooltip({
        activity,
        x: rect.left + rect.width / 2,
        y: rect.top,
      });
    },
    [],
  );

  const handleBlockLeave = useCallback(() => setTooltip(null), []);

  if (!data) {
    return (
      <div className="space-y-3">
        <div className="flex gap-8">
          {Array.from({ length: 12 }).map((_, i) => (
            <Skeleton key={i} className="h-3 w-6" />
          ))}
        </div>
        <div className="flex gap-[3px]">
          {Array.from({ length: 52 }).map((_, wi) => (
            <div key={wi} className="flex flex-col gap-[3px]">
              {Array.from({ length: 7 }).map((_, di) => (
                <Skeleton
                  key={di}
                  className="rounded-sm"
                  style={{ width: 11, height: 11 }}
                />
              ))}
            </div>
          ))}
        </div>
        <div className="flex justify-between">
          <Skeleton className="h-3 w-48" />
          <div className="flex items-center gap-1">
            <Skeleton className="h-3 w-8" />
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="rounded-sm" style={{ width: 12, height: 12 }} />
            ))}
            <Skeleton className="h-3 w-8" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3 animate-in fade-in">
      <ContributionGraph
        data={data.contributions}
        totalCount={data.total}
        blockMargin={2}
        blockSize={11}
        fontSize={14}
        labels={{
          totalCount: "{{count}} contributions in the last year",
        }}
      >
        <ContributionGraphCalendar>
          {({ activity, dayIndex, weekIndex }) => (
            <ContributionGraphBlock
              activity={activity}
              className="cursor-pointer"
              dayIndex={dayIndex}
              weekIndex={weekIndex}
              onMouseEnter={(e) => handleBlockHover(activity, e)}
              onMouseLeave={handleBlockLeave}
            />
          )}
        </ContributionGraphCalendar>
        <ContributionGraphFooter>
          <ContributionGraphTotalCount />
          <ContributionGraphLegend />
        </ContributionGraphFooter>
      </ContributionGraph>
      {tooltip && <SvgTooltip tooltip={tooltip} />}
    </div>
  );
};

export default GitHubChart;
