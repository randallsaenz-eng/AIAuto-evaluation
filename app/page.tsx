"use client"

import { useState } from "react"
import { ProjectTabs } from "@/components/project-tabs"
import { EvaluationForm } from "@/components/evaluation-form"
import { ResponseDisplay } from "@/components/response-display"

const projects = [
  {
    id: "project1",
    name: "AI Workflow Analysis",
    description: "Evaluate AI integration in workflow processes",
  },
  {
    id: "project2",
    name: "Chatbot Development",
    description: "Assess chatbot functionality and user experience",
  },
  {
    id: "project3",
    name: "Automation Workflow",
    description: "Review automated feedback processing system",
  },
]

export default function Home() {
  const [activeProject, setActiveProject] = useState("project1")
  const [webhookResponse, setWebhookResponse] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)

  const handleFormSubmit = async (formData: any) => {
    setIsLoading(true)
    try {
      const response = await fetch("https://n8n.system.smosgasbord.xyz/webhook/39e45b9b-6134-4ea0-975b-595120ef75ba", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          project: activeProject,
          ...formData,
        }),
      })

      const result = await response.text()
      setWebhookResponse(result)
    } catch (error) {
      setWebhookResponse(`Error: ${error instanceof Error ? error.message : "Unknown error occurred"}`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-foreground mb-2">Project Evaluator</h1>
          <p className="text-muted-foreground">Select a project and complete the evaluation criteria</p>
        </header>

        <div className="space-y-8">
          <ProjectTabs projects={projects} activeProject={activeProject} onProjectChange={setActiveProject} />

          <EvaluationForm projectId={activeProject} onSubmit={handleFormSubmit} isLoading={isLoading} />

          {webhookResponse && <ResponseDisplay response={webhookResponse} onResponseChange={setWebhookResponse} />}
        </div>
      </div>
    </main>
  )
}
