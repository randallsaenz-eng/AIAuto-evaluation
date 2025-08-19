"use client"

import { Button } from "@/components/ui/button"

interface Project {
  id: string
  name: string
  description: string
}

interface ProjectTabsProps {
  projects: Project[]
  activeProject: string
  onProjectChange: (projectId: string) => void
}

export function ProjectTabs({ projects, activeProject, onProjectChange }: ProjectTabsProps) {
  return (
    <div className="w-full">
      <div className="flex flex-wrap gap-2 border-b border-border">
        {projects.map((project) => (
          <Button
            key={project.id}
            variant={activeProject === project.id ? "default" : "ghost"}
            className={`rounded-b-none border-b-2 ${
              activeProject === project.id
                ? "border-primary bg-primary text-primary-foreground"
                : "border-transparent hover:border-border"
            }`}
            onClick={() => onProjectChange(project.id)}
          >
            {project.name}
          </Button>
        ))}
      </div>

      <div className="mt-4 p-4 bg-card rounded-lg border border-border">
        <p className="text-card-foreground">{projects.find((p) => p.id === activeProject)?.description}</p>
      </div>
    </div>
  )
}
