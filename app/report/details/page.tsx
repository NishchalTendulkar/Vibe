"use client"

import { useRouter } from "next/navigation"
import { ChevronLeft } from "lucide-react"
import { useReport } from "../../report-context"

export default function DetailsPage() {
  const router = useRouter()
  const { report } = useReport()
  return <main className="flex min-h-screen items-center justify-center bg-background p-6"><section className="w-full max-w-xl rounded-2xl border bg-white p-8 text-center"><button onClick={() => router.back()} className="mx-auto mb-8 flex items-center gap-2 text-sm font-semibold"><ChevronLeft className="size-5"/>Back to issue type</button><h1 className="text-3xl font-bold">Step 2 — Add Details</h1><p className="mt-3 text-muted-foreground">Selected issue: {report.issueType}</p></section></main>
}
