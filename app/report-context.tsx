"use client"

import { createContext, useContext, useMemo, useState } from "react"

type ReportDraft = {
  issueType: string
  description: string
  media: string[]
  voiceDescription: string | null
  location: unknown | null
  aiAnalysis: unknown | null
}

type ReportContextValue = {
  report: ReportDraft
  setIssueType: (issueType: string) => void
}

const ReportContext = createContext<ReportContextValue | null>(null)

export function ReportProvider({ children }: { children: React.ReactNode }) {
  const [report, setReport] = useState<ReportDraft>({
    issueType: "roads",
    description: "",
    media: [],
    voiceDescription: null,
    location: null,
    aiAnalysis: null,
  })

  const value = useMemo(() => ({
    report,
    setIssueType: (issueType: string) => setReport((current) => ({ ...current, issueType })),
  }), [report])

  return <ReportContext.Provider value={value}>{children}</ReportContext.Provider>
}

export function useReport() {
  const context = useContext(ReportContext)
  if (!context) throw new Error("useReport must be used within ReportProvider")
  return context
}
