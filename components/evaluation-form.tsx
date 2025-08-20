"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Loader2 } from "lucide-react"

const evaluationData = {
  project1: [
    {
      question: "Current Workflow Diagram",
      prompt: "Does the diagram of the current workflow clearly and correctly show all steps?",
      answers: [
        {
          status: "Excellent 🟢",
          description:
            "The visual diagram clearly and correctly shows the full support process, including all 7 steps in the proper order. Roles and responsibilities are shown, and the layout is clean and easy to follow.",
        },
        {
          status: "Good 🟡",
          description:
            "The diagram includes most steps and roles, but has minor inaccuracies or missing labels. The overall structure is still mostly clear.",
        },
        {
          status: "Needs Improvement 🟠",
          description:
            "The diagram is incomplete or unclear (e.g., only 3-4 steps are shown, or roles are missing). The flow is difficult to interpret.",
        },
        {
          status: "Missing 🔴",
          description: "No meaningful diagram was provided, or only vague notes were submitted.",
        },
      ],
      comment: "This question evaluates the student's ability to visually document the initial process.",
    },
    {
      question: "Problem Identification",
      prompt: "Were distinct problems in the workflow identified and clearly linked to the complaint data?",
      answers: [
        {
          status: "Excellent 🟢",
          description:
            "The submission identifies 3 or more distinct problems clearly tied to specific workflow stages and complaint themes. Explanations show a strong understanding of the impact on both customers and the process.",
        },
        {
          status: "Good 🟡",
          description:
            "2-3 relevant issues are identified and linked to the workflow or feedback, but the explanations may lack depth or clarity.",
        },
        {
          status: "Needs Improvement 🟠",
          description:
            "Fewer than 3 problems are identified, or the explanations are vague, repetitive, or not clearly linked to the data.",
        },
        {
          status: "Missing 🔴",
          description:
            "No problems were identified, or the submission lacks any reference to the workflow or complaints.",
        },
      ],
      comment:
        "This question assesses the student's analytical skills and their ability to connect customer feedback to process issues.",
    },
    {
      question: "Use of Complaint Data & AI Tools",
      prompt: "Was the complaint data meaningfully summarized, and was the use of AI tools explained?",
      answers: [
        {
          status: "Excellent 🟢",
          description:
            "The complaint data is meaningfully summarized (manually or via AI). The student briefly describes how AI tools (e.g., ChatGPT) were used to analyze or summarize the data.",
        },
        {
          status: "Good 🟡",
          description: "Complaints are used with some insight, and AI tool usage is mentioned, but not well-explained.",
        },
        {
          status: "Needs Improvement 🟠",
          description:
            "There is minimal analysis of complaints. AI tools may be referenced vaguely or not meaningfully used.",
        },
        {
          status: "Missing 🔴",
          description: "There is no use of complaint data or AI tools.",
        },
      ],
      comment: "This question evaluates the student's ability to apply AI tools to the task of data analysis.",
    },
    {
      question: "AI Solutions Proposed",
      prompt: "Were realistic and relevant AI solutions proposed to address the identified problems?",
      answers: [
        {
          status: "Excellent 🟢",
          description:
            "2 or more realistic solutions are proposed and tied directly to the identified issues. Each tool is clearly explained with a rationale for its use.",
        },
        {
          status: "Good 🟡",
          description:
            "The proposed tools are generally relevant but are not fully justified or aligned with specific workflow problems.",
        },
        {
          status: "Needs Improvement 🟠",
          description: "The suggestions are too generic or mismatched. Explanations lack clarity or real-world logic.",
        },
        {
          status: "Missing 🔴",
          description: "No tools were proposed, or the proposed tools have no connection to the project task.",
        },
      ],
      comment:
        "This question assesses the student's ability to develop practical AI-based solutions for the problems they identified.",
    },
    {
      question: "Updated Workflow Diagram",
      prompt: "Does the updated workflow diagram clearly show the proposed AI integrations?",
      answers: [
        {
          status: "Excellent 🟢",
          description:
            "The revised diagram clearly reflects the AI integration. It is easy to distinguish between automated and human tasks, and the changes are easy to track. The visual is clean and well-structured.",
        },
        {
          status: "Good 🟡",
          description:
            "The diagram includes most updates, but may lack clarity or consistent labeling. It might be difficult to distinguish between human and AI roles.",
        },
        {
          status: "Needs Improvement 🟠",
          description: "The diagram is messy or unclear. AI integrations are not clearly shown or explained.",
        },
        {
          status: "Missing 🔴",
          description: "No updated diagram was provided.",
        },
      ],
      comment:
        "This question evaluates the student's ability to visually represent the proposed changes and show a clear understanding of process improvement.",
    },
    {
      question: "Benefits and Risks",
      prompt: "Were the benefits and risks of the proposed AI integration clearly explained?",
      answers: [
        {
          status: "Excellent 🟢",
          description:
            "The submission clearly outlines how AI integration improves the workflow and customer experience. At least one risk or limitation is acknowledged and explained.",
        },
        {
          status: "Good 🟡",
          description: "The benefits are described well, but risks may be mentioned briefly or unclearly.",
        },
        {
          status: "Needs Improvement 🟠",
          description: "The explanation of benefits is vague. Risks are not mentioned or are overly generic.",
        },
        {
          status: "Missing 🔴",
          description: "There is no reflection on the benefits or risks.",
        },
      ],
      comment:
        "This question checks for critical thinking and a balanced understanding of implementing new technology.",
    },
    {
      question: "Presentation Structure",
      prompt: "Does the presentation follow the required structure and formatting?",
      answers: [
        {
          status: "Excellent 🟢",
          description:
            "The presentation follows the required structure and includes all key slides. The student's name is on the intro slide and in the file name. Instruction slides have been removed. Slides are visually clean and easy to follow.",
        },
        {
          status: "Good 🟡",
          description:
            "The presentation mostly follows the structure but has one or two minor issues (e.g., a missing name, unclear layout, or an unused slide still present).",
        },
        {
          status: "Needs Improvement 🟠",
          description: "The slides are disorganized or incomplete, with multiple structural or formatting issues.",
        },
        {
          status: "Missing 🔴",
          description: "The structure is missing or completely confusing.",
        },
      ],
      comment: "This question evaluates the student's attention to detail and ability to follow instructions.",
    },
    {
      question: "Overall Thinking & Communication",
      prompt: "Does the submission demonstrate clear reasoning and a logical flow?",
      answers: [
        {
          status: "Excellent 🟢",
          description:
            "The submission demonstrates clear reasoning, thoughtful choices, and a logical flow throughout. The language is concise and easy to follow.",
        },
        {
          status: "Good 🟡",
          description:
            "The work shows a general understanding of the task with some clear reasoning, but parts may feel rushed or unclear.",
        },
        {
          status: "Needs Improvement 🟠",
          description: "The work feels underdeveloped or disconnected, and the ideas are hard to follow.",
        },
        {
          status: "Missing 🔴",
          description: "The work lacks logic or coherence and shows no evidence of engagement with the task.",
        },
      ],
      comment:
        "This question provides a holistic evaluation of the student's overall performance and quality of thought.",
    },
  ],
  project2: [
    {
      question: "Functionality",
      prompt: "Does the chatbot accurately answer user questions based on the provided knowledge base?",
      answers: [
        {
          status: "Excellent 🟢",
          description:
            "The chatbot accurately responds to user queries using the uploaded document. Answers are directly from the document and match the question's intent.",
        },
        {
          status: "Good 🟡",
          description:
            "The chatbot answers most questions correctly but may show minor confusion or use generic phrasing. Some responses might lack specificity.",
        },
        {
          status: "Needs Improvement 🟠",
          description: "The chatbot responds inconsistently or provides vague and incomplete answers.",
        },
        {
          status: "Missing 🔴",
          description:
            "The chatbot does not work at all, or its responses are completely irrelevant to the knowledge base.",
        },
      ],
      comment:
        "This question evaluates the core function of the chatbot: its ability to use the provided information to generate accurate responses.",
    },
    {
      question: "User Experience",
      prompt: "Are the chatbot's responses clear, concise, and helpful, with an appropriate welcome message?",
      answers: [
        {
          status: "Excellent 🟢",
          description:
            "Responses are clear, concise, helpful, and written in a professional yet conversational tone. The welcome message effectively sets the tone.",
        },
        {
          status: "Good 🟡",
          description:
            "The tone is mostly professional and readable, but some answers might seem awkward or overly generic.",
        },
        {
          status: "Needs Improvement 🟠",
          description:
            "Responses may be confusing, robotic, or poorly phrased. The tone is inconsistent or not clearly established.",
        },
        {
          status: "Missing 🔴",
          description:
            "There is no clear tone or welcome message. Responses are disorganized or difficult to understand.",
        },
      ],
      comment:
        "This question assesses the quality and readability of the chatbot's interactions from a user's perspective.",
    },
    {
      question: "Customization (Directive + Fallback)",
      prompt:
        "Has the chatbot been customized with a clear directive and a fallback message for unanswerable questions?",
      answers: [
        {
          status: "Excellent 🟢",
          description:
            "The chatbot includes a clear, scenario-appropriate directive and a fallback message for unanswerable questions. Both are functional and have been tested.",
        },
        {
          status: "Good 🟡",
          description: "A directive and fallback message are present but are generic or not clearly tested.",
        },
        {
          status: "Needs Improvement 🟠",
          description: "The directive or fallback message is unclear or only partially configured.",
        },
        {
          status: "Missing 🔴",
          description: "Neither a directive nor a fallback message has been configured.",
        },
      ],
      comment:
        "This question checks for essential customizations that guide the chatbot's behavior and handle off-topic queries.",
    },
    {
      question: "Testing & Documentation",
      prompt: "Is the chatbot's functionality and setup clearly documented with screenshots?",
      answers: [
        {
          status: "Excellent 🟢",
          description:
            "At least five unique user questions are tested and shown with screenshots. Screenshots also show setup steps, including document upload, directive configuration, and chatbot settings. A clear description of the chatbot's purpose is included.",
        },
        {
          status: "Good 🟡",
          description:
            "Screenshots cover most setup steps and user questions, but one or two elements may be missing or unclear. The explanation of the chatbot's purpose is brief.",
        },
        {
          status: "Needs Improvement 🟠",
          description:
            "The documentation is incomplete or screenshots are unclear. Fewer than five tested interactions are shown.",
        },
        {
          status: "Missing 🔴",
          description: "No documentation, screenshots, or explanation has been provided.",
        },
      ],
      comment: "This question evaluates the thoroughness of the project's documentation and testing process.",
    },
    {
      question: "Deployment & Submission",
      prompt: "Has the chatbot been properly published and submitted?",
      answers: [
        {
          status: "Excellent 🟢",
          description:
            'The chatbot is published, and a working public link is submitted. The file name follows the required format, and access is set to "anyone can comment."',
        },
        {
          status: "Good 🟡",
          description:
            "The chatbot is published and a link is shared, but the name format or access settings might be incorrect.",
        },
        {
          status: "Needs Improvement 🟠",
          description: "The chatbot has not been properly published, or the shared link does not work.",
        },
        {
          status: "Missing 🔴",
          description: "No live chatbot has been submitted, or the link is entirely missing.",
        },
      ],
      comment: "This question verifies that the final deliverable is correctly deployed and accessible.",
    },
  ],
  project3: [
    {
      question: "Automation Workflow Setup",
      prompt: "Is the workflow fully automated from the Google Form to the AI to the Google Sheet?",
      answers: [
        {
          status: "Excellent 🟢",
          description:
            "Yes, the workflow is fully automated with no manual steps. All components (triggers, actions, and integrations) are working correctly and have been tested.",
        },
        {
          status: "Good 🟡",
          description:
            "The workflow is mostly functional, but has minor setup issues, such as one step requiring a manual fix or occasional errors.",
        },
        {
          status: "Needs Improvement 🟠",
          description:
            "The workflow is only partially functional. Some connections are broken or require repeated manual intervention to work.",
        },
        {
          status: "Missing 🔴",
          description: "No working workflow has been set up, or connections are missing entirely.",
        },
      ],
      comment: "This question assesses the core functionality and reliability of the automated workflow.",
    },
    {
      question: "Prompt Design & Output Parsing",
      prompt: "Is the AI prompt designed to request sentiment and a summary, and is the output parsed correctly?",
      answers: [
        {
          status: "Excellent 🟢",
          description:
            "The prompt clearly requests sentiment and a summary, and the outputs are accurate and well-formatted. The parsing is automated and error-free.",
        },
        {
          status: "Good 🟡",
          description:
            "The prompt works, but may need slight refinement due to inconsistent sentiment classification or occasional formatting errors.",
        },
        {
          status: "Needs Improvement 🟠",
          description: "The prompt or parsing frequently produces inaccuracies or requires manual cleanup.",
        },
        {
          status: "Missing 🔴",
          description: "No AI prompt was used, or the output is not parsed at all.",
        },
      ],
      comment:
        "This question evaluates the quality of the AI interaction and the process of extracting data from the AI's response.",
    },
    {
      question: "Data Structure in Google Sheets",
      prompt: "Is the data in the Google Sheet cleanly organized with proper columns?",
      answers: [
        {
          status: "Excellent 🟢",
          description:
            "Yes, the data is organized with proper columns for satisfaction level, feedback, sentiment, summary, and a timestamp. There are no duplicates or missing data.",
        },
        {
          status: "Good 🟡",
          description:
            "The data is mostly organized, but may contain minor formatting issues like extra columns or inconsistent timestamps.",
        },
        {
          status: "Needs Improvement 🟠",
          description: "The data is incomplete or messy, making it difficult to read or analyze.",
        },
        {
          status: "Missing 🔴",
          description: "No data is being stored in the Google Sheet.",
        },
      ],
      comment: "This question checks the organization and integrity of the final data output.",
    },
    {
      question: "Clarity of Demo & Presentation",
      prompt: "Is the presentation and documentation of the project clear and concise?",
      answers: [
        {
          status: "Excellent 🟢",
          description:
            "The presentation is clear, concise, and logical. It includes screenshots or diagrams, and the creator explains what they'd improve with more time or tools.",
        },
        {
          status: "Good 🟡",
          description:
            "The demo is understandable, but lacks some details or screenshots. There are minor gaps in the explanation.",
        },
        {
          status: "Needs Improvement 🟠",
          description: "The documentation is minimal or unclear, and key screenshots or explanations are missing.",
        },
        {
          status: "Missing 🔴",
          description: "No presentation or documentation was provided.",
        },
      ],
      comment: "This question assesses the quality of the project's explanation and presentation.",
    },
    {
      question: "Optional: Email Alert for Negative Feedback",
      prompt: "Is there a functional email alert that triggers for negative feedback?",
      answers: [
        {
          status: "Excellent 🟢",
          description:
            "An email alert is fully functional and correctly triggers for negative sentiment or unsatisfied responses.",
        },
        {
          status: "Good 🟡",
          description:
            "An alert is set up but has not been fully tested or has minor issues, such as triggering incorrectly.",
        },
        {
          status: "Needs Improvement 🟠",
          description: "The alert is partially implemented but is unreliable.",
        },
        {
          status: "Missing 🔴",
          description: "No email alert was implemented.",
        },
      ],
      comment: "This question evaluates the implementation of an optional but valuable feature.",
    },
    {
      question: "Creativity",
      prompt: "Does the project include any creative touches or additional improvements?",
      answers: [
        {
          status: "Excellent 🟢",
          description:
            "The project includes creative touches such as a well-designed form, data filters in the sheet, a Slack integration, or fallback logic for errors.",
        },
        {
          status: "Good 🟡",
          description: "Some extra elements were added, but they are limited in scope or not fully functional.",
        },
        {
          status: "Needs Improvement 🟠",
          description: "Minimal or unfinished extra elements were included.",
        },
        {
          status: "Missing 🔴",
          description: "No additional improvements were made beyond the basic requirements.",
        },
      ],
      comment:
        "This question measures the level of creativity and effort put into enhancing the project beyond the basic requirements.",
    },
  ],
}

interface EvaluationFormProps {
  projectId: string
  onSubmit: (data: any) => void
  isLoading: boolean
}

export function EvaluationForm({ projectId, onSubmit, isLoading }: EvaluationFormProps) {
  const [formData, setFormData] = useState<Record<string, { rating: string; comment: string }>>({})
  const [studentName, setStudentName] = useState("")
  const [iterationNumber, setIterationNumber] = useState("")

  const questions = evaluationData[projectId as keyof typeof evaluationData] || []

  const handleRatingChange = (questionIndex: number, rating: string) => {
    setFormData((prev) => ({
      ...prev,
      [questionIndex]: {
        ...prev[questionIndex],
        rating,
      },
    }))
  }

  const handleCommentChange = (questionIndex: number, comment: string) => {
    setFormData((prev) => ({
      ...prev,
      [questionIndex]: {
        ...prev[questionIndex],
        comment,
      },
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const evaluationResults = questions.map((question, index) => ({
      question: question.question,
      prompt: question.prompt,
      rating: formData[index]?.rating || "",
      comment: formData[index]?.comment || "",
      evaluatorComment: question.comment,
    }))

    onSubmit({
      studentName,
      iterationNumber,
      evaluations: evaluationResults,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card className="border border-border bg-muted/20">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-card-foreground">Student Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="student-name" className="text-sm font-medium">
                Student Name *
              </Label>
              <Input
                id="student-name"
                type="text"
                placeholder="Enter student name"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                required
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="iteration-number" className="text-sm font-medium">
                Iteration Number *
              </Label>
              <Input
                id="iteration-number"
                type="number"
                placeholder="Enter iteration number"
                value={iterationNumber}
                onChange={(e) => setIterationNumber(e.target.value)}
                required
                min="1"
                className="w-full"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {questions.map((question, questionIndex) => (
        <Card key={questionIndex} className="border border-border">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-card-foreground">{question.question}</CardTitle>
            <p className="text-muted-foreground">{question.prompt}</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <RadioGroup
              value={formData[questionIndex]?.rating || ""}
              onValueChange={(value) => handleRatingChange(questionIndex, value)}
              className="space-y-3"
            >
              {question.answers.map((answer, answerIndex) => (
                <div
                  key={answerIndex}
                  className="flex items-start space-x-3 p-3 rounded-lg border border-border hover:bg-muted/50"
                >
                  <RadioGroupItem value={answer.status} id={`q${questionIndex}-a${answerIndex}`} className="mt-1" />
                  <div className="flex-1">
                    <Label htmlFor={`q${questionIndex}-a${answerIndex}`} className="font-medium cursor-pointer">
                      {answer.status}
                    </Label>
                    <p className="text-sm text-muted-foreground mt-1">{answer.description}</p>
                  </div>
                </div>
              ))}
            </RadioGroup>

            <div className="space-y-2">
              <Label htmlFor={`comment-${questionIndex}`} className="text-sm font-medium">
                Additional Comments (Optional)
              </Label>
              <Textarea
                id={`comment-${questionIndex}`}
                placeholder="Add any additional observations or comments..."
                value={formData[questionIndex]?.comment || ""}
                onChange={(e) => handleCommentChange(questionIndex, e.target.value)}
                className="min-h-[80px]"
              />
            </div>
          </CardContent>
        </Card>
      ))}

      <div className="flex justify-center pt-6">
        <Button type="submit" size="lg" disabled={isLoading} className="min-w-[200px]">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            "Submit Evaluation"
          )}
        </Button>
      </div>
    </form>
  )
}
