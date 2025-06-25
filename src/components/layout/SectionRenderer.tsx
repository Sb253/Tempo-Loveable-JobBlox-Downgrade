import React, { Suspense } from "react";
import { ErrorBoundary } from "../../shared/components/ErrorBoundary";
import { LoadingSpinner } from "../../shared/components/LoadingSpinner";
import { createSectionRegistry } from "./SectionRegistry";
import { SectionNotFound } from "./SectionErrorComponents";

interface SectionRendererProps {
  activeSection: string;
}

export const SectionRenderer = ({ activeSection }: SectionRendererProps) => {
  console.log("SectionRenderer: Rendering section:", activeSection);

  const sectionRegistry = createSectionRegistry();

  // Handle back office with navigation capability
  if (activeSection === "back-office") {
    const BackOfficeSettings = React.lazy(() =>
      import("../BackOfficeSettings").then((m) => ({
        default: m.BackOfficeSettings,
      })),
    );
    const component = (
      <Suspense
        fallback={
          <div className="flex items-center justify-center min-h-96">
            <LoadingSpinner size="lg" text="Loading..." />
          </div>
        }
      >
        <BackOfficeSettings
          onSectionChange={(section) => {
            // This will be handled by the parent component
            window.dispatchEvent(
              new CustomEvent("sectionChange", { detail: section }),
            );
          }}
        />
      </Suspense>
    );

    return (
      <div className="p-6">
        <ErrorBoundary>{component}</ErrorBoundary>
      </div>
    );
  }

  const component =
    sectionRegistry[activeSection as keyof typeof sectionRegistry];

  if (component) {
    return (
      <div className="p-6">
        <ErrorBoundary>
          <Suspense
            fallback={
              <div className="flex items-center justify-center min-h-96">
                <LoadingSpinner size="lg" text="Loading..." />
              </div>
            }
          >
            {component}
          </Suspense>
        </ErrorBoundary>
      </div>
    );
  }

  return (
    <div className="p-6">
      <SectionNotFound sectionName={activeSection} />
    </div>
  );
};
