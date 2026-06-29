"use client";

import { Grid2X2, Rows3 } from "lucide-react";
import { useSyncExternalStore } from "react";

import { Button } from "@/components/ui/button";

type GridDensity = "compact" | "large";

const STORAGE_KEY = "portfolio:grid-density:v1";
const CHANGE_EVENT = "portfolio-grid-density-change";

function subscribe(callback: () => void) {
  function handleStorage(event: StorageEvent) {
    if (
      event.key === STORAGE_KEY &&
      (event.newValue === "compact" || event.newValue === "large")
    ) {
      document.documentElement.dataset.gridDensity = event.newValue;
    }

    callback();
  }

  window.addEventListener(CHANGE_EVENT, callback);
  window.addEventListener("storage", handleStorage);

  return () => {
    window.removeEventListener(CHANGE_EVENT, callback);
    window.removeEventListener("storage", handleStorage);
  };
}

function getSnapshot(): GridDensity {
  return document.documentElement.dataset.gridDensity === "large"
    ? "large"
    : "compact";
}

function getServerSnapshot(): GridDensity {
  return "compact";
}

export function GridDensityToggle() {
  const density = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  function updateDensity(nextDensity: GridDensity) {
    document.documentElement.dataset.gridDensity = nextDensity;

    try {
      window.localStorage.setItem(STORAGE_KEY, nextDensity);
    } catch {
      // The grid still updates when storage is unavailable.
    }

    window.dispatchEvent(new Event(CHANGE_EVENT));
  }

  return (
    <div
      aria-label="Project grid density"
      className="flex shrink-0 items-center rounded-full border border-border bg-background p-0.5"
      role="group"
    >
      <Button
        aria-label="Use compact project grid"
        aria-pressed={density === "compact"}
        className="grid-density-option size-8"
        data-density-option="compact"
        data-state={density === "compact" ? "active" : "inactive"}
        onClick={() => updateDensity("compact")}
        size="icon"
        title="More projects per row: 2 mobile, 3 tablet, 4 desktop"
        variant="ghost"
      >
        <Grid2X2 aria-hidden="true" className="size-3.5" />
      </Button>
      <Button
        aria-label="Use large project grid"
        aria-pressed={density === "large"}
        className="grid-density-option size-8"
        data-density-option="large"
        data-state={density === "large" ? "active" : "inactive"}
        onClick={() => updateDensity("large")}
        size="icon"
        title="Larger previews: 1 mobile, 2 tablet, 3 desktop"
        variant="ghost"
      >
        <Rows3 aria-hidden="true" className="size-3.5" />
      </Button>
    </div>
  );
}
