"use client"

import { useState, useEffect } from "react"
import { ProjectTabs } from "@/components/project-tabs"
import EvaluationForm from "@/components/evaluation-form"
import { ResponseDisplay } from "@/components/response-display"
import { Button } from "@/components/ui/button"
import { ChevronUp } from "lucide-react"

const projects = [
  {
    id: "project1",
    name: "1. Diagram",
    description: "Evaluate AI integration in workflow processes",
  },
  {
    id: "project2",
    name: "2. Chatbot",
    description: "Assess chatbot functionality and user experience",
  },
  {
    id: "project3",
    name: "3. Automation Workflow",
    description: "Review automated feedback processing system",
  },
  {
    id: "project4",
    name: "4. Landing Pages",
    description: "Evaluate landing pages with AI-generated visual content and business effectiveness",
  },
  {
    id: "project5",
    name: "5. Weather Automation",
    description: "Evaluate automated weather workflow with OpenWeather API, AI, and Gmail integration",
  },
]

export default function Home() {
  const [activeProject, setActiveProject] = useState("project1")
  const [webhookResponse, setWebhookResponse] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)
  const [showScrollToTop, setShowScrollToTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      const scrollHeight = document.documentElement.scrollHeight
      const clientHeight = document.documentElement.clientHeight
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 10

      setShowScrollToTop(isAtBottom && scrollTop > 100)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToBottom = () => {
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "smooth" })
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleFormSubmit = async (formData: any) => {
    setIsLoading(true)
    try {
      const response = await fetch("https://n8n.smosgasbord.xyz/webhook/39e45b9b-6134-4ea0-975b-595120ef75ba", {
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

      try {
        const jsonResponse = JSON.parse(result)
        if (jsonResponse.output) {
          const markdownContent = jsonResponse.output.replace(/\\n/g, "\n").replace(/\\"/g, '"').replace(/\\\\/g, "\\")
          setWebhookResponse(markdownContent)
        } else {
          setWebhookResponse(result)
        }
      } catch (parseError) {
        setWebhookResponse(result)
      }
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
          <button class="btn btn-blue">
             <a 
              href="https://www.notion.so/coding-bootcamps/AI-Automation-Review-Templates-2286ed1efc9380749352c310a50e2f8d"
              target="_blank"
              rel="noreferrer"
            >More Templates</a>
            
          </button>
        </header>

        <div className="space-y-8">
          <ProjectTabs projects={projects} activeProject={activeProject} onProjectChange={setActiveProject} />

          <EvaluationForm
            projectId={activeProject}
            onSubmit={handleFormSubmit}
            isLoading={isLoading}
            showScrollToBottom={!!webhookResponse}
          />

          {webhookResponse && <ResponseDisplay response={webhookResponse} onResponseChange={setWebhookResponse} />}
        </div>
      </div>

      {showScrollToTop && (
        <Button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 rounded-full w-12 h-12 shadow-lg z-50"
          size="icon"
        >
          <ChevronUp className="h-5 w-5" />
        </Button>
      )}
    </main>
  )
}
