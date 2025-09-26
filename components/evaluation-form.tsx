"use client"

import type React from "react"
import { ChevronDown } from "lucide-react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

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
          description: "No AI step was included, or the prompt does not generate relevant output.",
        },
      ],
      comment:
        "This question checks the quality of the AI interaction and the process of extracting data from the AI's response.",
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
          description:
            "The presentation is minimal or unclear and is missing a key explanation of how the workflow helps the business.",
        },
        {
          status: "Missing 🔴",
          description: "No presentation was provided.",
        },
      ],
      comment: "This question assesses the student's ability to explain and document their work clearly.",
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
            "The alert is set up but has not been fully tested, or the conditions for triggering it are incomplete.",
        },
        {
          status: "Needs Improvement 🟠",
          description: "The alert step is added but is unreliable, either causing false positives or never triggering.",
        },
        {
          status: "Missing 🔴",
          description: "No email alert was implemented.",
        },
      ],
      comment:
        "This is an optional criterion that acknowledges the implementation of a more advanced, situational feature.",
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
          description: "There was only a minimal amount of creative effort beyond the base requirements.",
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
  project4: [
    {
      question: "Coverage of Two Cases",
      prompt: "Were two distinct services implemented with complete and on-brief web pages for each?",
      answers: [
        {
          status: "Excellent 🟢",
          description:
            "Two distinct services were implemented. Both web pages are complete and fully aligned with the project brief.",
        },
        {
          status: "Good 🟡",
          description: "Two services were implemented, but one of the pages is slightly under-scoped or incomplete.",
        },
        {
          status: "Needs Improvement 🟠",
          description: "Only one service is complete, and the second page is only partially developed.",
        },
        {
          status: "Missing 🔴",
          description: "Only one service was implemented, or none at all.",
        },
      ],
      comment:
        "This criterion checks for the completion of the core project requirement: creating content for two separate services.",
    },
    {
      question: "Business Goal & CTA",
      prompt: "Does each page have a clear business goal and a prominent, effective Call to Action (CTA)?",
      answers: [
        {
          status: "Excellent 🟢",
          description:
            "Each page has a clear business goal, and the CTA is prominent, persuasive, and perfectly aligned with that goal.",
        },
        {
          status: "Good 🟡",
          description:
            "The goal and CTA are mostly clear, but they could be stronger or better positioned on the page.",
        },
        {
          status: "Needs Improvement 🟠",
          description: "The business goal is vague, or the CTA is weak or unclear on at least one of the pages.",
        },
        {
          status: "Missing 🔴",
          description: "There is no clear goal or CTA on the pages.",
        },
      ],
      comment:
        "This criterion assesses the effectiveness of the pages in guiding users toward a specific business outcome.",
    },
    {
      question: "Testimonial Section",
      prompt: "Does each page include a credible and well-designed testimonial section?",
      answers: [
        {
          status: "Excellent 🟢",
          description:
            "Each page includes a concise and credible testimonial block with 2-3 quotes that effectively build trust. Avatars and alt text are handled well.",
        },
        {
          status: "Good 🟡",
          description:
            "Testimonial sections are present but feel generic or are slightly off-tone. There may be minor accessibility gaps.",
        },
        {
          status: "Needs Improvement 🟠",
          description: "The testimonial sections are thin (e.g., only one quote) or feel irrelevant to the content.",
        },
        {
          status: "Missing 🔴",
          description: "No testimonial section is included on the pages.",
        },
      ],
      comment: "This criterion evaluates the use of social proof to enhance credibility and user trust.",
    },
    {
      question: "AI-Generated Visuals",
      prompt: "Are the AI-generated visuals relevant, professional, and well-integrated into the design?",
      answers: [
        {
          status: "Excellent 🟢",
          description:
            "At least one relevant, professional AI-generated image is included on each page, enhancing clarity and visual appeal.",
        },
        {
          status: "Good 🟡",
          description:
            "AI images are present but are somewhat generic or only loosely aligned with the page's content.",
        },
        {
          status: "Needs Improvement 🟠",
          description: "The images are low-quality, irrelevant, or distracting from the main content.",
        },
        {
          status: "Missing 🔴",
          description: "No AI-generated visuals were used on the pages.",
        },
      ],
      comment: "This criterion checks for the effective and creative use of AI for visual content.",
    },
    {
      question: "Professionalism & Usability",
      prompt: "Are the pages professional, functional, and easy to use?",
      answers: [
        {
          status: "Excellent 🟢",
          description:
            "The pages feel deployable. All CTAs, modals, and links work correctly. The copy is clean, flows are obvious, and basic accessibility standards are met.",
        },
        {
          status: "Good 🟡",
          description:
            "The pages have minor issues such as typos, spacing problems, or a flaky link, but are overall usable.",
        },
        {
          status: "Needs Improvement 🟠",
          description: "There are multiple errors, broken links, or confusing user flows.",
        },
        {
          status: "Missing 🔴",
          description: "The pages are incomplete or non-functional.",
        },
      ],
      comment: "This criterion assesses the technical quality and readiness of the final product.",
    },
    {
      question: "Design & Layout",
      prompt: "Is the design clean, with a clear hierarchy and consistent elements?",
      answers: [
        {
          status: "Excellent 🟢",
          description:
            "The design has a clean hierarchy, consistent spacing and typography, and balanced sections. It reads like a professional business site.",
        },
        {
          status: "Good 🟡",
          description: "The pages are readable but need polish in spacing, alignment, or visual balance.",
        },
        {
          status: "Needs Improvement 🟠",
          description: "The design is either cluttered or too sparse, with an unclear hierarchy.",
        },
        {
          status: "Missing 🔴",
          description: "The pages have no usable structure.",
        },
      ],
      comment: "This criterion evaluates the aesthetic quality and organizational structure of the web pages.",
    },
    {
      question: "Submission Doc & Rationale",
      prompt: "Does the submission document include the correct links and a clear rationale for each page?",
      answers: [
        {
          status: "Excellent 🟢",
          description:
            "The Google Doc includes both links and a clear rationale of 3-5 sentences for each page, tying the design choices to the project goals.",
        },
        {
          status: "Good 🟡",
          description: "The document includes links and a basic rationale, but there are some gaps in clarity.",
        },
        {
          status: "Needs Improvement 🟠",
          description: "Links are present, but the rationale is thin or off-topic.",
        },
        {
          status: "Missing 🔴",
          description: "No Google Doc was submitted, or it is missing the links or rationales.",
        },
      ],
      comment: "This criterion checks for the completeness and quality of the required documentation.",
    },
    {
      question: "Creativity & Extras (Optional)",
      prompt: "Were thoughtful and valuable creative extras or features included?",
      answers: [
        {
          status: "Excellent 🟢",
          description:
            "Thoughtful extras, such as an FAQ section, pricing, multiple AI visual styles, or CTA experiments, were included and add value to the project.",
        },
        {
          status: "Good 🟡",
          description: "Some extras are present but are underdeveloped.",
        },
        {
          status: "Needs Improvement 🟠",
          description: "There was only a minimal attempt at including extras.",
        },
        {
          status: "Missing 🔴",
          description: "No extras were included (no penalty for this).",
        },
      ],
      comment: "This is an optional criterion that recognizes extra effort and creativity.",
    },
  ],
  project5: [
    {
      question: "Automation Workflow Setup",
      prompt: "Is the entire automation workflow fully functional from start to finish?",
      answers: [
        {
          status: "Excellent 🟢",
          description:
            "The workflow runs fully automated from the schedule trigger through OpenWeather, Gemini, and finally to Gmail. All steps have been successfully tested with real data, and the weather information appears correctly in the email.",
        },
        {
          status: "Good 🟡",
          description:
            "The workflow works overall but has small issues, such as the temperature not being mapped cleanly or inconsistent email formatting.",
        },
        {
          status: "Needs Improvement 🟠",
          description:
            "The workflow is only partially working, and one or more steps fail or require manual fixing each time it runs.",
        },
        {
          status: "Missing 🔴",
          description: "There is no working workflow, or key steps are completely missing.",
        },
      ],
      comment: "This question assesses the core functionality and reliability of the automated workflow.",
    },
    {
      question: "OpenWeather API Integration",
      prompt: "Is the OpenWeather API correctly integrated and used?",
      answers: [
        {
          status: "Excellent 🟢",
          description:
            "The API key is set up correctly, tested in Postman, and properly mapped into Zapier. The student shows a clear understanding of the request URL and its parameters.",
        },
        {
          status: "Good 🟡",
          description:
            "The API works in Zapier, but testing in Postman was skipped, or some parameters are not well-explained.",
        },
        {
          status: "Needs Improvement 🟠",
          description:
            "The API call is unstable or incomplete, for example, using the wrong units or missing the description field.",
        },
        {
          status: "Missing 🔴",
          description: "No weather API was used, or the key is not working.",
        },
      ],
      comment: "This question evaluates the technical skill in setting up and using an external API.",
    },
    {
      question: "Prompt Design & AI Output",
      prompt: "Is the AI prompt well-designed and does it produce the required output?",
      answers: [
        {
          status: "Excellent 🟢",
          description:
            "The prompt is clear, concise, and consistently returns the three required outputs: product focus, staffing advice, and two promotional messages. The output is short and usable in the email.",
        },
        {
          status: "Good 🟡",
          description: "The prompt works most of the time, but it sometimes returns messy or inconsistent formatting.",
        },
        {
          status: "Needs Improvement 🟠",
          description:
            "The prompt produces frequent errors, such as being too verbose, missing promos, or providing unclear advice.",
        },
        {
          status: "Missing 🔴",
          description: "No AI step was included, or the prompt does not generate relevant output.",
        },
      ],
      comment: "This question checks the quality of the AI interaction and the usability of the generated content.",
    },
    {
      question: "Email Delivery & Formatting",
      prompt: "Is the final email delivered correctly and formatted professionally?",
      answers: [
        {
          status: "Excellent 🟢",
          description:
            "The email sent to the manager is friendly, professional, and correctly displays the weather, AI outputs, and branding (subject line and body). It has been successfully tested in the inbox.",
        },
        {
          status: "Good 🟡",
          description:
            "The email is sent, but the formatting is basic or slightly unclear, for example, all AI output is lumped into one block.",
        },
        {
          status: "Needs Improvement 🟠",
          description:
            "The email is sent but is missing key details, such as the weather information or the promotional messages.",
        },
        {
          status: "Missing 🔴",
          description: "There is no email step, or the email fails to send.",
        },
      ],
      comment: "This question evaluates the final output of the workflow and its presentation.",
    },
    {
      question: "Clarity of Demo & Presentation",
      prompt: "Is the project's presentation clear and well-documented?",
      answers: [
        {
          status: "Excellent 🟢",
          description:
            "The presentation is polished and professional, including a workflow diagram, screenshots of Zapier steps, API requests, the prompt, and a sample email. It explains why this automation is helpful for a business in a location with fast-changing weather.",
        },
        {
          status: "Good 🟡",
          description:
            "The presentation covers most parts but lacks some detail, such as no diagram or only partial screenshots.",
        },
        {
          status: "Needs Improvement 🟠",
          description:
            "The presentation is minimal or unclear and is missing a key explanation of how the workflow helps the business.",
        },
        {
          status: "Missing 🔴",
          description: "No presentation was provided.",
        },
      ],
      comment: "This question assesses the student's ability to explain and document their work clearly.",
    },
    {
      question: "Optional: Severe Weather Alert ⚠️",
      prompt: "Was a severe weather alert feature successfully implemented?",
      answers: [
        {
          status: "Excellent 🟢",
          description:
            "An alert email is fully implemented and triggers correctly for conditions like high temperature (>91°F) or specific weather descriptions like 'storm' or 'rain.' The student explains its importance for coastal operations.",
        },
        {
          status: "Good 🟡",
          description:
            "The alert is set up but has not been fully tested, or the conditions for triggering it are incomplete.",
        },
        {
          status: "Needs Improvement 🟠",
          description: "The alert step is added but is unreliable, either causing false positives or never triggering.",
        },
        {
          status: "Missing 🔴",
          description: "No alert logic was included.",
        },
      ],
      comment:
        "This is an optional criterion that acknowledges the implementation of a more advanced, situational feature.",
    },
    {
      question: "Creativity & Extra Effort",
      prompt: "Did the project include creative touches or extra effort?",
      answers: [
        {
          status: "Excellent 🟢",
          description:
            "The project includes thoughtful touches like customized prompt wording, emojis in emails, extra filter conditions, or branded email formatting.",
        },
        {
          status: "Good 🟡",
          description: "Some creative elements were added but are limited or not fully functional.",
        },
        {
          status: "Needs Improvement 🟠",
          description: "There was only a minimal amount of creative effort beyond the base requirements.",
        },
        {
          status: "Missing 🔴",
          description: "No personalization or extra effort shown.",
        },
      ],
      comment:
        "This question measures the level of creativity and polish added to the project beyond the basic requirements.",
    },
  ],
  project6: [
  {
    question: "Workflow Setup",
    prompt: "Is the workflow fully automated and functional?",
    answers: [
      {
        status: "Excellent 🟢",
        description: "The workflow fully automates reading invoices, extracting fields, generating purchase descriptions, and writing to Google Sheets. It also includes a confidence check."
      },
      {
        status: "Good 🟡",
        description: "The workflow works overall, but some steps are manual or incomplete."
      },
      {
        status: "Needs Improvement 🟠",
        description: "The workflow only partially works, with key steps missing or failing."
      },
      {
        status: "Missing 🔴",
        description: "No working workflow was provided."
      }
    ],
    comment: "This criterion evaluates the overall functionality and completeness of the automated process."
  },
  {
    question: "Document Understanding",
    prompt: "Were all required fields extracted correctly from the documents?",
    answers: [
      {
        status: "Excellent 🟢",
        description: "All four required fields—invoice number, supplier, due date, and total amount—were extracted correctly."
      },
      {
        status: "Good 🟡",
        description: "Most fields were extracted correctly, with only minor errors."
      },
      {
        status: "Needs Improvement 🟠",
        description: "Fields were extracted inconsistently, with frequent errors."
      },
      {
        status: "Missing 🔴",
        description: "Document Understanding was not used."
      }
    ],
    comment: "This criterion assesses the accuracy of the document data extraction process."
  },
  {
    question: "AI Description",
    prompt: "Does the AI prompt consistently produce a useful purchase description?",
    answers: [
      {
        status: "Excellent 🟢",
        description: "The prompt consistently produces short, clear, and useful purchase descriptions for every invoice."
      },
      {
        status: "Good 🟡",
        description: "The prompt works, but the outputs are sometimes too vague or too long."
      },
      {
        status: "Needs Improvement 🟠",
        description: "The prompt produces poor or irrelevant descriptions."
      },
      {
        status: "Missing 🔴",
        description: "No AI step was included for the purchase description."
      }
    ],
    comment: "This criterion evaluates the effectiveness and consistency of the AI-generated content."
  },
  {
    question: "Google Sheets Integration",
    prompt: "Is the data correctly populated in the Google Sheet?",
    answers: [
      {
        status: "Excellent 🟢",
        description: "The Google Sheet contains all five required columns and correct data for at least four out of six invoices."
      },
      {
        status: "Good 🟡",
        description: "The Sheet is mostly correct but is missing some data or has minor formatting issues."
      },
      {
        status: "Needs Improvement 🟠",
        description: "The Sheet is incomplete or is missing key fields."
      },
      {
        status: "Missing 🔴",
        description: "No Google Sheets step was included."
      }
    ],
    comment: "This criterion checks the accuracy and completeness of the final data output."
  },
  {
    question: "Confidence Check",
    prompt: "Was a confidence check correctly implemented?",
    answers: [
      {
        "status": "Excellent 🟢",
        "description": "A confidence check was correctly implemented, logging warnings for any invoice number with a confidence score below 0.7."
      },
      {
        "status": "Good 🟡",
        "description": "The check was included but was either not tested or the implementation was unclear."
      },
      {
        "status": "Needs Improvement 🟠",
        "description": "The confidence check is unreliable or was incorrectly implemented."
      },
      {
        "status": "Missing 🔴",
        "description": "No confidence check was implemented."
      }
    ],
    comment: "This criterion evaluates the implementation of a conditional logic feature to handle potential errors."
  },
  {
    question: "Presentation",
    prompt: "Is the presentation clear and well-documented?",
    answers: [
      {
        status: "Excellent 🟢",
        description: "The presentation consists of clear, professional slides with screenshots, explanations, and a reflection on the project."
      },
      {
        status: "Good 🟡",
        description: "The presentation covers most points but is missing some details."
      },
      {
        status: "Needs Improvement 🟠",
        description: "The presentation is minimal or the explanations are unclear."
      },
      {
        status: "Missing 🔴",
        description: "No presentation was submitted."
      }
    ],
    comment: "This criterion assesses the quality of the project's documentation and explanation."
  }
]
}

interface EvaluationFormProps {
  projectId: string
  onSubmit: (data: any) => void
  isLoading: boolean
  showScrollToBottom: boolean
}

export default function EvaluationForm({ projectId, onSubmit, isLoading, showScrollToBottom }: EvaluationFormProps) {
  const [formData, setFormData] = useState<Record<string, { rating: string; comment: string }>>({})
  const [studentName, setStudentName] = useState("")
  const [studentEmail, setStudentEmail] = useState("")
  const [iterationNumber, setIterationNumber] = useState("")
  const [reviewerName, setReviewerName] = useState("")
  const [previousComments, setPreviousComments] = useState("")
  const [accessIssues, setAccessIssues] = useState(false)
  const [specialCase, setSpecialCase] = useState(false)

  const questions = evaluationData[projectId as keyof typeof evaluationData] || []

  const getSprintNumber = (projectId: string) => {
    const sprintMap: Record<string, string> = {
      project1: "1",
      project2: "2",
      project3: "3",
      project4: "4",
      project5: "5",
      project6: "6"
    }
    return sprintMap[projectId] || "1"
  }

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const responses = Object.values(formData).map((item) => item.rating)

    const formDataToSubmit = {
      studentName,
      studentEmail,
      iterationNumber,
      sprintNumber: getSprintNumber(projectId),
      reviewerName,
      accessIssues,
      specialCase,
      previousComments: Number.parseInt(iterationNumber) > 1 ? previousComments : "",
      evaluations: responses.map((response, index) => ({
        question: questions[index]?.question || "",
        prompt: questions[index]?.comment || "",
        answer: response,
        comment: formData[index]?.comment || "",
      })),
    }

    onSubmit(formDataToSubmit)
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
              <Label htmlFor="student-email" className="text-sm font-medium">
                Student Email *
              </Label>
              <Input
                id="student-email"
                type="email"
                placeholder="Enter student email"
                value={studentEmail}
                onChange={(e) => setStudentEmail(e.target.value)}
                required
                className="w-full"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
            <div className="space-y-2">
              <Label htmlFor="sprint-number" className="text-sm font-medium">
                Sprint Number
              </Label>
              <Input
                id="sprint-number"
                type="text"
                value={getSprintNumber(projectId)}
                readOnly
                className="w-full bg-muted"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="reviewer-name" className="text-sm font-medium">
                Reviewer Name *
              </Label>
              <select
                id="reviewer-name"
                value={reviewerName}
                onChange={(e) => setReviewerName(e.target.value)}
                required
                className="w-full h-10 px-3 py-2 text-sm bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              >
                <option value="">Select reviewer</option>
                <option value="Randall">Randall</option>
                <option value="Leo">Leo</option>
                <option value="Rodrigo">Rodrigo</option>
                <option value="Steve">Steve</option>
              </select>
            </div>
          </div>

          <div className="flex items-center space-x-2 pt-2">
            <input
              type="checkbox"
              id="access-issues"
              checked={accessIssues}
              onChange={(e) => setAccessIssues(e.target.checked)}
              className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
            />
            <Label htmlFor="access-issues" className="text-sm font-medium cursor-pointer">
              Access Issues
            </Label>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="special-case"
              checked={specialCase}
              onChange={(e) => setSpecialCase(e.target.checked)}
              className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
            />
            <Label htmlFor="special-case" className="text-sm font-medium cursor-pointer">
              Special Case
            </Label>
          </div>

          {Number.parseInt(iterationNumber) > 1 && (
            <div className="space-y-2 pt-4 border-t border-border">
              <Label htmlFor="previous-comments" className="text-sm font-medium">
                Comments from Previous Instructors
              </Label>
              <Textarea
                id="previous-comments"
                placeholder="Enter comments from previous instructors..."
                value={previousComments}
                onChange={(e) => setPreviousComments(e.target.value)}
                className="min-h-[100px]"
              />
            </div>
          )}
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

      <div className="flex justify-center items-center gap-4 pt-6">
        <Button type="submit" size="lg" disabled={isLoading} className="min-w-[200px] flex items-center gap-2">
          {isLoading && (
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-background border-t-transparent" />
          )}
          {isLoading ? "Submitting..." : "Submit Evaluation"}
        </Button>
        {showScrollToBottom && (
          <Button
            type="button"
            variant="outline"
            size="lg"
            onClick={() => {
              window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "smooth" })
            }}
            className="flex items-center gap-2"
          >
            <ChevronDown className="h-4 w-4" />
            View Response
          </Button>
        )}
      </div>
    </form>
  )
}
