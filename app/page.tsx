"use client"

import { useState } from "react"
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Bell,
  Building2,
  Calendar,
  Camera,
  Check,
  CheckCircle,
  ChevronDown,
  CircleHelp,
  Clock,
  Compass,
  Copy,
  Crosshair,
  Droplets,
  FileText,
  Globe2,
  Heart,
  Home,
  Image as ImageIcon,
  Landmark,
  Lightbulb,
  Link as LinkIcon,
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
  RotateCw,
  Route,
  Share2,
  Shield,
  ShieldCheck,
  Sparkles,
  Target,
  Trash2,
  TrendingUp,
  UserCircle,
  Users,
  Wrench,
  X,
  Zap,
} from "lucide-react"

// --- DATA CONSTANTS ---
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

// --- BASE UI COMPONENTS ---
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
      className={`fixed inset-y-0 left-0 z-30 flex w-[260px] shrink-0 flex-col border-r bg-white px-7 py-8 transition-transform lg:static lg:translate-x-0 ${
        mobileOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
      }`}
    >
      <div className="flex items-center justify-between">
        <Brand />
        <button className="lg:hidden rounded-lg p-1.5 hover:bg-muted" onClick={() => setMobileOpen(false)} aria-label="Close menu">
          <X className="size-5" />
        </button>
      </div>
      <nav className="mt-8 flex flex-col gap-1.5">
        {nav.map(([Icon, label], i) => (
          <button
            key={label}
            className={`flex items-center gap-3.5 rounded-xl px-4 py-3 text-left text-sm font-semibold transition-colors ${
              i === 0
                ? "border border-[#b7e3cb] bg-[#eefaf3] text-[#087b4b]"
                : "text-foreground hover:bg-muted"
            }`}
            onClick={() => setMobileOpen(false)}
          >
            <Icon className="size-5" />
            <span>{label}</span>
            {label === "Notifications" && (
              <span className="ml-auto grid size-5 place-items-center rounded-full bg-[#d9f2e2] text-xs text-[#087b4b]">
                3
              </span>
            )}
          </button>
        ))}
      </nav>
      <div className="mt-6 overflow-hidden rounded-2xl bg-[#e9f9ef] p-4 pb-0">
        <h3 className="max-w-[170px] text-lg font-bold leading-tight text-[#126f47]">Help make your city better</h3>
        <p className="mt-2 max-w-[180px] text-xs leading-5 text-muted-foreground">Report issues, track progress and see real change.</p>
        <div className="mt-3 h-16 bg-[linear-gradient(165deg,transparent_20%,#b9e8c7_21%,#b9e8c7_60%,transparent_61%)]" />
      </div>
      <div className="mt-6">
        <p className="mb-2 px-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">Quick Help</p>
        <button className="flex w-full items-center gap-3 rounded-xl border px-3.5 py-2.5 text-xs font-semibold hover:bg-muted">
          <CircleHelp className="size-4" /> How to Report?
        </button>
        <button className="mt-2 flex w-full items-center gap-3 rounded-xl border px-3.5 py-2.5 text-xs font-semibold hover:bg-muted">
          <MessageCircle className="size-4" /> Contact Support
        </button>
      </div>
      <div className="mt-auto flex flex-col gap-2.5 border-t pt-5">
        <button className="flex items-center justify-between rounded-xl border px-3.5 py-2.5 text-xs font-medium">
          <span className="flex items-center gap-2.5">
            <Globe2 className="size-4" /> English
          </span>
          <ChevronDown className="size-4" />
        </button>
        <button className="flex items-center justify-between rounded-xl border px-3.5 py-2.5 text-xs font-medium">
          <span className="flex items-center gap-2.5">
            <Sparkles className="size-4" /> Light Mode
          </span>
          <ChevronDown className="size-4" />
        </button>
      </div>
    </aside>
  )
}

function RecentReports({ userReports }: { userReports: typeof reports }) {
  return (
    <section className="w-full min-w-0 shrink-0 rounded-2xl border bg-white p-5 shadow-[0_2px_12px_rgba(16,33,58,0.03)]">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold">Recent Reports</h2>
        <button className="text-sm text-blue-600 hover:underline">View All</button>
      </div>
      <div className="mt-4 flex flex-col gap-4">
        {userReports.map((report, idx) => (
          <div className="flex gap-3.5 min-w-0" key={`${report.title}-${idx}`}>
            <div
              className={`grid size-[56px] shrink-0 place-items-center rounded-xl text-white ${
                report.image === "road" ? "bg-[#6c736c]" : report.image === "trash" ? "bg-[#728b6d]" : "bg-[#8f9da2]"
              }`}
            >
              <div className="size-9 rounded-md border-2 border-white/50 opacity-70" />
            </div>
            <div className="min-w-0 flex-1 overflow-hidden">
              <div className="flex items-start justify-between gap-2">
                <h3 className="truncate text-sm font-bold">{report.title}</h3>
                <span
                  className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold ${
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
              <p className="mt-1 truncate text-xs text-muted-foreground flex items-center gap-1">
                <MapPin className="size-3 shrink-0" />
                <span className="truncate">{report.address}</span>
              </p>
              <p className="mt-1 text-[11px] text-muted-foreground">{report.time}</p>
            </div>
          </div>
        ))}
      </div>
      <button className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-[#087b4b] py-2.5 text-xs font-bold text-[#087b4b] hover:bg-[#eefaf3]">
        <TrendingUp className="size-4" /> Track Your Report
      </button>
    </section>
  )
}

function NearbyMap() {
  return (
    <section className="w-full min-w-0 shrink-0 rounded-2xl border bg-white p-4 shadow-[0_2px_12px_rgba(16,33,58,0.03)]">
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
        <button className="absolute bottom-3 left-3 flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-xs font-bold shadow">
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
    <section className="w-full min-w-0 shrink-0 rounded-2xl border bg-white p-4 shadow-[0_2px_12px_rgba(16,33,58,0.03)]">
      <h2 className="text-lg font-bold">Your Impact</h2>
      <p className="mt-1 text-xs text-muted-foreground">Together, we&apos;re creating a better city!</p>
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {metrics.map(({ Icon, num, label, sub, tone }, i) => (
          <div className="flex min-w-0 flex-col items-center rounded-xl border bg-[#fcfdfd] px-1 py-3 text-center" key={label}>
            <div className={`grid size-10 place-items-center rounded-full ${toneStyles[tone]}`}>
              <Icon className="size-4" fill={i === 3 ? "currentColor" : "none"} />
            </div>
            <strong className="mt-2 text-xl">{num}</strong>
            <span className="text-[11px] leading-4 text-muted-foreground">{label}</span>
            {sub && <span className="text-[10px] text-muted-foreground">{sub}</span>}
          </div>
        ))}
      </div>
      <div className="mt-3 rounded-xl bg-[#eaf8ef] px-3 py-2.5 text-center text-xs font-semibold text-[#27804f]">
        You&apos;re making a real difference. Thank you! <Heart className="inline size-3.5 fill-current" />
      </div>
    </section>
  )
}

function Progress({ active = 1 }: { active?: number }) {
  const steps = ["Issue Type", "Add Details", "Location", "Review", "Submit"]
  return (
    <div className="mx-auto max-w-3xl min-w-0 overflow-x-auto py-1">
      <div className="flex items-start justify-between min-w-[320px]">
        {steps.map((label, index) => {
          const stepNum = index + 1
          const isCompleted = stepNum <= active
          const isActive = stepNum === active
          return (
            <div className="flex flex-1 items-start" key={label}>
              <div className="flex flex-col items-center gap-1.5">
                <span
                  className={`grid size-7 sm:size-8 place-items-center rounded-full border text-xs sm:text-sm font-semibold transition-colors ${
                    isCompleted
                      ? "border-[#087b4b] bg-[#087b4b] text-white font-bold"
                      : "border-border bg-white text-muted-foreground"
                  }`}
                >
                  {stepNum < active || (active === 5 && stepNum === 5) ? (
                    stepNum === 5 && active === 5 ? "5" : <Check className="size-3.5 stroke-[3]" />
                  ) : (
                    stepNum
                  )}
                </span>
                <span
                  className={`whitespace-nowrap text-[10px] sm:text-xs font-semibold ${
                    isActive || isCompleted ? "text-foreground font-bold" : "text-muted-foreground"
                  }`}
                >
                  {label}
                </span>
              </div>
              {index < steps.length - 1 && (
                <span
                  className={`mt-3.5 sm:mt-4 h-[2px] flex-1 ${
                    stepNum <= active ? "bg-[#087b4b]" : "bg-border"
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
    <div className="mt-8 rounded-2xl border bg-white p-5 sm:p-6 shadow-[0_2px_12px_rgba(16,33,58,0.03)] min-w-0">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-border">
        {features.map(({ Icon, title, desc }, index) => (
          <div key={title} className={`flex items-center gap-3.5 ${index > 0 ? "lg:pl-6" : ""}`}>
            <div className="grid size-11 shrink-0 place-items-center rounded-full bg-[#eefaf3] text-[#087b4b]">
              <Icon className="size-5" />
            </div>
            <div className="min-w-0">
              <h4 className="text-xs sm:text-sm font-bold text-[#126f47] truncate">{title}</h4>
              <p className="mt-0.5 text-[11px] text-muted-foreground">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function BottomImpactStrip() {
  const stats = [
    { num: "21", label: "Reports Submitted", Icon: FileText },
    { num: "14", label: "In Progress", Icon: RotateCw },
    { num: "8", label: "Resolved", Icon: CheckCircle },
    { num: "126", label: "Thank You's Received", Icon: Heart },
  ]

  return (
    <div className="mt-8 rounded-2xl border bg-white p-5 sm:p-6 shadow-[0_2px_12px_rgba(16,33,58,0.03)] min-w-0">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-[#126f47]">Your voice makes a difference!</h3>
          <p className="mt-1 text-xs text-muted-foreground">
            Every report brings us one step closer to a cleaner, safer and better city for everyone.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:gap-4">
          {stats.map(({ num, label, Icon }) => (
            <div key={label} className="flex items-center gap-3 rounded-xl border border-border bg-[#fcfdfd] p-3 min-w-0">
              <div className="grid size-9 shrink-0 place-items-center rounded-full bg-[#eefaf3] text-[#087b4b]">
                <Icon className="size-4" />
              </div>
              <div className="min-w-0">
                <span className="text-lg font-extrabold text-foreground">{num}</span>
                <span className="block text-[10px] font-medium text-muted-foreground truncate">{label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// --- GUIDANCE & ILLUSTRATION PANELS ---
function GuidancePanel() {
  return (
    <div className="flex flex-col gap-4 w-full min-w-0 shrink-0">
      <section className="rounded-2xl border bg-[#f3fbf6] p-5">
        <h2 className="text-base font-bold">Selected for you</h2>
        <div className="mt-4 flex items-center gap-4">
          <span className="grid size-14 shrink-0 place-items-center rounded-full bg-[#e5f6e9] text-[#58ae47]">
            <Route className="size-7" />
          </span>
          <div className="min-w-0">
            <h3 className="font-bold text-sm sm:text-base truncate">Roads & Footpaths</h3>
            <p className="mt-1 text-xs leading-5 text-muted-foreground">Potholes, cracks, damaged roads, footpaths</p>
            <span className="mt-2 inline-flex rounded-full border border-[#b7e3cb] px-2 py-0.5 text-[10px] font-medium text-primary">
              Best match
            </span>
          </div>
        </div>
      </section>
      <section className="rounded-2xl border bg-card p-5">
        <h2 className="text-base font-bold">Reporting to</h2>
        <div className="mt-4 flex items-center gap-4">
          <span className="grid size-12 shrink-0 place-items-center rounded-full bg-secondary text-primary">
            <Home className="size-6" />
          </span>
          <div className="min-w-0">
            <h3 className="font-bold text-sm sm:text-base truncate">Public Works Department</h3>
            <p className="mt-1 text-xs leading-5 text-muted-foreground">This issue will be sent to the appropriate department.</p>
            <button className="mt-2 text-xs font-semibold text-primary hover:underline">Learn more</button>
          </div>
        </div>
      </section>
      <section className="rounded-2xl border bg-card p-5">
        <h2 className="text-base font-bold text-[#126f47]">How to submit a good report</h2>
        <ul className="mt-3 flex flex-col gap-2 text-xs text-muted-foreground">
          {["Take a clear photo of the issue", "Add accurate location", "Provide a short description", "This helps us resolve it faster!"].map(
            (item) => (
              <li className="flex items-center gap-2" key={item}>
                <span className="grid size-4 shrink-0 place-items-center rounded-full bg-secondary text-[10px] font-bold text-primary">✓</span>
                <span>{item}</span>
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
    <div className="flex flex-col gap-6 w-full min-w-0 shrink-0">
      <section className="rounded-2xl border bg-white p-5 sm:p-6 shadow-[0_2px_12px_rgba(16,33,58,0.03)]">
        <div className="flex items-center gap-2">
          <div className="grid size-7 place-items-center rounded-full bg-[#fef3c7] text-[#d97706]">
            <Lightbulb className="size-4 fill-[#fef3c7]" />
          </div>
          <h3 className="text-base font-bold text-foreground">Tips for a great report</h3>
        </div>

        <div className="mt-5 space-y-4">
          {tips.map(({ Icon, title, desc }) => (
            <div key={title} className="flex items-start gap-3.5 min-w-0">
              <div className="grid size-10 shrink-0 place-items-center rounded-full bg-[#eefaf3] text-[#087b4b]">
                <Icon className="size-4" />
              </div>
              <div className="min-w-0">
                <h4 className="text-xs sm:text-sm font-bold text-foreground">{title}</h4>
                <p className="mt-0.5 text-[11px] text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="relative mt-6 overflow-hidden rounded-2xl bg-gradient-to-b from-[#f2faf5] to-[#e4f5eb] p-4 text-center">
          <div className="relative z-10 mx-auto flex max-w-[160px] items-center justify-center pt-2">
            <div className="relative w-32 rounded-xl border border-[#b8e4c9] bg-white p-3 shadow-md">
              <div className="mx-auto mb-2 h-2.5 w-10 rounded-md bg-[#72bd55]" />
              <div className="space-y-1.5">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-center gap-1.5">
                    <span className="grid size-3.5 place-items-center rounded-full bg-[#087b4b] text-[8px] font-bold text-white">
                      ✓
                    </span>
                    <div className="h-1.5 flex-1 rounded-full bg-[#e4e9e8]" />
                  </div>
                ))}
              </div>
              <div className="absolute -bottom-2.5 -right-2.5 grid size-9 place-items-center rounded-full bg-[#087b4b] text-white shadow-lg ring-3 ring-white">
                <Shield className="size-4 fill-current" />
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
    <div className="flex flex-col gap-6 w-full min-w-0 shrink-0">
      <section className="rounded-2xl border bg-white p-5 sm:p-6 shadow-[0_2px_12px_rgba(16,33,58,0.03)]">
        <h3 className="text-base font-bold text-[#126f47]">Why accurate location matters</h3>

        <div className="mt-5 space-y-5">
          {tips.map(({ Icon, title, desc }) => (
            <div key={title} className="flex items-start gap-3.5 min-w-0">
              <div className="grid size-11 shrink-0 place-items-center rounded-full bg-[#eefaf3] text-[#087b4b]">
                <Icon className="size-5" />
              </div>
              <div className="min-w-0">
                <h4 className="text-xs sm:text-sm font-bold text-foreground">{title}</h4>
                <p className="mt-0.5 text-[11px] text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="relative mt-6 overflow-hidden rounded-2xl bg-gradient-to-b from-[#e8f6ee] to-[#d3ece0] p-4 text-center">
          <div className="relative z-10 mx-auto flex h-32 w-full items-center justify-center">
            <div className="relative h-24 w-40 rounded-2xl border-2 border-white/80 bg-[#d9f2e2] p-2 shadow-lg" style={{ transform: "rotateX(25deg) rotateZ(-5deg)" }}>
              <div className="absolute inset-0 opacity-40 bg-[linear-gradient(to_right,#087b4b_2px,transparent_2px),linear-gradient(to_bottom,#087b4b_2px,transparent_2px)] bg-[size:20px_20px]" />
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                <div className="grid size-9 place-items-center rounded-full bg-[#087b4b] text-white shadow-xl ring-2 ring-white">
                  <MapPin className="size-5 fill-current" />
                </div>
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
    <div className="flex flex-col gap-6 w-full min-w-0 shrink-0">
      <section className="rounded-2xl border bg-white p-5 sm:p-6 shadow-[0_2px_12px_rgba(16,33,58,0.03)]">
        <div className="flex items-center gap-2">
          <div className="grid size-7 place-items-center rounded-full bg-[#fef3c7] text-[#d97706]">
            <Lightbulb className="size-4 fill-[#fef3c7]" />
          </div>
          <h3 className="text-base font-bold text-[#126f47]">Tips for a successful report</h3>
        </div>

        <div className="mt-5 space-y-4">
          {tips.map(({ Icon, title, desc }) => (
            <div key={title} className="flex items-start gap-3.5 min-w-0">
              <div className="grid size-10 shrink-0 place-items-center rounded-full bg-[#eefaf3] text-[#087b4b]">
                <Icon className="size-4" />
              </div>
              <div className="min-w-0">
                <h4 className="text-xs sm:text-sm font-bold text-foreground">{title}</h4>
                <p className="mt-0.5 text-[11px] text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="relative mt-6 overflow-hidden rounded-2xl bg-gradient-to-b from-[#f2faf5] to-[#e4f5eb] p-4 text-center">
          <div className="relative z-10 mx-auto flex max-w-[160px] items-center justify-center pt-2">
            <div className="relative w-32 rounded-xl border border-[#b8e4c9] bg-white p-3 shadow-md">
              <div className="mx-auto mb-2 h-2.5 w-10 rounded-md bg-[#72bd55]" />
              <div className="space-y-1.5">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-center gap-1.5">
                    <span className="grid size-3.5 place-items-center rounded-full bg-[#087b4b] text-[8px] font-bold text-white">
                      ✓
                    </span>
                    <div className="h-1.5 flex-1 rounded-full bg-[#e4e9e8]" />
                  </div>
                ))}
              </div>
              <div className="absolute -bottom-2.5 -right-2.5 grid size-9 place-items-center rounded-full bg-[#087b4b] text-white shadow-lg ring-3 ring-white">
                <Shield className="size-4 fill-current" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function CityBackdropIllustration() {
  return (
    <div className="relative w-full overflow-hidden rounded-2xl bg-gradient-to-b from-[#f2faf5] to-[#e4f5eb] pt-6 pb-2 text-center">
      <Sparkles className="absolute left-1/4 top-4 size-4 text-[#72bd55]/60 animate-pulse" />
      <Sparkles className="absolute right-1/4 top-6 size-3 text-[#087b4b]/40" />
      <Sparkles className="absolute left-1/3 top-10 size-2.5 text-[#72bd55]" />
      <Sparkles className="absolute right-1/3 top-3 size-3.5 text-[#087b4b]/50" />

      <div className="relative z-0 mx-auto flex h-24 max-w-lg items-end justify-center gap-1.5 opacity-80">
        <div className="h-12 w-6 rounded-t-sm bg-[#c2e8d0]" />
        <div className="h-16 w-8 rounded-t-sm bg-[#acd9bf]" />
        <div className="h-20 w-10 rounded-t-md bg-[#96cca9]">
          <div className="mx-auto mt-2 grid grid-cols-2 gap-1 w-6 opacity-60">
            <div className="h-1.5 w-2 rounded-xs bg-white" />
            <div className="h-1.5 w-2 rounded-xs bg-white" />
          </div>
        </div>
        <div className="h-14 w-7 rounded-t-sm bg-[#bce3cb]" />
        <div className="size-8 rounded-full bg-[#48bb78] -ml-2 mb-1" />
        <div className="size-10 rounded-full bg-[#2f855a] -ml-3 mb-0" />
        <div className="h-22 w-12 rounded-t-md bg-[#84c498]" />
        <div className="size-9 rounded-full bg-[#38a169] -mr-3 mb-0" />
        <div className="h-16 w-8 rounded-t-sm bg-[#acd9bf]" />
        <div className="h-12 w-6 rounded-t-sm bg-[#c2e8d0]" />
      </div>

      <div className="relative z-10 -mt-10 flex justify-center">
        <div className="grid size-18 sm:size-20 place-items-center rounded-full bg-[#087b4b] text-white shadow-xl ring-8 ring-white">
          <Check className="size-9 sm:size-10 stroke-[3]" />
        </div>
      </div>
    </div>
  )
}

function CitizensCommunityIllustration() {
  return (
    <div className="relative mt-4 flex items-center justify-between overflow-hidden rounded-2xl bg-gradient-to-r from-[#eaf6ef] to-[#d8f0e2] p-3.5">
      <div className="flex -space-x-3 overflow-hidden">
        <div className="grid size-9 place-items-center rounded-full bg-[#3b82f6] text-white ring-2 ring-white shadow">
          <UserCircle className="size-6" />
        </div>
        <div className="grid size-9 place-items-center rounded-full bg-[#10b981] text-white ring-2 ring-white shadow">
          <UserCircle className="size-6" />
        </div>
        <div className="grid size-9 place-items-center rounded-full bg-[#f59e0b] text-white ring-2 ring-white shadow">
          <UserCircle className="size-6" />
        </div>
        <div className="grid size-9 place-items-center rounded-full bg-[#8b5cf6] text-white ring-2 ring-white shadow">
          <UserCircle className="size-6" />
        </div>
      </div>
      <span className="text-[11px] font-bold text-[#087b4b] bg-white/90 px-3 py-1 rounded-full shadow-xs">
        +2.4k Citizens
      </span>
    </div>
  )
}

function Step5RightPanel() {
  const nextSteps = [
    {
      Icon: Bell,
      title: "Report Received",
      desc: "Your report has been received and logged in our system.",
    },
    {
      Icon: Users,
      title: "Under Review",
      desc: "Our team will review your report and verify the issue.",
    },
    {
      Icon: Wrench,
      title: "Action In Progress",
      desc: "The concerned department will take necessary action.",
    },
    {
      Icon: CheckCircle,
      title: "Issue Resolved",
      desc: "We'll update you once the issue is resolved.",
    },
  ]

  return (
    <div className="flex flex-col gap-6 w-full min-w-0 shrink-0">
      <section className="rounded-2xl border bg-white p-5 sm:p-6 shadow-[0_2px_12px_rgba(16,33,58,0.03)]">
        <h3 className="text-base font-bold text-[#126f47]">What happens next?</h3>

        <div className="relative mt-5 space-y-5">
          <div className="absolute left-[20px] top-3 bottom-3 w-0.5 border-l-2 border-dashed border-[#acd9bf]" />

          {nextSteps.map(({ Icon, title, desc }) => (
            <div key={title} className="relative flex items-start gap-3.5 z-10 min-w-0">
              <div className="grid size-10 shrink-0 place-items-center rounded-full border-2 border-white bg-[#eefaf3] text-[#087b4b] shadow-sm ring-2 ring-[#acd9bf]/40">
                <Icon className="size-4.5" />
              </div>
              <div className="min-w-0 pt-0.5">
                <h4 className="text-xs sm:text-sm font-bold text-foreground">{title}</h4>
                <p className="mt-0.5 text-[11px] text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border bg-white p-5 sm:p-6 shadow-[0_2px_12px_rgba(16,33,58,0.03)]">
        <h3 className="text-base font-bold text-[#126f47]">Spread the word</h3>
        <p className="mt-1 text-xs text-muted-foreground">Invite your neighbors to help make our city better.</p>

        <div className="mt-4 flex items-center gap-3">
          <button
            type="button"
            aria-label="Share on WhatsApp"
            className="grid size-9 place-items-center rounded-full bg-[#25D366] text-white shadow-sm hover:scale-105 transition-transform"
          >
            <MessageCircle className="size-4.5" />
          </button>
          <button
            type="button"
            aria-label="Share on Facebook"
            className="grid size-9 place-items-center rounded-full bg-[#1877F2] text-white shadow-sm hover:scale-105 transition-transform"
          >
            <Share2 className="size-4.5" />
          </button>
          <button
            type="button"
            aria-label="Share on X"
            className="grid size-9 place-items-center rounded-full bg-black text-white shadow-sm hover:scale-105 transition-transform"
          >
            <span className="text-xs font-bold">X</span>
          </button>
          <button
            type="button"
            aria-label="Copy Share Link"
            className="grid size-9 place-items-center rounded-full border border-border bg-white text-foreground shadow-sm hover:bg-muted transition-colors"
          >
            <LinkIcon className="size-4.5" />
          </button>
        </div>

        <CitizensCommunityIllustration />
      </section>
    </div>
  )
}

// --- REPORT FLOW PAGES ---
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
          className="fixed inset-0 z-20 bg-foreground/20 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}
      <main className="min-w-0 flex-1 overflow-x-hidden">
        <div className="mx-auto max-w-[1280px] p-4 sm:p-6 lg:p-8 min-w-0">
          <header className="flex items-start gap-2 sm:gap-4">
            <button className="mt-1 rounded-lg p-2 hover:bg-muted lg:hidden" onClick={() => setMobileOpen(true)} aria-label="Open menu">
              <Menu />
            </button>
            <button onClick={onBack} className="mt-1 flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs sm:text-sm font-semibold hover:bg-muted">
              <ArrowLeft className="size-4" />
              Back
            </button>
            <div className="min-w-0">
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">Submit an Issue</h1>
              <p className="mt-1.5 text-sm text-muted-foreground sm:text-base">Help us resolve issues faster in your neighborhood.</p>
            </div>
          </header>
          <div className="mt-6 sm:mt-8">
            <Progress active={1} />
          </div>
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px] xl:grid-cols-[minmax(0,1fr)_340px] gap-6 min-w-0">
            <section className="rounded-2xl border bg-card p-5 sm:p-6 shadow-[0_2px_12px_rgba(16,33,58,0.03)] min-w-0">
              <h2 className="text-lg sm:text-xl font-bold">1. Choose the issue type</h2>
              <p className="mt-1.5 text-xs sm:text-sm text-muted-foreground">Select the category that best describes the issue you want to report.</p>
              
              {/* Category Grid: 2 spacious columns on desktop/laptop */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-4 min-w-0">
                {categories.map(({ id, title, text, icon: Icon, tone }) => {
                  const isSelected = selected === id
                  return (
                    <button
                      type="button"
                      aria-pressed={isSelected}
                      onClick={() => setSelected(id)}
                      key={id}
                      className={`relative flex min-h-[106px] w-full min-w-0 items-start gap-3.5 rounded-2xl border border-border p-4 text-left shadow-[0_2px_8px_rgba(16,33,58,0.03)] transition-all hover:-translate-y-0.5 hover:border-[#acd9bf] hover:shadow-md ${
                        isSelected ? "border-[#087b4b] bg-[#f3fbf6] ring-1 ring-[#087b4b]" : "bg-card"
                      }`}
                    >
                      <span className={`grid size-12 shrink-0 place-items-center rounded-2xl ${toneStyles[tone]}`}>
                        <Icon className="size-6" />
                      </span>
                      <span className="min-w-0 flex-1 overflow-hidden">
                        <strong className="block truncate text-[15px] font-bold leading-6 text-foreground">{title}</strong>
                        <span className="mt-1 block text-xs leading-5 text-muted-foreground break-words">{text}</span>
                      </span>
                      <span
                        className={`absolute right-3 top-3 grid size-5 place-items-center rounded-full border text-[10px] ${
                          isSelected ? "border-primary bg-primary text-white" : "border-border text-transparent"
                        }`}
                      >
                        ✓
                      </span>
                    </button>
                  )
                })}
              </div>
              <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl bg-[#f3fbf6] p-4">
                <div>
                  <h3 className="font-semibold text-sm text-[#126f47]">Can&apos;t find the right category?</h3>
                  <p className="mt-0.5 text-xs text-muted-foreground">Select &quot;Other Issue&quot; and describe it in detail.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelected("other")}
                  className="shrink-0 rounded-lg border border-[#acd9bf] bg-card px-4 py-2 text-xs font-semibold text-primary hover:bg-secondary"
                >
                  Other Issue
                </button>
              </div>
              <button
                type="button"
                onClick={onContinue}
                className="mt-6 flex w-full items-center justify-center gap-2.5 rounded-xl bg-primary py-3.5 text-sm font-bold text-primary-foreground hover:bg-[#066b41]"
              >
                Continue <ArrowRight className="size-4.5" />
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
          className="fixed inset-0 z-20 bg-foreground/20 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}
      <main className="min-w-0 flex-1 overflow-x-hidden">
        <div className="mx-auto max-w-[1280px] p-4 sm:p-6 lg:p-8 min-w-0">
          <div className="relative flex flex-col items-center justify-center text-center">
            <button
              onClick={onBack}
              className="absolute left-0 top-0 flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs sm:text-sm font-semibold text-foreground hover:bg-muted"
            >
              <ArrowLeft className="size-4" />
              Back
            </button>
            <div className="flex items-center gap-2">
              <div className="grid size-7 sm:size-8 place-items-center rounded-xl bg-[#087b4b] text-white">
                <Shield className="size-4.5 fill-current" />
              </div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">Submit an Issue</h1>
            </div>
            <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
              Help us resolve issues faster in your neighborhood.
            </p>
          </div>

          <div className="mt-6 sm:mt-8">
            <Progress active={2} />
          </div>

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px] xl:grid-cols-[minmax(0,1fr)_340px] gap-6 min-w-0">
            <section className="flex flex-col justify-between rounded-2xl border bg-card p-5 sm:p-7 shadow-[0_2px_12px_rgba(16,33,58,0.03)] min-w-0">
              <div>
                <h2 className="text-lg sm:text-xl font-bold tracking-tight text-foreground">2. Add details about the issue</h2>
                <p className="mt-1 text-xs sm:text-sm text-muted-foreground">Tell us more so we can understand and resolve it better.</p>

                <div className="mt-6">
                  <label className="block text-xs sm:text-sm font-semibold text-foreground">Description</label>

                  <div className="mt-3 flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setMode("type")}
                      className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
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
                      className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                        mode === "voice"
                          ? "border border-[#acd9bf] bg-[#eefaf3] text-[#087b4b]"
                          : "border border-border bg-white text-muted-foreground hover:bg-muted"
                      }`}
                    >
                      <Mic className="size-4" />
                      Voice
                    </button>
                  </div>

                  {mode === "type" ? (
                    <div className="relative mt-3">
                      <textarea
                        value={description}
                        maxLength={500}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Describe the issue in a few words..."
                        className="min-h-[140px] w-full rounded-2xl border border-border bg-white p-4 text-xs sm:text-sm font-normal text-foreground placeholder:text-muted-foreground/60 focus:border-[#087b4b] focus:outline-none focus:ring-1 focus:ring-[#087b4b] resize-none"
                      />
                      <div className="mt-1 text-right text-xs font-medium text-muted-foreground">
                        {description.length} / 500
                      </div>
                    </div>
                  ) : (
                    <div className="mt-3 flex min-h-[160px] flex-col items-center justify-center rounded-2xl border border-dashed border-[#acd9bf] bg-[#eefaf3]/60 p-6 text-center">
                      <div className="grid size-12 place-items-center rounded-full bg-[#d9f2e2] text-[#087b4b]">
                        <Mic className="size-6" />
                      </div>
                      <p className="mt-3 font-bold text-xs sm:text-sm text-foreground">Record a voice description</p>
                      <p className="mt-1 text-[11px] text-muted-foreground">Click below to record details using your microphone</p>
                      <button
                        type="button"
                        className="mt-4 flex items-center gap-2 rounded-xl bg-[#087b4b] px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-[#066b41]"
                      >
                        <Mic className="size-3.5" /> Start Recording
                      </button>
                    </div>
                  )}
                </div>

                <div className="mt-6">
                  <label className="block text-xs sm:text-sm font-bold text-foreground">How severe is this issue?</label>

                  <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {severities.map((sev) => {
                      const isSelected = severity === sev.id
                      return (
                        <button
                          key={sev.id}
                          type="button"
                          onClick={() => setSeverity(sev.id)}
                          className={`flex min-w-0 items-center justify-center gap-2 rounded-xl border py-3 px-2 text-xs font-semibold transition-all sm:text-sm ${
                            isSelected
                              ? sev.selectedClasses
                              : "border-border bg-white text-foreground hover:border-gray-300 hover:bg-muted/50"
                          }`}
                        >
                          <span
                            className={`grid size-3.5 shrink-0 place-items-center rounded-full ${sev.dotBg} ${
                              isSelected ? "text-white" : ""
                            }`}
                          >
                            {isSelected && <Check className="size-2.5 stroke-[3]" />}
                          </span>
                          <span className="truncate">{sev.label}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>

                <div className="mt-6 flex items-center gap-3 rounded-xl border border-[#b7e3cb]/60 bg-[#eefaf3] px-4 py-3 text-xs sm:text-sm text-[#126f47]">
                  <div className="grid size-5 shrink-0 place-items-center rounded-full bg-[#d9f2e2] text-[#087b4b]">
                    <ShieldCheck className="size-4" />
                  </div>
                  <span className="font-medium">Issues marked as High or Critical are prioritized for faster action.</span>
                </div>
              </div>

              <div className="mt-8 flex items-center justify-between gap-4 border-t border-border pt-5">
                <button
                  type="button"
                  onClick={onBack}
                  className="flex items-center justify-center rounded-xl border border-border bg-white px-7 py-3 text-xs sm:text-sm font-bold text-foreground hover:bg-muted"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={onContinue}
                  className="flex items-center justify-center gap-2 rounded-xl bg-[#087b4b] px-8 py-3 text-xs sm:text-sm font-bold text-white shadow-sm hover:bg-[#066b41]"
                >
                  Continue <ArrowRight className="size-4" />
                </button>
              </div>
            </section>

            <Step2GuidancePanel />
          </div>

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
          className="fixed inset-0 z-20 bg-foreground/20 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}
      <main className="min-w-0 flex-1 overflow-x-hidden">
        <div className="mx-auto max-w-[1280px] p-4 sm:p-6 lg:p-8 min-w-0">
          <div className="relative flex flex-col items-center justify-center text-center">
            <button
              onClick={onBack}
              className="absolute left-0 top-0 flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs sm:text-sm font-semibold text-foreground hover:bg-muted"
            >
              <ArrowLeft className="size-4" />
              Back
            </button>
            <div className="flex items-center gap-2">
              <div className="grid size-7 sm:size-8 place-items-center rounded-xl bg-[#087b4b] text-white">
                <Shield className="size-4.5 fill-current" />
              </div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">Submit an Issue</h1>
            </div>
            <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
              Help us resolve issues faster in your neighborhood.
            </p>
          </div>

          <div className="mt-6 sm:mt-8">
            <Progress active={3} />
          </div>

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px] xl:grid-cols-[minmax(0,1fr)_340px] gap-6 min-w-0">
            <section className="flex flex-col justify-between rounded-2xl border bg-card p-5 sm:p-7 shadow-[0_2px_12px_rgba(16,33,58,0.03)] min-w-0">
              <div>
                <h2 className="text-lg sm:text-xl font-bold tracking-tight text-foreground">3. Where is the issue located?</h2>
                <p className="mt-1 text-xs sm:text-sm text-muted-foreground">Provide the exact location so the team can find it easily.</p>

                <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
                  <button
                    type="button"
                    onClick={handleUseCurrentLocation}
                    className={`flex items-center justify-center gap-2 rounded-xl py-3 px-3 text-xs font-bold transition-all ${
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
                    className={`flex items-center justify-center gap-2 rounded-xl py-3 px-3 text-xs font-bold transition-all ${
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
                    className={`flex items-center justify-center gap-2 rounded-xl py-3 px-3 text-xs font-bold transition-all ${
                      method === "address"
                        ? "border border-[#acd9bf] bg-[#eefaf3] text-[#087b4b] shadow-sm"
                        : "border border-border bg-white text-foreground hover:bg-muted"
                    }`}
                  >
                    <Pencil className="size-4 text-foreground" />
                    Enter Address
                  </button>
                </div>

                {method === "address" && (
                  <div className="mt-4 rounded-2xl border border-border bg-[#f8faf9] p-4">
                    <label className="block text-xs font-bold text-foreground">Enter address or landmark</label>
                    <div className="mt-2 flex flex-col sm:flex-row gap-2">
                      <input
                        type="text"
                        value={addressInput}
                        onChange={(e) => setAddressInput(e.target.value)}
                        placeholder="Enter the location or nearest landmark"
                        className="flex-1 rounded-xl border border-border bg-white px-3.5 py-2 text-xs sm:text-sm text-foreground focus:border-[#087b4b] focus:outline-none"
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

                  <div className="mt-3 flex items-start gap-3.5 min-w-0">
                    <div className="grid size-10 shrink-0 place-items-center rounded-2xl bg-[#eefaf3] text-[#087b4b]">
                      <MapPin className="size-5 fill-current" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="text-sm sm:text-base font-bold text-foreground truncate">
                        {location.address.split("\n")[0] || "400 Block, Main St."}
                      </h4>
                      <p className="mt-0.5 text-xs font-medium text-muted-foreground truncate">
                        {location.address.split("\n")[1] || "Springfield, ST 12345"}
                      </p>
                    </div>
                  </div>
                </div>

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

                  <div
                    className="absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-300 pointer-events-none"
                    style={{ left: `${markerPos.x}%`, top: `${markerPos.y}%` }}
                  >
                    <div className="absolute left-1/2 top-1/2 size-20 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#087b4b]/40 bg-[#087b4b]/15 animate-pulse" />
                    <div className="relative grid size-11 place-items-center rounded-full bg-[#087b4b] text-white shadow-xl ring-4 ring-white">
                      <MapPin className="size-6 fill-current" />
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      setMethod("map")
                    }}
                    className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-xl border border-border bg-white px-3 py-1.5 text-xs font-bold text-foreground shadow-sm hover:bg-muted"
                  >
                    <LocateFixed className="size-3.5 text-[#087b4b]" />
                    Adjust on Map
                  </button>
                </div>

                <div className="mt-4 flex items-center gap-2.5 rounded-xl border border-[#b7e3cb]/60 bg-[#eefaf3] px-4 py-3 text-xs text-[#126f47]">
                  <MapPin className="size-4 shrink-0 text-[#087b4b]" />
                  <span className="font-medium">Using your current location with high accuracy.</span>
                </div>
              </div>

              <div className="mt-8 flex items-center justify-between gap-4 border-t border-border pt-5">
                <button
                  type="button"
                  onClick={onBack}
                  className="flex items-center justify-center rounded-xl border border-border bg-white px-7 py-3 text-xs sm:text-sm font-bold text-foreground hover:bg-muted"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={onContinue}
                  className="flex items-center justify-center gap-2 rounded-xl bg-[#087b4b] px-8 py-3 text-xs sm:text-sm font-bold text-white shadow-sm hover:bg-[#066b41]"
                >
                  Continue <ArrowRight className="size-4" />
                </button>
              </div>
            </section>

            <Step3GuidancePanel />
          </div>

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
          className="fixed inset-0 z-20 bg-foreground/20 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}
      <main className="min-w-0 flex-1 overflow-x-hidden">
        <div className="mx-auto max-w-[1280px] p-4 sm:p-6 lg:p-8 min-w-0">
          <div className="relative flex flex-col items-center justify-center text-center">
            <button
              onClick={onBack}
              className="absolute left-0 top-0 flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs sm:text-sm font-semibold text-foreground hover:bg-muted"
            >
              <ArrowLeft className="size-4" />
              Back
            </button>
            <div className="flex items-center gap-2">
              <div className="grid size-7 sm:size-8 place-items-center rounded-xl bg-[#087b4b] text-white">
                <Shield className="size-4.5 fill-current" />
              </div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">Submit an Issue</h1>
            </div>
            <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
              Please review the details before submitting.
            </p>
          </div>

          <div className="mt-6 sm:mt-8">
            <Progress active={4} />
          </div>

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px] xl:grid-cols-[minmax(0,1fr)_340px] gap-6 min-w-0">
            <section className="flex flex-col justify-between rounded-2xl border bg-card p-5 sm:p-7 shadow-[0_2px_12px_rgba(16,33,58,0.03)] min-w-0">
              <div>
                <h2 className="text-lg sm:text-xl font-bold tracking-tight text-foreground">4. Review your report</h2>
                <p className="mt-1 text-xs sm:text-sm text-muted-foreground">Please review the details below before submitting.</p>

                <div className="mt-6 rounded-2xl border border-border bg-white p-2 sm:p-4 min-w-0">
                  <div className="divide-y divide-border">
                    {/* ROW 1: Issue Type */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 py-3.5 px-2">
                      <div className="flex items-start gap-3.5 min-w-0 flex-1">
                        <div className="grid size-10 shrink-0 place-items-center rounded-2xl bg-[#eefaf3] text-[#087b4b]">
                          <Route className="size-5" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <span className="block text-[11px] font-bold text-foreground">Issue Type</span>
                          <h4 className="mt-0.5 text-xs sm:text-sm font-bold text-foreground truncate">{selectedCategory.title}</h4>
                          <p className="text-[11px] text-muted-foreground truncate">{selectedCategory.text}</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => onNavigateStep(1)}
                        className="text-xs font-bold text-[#087b4b] hover:underline shrink-0"
                      >
                        Edit
                      </button>
                    </div>

                    {/* ROW 2: Description */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 py-3.5 px-2">
                      <div className="flex items-start gap-3.5 min-w-0 flex-1">
                        <div className="grid size-10 shrink-0 place-items-center rounded-2xl bg-[#eefaf3] text-[#087b4b]">
                          <MessageSquare className="size-5" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <span className="block text-[11px] font-bold text-foreground">Description</span>
                          <p className="mt-0.5 text-xs text-foreground leading-relaxed break-words">
                            {description || "No description provided."}
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => onNavigateStep(2)}
                        className="text-xs font-bold text-[#087b4b] hover:underline shrink-0"
                      >
                        Edit
                      </button>
                    </div>

                    {/* ROW 3: Severity */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 py-3.5 px-2">
                      <div className="flex items-start gap-3.5 min-w-0 flex-1">
                        <div className="grid size-10 shrink-0 place-items-center rounded-2xl bg-[#fff5f5] text-[#e53e3e]">
                          <AlertTriangle className="size-5" />
                        </div>
                        <div className="min-w-0">
                          <span className="block text-[11px] font-bold text-foreground">Severity</span>
                          <span className="mt-0.5 inline-block rounded-full border border-red-200 bg-red-50 px-2.5 py-0.5 text-xs font-bold text-[#e53e3e] capitalize">
                            {severity}
                          </span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => onNavigateStep(2)}
                        className="text-xs font-bold text-[#087b4b] hover:underline shrink-0"
                      >
                        Edit
                      </button>
                    </div>

                    {/* ROW 4: Location */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 py-3.5 px-2">
                      <div className="flex items-start gap-3.5 min-w-0 flex-1">
                        <div className="grid size-10 shrink-0 place-items-center rounded-2xl bg-[#eefaf3] text-[#087b4b]">
                          <MapPin className="size-5 fill-current" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <span className="block text-[11px] font-bold text-foreground">Location</span>
                          <h4 className="mt-0.5 text-xs sm:text-sm font-bold text-foreground truncate">
                            {location.address.split("\n")[0] || "400 Block, Main St."}
                          </h4>
                          <p className="text-[11px] text-muted-foreground truncate">
                            {location.address.split("\n")[1] || "Springfield, ST 12345"}
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => onNavigateStep(3)}
                        className="text-xs font-bold text-[#087b4b] hover:underline shrink-0"
                      >
                        Edit
                      </button>
                    </div>

                    {/* ROW 5: Photo / Video */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 py-3.5 px-2">
                      <div className="flex items-start gap-3.5 min-w-0 flex-1">
                        <div className="grid size-10 shrink-0 place-items-center rounded-2xl bg-[#eefaf3] text-[#087b4b]">
                          <ImageIcon className="size-5" />
                        </div>
                        <div className="min-w-0">
                          <span className="block text-[11px] font-bold text-foreground">Photo / Video</span>
                          <p className="mt-0.5 text-xs font-medium text-muted-foreground">2 files attached</p>
                          <div className="mt-2 flex gap-2">
                            <div className="size-10 overflow-hidden rounded-lg bg-gray-200 border border-border">
                              <div className="size-full bg-[linear-gradient(135deg,#728b6d_0%,#4b5749_100%)] flex items-center justify-center text-white/50 text-[9px]">
                                Photo 1
                              </div>
                            </div>
                            <div className="size-10 overflow-hidden rounded-lg bg-gray-200 border border-border">
                              <div className="size-full bg-[linear-gradient(135deg,#5e7067_0%,#3d4742_100%)] flex items-center justify-center text-white/50 text-[9px]">
                                Photo 2
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => onNavigateStep(2)}
                        className="text-xs font-bold text-[#087b4b] hover:underline shrink-0"
                      >
                        Edit
                      </button>
                    </div>

                    {/* ROW 6: Assigned Department */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 py-3.5 px-2">
                      <div className="flex items-start gap-3.5 min-w-0 flex-1">
                        <div className="grid size-10 shrink-0 place-items-center rounded-2xl bg-[#eefaf3] text-[#087b4b]">
                          <Landmark className="size-5" />
                        </div>
                        <div className="min-w-0">
                          <span className="block text-[11px] font-bold text-foreground">Assigned Department</span>
                          <h4 className="mt-0.5 text-xs sm:text-sm font-bold text-foreground">{departmentName}</h4>
                          <p className="text-[10px] font-semibold text-[#087b4b]">(Auto-assigned based on issue type)</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => onNavigateStep(1)}
                        className="text-xs font-bold text-[#087b4b] hover:underline shrink-0"
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setConfirmed(!confirmed)}
                    className={`grid size-4.5 shrink-0 place-items-center rounded-md border transition-all ${
                      confirmed ? "border-[#087b4b] bg-[#087b4b] text-white" : "border-border bg-white"
                    }`}
                  >
                    {confirmed && <Check className="size-3 stroke-[3]" />}
                  </button>
                  <label
                    onClick={() => setConfirmed(!confirmed)}
                    className="cursor-pointer text-xs font-semibold text-foreground select-none"
                  >
                    I confirm that the information provided is correct.
                  </label>
                </div>
              </div>

              <div className="mt-8 flex items-center justify-between gap-4 border-t border-border pt-5">
                <button
                  type="button"
                  onClick={onBack}
                  className="flex items-center justify-center rounded-xl border border-border bg-white px-7 py-3 text-xs sm:text-sm font-bold text-foreground hover:bg-muted"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={onContinue}
                  className="flex items-center justify-center gap-2 rounded-xl bg-[#087b4b] px-8 py-3 text-xs sm:text-sm font-bold text-white shadow-sm hover:bg-[#066b41]"
                >
                  Submit Report <ArrowRight className="size-4" />
                </button>
              </div>
            </section>

            <Step4GuidancePanel />
          </div>

          <FeatureStrip />
        </div>
      </main>
    </div>
  )
}

function SubmitSuccessPage({
  reportId,
  issueType,
  description,
  severity,
  location,
  submittedAt,
  onViewReports,
  onTrackReport,
}: {
  reportId: string
  issueType: string
  description: string
  severity: string
  location: { address: string }
  submittedAt: string
  onViewReports: () => void
  onTrackReport: () => void
}) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  const selectedCategory = categories.find((c) => c.id === issueType) || categories[0]
  const departmentName = departmentMap[issueType] || "Public Works Department"

  const handleCopyId = () => {
    if (typeof window !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(reportId)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      {mobileOpen && (
        <button
          aria-label="Close navigation"
          className="fixed inset-0 z-20 bg-foreground/20 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}
      <main className="min-w-0 flex-1 overflow-x-hidden">
        <div className="mx-auto max-w-[1280px] p-4 sm:p-6 lg:p-8 min-w-0">
          {/* Header */}
          <div className="relative flex flex-col items-center justify-center text-center">
            <button
              onClick={onViewReports}
              className="absolute left-0 top-0 flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs sm:text-sm font-semibold text-foreground hover:bg-muted"
            >
              <ArrowLeft className="size-4" />
              Back
            </button>
            <div className="flex items-center gap-2">
              <div className="grid size-7 sm:size-8 place-items-center rounded-xl bg-[#087b4b] text-white">
                <Shield className="size-4.5 fill-current" />
              </div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">Submit an Issue</h1>
            </div>
          </div>

          {/* Stepper */}
          <div className="mt-6 sm:mt-8">
            <Progress active={5} />
          </div>

          {/* Main 2-Column Grid Layout */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px] xl:grid-cols-[minmax(0,1fr)_340px] gap-6 min-w-0">
            {/* Left Success Panel */}
            <section className="relative overflow-hidden rounded-2xl border bg-card p-5 sm:p-8 text-center shadow-[0_2px_12px_rgba(16,33,58,0.03)] min-w-0">
              <CityBackdropIllustration />

              <h2 className="mt-4 text-xl sm:text-3xl font-bold tracking-tight text-foreground">Thank you!</h2>
              <h3 className="mt-1 text-base sm:text-lg font-bold text-[#087b4b]">Your report has been submitted successfully.</h3>
              <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
                We&apos;ve received your report and the concerned team has been notified.
              </p>

              {/* Report ID Box */}
              <div className="mt-5 flex w-full max-w-md items-center justify-center gap-3 rounded-2xl border border-[#acd9bf]/60 bg-[#eefaf3] p-3.5 text-center mx-auto">
                <div>
                  <span className="block text-[10px] sm:text-[11px] font-bold tracking-widest text-muted-foreground uppercase">
                    Your Report ID
                  </span>
                  <div className="mt-0.5 flex items-center justify-center gap-2 font-mono text-lg sm:text-2xl font-bold tracking-widest text-foreground">
                    <span>{reportId}</span>
                    <button
                      type="button"
                      onClick={handleCopyId}
                      title="Copy Report ID"
                      className="rounded-lg p-1 text-muted-foreground hover:bg-[#d9f2e2] hover:text-[#087b4b] transition-colors"
                    >
                      {copied ? <Check className="size-4 text-[#087b4b]" /> : <Copy className="size-4" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Submitted Report Summary Grid */}
              <div className="mt-6 w-full max-w-lg border-t border-border pt-6 text-left mx-auto">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {/* Issue Type */}
                  <div className="flex items-start gap-3 min-w-0">
                    <div className="grid size-9 shrink-0 place-items-center rounded-2xl bg-[#eefaf3] text-[#087b4b]">
                      <Route className="size-4.5" />
                    </div>
                    <div className="min-w-0">
                      <span className="block text-[11px] font-bold text-muted-foreground">Issue Type</span>
                      <span className="text-xs sm:text-sm font-bold text-foreground truncate block">{selectedCategory.title}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="flex items-start gap-3 min-w-0">
                    <div className="grid size-9 shrink-0 place-items-center rounded-2xl bg-[#eefaf3] text-[#087b4b]">
                      <MessageSquare className="size-4.5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="block text-[11px] font-bold text-muted-foreground">Description</span>
                      <p className="text-xs text-foreground leading-relaxed line-clamp-2">{description}</p>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-start gap-3 min-w-0">
                    <div className="grid size-9 shrink-0 place-items-center rounded-2xl bg-[#eefaf3] text-[#087b4b]">
                      <MapPin className="size-4.5 fill-current" />
                    </div>
                    <div className="min-w-0">
                      <span className="block text-[11px] font-bold text-muted-foreground">Location</span>
                      <h4 className="text-xs font-bold text-foreground truncate">{location.address.split("\n")[0]}</h4>
                      <p className="text-[10px] text-muted-foreground truncate">{location.address.split("\n")[1]}</p>
                    </div>
                  </div>

                  {/* Severity */}
                  <div className="flex items-start gap-3 min-w-0">
                    <div className="grid size-9 shrink-0 place-items-center rounded-2xl bg-[#fff5f5] text-[#e53e3e]">
                      <AlertTriangle className="size-4.5" />
                    </div>
                    <div className="min-w-0">
                      <span className="block text-[11px] font-bold text-muted-foreground">Severity</span>
                      <span className="mt-0.5 inline-block rounded-full border border-red-200 bg-red-50 px-2 py-0.5 text-[11px] font-bold text-[#e53e3e] capitalize">
                        {severity}
                      </span>
                    </div>
                  </div>

                  {/* Submitted On */}
                  <div className="flex items-start gap-3 min-w-0">
                    <div className="grid size-9 shrink-0 place-items-center rounded-2xl bg-[#eefaf3] text-[#087b4b]">
                      <Calendar className="size-4.5" />
                    </div>
                    <div className="min-w-0">
                      <span className="block text-[11px] font-bold text-muted-foreground">Submitted On</span>
                      <span className="text-xs font-semibold text-foreground truncate block">{submittedAt}</span>
                    </div>
                  </div>

                  {/* Assigned Department */}
                  <div className="flex items-start gap-3 min-w-0">
                    <div className="grid size-9 shrink-0 place-items-center rounded-2xl bg-[#eefaf3] text-[#087b4b]">
                      <Landmark className="size-4.5" />
                    </div>
                    <div className="min-w-0">
                      <span className="block text-[11px] font-bold text-muted-foreground">Assigned Department</span>
                      <span className="text-xs font-bold text-foreground truncate block">{departmentName}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Primary Action Buttons */}
              <div className="mt-7 flex w-full max-w-md flex-col sm:flex-row items-center justify-center gap-3 border-t border-border pt-5 mx-auto">
                <button
                  type="button"
                  onClick={onViewReports}
                  className="w-full sm:flex-1 flex items-center justify-center gap-2 rounded-xl border border-[#087b4b] bg-white py-3 px-4 font-bold text-[#087b4b] hover:bg-[#eefaf3] text-xs sm:text-sm"
                >
                  <FileText className="size-4" />
                  View My Reports
                </button>
                <button
                  type="button"
                  onClick={onTrackReport}
                  className="w-full sm:flex-1 flex items-center justify-center gap-2 rounded-xl bg-[#087b4b] py-3 px-4 font-bold text-white shadow-sm hover:bg-[#066b41] text-xs sm:text-sm"
                >
                  Track This Report <ArrowRight className="size-4" />
                </button>
              </div>
            </section>

            {/* Right Guidance & Timeline Panel */}
            <Step5RightPanel />
          </div>

          {/* Bottom Impact Section */}
          <BottomImpactStrip />
        </div>
      </main>
    </div>
  )
}

// --- MAIN HOMEPAGE COMPONENT ---
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

  // Generated Report Details upon Submission
  const [submittedReport, setSubmittedReport] = useState<{
    reportId: string
    submittedAt: string
  }>({
    reportId: "CV-8857-2405",
    submittedAt: "May 24, 2025 at 10:30 AM",
  })

  // Reports list state
  const [userReports, setUserReports] = useState(reports)

  const handleFinalSubmit = () => {
    const randomId = `CV-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`
    const now = new Date()
    const formattedDate = now.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })

    setSubmittedReport({
      reportId: randomId,
      submittedAt: formattedDate,
    })

    const selectedCategory = categories.find((c) => c.id === issueType) || categories[0]
    setUserReports((prev) => [
      {
        title: selectedCategory.title,
        address: location.address.split("\n")[0] || "400 Block, Main St.",
        time: "Just now",
        status: "In Progress",
        image: issueType === "roads" ? "road" : issueType === "garbage" ? "trash" : "light",
      },
      ...prev,
    ])

    setReportStep(5)
  }

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
        onContinue={handleFinalSubmit}
        onBack={() => setReportStep(3)}
      />
    )
  }

  if (reportStep === 5) {
    return (
      <SubmitSuccessPage
        reportId={submittedReport.reportId}
        submittedAt={submittedReport.submittedAt}
        issueType={issueType}
        description={description}
        severity={severity}
        location={location}
        onViewReports={() => setReportStep(0)}
        onTrackReport={() => setReportStep(0)}
      />
    )
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      {mobileOpen && (
        <button
          aria-label="Close navigation"
          className="fixed inset-0 z-20 bg-foreground/20 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}
      <main className="min-w-0 flex-1 overflow-x-hidden">
        <div className="mx-auto max-w-[1280px] p-4 sm:p-6 lg:p-8 min-w-0">
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
                <h1 className="text-[26px] sm:text-3xl lg:text-4xl font-bold tracking-tight">Good morning, Mohammed!</h1>
                <p className="mt-1.5 text-sm sm:text-base text-muted-foreground">
                  Let&apos;s make your neighborhood a better place together.
                </p>
              </div>
            </div>
            <button
              onClick={() => setReportStep(1)}
              className="flex shrink-0 items-center gap-2 rounded-2xl bg-[#087b4b] px-4 sm:px-5 py-3 font-bold text-white shadow-sm hover:bg-[#066b41] text-xs sm:text-sm"
            >
              <Plus className="size-4.5" /> <span className="hidden sm:inline">Report an Issue</span>
            </button>
          </header>

          <div className="mt-8 sm:mt-10 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px] xl:grid-cols-[minmax(0,1fr)_340px] gap-6 min-w-0">
            <section className="min-w-0">
              <h2 className="mb-4 sm:mb-5 text-lg sm:text-xl font-bold">What would you like to report?</h2>
              
              {/* Category Cards: 2 spacious columns on desktop/laptop */}
              <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-4 min-w-0">
                {categories.map(({ id, title, text, icon: Icon, tone }) => (
                  <button
                    type="button"
                    onClick={() => {
                      setIssueType(id)
                      setReportStep(1)
                    }}
                    key={id}
                    className="relative flex min-h-[106px] w-full min-w-0 items-start gap-3.5 rounded-2xl border border-border bg-white p-4 text-left shadow-[0_2px_8px_rgba(16,33,58,0.03)] transition-all hover:-translate-y-0.5 hover:border-[#acd9bf] hover:shadow-md"
                  >
                    <span className={`grid size-12 shrink-0 place-items-center rounded-2xl ${toneStyles[tone]}`}>
                      <Icon className="size-6" />
                    </span>
                    <span className="min-w-0 flex-1 overflow-hidden">
                      <strong className="block truncate text-[15px] font-bold leading-6 text-foreground">{title}</strong>
                      <span className="mt-1 block text-xs leading-5 text-muted-foreground break-words">{text}</span>
                    </span>
                  </button>
                ))}
              </div>
              <button
                className="mt-6 flex w-full items-center gap-4 rounded-2xl bg-[#eefaf3] px-5 py-3.5 text-left hover:bg-[#e5f7ec]"
                onClick={() => {
                  setIssueType("roads")
                  setReportStep(1)
                }}
              >
                <LocateFixed className="size-5 text-[#087b4b] shrink-0" />
                <strong className="text-xs sm:text-sm text-[#126f47]">Use my current location</strong>
                <span className="ml-auto hidden text-xs text-muted-foreground sm:block truncate">400 Block, Main St.</span>
              </button>
            </section>

            <RecentReports userReports={userReports} />
          </div>

          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <NearbyMap />
            <Impact />
          </div>

          {notice && (
            <div className="mt-6 flex items-center gap-4 rounded-2xl bg-[#eaf8ef] p-4 sm:p-5">
              <Bell className="size-6 sm:size-7 shrink-0 text-[#2a9d63]" />
              <div className="min-w-0 flex-1">
                <strong className="block text-xs sm:text-sm text-[#126f47]">Stay updated with your reports</strong>
                <p className="mt-0.5 text-xs text-muted-foreground">Enable notifications to get real-time updates on your reported issues.</p>
              </div>
              <button className="hidden rounded-lg bg-[#087b4b] px-6 py-2.5 text-xs font-bold text-white hover:bg-[#066b41] sm:block shrink-0">
                Enable Notifications
              </button>
              <button
                aria-label="Dismiss notification"
                className="p-1 text-muted-foreground hover:text-foreground shrink-0"
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
