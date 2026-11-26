import React from "react";
import { externalProjects } from "@/data/externalProjects";

/**
 * Displays externally funded research projects in a responsive card grid
 * directly beneath the Facilities section. Renders nothing when empty.
 */
export function ExternalProjects() {
  if (externalProjects.length === 0) {
    return null;
  }

  return (
    <section
      id="external-projects"
      className="overflow-hidden border-b border-neutral-200/80 bg-[#fbfcf9] py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 max-w-xl text-center">
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
            External Projects
          </h2>
          <p className="mt-2 text-sm text-neutral-600">
            Research projects funded by partner agencies and companies.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {externalProjects.map((project, index) => (
            <article
              key={`${project.title}-${index}`}
              className="group flex min-w-0 flex-col justify-between rounded-2xl border border-neutral-200/60 bg-white p-6 shadow-md transition-colors hover:border-neutral-300 hover:bg-neutral-50/70"
            >
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-[#008736]">
                    Funded by{" "}
                    <span className="font-semibold normal-case tracking-normal text-neutral-700">
                      {project.fundedBy}
                    </span>
                  </p>
                  {project.duration && (
                    <span className="shrink-0 rounded-full border border-neutral-200 bg-neutral-100 px-2.5 py-0.5 text-[11px] font-medium text-neutral-600">
                      {project.duration}
                    </span>
                  )}
                </div>

                <h3 className="mt-2.5 text-lg font-bold tracking-tight text-neutral-900 transition-colors group-hover:text-[#008736]">
                  {project.title}
                </h3>

                <p className="mt-2.5 line-clamp-3 text-sm leading-relaxed text-neutral-600">
                  {project.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
