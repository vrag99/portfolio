"use client";

import { useEffect, useState } from "react";
import {
  type Activity,
  ContributionGraph,
  ContributionGraphCalendar,
  ContributionGraphBlock,
  ContributionGraphFooter,
  ContributionGraphTotalCount,
  ContributionGraphLegend,
} from "@/components/ui/contribution-graph";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

type GitHubData = {
  contributions: Activity[];
  total: number;
};

const GitHubChart = () => {
  const [data, setData] = useState<GitHubData | null>(null);

  useEffect(() => {
    fetch("/api/github")
      .then((res) => res.json())
      .then((d) => {
        if (d.contributions) setData(d);
      })
      .catch(() => {});
  }, []);

  if (!data) {
    return (
      <div className="space-y-3">
        <div className="h-[140px] rounded-lg border border-dashed border-muted animate-pulse" />
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <TooltipProvider>
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
              <Tooltip>
                <TooltipTrigger asChild>
                  <g>
                    <ContributionGraphBlock
                      activity={activity}
                      dayIndex={dayIndex}
                      weekIndex={weekIndex}
                      className={cn(
                        'data-[level="0"]:fill-muted',
                        'data-[level="1"]:fill-primary/20',
                        'data-[level="2"]:fill-primary/40',
                        'data-[level="3"]:fill-primary/60',
                        'data-[level="4"]:fill-primary/80',
                      )}
                    />
                  </g>
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    {activity.count} contribution
                    {activity.count !== 1 ? "s" : ""} on{" "}
                    {new Date(activity.date).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </TooltipContent>
              </Tooltip>
            )}
          </ContributionGraphCalendar>
          <ContributionGraphFooter>
            <ContributionGraphTotalCount />
            <ContributionGraphLegend />
          </ContributionGraphFooter>
        </ContributionGraph>
      </TooltipProvider>
    </div>
  );
};

export default GitHubChart;
