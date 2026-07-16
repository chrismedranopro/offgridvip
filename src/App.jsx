import React, { useState, useEffect, useMemo } from "react";
import {
  LayoutGrid, Building2, Users, UserCircle, CalendarDays, ClipboardList,
  SprayCan, Wrench, Compass, TrendingUp, Handshake, BookOpen, FileText,
  Workflow, Bot, BarChart3, Gauge, Settings, Bell, Search, ChevronRight,
  ChevronDown, ArrowUpRight, ArrowDownRight, CheckCircle2, AlertTriangle,
  Circle, Sparkles, Lock, Mail, Eye, EyeOff, Mountain, Radio, Zap,
  MessageSquare, Star, Clock, DollarSign, Home, ShieldCheck, Cpu,
  MapPin, ChevronLeft, Plus, MoreHorizontal, TrendingDown, Key, Camera,
  Route, Wallet, Megaphone, Share2, Target, Briefcase, UserCheck, Award,
  Percent, FileCheck, Banknote, Building, MessageCircle, ListChecks, Medal
} from "lucide-react";
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell,
  RadialBarChart, RadialBar
} from "recharts";

/* ============================================================
   OFF GRID VIP — AI OPERATING SYSTEM
   Future State Vision · Discovery Workshop Prototype

   Design tokens
   Ink        #12181A  (near-black navy-charcoal, primary dark)
   Canvas     #F2F1EC  (cool stone white, content background)
   Forest     #223229  (deep forest green, secondary dark accent)
   Brass      #B8863C  (muted brass/amber, single accent color)
   Ember      #9C4A32  (rare — negative/alert accent, terracotta-adjacent
              but desaturated & only used for status, never decoration)
   Mist       #8C9691  (muted sage-grey, secondary text on light)

   Type
   Display : "Fraunces"       — editorial serif, used sparingly for
             section titles / hero numbers, wide letterspacing on labels
   Body    : "Inter"          — UI text, dense data-safe grotesk
   Data    : "IBM Plex Mono"  — metrics, timestamps, ids, ticker values

   Signature: a faint topographic contour-line watermark (off-grid
   terrain) sits behind the sidebar wordmark and the Vision page hero —
   the one recurring motif tying "off-grid" to the product's visual
   language. Everything else stays quiet and disciplined.
   ============================================================ */

const FONT_IMPORT = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300..700&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap');
`;

const COLORS = {
  ink: "#12181A",
  ink2: "#1B2320",
  canvas: "#F2F1EC",
  canvasDim: "#E9E7DF",
  forest: "#223229",
  brass: "#B8863C",
  brassLight: "#D3AA6C",
  ember: "#9C4A32",
  mist: "#8C9691",
  line: "#DAD8CF",
};

/* ---------------- Topographic watermark (signature element) --------- */
function Topo({ className = "", opacity = 0.08, stroke = COLORS.brass }) {
  const rings = [0, 1, 2, 3, 4, 5, 6];
  return (
    <svg className={className} viewBox="0 0 400 400" fill="none" style={{ opacity }}>
      {rings.map((r) => (
        <path
          key={r}
          d={`M ${20 + r * 8} 200 C ${20 + r * 8} ${100 - r * 6}, ${180 - r * 4} ${20 + r * 4}, ${300 - r * 10} ${40 + r * 10} C ${390 - r * 6} ${60 + r * 8}, ${380 - r * 4} ${220 - r * 6}, ${300 - r * 8} ${300 - r * 8} C ${220 - r * 4} ${380 - r * 8}, ${60 + r * 6} ${360 - r * 4}, ${20 + r * 8} 200 Z`}
          stroke={stroke}
          strokeWidth="1"
        />
      ))}
    </svg>
  );
}

/* ---------------------------- Mock data ------------------------------ */
const occupancyTrend = [
  { m: "Feb", occ: 61, rev: 118 },
  { m: "Mar", occ: 68, rev: 134 },
  { m: "Apr", occ: 72, rev: 149 },
  { m: "May", occ: 79, rev: 171 },
  { m: "Jun", occ: 84, rev: 196 },
  { m: "Jul", occ: 88, rev: 214 },
];

const satisfactionData = [
  { m: "Feb", guest: 4.6, owner: 4.4 },
  { m: "Mar", guest: 4.65, owner: 4.5 },
  { m: "Apr", guest: 4.7, owner: 4.55 },
  { m: "May", guest: 4.8, owner: 4.6 },
  { m: "Jun", guest: 4.86, owner: 4.72 },
  { m: "Jul", guest: 4.9, owner: 4.78 },
];

const bottleneckData = [
  { name: "Turnover cleaning", val: 34 },
  { name: "Maintenance triage", val: 26 },
  { name: "Owner statements", val: 18 },
  { name: "Guest pre-arrival", val: 14 },
  { name: "Vendor invoicing", val: 8 },
];

const vendorPipeline = [
  {
    stage: "Applied",
    items: [
      { id: "elite-cleaning", name: "Elite Cleaning", applied: "2 hours ago", services: "Housekeeping, Turnover Cleaning", coverage: "Lake Tahoe", status: "Applied", reviewer: "Ashley", notes: "Waiting W9.", insurance: "Uploaded", license: "Verified", w9: "Pending", contract: "Not Signed", aiSummary: "Looks qualified. Follow up tomorrow.", moveStage: "Verification" },
      { id: "aspen-catering", name: "Aspen Catering", applied: "Yesterday", services: "Private chef, event catering", coverage: "Aspen", status: "Applied", reviewer: "Corey", notes: "Need insurance docs.", insurance: "Pending", license: "Verified", w9: "Received", contract: "Not Signed", aiSummary: "High-touch category with strong brand fit.", moveStage: "Verification" },
      { id: "luxury-drivers", name: "Luxury Drivers", applied: "Yesterday", services: "Airport transfers, chauffeur cars", coverage: "Lake Tahoe", status: "Applied", reviewer: "Rita", notes: "Check driver insurance expiry.", insurance: "Uploaded", license: "Verified", w9: "Received", contract: "Not Signed", aiSummary: "Service-ready vendor for guest transport.", moveStage: "Verification" },
    ],
  },
  {
    stage: "Verification",
    items: [
      { id: "alpine-jets", name: "Alpine Jets", note: "Waiting Insurance", services: "Private aviation", coverage: "West Coast", status: "Verification", reviewer: "Nina", insurance: "Pending", license: "Verified", w9: "Received", contract: "Not Signed", aiSummary: "Needs insurance validation before approval.", moveStage: "Compliance" },
      { id: "concierge-elite", name: "Concierge Elite", note: "Waiting Interview", services: "Guest host, lifestyle concierge", coverage: "National", status: "Verification", reviewer: "Sam", insurance: "Uploaded", license: "Pending", w9: "Pending", contract: "Not Signed", aiSummary: "Great fit once interview confirms experience.", moveStage: "Compliance" },
    ],
  },
  {
    stage: "Compliance",
    items: [
      { id: "tahoe-spa", name: "Tahoe Spa", note: "Background Check", services: "Spa therapist, massage", coverage: "Lake Tahoe", status: "Compliance", reviewer: "Maya", insurance: "Uploaded", license: "Verified", w9: "Received", contract: "Not Signed", aiSummary: "Strong local partner pending final checks.", moveStage: "Trial" },
      { id: "white-glove-transport", name: "White Glove Transport", note: "Contract Review", services: "Limo, chauffeur", coverage: "San Francisco to Tahoe", status: "Compliance", reviewer: "Elena", insurance: "Uploaded", license: "Verified", w9: "Received", contract: "Under Review", aiSummary: "Premium transport category, contract terms need refinement.", moveStage: "Trial" },
    ],
  },
  {
    stage: "Trial",
    items: [
      { id: "private-chef-group", name: "Private Chef Group", note: "Trial Job", services: "Private chef, dining experiences", coverage: "West Coast", status: "Trial", reviewer: "Nina", insurance: "Uploaded", license: "Verified", w9: "Received", contract: "Signed", aiSummary: "Trial service is on track; ready to approve after guest feedback.", moveStage: "Approved" },
    ],
  },
  {
    stage: "Approved",
    items: [
      { id: "luxury-chauffeurs", name: "Luxury Chauffeurs", note: "Active", services: "Chauffeur and city transport", coverage: "Lake Tahoe", status: "Approved", reviewer: "Rita", insurance: "Uploaded", license: "Verified", w9: "Received", contract: "Signed", aiSummary: "Ready for assignments.", moveStage: null },
      { id: "alpine-maintenance", name: "Alpine Maintenance", note: "Preferred", services: "HVAC, plumbing, electrical", coverage: "Lake Tahoe", status: "Approved", reviewer: "Sam", insurance: "Uploaded", license: "Verified", w9: "Received", contract: "Signed", aiSummary: "Reliable vendor for live portfolio maintenance.", moveStage: null },
    ],
  },
];

const ownerPipeline = [
  {
    stage: "Lead",
    items: [
      { id: "john-smith", name: "John Smith", property: "Villa Aspen", type: "Luxury Cabin", inquiry: "Yesterday", location: "Montana", bedrooms: 6, bathrooms: 5, revenue: "$340,000", pms: "Guesty", source: "Website Form", files: ["Insurance.pdf", "Ownership.pdf", "Images.zip"], notes: "Revenue looks promising.", aiSummary: "Potential flagship property.", stage: "Revenue Projection" },
      { id: "emily-chen", name: "Emily Chen", property: "Beach House", type: "Referral", inquiry: "2 days ago", location: "Malibu", bedrooms: 5, bathrooms: 5, revenue: "$410,000", pms: "Hostaway", source: "Referral", files: ["Assessment.pdf"], notes: "Needs contract terms review.", aiSummary: "High-value referral; move fast.", stage: "Discovery" },
    ],
  },
  {
    stage: "Discovery",
    items: [
      { id: "sophia-vasquez", name: "Sophia Vasquez", property: "Cedar Hollow", type: "Luxury Lodge", inquiry: "3 days ago", location: "Asheville", bedrooms: 8, bathrooms: 7, revenue: "$520,000", pms: "Guesty", source: "Email", files: ["DiscoveryNotes.docx"], notes: "Schedule property assessment.", aiSummary: "Strong ownership alignment.", stage: "Property Assessment" },
    ],
  },
  {
    stage: "Revenue Projection",
    items: [
      { id: "mark-davis", name: "Mark Davis", property: "Canyon Ridge Retreat", type: "Estate", inquiry: "4 days ago", location: "Sedona", bedrooms: 7, bathrooms: 8, revenue: "$625,000", pms: "Airbnb", source: "Phone", files: ["Projection.xlsx"], notes: "Guest demand case is premium.", aiSummary: "Forecast supports luxury pricing strategy.", stage: "Proposal" },
    ],
  },
  {
    stage: "Proposal",
    items: [
      { id: "ana-li", name: "Ana Li", property: "Maison du Lac", type: "Lakefront Villa", inquiry: "6 days ago", location: "Lake Como", bedrooms: 6, bathrooms: 7, revenue: "$720,000", pms: "VRBO", source: "Consult", files: ["Proposal.pdf"], notes: "Owner reviewing revenue share.", aiSummary: "High-value asset, close probability is strong.", stage: "Contract" },
    ],
  },
  {
    stage: "Contract",
    items: [
      { id: "noah-williams", name: "Noah Williams", property: "Mountain Escape", type: "Ski Residence", inquiry: "1 week ago", location: "Aspen", bedrooms: 5, bathrooms: 6, revenue: "$530,000", pms: "Guesty", source: "Broker", files: ["Contract.docx"], notes: "Waiting on signed agreement.", aiSummary: "E-signature reminder recommended.", stage: "Onboarding" },
    ],
  },
  {
    stage: "Onboarding",
    items: [
      { id: "sarah-kim", name: "Sarah Kim", property: "Villa Serenity", type: "Ocean View Villa", inquiry: "2 weeks ago", location: "Malibu", bedrooms: 6, bathrooms: 8, revenue: "$1.2M", pms: "Guesty", source: "Email", files: ["OnboardingChecklist.xlsx"], notes: "Smart home integration underway.", aiSummary: "On track for a premium launch.", stage: "Live Property" },
    ],
  },
  {
    stage: "Live Property",
    items: [
      { id: "claire-ross", name: "Claire Ross", property: "Desert Mirage", type: "Boutique Retreat", inquiry: "Live", location: "Joshua Tree", bedrooms: 4, bathrooms: 5, revenue: "$285,000", pms: "Airbnb", source: "Referral", files: ["WelcomePack.pdf"], notes: "Already in active portfolio.", aiSummary: "Live property; monitor first month pacing.", stage: "Live Property" },
    ],
  },
];

const investorPipeline = [
  {
    stage: "Inquiry",
    items: [
      { id: "family-office-inquiry", name: "Family office inquiry", fund: "Alpine portfolio", status: "Modeling", meta: "Financial model under review", investor: "Family Office", source: "Referral", files: ["Model.xlsx"], notes: "Ask for portfolio underwriting metrics.", aiSummary: "High potential if the underwriting matches the premium pricing case." },
    ],
  },
  {
    stage: "Discovery",
    items: [
      { id: "hnw-referral", name: "High-net-worth referral", fund: "Coastal estates", status: "Due diligence", meta: "Due diligence kick-off", investor: "HNW Individual", source: "Advisor", files: ["DD Checklist.pdf"], notes: "Confirm accreditation and timing.", aiSummary: "Strong fit for hospitality-led investment strategy." },
    ],
  },
  {
    stage: "Investment",
    items: [
      { id: "lake-como-deal", name: "Lake Como asset", fund: "Maison du Lac", status: "Active", meta: "Asset management onboarding", investor: "Family Office", source: "Closed", files: ["ClosingDocs.pdf"], notes: "Set up first investor report schedule.", aiSummary: "This asset is now in the portfolio; focus on yield optimization." },
    ],
  },
  {
    stage: "Financial Modeling",
    items: [
      { id: "marina-complex-model", name: "Marina complex model", fund: "Coastal Ventures", status: "Modeling", meta: "Sensitivity and cash flow scenario building", investor: "Private Equity", source: "Intro", files: ["Model_Master.xlsx"], notes: "Compare A/B pricing and operating assumptions.", aiSummary: "Run a low-occupancy downside case and a premium-hospitality upside case." },
    ],
  },
  {
    stage: "Due Diligence",
    items: [
      { id: "desert-retreat-dd", name: "Desert retreat review", fund: "Sunset Hospitality", status: "Due diligence", meta: "Legal, tax, and site readiness review", investor: "Family Office", source: "Referral", files: ["DD_Ticklist.pdf"], notes: "Verify zoning and service agreements before closing.", aiSummary: "Key risk is permits and service vendor readiness." },
    ],
  },
  {
    stage: "Asset Management",
    items: [
      { id: "alpine-haven-asset", name: "Alpine haven", fund: "Alpine portfolio", status: "Operational", meta: "Performance monitoring and investor reporting", investor: "Family Office", source: "Closed", files: ["Q2_Report.pdf"], notes: "Track guest mix and revenue uplift from new concierge offering.", aiSummary: "Revenue pacing is strong; monitor maintenance expense variance." },
    ],
  },
];

const propertyPipelineStages = [
  {
    stage: "Qualification",
    items: [
      { name: "Villa Serenity", owner: "Michael Hall", bedrooms: 5, location: "Colorado", status: "Qualification" },
      { name: "Casa Solare", owner: "Luca Rinaldi", bedrooms: 4, location: "Sardinia", status: "Qualification" },
    ],
  },
  {
    stage: "Assessment",
    items: [
      { name: "Mountain Escape", owner: "T. Osei", bedrooms: 5, location: "Aspen", status: "Assessment" },
    ],
  },
  {
    stage: "Proposal",
    items: [
      { name: "Urban Penthouse", owner: "S. Kim", bedrooms: 3, location: "New York", status: "Proposal" },
    ],
  },
  {
    stage: "Live",
    items: [
      { name: "The Pinewood Estate", owner: "R. Chen", bedrooms: 6, location: "Lake Tahoe", status: "Live" },
    ],
  },
];

const investorNextActions = {
  Inquiry: "Request underwriting information and confirm investor criteria",
  Discovery: "Complete due diligence and alignment on investment thesis",
  "Financial Modeling": "Review the financial model and stress-test assumptions",
  "Due Diligence": "Finalize legal, tax, and service agreement review",
  Investment: "Schedule investor onboarding and first reporting cadence",
  "Asset Management": "Monitor performance and update the investor on outcomes",
};

const vendorNextActions = {
  Applied: "Collect missing insurance, license or W9 documents",
  Verification: "Confirm licensing, insurance, and service readiness",
  Compliance: "Finalize the contract and quality assurance checks",
  Trial: "Collect feedback from the trial assignment and decide approval",
  Approved: "Assign the vendor to live work orders and monitor performance",
};

const propertyDetails = {
  "Villa Serenity": {
    owner: "M. Whitfield",
    investor: "Private Family Office",
    revenue: "$42,000",
    occupancy: "92%",
    rating: "4.9",
    utilities: "Electric, Solar, Water Monitoring",
    maintenance: "HVAC tune, pool service",
    housekeeping: "Daily turnover, VIP clean only",
    contracts: "Management, vendor retainer, service agreements",
    insurance: "Property insurance on file",
    warranty: "Smart home and spa equipment until 2028",
    photos: 28,
    documents: 12,
    bookings: 14,
    expenses: "$9,800",
    profit: "$32,200",
    openTickets: 2,
    aiRecommendations: "Pre-authorize next guest welcome package; reprofile on guest preference after checkout.",
    inspection: "Friday",
    review: "5.0 ★ last stay",
  },
  "The Pinewood Estate": {
    owner: "R. Chen",
    investor: "Family Office",
    revenue: "$38,400",
    occupancy: "91%",
    rating: "4.8",
    utilities: "Backup generator, solar, water treatment",
    maintenance: "Dock resealing, HVAC diagnostics",
    housekeeping: "Scheduled turnover every 2 days",
    contracts: "Service retainer, guest agreement, owner statement template",
    insurance: "Insurer: Tahoe Coverage",
    warranty: "Sauna heater until 2029",
    photos: 34,
    documents: 15,
    bookings: 12,
    expenses: "$10,200",
    profit: "$28,200",
    openTickets: 1,
    aiRecommendations: "Review HVAC ticket cluster before the next high season stretch.",
    inspection: "Next week",
    review: "4.9 ★ last stay",
  },
};

const activePortfolioProperties = [
  { name: "Villa Serenity", status: "Healthy", occupancy: "92%", revenue: "$42,000", owner: "Michael Hall", openTasks: 2, cleaningToday: "Yes", inspection: "Friday" },
  { name: "The Pinewood Estate", status: "Monitor", occupancy: "91%", revenue: "$38,400", owner: "R. Chen", openTasks: 1, cleaningToday: "Yes", inspection: "Next week" },
  { name: "Desert Mirage", status: "Healthy", occupancy: "88%", revenue: "$30,100", owner: "Claire Ross", openTasks: 0, cleaningToday: "No", inspection: "None" },
];

const ownerPortalSummary = {
  name: "Michael Hall",
  property: "Villa Serenity",
  occupancy: "91%",
  revenue: "$38,400",
  bookings: 14,
  maintenance: "None",
  rating: "4.9",
};

const investorPortalSummary = {
  value: "$5.4M",
  roi: "18.5%",
  occupancy: "88%",
  revenue: "$214k",
  cashFlow: "$78k",
};

const vendorPortalSummary = {
  jobs: 7,
  schedule: "Today: 5 jobs",
  invoices: 3,
  compliance: "92%",
  payments: "$12.4k",
};

const guestPortalSummary = {
  reservation: "Whitmore Lodge · Jul 15–19",
  checkIn: "4:00pm",
  digitalKey: "Ready",
  guide: "Check-in Guide available",
  recommendations: "Private chef, spa, guided hike",
};

const ownerPortal = ownerPortalSummary;
const investorPortal = investorPortalSummary;
const vendorPortal = vendorPortalSummary;
const guestPortal = guestPortalSummary;

const agents = [
  {
    name: "Operations Copilot",
    icon: Cpu,
    purpose: "Keeps daily execution on schedule across every property in the portfolio.",
    responsibilities: ["Sequences same-day turnovers", "Flags at-risk check-ins", "Escalates blocked tasks to a human owner"],
    tools: ["Task Graph", "Property Calendar", "Staff Directory"],
    connected: ["Notion Ops Base", "n8n Workflows", "SMS Gateway"],
    status: "active",
  },
  {
    name: "Owner Relations Agent",
    icon: UserCircle,
    purpose: "Keeps property owners informed without waiting on a monthly cycle.",
    responsibilities: ["Drafts monthly statements", "Summarizes maintenance spend", "Answers routine owner questions"],
    tools: ["Statement Generator", "Revenue Ledger", "Message Composer"],
    connected: ["Accounting System", "Owner Portal", "Email"],
    status: "active",
  },
  {
    name: "Guest Experience Agent",
    icon: MessageSquare,
    purpose: "Responds to guests in the brand's voice, in seconds instead of hours.",
    responsibilities: ["Drafts replies to inquiries", "Routes VIP requests to concierge", "Detects at-risk stays before checkout"],
    tools: ["Reply Composer", "Sentiment Scan", "Escalation Router"],
    connected: ["Guest Messaging", "PMS", "Concierge Queue"],
    status: "active",
  },
  {
    name: "Partner Network Agent",
    icon: Handshake,
    purpose: "Triages the service-provider application funnel across 13 named categories, from private chefs to jet partners.",
    responsibilities: ["Sorts applications by category and market", "Flags missing licensing or insurance documentation", "Surfaces qualified applicants to a department lead"],
    tools: ["Application Triage", "License/Insurance Check", "Category Router"],
    connected: ["Apply-As-Provider Form", "Vendor Directory"],
    status: "planned",
  },
  {
    name: "Maintenance Coordinator",
    icon: Wrench,
    purpose: "Turns a reported issue into a scheduled fix without back-and-forth.",
    responsibilities: ["Triages incoming issues by severity", "Matches issues to the right vendor", "Traces recurring root causes"],
    tools: ["Vendor Directory", "Issue Triage", "Root Cause Log"],
    connected: ["Maintenance Inbox", "Vendor Network", "Owner Notifications"],
    status: "active",
  },
  {
    name: "Finance Assistant",
    icon: DollarSign,
    purpose: "Keeps revenue, payouts, and vendor costs reconciled and explainable.",
    responsibilities: ["Reconciles nightly revenue", "Flags anomalous vendor invoices", "Prepares payout summaries"],
    tools: ["Ledger Sync", "Anomaly Scan", "Payout Builder"],
    connected: ["Accounting System", "Payment Processor"],
    status: "building",
  },
  {
    name: "Knowledge Assistant",
    icon: BookOpen,
    purpose: "Gives every team member an instant, correct answer from the SOP library.",
    responsibilities: ["Answers SOP questions in plain language", "Surfaces the source document", "Flags outdated procedures"],
    tools: ["Semantic Search", "RAG Retrieval", "Document Index"],
    connected: ["Knowledge Base", "Training Library"],
    status: "active",
  },
  {
    name: "Revenue Management Agent",
    icon: BarChart3,
    purpose: "Recommends pricing and channel decisions from real demand data, separate from acquisition strategy.",
    responsibilities: ["Recommends rate adjustments from demand and comp data", "Tracks channel mix and commission cost", "Forecasts demand by market and season"],
    tools: ["Rate Recommendation Engine", "Comp Set Tracker", "Demand Forecaster"],
    connected: ["Booking Calendar", "Channel Manager", "Market Comp Data"],
    status: "building",
  },
  {
    name: "Owner Acquisition Agent",
    icon: Plus,
    purpose: "Pre-populates free revenue audits and tracks referral commissions — the growth engine that brings outside properties into the portfolio.",
    responsibilities: ["Drafts pricing, listing, and comp benchmarks the moment an audit request arrives", "Tracks referral status end-to-end: refer → onboard → paid", "Flags audits at risk of missing the 48-hour promise"],
    tools: ["Audit Draft Generator", "Comp Benchmark", "Referral Payout Tracker"],
    connected: ["Partner-With-Us Form", "Listing Data", "Payout System"],
    status: "building",
  },
  {
    name: "Trust & Discretion Agent",
    icon: ShieldCheck,
    purpose: "Makes discretion a repeatable process for a brand whose product is trust — the most restricted agent in the system.",
    responsibilities: ["Tracks NDA and vetting status", "Monitors confidentiality training compliance", "Surfaces incidents for human response — never resolves one itself"],
    tools: ["NDA Tracker", "Vetting Checklist", "Incident Log"],
    connected: ["Guest Profiles", "Staff Directory", "Legal Document Store"],
    status: "planned",
  },
  {
    name: "Experiential Events Agent",
    icon: Star,
    purpose: "Coordinates the invitation-only activation playbook end-to-end, from vendor stack to timeline.",
    responsibilities: ["Sequences the activation playbook", "Coordinates vendor and transport logistics", "Routes guest list finalization to Trust & Discretion"],
    tools: ["Activation Playbook", "Vendor Stack Tracker", "Credentialing"],
    connected: ["Trust & Discretion Agent", "Partner Network", "Transport Coordination"],
    status: "planned",
  },
  {
    name: "Executive Copilot",
    icon: Sparkles,
    purpose: "Turns the day's operational data into a five-minute morning briefing.",
    responsibilities: ["Writes the daily executive summary", "Surfaces strategic recommendations", "Tracks the business health score"],
    tools: ["Cross-Module Aggregator", "Narrative Generator"],
    connected: ["Every module below"],
    status: "planned",
  },
];

const statusStyle = {
  active: { label: "Active", color: "#3E7A52", bg: "rgba(62,122,82,0.12)" },
  building: { label: "In build", color: COLORS.brass, bg: "rgba(184,134,60,0.14)" },
  planned: { label: "Planned", color: COLORS.mist, bg: "rgba(140,150,145,0.14)" },
};

const navSections = [
  {
    label: "Overview",
    items: [{ id: "dashboard", label: "Executive Dashboard", icon: LayoutGrid }],
  },
  {
    label: "Growth",
    items: [
      { id: "owner-acquisition", label: "Owner Acquisition", icon: Plus },
      { id: "partner-network", label: "Partner Network", icon: Handshake },
      { id: "growthmarketing", label: "Growth & Marketing", icon: Megaphone },
    ],
  },
  {
    label: "Investor Lifecycle",
    items: [
      { id: "investor-relations", label: "Investor Lifecycle", icon: Briefcase },
    ],
  },
  {
    label: "Vendor Lifecycle",
    items: [
      { id: "vendor-recruitment", label: "Vendor Lifecycle", icon: Route },
    ],
  },
  {
    label: "Property Lifecycle",
    items: [
      { id: "pipeline", label: "Property Pipeline", icon: MapPin },
      { id: "onboarding", label: "Property Onboarding", icon: Home },
      { id: "property360", label: "Property 360", icon: Building2 },
      { id: "active-portfolio", label: "Active Portfolio", icon: Users },
    ],
  },
  {
    label: "Guest Experience",
    items: [
      { id: "bookings", label: "Bookings", icon: CalendarDays },
      { id: "guests", label: "Guests", icon: Users },
      { id: "concierge", label: "Concierge", icon: Compass },
      { id: "events", label: "Experiences & Events", icon: Star },
    ],
  },
  {
    label: "Operations",
    items: [
      { id: "housekeeping", label: "Housekeeping", icon: SprayCan },
      { id: "maintenance", label: "Maintenance", icon: Wrench },
      { id: "operations", label: "Field Operations", icon: ClipboardList },
      { id: "sop-center", label: "SOP Center", icon: FileCheck },
    ],
  },
  {
    label: "Financial Operations",
    items: [
      { id: "revenue-intelligence", label: "Revenue Intelligence", icon: BarChart3 },
      { id: "owner-payouts", label: "Owner Payouts", icon: Banknote },
      { id: "vendor-payments", label: "Vendor Payments", icon: Wallet },
      { id: "financial-operations", label: "Financial Operations", icon: Briefcase },
      { id: "forecasting", label: "Forecasting", icon: Gauge },
    ],
  },
  {
    label: "Intelligence",
    items: [
      { id: "knowledge", label: "Knowledge Base", icon: BookOpen },
      { id: "documents", label: "Documents", icon: FileText },
      { id: "automation", label: "Automation Center", icon: Workflow },
      { id: "agents", label: "AI Agents", icon: Bot },
      { id: "reports", label: "Reports", icon: BarChart3 },
      { id: "executive", label: "Executive Intelligence", icon: Gauge },
    ],
  },
  {
    label: "Portals",
    items: [
      { id: "portal-owner", label: "Owner Portal", icon: Briefcase },
      { id: "portal-investor", label: "Investor Portal", icon: Wallet },
      { id: "portal-vendor", label: "Vendor Portal", icon: Route },
      { id: "portal-guest", label: "Guest Portal", icon: Key },
    ],
  },
  {
    label: "System",
    items: [
      { id: "vision", label: "AIOS Vision", icon: Mountain },
      { id: "settings", label: "Settings", icon: Settings },
    ],
  },
];

/* ---------------------------- Shared UI ------------------------------- */

function Eyebrow({ children }) {
  return (
    <div
      className="text-[11px] tracking-[0.16em] uppercase font-medium"
      style={{ color: COLORS.mist, fontFamily: "'IBM Plex Mono', monospace" }}
    >
      {children}
    </div>
  );
}

function PageTitle({ eyebrow, title, sub }) {
  return (
    <div className="mb-8">
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h1
        className="text-[28px] leading-tight mt-1"
        style={{ fontFamily: "'Fraunces', serif", color: COLORS.ink, fontWeight: 500 }}
      >
        {title}
      </h1>
      {sub && <p className="text-sm mt-1.5" style={{ color: COLORS.mist }}>{sub}</p>}
    </div>
  );
}

function Card({ children, className = "", pad = true }) {
  return (
    <div
      className={`rounded-xl bg-white ${pad ? "p-5" : ""} ${className}`}
      style={{ border: `1px solid ${COLORS.line}` }}
    >
      {children}
    </div>
  );
}

function KpiCard({ label, value, delta, positive = true, icon: Icon, mono = true }) {
  return (
    <Card>
      <div className="flex items-start justify-between">
        <Eyebrow>{label}</Eyebrow>
        <Icon size={15} strokeWidth={1.75} style={{ color: COLORS.mist }} />
      </div>
      <div
        className="mt-3 text-[26px]"
        style={{ fontFamily: mono ? "'IBM Plex Mono', monospace" : "'Fraunces', serif", color: COLORS.ink, fontWeight: 500 }}
      >
        {value}
      </div>
      {delta && (
        <div className="mt-2 flex items-center gap-1 text-xs" style={{ color: positive ? "#3E7A52" : COLORS.ember }}>
          {positive ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}
          <span style={{ fontFamily: "'IBM Plex Mono', monospace" }}>{delta}</span>
        </div>
      )}
    </Card>
  );
}

function SectionLabel({ children, action }) {
  return (
    <div className="flex items-center justify-between mb-3">
      <h2 className="text-[15px]" style={{ fontFamily: "'Fraunces', serif", color: COLORS.ink, fontWeight: 500 }}>
        {children}
      </h2>
      {action && <span className="text-xs" style={{ color: COLORS.brass }}>{action}</span>}
    </div>
  );
}

function StatusDot({ tone = "ok" }) {
  const map = { ok: "#3E7A52", warn: COLORS.brass, bad: COLORS.ember, idle: COLORS.mist };
  return <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ background: map[tone] }} />;
}

function Pill({ children, tone = "idle" }) {
  const map = {
    ok: { c: "#3E7A52", bg: "rgba(62,122,82,0.12)" },
    warn: { c: COLORS.brass, bg: "rgba(184,134,60,0.14)" },
    bad: { c: COLORS.ember, bg: "rgba(156,74,50,0.12)" },
    idle: { c: COLORS.mist, bg: "rgba(140,150,145,0.14)" },
  };
  const s = map[tone];
  return (
    <span
      className="text-[11px] px-2 py-0.5 rounded-full font-medium"
      style={{ color: s.c, background: s.bg, fontFamily: "'IBM Plex Mono', monospace" }}
    >
      {children}
    </span>
  );
}

function DetailPanel({ title, onClose, children }) {
  return (
    <div className="fixed right-0 top-0 h-full w-[420px] bg-white shadow-2xl border-l border-gray-200 z-50">
      <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: COLORS.line }}>
        <div>
          <div className="text-xs uppercase tracking-[0.18em]" style={{ color: COLORS.mist, fontFamily: "'IBM Plex Mono', monospace" }}>Detail</div>
          <div className="text-lg font-semibold" style={{ color: COLORS.ink }}>{title}</div>
        </div>
        <button onClick={onClose} className="text-sm text-slate-500">Close</button>
      </div>
      <div className="p-5 overflow-y-auto h-[calc(100%-72px)]">{children}</div>
    </div>
  );
}

/* Generic module page for the many modules the brief lists — keeps a
   consistent operational shell (metrics row + task list + AI panel)
   so every area of the sidebar resolves to a real, on-brand screen. */
function ModulePage({ title, eyebrow, sub, metrics, rows, rowLabel, aiTitle, aiPoints }) {
  return (
    <div>
      <PageTitle eyebrow={eyebrow} title={title} sub={sub} />
      <div className="grid grid-cols-4 gap-4 mb-6">
        {metrics.map((m) => (
          <KpiCard key={m.label} {...m} />
        ))}
      </div>
      <div className="grid grid-cols-3 gap-5">
        <Card className="col-span-2" pad={false}>
          <div className="p-5 pb-3 flex items-center justify-between">
            <SectionLabel>{rowLabel}</SectionLabel>
          </div>
          <div>
            {rows.map((r, i) => (
              <div
                key={i}
                className="flex items-center justify-between px-5 py-3 text-sm"
                style={{ borderTop: `1px solid ${COLORS.line}` }}
              >
                <div className="flex items-center gap-3">
                  <StatusDot tone={r.tone} />
                  <div>
                    <div style={{ color: COLORS.ink }}>{r.title}</div>
                    <div className="text-xs mt-0.5" style={{ color: COLORS.mist }}>{r.meta}</div>
                  </div>
                </div>
                <Pill tone={r.tone}>{r.tag}</Pill>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-2 mb-3">
            <Sparkles size={14} style={{ color: COLORS.brass }} />
            <SectionLabel>{aiTitle}</SectionLabel>
          </div>
          <div className="space-y-3">
            {aiPoints.map((p, i) => (
              <div key={i} className="text-sm leading-relaxed pb-3" style={{ color: COLORS.ink2, borderBottom: i < aiPoints.length - 1 ? `1px solid ${COLORS.line}` : "none" }}>
                {p}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

/* ------------------------------- Pages -------------------------------- */

function Dashboard() {
  return (
    <div>
      <PageTitle
        eyebrow="Executive overview · Tuesday, Jul 14"
        title="Good morning. Here's where the business stands."
        sub="42 active properties · 6 markets · AI Operating System handling 61% of routine coordination today."
      />

      <div className="grid grid-cols-4 gap-4 mb-5">
        <KpiCard label="Check-ins today" value="11" delta="+3 vs avg" icon={Home} />
        <KpiCard label="Check-outs today" value="8" delta="on schedule" icon={Home} />
        <KpiCard label="Occupancy" value="88%" delta="+4pts MoM" icon={Gauge} />
        <KpiCard label="Revenue, MTD" value="$214k" delta="+9.2%" icon={DollarSign} />
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <KpiCard label="Pending maintenance" value="6" delta="2 urgent" positive={false} icon={Wrench} />
        <KpiCard label="Cleaning status" value="34 / 38" delta="on track" icon={SprayCan} />
        <KpiCard label="Owner messages" value="4" delta="avg reply 6m" icon={UserCircle} />
        <KpiCard label="Guest requests" value="9" delta="1 escalated" positive={false} icon={MessageSquare} />
      </div>

      <div className="grid grid-cols-3 gap-5 mb-6">
        <Card className="col-span-2">
          <SectionLabel action="View report">Occupancy & revenue, trailing 6 months</SectionLabel>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={occupancyTrend} margin={{ left: -18, top: 5 }}>
              <defs>
                <linearGradient id="occFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={COLORS.brass} stopOpacity={0.35} />
                  <stop offset="100%" stopColor={COLORS.brass} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke={COLORS.line} vertical={false} />
              <XAxis dataKey="m" tick={{ fontSize: 11, fill: COLORS.mist }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: COLORS.mist }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ fontSize: 12, fontFamily: "Inter", border: `1px solid ${COLORS.line}`, borderRadius: 8 }} />
              <Area type="monotone" dataKey="occ" stroke={COLORS.brass} strokeWidth={2} fill="url(#occFill)" name="Occupancy %" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <div className="flex items-center gap-2 mb-1">
            <Sparkles size={14} style={{ color: COLORS.brass }} />
            <SectionLabel>AI recommendations</SectionLabel>
          </div>
          <div className="space-y-3 text-sm" style={{ color: COLORS.ink2 }}>
            <p className="pb-3" style={{ borderBottom: `1px solid ${COLORS.line}` }}>
              Two Sedona properties show back-to-back same-day turnovers this weekend with only one cleaning crew assigned — recommend adding a second crew Saturday.
            </p>
            <p className="pb-3" style={{ borderBottom: `1px solid ${COLORS.line}` }}>
              Maintenance cost on the Canyon Ridge unit is trending 3x above portfolio average — likely a recurring root cause worth investigating before the next booking cycle.
            </p>
            <p>Owner statement for J. Alvarez is ready for review — flagged one unusual vendor charge for confirmation before sending.</p>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-3 gap-5">
        <Card>
          <SectionLabel>Automation health</SectionLabel>
          <div className="flex items-center gap-4">
            <ResponsiveContainer width={100} height={100}>
              <RadialBarChart innerRadius="70%" outerRadius="100%" data={[{ value: 94, fill: COLORS.brass }]} startAngle={90} endAngle={-270}>
                <RadialBar dataKey="value" cornerRadius={20} background={{ fill: COLORS.canvasDim }} />
              </RadialBarChart>
            </ResponsiveContainer>
            <div>
              <div className="text-2xl" style={{ fontFamily: "'IBM Plex Mono', monospace", color: COLORS.ink }}>94%</div>
              <div className="text-xs" style={{ color: COLORS.mist }}>128 of 136 workflows healthy today</div>
            </div>
          </div>
        </Card>

        <Card>
          <SectionLabel>Today's priorities</SectionLabel>
          <div className="space-y-2.5 text-sm">
            {[
              "Confirm second cleaning crew — Sedona weekend turnovers",
              "Approve Canyon Ridge maintenance root-cause review",
              "Reply to VIP concierge request, Whitmore party",
            ].map((t, i) => (
              <div key={i} className="flex items-center gap-2.5">
                <Circle size={13} style={{ color: COLORS.brass }} />
                <span style={{ color: COLORS.ink2 }}>{t}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <SectionLabel>Daily executive summary</SectionLabel>
          <p className="text-sm leading-relaxed" style={{ color: COLORS.ink2 }}>
            Occupancy and revenue are both ahead of plan for July. Field operations are healthy outside one recurring
            maintenance pattern at Canyon Ridge. Guest and owner satisfaction both ticked up this week — no escalations
            require your attention beyond the Whitmore concierge request.
          </p>
        </Card>
      </div>
    </div>
  );
}

const realProperties = [
  { name: "Villa Serenity", loc: "Malibu, California", tag: "Ocean View · Private Pool", price: "$4,200" },
  { name: "Mountain Escape", loc: "Aspen, Colorado", tag: "Ski Access · Hot Tub", price: "$5,400" },
  { name: "Urban Penthouse", loc: "Manhattan, New York", tag: "City View · Rooftop Terrace", price: "$3,100" },
  { name: "Casa Solare", loc: "Costa Smeralda, Sardinia", tag: "Private Cove · Infinity Pool", price: "$4,200" },
  { name: "Maison du Lac", loc: "Lake Como, Italy", tag: "Private Dock · Butler Service", price: "$5,400" },
  { name: "Desert Mirage", loc: "Joshua Tree, California", tag: "Heated Pool · Outdoor Cinema", price: "$1,950" },
  { name: "The Pinewood Estate", loc: "Lake Tahoe, Nevada", tag: "Private Pier · Forest Spa", price: "$2,950" },
];

function Properties({ onOpenProperty }) {
  return (
    <div>
      <PageTitle
        eyebrow="Portfolio · 7 flagship residences"
        title="Properties"
        sub="A boutique, curated collection — Malibu to Lake Como — priced from $1,950 to $5,400 per night"
      />
      <div className="grid grid-cols-4 gap-4 mb-6">
        <KpiCard label="Avg. health score" value="91" icon={ShieldCheck} />
        <KpiCard label="Avg. ADR vs. market" value="+21%" icon={Gauge} delta="stated proof point" />
        <KpiCard label="Avg. nightly rate" value="$3,886" icon={DollarSign} mono={false} />
        <KpiCard label="Open work orders" value="6" icon={Wrench} positive={false} delta="2 urgent" />
      </div>
      <div className="grid grid-cols-3 gap-4 mb-6">
        {realProperties.map((p) => (
          <Card key={p.name}>
            <div className="text-sm font-medium" style={{ color: COLORS.ink }}>{p.name}</div>
            <div className="text-xs mt-0.5 flex items-center gap-1" style={{ color: COLORS.mist }}>
              <MapPin size={11} /> {p.loc}
            </div>
            <div className="text-xs mt-2" style={{ color: COLORS.mist }}>{p.tag}</div>
            <div className="mt-3 pt-3 flex items-center justify-between" style={{ borderTop: `1px solid ${COLORS.line}` }}>
              <span className="text-sm" style={{ fontFamily: "'IBM Plex Mono', monospace", color: COLORS.ink }}>{p.price}<span className="text-xs" style={{ color: COLORS.mist }}>/night</span></span>
              <Pill tone="ok">Healthy</Pill>
            </div>
            <button
              onClick={() => onOpenProperty && onOpenProperty(p.name)}
              className="mt-4 w-full rounded-lg py-2 text-sm font-medium"
              style={{ background: COLORS.forest, color: COLORS.canvas }}
            >
              Open Property 360
            </button>
          </Card>
        ))}
      </div>
      <Card>
        <div className="flex items-center gap-2 mb-2">
          <Sparkles size={14} style={{ color: COLORS.brass }} />
          <SectionLabel>Property intelligence</SectionLabel>
        </div>
        <p className="text-sm leading-relaxed" style={{ color: COLORS.ink2 }}>
          The Pinewood Estate's health score has dropped slightly this month on a recurring HVAC ticket — worth a root-cause
          review before the next booking cycle. The other six properties are holding or exceeding their individual ADR
          targets against the portfolio-wide 21% premium.
        </p>
      </Card>
    </div>
  );
}

function Owners() {
  return (
    <ModulePage
      eyebrow="Portfolio"
      title="Owners"
      sub="“Passive Income, Active Excellence” — turnkey management delivering 21% higher ADR than market average"
      metrics={[
        { label: "Owner satisfaction", value: "4.78", icon: Star, delta: "+0.06" },
        { label: "ADR vs. market", value: "+21%", icon: TrendingUp },
        { label: "Statements ready", value: "5", icon: FileText },
        { label: "Renewals, next 90d", value: "2", icon: CalendarDays },
      ]}
      rowLabel="Owner queue"
      rows={[
        { title: "Villa Serenity — Malibu, CA", meta: "Statement drafted, one charge flagged for review", tag: "Needs review", tone: "warn" },
        { title: "Maison du Lac — Lake Como, IT", meta: "Renewal conversation due in 14 days", tag: "Renewal", tone: "idle" },
        { title: "Mountain Escape — Aspen, CO", meta: "Asked about Q3 revenue projection", tag: "Message", tone: "ok" },
      ]}
      aiTitle="Owner relations summary"
      aiPoints={[
        "Owner satisfaction is up for the third consecutive month, tracking alongside the portfolio's stated 21% ADR premium over market — the Owner Relations Agent surfaces that number directly in every statement narrative.",
        "One statement has an unusual vendor charge flagged for confirmation before sending.",
      ]}
    />
  );
}

function Guests() {
  return (
    <ModulePage
      eyebrow="Portfolio"
      title="Guests"
      sub="27 active or upcoming stays"
      metrics={[
        { label: "Guest satisfaction", value: "4.90", icon: Star, delta: "+0.04" },
        { label: "Open requests", value: "9", icon: MessageSquare },
        { label: "Escalations", value: "1", icon: AlertTriangle, positive: false },
        { label: "Reviews this week", value: "14", icon: Star },
      ]}
      rowLabel="Guest timeline — attention needed"
      rows={[
        { title: "Whitmore party · Big Sky Lodge", meta: "VIP request: private chef, tonight 7pm", tag: "Escalated", tone: "bad" },
        { title: "Kessler family · Cedar Hollow Cabin", meta: "Asked about early check-in tomorrow", tag: "Draft ready", tone: "warn" },
        { title: "Nguyen party · Salt Flat House", meta: "5-star review submitted", tag: "Reviewed", tone: "ok" },
      ]}
      aiTitle="AI draft replies"
      aiPoints={[
        "A reply to the Kessler family's early check-in request is drafted in the brand voice and ready to send — housekeeping confirms the unit will be ready by 11am.",
        "Sentiment scan flagged the Whitmore party's message as time-sensitive; routed directly to the concierge queue rather than the general inbox.",
      ]}
    />
  );
}

function Bookings() {
  return (
    <ModulePage
      eyebrow="Portfolio"
      title="Bookings"
      sub="Calendar, pricing, and reservation flow"
      metrics={[
        { label: "Reservations, MTD", value: "96", icon: CalendarDays },
        { label: "Avg. length of stay", value: "3.8n", icon: Clock },
        { label: "Booking lead time", value: "24d", icon: Clock },
        { label: "Repeat guest rate", value: "22%", icon: Users },
      ]}
      rowLabel="Upcoming arrivals"
      rows={[
        { title: "Whitmore party", meta: "Big Sky Lodge · arrives today, 3:00pm", tag: "Today", tone: "warn" },
        { title: "Delacroix party", meta: "Salt Flat House · arrives tomorrow", tag: "Confirmed", tone: "ok" },
        { title: "Osei party", meta: "Cedar Hollow Cabin · arrives Thursday", tag: "Confirmed", tone: "ok" },
      ]}
      aiTitle="Booking intelligence"
      aiPoints={[
        "Weekend demand in Moab is running ahead of current pricing — a rate adjustment on Salt Flat House could capture an estimated $1,800 in additional revenue this month.",
      ]}
    />
  );
}

function Operations() {
  return (
    <ModulePage
      eyebrow="Field operations"
      title="Operations"
      sub="Daily execution across every property and team"
      metrics={[
        { label: "Active tasks", value: "47", icon: ClipboardList },
        { label: "Blocked tasks", value: "3", icon: AlertTriangle, positive: false },
        { label: "On-time rate", value: "96%", icon: CheckCircle2 },
        { label: "Staff on shift", value: "18", icon: Users },
      ]}
      rowLabel="Operational bottlenecks today"
      rows={bottleneckData.map((b, i) => ({
        title: b.name,
        meta: `${b.val}% of today's coordination load`,
        tag: i === 0 ? "Highest load" : "Tracked",
        tone: i === 0 ? "warn" : "idle",
      }))}
      aiTitle="AI operational suggestions"
      aiPoints={[
        "Turnover cleaning is the largest source of coordination load again this week — the Automation Center shows two crews near capacity; consider rebalancing Saturday's assignments.",
        "Maintenance triage response time improved 22% since root-cause tracking was added last month.",
      ]}
    />
  );
}

function Housekeeping() {
  return (
    <ModulePage
      eyebrow="Field operations"
      title="Housekeeping"
      sub="38 units in rotation today"
      metrics={[
        { label: "Completed today", value: "34 / 38", icon: SprayCan },
        { label: "Avg. turn time", value: "1h 42m", icon: Clock },
        { label: "Quality checks passed", value: "97%", icon: CheckCircle2 },
        { label: "Crews active", value: "6", icon: Users },
      ]}
      rowLabel="Cleaning schedule — prioritized by AI"
      rows={[
        { title: "Whitmore Lodge", meta: "Same-day turnover · guest arrives 3pm", tag: "Priority 1", tone: "bad" },
        { title: "Cedar Hollow Cabin", meta: "Standard turnover · guest arrives tomorrow", tag: "On schedule", tone: "ok" },
        { title: "Canyon Ridge Retreat", meta: "Deep clean requested post-maintenance visit", tag: "Priority 2", tone: "warn" },
      ]}
      aiTitle="AI prioritization"
      aiPoints={[
        "Whitmore Lodge is resequenced to the top of today's queue — same-day turnover with a 3pm arrival leaves the least buffer of any property today.",
      ]}
    />
  );
}

function Maintenance() {
  return (
    <ModulePage
      eyebrow="Field operations"
      title="Maintenance"
      sub="6 open issues across the portfolio"
      metrics={[
        { label: "Open issues", value: "6", icon: Wrench },
        { label: "Urgent", value: "2", icon: AlertTriangle, positive: false },
        { label: "Avg. cost / ticket", value: "$310", icon: DollarSign },
        { label: "Pending approvals", value: "2", icon: ClipboardList },
      ]}
      rowLabel="Open issues"
      rows={[
        { title: "HVAC — Canyon Ridge Retreat", meta: "3rd ticket on same unit in 60 days", tag: "Root cause", tone: "bad" },
        { title: "Pool heater — Whitmore Lodge", meta: "Vendor scheduled, tomorrow AM", tag: "Scheduled", tone: "warn" },
        { title: "Deck railing — Cedar Hollow Cabin", meta: "Awaiting owner approval, $420 estimate", tag: "Approval", tone: "idle" },
      ]}
      aiTitle="AI root cause analysis"
      aiPoints={[
        "The Canyon Ridge HVAC unit has been serviced three times in 60 days for similar symptoms — pattern suggests a failing component rather than three unrelated issues; recommend a full diagnostic rather than another spot repair.",
      ]}
    />
  );
}

function Concierge() {
  return (
    <ModulePage
      eyebrow="Field operations"
      title="Concierge"
      sub="The Concierge Network — “Elevate Every Moment”: private jets to personal chefs, curated for the most discerning clientele"
      metrics={[
        { label: "Active requests", value: "3", icon: Star },
        { label: "Network services", value: "7", icon: Compass },
        { label: "Avg. response time", value: "4m", icon: Clock },
        { label: "Satisfaction", value: "4.95", icon: Star },
      ]}
      rowLabel="Concierge Network — named services"
      rows={[
        { title: "Private Chef Dining", meta: "In-residence multi-course meals, curated menus, wine pairings", tag: "Active", tone: "ok" },
        { title: "Luxury Sprinter Van with Chauffeur", meta: "Executive transport for airport transfers, city tours, groups", tag: "Active", tone: "ok" },
        { title: "Yacht & Boat Charters", meta: "Half/full-day, captains and catering — coastal markets", tag: "Active", tone: "ok" },
        { title: "Private Jet Booking", meta: "Light, midsize, and long-range aircraft via aviation partners", tag: "Active", tone: "ok" },
        { title: "Exotic Car Rentals", meta: "McLarens, Lamborghinis, and more", tag: "Active", tone: "ok" },
        { title: "VIP Events & Nightlife", meta: "Reserved tables at exclusive venues", tag: "Active", tone: "ok" },
        { title: "Personal Training & Wellness", meta: "In-villa sessions and spa services", tag: "Active", tone: "ok" },
      ]}
      aiTitle="Concierge notes"
      aiPoints={[
        "Tonight's private chef request at the Malibu residence came in through the general guest inbox and was auto-routed to the Concierge Network based on the VIP flag on the reservation.",
        "The Concierge Network functions more like a curated partner marketplace than an internal task list — each service line has its own vendor stack worth tracking separately.",
      ]}
    />
  );
}

function RevenueManagement() {
  return (
    <ModulePage
      eyebrow="Growth · New department"
      title="Revenue Management & Distribution"
      sub="Pricing, channel mix, and demand forecasting — separated from Investment so day-to-day rate strategy has its own owner"
      metrics={[
        { label: "RevPAR, MTD", value: "$538", icon: DollarSign, delta: "+7.4%" },
        { label: "Rate capture vs. comp set", value: "104%", icon: Gauge },
        { label: "Channel mix (direct)", value: "31%", icon: BarChart3, delta: "+5pts" },
        { label: "Pending rate reviews", value: "4", icon: ClipboardList },
      ]}
      rowLabel="Recommended rate actions"
      rows={[
        { title: "Salt Flat House · Moab, UT", meta: "Weekend demand outpacing current rate by ~12%", tag: "Recommend +$45/nt", tone: "warn" },
        { title: "Whitmore Lodge · Big Sky, MT", meta: "Peak season window opens in 18 days", tag: "Review", tone: "idle" },
        { title: "Cedar Hollow Cabin · Asheville, NC", meta: "Holding steady vs. comp set", tag: "No action", tone: "ok" },
      ]}
      aiTitle="Revenue Management Agent"
      aiPoints={[
        "Recommends pricing and channel adjustments from demand and comp data — every live rate change above the approved band still requires sign-off before it goes out.",
        "Direct booking share is up 5 points this quarter, reducing blended channel commission costs across the portfolio.",
      ]}
    />
  );
}

function ExperientialEvents() {
  return (
    <ModulePage
      eyebrow="Growth · New department"
      title="Experiential & Events Hospitality"
      sub="Invitation-only activations — separated from standard Concierge given their distinct vendor stack, vetting, and brand consequence"
      metrics={[
        { label: "Active activations", value: "1", icon: Star },
        { label: "Guests per activation (cap)", value: "246", icon: Users },
        { label: "Vendor stack, this event", value: "9", icon: Handshake },
        { label: "Days to next activation", value: "18", icon: CalendarDays },
      ]}
      rowLabel="Activation playbook status"
      rows={[
        { title: "Guest list vetting", meta: "Owned by Trust, Discretion & Risk", tag: "In progress", tone: "warn" },
        { title: "Transport & credentialing", meta: "Dedicated VIP transfers confirmed", tag: "Confirmed", tone: "ok" },
        { title: "Vendor stack (catering, security, staging)", meta: "9 of 9 vendors confirmed", tag: "Ready", tone: "ok" },
      ]}
      aiTitle="Experiential Events Agent"
      aiPoints={[
        "Coordinates the activation playbook end-to-end — vendors, transport, and timeline — but guest list finalization always routes through Trust, Discretion & Risk and executive sign-off before it's locked.",
        "This activation's cost-per-guest is tracking 6% under the last comparable event, driven by earlier vendor confirmation this cycle.",
      ]}
    />
  );
}

function Investment() {
  const journeySteps = [
    {
      step: "01",
      title: "Discovery Call",
      description: "Connect with our investment advisors to understand your financial goals, tax situation, and investment criteria.",
    },
    {
      step: "02",
      title: "Market Analysis",
      description: "Receive detailed market reports on the highest-performing vacation rental markets tailored to your objectives.",
    },
    {
      step: "03",
      title: "Property Sourcing",
      description: "Our network of exclusive real estate agents identifies investment-grade properties before they hit the market.",
    },
    {
      step: "04",
      title: "Tax Strategy",
      description: "Work with our tax advisors to maximize deductions through cost segregation studies and bonus depreciation.",
    },
    {
      step: "05",
      title: "Acquisition & Setup",
      description: "We handle due diligence, closing, furnishing, photography, and listing optimization — 100% turnkey.",
    },
    {
      step: "06",
      title: "Ongoing Management",
      description: "Sit back and collect revenue while we manage operations, guests, maintenance, and maximize your ROI.",
    },
  ];

  const auditCards = [
    {
      title: "Revenue Optimization",
      description: "We benchmark pricing, occupancy, and channel mix to surface untapped revenue.",
      icon: TrendingUp,
    },
    {
      title: "Listing & Brand Polish",
      description: "Photography, copy, and positioning audited against the luxury market standard.",
      icon: Sparkles,
    },
    {
      title: "Guest Experience Review",
      description: "Amenities, service flow, and reviews assessed for repeat-stay potential.",
      icon: Star,
    },
    {
      title: "Market Comps",
      description: "A clear read on how your property performs versus comparable luxury homes.",
      icon: BarChart3,
    },
  ];

  return (
    <div>
      <PageTitle
        eyebrow="Investment"
        title="Your Investment Journey."
        sub="A seamless, turnkey process from consultation to cash flow."
      />

      <div className="grid grid-cols-2 gap-5 mb-8">
        <Card className="col-span-2 p-8" style={{ background: COLORS.ink, color: COLORS.canvas }}>
          <h2 className="text-2xl font-semibold" style={{ fontFamily: "'Fraunces', serif" }}>
            Invest smarter with a fully managed luxury rental investment service.
          </h2>
          <p className="mt-4 text-sm leading-relaxed" style={{ color: "rgba(242,241,236,0.85)" }}>
            From audit and sourcing through acquisition, setup, and operations, we manage the entire lifecycle under one executive umbrella.
          </p>
        </Card>
      </div>

      <div className="grid grid-cols-3 gap-5 mb-8">
        {journeySteps.map((item) => (
          <Card key={item.step} className="p-6">
            <div className="flex items-start gap-4 mb-4">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold"
                style={{ background: COLORS.brassLight, color: COLORS.ink, fontFamily: "'IBM Plex Mono', monospace" }}
              >
                {item.step}
              </div>
              <div>
                <div className="text-lg font-semibold" style={{ color: COLORS.ink }}>{item.title}</div>
                <p className="text-sm mt-2 leading-relaxed" style={{ color: COLORS.ink2 }}>{item.description}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="text-center mb-5">
        <h2 className="text-xl font-semibold" style={{ fontFamily: "'Fraunces', serif", color: COLORS.ink }}>
          What Your Free Audit Covers
        </h2>
        <p className="mt-3 text-sm leading-relaxed max-w-3xl mx-auto" style={{ color: COLORS.ink2 }}>
          We review the property's current performance or projected income — pricing, photos, listing quality, guest experience, amenities, and market comps — then identify what could be improved to increase bookings, revenue, and owner experience.
        </p>
      </div>

      <div className="grid grid-cols-4 gap-5">
        {auditCards.map((card) => {
          const Icon = card.icon;
          return (
            <Card key={card.title} className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="text-sm font-semibold" style={{ color: COLORS.ink }}>{card.title}</div>
                <Icon size={20} style={{ color: COLORS.brass }} />
              </div>
              <p className="text-sm leading-relaxed" style={{ color: COLORS.ink2 }}>{card.description}</p>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

function OwnerAcquisition() {
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);
  const totals = ownerPipeline.reduce((acc, stage) => {
    acc.total += stage.items.length;
    if (["Discovery", "Revenue Projection", "Proposal", "Contract", "Onboarding", "Live Property"].includes(stage.stage)) {
      acc.qualified += stage.items.length;
    }
    if (stage.stage === "Proposal") acc.proposals = stage.items.length;
    if (stage.stage === "Onboarding") acc.onboarding = stage.items.length;
    return acc;
  }, { total: 0, qualified: 0, proposals: 0, onboarding: 0 });

  return (
    <div className="relative">
      <PageTitle
        eyebrow="Growth"
        title="Owner Acquisition"
        sub="Lead → Qualification → Discovery → Property Assessment → Revenue Projection → Proposal → Contract → Onboarding → Active Portfolio"
      />
      <div className="grid grid-cols-4 gap-4 mb-6">
        <KpiCard label="Leads in pipeline" value={totals.total} icon={Users} />
        <KpiCard label="Qualified opportunities" value={totals.qualified} icon={CheckCircle2} />
        <KpiCard label="Proposals pending" value={totals.proposals} icon={FileText} />
        <KpiCard label="Onboarding starts" value={totals.onboarding} icon={Home} />
      </div>
      <div className="grid grid-cols-5 gap-4 mb-6">
        {ownerPipeline.map((stage) => (
          <Card key={stage.stage} className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-sm font-medium" style={{ color: COLORS.ink }}>{stage.stage}</div>
                <div className="text-xs" style={{ color: COLORS.mist }}>{stage.items.length} item{stage.items.length !== 1 ? "s" : ""}</div>
              </div>
              <Pill tone={stage.items.length ? "ok" : "idle"}>{stage.items.length ? "Live" : "Empty"}</Pill>
            </div>
            <div className="space-y-3">
              {stage.items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSelectedOpportunity({ ...item, currentStage: stage.stage })}
                  className="w-full text-left rounded-xl p-3 border bg-white hover:bg-[#f3f1ec]"
                  style={{ borderColor: COLORS.line }}
                >
                  <div className="text-sm font-medium" style={{ color: COLORS.ink }}>{item.name}</div>
                  <div className="text-xs mt-1" style={{ color: COLORS.mist }}>{item.property} · {item.location}</div>
                  <div className="text-xs mt-2" style={{ color: COLORS.brass }}>{item.notes}</div>
                </button>
              ))}
            </div>
          </Card>
        ))}
      </div>
      <Card>
        <SectionLabel>Owner acquisition insights</SectionLabel>
        <p className="text-sm leading-relaxed" style={{ color: COLORS.ink2 }}>
          This view surfaces the acquisition funnel as record-based stages instead of a static summary. Each opportunity opens a detail panel with revenue, property profile, and AI recommendations.
        </p>
      </Card>

      {selectedOpportunity && (
        <DetailPanel title={selectedOpportunity.name} onClose={() => setSelectedOpportunity(null)}>
          <InfoList title="Opportunity summary" items={[
            { label: "Property", value: selectedOpportunity.property },
            { label: "Type", value: selectedOpportunity.type },
            { label: "Location", value: selectedOpportunity.location },
            { label: "Current stage", value: selectedOpportunity.currentStage || selectedOpportunity.stage },
            { label: "Projected revenue", value: selectedOpportunity.revenue },
            { label: "Inquiry source", value: selectedOpportunity.source },
          ]} />
          <Card className="mt-4">
            <SectionLabel>Sales & onboarding status</SectionLabel>
            <div className="space-y-2 mt-3 text-sm" style={{ color: COLORS.ink2 }}>
              <div className="flex items-center justify-between"><span>Property management</span><span>{selectedOpportunity.pms}</span></div>
              <div className="flex items-center justify-between"><span>Files attached</span><span>{selectedOpportunity.files.length}</span></div>
              <div className="flex items-center justify-between"><span>Notes</span><span>{selectedOpportunity.notes}</span></div>
            </div>
          </Card>
          <Card className="mt-4">
            <SectionLabel>Files</SectionLabel>
            <div className="space-y-2 mt-3 text-sm" style={{ color: COLORS.ink2 }}>
              {selectedOpportunity.files.map((file) => (
                <div key={file} className="flex items-center justify-between">
                  <span>{file}</span>
                  <Pill tone="ok">Available</Pill>
                </div>
              ))}
            </div>
          </Card>
          <Card className="mt-4">
            <SectionLabel>AI recommendation</SectionLabel>
            <p className="text-sm" style={{ color: COLORS.ink2 }}>{selectedOpportunity.aiSummary}</p>
          </Card>
        </DetailPanel>
      )}
    </div>
  );
}

function InvestorRelations() {
  const [selectedInvestor, setSelectedInvestor] = useState(null);
  const [tab, setTab] = useState("pipeline");

  const investorList = investorPipeline.flatMap((stage) =>
    stage.items.map((item) => ({ ...item, stage: stage.stage }))
  );

  const totals = investorPipeline.reduce((acc, stage) => {
    acc.total += stage.items.length;
    if (stage.stage === "Discovery") acc.discovery += stage.items.length;
    if (stage.stage === "Investment") acc.active += stage.items.length;
    return acc;
  }, { total: 0, discovery: 0, active: 0 });

  return (
    <div className="relative">
      <PageTitle
        eyebrow="Growth"
        title="Investor Lifecycle"
        sub="Inquiry → Discovery → Financial Modeling → Due Diligence → Investment → Asset Management"
      />
      <TabBar
        tabs={[
          { id: "pipeline", label: "Pipeline" },
          { id: "records", label: "Investor records" },
          { id: "insights", label: "Lifecycle insights" },
        ]}
        active={tab}
        onChange={setTab}
      />

      {tab === "pipeline" && (
        <>
          <div className="grid grid-cols-4 gap-4 mb-6">
            <KpiCard label="Investor records" value={totals.total} icon={Briefcase} />
            <KpiCard label="Discovery conversations" value={totals.discovery} icon={Bell} />
            <KpiCard label="Active investments" value={totals.active} icon={Banknote} />
            <KpiCard label="Models in review" value="4" icon={BarChart3} />
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6">
            {investorPipeline.map((stage) => (
              <Card key={stage.stage} className="p-4">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="text-[11px] uppercase tracking-[0.24em] font-semibold" style={{ color: COLORS.forest }}>{stage.stage}</div>
                    <div className="text-xs mt-1" style={{ color: COLORS.mist }}>{stage.items.length} active record{stage.items.length !== 1 ? "s" : ""}</div>
                  </div>
                  <Pill tone={stage.items.length ? "ok" : "idle"}>{stage.items.length ? "Live" : "Empty"}</Pill>
                </div>

                <div className="space-y-3">
                  {stage.items.length ? stage.items.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setSelectedInvestor({ ...item, currentStage: stage.stage })}
                      className="w-full text-left rounded-2xl p-4 border bg-white hover:bg-[#f3f1ec] transition"
                      style={{ borderColor: COLORS.line }}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <div className="text-sm font-semibold" style={{ color: COLORS.ink }}>{item.name}</div>
                          <div className="text-xs mt-1" style={{ color: COLORS.mist }}>{item.fund} · {item.investor}</div>
                        </div>
                        <div className="text-[11px] font-semibold uppercase" style={{ color: COLORS.brass }}>{item.status}</div>
                      </div>
                      <div className="text-xs mt-3" style={{ color: COLORS.brass }}>{item.meta}</div>
                      <div className="text-[11px] mt-3 uppercase tracking-[0.18em] font-medium" style={{ color: COLORS.mist }}>
                        {investorNextActions[stage.stage]}
                      </div>
                      <div className="mt-4 flex items-center justify-between text-[11px] uppercase tracking-[0.18em] font-medium" style={{ color: COLORS.mist }}>
                        <span>View details</span>
                        <span style={{ color: COLORS.forest }}>Open</span>
                      </div>
                    </button>
                  )) : (
                    <div className="rounded-2xl border border-dashed border-[#d3cebf] bg-[#f8f6f1] p-6 text-center text-sm" style={{ color: COLORS.mist }}>
                      No active deals in this stage yet.
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>

          <Card className="mb-6 p-5">
            <SectionLabel>Investor pipeline visibility</SectionLabel>
            <p className="text-sm leading-relaxed" style={{ color: COLORS.ink2 }}>
              Stage-based investor pipeline visibility helps the executive team see where each deal sits in the business model. Click a record to open the investor details, review funding status, diligence notes, and next actions.
            </p>
          </Card>
        </>
      )}

      {tab === "records" && (
        <>
          <div className="grid grid-cols-4 gap-4 mb-6">
            <KpiCard label="Investor records" value={totals.total} icon={Briefcase} />
            <KpiCard label="Discovery conversations" value={totals.discovery} icon={Bell} />
            <KpiCard label="Active investments" value={totals.active} icon={Banknote} />
            <KpiCard label="Models in review" value="4" icon={BarChart3} />
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <Card className="col-span-2">
              <SectionLabel>Investor record directory</SectionLabel>
              <div className="space-y-3 mt-3">
                {investorList.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedInvestor(item)}
                    className="w-full text-left rounded-2xl p-4 border bg-white hover:bg-[#f3f1ec] transition"
                    style={{ borderColor: COLORS.line }}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <div className="text-sm font-semibold" style={{ color: COLORS.ink }}>{item.name}</div>
                        <div className="text-xs mt-1" style={{ color: COLORS.mist }}>{item.fund} · {item.investor}</div>
                      </div>
                      <Pill tone={item.stage === "Investment" ? "ok" : item.stage === "Due Diligence" ? "warn" : "idle"}>{item.stage}</Pill>
                    </div>
                    <div className="text-xs mt-3" style={{ color: COLORS.brass }}>{item.meta}</div>
                    <div className="text-[11px] mt-2 uppercase tracking-[0.18em] font-medium" style={{ color: COLORS.mist }}>
                      {investorNextActions[item.stage]}
                    </div>
                  </button>
                ))}
              </div>
            </Card>
            <Card>
              <SectionLabel>Stage distribution</SectionLabel>
              <div className="space-y-3 mt-3 text-sm" style={{ color: COLORS.ink2 }}>
                {investorPipeline.map((stage) => (
                  <div key={stage.stage} className="flex items-center justify-between border-b border-[rgba(218,216,207,0.8)] py-3">
                    <span>{stage.stage}</span>
                    <span>{stage.items.length} record{stage.items.length !== 1 ? "s" : ""}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </>
      )}

      {tab === "insights" && (
        <>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <Card>
              <SectionLabel>Lifecycle definition</SectionLabel>
              <div className="space-y-3 mt-3 text-sm" style={{ color: COLORS.ink2 }}>
                <p>Investor lifecycle is visible across inquiry, discovery, modeling, diligence, active investment, and asset management.</p>
                <p>Each stage captures who owns the next action, what documents are required, and the expected timing for review or close.</p>
              </div>
            </Card>
            <Card>
              <SectionLabel>Current priorities</SectionLabel>
              <div className="space-y-3 mt-3 text-sm" style={{ color: COLORS.ink2 }}>
                <p>Financial models are in review for two new funds. Focus diligence on site readiness and service agreements.</p>
                <p>Schedule the next investor report for the Alpine portfolio to keep the active investment aligned with expectations.</p>
              </div>
            </Card>
            <AICopilot
              name="Investor Lifecycle AI"
              subtitle="Executive lifecycle support"
              capabilities={["Summarize investor status", "Surface at-risk deals", "Schedule diligence", "Draft investor updates"]}
              sampleQ="What is the most urgent investor action this week?"
              sampleA="The most urgent action is completing due diligence for the Desert Retreat review before the next review window closes." 
            />
          </div>
        </>
      )}

      {selectedInvestor && (
        <DetailPanel title={selectedInvestor.name} onClose={() => setSelectedInvestor(null)}>
          <InfoList title="Investor details" items={[
            { label: "Fund", value: selectedInvestor.fund },
            { label: "Investor", value: selectedInvestor.investor },
            { label: "Stage", value: selectedInvestor.currentStage || selectedInvestor.stage },
            { label: "Status", value: selectedInvestor.status },
            { label: "Source", value: selectedInvestor.source },
            { label: "Priority", value: selectedInvestor.priority || "High" },
            { label: "Next action", value: investorNextActions[selectedInvestor.currentStage || selectedInvestor.stage] },
          ]} />
          <Card className="mt-4">
            <SectionLabel>Investor notes</SectionLabel>
            <p className="text-sm" style={{ color: COLORS.ink2 }}>{selectedInvestor.notes}</p>
          </Card>
          <Card className="mt-4">
            <SectionLabel>AI summary</SectionLabel>
            <p className="text-sm" style={{ color: COLORS.ink2 }}>{selectedInvestor.aiSummary}</p>
          </Card>
        </DetailPanel>
      )}
    </div>
  );
}

function VendorRecruitment() {
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [tab, setTab] = useState("pipeline");
  const vendorList = vendorPipeline.flatMap((stage) => stage.items.map((item) => ({ ...item, stage: stage.stage })));

  return (
    <div className="relative">
      <PageTitle
        eyebrow="Growth"
        title="Vendor Lifecycle"
        sub="Applied → Verification → Compliance → Trial → Approved vendor network"
      />
      <TabBar
        tabs={[
          { id: "pipeline", label: "Pipeline" },
          { id: "directory", label: "Vendor directory" },
          { id: "insights", label: "Lifecycle insights" },
        ]}
        active={tab}
        onChange={setTab}
      />

      {tab === "pipeline" && (
        <>
          <div className="grid grid-cols-4 gap-4 mb-6">
            <KpiCard label="Applications" value="14" icon={FileText} />
            <KpiCard label="Verified" value="8" icon={ShieldCheck} />
            <KpiCard label="Compliance" value="5" icon={AlertTriangle} />
            <KpiCard label="Preferred" value="12" icon={Medal} />
          </div>
          <div className="grid grid-cols-5 gap-4 mb-6">
            {vendorPipeline.map((stage) => (
              <Card key={stage.stage} className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-sm font-medium" style={{ color: COLORS.ink }}>{stage.stage}</div>
                    <div className="text-xs" style={{ color: COLORS.mist }}>{stage.items.length} item{stage.items.length !== 1 ? "s" : ""}</div>
                  </div>
                  <Pill tone={stage.items.length ? "ok" : "idle"}>{stage.items.length ? "Live" : "Empty"}</Pill>
                </div>
                <div className="space-y-3">
                  {stage.items.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setSelectedVendor(item)}
                      className="w-full text-left rounded-xl p-3 border bg-white hover:bg-[#f3f1ec]"
                      style={{ borderColor: COLORS.line }}
                    >
                      <div className="text-sm font-medium" style={{ color: COLORS.ink }}>{item.name}</div>
                      <div className="text-xs mt-1" style={{ color: COLORS.mist }}>{item.services}</div>
                      <div className="text-xs mt-2" style={{ color: COLORS.brass }}>{item.note}</div>
                      <div className="text-[11px] mt-3 uppercase tracking-[0.18em] font-medium" style={{ color: COLORS.mist }}>
                        {vendorNextActions[stage.stage]}
                      </div>
                    </button>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </>
      )}

      {tab === "directory" && (
        <>
          <div className="grid grid-cols-4 gap-4 mb-6">
            <KpiCard label="Applications" value="14" icon={FileText} />
            <KpiCard label="Verified" value="8" icon={ShieldCheck} />
            <KpiCard label="Compliance" value="5" icon={AlertTriangle} />
            <KpiCard label="Preferred" value="12" icon={Medal} />
          </div>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <Card className="col-span-2">
              <SectionLabel>Vendor directory</SectionLabel>
              <div className="space-y-3 mt-3">
                {vendorList.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedVendor(item)}
                    className="w-full text-left rounded-2xl p-4 border bg-white hover:bg-[#f3f1ec] transition"
                    style={{ borderColor: COLORS.line }}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <div className="text-sm font-semibold" style={{ color: COLORS.ink }}>{item.name}</div>
                        <div className="text-xs mt-1" style={{ color: COLORS.mist }}>{item.services}</div>
                      </div>
                      <Pill tone={item.stage === "Approved" ? "ok" : item.stage === "Trial" ? "warn" : "idle"}>{item.stage}</Pill>
                    </div>
                    <div className="text-xs mt-3" style={{ color: COLORS.brass }}>{item.note}</div>
                    <div className="text-[11px] mt-2 uppercase tracking-[0.18em] font-medium" style={{ color: COLORS.mist }}>
                      {vendorNextActions[item.stage]}
                    </div>
                  </button>
                ))}
              </div>
            </Card>
            <Card>
              <SectionLabel>Vendor lifecycle summary</SectionLabel>
              <div className="space-y-3 mt-3 text-sm" style={{ color: COLORS.ink2 }}>
                {vendorPipeline.map((stage) => (
                  <div key={stage.stage} className="flex items-center justify-between border-b border-[rgba(218,216,207,0.8)] py-3">
                    <span>{stage.stage}</span>
                    <span>{stage.items.length} item{stage.items.length !== 1 ? "s" : ""}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </>
      )}

      {tab === "insights" && (
        <>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <Card>
              <SectionLabel>Lifecycle definition</SectionLabel>
              <div className="space-y-3 mt-3 text-sm" style={{ color: COLORS.ink2 }}>
                <p>A vendor lifecycle starts when an application is received and ends when the vendor is fully approved and serving live assignments.</p>
                <p>Visibility across application, verification, compliance, trial, and approval keeps operations aligned with procurement and quality standards.</p>
              </div>
            </Card>
            <Card>
              <SectionLabel>Current priorities</SectionLabel>
              <div className="space-y-3 mt-3 text-sm" style={{ color: COLORS.ink2 }}>
                <p>Complete compliance checks for Alpine Jets and Concierge Elite this week to avoid assignment delays.</p>
                <p>Move Private Chef Group from trial into approved status after guest feedback is collected.</p>
              </div>
            </Card>
            <AICopilot
              name="Vendor Lifecycle AI"
              subtitle="Executive vendor support"
              capabilities={["Summarize vendor readiness", "Flag compliance gaps", "Recommend next approvals", "Monitor trial outcomes"]}
              sampleQ="Which vendor needs the fastest follow-up?"
              sampleA="Alpine Jets needs its insurance validation completed before it can be assigned to any new guest bookings."
            />
          </div>
        </>
      )}
      {selectedVendor && (
        <DetailPanel title={selectedVendor.name} onClose={() => setSelectedVendor(null)}>
          <InfoList title="Vendor profile" items={[
            { label: "Owner", value: "Sarah Thompson" },
            { label: "Application date", value: "July 10" },
            { label: "Services", value: selectedVendor.services },
            { label: "Coverage", value: selectedVendor.coverage },
            { label: "Assigned reviewer", value: selectedVendor.reviewer },
            { label: "Status", value: selectedVendor.status },
          ]} />
          <Card className="mt-4">
            <SectionLabel>Compliance status</SectionLabel>
            <div className="space-y-2 mt-3">
              <div className="flex items-center justify-between"><span>Insurance</span><span style={{ color: COLORS.ink }}>{selectedVendor.insurance}</span></div>
              <div className="flex items-center justify-between"><span>Business License</span><span style={{ color: COLORS.ink }}>{selectedVendor.license}</span></div>
              <div className="flex items-center justify-between"><span>W9</span><span style={{ color: COLORS.ink }}>{selectedVendor.w9}</span></div>
              <div className="flex items-center justify-between"><span>Contract</span><span style={{ color: COLORS.ink }}>{selectedVendor.contract}</span></div>
            </div>
          </Card>
          <Card className="mt-4">
            <SectionLabel>Next step</SectionLabel>
            <p className="text-sm" style={{ color: COLORS.ink2 }}>{vendorNextActions[selectedVendor.stage]}</p>
          </Card>
          <Card className="mt-4">
            <SectionLabel>Internal Notes</SectionLabel>
            <p className="text-sm" style={{ color: COLORS.ink2 }}>{selectedVendor.notes}</p>
          </Card>
          <Card className="mt-4">
            <SectionLabel>AI Recommendation</SectionLabel>
            <p className="text-sm" style={{ color: COLORS.ink2 }}>{selectedVendor.aiSummary}</p>
            {selectedVendor.moveStage && <button className="mt-4 w-full rounded-lg py-2" style={{ background: COLORS.brass, color: COLORS.ink }}>Move to {selectedVendor.moveStage}</button>}
          </Card>
        </DetailPanel>
      )}
    </div>
  );
}

function PropertyPipeline({ onOpenProperty }) {
  return (
    <div>
      <PageTitle
        eyebrow="Property Lifecycle"
        title="Property Pipeline"
        sub="Every record in the acquisition funnel with stage-based visibility and Trello-like flow"
      />
      <div className="grid grid-cols-4 gap-4 mb-6">
        <KpiCard label="Qualification" value="2" icon={CheckCircle2} />
        <KpiCard label="Assessment" value="1" icon={ClipboardList} />
        <KpiCard label="Proposal" value="1" icon={FileText} />
        <KpiCard label="Live properties" value="1" icon={Building} />
      </div>
      <div className="grid grid-cols-4 gap-4 mb-6">
        {propertyPipelineStages.map((stage) => (
          <Card key={stage.stage}>
            <div className="mb-3">
              <div className="text-sm font-medium" style={{ color: COLORS.ink }}>{stage.stage}</div>
              <div className="text-xs" style={{ color: COLORS.mist }}>{stage.items.length} card{stage.items.length !== 1 ? "s" : ""}</div>
            </div>
            <div className="space-y-3">
              {stage.items.map((item) => (
                <button
                  key={item.name}
                  onClick={() => onOpenProperty && onOpenProperty(item.name)}
                  className="w-full text-left rounded-xl p-3 border bg-white hover:bg-[#f3f1ec]"
                  style={{ borderColor: COLORS.line }}
                >
                  <div className="text-sm font-medium" style={{ color: COLORS.ink }}>{item.name}</div>
                  <div className="text-xs mt-1" style={{ color: COLORS.mist }}>Owner {item.owner} · {item.location}</div>
                  <div className="text-xs mt-2" style={{ color: COLORS.brass }}>{item.bedrooms} beds · {item.status}</div>
                </button>
              ))}
            </div>
          </Card>
        ))}
      </div>
      <Card>
        <SectionLabel>Pipeline vision</SectionLabel>
        <p className="text-sm leading-relaxed" style={{ color: COLORS.ink2 }}>
          Once a property becomes live, it exits the pipeline and flows into Active Portfolio. This view is designed to mirror modern CRM pipelines rather than static metrics.
        </p>
      </Card>
    </div>
  );
}

function PropertyOnboarding() {
  return (
    <ModulePage
      eyebrow="Property Lifecycle"
      title="Property Onboarding"
      sub="Rapidly onboard new properties with one operational playbook for luxury readiness"
      metrics={[
        { label: "Onboarding starts", value: "4", icon: Sparkles },
        { label: "Tasks remaining", value: "18", icon: ClipboardList },
        { label: "Vendor setup", value: "6", icon: Handshake },
        { label: "Guest readiness", value: "75%", icon: Home },
      ]}
      rowLabel="Onboarding checklist"
      rows={[
        { title: "Property inspection report", meta: "8 of 10 items complete", tag: "In progress", tone: "warn" },
        { title: "Systems integration", meta: "Smart home and PMS connected", tag: "Complete", tone: "ok" },
        { title: "Launch marketing assets", meta: "Photography scheduled", tag: "Ready", tone: "idle" },
      ]}
      aiTitle="Onboarding automation"
      aiPoints={[
        "The onboarding workspace is designed for operational readiness and owner sign-off, not property design work — it tracks the essential handoff items.",
        "Future integrations include smart device commissioning workflows and owner review approval steps.",
      ]}
    />
  );
}

function ActivePortfolio({ onOpenProperty }) {
  return (
    <div>
      <PageTitle
        eyebrow="Property Lifecycle"
        title="Active Portfolio"
        sub="A live operational command center for every property in the active portfolio"
      />
      <div className="grid grid-cols-3 gap-5 mb-6">
        {activePortfolioProperties.map((property) => (
          <Card key={property.name}>
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="text-sm font-medium" style={{ color: COLORS.ink }}>{property.name}</div>
                <div className="text-xs" style={{ color: COLORS.mist }}>{property.owner}</div>
              </div>
              <Pill tone={property.status === "Healthy" ? "ok" : property.status === "Monitor" ? "warn" : "idle"}>{property.status}</Pill>
            </div>
            <div className="space-y-3 text-sm" style={{ color: COLORS.ink2 }}>
              <div className="flex items-center justify-between"><span>Occupancy</span><span>{property.occupancy}</span></div>
              <div className="flex items-center justify-between"><span>Revenue</span><span>{property.revenue}</span></div>
              <div className="flex items-center justify-between"><span>Open tasks</span><span>{property.openTasks}</span></div>
              <div className="flex items-center justify-between"><span>Cleaning today</span><span>{property.cleaningToday}</span></div>
              <div className="flex items-center justify-between"><span>Inspection</span><span>{property.inspection}</span></div>
            </div>
            <button
              onClick={() => onOpenProperty && onOpenProperty(property.name)}
              className="mt-4 w-full rounded-lg py-2 text-sm font-medium"
              style={{ background: COLORS.brass, color: COLORS.ink }}
            >
              Open Property 360
            </button>
          </Card>
        ))}
      </div>
      <Card>
        <SectionLabel>Portfolio summary</SectionLabel>
        <p className="text-sm leading-relaxed" style={{ color: COLORS.ink2 }}>
          The portfolio view now surfaces a record-style summary for each active property so executives can scan performance and operational risk at the same time.
        </p>
      </Card>
    </div>
  );
}

function SOPCenter() {
  return (
    <ModulePage
      eyebrow="Operations"
      title="SOP Center"
      sub="Standard operating procedures, training, and operational playbooks for every team"
      metrics={[
        { label: "SOPs available", value: "48", icon: FileText },
        { label: "SOP updates, 30d", value: "7", icon: Sparkles },
        { label: "Staff trained", value: "94%", icon: Users },
        { label: "Knowledge gaps", value: "3", icon: AlertTriangle, positive: false },
      ]}
      rowLabel="Operational playbooks"
      rows={[
        { title: "Turnover cleaning checklist", meta: "Updated weekly", tag: "Current", tone: "ok" },
        { title: "Guest arrival hospitality sequence", meta: "VIP updates included", tag: "Current", tone: "ok" },
        { title: "Maintenance escalation protocol", meta: "Review in 5 days", tag: "Review", tone: "idle" },
      ]}
      aiTitle="SOP intelligence"
      aiPoints={[
        "This space is the operational memory of the business, intended to surface the exact process for every core workflow.",
        "Future functionality includes SOP version comparison and automated update notifications to impacted teams.",
      ]}
    />
  );
}

function RevenueIntelligence() {
  return (
    <ModulePage
      eyebrow="Financial Operations"
      title="Revenue Intelligence"
      sub="Portfolio revenue, pricing performance, and channel intelligence for executive decision-making"
      metrics={[
        { label: "Revenue, MTD", value: "$214k", icon: DollarSign },
        { label: "RevPAR", value: "$538", icon: Gauge },
        { label: "Direct booking share", value: "31%", icon: TrendingUp },
        { label: "Rev impact this week", value: "+$18k", icon: BarChart3 },
      ]}
      rowLabel="Revenue drivers"
      rows={[
        { title: "Direct booking growth", meta: "Up 5 points vs. prior month", tag: "Good", tone: "ok" },
        { title: "Channel commission pressure", meta: "Airbnb vs Booking gap", tag: "Monitor", tone: "warn" },
        { title: "Price optimization opportunity", meta: "Salt Flat House weekend window", tag: "Action", tone: "warn" },
      ]}
      aiTitle="Revenue insights"
      aiPoints={[
        "This workspace is less about bookkeeping and more about telling the revenue story to the executive team.",
        "It assumes external systems like Guesty, Airbnb, and QuickBooks feed data into a single command center.",
      ]}
    />
  );
}

function OwnerPayouts() {
  return (
    <ModulePage
      eyebrow="Financial Operations"
      title="Owner Payouts"
      sub="Distributions, payout schedules, and ownership earnings visibility"
      metrics={[
        { label: "Payouts due", value: "5", icon: Banknote },
        { label: "Pending approvals", value: "2", icon: AlertTriangle, positive: false },
        { label: "Avg. payout lag", value: "3d", icon: Clock },
        { label: "Owner payout rate", value: "92%", icon: CheckCircle2 },
      ]}
      rowLabel="Upcoming distributions"
      rows={[
        { title: "Maison du Lac — July payout", meta: "Vendor adjustments pending", tag: "Review", tone: "warn" },
        { title: "Mountain Escape — June final", meta: "Paid", tag: "Complete", tone: "ok" },
        { title: "Villa Serenity — special bonus", meta: "Reconciliation in progress", tag: "Action", tone: "idle" },
      ]}
      aiTitle="Payout status"
      aiPoints={[
        "Payout workflows are designed to integrate with accounting systems and to flag any exception before the owner receives a statement.",
        "This tab is the executive control point for owner cash flows, not a general ledger.",
      ]}
    />
  );
}

function VendorPayments() {
  return (
    <ModulePage
      eyebrow="Financial Operations"
      title="Vendor Payments"
      sub="Pay vendor invoices, verify compliance, and track service provider cash flow"
      metrics={[
        { label: "Invoices due", value: "8", icon: FileText },
        { label: "Paid this week", value: "11", icon: CheckCircle2 },
        { label: "Compliance holds", value: "1", icon: ShieldCheck },
        { label: "Average payment time", value: "2d", icon: Clock },
      ]}
      rowLabel="Payment queue"
      rows={[
        { title: "Alpine Clean Co. invoice", meta: "Waiting on final quality sign-off", tag: "Pending", tone: "warn" },
        { title: "Summit HVAC Services", meta: "Scheduled for payment tomorrow", tag: "Ready", tone: "ok" },
        { title: "Tahoe Grounds Co.", meta: "Recurring landscape retainer", tag: "On schedule", tone: "ok" },
      ]}
      aiTitle="Vendor cash flow"
      aiPoints={[
        "This workspace tracks vendor payment health and ensures a vendor doesn’t get paused due to paperwork or compliance gaps.",
        "Future automation includes invoice reminders and compliance expiry alerts.",
      ]}
    />
  );
}

function FinancialOperations() {
  return (
    <ModulePage
      eyebrow="Financial Operations"
      title="Financial Operations"
      sub="Company revenue, cash flow, operating expenses, and executive financial KPIs"
      metrics={[
        { label: "Cash flow, MTD", value: "$78k", icon: DollarSign },
        { label: "OpEx ratio", value: "34%", icon: Briefcase },
        { label: "Profit margin", value: "26%", icon: Gauge },
        { label: "Vendor cost run rate", value: "$42k", icon: Wrench },
      ]}
      rowLabel="Financial focus areas"
      rows={[
        { title: "Maintenance expense review", meta: "Up 18% vs. plan", tag: "Attention", tone: "warn" },
        { title: "Cleaning cost optimization", meta: "On track", tag: "Stable", tone: "ok" },
        { title: "Commission tracking", meta: "Direct channel share improving", tag: "Monitor", tone: "idle" },
      ]}
      aiTitle="Financial command center"
      aiPoints={[
        "This page is the executive dashboard for financial performance, not an accounting ledger — it integrates with external systems for the numbers.",
        "It supports decision-making around revenue, payouts, and portfolio profitability.",
      ]}
    />
  );
}

function Forecasting() {
  return (
    <ModulePage
      eyebrow="Financial Operations"
      title="Forecasting"
      sub="Revenue, occupancy, and cash flow outlook for the next 90 days"
      metrics={[
        { label: "Revenue forecast", value: "$650k", icon: Gauge },
        { label: "Projected occupancy", value: "85%", icon: CalendarDays },
        { label: "Cash runway", value: "120 days", icon: Clock },
        { label: "Forecast accuracy", value: "93%", icon: CheckCircle2 },
      ]}
      rowLabel="Forecast levers"
      rows={[
        { title: "Pricing sensitivity", meta: "5% ADR increase could add $14k", tag: "Action", tone: "warn" },
        { title: "Direct booking push", meta: "Improves margin by 4 pts", tag: "Recommend", tone: "ok" },
        { title: "Expense control focus", meta: "Maintenance cost is the largest variance", tag: "Focus", tone: "idle" },
      ]}
      aiTitle="Forecast guidance"
      aiPoints={[
        "Forecasting is built around executive levers: rate, channel mix, and expense control, not transaction-level detail.",
        "It assumes data flows in from PMS, financial systems, and revenue management tools.",
      ]}
    />
  );
}

function Partners() {
  return (
    <ModulePage
      eyebrow="Growth"
      title="Partners"
      sub="“Apply To Serve Our VIP Clientele” — a standing service-provider application funnel across 13 named categories"
      metrics={[
        { label: "Active vendors", value: "24", icon: Handshake },
        { label: "Applications, MTD", value: "17", icon: FileText },
        { label: "Avg. performance score", value: "92", icon: ShieldCheck },
        { label: "Missing license/insurance", value: "3", icon: AlertTriangle, positive: false },
      ]}
      rowLabel="Service-provider categories"
      rows={[
        { title: "Private Chefs · Luxury Transportation · Sprinter Van Services", meta: "12 active vendors across these 3 categories", tag: "Staffed", tone: "ok" },
        { title: "Yacht Charters · Jet / Aviation Partners", meta: "New application pending license verification", tag: "Review", tone: "warn" },
        { title: "Event Planners · Massage / Wellness · Housekeeping · Maintenance", meta: "Core operational categories, 18 vendors", tag: "Staffed", tone: "ok" },
        { title: "Pool/Spa · Interior Designers · Photographers · Concierge Partners", meta: "Growing category, 2 new applications this month", tag: "Growing", tone: "idle" },
      ]}
      aiTitle="Partner Network Agent"
      aiPoints={[
        "Triages every incoming service-provider application by category and market the moment it's submitted, and flags anything missing licensing or insurance documentation before it reaches a department lead.",
        "Never approves a vendor into the network on its own — every addition to the Concierge Network or the service vendor pool is a human decision.",
      ]}
    />
  );
}

function TrustDiscretion() {
  return (
    <ModulePage
      eyebrow="Trust & Risk · New department"
      title="Trust, Discretion & Risk"
      sub="Discretion as a repeatable process, not a hope — the highest brand consequence, lowest automation tolerance department in the system"
      metrics={[
        { label: "Open NDAs", value: "6", icon: FileText },
        { label: "Guests in vetting", value: "3", icon: ShieldCheck },
        { label: "Incidents this quarter", value: "0", icon: CheckCircle2 },
        { label: "Compliance training, staff", value: "100%", icon: Users },
      ]}
      rowLabel="Vetting & discretion queue"
      rows={[
        { title: "Guest list — upcoming activation", meta: "3 of 3 guests cleared, 0 pending", tag: "On track", tone: "ok" },
        { title: "Whitmore party — NDA on file", meta: "Signed and archived", tag: "Complete", tone: "ok" },
        { title: "Regulatory calendar — 3 markets", meta: "Next filing due in 12 days", tag: "Tracked", tone: "idle" },
      ]}
      aiTitle="Trust & Discretion Agent"
      aiPoints={[
        "Tracks NDA status, guest vetting checkpoints, and confidentiality training compliance across every department — every vetting decision and every incident response is a human call, always, with no exceptions.",
        "This is deliberately the most restricted agent in the system: it surfaces status and gaps, and never resolves a discretion or security question on its own.",
      ]}
    />
  );
}

function KnowledgeBase() {
  return (
    <div>
      <PageTitle eyebrow="Intelligence" title="Knowledge Base" sub="SOPs, training, and policy — searchable in plain language" />
      <Card className="mb-5">
        <div className="flex items-center gap-3 px-1">
          <Search size={16} style={{ color: COLORS.mist }} />
          <input
            className="w-full text-sm py-2 outline-none bg-transparent"
            placeholder="Ask the Knowledge Assistant anything — e.g. “what's the late checkout policy?”"
            style={{ color: COLORS.ink }}
          />
        </div>
      </Card>
      <div className="grid grid-cols-3 gap-5">
        {[
          { title: "Guest late checkout policy", cat: "Guest Experience SOP", meta: "Updated 12 days ago" },
          { title: "Turnover cleaning checklist", cat: "Housekeeping SOP", meta: "Updated 3 days ago" },
          { title: "Vendor onboarding process", cat: "Partners SOP", meta: "Updated 1 month ago" },
          { title: "Owner statement generation", cat: "Owner Services SOP", meta: "Updated 6 days ago" },
          { title: "Emergency maintenance escalation", cat: "Maintenance SOP", meta: "Updated 2 months ago" },
          { title: "VIP concierge standards", cat: "Concierge SOP", meta: "Updated 9 days ago" },
        ].map((d) => (
          <Card key={d.title}>
            <FileText size={16} style={{ color: COLORS.brass }} />
            <div className="mt-3 text-sm font-medium" style={{ color: COLORS.ink }}>{d.title}</div>
            <div className="text-xs mt-1" style={{ color: COLORS.mist }}>{d.cat} · {d.meta}</div>
          </Card>
        ))}
      </div>
      <div className="mt-5">
        <Card>
          <div className="flex items-center gap-2 mb-2">
            <Sparkles size={14} style={{ color: COLORS.brass }} />
            <SectionLabel>RAG-powered knowledge assistant</SectionLabel>
          </div>
          <p className="text-sm leading-relaxed" style={{ color: COLORS.ink2 }}>
            Every answer is retrieved directly from the SOP it came from, with a link back to the source document —
            so the team gets a fast answer without losing the ability to check where it came from.
          </p>
          <p className="text-sm leading-relaxed mt-3 pt-3" style={{ color: COLORS.mist, borderTop: `1px solid ${COLORS.line}` }}>
            Worth noting: the site's own Journal ("Off Grid Editorial") and Case Studies pages are live in navigation but
            not yet published — a real content gap this same knowledge pipeline could help close once internal SOPs are populated.
          </p>
        </Card>
      </div>
    </div>
  );
}

function Documents() {
  return (
    <ModulePage
      eyebrow="Intelligence"
      title="Documents"
      sub="Contracts, statements, and property files"
      metrics={[
        { label: "Total documents", value: "1,204", icon: FileText },
        { label: "Awaiting signature", value: "3", icon: ClipboardList },
        { label: "Added this week", value: "18", icon: Plus },
        { label: "Expiring, 30d", value: "4", icon: AlertTriangle, positive: false },
      ]}
      rowLabel="Recent activity"
      rows={[
        { title: "Owner statement — J. Alvarez, June", meta: "Generated by Owner Relations Agent", tag: "Ready", tone: "ok" },
        { title: "Vendor contract — Summit HVAC", meta: "Renews in 21 days", tag: "Renewal", tone: "warn" },
        { title: "Property insurance — Whitmore Lodge", meta: "Renewed this week", tag: "Current", tone: "ok" },
      ]}
      aiTitle="Document intelligence"
      aiPoints={["Three vendor contracts are within 30 days of expiration and have not yet been reviewed for renewal terms."]}
    />
  );
}

function AutomationCenter() {
  return (
    <div>
      <PageTitle eyebrow="Intelligence" title="Automation Center" sub="136 workflows connecting the operating system to daily execution" />
      <div className="grid grid-cols-4 gap-4 mb-6">
        <KpiCard label="Workflows healthy" value="128 / 136" icon={Workflow} />
        <KpiCard label="Runs today" value="2,140" icon={Zap} />
        <KpiCard label="Avg. success rate" value="99.1%" icon={CheckCircle2} />
        <KpiCard label="Integrations" value="14" icon={Radio} />
      </div>
      <Card pad={false}>
        <div className="p-5 pb-3"><SectionLabel>Workflow health</SectionLabel></div>
        {[
          { name: "Guest inquiry → AI draft reply", status: "ok", meta: "n8n · runs on new message" },
          { name: "Turnover cleaning assignment", status: "ok", meta: "n8n · runs on checkout" },
          { name: "Owner statement generation", status: "warn", meta: "n8n · 1 retry today" },
          { name: "Vendor invoice reconciliation", status: "ok", meta: "n8n · daily, 6:00am" },
          { name: "Maintenance ticket triage", status: "ok", meta: "n8n · runs on new ticket" },
          { name: "Executive summary compilation", status: "bad", meta: "n8n · failed once, auto-retried" },
        ].map((w, i) => (
          <div key={i} className="flex items-center justify-between px-5 py-3 text-sm" style={{ borderTop: `1px solid ${COLORS.line}` }}>
            <div className="flex items-center gap-3">
              <StatusDot tone={w.status} />
              <div>
                <div style={{ color: COLORS.ink }}>{w.name}</div>
                <div className="text-xs mt-0.5" style={{ color: COLORS.mist }}>{w.meta}</div>
              </div>
            </div>
            <Pill tone={w.status}>{w.status === "ok" ? "Healthy" : w.status === "warn" ? "Watch" : "Attention"}</Pill>
          </div>
        ))}
      </Card>
    </div>
  );
}

function AIAgents() {
  return (
    <div>
      <PageTitle
        eyebrow="Intelligence"
        title="AI Agents"
        sub="Seven agents, each scoped to one operational responsibility — none of them replace a person's judgment call."
      />
      <div className="grid grid-cols-2 gap-5">
        {agents.map((a) => {
          const Icon = a.icon;
          const s = statusStyle[a.status];
          return (
            <Card key={a.name}>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: COLORS.forest }}>
                    <Icon size={16} color={COLORS.canvas} strokeWidth={1.75} />
                  </div>
                  <div>
                    <div className="text-sm font-medium" style={{ color: COLORS.ink }}>{a.name}</div>
                  </div>
                </div>
                <span className="text-[11px] px-2 py-0.5 rounded-full font-medium" style={{ color: s.color, background: s.bg, fontFamily: "'IBM Plex Mono', monospace" }}>
                  {s.label}
                </span>
              </div>
              <p className="text-sm mt-3 leading-relaxed" style={{ color: COLORS.ink2 }}>{a.purpose}</p>

              <div className="mt-4">
                <Eyebrow>Responsibilities</Eyebrow>
                <ul className="mt-1.5 space-y-1">
                  {a.responsibilities.map((r) => (
                    <li key={r} className="text-sm flex items-start gap-2" style={{ color: COLORS.ink2 }}>
                      <span className="mt-1.5"><Circle size={4} fill={COLORS.mist} color={COLORS.mist} /></span>
                      {r}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4 pt-4" style={{ borderTop: `1px solid ${COLORS.line}` }}>
                <div>
                  <Eyebrow>Tools</Eyebrow>
                  <div className="flex flex-wrap gap-1.5 mt-1.5">
                    {a.tools.map((t) => <Pill key={t} tone="idle">{t}</Pill>)}
                  </div>
                </div>
                <div>
                  <Eyebrow>Connected systems</Eyebrow>
                  <div className="flex flex-wrap gap-1.5 mt-1.5">
                    {a.connected.map((t) => <Pill key={t} tone="idle">{t}</Pill>)}
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

function Reports() {
  return (
    <div>
      <PageTitle eyebrow="Intelligence" title="Reports" sub="Standard operating reports across the portfolio" />
      <div className="grid grid-cols-2 gap-5">
        <Card>
          <SectionLabel>Guest & owner satisfaction, trailing 6 months</SectionLabel>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={satisfactionData} margin={{ left: -18, top: 5 }}>
              <CartesianGrid stroke={COLORS.line} vertical={false} />
              <XAxis dataKey="m" tick={{ fontSize: 11, fill: COLORS.mist }} axisLine={false} tickLine={false} />
              <YAxis domain={[4, 5]} tick={{ fontSize: 11, fill: COLORS.mist }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ fontSize: 12, fontFamily: "Inter", border: `1px solid ${COLORS.line}`, borderRadius: 8 }} />
              <Line type="monotone" dataKey="guest" stroke={COLORS.brass} strokeWidth={2} dot={false} name="Guest" />
              <Line type="monotone" dataKey="owner" stroke={COLORS.forest} strokeWidth={2} dot={false} name="Owner" />
            </LineChart>
          </ResponsiveContainer>
        </Card>
        <Card>
          <SectionLabel>Coordination load by category</SectionLabel>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={bottleneckData} layout="vertical" margin={{ left: 10, top: 5 }}>
              <CartesianGrid stroke={COLORS.line} horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 11, fill: COLORS.mist }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="name" width={130} tick={{ fontSize: 11, fill: COLORS.ink2 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ fontSize: 12, fontFamily: "Inter", border: `1px solid ${COLORS.line}`, borderRadius: 8 }} />
              <Bar dataKey="val" fill={COLORS.brass} radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
}

function ExecutiveIntelligence() {
  return (
    <div>
      <PageTitle
        eyebrow="Intelligence · Centerpiece"
        title="Executive Intelligence"
        sub="Everything a founder needs to make the day's decisions, in one screen."
      />

      <div className="grid grid-cols-3 gap-5 mb-6">
        <Card className="col-span-1" pad={true}>
          <Eyebrow>Business health score</Eyebrow>
          <div className="flex items-center gap-5 mt-3">
            <ResponsiveContainer width={110} height={110}>
              <RadialBarChart innerRadius="72%" outerRadius="100%" data={[{ value: 87, fill: COLORS.brass }]} startAngle={90} endAngle={-270}>
                <RadialBar dataKey="value" cornerRadius={20} background={{ fill: COLORS.canvasDim }} />
              </RadialBarChart>
            </ResponsiveContainer>
            <div>
              <div className="text-3xl" style={{ fontFamily: "'Fraunces', serif", color: COLORS.ink, fontWeight: 500 }}>87</div>
              <div className="text-xs mt-1" style={{ color: COLORS.mist }}>Strong — up 5pts this quarter</div>
            </div>
          </div>
        </Card>

        <Card className="col-span-2">
          <SectionLabel>AI-generated executive summary</SectionLabel>
          <p className="text-sm leading-relaxed" style={{ color: COLORS.ink2 }}>
            July is tracking ahead on occupancy and revenue, with satisfaction scores at a six-month high for both
            guests and owners. Operational efficiency is steady; the one recurring pattern worth your attention is a
            maintenance issue at Canyon Ridge that has repeated three times in 60 days. Automation is handling the
            large majority of routine coordination without intervention.
          </p>
        </Card>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <KpiCard label="Occupancy" value="88%" delta="+4pts" icon={Gauge} />
        <KpiCard label="Revenue, MTD" value="$214k" delta="+9.2%" icon={DollarSign} />
        <KpiCard label="Operational efficiency" value="93%" delta="+2pts" icon={Zap} />
        <KpiCard label="Automation success rate" value="99.1%" delta="+0.4pts" icon={Workflow} />
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <KpiCard label="Maintenance backlog" value="6 open" delta="2 urgent" positive={false} icon={Wrench} mono={false} />
        <KpiCard label="Guest satisfaction" value="4.90" delta="+0.04" icon={Star} mono={false} />
        <KpiCard label="Owner satisfaction" value="4.78" delta="+0.06" icon={Star} mono={false} />
        <KpiCard label="Discretion & risk index" value="98" delta="0 open incidents" icon={ShieldCheck} />
      </div>

      <div className="grid grid-cols-2 gap-5">
        <Card>
          <SectionLabel>Today's priorities</SectionLabel>
          <div className="space-y-2.5 text-sm">
            {[
              "Confirm second cleaning crew for this weekend's back-to-back turnovers",
              "Approve full HVAC diagnostic on The Pinewood Estate (3rd ticket in 60 days)",
              "Review flagged vendor charge on Villa Serenity's owner statement",
            ].map((t, i) => (
              <div key={i} className="flex items-center gap-2.5">
                <Circle size={13} style={{ color: COLORS.brass }} />
                <span style={{ color: COLORS.ink2 }}>{t}</span>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <SectionLabel>Strategic recommendations</SectionLabel>
          <div className="space-y-3 text-sm" style={{ color: COLORS.ink2 }}>
            <p className="pb-3" style={{ borderBottom: `1px solid ${COLORS.line}` }}>
              Referral partners are converting owner leads at 3x paid search and a third of the cost — worth shifting incremental Growth & Marketing budget there.
            </p>
            <p>The Pinewood Estate's HVAC pattern is a candidate for a full mechanical review rather than continued spot repairs.</p>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-2 gap-5 mt-6 mb-6">
        <Card>
          <SectionLabel action="12-week model">Revenue & occupancy forecast</SectionLabel>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={occupancyTrend} margin={{ left: -18, top: 5 }}>
              <defs>
                <linearGradient id="fcFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={COLORS.forest} stopOpacity={0.35} />
                  <stop offset="100%" stopColor={COLORS.forest} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke={COLORS.line} vertical={false} />
              <XAxis dataKey="m" tick={{ fontSize: 11, fill: COLORS.mist }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: COLORS.mist }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ fontSize: 12, fontFamily: "Inter", border: `1px solid ${COLORS.line}`, borderRadius: 8 }} />
              <Area type="monotone" dataKey="rev" stroke={COLORS.forest} strokeWidth={2} fill="url(#fcFill)" name="Revenue ($K, projected)" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>
        <Card>
          <SectionLabel>Operational risks</SectionLabel>
          <div className="space-y-2.5">
            {[
              { title: "Recurring HVAC pattern, Pinewood Estate", tone: "bad" },
              { title: "Vendor license renewal due in 12 days (2 vendors)", tone: "warn" },
              { title: "Peak-season staffing gap, housekeeping", tone: "warn" },
              { title: "No open discretion or compliance incidents", tone: "ok" },
            ].map((r, i) => (
              <div key={i} className="flex items-center gap-2.5 text-sm">
                <StatusDot tone={r.tone} />
                <span style={{ color: COLORS.ink2 }}>{r.title}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <KpiCard label="Vendor performance, avg." value="92" icon={Handshake} />
        <KpiCard label="Property performance, avg." value="91" icon={Building2} />
        <KpiCard label="Cash flow, MTD" value="$186K" icon={Wallet} mono={false} />
        <KpiCard label="Staffing forecast" value="18 → 21" icon={Users} mono={false} delta="peak season" />
      </div>

      <div className="grid grid-cols-3 gap-5">
        <Card className="col-span-2">
          <SectionLabel>Portfolio health matrix</SectionLabel>
          <div className="space-y-2">
            {realProperties.map((p) => (
              <div key={p.name} className="flex items-center justify-between text-sm py-1.5" style={{ borderTop: `1px solid ${COLORS.line}` }}>
                <span style={{ color: COLORS.ink2 }}>{p.name}</span>
                <Pill tone={p.name === "The Pinewood Estate" ? "warn" : "ok"}>{p.name === "The Pinewood Estate" ? "Watch" : "Healthy"}</Pill>
              </div>
            ))}
          </div>
        </Card>
        <AICopilot
          name="AI Executive Copilot"
          subtitle="Cross-department, decision-support only"
          capabilities={["Explain any KPI on this page", "Generate a board-ready summary", "Draft a stakeholder update", "Surface a risk before it's visible elsewhere"]}
          sampleQ="What should I actually worry about this week?"
          sampleA="One thing: the Pinewood HVAC pattern. Everything else on this page is on plan or self-resolving — that's the one item where waiting costs more than acting."
        />
      </div>
    </div>
  );
}

/* ------------------- Shared: tabs, AI copilot, info lists ------------------- */

function TabBar({ tabs, active, onChange }) {
  return (
    <div className="flex items-center gap-1 mb-6" style={{ borderBottom: `1px solid ${COLORS.line}` }}>
      {tabs.map((t) => (
        <button
          key={t.id}
          onClick={() => onChange(t.id)}
          className="px-3.5 py-2.5 text-sm -mb-px transition-colors"
          style={{
            color: active === t.id ? COLORS.brass : COLORS.mist,
            borderBottom: active === t.id ? `2px solid ${COLORS.brass}` : "2px solid transparent",
            fontWeight: active === t.id ? 500 : 400,
          }}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}

function AICopilot({ name, subtitle, capabilities, sampleQ, sampleA }) {
  return (
    <Card>
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: COLORS.forest }}>
          <Sparkles size={14} color={COLORS.canvas} strokeWidth={1.75} />
        </div>
        <div>
          <div className="text-sm font-medium" style={{ color: COLORS.ink }}>{name}</div>
          {subtitle && <div className="text-xs" style={{ color: COLORS.mist }}>{subtitle}</div>}
        </div>
      </div>
      <div className="flex flex-wrap gap-1.5 mt-3.5">
        {capabilities.map((c) => <Pill key={c} tone="idle">{c}</Pill>)}
      </div>
      {sampleQ && (
        <div className="mt-3.5 pt-3.5" style={{ borderTop: `1px solid ${COLORS.line}` }}>
          <Eyebrow>Try asking</Eyebrow>
          <p className="text-sm italic mt-1" style={{ color: COLORS.ink2 }}>"{sampleQ}"</p>
          <p className="text-sm mt-1.5 leading-relaxed" style={{ color: COLORS.ink2 }}>{sampleA}</p>
        </div>
      )}
    </Card>
  );
}

function InfoList({ title, items, action }) {
  return (
    <Card>
      <SectionLabel action={action}>{title}</SectionLabel>
      <div>
        {items.map((it, i) => (
          <div key={i} className="flex items-center justify-between text-sm py-2" style={{ borderTop: i > 0 ? `1px solid ${COLORS.line}` : "none" }}>
            <span style={{ color: COLORS.mist }}>{it.label}</span>
            <span style={{ color: COLORS.ink, fontFamily: it.mono ? "'IBM Plex Mono', monospace" : undefined }}>{it.value}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}

function QueueCard({ title, action, rows, className = "" }) {
  return (
    <Card pad={false} className={className}>
      <div className="p-5 pb-3"><SectionLabel action={action}>{title}</SectionLabel></div>
      {rows.map((r, i) => (
        <div key={i} className="flex items-center justify-between px-5 py-3 text-sm" style={{ borderTop: `1px solid ${COLORS.line}` }}>
          <div className="flex items-center gap-3">
            <StatusDot tone={r.tone} />
            <div>
              <div style={{ color: COLORS.ink }}>{r.title}</div>
              <div className="text-xs mt-0.5" style={{ color: COLORS.mist }}>{r.meta}</div>
            </div>
          </div>
          <Pill tone={r.tone}>{r.tag}</Pill>
        </div>
      ))}
    </Card>
  );
}

/* ------------------------------ Owner Portal ---------------------------- */

function OwnerPortal() {
  const [tab, setTab] = useState("overview");
  return (
    <div>
      <PageTitle
        eyebrow="Dedicated portal · Property investment command center"
        title="Owner Portal"
        sub="Everything an owner needs to understand the health and performance of their investment — no second platform required"
      />
      <TabBar
        tabs={[
          { id: "overview", label: "Portfolio Overview" },
          { id: "property", label: "Property Detail" },
          { id: "financial", label: "Financials & Documents" },
          { id: "messages", label: "Secure Messages" },
        ]}
        active={tab}
        onChange={setTab}
      />

      {tab === "overview" && (
        <>
          <div className="grid grid-cols-4 gap-4 mb-5">
            <KpiCard label="Occupancy" value="88%" delta="+4pts" icon={Gauge} />
            <KpiCard label="ADR" value="$3,886" icon={DollarSign} mono={false} />
            <KpiCard label="RevPAR" value="$3,420" icon={TrendingUp} mono={false} />
            <KpiCard label="YTD revenue" value="$412K" icon={Wallet} mono={false} />
          </div>
          <div className="grid grid-cols-3 gap-4 mb-5">
            {realProperties.slice(0, 3).map((p) => (
              <Card key={p.name}>
                <div className="text-sm font-medium" style={{ color: COLORS.ink }}>{p.name}</div>
                <div className="text-xs mt-0.5" style={{ color: COLORS.mist }}>{p.loc}</div>
                <div className="mt-3 pt-3 flex items-center justify-between" style={{ borderTop: `1px solid ${COLORS.line}` }}>
                  <span className="text-xs" style={{ color: COLORS.mist }}>This month</span>
                  <span style={{ fontFamily: "'IBM Plex Mono', monospace", color: COLORS.ink, fontSize: 13 }}>{p.price}/night · 91% occ.</span>
                </div>
              </Card>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-5">
            <Card className="col-span-2">
              <SectionLabel action="Full calendar">Booking calendar — occupancy trend</SectionLabel>
              <ResponsiveContainer width="100%" height={160}>
                <AreaChart data={occupancyTrend} margin={{ left: -18, top: 5 }}>
                  <CartesianGrid stroke={COLORS.line} vertical={false} />
                  <XAxis dataKey="m" tick={{ fontSize: 11, fill: COLORS.mist }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: COLORS.mist }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ fontSize: 12, border: `1px solid ${COLORS.line}`, borderRadius: 8 }} />
                  <Area type="monotone" dataKey="occ" stroke={COLORS.brass} strokeWidth={2} fill={COLORS.canvasDim} name="Occupancy %" />
                </AreaChart>
              </ResponsiveContainer>
            </Card>
            <AICopilot
              name="AI Owner Copilot"
              subtitle="Scoped to your portfolio only"
              capabilities={["Explain a statement line", "Summarize maintenance spend", "Draft a message to Off Grid", "Project next month's revenue"]}
              sampleQ="Why was my ADR lower in June?"
              sampleA="June's ADR at Villa Serenity dipped 6% due to a 3-night maintenance hold for the pool heater — occupancy-adjusted revenue was otherwise on plan."
            />
          </div>
        </>
      )}

      {tab === "property" && (
        <>
          <Card className="mb-5">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-base" style={{ fontFamily: "'Fraunces', serif", color: COLORS.ink, fontWeight: 500 }}>The Pinewood Estate</div>
                <div className="text-xs mt-0.5" style={{ color: COLORS.mist }}>Lake Tahoe, Nevada · viewing 1 of 7 properties</div>
              </div>
              <Pill tone="warn">Health score 88</Pill>
            </div>
          </Card>
          <div className="grid grid-cols-2 gap-5 mb-5">
            <QueueCard
              title="Property timeline"
              rows={[
                { title: "Deep clean completed", meta: "2 days ago", tag: "Complete", tone: "ok" },
                { title: "HVAC service visit", meta: "5 days ago — recurring issue, 3rd visit in 60 days", tag: "Watch", tone: "warn" },
                { title: "Guest checkout, 4.9★ review", meta: "6 days ago", tag: "Reviewed", tone: "ok" },
              ]}
            />
            <QueueCard
              title="Maintenance — history & upcoming"
              rows={[
                { title: "HVAC diagnostic (upcoming)", meta: "Scheduled in 3 days", tag: "Scheduled", tone: "warn" },
                { title: "Dock resealing", meta: "Completed last month · $1,200", tag: "Complete", tone: "ok" },
                { title: "Sauna heater replacement", meta: "Completed 3 months ago · $2,400", tag: "Complete", tone: "ok" },
              ]}
            />
          </div>
          <div className="grid grid-cols-3 gap-5">
            <InfoList title="Asset inventory & warranty" items={[
              { label: "HVAC system", value: "Warranty until 2027" },
              { label: "Sauna heater", value: "Warranty until 2029" },
              { label: "Smart home hub", value: "Warranty until 2026" },
              { label: "Dock & boat lift", value: "No active warranty" },
            ]} />
            <InfoList title="Utility information" items={[
              { label: "Electric provider", value: "NV Energy" },
              { label: "Avg. monthly cost", value: "$410", mono: true },
              { label: "Water / septic", value: "Private well" },
              { label: "Internet", value: "Starlink + fiber backup" },
            ]} />
            <InfoList title="Vendor & cleaning activity" items={[
              { label: "Cleaning crew", value: "Alpine Clean Co." },
              { label: "Last cleaning", value: "2 days ago" },
              { label: "HVAC vendor", value: "Summit HVAC Services" },
              { label: "Next scheduled clean", value: "In 5 days" },
            ]} />
          </div>
        </>
      )}

      {tab === "financial" && (
        <div className="grid grid-cols-3 gap-5">
          <InfoList title="Financial statements" action="View all" items={[
            { label: "June 2026 statement", value: "Ready for review" },
            { label: "May 2026 statement", value: "Sent" },
            { label: "April 2026 statement", value: "Sent" },
          ]} />
          <InfoList title="ROI & performance" items={[
            { label: "Cap rate, TTM", value: "7.4%", mono: true },
            { label: "Net operating income", value: "$186K", mono: true },
            { label: "YoY revenue growth", value: "+12%", mono: true },
          ]} />
          <InfoList title="Documents & insurance" action="Open documents" items={[
            { label: "Property insurance", value: "Current, renews Oct 2026" },
            { label: "2025 tax documents", value: "Available" },
            { label: "Management agreement", value: "On file" },
          ]} />
        </div>
      )}

      {tab === "messages" && (
        <Card>
          <SectionLabel>Secure messaging — Off Grid Owner Relations</SectionLabel>
          <div className="space-y-4 mt-2">
            <div className="text-sm p-3 rounded-lg" style={{ background: COLORS.canvas }}>
              <div className="text-xs mb-1" style={{ color: COLORS.mist }}>Owner Relations · yesterday</div>
              <p style={{ color: COLORS.ink2 }}>Your June statement is ready for review — one vendor charge is flagged, see attached note before we send it out.</p>
            </div>
            <div className="text-sm p-3 rounded-lg ml-8" style={{ background: "rgba(184,134,60,0.10)" }}>
              <div className="text-xs mb-1" style={{ color: COLORS.mist }}>You · yesterday</div>
              <p style={{ color: COLORS.ink2 }}>Thanks, that charge looks right — go ahead and send it.</p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}

/* ----------------------------- Investor Portal --------------------------- */

function InvestorPortal() {
  const [tab, setTab] = useState("holdings");
  return (
    <div>
      <PageTitle
        eyebrow="Dedicated portal · Private investment workspace"
        title="Investor Portal"
        sub="A private banking–grade view of your holdings, cash flow, and the acquisition pipeline"
      />
      <TabBar
        tabs={[
          { id: "holdings", label: "Holdings & Performance" },
          { id: "opportunities", label: "Opportunities & Tax" },
          { id: "documents", label: "Documents & Reports" },
        ]}
        active={tab}
        onChange={setTab}
      />

      {tab === "holdings" && (
        <>
          <div className="grid grid-cols-4 gap-4 mb-5">
            <KpiCard label="Current holdings" value="2" icon={Building} />
            <KpiCard label="Cash flow, MTD" value="$14.2K" icon={Wallet} mono={false} />
            <KpiCard label="ROI, TTM" value="18.4%" icon={TrendingUp} />
            <KpiCard label="Capital contributed" value="$1.24M" icon={Banknote} mono={false} />
          </div>
          <div className="grid grid-cols-3 gap-5">
            <Card className="col-span-2">
              <SectionLabel action="Quarterly report">Performance, trailing 6 months</SectionLabel>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={occupancyTrend} margin={{ left: -18, top: 5 }}>
                  <CartesianGrid stroke={COLORS.line} vertical={false} />
                  <XAxis dataKey="m" tick={{ fontSize: 11, fill: COLORS.mist }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: COLORS.mist }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ fontSize: 12, border: `1px solid ${COLORS.line}`, borderRadius: 8 }} />
                  <Line type="monotone" dataKey="rev" stroke={COLORS.brass} strokeWidth={2} dot={false} name="Cash flow ($K)" />
                </LineChart>
              </ResponsiveContainer>
            </Card>
            <AICopilot
              name="AI Investment Advisor"
              subtitle="Scoped to your holdings"
              capabilities={["Explain a quarterly report", "Model a new acquisition", "Estimate tax savings", "Compare markets"]}
              sampleQ="What would a third property do to my tax position?"
              sampleA="Based on your current material participation hours, a third property in a similar price band could add an estimated $40K–$60K in first-year bonus depreciation — worth a call with your tax advisor before year-end."
            />
          </div>
        </>
      )}

      {tab === "opportunities" && (
        <div className="grid grid-cols-2 gap-5">
          <QueueCard
            title="Acquisition pipeline"
            rows={[
              { title: "Ridgeline Parcel · Park City, UT", meta: "Under diligence · projected cap rate 7.6%", tag: "Diligence", tone: "warn" },
              { title: "Blue Spruce Lot · Big Sky, MT", meta: "Offer submitted", tag: "Offer stage", tone: "idle" },
              { title: "Desert Vista · Moab, UT", meta: "Closed this month", tag: "Closed", tone: "ok" },
            ]}
          />
          <InfoList title="Tax advantage snapshot" items={[
            { label: "Cost segregation study", value: "Available on request" },
            { label: "Bonus depreciation rate", value: "100%", mono: true },
            { label: "Material participation hours logged", value: "112 / 100 req.", mono: true },
            { label: "Est. year-one active loss offset", value: "$30K–$200K", mono: true },
          ]} />
        </div>
      )}

      {tab === "documents" && (
        <div className="grid grid-cols-2 gap-5">
          <InfoList title="Quarterly reports" items={[
            { label: "Q2 2026 report", value: "Ready" },
            { label: "Q1 2026 report", value: "Sent" },
            { label: "Q4 2025 report", value: "Sent" },
          ]} />
          <InfoList title="Secure documents" items={[
            { label: "Operating agreement", value: "On file" },
            { label: "2025 K-1", value: "Available" },
            { label: "Cost segregation study", value: "Available" },
          ]} />
        </div>
      )}
    </div>
  );
}

/* ------------------------------ Vendor Portal ----------------------------- */

function VendorPortal() {
  const [tab, setTab] = useState("orders");
  return (
    <div>
      <PageTitle
        eyebrow="Dedicated portal · Approved vendor workspace"
        title="Vendor Portal"
        sub="Alpine Clean Co. — cleaning services, 4 active properties"
      />
      <TabBar
        tabs={[
          { id: "orders", label: "Work Orders & Calendar" },
          { id: "invoices", label: "Invoices & Performance" },
          { id: "knowledge", label: "Knowledge & Messages" },
        ]}
        active={tab}
        onChange={setTab}
      />

      {tab === "orders" && (
        <>
          <div className="grid grid-cols-4 gap-4 mb-5">
            <KpiCard label="Assigned today" value="4" icon={ClipboardList} />
            <KpiCard label="This week" value="17" icon={CalendarDays} />
            <KpiCard label="Avg. completion time" value="1h 42m" icon={Clock} />
            <KpiCard label="SLA compliance" value="98%" icon={CheckCircle2} />
          </div>
          <div className="grid grid-cols-3 gap-5">
            <QueueCard
              className="col-span-2"
              title="Assigned work orders"
              action="Route planning"
              rows={[
                { title: "Whitmore Lodge — same-day turnover", meta: "Guest arrives 3pm · upload before/after photos on completion", tag: "Priority 1", tone: "bad" },
                { title: "Cedar Hollow Cabin — standard turnover", meta: "Guest arrives tomorrow", tag: "On schedule", tone: "ok" },
                { title: "The Pinewood Estate — deep clean", meta: "Post-maintenance visit", tag: "Priority 2", tone: "warn" },
              ]}
            />
            <AICopilot
              name="AI Vendor Assistant"
              subtitle="Scoped to your assignments"
              capabilities={["Optimize today's route", "Explain a work order", "Flag a supply need", "Draft a completion note"]}
              sampleQ="What's the fastest route for today's 4 stops?"
              sampleA="Starting at Whitmore Lodge (priority, 3pm arrival) → Cedar Hollow Cabin → The Pinewood Estate saves roughly 25 minutes of drive time versus your default order."
            />
          </div>
        </>
      )}

      {tab === "invoices" && (
        <div className="grid grid-cols-3 gap-5">
          <InfoList title="Invoices & payment tracking" items={[
            { label: "June invoice", value: "$4,280 · Paid" },
            { label: "July invoice (in progress)", value: "$2,140 so far" },
            { label: "Avg. payment turnaround", value: "6 days", mono: true },
          ]} />
          <InfoList title="License & insurance" items={[
            { label: "Business license", value: "Current, renews Jan 2027" },
            { label: "Liability insurance", value: "Current, renews Nov 2026" },
            { label: "Bonding", value: "On file" },
          ]} />
          <InfoList title="Performance" items={[
            { label: "Performance score", value: "96 / 100", mono: true },
            { label: "SLA compliance", value: "98%", mono: true },
            { label: "Properties served", value: "4", mono: true },
          ]} />
        </div>
      )}

      {tab === "knowledge" && (
        <div className="grid grid-cols-3 gap-5">
          <Card className="col-span-2" pad={false}>
            <div className="p-5 pb-3"><SectionLabel>Knowledge base — cleaning SOPs</SectionLabel></div>
            {["Turnover cleaning checklist", "Photo documentation standard", "Damage reporting procedure"].map((t, i) => (
              <div key={i} className="flex items-center gap-3 px-5 py-3 text-sm" style={{ borderTop: `1px solid ${COLORS.line}` }}>
                <FileText size={14} style={{ color: COLORS.brass }} />
                <span style={{ color: COLORS.ink }}>{t}</span>
              </div>
            ))}
          </Card>
          <Card>
            <SectionLabel>Messages</SectionLabel>
            <div className="text-sm p-3 rounded-lg" style={{ background: COLORS.canvas }}>
              <div className="text-xs mb-1" style={{ color: COLORS.mist }}>Operations · today</div>
              <p style={{ color: COLORS.ink2 }}>Second crew confirmed for Saturday — thank you for the fast turnaround this week.</p>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}

/* ------------------------------- Guest Portal ------------------------------ */

function GuestPortal() {
  const [tab, setTab] = useState("stay");
  return (
    <div>
      <PageTitle
        eyebrow="Dedicated portal · Premium guest experience"
        title="Guest Portal"
        sub="The Pinewood Estate — July 15–19, 2026 · Kessler party"
      />
      <TabBar
        tabs={[
          { id: "stay", label: "My Stay" },
          { id: "concierge", label: "Concierge & Experiences" },
          { id: "billing", label: "Itinerary & Billing" },
        ]}
        active={tab}
        onChange={setTab}
      />

      {tab === "stay" && (
        <div className="grid grid-cols-3 gap-5">
          <Card className="col-span-2">
            <SectionLabel action="Property guide">Reservation details</SectionLabel>
            <div className="grid grid-cols-2 gap-4 mt-2 text-sm">
              <div><div className="text-xs" style={{ color: COLORS.mist }}>Check-in</div><div style={{ color: COLORS.ink }}>Jul 15, 2026 · 4:00pm</div></div>
              <div><div className="text-xs" style={{ color: COLORS.mist }}>Check-out</div><div style={{ color: COLORS.ink }}>Jul 19, 2026 · 11:00am</div></div>
              <div><div className="text-xs" style={{ color: COLORS.mist }}>Guests</div><div style={{ color: COLORS.ink }}>6 adults, 2 children</div></div>
              <div><div className="text-xs" style={{ color: COLORS.mist }}>Digital key</div><div style={{ color: COLORS.ink }}>Ready 3 hours before check-in</div></div>
            </div>
            <div className="mt-4 pt-4 flex items-center gap-2" style={{ borderTop: `1px solid ${COLORS.line}` }}>
              <Key size={14} style={{ color: COLORS.brass }} />
              <span className="text-sm" style={{ color: COLORS.ink2 }}>Digital check-in opens 24 hours before arrival — you'll get a push notification.</span>
            </div>
          </Card>
          <AICopilot
            name="AI Concierge"
            subtitle="Available throughout your stay"
            capabilities={["Book an experience", "Answer property questions", "Recommend dining nearby", "Request something now"]}
            sampleQ="What's the wifi password?"
            sampleA="It's on the welcome card by the entryway — I can also text it to you now if that's easier."
          />
        </div>
      )}

      {tab === "concierge" && (
        <div className="grid grid-cols-2 gap-4">
          {[
            { name: "Private Chef Dining", meta: "In-residence multi-course meals" },
            { name: "Luxury Sprinter Van with Chauffeur", meta: "Airport transfers & city tours" },
            { name: "Yacht & Boat Charters", meta: "Half or full-day, coastal markets" },
            { name: "Personal Training & Wellness", meta: "In-villa sessions and spa" },
          ].map((s) => (
            <Card key={s.name}>
              <div className="text-sm font-medium" style={{ color: COLORS.ink }}>{s.name}</div>
              <div className="text-xs mt-1" style={{ color: COLORS.mist }}>{s.meta}</div>
              <button className="mt-3 text-xs px-3 py-1.5 rounded-lg" style={{ background: COLORS.brass, color: COLORS.ink }}>Request</button>
            </Card>
          ))}
        </div>
      )}

      {tab === "billing" && (
        <div className="grid grid-cols-2 gap-5">
          <InfoList title="Itinerary" items={[
            { label: "Jul 15, 4:00pm", value: "Check-in" },
            { label: "Jul 16, 7:00pm", value: "Private chef dinner" },
            { label: "Jul 18, 10:00am", value: "Guided hike" },
            { label: "Jul 19, 11:00am", value: "Check-out" },
          ]} />
          <InfoList title="Billing" items={[
            { label: "Stay total (4 nights)", value: "$11,800", mono: true },
            { label: "Concierge services", value: "$1,240", mono: true },
            { label: "Balance due", value: "$0 — paid in full", mono: true },
          ]} />
        </div>
      )}
    </div>
  );
}

/* ------------------------------- Property 360 ------------------------------ */

function Property360({ propertyId }) {
  const name = propertyId || "The Pinewood Estate";
  const details = propertyDetails[name] || propertyDetails["The Pinewood Estate"];
  const basic = realProperties.find((p) => p.name === name) || realProperties[0];

  return (
    <div>
      <PageTitle
        eyebrow="Property intelligence · Every property as its own digital asset"
        title={`Property 360 — ${name}`}
        sub={`${basic.loc} · the digital twin for one luxury property`}
      />
      <div className="grid grid-cols-4 gap-4 mb-5">
        <KpiCard label="Health score" value="88" icon={ShieldCheck} />
        <KpiCard label="Occupancy" value={details.occupancy} icon={Gauge} />
        <KpiCard label="Guest rating" value={details.rating} icon={Star} mono={false} />
        <KpiCard label="Open tickets" value={details.openTickets} icon={Wrench} positive={details.openTickets === 0} />
      </div>

      <div className="grid grid-cols-3 gap-5 mb-5">
        <InfoList title="Property details" items={[
          { label: "Owner", value: details.owner },
          { label: "Investor", value: details.investor },
          { label: "Current revenue", value: details.revenue },
          { label: "Rating", value: details.rating },
          { label: "Inspection", value: details.inspection },
          { label: "Last review", value: details.review },
        ]} />
        <InfoList title="Operations snapshot" items={[
          { label: "Utilities", value: details.utilities },
          { label: "Maintenance", value: details.maintenance },
          { label: "Housekeeping", value: details.housekeeping },
          { label: "Insurance", value: details.insurance },
          { label: "Warranty", value: details.warranty },
        ]} />
        <InfoList title="Assets" items={[
          { label: "Photos", value: `${details.photos} files` },
          { label: "Documents", value: `${details.documents} docs` },
          { label: "Bookings", value: details.bookings },
          { label: "Expenses", value: details.expenses },
          { label: "Profit", value: details.profit },
        ]} />
      </div>
      <div className="grid grid-cols-2 gap-5 mb-5">
        <Card>
          <SectionLabel>Contracts & documents</SectionLabel>
          <div className="space-y-3 mt-3">
            {details.contracts.split(", ").map((item) => (
              <div key={item} className="flex items-center justify-between text-sm" style={{ color: COLORS.ink2 }}>
                <span>{item}</span>
                <Pill tone="ok">On file</Pill>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <SectionLabel>AI recommendations</SectionLabel>
          <p className="text-sm leading-relaxed" style={{ color: COLORS.ink2 }}>{details.aiRecommendations}</p>
        </Card>
      </div>
      <div className="grid grid-cols-3 gap-5 mb-5">
        <InfoList title="Maintenance timeline" items={[
          { label: "Next inspection", value: details.inspection },
          { label: "Recent issue", value: details.maintenance },
        ]} />
        <InfoList title="Revenue timeline" items={[
          { label: "Revenue", value: details.revenue },
          { label: "Profit", value: details.profit },
        ]} />
        <InfoList title="Booking & guest" items={[
          { label: "Bookings", value: details.bookings },
          { label: "Guest rating", value: details.rating },
        ]} />
      </div>

      <div className="grid grid-cols-2 gap-5 mb-5">
        <QueueCard
          title="Occupancy & booking timeline"
          rows={[
            { title: "Kessler party", meta: "Jul 15–19, 2026", tag: "In-house", tone: "warn" },
            { title: "Nguyen party", meta: "Jul 22–26, 2026", tag: "Confirmed", tone: "ok" },
            { title: "Maintenance hold", meta: "Jul 20–21, 2026 — HVAC diagnostic", tag: "Blocked", tone: "idle" },
          ]}
        />
        <QueueCard
          title="Maintenance timeline & inspections"
          rows={[
            { title: "HVAC diagnostic", meta: "Scheduled in 3 days — 3rd visit in 60 days", tag: "Watch", tone: "warn" },
            { title: "Quarterly inspection", meta: "Completed 3 weeks ago — passed, 2 minor notes", tag: "Complete", tone: "ok" },
            { title: "Dock resealing", meta: "Completed last month", tag: "Complete", tone: "ok" },
          ]}
        />
      </div>

      <div className="grid grid-cols-3 gap-5">
        <InfoList title="Incident history" items={[
          { label: "Water leak, guest bath", value: "Resolved, 4 months ago" },
          { label: "Power outage (regional)", value: "No damage, 7 months ago" },
        ]} />
        <InfoList title="Recent guest reviews" items={[
          { label: "Kessler party (prior stay)", value: "5.0 ★" },
          { label: "Osei party", value: "4.8 ★" },
          { label: "Delacroix party", value: "5.0 ★" },
        ]} />
        <AICopilot
          name="AI Property Copilot"
          subtitle="Scoped to this property"
          capabilities={["Summarize condition", "Explain the HVAC pattern", "Draft an owner update", "Check warranty status"]}
          sampleQ="Is the HVAC issue covered under warranty?"
          sampleA="The unit's manufacturer warranty covers parts through 2027, but this is the third service call in 60 days — worth requesting a full diagnostic rather than another spot repair before it lapses into a labor-only claim."
        />
      </div>
    </div>
  );
}

/* --------------------------- Growth & Marketing ---------------------------- */

function GrowthMarketing() {
  return (
    <div>
      <PageTitle
        eyebrow="Growth · New department"
        title="Growth & Marketing"
        sub="Revenue generation, not social media alone — measured in pipeline value, conversion, acquisition cost, and ROI"
      />
      <div className="grid grid-cols-4 gap-4 mb-6">
        <KpiCard label="Pipeline value" value="$1.8M" icon={Target} mono={false} />
        <KpiCard label="Blended conversion" value="14%" icon={Percent} />
        <KpiCard label="Owner acquisition cost" value="$640" icon={DollarSign} mono={false} />
        <KpiCard label="Marketing ROI" value="4.2x" icon={TrendingUp} mono={false} />
      </div>

      <div className="grid grid-cols-2 gap-5 mb-5">
        <Card>
          <SectionLabel>Owner acquisition funnel</SectionLabel>
          <div className="space-y-2.5 mt-2">
            {[
              { stage: "Audit requests", val: 31 },
              { stage: "Audits delivered", val: 27 },
              { stage: "Qualified leads", val: 14 },
              { stage: "Onboarded", val: 8 },
            ].map((s) => (
              <div key={s.stage} className="flex items-center justify-between text-sm">
                <span style={{ color: COLORS.ink2 }}>{s.stage}</span>
                <span style={{ fontFamily: "'IBM Plex Mono', monospace", color: COLORS.ink }}>{s.val}</span>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <SectionLabel>Investor acquisition funnel</SectionLabel>
          <div className="space-y-2.5 mt-2">
            {[
              { stage: "Guide downloads", val: 142 },
              { stage: "Consultations booked", val: 23 },
              { stage: "Proposals sent", val: 11 },
              { stage: "Closed", val: 4 },
            ].map((s) => (
              <div key={s.stage} className="flex items-center justify-between text-sm">
                <span style={{ color: COLORS.ink2 }}>{s.stage}</span>
                <span style={{ fontFamily: "'IBM Plex Mono', monospace", color: COLORS.ink }}>{s.val}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-3 gap-5 mb-5">
        <InfoList title="Campaigns & SEO" items={[
          { label: "Active campaigns", value: "3" },
          { label: "Organic search sessions, MTD", value: "8,240", mono: true },
          { label: "Top keyword rank", value: "#4 luxury rental mgmt" },
        ]} />
        <InfoList title="Review management" items={[
          { label: "Avg. rating across platforms", value: "4.9 ★" },
          { label: "New reviews, MTD", value: "14" },
          { label: "Unanswered reviews", value: "1" },
        ]} />
        <InfoList title="Competitor intelligence" items={[
          { label: "Tracked competitors", value: "5" },
          { label: "Avg. competitor ADR", value: "$3,180", mono: true },
          { label: "Off Grid ADR premium", value: "+21%", mono: true },
        ]} />
      </div>

      <div className="grid grid-cols-3 gap-5">
        <Card className="col-span-2" pad={false}>
          <div className="p-5 pb-3"><SectionLabel action="Email · Social · Content">Campaign & content calendar</SectionLabel></div>
          {[
            { title: "Investor guide email sequence", meta: "Email · sending this week", tone: "ok" },
            { title: "“Discretion & Privacy” brand story", meta: "Social · Journal launch content", tone: "warn" },
            { title: "Referral partner spotlight", meta: "Social · scheduled next week", tone: "idle" },
          ].map((c, i) => (
            <div key={i} className="flex items-center justify-between px-5 py-3 text-sm" style={{ borderTop: `1px solid ${COLORS.line}` }}>
              <div className="flex items-center gap-3">
                <StatusDot tone={c.tone} />
                <div style={{ color: COLORS.ink }}>{c.title}</div>
              </div>
              <span className="text-xs" style={{ color: COLORS.mist }}>{c.meta}</span>
            </div>
          ))}
        </Card>
        <AICopilot
          name="AI Marketing Strategist"
          subtitle="+ AI Content Studio"
          capabilities={["Draft campaign copy", "Analyze lead attribution", "Suggest SEO content", "Summarize competitor moves"]}
          sampleQ="Which channel is driving the best owner leads?"
          sampleA="Referral partners are converting at 3x the rate of paid search this quarter, at roughly a third of the acquisition cost — worth shifting incremental budget toward the referral program."
        />
      </div>
    </div>
  );
}

/* --------------------------- Vision / final screen --------------------- */

const roadmap = [
  { phase: "Phase 1", title: "Operational Discovery", desc: "Map how work actually moves today — every handoff, every SOP, every bottleneck — before designing anything new." },
  { phase: "Phase 2", title: "AI Foundation", desc: "Stand up the shared data layer and automation backbone every agent and module will run on." },
  { phase: "Phase 3", title: "Department AI Agents", desc: "Launch the agents scoped to a single team's responsibilities — operations, owners, guests, maintenance." },
  { phase: "Phase 4", title: "Operational Intelligence", desc: "Connect every module into one operating picture — bottlenecks, health scores, and trends surface on their own." },
  { phase: "Phase 5", title: "Executive Copilot", desc: "The daily briefing writes itself, and every strategic recommendation is grounded in that day's real data." },
];

function VisionPage() {
  return (
    <div>
      <div className="relative rounded-2xl overflow-hidden mb-8" style={{ background: COLORS.ink }}>
        <Topo className="absolute -right-10 -top-10 w-[420px] h-[420px]" opacity={0.14} stroke={COLORS.brassLight} />
        <div className="relative p-10 max-w-2xl">
          <Eyebrow>Future state vision</Eyebrow>
          <h1 className="text-[34px] leading-[1.15] mt-2" style={{ fontFamily: "'Fraunces', serif", color: COLORS.canvas, fontWeight: 500 }}>
            "Luxury is not about being seen. It's about how you feel when no one is watching."
          </h1>
          <p className="text-sm mt-4 leading-relaxed" style={{ color: "rgba(242,241,236,0.72)" }}>
            That's Off Grid's own philosophy, not ours. The AI Operating System exists to protect it — Modern Adventurers,
            Discretion & Privacy, Elite Community, and Grounded in Luxury — as the business grows from a boutique
            seven-property portfolio to many more, without losing the precision that makes the brand what it is.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-x-10 gap-y-5 mb-10">
        {[
          "It augments teams — every agent is scoped to one job and hands off to a person at the edge of its judgment.",
          "It centralizes operational intelligence — one operating picture instead of six disconnected tools.",
          "It reduces repetitive work — statements, replies, and triage happen in seconds, not hours.",
          "It standardizes knowledge — the right answer is retrievable, not dependent on who's on shift.",
          "It enables faster decisions — the executive briefing is grounded in that day's real data.",
          "It creates operational visibility — bottlenecks and health scores surface before they become problems.",
          "It scales with growth — the system absorbs new properties without a proportional headcount increase.",
        ].map((t, i) => (
          <div key={i} className="flex items-start gap-3">
            <CheckCircle2 size={16} style={{ color: COLORS.brass, marginTop: 2, flexShrink: 0 }} />
            <p className="text-sm leading-relaxed" style={{ color: COLORS.ink2 }}>{t}</p>
          </div>
        ))}
      </div>

      <SectionLabel>Possible implementation roadmap</SectionLabel>
      <div className="relative pl-6">
        <div className="absolute left-[7px] top-2 bottom-2 w-px" style={{ background: COLORS.line }} />
        <div className="space-y-8">
          {roadmap.map((r, i) => (
            <div key={r.phase} className="relative">
              <div
                className="absolute -left-6 top-0.5 w-3.5 h-3.5 rounded-full"
                style={{ background: COLORS.canvas, border: `2px solid ${COLORS.brass}` }}
              />
              <Eyebrow>{r.phase}</Eyebrow>
              <div className="text-base mt-1" style={{ fontFamily: "'Fraunces', serif", color: COLORS.ink, fontWeight: 500 }}>
                {r.title}
              </div>
              <p className="text-sm mt-1 leading-relaxed max-w-xl" style={{ color: COLORS.mist }}>{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SettingsPage() {
  return (
    <div>
      <PageTitle eyebrow="System" title="Settings" sub="Workspace, team, and integration configuration" />
      <div className="grid grid-cols-2 gap-5">
        <Card>
          <SectionLabel>Workspace</SectionLabel>
          <div className="space-y-3 text-sm" style={{ color: COLORS.ink2 }}>
            <div className="flex justify-between py-2" style={{ borderBottom: `1px solid ${COLORS.line}` }}><span>Organization</span><span style={{ color: COLORS.ink }}>Off Grid VIP</span></div>
            <div className="flex justify-between py-2" style={{ borderBottom: `1px solid ${COLORS.line}` }}><span>Properties</span><span style={{ color: COLORS.ink }}>7</span></div>
            <div className="flex justify-between py-2"><span>Team members</span><span style={{ color: COLORS.ink }}>18</span></div>
          </div>
        </Card>
        <Card>
          <SectionLabel>Integrations</SectionLabel>
          <div className="space-y-3 text-sm" style={{ color: COLORS.ink2 }}>
            <div className="flex justify-between py-2" style={{ borderBottom: `1px solid ${COLORS.line}` }}><span>Notion</span><Pill tone="ok">Connected</Pill></div>
            <div className="flex justify-between py-2" style={{ borderBottom: `1px solid ${COLORS.line}` }}><span>n8n</span><Pill tone="ok">Connected</Pill></div>
            <div className="flex justify-between py-2"><span>Accounting system</span><Pill tone="ok">Connected</Pill></div>
          </div>
        </Card>
      </div>
    </div>
  );
}

/* ------------------------------ Login ---------------------------------- */

function Login({ onLogin }) {
  const [show, setShow] = useState(false);
  return (
    <div className="min-h-screen w-full flex items-center justify-center relative" style={{ background: COLORS.ink }}>
      <Topo className="absolute right-0 bottom-0 w-[520px] h-[520px]" opacity={0.1} stroke={COLORS.brassLight} />
      <Topo className="absolute left-0 top-0 w-[420px] h-[420px] -scale-x-100" opacity={0.06} stroke={COLORS.brassLight} />
      <div className="relative w-[380px]">
        <div className="flex items-center gap-2 mb-8 justify-center">
          <Mountain size={20} color={COLORS.brass} strokeWidth={1.75} />
          <span className="tracking-[0.14em] text-sm uppercase" style={{ color: COLORS.canvas, fontFamily: "'IBM Plex Mono', monospace" }}>
            Off Grid VIP
          </span>
        </div>
        <div className="rounded-2xl p-8" style={{ background: "#181F1D", border: "1px solid rgba(242,241,236,0.08)" }}>
          <h1 className="text-xl mb-1" style={{ fontFamily: "'Fraunces', serif", color: COLORS.canvas, fontWeight: 500 }}>
            AI Operating System
          </h1>
          <p className="text-xs mb-6" style={{ color: COLORS.mist }}>Future State Vision · Discovery Workshop Prototype</p>

          <label className="text-xs" style={{ color: COLORS.mist }}>Email</label>
          <div className="flex items-center gap-2 mt-1.5 mb-4 rounded-lg px-3 py-2.5" style={{ background: COLORS.ink, border: "1px solid rgba(242,241,236,0.1)" }}>
            <Mail size={14} style={{ color: COLORS.mist }} />
            <input defaultValue="founder@offgridvip.com" className="bg-transparent text-sm w-full outline-none" style={{ color: COLORS.canvas }} />
          </div>

          <label className="text-xs" style={{ color: COLORS.mist }}>Password</label>
          <div className="flex items-center gap-2 mt-1.5 mb-6 rounded-lg px-3 py-2.5" style={{ background: COLORS.ink, border: "1px solid rgba(242,241,236,0.1)" }}>
            <Lock size={14} style={{ color: COLORS.mist }} />
            <input type={show ? "text" : "password"} defaultValue="••••••••••" className="bg-transparent text-sm w-full outline-none" style={{ color: COLORS.canvas }} />
            <button onClick={() => setShow((s) => !s)} aria-label="Toggle password visibility">
              {show ? <EyeOff size={14} style={{ color: COLORS.mist }} /> : <Eye size={14} style={{ color: COLORS.mist }} />}
            </button>
          </div>

          <button
            onClick={onLogin}
            className="w-full py-2.5 rounded-lg text-sm font-medium transition-opacity hover:opacity-90"
            style={{ background: COLORS.brass, color: COLORS.ink }}
          >
            Enter workspace
          </button>
        </div>
        <p className="text-center text-xs mt-5" style={{ color: "rgba(140,150,145,0.7)" }}>
          Conceptual prototype for internal discovery — not the current production system.
        </p>
      </div>
    </div>
  );
}

/* ------------------------------ Shell ----------------------------------- */

function Sidebar({ active, setActive, collapsed, setCollapsed }) {
  return (
    <div
      className="h-screen sticky top-0 flex flex-col shrink-0 transition-all duration-200"
      style={{ width: collapsed ? 72 : 248, background: COLORS.ink }}
    >
      <div className="relative flex items-center gap-2 px-5 py-5 overflow-hidden">
        <Mountain size={18} color={COLORS.brass} strokeWidth={1.75} className="shrink-0" />
        {!collapsed && (
          <span className="tracking-[0.12em] text-[13px] uppercase whitespace-nowrap" style={{ color: COLORS.canvas, fontFamily: "'IBM Plex Mono', monospace" }}>
            Off Grid VIP
          </span>
        )}
      </div>

      <div className="flex-1 overflow-y-auto px-3 pb-4" style={{ scrollbarWidth: "none" }}>
        {navSections.map((sec) => (
          <div key={sec.label} className="mb-4">
            {!collapsed && (
              <div className="px-2.5 mb-1.5 text-[10px] tracking-[0.12em] uppercase" style={{ color: "rgba(140,150,145,0.6)" }}>
                {sec.label}
              </div>
            )}
            {sec.items.map((it) => {
              const Icon = it.icon;
              const isActive = active === it.id;
              return (
                <button
                  key={it.id}
                  onClick={() => setActive(it.id)}
                  className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[13px] mb-0.5 transition-colors"
                  style={{
                    background: isActive ? "rgba(184,134,60,0.14)" : "transparent",
                    color: isActive ? COLORS.brassLight : "rgba(242,241,236,0.72)",
                  }}
                >
                  <Icon size={15} strokeWidth={1.75} className="shrink-0" />
                  {!collapsed && <span className="whitespace-nowrap">{it.label}</span>}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      <button
        onClick={() => setCollapsed((c) => !c)}
        className="flex items-center gap-2 px-5 py-4 text-xs"
        style={{ color: "rgba(140,150,145,0.7)", borderTop: "1px solid rgba(242,241,236,0.08)" }}
      >
        {collapsed ? <ChevronRight size={14} /> : <><ChevronLeft size={14} /> Collapse</>}
      </button>
    </div>
  );
}

const pageMeta = {
  dashboard: "Dashboard",
  properties: "Properties",
  property360: "Property 360",
  owners: "Owners",
  guests: "Guests",
  bookings: "Bookings",
  "portal-owner": "Owner Portal",
  "portal-investor": "Investor Portal",
  "portal-vendor": "Vendor Portal",
  "portal-guest": "Guest Portal",
  operations: "Operations",
  housekeeping: "Housekeeping",
  maintenance: "Maintenance",
  concierge: "Concierge",
  revenue: "Revenue Management",
  growthmarketing: "Growth & Marketing",
  events: "Experiential & Events",
  investment: "Investment",
  acquisition: "Owner Acquisition",
  "investor-relations": "Investor Lifecycle",
  "vendor-recruitment": "Vendor Lifecycle",
  "partner-network": "Partner Network",
  pipeline: "Property Pipeline",
  onboarding: "Property Onboarding",
  "active-portfolio": "Active Portfolio",
  "sop-center": "SOP Center",
  "revenue-intelligence": "Revenue Intelligence",
  "owner-payouts": "Owner Payouts",
  "vendor-payments": "Vendor Payments",
  "financial-operations": "Financial Operations",
  forecasting: "Forecasting",
  partners: "Partners",
  discretion: "Trust, Discretion & Risk",
  knowledge: "Knowledge Base",
  documents: "Documents",
  automation: "Automation Center",
  agents: "AI Agents",
  reports: "Reports",
  executive: "Executive Intelligence",
  vision: "AIOS Vision",
  settings: "Settings",
};

function TopBar({ active }) {
  return (
    <div className="sticky top-0 z-10 flex items-center justify-between px-8 py-4" style={{ background: "rgba(242,241,236,0.88)", backdropFilter: "blur(8px)", borderBottom: `1px solid ${COLORS.line}` }}>
      <div className="flex items-center gap-1.5 text-xs" style={{ color: COLORS.mist }}>
        <span>Off Grid VIP</span>
        <ChevronRight size={12} />
        <span style={{ color: COLORS.ink }}>{pageMeta[active]}</span>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg" style={{ background: "white", border: `1px solid ${COLORS.line}` }}>
          <Search size={13} style={{ color: COLORS.mist }} />
          <input placeholder="Search" className="text-xs outline-none bg-transparent w-32" />
        </div>
        <button className="relative"><Bell size={16} style={{ color: COLORS.mist }} /><span className="absolute -top-1 -right-1 w-2 h-2 rounded-full" style={{ background: COLORS.ember }} /></button>
        <div className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-medium" style={{ background: COLORS.forest, color: COLORS.canvas, fontFamily: "'IBM Plex Mono', monospace" }}>
          OG
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [active, setActive] = useState("dashboard");
  const [collapsed, setCollapsed] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState("The Pinewood Estate");

  const page = useMemo(() => {
    switch (active) {
      case "dashboard": return <Dashboard />;
      case "properties": return <Properties onOpenProperty={(name) => { setSelectedProperty(name); setActive("property360"); }} />;
      case "property360": return <Property360 propertyId={selectedProperty} />;
      case "owners": return <Owners />;
      case "guests": return <Guests />;
      case "bookings": return <Bookings />;
      case "portal-owner": return <OwnerPortal />;
      case "portal-investor": return <InvestorPortal />;
      case "portal-vendor": return <VendorPortal />;
      case "portal-guest": return <GuestPortal />;
      case "operations": return <Operations />;
      case "housekeeping": return <Housekeeping />;
      case "maintenance": return <Maintenance />;
      case "concierge": return <Concierge />;
      case "revenue": return <RevenueManagement />;
      case "growthmarketing": return <GrowthMarketing />;
      case "events": return <ExperientialEvents />;
      case "investment": return <Investment />;
      case "acquisition": return <OwnerAcquisition />;
      case "owner-acquisition": return <OwnerAcquisition />;
      case "investor-relations": return <InvestorRelations />;
      case "partner-network": return <Partners />;
      case "vendor-recruitment": return <VendorRecruitment />;
      case "pipeline": return <PropertyPipeline onOpenProperty={(name) => { setSelectedProperty(name); setActive("property360"); }} />;
      case "onboarding": return <PropertyOnboarding />;
      case "active-portfolio": return <ActivePortfolio onOpenProperty={(name) => { setSelectedProperty(name); setActive("property360"); }} />;
      case "sop-center": return <SOPCenter />;
      case "revenue-intelligence": return <RevenueIntelligence />;
      case "owner-payouts": return <OwnerPayouts />;
      case "vendor-payments": return <VendorPayments />;
      case "financial-operations": return <FinancialOperations />;
      case "forecasting": return <Forecasting />;
      case "partners": return <Partners />;
      case "discretion": return <TrustDiscretion />;
      case "knowledge": return <KnowledgeBase />;
      case "documents": return <Documents />;
      case "automation": return <AutomationCenter />;
      case "agents": return <AIAgents />;
      case "reports": return <Reports />;
      case "executive": return <ExecutiveIntelligence />;
      case "vision": return <VisionPage />;
      case "settings": return <SettingsPage />;
      default: return <Dashboard />;
    }
  }, [active, selectedProperty]);

  if (!loggedIn) return (
    <>
      <style>{FONT_IMPORT}</style>
      <Login onLogin={() => setLoggedIn(true)} />
    </>
  );

  return (
    <>
      <style>{FONT_IMPORT}</style>
      <div className="flex min-h-screen w-full" style={{ background: COLORS.canvas, fontFamily: "'Inter', sans-serif" }}>
        <Sidebar active={active} setActive={setActive} collapsed={collapsed} setCollapsed={setCollapsed} />
        <div className="flex-1 min-w-0">
          <TopBar active={active} />
          <div className="px-8 py-7 max-w-[1400px]">{page}</div>
        </div>
      </div>
    </>
  );
}
