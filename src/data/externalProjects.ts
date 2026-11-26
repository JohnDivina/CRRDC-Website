export interface ExternalProject {
  title: string;
  fundedBy: string;
  description: string;
  duration?: string;
}

export const externalProjects: ExternalProject[] = [
  {
    title: "[PROJECT TITLE 1]",
    fundedBy: "[FUNDING ENTITY 1]",
    description: "[SHORT DESCRIPTION 1]",
  },
  {
    title: "[PROJECT TITLE 2]",
    fundedBy: "[FUNDING ENTITY 2]",
    description: "[SHORT DESCRIPTION 2]",
  },
  {
    title: "[PROJECT TITLE 3]",
    fundedBy: "[FUNDING ENTITY 3]",
    description: "[SHORT DESCRIPTION 3]",
  },
];
