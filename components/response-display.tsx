"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Copy, Check, Edit, Save } from "lucide-react"

interface ResponseDisplayProps {
  response: string
  onResponseChange: (response: string) => void
}

export function ResponseDisplay({ response, onResponseChange }: ResponseDisplayProps) {
console.log(response)
  const [isEditing, setIsEditing] = useState(false)
  const [editedResponse, setEditedResponse] = useState(response)
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(response)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  const handleSave = () => {
    onResponseChange(editedResponse)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditedResponse(response)
    setIsEditing(false)
  }

  return (
    <Card className="border border-border">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-lg font-semibold">Webhook Response</CardTitle>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleCopy} className="flex items-center gap-2 bg-transparent">
            {copied ? (
              <>
                <Check className="h-4 w-4" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                Copy
              </>
            )}
          </Button>
          {!isEditing ? (
            <Button variant="outline" size="sm" onClick={() => setIsEditing(true)} className="flex items-center gap-2">
              <Edit className="h-4 w-4" />
              Edit
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleCancel}>
                Cancel
              </Button>
              <Button size="sm" onClick={handleSave} className="flex items-center gap-2">
                <Save className="h-4 w-4" />
                Save
              </Button>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <Textarea
            value={editedResponse}
            onChange={(e) => setEditedResponse(e.target.value)}
            className="min-h-[200px] font-mono text-sm"
            placeholder="Edit the response in markdown format..."
          />
        ) : (
          <div className="bg-muted p-4 rounded-lg">
            <pre className="whitespace-pre-wrap text-sm font-mono text-muted-foreground">{response}</pre>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
