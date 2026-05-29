"use client"

import { useState, useEffect, useRef, type ReactNode } from"react"
import {
  Leaf,
  Menu,
  X,
  ArrowRight,
  Award,
  AlertTriangle,
  ShieldOff,
  ShieldCheck,
  CheckCircle,
  ClipboardList,
  MapPin,
  Sprout,
  PackageCheck,
  FileText,
  Globe,
  FlaskConical,
  MapPinned,
  Droplets,
  TestTube,
  FileCheck,
  Truck,
  ScanLine,
  MessageCircle,
  Phone,
  Mail,
  ChevronUp,
  Star,
  Store,
  FileQuestion,
} from"lucide-react"

// =============================================================================
// =============================================================================
// FOR WHOM — stacked flash cards
// =============================================================================
function ForWhomCards() {
  const cards = [
    {
      label: "For the landowner",
      icon: MapPin,
      text: "A trusted operating partner who manages your land transparently, improves its productivity, and keeps you informed every step of the way.",
      cta: "Partner with us",
    },
    {
      label: "For the business",
      icon: PackageCheck,
      text: "A single accountable source for traceable, documented, quality-assured agricultural supply. No middlemen opacity. No season-to-season uncertainty.",
      cta: "Get a quote",
    },
    {
      label: "For the farmer",
      icon: Sprout,
      text: "An organised, supported way to grow. With the right knowledge, the right inputs, and a system that finally works in their favour.",
      cta: "Join the network",
    },
  ]

  const [active, setActive] = useState(0)
  const [leaving, setLeaving] = useState(false)

  const next = () => {
    if (leaving) return
    setLeaving(true)
    setTimeout(() => {
      setActive(i => (i + 1) % cards.length)
      setLeaving(false)
    }, 350)
  }

  return (
    <div className="flex-1 flex flex-col gap-6 w-full">
      {/* Stack */}
      <div className="relative w-full" style={{ height: 460 }}>
        {cards.map((card, i) => {
          const offset = (i - active + cards.length) % cards.length
          // 0 = front, 1 = middle, 2 = back
          const isFront  = offset === 0
          const isMid    = offset === 1
          const isBack   = offset === 2

          if (!isFront && !isMid && !isBack) return null

          return (
            <div
              key={i}
              onClick={isFront ? next : undefined}
              className="absolute inset-0 rounded-2xl border p-10 flex flex-col"
              style={{
                background: "#F0FDF4",
                border: "1.5px solid #BBF7D0",
                boxShadow: isFront
                  ? "0 8px 32px rgba(27,107,58,0.14)"
                  : "0 2px 8px rgba(27,107,58,0.06)",
                transform: isFront
                  ? leaving ? "translateY(-12px) scale(0.94) rotate(-2deg)" : "translateY(0) scale(1) rotate(0deg)"
                  : isMid
                  ? "translateY(18px) scale(0.95) rotate(1.5deg)"
                  : "translateY(32px) scale(0.90) rotate(-1deg)",
                zIndex: isFront ? 3 : isMid ? 2 : 1,
                opacity: isFront ? (leaving ? 0 : 1) : isMid ? 0.85 : 0.6,
                cursor: isFront ? "pointer" : "default",
                transition: "transform 0.35s ease, opacity 0.35s ease",
                pointerEvents: isFront ? "auto" : "none",
              }}
            >
              {isFront && (
                <>
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 flex-shrink-0"
                    style={{ background: "rgba(27,107,58,0.08)" }}
                  >
                    <card.icon className="w-7 h-7" style={{ color: "#1B6B3A" }} />
                  </div>
                  <p className="text-xl font-bold text-[#111827] mb-4">{card.label}</p>
                  <p className="text-[#4B5563] leading-relaxed flex-1">{card.text}</p>
                  <div className="flex items-center justify-between mt-6">
                    <div className="flex items-center gap-2 text-sm font-semibold" style={{ color: "#1B6B3A" }}>
                      {card.cta} <ArrowRight className="w-4 h-4" />
                    </div>
                    <span className="text-xs text-[#9CA3AF]">tap to cycle →</span>
                  </div>
                </>
              )}
            </div>
          )
        })}
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2">
        {cards.map((_, i) => (
          <div
            key={i}
            className="rounded-full transition-all duration-300"
            style={{
              width: active === i ? 20 : 8,
              height: 8,
              background: active === i ? "#1B6B3A" : "#BBF7D0",
            }}
          />
        ))}
      </div>
    </div>
  )
}

// =============================================================================
function AnimatedFaaS() {
  const fonts = [
    { family: "var(--font-inter, sans-serif)",    weight: "900", style: "normal",  label: "FaaS" },
    { family: "var(--font-playfair, serif)",       weight: "700", style: "italic",  label: "FaaS" },
    { family: "var(--font-mono, monospace)",       weight: "800", style: "normal",  label: "FaaS" },
    { family: "Georgia, serif",                    weight: "700", style: "normal",  label: "FaaS" },
    { family: "var(--font-inter, sans-serif)",     weight: "900", style: "italic",  label: "FaaS" },
  ]
  const [idx, setIdx] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setIdx(prev => (prev + 1) % fonts.length)
        setVisible(true)
      }, 200)
    }, 1800)
    return () => clearInterval(interval)
  }, [])

  const f = fonts[idx]
  return (
    <span
      style={{
        fontFamily: f.family,
        fontWeight: f.weight,
        fontStyle: f.style,
        color: "#1B6B3A",
        display: "inline-block",
        transition: "opacity 0.2s ease, transform 0.2s ease",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(6px)",
      }}
    >
      FaaS
    </span>
  )
}

// =============================================================================
// FADE IN ANIMATION WRAPPER
// =============================================================================
function FadeInSection({ children, className ="", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        isVisible ?"opacity-100 translate-y-0" :"opacity-0 translate-y-5"
      } ${className}`}
    >
      {children}
    </div>
  )
}

// =============================================================================
// ANIMATED COUNTER
// =============================================================================
function AnimatedCounter({ target, suffix ="" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [count, setCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          let start = 0
          const duration = 2000
          const increment = target / (duration / 16)
          const timer = setInterval(() => {
            start += increment
            if (start >= target) {
              setCount(target)
              clearInterval(timer)
            } else {
              setCount(Math.floor(start))
            }
          }, 16)
        }
      },
      { threshold: 0.5 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [target, hasAnimated])

  return (
    <span ref={ref} className="font-mono text-4xl md:text-5xl font-bold text-white tabular-nums">
      {count}{suffix}
    </span>
  )
}

// =============================================================================
// MAIN PAGE COMPONENT
// =============================================================================
export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Always scroll to top on page load/refresh
  useEffect(() => {
    window.scrollTo(0, 0)
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual'
    }
  }, [])
  const [scrolled, setScrolled] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [buyerType, setBuyerType] = useState<string | null>(null)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    fullName:"",
    company:"",
    phone:"",
    email:"",
    crops:"",
    volume:"",
    landLocation:"",
    acres:"",
    landUse:"",
  })

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
      setShowScrollTop(window.scrollY > 500)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior:"smooth" })
    }
    setMobileMenuOpen(false)
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormSubmitted(true)
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior:"smooth" })
  }

  const navLinks = [
    { label:"How It Works", id:"how-it-works" },
    { label:"Services", id:"services" },
    { label:"Traceability", id:"traceability" },
    { label:"Why Ayra", id:"about" },
    { label:"About Us", id:"team" },
    { label:"Contact", id:"contact" },
  ]

  const buyerTypes = ["Brand / FMCG","HoReCa","Food Processor","Exporter"]

  return (
    <main className="min-h-screen overflow-x-hidden w-full relative">
      {/* Global Universal Background */}
      <div 
        className="fixed inset-0 -z-10"
        style={{
          background:"linear-gradient(135deg, #f0fdf4 0%, #dcfce7 30%, #f9fafb 70%, #f4fbf6 100%)"
        }}
      />
      {/* Global Grid Pattern Overlay */}
      <div 
        className="fixed inset-0 -z-10 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      />
      {/* ===================================================================== */}
      {/* SECTION 1: NAVIGATION BAR */}
      {/* ===================================================================== */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ?"bg-white shadow-sm" :"bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <Leaf className="w-7 h-7 text-[#1B6B3A]" />
              <span className="text-xl font-bold text-[#111827]">Ayra Farm Labs</span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="text-[#111827] hover:text-[#1B6B3A] transition-colors text-sm font-medium"
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* Desktop CTA */}
            <button
              onClick={() => scrollToSection("contact")}
              className="hidden md:flex items-center gap-2 bg-[#1B6B3A] hover:bg-[#155530] text-white px-6 py-2.5 rounded-md text-sm font-medium transition-colors"
            >
              Get a Quote
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#111827]"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-[#E5E7EB]">
            <div className="px-4 py-4 space-y-3">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="block w-full text-left text-[#111827] hover:text-[#1B6B3A] py-2 text-base font-medium"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Mobile Sticky Bottom CTA */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-[#E5E7EB] p-3">
        <button
          onClick={() => scrollToSection("contact")}
          className="w-full bg-[#1B6B3A] hover:bg-[#155530] text-white py-3 rounded-md text-base font-medium transition-colors"
        >
          Get a Quote
        </button>
      </div>

      {/* ===================================================================== */}
      {/* SECTION 2: HERO */}
      {/* ===================================================================== */}
      <section className="relative overflow-hidden pt-20" style={{ minHeight: "100vh" }}>

        {/* Full hero background image */}
        <div className="absolute inset-0 pointer-events-none">
          <img src="/farm-hero.jpg" alt="" className="w-full h-full object-cover opacity-25" />
          {/* Light overlay so text stays readable */}
          <div className="absolute inset-0"
            style={{ background: "linear-gradient(to right, rgba(240,253,244,0.85) 0%, rgba(240,253,244,0.55) 45%, rgba(240,253,244,0.15) 100%)" }} />
        </div>

        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="flex flex-col">

            {/* LEFT — text */}
            <div className="flex-1 lg:max-w-[65%] text-left z-10">
              <FadeInSection>
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1B6B3A]/[0.07] border border-[#1B6B3A]/15 mb-8">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#1B6B3A] animate-pulse" />
                  <span className="text-xs font-semibold tracking-wide text-[#1B6B3A] uppercase">
                    Incubated · AgHub PJTSAU · Hyderabad
                  </span>
                </div>

                {/* Headline */}
                <h1 className="font-black tracking-tight text-[#0D1B0F] leading-[1.05] mb-5"
                  style={{ fontSize: "clamp(3rem, 6.5vw, 5.8rem)", letterSpacing: "-0.02em", fontFamily: "var(--font-poppins, sans-serif)", fontWeight: 800 }}>
                  India&apos;s first <span className="text-[#1B6B3A] italic"><AnimatedFaaS /></span>
                  <br />Farms as a Service.
                </h1>

                {/* Subheadline */}
                <p className="text-base md:text-lg leading-relaxed mb-4" style={{ color: "#374151" }}>
                  We grow it. We document it.{" "}
                  <span className="text-[#1B6B3A] font-semibold">We deliver it.</span>
                </p>
                <p className="text-sm md:text-base leading-relaxed mb-10 max-w-md" style={{ color: "#6B7280" }}>
                  Contract farming for FMCG, HoReCa, and exporters who can&apos;t afford a failed audit.
                </p>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-4 mb-10">
                  <button
                    onClick={() => scrollToSection("contact")}
                    className="inline-flex items-center justify-center gap-2 bg-[#1B6B3A] hover:bg-[#155530] text-white px-8 py-4 rounded-xl text-base font-bold transition-all shadow-xl shadow-[#1B6B3A]/25 hover:-translate-y-0.5"
                  >
                    Get a Custom Quote
                    <ArrowRight className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => scrollToSection("how-it-works")}
                    className="inline-flex items-center justify-center gap-2 bg-white border-2 border-[#1B6B3A]/20 text-[#1B6B3A] hover:border-[#1B6B3A] hover:bg-[#F0FDF4] px-8 py-4 rounded-xl text-base font-semibold transition-all hover:-translate-y-0.5"
                  >
                    See How It Works
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </FadeInSection>
            </div>


          </div>
        </div>


      </section>
      {/* ===================================================================== */}
      {/* CREDIBILITY STRIP */}
      {/* ===================================================================== */}
      <div className="border-y border-[#E5E7EB] py-5 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10">
            <p className="text-xs font-medium tracking-widest text-[#9CA3AF] uppercase whitespace-nowrap">
              Backed by
            </p>
            <div className="flex items-center gap-8 flex-wrap justify-center">
              {/* AgHub logo */}
              <img
                src="/AgHub-Logo-1030x489.png"
                alt="AgHub PJTSAU"
                className="h-8 object-contain opacity-70 hover:opacity-100 transition-opacity"
              />
              {/* APEDA logo */}
              <img
                src="/apeda-logo.png"
                alt="APEDA"
                className="h-8 object-contain opacity-70 hover:opacity-100 transition-opacity"
              />
              {/* Text badge */}
              <span className="text-xs font-semibold text-[#6B7280] border border-[#E5E7EB] px-3 py-1.5 rounded-full">
                AgHub Incubatee
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ===================================================================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div style={{ height: "1px", background: "rgba(27,107,58,0.08)" }} /></div>

      {/* SECTION 3: PROBLEM SECTION */}
      {/* ===================================================================== */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#111827] mb-4" style={{ fontFamily: "var(--font-poppins, sans-serif)", fontWeight: 800 }}>
              Is your supplier giving <span className="text-[#1B6B3A]">you this?</span>
            </h2>
            <p className="text-lg text-[#6B7280] max-w-2xl mx-auto">
              Most mandi-sourced supply chains cannot answer these questions. Yours should.
            </p>
          </FadeInSection>

          <FadeInSection>
            <div className="rounded-2xl overflow-hidden border border-[#E5E7EB] shadow-sm">
              {/* Column headers */}
              <div className="grid grid-cols-2">
                <div className="flex items-center gap-3 px-6 py-4 bg-[#FEF9F0] border-b border-[#E5E7EB] border-r border-[#E5E7EB]">
                  <div className="w-8 h-8 rounded-lg bg-[#FEF3C7] flex items-center justify-center flex-shrink-0">
                    <Store className="w-4 h-4 text-[#B45309]" />
                  </div>
                  <div>
                    <p className="font-bold text-[#111827] text-sm">Traditional Supplier</p>
                    <p className="text-[10px] text-[#9CA3AF]">Uncertain. Unverified. Unreliable.</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 px-6 py-4 bg-[#F0FDF4] border-b border-[#E5E7EB]">
                  <div className="w-8 h-8 rounded-lg bg-[#1B6B3A]/10 flex items-center justify-center flex-shrink-0">
                    <Leaf className="w-4 h-4 text-[#1B6B3A]" />
                  </div>
                  <div>
                    <p className="font-bold text-[#1B6B3A] text-sm">Ayra Farm Labs</p>
                    <p className="text-[10px] text-[#1B6B3A]/60">Traceable. Verified. Reliable.</p>
                  </div>
                </div>
              </div>

              {/* Rows */}
              {[
                {
                  bad: { icon: FileQuestion, title: "Undocumented Source", desc: "No paper trail. No field IDs. No way to trace where your produce actually came from." },
                  good: { desc: "Full traceability from seed to shelf — every batch documented." },
                },
                {
                  bad: { icon: AlertTriangle, title: "Inconsistent Grading", desc: "Every mandi lot is a gamble. Grades shift batch to batch. Your QA team is exhausted." },
                  good: { desc: "Grade-sorted produce to your exact specification." },
                },
                {
                  bad: { icon: ShieldOff, title: "No Audit Paper Trail", desc: "Auditors ask for traceability records and compliance docs. You have nothing." },
                  good: { desc: "Complete documentation pack with every delivery. Audit-ready, always." },
                },
              ].map((row, i) => (
                <div key={i} className="grid grid-cols-2" style={{ borderBottom: i < 2 ? "1px solid #F3F4F6" : "none" }}>
                  {/* Bad side */}
                  <div className="flex items-start gap-4 px-6 py-5 bg-white border-r border-[#F3F4F6] hover:bg-[#FEF9F0] transition-colors">
                    <div className="w-9 h-9 rounded-lg bg-[#FEF3C7] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <row.bad.icon className="w-4 h-4 text-[#B45309]" />
                    </div>
                    <div>
                      <p className="font-bold text-[#111827] text-sm mb-1">{row.bad.title}</p>
                      <p className="text-sm text-[#6B7280] leading-relaxed">{row.bad.desc}</p>
                    </div>
                  </div>
                  {/* Good side */}
                  <div className="flex items-start gap-4 px-6 py-5 bg-white hover:bg-[#F0FDF4] transition-colors">
                    <div className="w-9 h-9 rounded-full bg-[#DCFCE7] border border-[#BBF7D0] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle className="w-4 h-4 text-[#1B6B3A]" />
                    </div>
                    <p className="text-sm font-medium text-[#1B6B3A] leading-relaxed mt-1">{row.good.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* ===================================================================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div style={{ height: "1px", background: "rgba(27,107,58,0.08)" }} /></div>

      {/* SECTION 4: HOW IT WORKS */}
      {/* ===================================================================== */}
      <section id="how-it-works" className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection className="text-center mb-12 md:mb-16">
            <p className="text-xs font-medium tracking-widest text-[#1B6B3A] uppercase mb-3">
              The Process
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#111827] mb-4" style={{ fontFamily: "var(--font-poppins, sans-serif)", fontWeight: 800 }}>
              From your requirement to your <span className="text-[#1B6B3A]">warehouse.</span>
            </h2>
          </FadeInSection>

          {/* Vertical Timeline */}
          <div className="max-w-5xl mx-auto">
            <div className="relative">
              {/* Vertical Connector Line */}
              <div className="absolute left-6 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#E5E7EB] via-[#1B6B3A]/30 to-[#E5E7EB]" />

              <div className="space-y-8 md:space-y-12">
                {[
                  {
                    icon: ClipboardList,
                    step:"1",
                    title:"You specify",
                    description:"Crop type, grade, quantity, timeline.",
                    badge:"24 hours",
                    badgeLabel:"response time",
                  },
                  {
                    icon: MapPin,
                    step:"2",
                    title:"We match land",
                    description:"Soil/season/water assessment.",
                    badge:"5 days",
                    badgeLabel:"feasibility report",
                  },
                  {
                    icon: Sprout,
                    step:"3",
                    title:"We grow",
                    description:"Full crop cycle, weekly geo-tagged photos.",
                    badge:"Full cycle",
                    badgeLabel:"real-time",
                  },
                  {
                    icon: FlaskConical,
                    step:"4",
                    title:"We harvest",
                    description:"Scientific grade sorting and quality testing.",
                    badge:"48 hours",
                    badgeLabel:"quality approval",
                  },
                  {
                    icon: Truck,
                    step:"5",
                    title:"We deliver with docs",
                    description:"Doorstep delivery with full doc pack.",
                    badge:"On schedule",
                    badgeLabel:"",
                  },
                ].map((step, index) => (
                  <FadeInSection key={index}>
                    <div className={`relative flex gap-6 md:gap-0 group ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                      {/* Desktop Spacer left/right alternating */}
                      <div className="hidden md:block flex-1 min-w-0" />

                      {/* Step Number Circle Wrapper - fixed width strictly centers it */}
                      <div className="relative z-10 flex-shrink-0 md:w-32 flex justify-center">
                        <div className="relative w-12 h-12 md:w-16 md:h-16 rounded-full bg-white border-2 border-[#1B6B3A] flex items-center justify-center group-hover:bg-[#1B6B3A] transition-colors duration-300 shadow-md group-hover:shadow-lg">
                          <step.icon className="w-5 h-5 md:w-7 md:h-7 text-[#1B6B3A] group-hover:text-white transition-colors duration-300" />
                          <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-[#1B6B3A] border-2 border-white text-white text-xs font-bold flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            {step.step}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className={`flex-1 min-w-0 flex flex-col justify-center pb-4 pt-2 md:pt-4 p-4 rounded-xl hover:bg-white hover:shadow-md transition-all duration-300 -mt-2 md:-mt-4 border border-transparent hover:border-[#1B6B3A]/10 text-left ${index % 2 === 0 ? 'md:items-start md:text-left' : 'md:items-end md:text-right'}`}>
                        <div className={`flex flex-wrap items-center gap-3 mb-2 ${index % 2 === 0 ? 'md:justify-start' : 'md:justify-end'}`}>
                          <h3 className="text-lg md:text-xl font-bold text-[#111827] group-hover:text-[#1B6B3A] transition-colors duration-300">{step.title}</h3>
                          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1B6B3A]/[0.08] group-hover:bg-[#1B6B3A]/[0.15] transition-colors duration-300">
                            <span className="font-mono text-sm font-bold text-[#1B6B3A]">{step.badge}</span>
                            {step.badgeLabel && (
                              <span className="text-xs text-[#6B7280]">{step.badgeLabel}</span>
                            )}
                          </div>
                        </div>
                        <p className="text-[#6B7280] leading-relaxed max-w-sm">{step.description}</p>
                      </div>
                    </div>
                  </FadeInSection>
                ))}
              </div>
            </div>
          </div>

          {/* CTA */}
          <FadeInSection className="text-center mt-12 md:mt-16">
            <button
              onClick={() => scrollToSection("contact")}
              className="inline-flex items-center justify-center gap-2 bg-[#1B6B3A] hover:bg-[#155530] text-white px-7 py-3 rounded-md text-base font-medium transition-colors"
            >
              Start Your Requirement
              <ArrowRight className="w-5 h-5" />
            </button>
          </FadeInSection>
        </div>
      </section>

      {/* ===================================================================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div style={{ height: "1px", background: "rgba(27,107,58,0.08)" }} /></div>

      {/* SECTION 5: SERVICES OVERVIEW */}
      {/* ===================================================================== */}
      <section id="services" className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection className="text-center mb-12 md:mb-16">
            <p className="text-xs font-medium tracking-widest text-[#1B6B3A] uppercase mb-3">
              Our Services
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#111827] mb-4" style={{ fontFamily: "var(--font-poppins, sans-serif)", fontWeight: 800 }}>
              One partner. Every agri <span className="text-[#1B6B3A]">supply need.</span>
            </h2>
          </FadeInSection>

          {/* PRIMARY — 2 core services */}
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-8">
            {[
              {
                icon: Sprout,
                tag: "Grow to Order",
                title: "Contract Farming",
                description: "Full crop cycle management from requirement to harvest, with weekly photo updates and complete documentation.",
                bullets: ["Requirement-matched crop growing", "Weekly geo-tagged photo updates", "Accredited lab testing", "Full documentation pack included"],
              },
              {
                icon: FileText,
                tag: "Every gram accountable",
                title: "Documented Produce Supply",
                description: "Recurring supply with batch-level traceability. QR codes on every package linking to full field history.",
                bullets: ["Batch-level QR traceability", "Grade-sorted produce", "Compliant labelling", "Recurring supply contracts"],
              },
            ].map((service, index) => (
              <FadeInSection key={index}>
                <div className="bg-white border border-[#E5E7EB] rounded-xl overflow-hidden h-full hover:-translate-y-1 hover:shadow-md transition-all duration-300 flex flex-col">
                  <div className="h-36 bg-gradient-to-br from-[#f0fdf4] to-[#dcfce7] flex items-center justify-center">
                    <service.icon className="w-14 h-14 text-[#1B6B3A]/30" />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <span className="inline-block px-3 py-1 rounded-full bg-[#1B6B3A]/[0.08] text-xs font-medium text-[#1B6B3A] mb-3 self-start">{service.tag}</span>
                    <h3 className="text-xl font-bold text-[#111827] mb-2">{service.title}</h3>
                    <p className="text-sm text-[#6B7280] mb-4 leading-relaxed">{service.description}</p>
                    <ul className="space-y-2 mb-5 flex-1">
                      {service.bullets.map((bullet, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-[#1B6B3A] flex-shrink-0 mt-0.5" />
                          <span className="text-[#6B7280] text-sm">{bullet}</span>
                        </li>
                      ))}
                    </ul>
                    <button onClick={() => scrollToSection("contact")} className="text-[#1B6B3A] font-medium text-sm hover:text-[#2E8B57] transition-colors self-start">
                      Discuss this →
                    </button>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>

          {/* SECONDARY — also available */}
          <FadeInSection>
            <p className="text-xs font-medium tracking-widest text-[#9CA3AF] uppercase mb-4">Also available</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: Award,     title: "Supply Chain Audit",    desc: "Field-level audit + transition roadmap" },
                { icon: Leaf,      title: "Seasonal Subscription", desc: "Locked volumes & predictable supply" },
                { icon: Globe,     title: "Export-Ready Produce",  desc: "APEDA · EU · Gulf compliance docs" },
                { icon: MapPinned, title: "Audit & Advisory",      desc: "Documentation gap analysis" },
              ].map((s, i) => (
                <div key={i} className="bg-white border border-[#E5E7EB] rounded-xl p-4 hover:border-[#1B6B3A]/40 hover:shadow-md hover:-translate-y-1 hover:bg-[#F0FDF4] transition-all duration-200 cursor-pointer">
                  <div className="w-9 h-9 rounded-lg bg-[#F0FDF4] flex items-center justify-center mb-3">
                    <s.icon className="w-4 h-4 text-[#1B6B3A]" />
                  </div>
                  <p className="font-bold text-[#111827] text-sm mb-1">{s.title}</p>
                  <p className="text-xs text-[#6B7280]">{s.desc}</p>
                </div>
              ))}
            </div>
          </FadeInSection>

          {/* Quote Banner */}
          <FadeInSection className="mt-12 md:mt-16">
            <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <p className="text-[#111827] font-medium">
                Custom pricing based on crop, volume, and delivery requirements
              </p>
              <button
                onClick={() => scrollToSection("contact")}
                className="inline-flex items-center justify-center gap-2 bg-[#1B6B3A] hover:bg-[#155530] text-white px-6 py-2.5 rounded-md text-sm font-medium transition-colors whitespace-nowrap"
              >
                Get a quote in 24 hours
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* ===================================================================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div style={{ height: "1px", background: "rgba(27,107,58,0.08)" }} /></div>

      {/* SECTION 7: TRACEABILITY */}
      {/* ===================================================================== */}
      <section id="traceability" className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection className="text-center mb-12 md:mb-16">
            <p className="text-xs font-medium tracking-widest text-[#1B6B3A] uppercase mb-3">
              Traceability
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#111827] mb-4" style={{ fontFamily: "var(--font-poppins, sans-serif)", fontWeight: 800 }}>
              Every batch. Every input. Every test. <span className="text-[#1B6B3A]">On record.</span>
            </h2>
          </FadeInSection>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
            {/* Left Column - Documentation Pack */}
            <FadeInSection>
              <div className="bg-white border border-[#E5E7EB] rounded-xl p-6 md:p-8 h-full">
                <h3 className="text-xl font-bold text-[#111827] mb-6">Documentation Pack</h3>
                
                {/* Document Grid - 8 items */}
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { icon: FlaskConical, label:"Soil Test Report" },
                    { icon: MapPinned, label:"GPS Field Map" },
                    { icon: FileText, label:"Input Application Log" },
                    { icon: Droplets, label:"Irrigation Log" },
                    { icon: Award, label:"Harvest Certificate" },
                    { icon: TestTube, label:"Lab Quality Test" },
                    { icon: FileCheck, label:"Grade Certificate" },
                    { icon: Truck, label:"Delivery Note" },
                  ].map((doc, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg hover:border-[#1B6B3A]/30 hover:bg-[#F0FDF4] hover:-translate-y-0.5 hover:shadow-sm transition-all duration-200 cursor-default"
                      style={{ animationDelay: `${index * 60}ms` }}
                    >
                      <div className="w-10 h-10 rounded-md bg-[#1B6B3A]/[0.08] flex items-center justify-center flex-shrink-0">
                        <doc.icon className="w-5 h-5 text-[#1B6B3A]" />
                      </div>
                      <span className="text-sm font-medium text-[#111827]">{doc.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeInSection>

            {/* Right Column - QR Traceability Feature */}
            <FadeInSection>
              <div className="bg-white border border-[#E5E7EB] rounded-xl p-8 md:p-10 h-full">
                <div className="flex flex-col md:flex-row gap-8">
                  {/* QR Code */}
                  <div className="flex-shrink-0 mx-auto md:mx-0">
                    <div className="w-44 h-44 border-2 border-dashed border-[#E5E7EB] rounded-xl flex items-center justify-center bg-[#F9FAFB]">
                      <ScanLine className="w-16 h-16 text-[#1B6B3A]" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-[#111827] mb-3">Scan to see the full journey</h3>
                    <p className="text-[#6B7280] mb-6">
                      Every package has a QR code linking to its complete field-to-delivery history.
                    </p>

                    <ul className="space-y-3">
                      {["Instant traceability","6-page detailed report","Share with auditors","Build consumer trust"].map((item, index) => (
                        <li key={index} className="flex items-center gap-3 text-[#4B5563] p-2 rounded-lg hover:bg-[#F0FDF4] transition-colors duration-150 cursor-default">
                          <CheckCircle className="w-5 h-5 text-[#1B6B3A] flex-shrink-0" />
                          <span className="text-base">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </FadeInSection>
          </div>

        </div>
      </section>

      {/* ===================================================================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div style={{ height: "1px", background: "rgba(27,107,58,0.08)" }} /></div>

      {/* SECTION 10: ABOUT US */}
      {/* ===================================================================== */}
      <section id="about" className="py-12 md:py-16  overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Founder's Note */}
          <FadeInSection className="mb-16 text-center">
            <p className="text-xs font-medium tracking-widest text-[#1B6B3A] uppercase mb-4">
              Why Ayra Exists
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#111827] mb-10" style={{ fontFamily: "var(--font-poppins, sans-serif)", fontWeight: 800 }}>India's farmland didn't fail. <span className="text-[#1B6B3A]">The system did.</span>
            </h2>

            <div className="flex flex-col lg:flex-row gap-12 mb-12 items-start">
              {/* LEFT — Founder note */}
              <div className="flex-1 space-y-4 text-[#4B5563] leading-relaxed text-base">
                <p>
                  India&apos;s agriculture didn&apos;t fail because the land was bad. It fragmented.
                  Generation after generation, farmland passed down through families — divided, subdivided,
                  until what was once a productive holding became too small to farm economically and too
                  scattered to manage scientifically. Today, Telangana has millions of acres of farmland
                  sitting underproductive — not abandoned, but adrift.
                </p>
                <p>
                  At the same time, businesses that depend on agricultural raw materials are navigating one
                  of the most frustrating procurement realities in India. The sector is unorganised. Supply is
                  unreliable. Quality is inconsistent. And traceable, documented, transparent sourcing from
                  farm to factory? Almost impossible to find at scale.
                </p>
                <p>
                  And at the centre of all of it — the farmer. Working harder every season with less return.
                  Without access to modern agronomic practices, quality inputs, or organised market linkages,
                  the person doing the most essential work in the chain is also the one absorbing the most
                  risk and capturing the least value.
                </p>
                <p>
                  We built Ayra Farm Labs because we believe this is a solvable problem — not with technology
                  alone, but with professional, science-backed farm management that works for everyone in the chain.
                </p>
                <p>
                  We are three people from very different worlds — business, technology, and agronomy. We came
                  together because solving this required all three. And because someone had to start.
                </p>
                <div className="pt-6 border-t border-[#E5E7EB]">
                  <div className="flex items-center gap-4">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-black text-sm flex-shrink-0"
                      style={{
                        background: "linear-gradient(135deg, #1B6B3A 0%, #2E8B57 100%)",
                        boxShadow: "0 4px 16px rgba(27,107,58,0.3)",
                      }}
                    >
                      YG
                    </div>
                    <div>
                      <p
                        className="font-bold text-[#111827] mb-0.5"
                        style={{ fontFamily: "var(--font-playfair, serif)", fontSize: "1.1rem" }}
                      >
                        Yashwanth Gorenka
                      </p>
                      <p className="text-xs tracking-wider uppercase" style={{ color: "#1B6B3A", letterSpacing: "0.12em" }}>
                        Founder · Ayra Farm Labs
                      </p>
                    </div>
                  </div>
                  {/* Decorative curve line */}
                  <svg className="mt-4 w-32 h-6" viewBox="0 0 128 24" fill="none">
                    <path d="M4 20 Q32 4 64 12 Q96 20 124 6" stroke="#1B6B3A" strokeWidth="1.5" strokeOpacity="0.3" strokeLinecap="round" fill="none"/>
                    <circle cx="4" cy="20" r="2.5" fill="#1B6B3A" fillOpacity="0.4"/>
                    <circle cx="124" cy="6" r="2.5" fill="#1B6B3A" fillOpacity="0.4"/>
                  </svg>
                </div>
              </div>

              {/* RIGHT — Stacked flash cards */}
              <ForWhomCards />
            </div>
          </FadeInSection>

          <div className="border-t border-[#E5E7EB] mb-16" />

          {/* Founders Section */}
          <FadeInSection className="text-center mb-16">
            <p className="text-xs font-medium tracking-widest text-[#1B6B3A] uppercase mb-3">
              About Us
            </p>
            <div id="team" style={{ scrollMarginTop: "80px" }} />
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#111827] mb-8" style={{ fontFamily: "var(--font-poppins, sans-serif)", fontWeight: 800 }}>
              Meet the <span className="text-[#1B6B3A]">Founders</span>
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  initials: "YG",
                  name: "Yashwanth Gorenka",
                  title: "Founder",
                  bio: "Yashwanth brings a rare combination of startup experience and growth marketing depth — having worked across 5+ startups and 15+ freelance clients. He leads Ayra's overall business strategy, brand, sales, and growth.",
                  tags: ["Growth Strategy", "Brand", "Sales"],
                },
                {
                  initials: "K",
                  name: "Karthik",
                  title: "Co-Founder & Head of Operations",
                  bio: "A cybersecurity graduate turned agri-operations builder, Karthik owns everything that keeps Ayra running — logistics, systems, and operational infrastructure.",
                  tags: ["Logistics", "Systems", "Execution"],
                },
                {
                  initials: "ST",
                  name: "Shiva Teja",
                  title: "Co-Founder & Chief Agri Ops",
                  bio: "Shiva Teja holds an Honours degree in Agricultural Science and leads all on-ground farm operations at Ayra. The agronomic rigour behind every managed farm.",
                  tags: ["Soil Health", "Harvest", "Agronomy"],
                },
              ].map((founder, index) => (
                <div key={index} className="group bg-white border border-[#E5E7EB] rounded-2xl p-8 hover:-translate-y-2 hover:shadow-xl transition-all duration-300 flex flex-col">
                  <div className="flex items-center gap-4 mb-5">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#1B6B3A] to-[#2E8B57] flex items-center justify-center text-white text-lg font-black flex-shrink-0 shadow-lg">
                      {founder.initials}
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-[#111827]">{founder.name}</h4>
                      <p className="text-xs font-medium text-[#1B6B3A] uppercase tracking-wider">{founder.title}</p>
                    </div>
                  </div>
                  <p className="text-[#6B7280] leading-relaxed text-sm flex-1 mb-4">{founder.bio}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {founder.tags.map((tag, j) => (
                      <span key={j} className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide bg-[#F0FDF4] border border-[#BBF7D0] text-[#1B6B3A]">{tag}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </FadeInSection>

        </div>
      </section>

      {/* ===================================================================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div style={{ height: "1px", background: "rgba(27,107,58,0.08)" }} /></div>

      {/* SECTION 11: CONTACT / GET A QUOTE */}
      {/* ===================================================================== */}
      <section id="contact" className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection className="text-center mb-12 md:mb-16">
            <p className="text-xs font-medium tracking-widest text-[#1B6B3A] uppercase mb-3">
              Contact Us
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#111827] mb-4" style={{ fontFamily: "var(--font-poppins, sans-serif)", fontWeight: 800 }}>
              Ready to replace your <span className="text-[#1B6B3A]">mandi supplier?</span>
            </h2>
            <p className="text-lg text-[#4B5563] max-w-2xl mx-auto leading-relaxed">
              Tell us what you need. We will tell you if we can do it — in 24 hours. No automated replies. No commitment.
            </p>
          </FadeInSection>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
            {/* Left Column - Contact Info */}
            <FadeInSection className="flex flex-col">
              <div className="bg-white border border-[#E5E7EB] rounded-xl p-8 md:p-10 flex-grow shadow-sm hover:shadow-md transition-shadow duration-300">
                <h3 className="text-xl font-bold text-[#111827] mb-6">Business Inquiries</h3>
                
                {/* Contact Details */}
                <div className="space-y-6 mb-10">
                  <div className="flex items-start gap-4 group hover:bg-[#F0FDF4] rounded-xl p-3 -mx-3 transition-all duration-200 cursor-default">
                    <div className="w-10 h-10 rounded-lg bg-[#1B6B3A]/10 flex items-center justify-center shrink-0 group-hover:bg-[#1B6B3A]/20 transition-colors">
                      <Phone className="w-5 h-5 text-[#1B6B3A]" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#6B7280] uppercase tracking-wider mb-1">Phone</p>
                      <span className="text-[#111827] font-medium">+91 98488 90429</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 group hover:bg-[#F0FDF4] rounded-xl p-3 -mx-3 transition-all duration-200 cursor-default">
                    <div className="w-10 h-10 rounded-lg bg-[#1B6B3A]/10 flex items-center justify-center shrink-0 group-hover:bg-[#1B6B3A]/20 transition-colors">
                      <Mail className="w-5 h-5 text-[#1B6B3A]" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#6B7280] uppercase tracking-wider mb-1">Email</p>
                      <span className="text-[#111827] font-medium">ayra.kshetrapalaka@gmail.com</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 group hover:bg-[#F0FDF4] rounded-xl p-3 -mx-3 transition-all duration-200 cursor-default">
                    <div className="w-10 h-10 rounded-lg bg-[#1B6B3A]/10 flex items-center justify-center shrink-0 group-hover:bg-[#1B6B3A]/20 transition-colors">
                      <MapPin className="w-5 h-5 text-[#1B6B3A]" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#6B7280] uppercase tracking-wider mb-1">Location</p>
                      <span className="text-[#111827] font-medium leading-relaxed">AgHub, PJTSAU Campus, Hyderabad, Telangana</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <a
                    href="https://wa.me/919666004446"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#1B6B3A] text-white hover:bg-[#155530] px-8 py-4 rounded-lg text-base font-bold transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-[#1B6B3A]/20"
                  >
                    <MessageCircle className="w-6 h-6" />
                    Chat on WhatsApp
                  </a>
                  <a
                    href="https://calendly.com/ayra-kshetrapalaka/30min"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 border-2 border-[#1B6B3A] text-[#1B6B3A] hover:bg-[#1B6B3A]/5 px-8 py-4 rounded-lg text-base font-bold transition-all"
                  >
                    <Phone className="w-5 h-5" />
                    Book a 15-min Discovery Call
                  </a>
                </div>
              </div>
            </FadeInSection>

            {/* Right Column - Form */}
            <FadeInSection className="flex flex-col">
              <div className="bg-white border border-[#E5E7EB] rounded-xl p-8 md:p-10 flex-grow shadow-sm hover:shadow-md transition-shadow duration-300">
                {formSubmitted ? (
                  <div className="text-center py-12">
                    <CheckCircle className="w-16 h-16 text-[#1B6B3A] mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-[#111827] mb-2">
                      Thank you for your inquiry.
                    </h3>
                    <p className="text-[#6B7280]">
                      A real person from our team will call you within 24 working hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit}>
                    <p className="font-bold text-sm text-[#111827] mb-4">
                      Get a custom quote — free, no commitment
                    </p>

                    {/* Buyer Type Selector */}
                    <div className="mb-6">
                      <p className="text-sm text-[#6B7280] mb-3">I am a:</p>
                      <div className="flex flex-wrap gap-2">
                        {buyerTypes.map((type) => (
                          <button
                            key={type}
                            type="button"
                            onClick={() => setBuyerType(type)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                              buyerType === type
                                ?"bg-[#1B6B3A] text-white"
                                :"bg-white border border-[#E5E7EB] text-[#6B7280] hover:border-[#1B6B3A]"
                            }`}
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                    </div>

                    {buyerType && (
                      <div className="space-y-4">
                        {buyerType ==="Landowner" ? (
                          <>
                            <div>
                              <label className="block text-sm font-medium text-[#111827] mb-1">
                                Full Name
                              </label>
                              <input
                                type="text"
                                required
                                value={formData.fullName}
                                onChange={(e) =>
                                  setFormData({ ...formData, fullName: e.target.value })
                                }
                                className="w-full px-4 py-3 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1B6B3A] focus:border-transparent"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-[#111827] mb-1">
                                Phone Number
                              </label>
                              <input
                                type="tel"
                                required
                                value={formData.phone}
                                onChange={(e) =>
                                  setFormData({ ...formData, phone: e.target.value })
                                }
                                className="w-full px-4 py-3 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1B6B3A] focus:border-transparent"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-[#111827] mb-1">
                                Land Location (District, State)
                              </label>
                              <input
                                type="text"
                                required
                                value={formData.landLocation}
                                onChange={(e) =>
                                  setFormData({ ...formData, landLocation: e.target.value })
                                }
                                className="w-full px-4 py-3 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1B6B3A] focus:border-transparent"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-[#111827] mb-1">
                                Approximate Acres
                              </label>
                              <input
                                type="text"
                                required
                                value={formData.acres}
                                onChange={(e) =>
                                  setFormData({ ...formData, acres: e.target.value })
                                }
                                className="w-full px-4 py-3 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1B6B3A] focus:border-transparent"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-[#111827] mb-1">
                                Current Land Use
                              </label>
                              <input
                                type="text"
                                required
                                value={formData.landUse}
                                onChange={(e) =>
                                  setFormData({ ...formData, landUse: e.target.value })
                                }
                                className="w-full px-4 py-3 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1B6B3A] focus:border-transparent"
                              />
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-[#111827] mb-1">
                                  Full Name
                                </label>
                                <input
                                  type="text"
                                  required
                                  value={formData.fullName}
                                  onChange={(e) =>
                                    setFormData({ ...formData, fullName: e.target.value })
                                  }
                                  className="w-full px-4 py-3 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1B6B3A] focus:border-transparent"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-[#111827] mb-1">
                                  Company
                                </label>
                                <input
                                  type="text"
                                  required
                                  value={formData.company}
                                  onChange={(e) =>
                                    setFormData({ ...formData, company: e.target.value })
                                  }
                                  className="w-full px-4 py-3 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1B6B3A] focus:border-transparent"
                                />
                              </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-[#111827] mb-1">
                                  Phone
                                </label>
                                <input
                                  type="tel"
                                  required
                                  value={formData.phone}
                                  onChange={(e) =>
                                    setFormData({ ...formData, phone: e.target.value })
                                  }
                                  className="w-full px-4 py-3 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1B6B3A] focus:border-transparent"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-[#111827] mb-1">
                                  Email
                                </label>
                                <input
                                  type="email"
                                  required
                                  value={formData.email}
                                  onChange={(e) =>
                                    setFormData({ ...formData, email: e.target.value })
                                  }
                                  className="w-full px-4 py-3 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1B6B3A] focus:border-transparent"
                                />
                              </div>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-[#111827] mb-1">
                                Crop(s) Needed
                              </label>
                              <input
                                type="text"
                                required
                                value={formData.crops}
                                onChange={(e) =>
                                  setFormData({ ...formData, crops: e.target.value })
                                }
                                className="w-full px-4 py-3 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1B6B3A] focus:border-transparent"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-[#111827] mb-1">
                                Estimated Monthly Volume
                              </label>
                              <input
                                type="text"
                                required
                                value={formData.volume}
                                onChange={(e) =>
                                  setFormData({ ...formData, volume: e.target.value })
                                }
                                className="w-full px-4 py-3 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1B6B3A] focus:border-transparent"
                              />
                            </div>
                          </>
                        )}

                        <button
                          type="submit"
                          className="w-full bg-[#1B6B3A] hover:bg-[#155530] text-white py-3 rounded-md text-base font-medium transition-colors"
                        >
                          Submit Inquiry
                        </button>

                        <p className="text-center text-xs text-[#6B7280]">
                          We respond within 24 working hours. A real person will call you.
                        </p>
                      </div>
                    )}
                  </form>
                )}
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* SECTION 12: FOOTER */}
      {/* ===================================================================== */}
      <footer className="bg-[#111827] pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-12">
            {/* Column 1: Logo & Mission */}
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <Leaf className="w-6 h-6 text-white" />
                <span className="text-lg font-bold text-white">Ayra Farm Labs</span>
              </div>
              <p className="text-sm text-[#9CA3AF] leading-relaxed">
                Making India&apos;s agricultural supply chain transparent, accountable, and efficient.
              </p>
            </div>

            {/* Column 2: Quick Links */}
            <div>
              <h4 className="text-white font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {["How It Works","Services","Traceability","Why Ayra","About Us","Contact"].map((link) => (
                  <li key={link}>
                    <button
                      onClick={() =>
                        scrollToSection(link === "About Us" ? "team" : link.toLowerCase().replace(/ /g,"-"))
                      }
                      className="text-sm text-[#9CA3AF] hover:text-white transition-colors"
                    >
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Services */}
            <div>
              <h4 className="text-white font-bold mb-4">Services</h4>
              <ul className="space-y-2">
                {["Contract Farming","Documented Supply","Export-Ready","Seasonal Subscription","Audit & Advisory",
                ].map((service) => (
                  <li key={service}>
                    <button
                      onClick={() => scrollToSection("services")}
                      className="text-sm text-[#9CA3AF] hover:text-white transition-colors"
                    >
                      {service}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Contact */}
            <div>
              <h4 className="text-white font-bold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-[#9CA3AF]">
                <li>+91 98488 90429</li>
                <li>ayra.kshetrapalaka@gmail.com</li>
                <li>AgHub, Hyderabad, Telangana</li>
              </ul>
            </div>
          </div>

          {/* Certification Badges */}
          <div className="flex flex-wrap justify-center gap-4 py-6">
            {["AgHub","APEDA"].map((badge) => (
              <span
                key={badge}
                className="px-4 py-2 bg-[#1F2937] rounded text-xs text-[#6B7280]"
              >
                {badge}
              </span>
            ))}
          </div>

          {/* Divider */}
          <div className="border-t border-[#374151] my-6" />

          {/* Bottom Bar */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-[#9CA3AF]">
            <p>© 2026 Ayra Farm Labs. All rights reserved.</p>
            <div className="flex gap-6">
              <button className="hover:text-white transition-colors">Privacy Policy</button>
              <button className="hover:text-white transition-colors">Terms of Service</button>
            </div>
          </div>
        </div>
      </footer>

      {/* ===================================================================== */}
      {/* SCROLL TO TOP BUTTON */}
      {/* ===================================================================== */}
      <button
        onClick={scrollToTop}
        className={`fixed right-6 z-40 w-12 h-12 bg-[#1B6B3A] hover:bg-[#155530] text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 ${
          showScrollTop ?"opacity-100" :"opacity-0 pointer-events-none"
        } bottom-20 md:bottom-8`}
        aria-label="Scroll to top"
      >
        <ChevronUp className="w-6 h-6" />
      </button>

      {/* Bottom padding for mobile sticky CTA */}
      <div className="h-16 md:hidden" />
    </main>
  )
}
