"use client"

import { useState } from "react"
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Bell,
  Building2,
  Camera,
  Check,
  ChevronDown,
  CircleHelp,
  Clock,
  Compass,
  Crosshair,
  Droplets,
  FileText,
  Globe2,
  Heart,
  Home,
  Image as ImageIcon,
  Landmark,
  Lightbulb,
  LocateFixed,
  Lock,
  Map,
  MapPin,
  Menu,
  MessageCircle,
  MessageSquare,
  Mic,
  Pencil,
  Plus,
  Radio,
  Route,
  Shield,
  ShieldCheck,
  Sparkles,
  Target,
  Trash2,
  TrendingUp,
  UserCircle,
  Users,
  X,
  Zap,
} from "lucide-react"

const categories = [
  { id: "roads", title: "Roads & Footpaths", text: "Potholes, cracks, damaged roads, footpaths", icon: Route, tone: "green" },
  { id: "garbage", title: "Garbage", text: "Overflowing bins, illegal dumping, unclean areas", icon: Trash2, tone: "lime" },
  { id: "water", title: "Water Supply", text: "Leakage, no supply, water quality issues", icon: Droplets, tone: "blue" },
  { id: "electricity", title: "Electricity", text: "Power cuts, faulty wires, outages", icon: Zap, tone: "amber" },
  { id: "streetlights", title: "Streetlights", text: "Not working, damaged lights, flickering", icon: Lightbulb, tone: "violet" },
  { id: "drainage", title: "Drainage", text: "Blockage, overflow, bad drainage, waterlogging", icon: Radio, tone: "teal" },
  { id: "other", title: "Other Issue", text: "Something else not listed above", icon: CircleHelp, tone: "green" },
] as const

const departmentMap: Record<string, string> = {
  roads: "Public Works Department",
  garbage: "Sanitation Department",
  water: "Water Works Department",
  electricity: "Electrical Services",
  streetlights: "Electrical / Public Lighting",
  drainage: "Drainage / Public Works",
  other: "General Civic Services",
}

const reports = [
  { title: "Deep Pothole", address: "400 Block, Main St.", time: "2 days ago", status: "In Progress", image: "road" },
  { title: "Garbage Overflow", address: "12 Maple Ave", time: "4 hours ago", status: "Action Required", image: "trash" },
  { title: "Streetlight Not Working", address: "Oak & 5th", time: "1 week ago", status: "Resolved", image: "light" },
]

const toneStyles: Record<string, string> = {
  green: "bg-[#e5f6e9] text-[#58ae47]",
  lime: "bg-[#edf8df] text-[#63ad39]",
  blue: "bg-[#e7f0ff] text-[#1674e8]",
  amber: "bg-[#fff4d8] text-[#f4ad11]",
  violet: "bg-[#f0e8ff] text-[#8954db]",
  teal: "bg-[#e3f6f1] text-[#0a9c7d]",
}

function Brand() {
  return (
    <div className="flex items-center gap-3">
      <div className="relative grid size-11 place-items-center rounded-2xl bg-[#72bd55] text-white shadow-sm">
        <Shield className="size-7" fill="currentColor" strokeWidth={1.5} />
        <Sparkles className="absolute right-1 top-1 size-2.5" fill="white" />
      </div>
      <div>
        <div className="text-[22px] font-bold tracking-tight">CivicVoice</div>
        <div className="text-[12px] font-medium text-muted-foreground">Your City. Our Priority.</div>
      </div>
    </div>
  )
}

function Sidebar({ mobileOpen, setMobileOpen }: { mobileOpen: boolean; setMobileOpen: (v: boolean) => void }) {
  const nav = [
    [Home, "Home"],
    [MessageCircle, "My Reports"],
    [MapPin, "Nearby Issues"],
    [Bell, "Notifications"],
    [UserCircle, "Profile"],
  ] as const
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-20 flex w-[292px] flex-col border-r bg-white px-8 py-9 transition-transform lg:static lg:translate-x-0 ${
        mobileOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex items-center justify-between">
        <Brand />
        <button className="lg:hidden" onClick={() => setMobileOpen(false)} aria-label="Close menu">
          <X />
        </button>
      </div>
      <nav className="mt-9 flex flex-col gap-2">
        {nav.map(([Icon, label], i) => (
          <button
            key={label}
            className={`flex items-center gap-4 rounded-xl px-4 py-3.5 text-left text-[15px] font-semibold ${
              i === 0
                ? "border border-[#b7e3cb] bg-[#eefaf3] text-[#087b4b]"
                : "text-foreground hover:bg-muted"
            }`}
            onClick={() => setMobileOpen(false)}
          >
            <Icon className="size-5" />
            <span>{label}</span>
            {label === "Notifications" && (
              <span className="ml-auto grid size-6 place-items-center rounded-full bg-[#d9f2e2] text-xs text-[#087b4b]">
                3
              </span>
            )}
          </button>
        ))}
      </nav>
      <div className="mt-8 overflow-hidden rounded-2xl bg-[#e9f9ef] p-4 pb-0">
        <h3 className="max-w-[170px] text-xl font-bold leading-tight text-[#126f47]">Help make your city better</h3>
        <p className="mt-3 max-w-[180px] text-sm leading-6">Report issues, track progress and see real change.</p>
        <div className="mt-3 h-20 bg-[linear-gradient(165deg,transparent_20%,#b9e8c7_21%,#b9e8c7_60%,transparent_61%)]" />
      </div>
      <div className="mt-8">
        <p className="mb-3 px-3 text-sm font-bold">Quick Help</p>
        <button className="flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-sm font-medium hover:bg-muted">
          <CircleHelp className="size-4" /> How to Report?
        </button>
        <button className="mt-2 flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-sm font-medium hover:bg-muted">
          <MessageCircle className="size-4" /> Contact Support
        </button>
      </div>
      <div className="mt-auto flex flex-col gap-3 border-t pt-6">
        <button className="flex items-center justify-between rounded-xl border px-4 py-3 text-sm">
          <span className="flex items-center gap-3">
            <Globe2 className="size-4" /> English
          </span>
          <ChevronDown className="size-4" />
        </button>
        <button className="flex items-center justify-between rounded-xl border px-4 py-3 text-sm">
          <span className="flex items-center gap-3">
            <Sparkles className="size-4" /> Light Mode
          </span>
          <ChevronDown className="size-4" />
        </button>
      </div>
    </aside>
  )
}

function RecentReports() {
  return (
    <section className="rounded-2xl border bg-white p-5 shadow-[0_2px_12px_rgba(16,33,58,0.03)]">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold">Recent Reports</h2>
        <button className="text-sm text-blue-600 hover:underline">View All</button>
      </div>
      <div className="mt-4 flex flex-col gap-4">
        {reports.map((report) => (
          <div className="flex gap-4" key={report.title}>
            <div
              className={`grid size-[62px] shrink-0 place-items-center rounded-xl text-white ${
                report.image === "road" ? "bg-[#6c736c]" : report.image === "trash" ? "bg-[#728b6d]" : "bg-[#8f9da2]"
              }`}
            >
              <div className="size-10 rounded-md border-2 border-white/50 opacity-70" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-2">
                <h3 className="truncate text-[15px] font-bold">{report.title}</h3>
                <span
                  className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                    report.status === "Resolved"
                      ? "bg-[#e8f7ec] text-[#087b4b]"
                      : report.status === "Action Required"
                      ? "bg-[#ffedf0] text-[#db4f60]"
                      : "bg-[#e8f1ff] text-[#3175dc]"
                  }`}
                >
                  {report.status}
                </span>
              </div>
              <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin className="size-3.5" />
                {report.address}
              </p>
              <p className="mt-2 text-xs text-muted-foreground">{report.time}</p>
            </div>
          </div>
        ))}
      </div>
      <button className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg border border-[#087b4b] py-2 text-sm font-semibold text-[#087b4b] hover:bg-[#eefaf3]">
        <TrendingUp className="size-4" /> Track Your Report
      </button>
    </section>
  )
}

function NearbyMap() {
  return (
    <section className="rounded-2xl border bg-white p-4 shadow-[0_2px_12px_rgba(16,33,58,0.03)]">
      <h2 className="px-1 text-lg font-bold">
        Issues Near You{" "}
        <span className="ml-1 inline-grid size-7 place-items-center rounded-full bg-[#d9f2e2] align-middle text-sm text-[#087b4b]">
          12
        </span>
      </h2>
      <div className="relative mt-4 h-[220px] overflow-hidden rounded-xl bg-[#e7f3ec]">
        <div
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              "linear-gradient(35deg, transparent 45%, white 46%, white 49%, transparent 50%), linear-gradient(120deg, transparent 46%, white 47%, white 50%, transparent 51%), linear-gradient(10deg, transparent 46%, #d5e8da 47%, #d5e8da 51%, transparent 52%)",
            backgroundSize: "130px 90px, 150px 120px, 180px 100px",
          }}
        />
        <div className="absolute left-[47%] top-[45%] grid size-12 place-items-center rounded-full bg-blue-100/80">
          <div className="grid size-6 place-items-center rounded-full border-2 border-white bg-blue-600 shadow-lg">
            <LocateFixed className="size-3 text-white" />
          </div>
        </div>
        {[
          [15, 30, "#ed5261", "!"],
          [32, 18, "#f7b929", "!"],
          [58, 26, "#ed5261", "!"],
          [70, 10, "#2785ed", "•"],
          [24, 62, "#0b986a", "▦"],
          [49, 70, "#8a52da", "!"],
          [71, 67, "#0b986a", "▦"],
          [84, 46, "#2785ed", "•"],
        ].map(([x, y, c, t], i) => (
          <span
            key={i}
            className="absolute grid size-7 place-items-center rounded-full text-xs font-bold text-white shadow"
            style={{ left: `${x}%`, top: `${y}%`, backgroundColor: c as string }}
          >
            {t}
          </span>
        ))}
        <button className="absolute bottom-3 left-3 flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-semibold shadow">
          <Map className="size-4" /> View on Map
        </button>
      </div>
    </section>
  )
}

function Impact() {
  const metrics = [
    { Icon: Shield, num: "21", label: "Reports", sub: "Submitted", tone: "green" },
    { Icon: Radio, num: "14", label: "In Progress", sub: "", tone: "blue" },
    { Icon: Shield, num: "8", label: "Resolved", sub: "", tone: "green" },
    { Icon: Heart, num: "126", label: "Thank You's", sub: "", tone: "violet" },
  ]
  return (
    <section className="rounded-2xl border bg-white p-4 shadow-[0_2px_12px_rgba(16,33,58,0.03)]">
      <h2 className="text-lg font-bold">Your Impact</h2>
      <p className="mt-1 text-sm text-muted-foreground">Together, we&apos;re creating a better city!</p>
      <div className="mt-4 grid grid-cols-4 gap-3">
        {metrics.map(({ Icon, num, label, sub, tone }, i) => (
          <div className="flex min-w-0 flex-col items-center rounded-xl border bg-[#fcfdfd] px-1 py-3 text-center" key={label}>
            <div className={`grid size-11 place-items-center rounded-full ${toneStyles[tone]}`}>
              <Icon className="size-5" fill={i === 3 ? "currentColor" : "none"} />
            </div>
            <strong className="mt-2 text-2xl">{num}</strong>
            <span className="text-xs leading-5 text-muted-foreground">{label}</span>
            {sub && <span className="text-xs text-muted-foreground">{sub}</span>}
          </div>
        ))}
      </div>
      <div className="mt-3 rounded-xl bg-[#eaf8ef] px-3 py-2.5 text-center text-sm text-[#27804f]">
        You&apos;re making a real difference. Thank you! <Heart className="inline size-4 fill-current" />
      </div>
    </section>
  )
}

function Progress({ active = 1 }: { active?: number }) {
  const steps = ["Issue Type", "Add Details", "Location", "Review", "Submit"]
  return (
    <div className="mx-auto max-w-3xl">
      <div className="flex items-start justify-between">
        {steps.map((label, index) => {
          const stepNum = index + 1
          const isCompleted = stepNum < active
          const isActive = stepNum === active
          return (
            <div className="flex flex-1 items-start" key={label}>
              <div className="flex flex-col items-center gap-2">
                <span
                  className={`grid size-8 place-items-center rounded-full border text-sm font-semibold transition-colors ${
                    isCompleted
                      ? "border-[#087b4b] bg-[#087b4b] text-white"
                      : isActive
                      ? "border-[#087b4b] bg-[#087b4b] text-white font-bold"
                      : "border-border bg-white text-muted-foreground"
                  }`}
                >
                  {isCompleted ? <Check className="size-4 stroke-[3]" /> : stepNum}
                </span>
                <span
                  className={`whitespace-nowrap text-xs font-semibold sm:text-sm ${
                    isActive
                      ? "text-foreground font-bold"
                      : isCompleted
                      ? "text-foreground font-semibold"
                      : "text-muted-foreground"
                  }`}
                >
                  {label}
                </span>
              </div>
              {index < steps.length - 1 && (
                <span
                  className={`mt-4 h-[2px] flex-1 ${
                    stepNum < active ? "bg-[#087b4b]" : "bg-border"
                  }`}
                />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

function FeatureStrip() {
  const features = [
    {
      Icon: Clock,
      title: "Quick Response",
      desc: "We act fast on critical issues",
    },
    {
      Icon: Users,
      title: "Real Impact",
      desc: "Your report makes a difference",
    },
    {
      Icon: TrendingUp,
      title: "Track Progress",
      desc: "Stay updated in real time",
    },
    {
      Icon: Lock,
      title: "Safe & Secure",
      desc: "Your data is always protected",
    },
  ]

  return (
    <div className="mt-8 rounded-2xl border bg-white p-6 shadow-[0_2px_12px_rgba(16,33,58,0.03)]">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-border">
        {features.map(({ Icon, title, desc }, index) => (
          <div key={title} className={`flex items-center gap-4 ${index > 0 ? "lg:pl-6" : ""}`}>
            <div className="grid size-12 shrink-0 place-items-center rounded-full bg-[#eefaf3] text-[#087b4b]">
              <Icon className="size-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#126f47]">{title}</h4>
              <p className="mt-0.5 text-xs text-muted-foreground">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function GuidancePanel() {
  return (
    <div className="flex flex-col gap-4">
      <section className="rounded-2xl border bg-[#f3fbf6] p-5">
        <h2 className="text-base font-bold">Selected for you</h2>
        <div className="mt-4 flex items-center gap-4">
          <span className="grid size-16 shrink-0 place-items-center rounded-full bg-[#e5f6e9] text-[#58ae47]">
            <Route className="size-8" />
          </span>
          <div>
            <h3 className="font-bold">Roads & Footpaths</h3>
            <p className="mt-1 text-sm leading-5 text-muted-foreground">Potholes, cracks, damaged roads, footpaths</p>
            <span className="mt-2 inline-flex rounded-full border border-[#b7e3cb] px-2 py-0.5 text-xs font-medium text-primary">
              Best match
            </span>
          </div>
        </div>
      </section>
      <section className="rounded-2xl border bg-card p-5">
        <h2 className="text-base font-bold">Reporting to</h2>
        <div className="mt-4 flex items-center gap-4">
          <span className="grid size-14 shrink-0 place-items-center rounded-full bg-secondary text-primary">
            <Home className="size-7" />
          </span>
          <div>
            <h3 className="font-bold">Public Works Department</h3>
            <p className="mt-1 text-sm leading-5 text-muted-foreground">This issue will be sent to the appropriate department.</p>
            <button className="mt-2 text-sm font-medium text-primary hover:underline">Learn more</button>
          </div>
        </div>
      </section>
      <section className="rounded-2xl border bg-card p-5">
        <h2 className="text-base font-bold text-[#126f47]">How to submit a good report</h2>
        <ul className="mt-3 flex flex-col gap-2 text-sm text-muted-foreground">
          {["Take a clear photo of the issue", "Add accurate location", "Provide a short description", "This helps us resolve it faster!"].map(
            (item) => (
              <li className="flex items-center gap-2" key={item}>
                <span className="grid size-5 place-items-center rounded-full bg-secondary text-primary">✓</span>
                {item}
              </li>
            )
          )}
        </ul>
      </section>
    </div>
  )
}

function Step2GuidancePanel() {
  const tips = [
    {
      Icon: Camera,
      title: "Take clear photos",
      desc: "Capture the issue clearly from different angles.",
    },
    {
      Icon: MapPin,
      title: "Be accurate with location",
      desc: "Accurate location helps us reach the right place.",
    },
    {
      Icon: FileText,
      title: "Describe in short",
      desc: "A short and clear description speeds up the resolution.",
    },
    {
      Icon: Shield,
      title: "Your safety matters",
      desc: "Do not take risks while reporting an issue.",
    },
  ]

  return (
    <div className="flex flex-col gap-6">
      <section className="rounded-2xl border bg-white p-6 shadow-[0_2px_12px_rgba(16,33,58,0.03)]">
        <div className="flex items-center gap-2.5">
          <div className="grid size-7 place-items-center rounded-full bg-[#fef3c7] text-[#d97706]">
            <Lightbulb className="size-4 fill-[#fef3c7]" />
          </div>
          <h3 className="text-base font-bold text-foreground">Tips for a great report</h3>
        </div>

        <div className="mt-6 space-y-5">
          {tips.map(({ Icon, title, desc }) => (
            <div key={title} className="flex items-start gap-4">
              <div className="grid size-11 shrink-0 place-items-center rounded-full bg-[#eefaf3] text-[#087b4b]">
                <Icon className="size-5" />
              </div>
              <div className="min-w-0">
                <h4 className="text-sm font-bold text-foreground">{title}</h4>
                <p className="mt-0.5 text-xs text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Civic Reporting Graphic Illustration */}
        <div className="relative mt-8 overflow-hidden rounded-2xl bg-gradient-to-b from-[#f2faf5] to-[#e4f5eb] p-5 text-center">
          <div className="relative z-10 mx-auto flex max-w-[180px] items-center justify-center pt-2">
            <div className="relative w-36 rounded-xl border border-[#b8e4c9] bg-white p-4 shadow-md">
              <div className="mx-auto mb-2.5 h-3 w-12 rounded-md bg-[#72bd55]" />
              <div className="space-y-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="grid size-4 place-items-center rounded-full bg-[#087b4b] text-[10px] font-bold text-white">
                      ✓
                    </span>
                    <div className="h-1.5 flex-1 rounded-full bg-[#e4e9e8]" />
                  </div>
                ))}
              </div>
              <div className="absolute -bottom-3 -right-3 grid size-10 place-items-center rounded-full bg-[#087b4b] text-white shadow-lg ring-4 ring-white">
                <Shield className="size-5 fill-current" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function Step3GuidancePanel() {
  const tips = [
    {
      Icon: Target,
      title: "Faster resolution",
      desc: "Accurate location helps the right team reach the issue quickly.",
    },
    {
      Icon: MapPin,
      title: "Better for everyone",
      desc: "Precise locations reduce delays and improve your neighborhood.",
    },
    {
      Icon: ShieldCheck,
      title: "Your privacy is safe",
      desc: "We only use your location to resolve issues and never share it publicly.",
    },
  ]

  return (
    <div className="flex flex-col gap-6">
      <section className="rounded-2xl border bg-white p-6 shadow-[0_2px_12px_rgba(16,33,58,0.03)]">
        <h3 className="text-base font-bold text-[#126f47]">Why accurate location matters</h3>

        <div className="mt-6 space-y-6">
          {tips.map(({ Icon, title, desc }) => (
            <div key={title} className="flex items-start gap-4">
              <div className="grid size-12 shrink-0 place-items-center rounded-full bg-[#eefaf3] text-[#087b4b]">
                <Icon className="size-6" />
              </div>
              <div className="min-w-0">
                <h4 className="text-sm font-bold text-foreground">{title}</h4>
                <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* 3D Map Graphic Illustration */}
        <div className="relative mt-8 overflow-hidden rounded-2xl bg-gradient-to-b from-[#e8f6ee] to-[#d3ece0] p-6 text-center">
          <div className="relative z-10 mx-auto flex h-36 w-full items-center justify-center">
            <div className="relative h-28 w-48 rounded-2xl border-2 border-white/80 bg-[#d9f2e2] p-2 shadow-lg transition-transform hover:scale-105" style={{ transform: "rotateX(25deg) rotateZ(-5deg)" }}>
              <div className="absolute inset-0 opacity-40 bg-[linear-gradient(to_right,#087b4b_2px,transparent_2px),linear-gradient(to_bottom,#087b4b_2px,transparent_2px)] bg-[size:24px_24px]" />
              <div className="absolute left-3 top-3 size-4 rounded-full bg-[#38a169]" />
              <div className="absolute left-8 top-5 size-3 rounded-full bg-[#48bb78]" />
              <div className="absolute right-4 bottom-3 size-5 rounded-full bg-[#2f855a]" />
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                <div className="grid size-10 place-items-center rounded-full bg-[#087b4b] text-white shadow-xl ring-4 ring-white">
                  <MapPin className="size-6 fill-current" />
                </div>
                <div className="mt-1 h-1.5 w-6 rounded-full bg-black/20 blur-[2px]" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function Step4GuidancePanel() {
  const tips = [
    {
      Icon: Camera,
      title: "Clear photos help",
      desc: "the team understand the issue better.",
    },
    {
      Icon: MapPin,
      title: "Accurate location ensures",
      desc: "faster resolution.",
    },
    {
      Icon: FileText,
      title: "Detailed description helps",
      desc: "resolve the issue quickly.",
    },
    {
      Icon: ShieldCheck,
      title: "Your report is important",
      desc: "and helps improve our city.",
    },
  ]

  return (
    <div className="flex flex-col gap-6">
      <section className="rounded-2xl border bg-white p-6 shadow-[0_2px_12px_rgba(16,33,58,0.03)]">
        <div className="flex items-center gap-2">
          <div className="grid size-7 place-items-center rounded-full bg-[#fef3c7] text-[#d97706]">
            <Lightbulb className="size-4 fill-[#fef3c7]" />
          </div>
          <h3 className="text-base font-bold text-[#126f47]">Tips for a successful report</h3>
        </div>

        <div className="mt-6 space-y-5">
          {tips.map(({ Icon, title, desc }) => (
            <div key={title} className="flex items-start gap-4">
              <div className="grid size-11 shrink-0 place-items-center rounded-full bg-[#eefaf3] text-[#087b4b]">
                <Icon className="size-5" />
              </div>
              <div className="min-w-0">
                <h4 className="text-sm font-bold text-foreground">{title}</h4>
                <p className="mt-0.5 text-xs text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Civic Reporting Graphic Illustration */}
        <div className="relative mt-8 overflow-hidden rounded-2xl bg-gradient-to-b from-[#f2faf5] to-[#e4f5eb] p-5 text-center">
          <div className="relative z-10 mx-auto flex max-w-[180px] items-center justify-center pt-2">
            <div className="relative w-36 rounded-xl border border-[#b8e4c9] bg-white p-4 shadow-md">
              <div className="mx-auto mb-2.5 h-3 w-12 rounded-md bg-[#72bd55]" />
              <div className="space-y-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="grid size-4 place-items-center rounded-full bg-[#087b4b] text-[10px] font-bold text-white">
                      ✓
                    </span>
                    <div className="h-1.5 flex-1 rounded-full bg-[#e4e9e8]" />
                  </div>
                ))}
              </div>
              <div className="absolute -bottom-3 -right-3 grid size-10 place-items-center rounded-full bg-[#087b4b] text-white shadow-lg ring-4 ring-white">
                <Shield className="size-5 fill-current" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function IssueTypePage({
  selected,
  setSelected,
  onContinue,
  onBack,
}: {
  selected: string
  setSelected: (id: string) => void
  onContinue: () => void
  onBack: () => void
}) {
  const [mobileOpen, setMobileOpen] = useState(false)
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      {mobileOpen && (
        <button
          aria-label="Close navigation"
          className="fixed inset-0 z-10 bg-foreground/20 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}
      <main className="min-w-0 flex-1">
        <div className="mx-auto max-w-[1240px] p-5 sm:p-8 lg:p-10">
          <header className="flex items-start gap-2 sm:gap-4">
            <button className="mt-1 rounded-lg p-2 hover:bg-muted lg:hidden" onClick={() => setMobileOpen(true)} aria-label="Open menu">
              <Menu />
            </button>
            <button onClick={onBack} className="mt-1 flex items-center gap-2 rounded-lg p-2 text-sm font-medium hover:bg-muted">
              <ArrowLeft className="size-5" />
              Back
            </button>
            <div>
              <h1 className="text-[28px] font-bold tracking-tight sm:text-4xl">Submit an Issue</h1>
              <p className="mt-2 text-base text-muted-foreground sm:text-lg">Help us resolve issues faster in your neighborhood.</p>
            </div>
          </header>
          <div className="mt-8">
            <Progress active={1} />
          </div>
          <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
            <section className="rounded-2xl border bg-card p-5 shadow-[0_2px_12px_rgba(16,33,58,0.03)] sm:p-6">
              <h2 className="text-xl font-bold">1. Choose the issue type</h2>
              <p className="mt-2 text-sm text-muted-foreground">Select the category that best describes the issue you want to report.</p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {categories.map(({ id, title, text, icon: Icon, tone }) => {
                  const isSelected = selected === id
                  return (
                    <button
                      type="button"
                      aria-pressed={isSelected}
                      onClick={() => setSelected(id)}
                      key={id}
                      className={`relative flex min-h-[112px] items-start gap-3 rounded-2xl border p-4 text-left transition hover:-translate-y-0.5 hover:border-[#acd9bf] ${
                        isSelected ? "border-primary bg-[#f3fbf6] ring-1 ring-primary" : "bg-card"
                      }`}
                    >
                      <span className={`grid size-12 shrink-0 place-items-center rounded-2xl ${toneStyles[tone]}`}>
                        <Icon className="size-6" />
                      </span>
                      <span>
                        <strong className="block text-[15px] leading-6">{title}</strong>
                        <span className="mt-1 block text-sm leading-5 text-muted-foreground">{text}</span>
                      </span>
                      <span
                        className={`absolute right-3 top-3 grid size-5 place-items-center rounded-full border text-xs ${
                          isSelected ? "border-primary bg-primary text-white" : "border-border text-transparent"
                        }`}
                      >
                        ✓
                      </span>
                    </button>
                  )
                })}
              </div>
              <div className="mt-6 flex items-center justify-between gap-4 rounded-xl bg-[#f3fbf6] p-4">
                <div>
                  <h3 className="font-semibold text-[#126f47]">Can&apos;t find the right category?</h3>
                  <p className="mt-1 text-sm text-muted-foreground">Select &quot;Other Issue&quot; and describe it in detail.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelected("other")}
                  className="shrink-0 rounded-lg border border-[#acd9bf] bg-card px-4 py-2 text-sm font-semibold text-primary hover:bg-secondary"
                >
                  Other Issue
                </button>
              </div>
              <button
                type="button"
                onClick={onContinue}
                className="mt-6 flex w-full items-center justify-center gap-3 rounded-xl bg-primary py-3.5 font-bold text-primary-foreground hover:bg-[#066b41]"
              >
                Continue <ArrowRight className="size-5" />
              </button>
            </section>
            <GuidancePanel />
          </div>
          <FeatureStrip />
        </div>
      </main>
    </div>
  )
}

function AddDetailsPage({
  description,
  setDescription,
  severity,
  setSeverity,
  onContinue,
  onBack,
}: {
  description: string
  setDescription: (val: string) => void
  severity: string
  setSeverity: (val: string) => void
  onContinue: () => void
  onBack: () => void
}) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mode, setMode] = useState<"type" | "voice">("type")

  const severities = [
    {
      id: "low",
      label: "Low",
      dotBg: "bg-[#48bb78]",
      selectedClasses: "border-[#48bb78] bg-[#f0fff4] text-[#22543d] font-bold",
    },
    {
      id: "medium",
      label: "Medium",
      dotBg: "bg-[#ecc94b]",
      selectedClasses: "border-[#ecc94b] bg-[#fffaf0] text-[#744210] font-bold",
    },
    {
      id: "high",
      label: "High",
      dotBg: "bg-[#e53e3e]",
      selectedClasses: "border-[#f56565] bg-[#fff5f5] text-[#c53030] font-bold ring-1 ring-[#f56565]",
    },
    {
      id: "critical",
      label: "Critical",
      dotBg: "bg-[#9b2c2c]",
      selectedClasses: "border-[#9b2c2c] bg-[#fff5f5] text-[#742a2a] font-bold",
    },
  ]

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      {mobileOpen && (
        <button
          aria-label="Close navigation"
          className="fixed inset-0 z-10 bg-foreground/20 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}
      <main className="min-w-0 flex-1">
        <div className="mx-auto max-w-[1240px] p-5 sm:p-8 lg:p-10">
          {/* Header */}
          <div className="relative flex flex-col items-center justify-center text-center">
            <button
              onClick={onBack}
              className="absolute left-0 top-0 flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold text-foreground hover:bg-muted"
            >
              <ArrowLeft className="size-4" />
              Back
            </button>
            <div className="flex items-center gap-2">
              <div className="grid size-8 place-items-center rounded-xl bg-[#087b4b] text-white">
                <Shield className="size-5 fill-current" />
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">Submit an Issue</h1>
            </div>
            <p className="mt-1 text-sm text-muted-foreground sm:text-base">
              Help us resolve issues faster in your neighborhood.
            </p>
          </div>

          {/* Stepper */}
          <div className="mt-8">
            <Progress active={2} />
          </div>

          {/* Main 2-Column Grid Layout */}
          <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
            {/* Left Form Panel */}
            <section className="flex flex-col justify-between rounded-2xl border bg-card p-6 shadow-[0_2px_12px_rgba(16,33,58,0.03)] sm:p-7">
              <div>
                <h2 className="text-xl font-bold tracking-tight text-foreground">2. Add details about the issue</h2>
                <p className="mt-1 text-sm text-muted-foreground">Tell us more so we can understand and resolve it better.</p>

                {/* Description Section */}
                <div className="mt-6">
                  <label className="block text-sm font-semibold text-foreground">Description</label>

                  {/* Mode Buttons */}
                  <div className="mt-3 flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setMode("type")}
                      className={`flex items-center gap-2 rounded-xl px-5 py-2 text-sm font-semibold transition-all ${
                        mode === "type"
                          ? "border border-[#acd9bf] bg-[#eefaf3] text-[#087b4b]"
                          : "border border-border bg-white text-muted-foreground hover:bg-muted"
                      }`}
                    >
                      <Pencil className="size-4" />
                      Type
                    </button>
                    <button
                      type="button"
                      onClick={() => setMode("voice")}
                      className={`flex items-center gap-2 rounded-xl px-5 py-2 text-sm font-semibold transition-all ${
                        mode === "voice"
                          ? "border border-[#acd9bf] bg-[#eefaf3] text-[#087b4b]"
                          : "border border-border bg-white text-muted-foreground hover:bg-muted"
                      }`}
                    >
                      <Mic className="size-4" />
                      Voice
                    </button>
                  </div>

                  {/* Textarea or Voice Mode */}
                  {mode === "type" ? (
                    <div className="relative mt-4">
                      <textarea
                        value={description}
                        maxLength={500}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Describe the issue in a few words..."
                        className="min-h-[140px] w-full rounded-2xl border border-border bg-white p-4 text-sm font-normal text-foreground placeholder:text-muted-foreground/60 focus:border-[#087b4b] focus:outline-none focus:ring-1 focus:ring-[#087b4b] resize-none"
                      />
                      <div className="mt-1 text-right text-xs font-medium text-muted-foreground">
                        {description.length} / 500
                      </div>
                    </div>
                  ) : (
                    <div className="mt-4 flex min-h-[160px] flex-col items-center justify-center rounded-2xl border border-dashed border-[#acd9bf] bg-[#eefaf3]/60 p-6 text-center">
                      <div className="grid size-14 place-items-center rounded-full bg-[#d9f2e2] text-[#087b4b]">
                        <Mic className="size-7" />
                      </div>
                      <p className="mt-3 font-bold text-foreground">Record a voice description</p>
                      <p className="mt-1 text-xs text-muted-foreground">Click below to record details using your microphone</p>
                      <button
                        type="button"
                        className="mt-4 flex items-center gap-2 rounded-xl bg-[#087b4b] px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-[#066b41]"
                      >
                        <Mic className="size-4" /> Start Recording
                      </button>
                    </div>
                  )}
                </div>

                {/* Severity Section */}
                <div className="mt-6">
                  <label className="block text-sm font-bold text-foreground">How severe is this issue?</label>

                  <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {severities.map((sev) => {
                      const isSelected = severity === sev.id
                      return (
                        <button
                          key={sev.id}
                          type="button"
                          onClick={() => setSeverity(sev.id)}
                          className={`flex items-center justify-center gap-2.5 rounded-xl border py-3.5 px-3 text-sm font-semibold transition-all ${
                            isSelected
                              ? sev.selectedClasses
                              : "border-border bg-white text-foreground hover:border-gray-300 hover:bg-muted/50"
                          }`}
                        >
                          <span
                            className={`grid size-3.5 place-items-center rounded-full ${sev.dotBg} ${
                              isSelected ? "text-white" : ""
                            }`}
                          >
                            {isSelected && <Check className="size-2.5 stroke-[3]" />}
                          </span>
                          <span>{sev.label}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Informational Strip */}
                <div className="mt-6 flex items-center gap-3 rounded-xl border border-[#b7e3cb]/60 bg-[#eefaf3] px-4 py-3.5 text-sm text-[#126f47]">
                  <div className="grid size-6 shrink-0 place-items-center rounded-full bg-[#d9f2e2] text-[#087b4b]">
                    <ShieldCheck className="size-4" />
                  </div>
                  <span className="font-medium">Issues marked as High or Critical are prioritized for faster action.</span>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="mt-8 flex items-center justify-between gap-4 border-t border-border pt-6">
                <button
                  type="button"
                  onClick={onBack}
                  className="flex items-center justify-center rounded-xl border border-border bg-white px-8 py-3.5 font-bold text-foreground hover:bg-muted"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={onContinue}
                  className="flex items-center justify-center gap-2 rounded-xl bg-[#087b4b] px-9 py-3.5 font-bold text-white shadow-sm hover:bg-[#066b41]"
                >
                  Continue <ArrowRight className="size-5" />
                </button>
              </div>
            </section>

            {/* Right Guidance Panel */}
            <Step2GuidancePanel />
          </div>

          {/* Bottom Feature Strip */}
          <FeatureStrip />
        </div>
      </main>
    </div>
  )
}

function LocationPage({
  location,
  setLocation,
  onContinue,
  onBack,
}: {
  location: {
    latitude: number | null
    longitude: number | null
    accuracy: number | null
    address: string
    source: "browser" | "map" | "user" | null
  }
  setLocation: React.Dispatch<
    React.SetStateAction<{
      latitude: number | null
      longitude: number | null
      accuracy: number | null
      address: string
      source: "browser" | "map" | "user" | null
    }>
  >
  onContinue: () => void
  onBack: () => void
}) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [method, setMethod] = useState<"current" | "map" | "address">("current")
  const [addressInput, setAddressInput] = useState(location.address)
  const [markerPos, setMarkerPos] = useState({ x: 52, y: 48 })

  // Geolocation Handler
  const handleUseCurrentLocation = () => {
    setMethod("current")
    if (typeof window !== "undefined" && "geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLocation((prev) => ({
            ...prev,
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
            accuracy: pos.coords.accuracy || 15,
            source: "browser",
          }))
        },
        () => {
          setLocation((prev) => ({
            ...prev,
            latitude: 37.7749,
            longitude: -122.4194,
            accuracy: 15,
            source: "browser",
          }))
        },
        { enableHighAccuracy: true }
      )
    }
  }

  // Interactive Map Click Handler
  const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setMarkerPos({ x, y })
    setLocation((prev) => ({
      ...prev,
      latitude: 37.7749 + (50 - y) * 0.001,
      longitude: -122.4194 + (x - 50) * 0.001,
      source: "map",
    }))
  }

  // Address Save Handler
  const handleSaveAddress = () => {
    setLocation((prev) => ({
      ...prev,
      address: addressInput,
      source: "user",
    }))
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      {mobileOpen && (
        <button
          aria-label="Close navigation"
          className="fixed inset-0 z-10 bg-foreground/20 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}
      <main className="min-w-0 flex-1">
        <div className="mx-auto max-w-[1240px] p-5 sm:p-8 lg:p-10">
          {/* Header */}
          <div className="relative flex flex-col items-center justify-center text-center">
            <button
              onClick={onBack}
              className="absolute left-0 top-0 flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold text-foreground hover:bg-muted"
            >
              <ArrowLeft className="size-4" />
              Back
            </button>
            <div className="flex items-center gap-2">
              <div className="grid size-8 place-items-center rounded-xl bg-[#087b4b] text-white">
                <Shield className="size-5 fill-current" />
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">Submit an Issue</h1>
            </div>
            <p className="mt-1 text-sm text-muted-foreground sm:text-base">
              Help us resolve issues faster in your neighborhood.
            </p>
          </div>

          {/* Stepper */}
          <div className="mt-8">
            <Progress active={3} />
          </div>

          {/* Main 2-Column Grid Layout */}
          <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
            {/* Left Form Panel */}
            <section className="flex flex-col justify-between rounded-2xl border bg-card p-6 shadow-[0_2px_12px_rgba(16,33,58,0.03)] sm:p-7">
              <div>
                <h2 className="text-xl font-bold tracking-tight text-foreground">3. Where is the issue located?</h2>
                <p className="mt-1 text-sm text-muted-foreground">Provide the exact location so the team can find it easily.</p>

                {/* Location Action Methods */}
                <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
                  <button
                    type="button"
                    onClick={handleUseCurrentLocation}
                    className={`flex items-center justify-center gap-2 rounded-xl py-3 px-4 text-xs font-bold transition-all sm:text-sm ${
                      method === "current"
                        ? "border border-[#acd9bf] bg-[#eefaf3] text-[#087b4b] shadow-sm"
                        : "border border-border bg-white text-foreground hover:bg-muted"
                    }`}
                  >
                    <LocateFixed className="size-4 text-[#087b4b]" />
                    Use Current Location
                  </button>

                  <button
                    type="button"
                    onClick={() => setMethod("map")}
                    className={`flex items-center justify-center gap-2 rounded-xl py-3 px-4 text-xs font-bold transition-all sm:text-sm ${
                      method === "map"
                        ? "border border-[#acd9bf] bg-[#eefaf3] text-[#087b4b] shadow-sm"
                        : "border border-border bg-white text-foreground hover:bg-muted"
                    }`}
                  >
                    <Map className="size-4 text-foreground" />
                    Pick on Map
                  </button>

                  <button
                    type="button"
                    onClick={() => setMethod("address")}
                    className={`flex items-center justify-center gap-2 rounded-xl py-3 px-4 text-xs font-bold transition-all sm:text-sm ${
                      method === "address"
                        ? "border border-[#acd9bf] bg-[#eefaf3] text-[#087b4b] shadow-sm"
                        : "border border-border bg-white text-foreground hover:bg-muted"
                    }`}
                  >
                    <Pencil className="size-4 text-foreground" />
                    Enter Address
                  </button>
                </div>

                {/* Conditional Enter Address UI */}
                {method === "address" && (
                  <div className="mt-4 rounded-2xl border border-border bg-[#f8faf9] p-4">
                    <label className="block text-xs font-bold text-foreground">Enter address or landmark</label>
                    <div className="mt-2 flex gap-2">
                      <input
                        type="text"
                        value={addressInput}
                        onChange={(e) => setAddressInput(e.target.value)}
                        placeholder="Enter the location or nearest landmark"
                        className="flex-1 rounded-xl border border-border bg-white px-3.5 py-2 text-sm text-foreground focus:border-[#087b4b] focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={handleSaveAddress}
                        className="rounded-xl bg-[#087b4b] px-4 py-2 text-xs font-bold text-white hover:bg-[#066b41]"
                      >
                        Use this location
                      </button>
                    </div>
                  </div>
                )}

                {/* Location Card Summary */}
                <div className="mt-6 rounded-2xl border border-border bg-card p-4 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#087b4b]">
                      <span className="size-2 rounded-full bg-[#087b4b]" />
                      Location detected
                    </div>
                    <button
                      type="button"
                      onClick={() => setMethod("address")}
                      className="text-xs font-bold text-[#087b4b] hover:underline"
                    >
                      Change
                    </button>
                  </div>

                  <div className="mt-3 flex items-start gap-3.5">
                    <div className="grid size-11 shrink-0 place-items-center rounded-2xl bg-[#eefaf3] text-[#087b4b]">
                      <MapPin className="size-6 fill-current" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-foreground">
                        {location.address.split("\n")[0] || "400 Block, Main St."}
                      </h4>
                      <p className="mt-0.5 text-xs font-medium text-muted-foreground">
                        {location.address.split("\n")[1] || "Springfield, ST 12345"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Interactive Visual Map Area */}
                <div
                  onClick={handleMapClick}
                  className="relative mt-4 h-[240px] cursor-crosshair overflow-hidden rounded-2xl border border-border bg-[#e5f2eb]"
                >
                  <div
                    className="absolute inset-0 opacity-70"
                    style={{
                      backgroundImage: `
                        linear-gradient(45deg, transparent 46%, #ffffff 47%, #ffffff 51%, transparent 52%),
                        linear-gradient(-35deg, transparent 44%, #ffffff 45%, #ffffff 49%, transparent 50%),
                        linear-gradient(80deg, transparent 47%, #d0e7da 48%, #d0e7da 52%, transparent 53%)
                      `,
                      backgroundSize: "180px 140px, 200px 160px, 240px 180px",
                    }}
                  />

                  <span className="absolute left-16 top-6 -rotate-12 text-[11px] font-bold text-gray-500/70">Main St.</span>
                  <span className="absolute left-28 top-20 rotate-45 text-[10px] font-semibold text-gray-400/70">1st St.</span>
                  <span className="absolute right-20 top-12 rotate-12 text-[10px] font-semibold text-gray-400/70">2nd St.</span>
                  <span className="absolute right-28 bottom-10 -rotate-12 text-[10px] font-semibold text-gray-400/70">Oak St.</span>

                  <div
                    className="absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-300 pointer-events-none"
                    style={{ left: `${markerPos.x}%`, top: `${markerPos.y}%` }}
                  >
                    <div className="absolute left-1/2 top-1/2 size-24 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#087b4b]/40 bg-[#087b4b]/15 animate-pulse" />
                    <div className="relative grid size-12 place-items-center rounded-full bg-[#087b4b] text-white shadow-xl ring-4 ring-white">
                      <MapPin className="size-7 fill-current" />
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      setMethod("map")
                    }}
                    className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-xl border border-border bg-white px-3.5 py-2 text-xs font-bold text-foreground shadow-sm hover:bg-muted"
                  >
                    <LocateFixed className="size-3.5 text-[#087b4b]" />
                    Adjust on Map
                  </button>
                </div>

                {/* Accuracy Information Strip */}
                <div className="mt-4 flex items-center gap-2.5 rounded-xl border border-[#b7e3cb]/60 bg-[#eefaf3] px-4 py-3 text-xs text-[#126f47]">
                  <MapPin className="size-4 shrink-0 text-[#087b4b]" />
                  <span className="font-medium">Using your current location with high accuracy.</span>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="mt-8 flex items-center justify-between gap-4 border-t border-border pt-6">
                <button
                  type="button"
                  onClick={onBack}
                  className="flex items-center justify-center rounded-xl border border-border bg-white px-8 py-3.5 font-bold text-foreground hover:bg-muted"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={onContinue}
                  className="flex items-center justify-center gap-2 rounded-xl bg-[#087b4b] px-9 py-3.5 font-bold text-white shadow-sm hover:bg-[#066b41]"
                >
                  Continue <ArrowRight className="size-5" />
                </button>
              </div>
            </section>

            {/* Right Information Panel */}
            <Step3GuidancePanel />
          </div>

          {/* Bottom Feature Strip */}
          <FeatureStrip />
        </div>
      </main>
    </div>
  )
}

function ReviewPage({
  issueType,
  description,
  severity,
  location,
  onNavigateStep,
  onContinue,
  onBack,
}: {
  issueType: string
  description: string
  severity: string
  location: { address: string }
  onNavigateStep: (step: 1 | 2 | 3) => void
  onContinue: () => void
  onBack: () => void
}) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [confirmed, setConfirmed] = useState(true)

  const selectedCategory = categories.find((c) => c.id === issueType) || categories[0]
  const departmentName = departmentMap[issueType] || "Public Works Department"

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      {mobileOpen && (
        <button
          aria-label="Close navigation"
          className="fixed inset-0 z-10 bg-foreground/20 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}
      <main className="min-w-0 flex-1">
        <div className="mx-auto max-w-[1240px] p-5 sm:p-8 lg:p-10">
          {/* Header */}
          <div className="relative flex flex-col items-center justify-center text-center">
            <button
              onClick={onBack}
              className="absolute left-0 top-0 flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold text-foreground hover:bg-muted"
            >
              <ArrowLeft className="size-4" />
              Back
            </button>
            <div className="flex items-center gap-2">
              <div className="grid size-8 place-items-center rounded-xl bg-[#087b4b] text-white">
                <Shield className="size-5 fill-current" />
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">Submit an Issue</h1>
            </div>
            <p className="mt-1 text-sm text-muted-foreground sm:text-base">
              Please review the details before submitting.
            </p>
          </div>

          {/* Stepper */}
          <div className="mt-8">
            <Progress active={4} />
          </div>

          {/* Main 2-Column Grid Layout */}
          <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
            {/* Left Review Surface Panel */}
            <section className="flex flex-col justify-between rounded-2xl border bg-card p-6 shadow-[0_2px_12px_rgba(16,33,58,0.03)] sm:p-7">
              <div>
                <h2 className="text-xl font-bold tracking-tight text-foreground">4. Review your report</h2>
                <p className="mt-1 text-sm text-muted-foreground">Please review the details below before submitting.</p>

                {/* Single Grouped Review Surface (6 Rows) */}
                <div className="mt-6 rounded-2xl border border-border bg-white p-2 sm:p-4">
                  <div className="divide-y divide-border">
                    {/* ROW 1: Issue Type */}
                    <div className="flex items-start justify-between gap-4 py-4 px-2">
                      <div className="flex items-start gap-4">
                        <div className="grid size-11 shrink-0 place-items-center rounded-2xl bg-[#eefaf3] text-[#087b4b]">
                          <Route className="size-6" />
                        </div>
                        <div>
                          <span className="block text-xs font-bold text-foreground">Issue Type</span>
                          <h4 className="mt-0.5 text-sm font-bold text-foreground">{selectedCategory.title}</h4>
                          <p className="text-xs text-muted-foreground">{selectedCategory.text}</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => onNavigateStep(1)}
                        className="text-xs font-bold text-[#087b4b] hover:underline"
                      >
                        Edit
                      </button>
                    </div>

                    {/* ROW 2: Description */}
                    <div className="flex items-start justify-between gap-4 py-4 px-2">
                      <div className="flex items-start gap-4">
                        <div className="grid size-11 shrink-0 place-items-center rounded-2xl bg-[#eefaf3] text-[#087b4b]">
                          <MessageSquare className="size-6" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <span className="block text-xs font-bold text-foreground">Description</span>
                          <p className="mt-1 text-xs sm:text-sm text-foreground leading-relaxed">
                            {description || "No description provided."}
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => onNavigateStep(2)}
                        className="text-xs font-bold text-[#087b4b] hover:underline"
                      >
                        Edit
                      </button>
                    </div>

                    {/* ROW 3: Severity */}
                    <div className="flex items-start justify-between gap-4 py-4 px-2">
                      <div className="flex items-start gap-4">
                        <div className="grid size-11 shrink-0 place-items-center rounded-2xl bg-[#fff5f5] text-[#e53e3e]">
                          <AlertTriangle className="size-6" />
                        </div>
                        <div>
                          <span className="block text-xs font-bold text-foreground">Severity</span>
                          <span className="mt-1 inline-block text-sm font-bold text-[#e53e3e] capitalize">
                            {severity}
                          </span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => onNavigateStep(2)}
                        className="text-xs font-bold text-[#087b4b] hover:underline"
                      >
                        Edit
                      </button>
                    </div>

                    {/* ROW 4: Location */}
                    <div className="flex items-start justify-between gap-4 py-4 px-2">
                      <div className="flex items-start gap-4">
                        <div className="grid size-11 shrink-0 place-items-center rounded-2xl bg-[#eefaf3] text-[#087b4b]">
                          <MapPin className="size-6 fill-current" />
                        </div>
                        <div>
                          <span className="block text-xs font-bold text-foreground">Location</span>
                          <h4 className="mt-0.5 text-sm font-bold text-foreground">
                            {location.address.split("\n")[0] || "400 Block, Main St."}
                          </h4>
                          <p className="text-xs text-muted-foreground">
                            {location.address.split("\n")[1] || "Springfield, ST 12345"}
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => onNavigateStep(3)}
                        className="text-xs font-bold text-[#087b4b] hover:underline"
                      >
                        Edit
                      </button>
                    </div>

                    {/* ROW 5: Photo / Video */}
                    <div className="flex items-start justify-between gap-4 py-4 px-2">
                      <div className="flex items-start gap-4">
                        <div className="grid size-11 shrink-0 place-items-center rounded-2xl bg-[#eefaf3] text-[#087b4b]">
                          <ImageIcon className="size-6" />
                        </div>
                        <div>
                          <span className="block text-xs font-bold text-foreground">Photo / Video</span>
                          <p className="mt-0.5 text-xs font-medium text-muted-foreground">2 files attached</p>
                          <div className="mt-2 flex gap-2">
                            <div className="size-12 overflow-hidden rounded-lg bg-gray-200 border border-border">
                              <div className="size-full bg-[linear-gradient(135deg,#728b6d_0%,#4b5749_100%)] flex items-center justify-center text-white/50 text-[10px]">
                                Photo 1
                              </div>
                            </div>
                            <div className="size-12 overflow-hidden rounded-lg bg-gray-200 border border-border">
                              <div className="size-full bg-[linear-gradient(135deg,#5e7067_0%,#3d4742_100%)] flex items-center justify-center text-white/50 text-[10px]">
                                Photo 2
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => onNavigateStep(2)}
                        className="text-xs font-bold text-[#087b4b] hover:underline"
                      >
                        Edit
                      </button>
                    </div>

                    {/* ROW 6: Assigned Department */}
                    <div className="flex items-start justify-between gap-4 py-4 px-2">
                      <div className="flex items-start gap-4">
                        <div className="grid size-11 shrink-0 place-items-center rounded-2xl bg-[#eefaf3] text-[#087b4b]">
                          <Landmark className="size-6" />
                        </div>
                        <div>
                          <span className="block text-xs font-bold text-foreground">Assigned Department</span>
                          <h4 className="mt-0.5 text-sm font-bold text-foreground">{departmentName}</h4>
                          <p className="text-xs font-semibold text-[#087b4b]">(Auto-assigned based on issue type)</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => onNavigateStep(1)}
                        className="text-xs font-bold text-[#087b4b] hover:underline"
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                </div>

                {/* Confirmation Checkbox */}
                <div className="mt-6 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setConfirmed(!confirmed)}
                    className={`grid size-5 place-items-center rounded-md border transition-all ${
                      confirmed ? "border-[#087b4b] bg-[#087b4b] text-white" : "border-border bg-white"
                    }`}
                  >
                    {confirmed && <Check className="size-3.5 stroke-[3]" />}
                  </button>
                  <label
                    onClick={() => setConfirmed(!confirmed)}
                    className="cursor-pointer text-xs sm:text-sm font-semibold text-foreground"
                  >
                    I confirm that the information provided is correct.
                  </label>
                </div>
              </div>

              {/* Bottom Action Buttons */}
              <div className="mt-8 flex items-center justify-between gap-4 border-t border-border pt-6">
                <button
                  type="button"
                  onClick={onBack}
                  className="flex items-center justify-center rounded-xl border border-border bg-white px-8 py-3.5 font-bold text-foreground hover:bg-muted"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={onContinue}
                  className="flex items-center justify-center gap-2 rounded-xl bg-[#087b4b] px-9 py-3.5 font-bold text-white shadow-sm hover:bg-[#066b41]"
                >
                  Continue to Submit <ArrowRight className="size-5" />
                </button>
              </div>
            </section>

            {/* Right Guidance Panel */}
            <Step4GuidancePanel />
          </div>

          {/* Bottom Feature Strip */}
          <FeatureStrip />
        </div>
      </main>
    </div>
  )
}

function SubmitPage({
  onReturnHome,
  issueType,
  description,
  severity,
  location,
}: {
  onReturnHome: () => void
  issueType: string
  description: string
  severity: string
  location: { address: string }
}) {
  const selectedCategory = categories.find((c) => c.id === issueType) || categories[0]
  const departmentName = departmentMap[issueType] || "Public Works Department"

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar mobileOpen={false} setMobileOpen={() => {}} />
      <main className="min-w-0 flex-1">
        <div className="mx-auto max-w-[1240px] p-5 sm:p-8 lg:p-10">
          <div className="relative flex flex-col items-center justify-center text-center">
            <div className="flex items-center gap-2">
              <div className="grid size-8 place-items-center rounded-xl bg-[#087b4b] text-white">
                <Shield className="size-5 fill-current" />
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">Submit an Issue</h1>
            </div>
            <p className="mt-1 text-sm text-muted-foreground sm:text-base">
              Your report has been submitted to local authorities.
            </p>
          </div>

          <div className="mt-8">
            <Progress active={5} />
          </div>

          <div className="mx-auto mt-8 max-w-2xl rounded-2xl border border-border bg-card p-8 text-center shadow-[0_2px_12px_rgba(16,33,58,0.03)] sm:p-10">
            <div className="mx-auto grid size-20 place-items-center rounded-full bg-[#d9f2e2] text-[#087b4b]">
              <ShieldCheck className="size-12" />
            </div>
            <h2 className="mt-5 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Report Submitted Successfully!
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Thank you for helping improve your city. Your issue reference ID is{" "}
              <strong className="text-[#087b4b]">#CV-2026-8942</strong>.
            </p>

            <div className="mt-6 rounded-2xl border border-[#acd9bf] bg-[#eefaf3] p-5 text-left text-sm text-[#126f47]">
              <h4 className="font-bold">Submission Summary:</h4>
              <ul className="mt-2 space-y-1.5 text-xs">
                <li>
                  <strong>Category:</strong> {selectedCategory.title}
                </li>
                <li>
                  <strong>Assigned To:</strong> {departmentName}
                </li>
                <li>
                  <strong>Severity:</strong> <span className="capitalize">{severity}</span>
                </li>
                <li>
                  <strong>Location:</strong> {location.address.split("\n")[0]}
                </li>
              </ul>
            </div>

            <button
              onClick={onReturnHome}
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-[#087b4b] px-8 py-3.5 font-bold text-white shadow-sm hover:bg-[#066b41]"
            >
              Return to Dashboard
            </button>
          </div>

          <FeatureStrip />
        </div>
      </main>
    </div>
  )
}

export default function HomePage() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [notice, setNotice] = useState(true)
  const [reportStep, setReportStep] = useState<0 | 1 | 2 | 3 | 4 | 5>(0)

  // Shared Report State
  const [issueType, setIssueType] = useState("roads")
  const [description, setDescription] = useState(
    "There is a large pothole on the road. It is deep and causing problems for vehicles. Please fix it as soon as possible."
  )
  const [severity, setSeverity] = useState("high")
  const [location, setLocation] = useState<{
    latitude: number | null
    longitude: number | null
    accuracy: number | null
    address: string
    source: "browser" | "map" | "user" | null
  }>({
    latitude: 37.7749,
    longitude: -122.4194,
    accuracy: 15,
    address: "400 Block, Main St.\nSpringfield, ST 12345",
    source: "browser",
  })

  if (reportStep === 1) {
    return (
      <IssueTypePage
        selected={issueType}
        setSelected={setIssueType}
        onContinue={() => setReportStep(2)}
        onBack={() => setReportStep(0)}
      />
    )
  }

  if (reportStep === 2) {
    return (
      <AddDetailsPage
        description={description}
        setDescription={setDescription}
        severity={severity}
        setSeverity={setSeverity}
        onContinue={() => setReportStep(3)}
        onBack={() => setReportStep(1)}
      />
    )
  }

  if (reportStep === 3) {
    return (
      <LocationPage
        location={location}
        setLocation={setLocation}
        onContinue={() => setReportStep(4)}
        onBack={() => setReportStep(2)}
      />
    )
  }

  if (reportStep === 4) {
    return (
      <ReviewPage
        issueType={issueType}
        description={description}
        severity={severity}
        location={location}
        onNavigateStep={(step) => setReportStep(step)}
        onContinue={() => setReportStep(5)}
        onBack={() => setReportStep(3)}
      />
    )
  }

  if (reportStep === 5) {
    return (
      <SubmitPage
        issueType={issueType}
        description={description}
        severity={severity}
        location={location}
        onReturnHome={() => setReportStep(0)}
      />
    )
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      {mobileOpen && (
        <button
          aria-label="Close navigation"
          className="fixed inset-0 z-10 bg-foreground/20 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}
      <main className="min-w-0 flex-1">
        <div className="mx-auto max-w-none p-5 sm:p-8 lg:p-10">
          <header className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <button
                className="mt-1 rounded-lg p-2 hover:bg-muted lg:hidden"
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
              >
                <Menu />
              </button>
              <div>
                <h1 className="text-[28px] font-bold tracking-tight sm:text-4xl">Good morning, Mohammed!</h1>
                <p className="mt-2 text-base text-muted-foreground sm:text-lg">
                  Let&apos;s make your neighborhood a better place together.
                </p>
              </div>
            </div>
            <button
              onClick={() => setReportStep(1)}
              className="flex shrink-0 items-center gap-2 rounded-2xl bg-[#087b4b] px-5 py-3.5 font-bold text-white shadow-sm hover:bg-[#066b41]"
            >
              <Plus className="size-5" /> <span className="hidden sm:inline">Report an Issue</span>
            </button>
          </header>
          <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
            <section>
              <h2 className="mb-5 text-xl font-bold">What would you like to report?</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {categories.map(({ id, title, text, icon: Icon, tone }) => (
                  <button
                    type="button"
                    onClick={() => {
                      setIssueType(id)
                      setReportStep(1)
                    }}
                    key={id}
                    className="flex min-h-[106px] items-start gap-3 rounded-2xl border bg-white p-4 text-left shadow-[0_2px_12px_rgba(16,33,58,0.02)] hover:-translate-y-0.5 hover:border-[#acd9bf]"
                  >
                    <span className={`grid size-14 shrink-0 place-items-center rounded-2xl ${toneStyles[tone]}`}>
                      <Icon className="size-7" />
                    </span>
                    <span>
                      <strong className="block text-[15px] leading-6">{title}</strong>
                      <span className="mt-1 block text-sm leading-5 text-muted-foreground">{text}</span>
                    </span>
                  </button>
                ))}
              </div>
              <button
                className="mt-8 flex w-full items-center gap-5 rounded-2xl bg-[#eefaf3] px-6 py-4 text-left hover:bg-[#e5f7ec]"
                onClick={() => {
                  setIssueType("roads")
                  setReportStep(1)
                }}
              >
                <LocateFixed className="size-6 text-[#087b4b]" />
                <strong className="text-[#126f47]">Use my current location</strong>
                <span className="ml-auto hidden text-sm text-muted-foreground sm:block">400 Block, Main St.</span>
              </button>
            </section>
            <RecentReports />
          </div>
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <NearbyMap />
            <Impact />
          </div>
          {notice && (
            <div className="mt-6 flex items-center gap-4 rounded-2xl bg-[#eaf8ef] p-5">
              <Bell className="size-7 shrink-0 text-[#2a9d63]" />
              <div className="min-w-0 flex-1">
                <strong className="block text-[#126f47]">Stay updated with your reports</strong>
                <p className="mt-1 text-sm text-muted-foreground">Enable notifications to get real-time updates on your reported issues.</p>
              </div>
              <button className="hidden rounded-lg bg-[#087b4b] px-7 py-3 text-sm font-bold text-white hover:bg-[#066b41] sm:block">
                Enable Notifications
              </button>
              <button
                aria-label="Dismiss notification"
                className="p-1 text-muted-foreground hover:text-foreground"
                onClick={() => setNotice(false)}
              >
                <X className="size-5" />
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
