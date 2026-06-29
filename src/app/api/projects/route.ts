import { isProjectCategory } from "@/content/categories";
import { getProjectChunk, PROJECT_CHUNK_SIZE } from "@/lib/portfolio";

function parseInteger(value: string | null, fallback: number) {
  if (value === null) {
    return fallback;
  }

  const parsed = Number(value);
  return Number.isInteger(parsed) ? parsed : null;
}

export function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const categoryParam = searchParams.get("category") ?? "all";
  const offset = parseInteger(searchParams.get("offset"), 0);
  const requestedLimit = parseInteger(
    searchParams.get("limit"),
    PROJECT_CHUNK_SIZE,
  );

  if (
    (categoryParam !== "all" && !isProjectCategory(categoryParam)) ||
    offset === null ||
    offset < 0 ||
    requestedLimit === null ||
    requestedLimit < 1
  ) {
    return Response.json(
      { error: "Invalid project query parameters." },
      { status: 400 },
    );
  }

  const limit = Math.min(requestedLimit, PROJECT_CHUNK_SIZE);
  const chunk = getProjectChunk({
    category: categoryParam,
    offset,
    limit,
  });

  return Response.json(chunk, {
    headers: {
      "Cache-Control": "public, max-age=300, s-maxage=3600",
    },
  });
}
