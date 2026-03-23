import { NextResponse } from "next/server";

const GITHUB_USERNAME = "vrag99";

type GruberContribution = {
  date: string;
  count: number;
  level: number;
};

type GruberResponse = {
  total: Record<string, number>;
  contributions: GruberContribution[];
};

export async function GET() {
  try {
    const url = new URL(
      `/v4/${GITHUB_USERNAME}`,
      "https://github-contributions-api.jogruber.de"
    );

    const response = await fetch(url, { next: { revalidate: 86400 } });
    const data = (await response.json()) as GruberResponse;

    const today = new Date().toISOString().split("T")[0];
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
    const startDate = oneYearAgo.toISOString().split("T")[0];

    // Filter to last year up to today (like GitHub profile)
    const contributions = data.contributions.filter(
      (c) => c.date >= startDate && c.date <= today
    );

    const total = contributions.reduce((sum, c) => sum + c.count, 0);

    return NextResponse.json({ contributions, total });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch GitHub data" },
      { status: 500 }
    );
  }
}
