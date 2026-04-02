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
// FADE IN ANIMATION WRAPPER
// =============================================================================
function FadeInSection({ children, className ="" }: { children: ReactNode; className?: string }) {
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
    { label:"For Landowners", id:"landowners" },
    { label:"About Us", id:"about" },
    { label:"Contact", id:"contact" },
  ]

  const buyerTypes = ["Brand / FMCG","HoReCa","Food Processor","Exporter","Landowner"]

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
              <span className="text-xl font-bold text-[#111827]">FarmBrand</span>
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
      <section className="relative min-h-screen flex items-center pt-16 md:pt-20 overflow-hidden">
        
        
        
        
        {/* Decorative Circle */}
        <div 
          className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full opacity-20"
          style={{
            background:"radial-gradient(circle, #1B6B3A 0%, transparent 70%)"
          }}
        />
        
        {/* Removed local background fade to prevent white glitch with global bg */}

        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <FadeInSection className="max-w-3xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1B6B3A]/[0.08] mb-6">
              <Award className="w-4 h-4 text-[#1B6B3A]" />
              <span className="text-sm font-medium text-[#1B6B3A]">
                Incubated at AgHub — Agri-Tech Incubator
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[#111827] leading-[1.15] mb-6">
              Your brand deserves a supply chain it can{""}
              <span className="text-[#1B6B3A]">prove.</span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg md:text-xl text-[#4B5563] leading-relaxed mb-8 max-w-2xl">
              We grow it. We document it. We deliver it. Contract farming for FMCG, HoReCa, and
              exporters who are done guessing.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => scrollToSection("contact")}
                className="inline-flex items-center justify-center gap-2 bg-[#1B6B3A] hover:bg-[#155530] text-white px-7 py-3 rounded-md text-base font-medium transition-colors"
              >
                Get a Custom Quote
                <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => scrollToSection("how-it-works")}
                className="inline-flex items-center justify-center gap-2 bg-white border-2 border-[#1B6B3A] text-[#1B6B3A] hover:bg-green-50 px-7 py-3 rounded-md text-base font-medium transition-colors"
              >
                See How It Works
              </button>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* SECTION 3: PROBLEM SECTION */}
      {/* ===================================================================== */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#111827] mb-4">
              Is your supplier giving you this?
            </h2>
            <p className="text-lg text-[#6B7280] max-w-2xl mx-auto">
              Most mandi-sourced supply chains cannot answer these questions. Yours should.
            </p>
          </FadeInSection>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                icon: FileQuestion,
                title:"Undocumented Source",
                problem:"No paper trail. No field IDs. No way to trace where your produce actually came from.",
                solution:"Full traceability from seed to shelf — every batch documented.",
              },
              {
                icon: AlertTriangle,
                title:"Inconsistent Grading",
                problem:"Every mandi lot is a gamble. Grades shift batch to batch. Your QA team is exhausted.",
                solution:"NABL-tested, grade-sorted produce to your exact specification.",
              },
              {
                icon: ShieldOff,
                title:"No Audit Paper Trail",
                problem:"FSSAI asks for traceability records. Export partner asks for compliance docs. You have nothing.",
                solution:"Complete documentation pack with every delivery. Audit-ready, always.",
              },
            ].map((card, index) => (
              <FadeInSection key={index}>
                <div className="bg-white border border-[#E5E7EB] rounded-lg p-6 h-full hover:-translate-y-1 hover:shadow-md transition-all duration-300">
                  {/* Icon Badge */}
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-[#FEF3C7] mb-5">
                    <card.icon className="w-6 h-6 text-[#B45309]" />
                  </div>

                  <h3 className="text-xl font-bold text-[#111827] mb-3">{card.title}</h3>
                  <p className="text-[#6B7280] leading-relaxed mb-5">{card.problem}</p>

                  {/* Divider */}
                  <div className="border-t border-[#E5E7EB] my-5" />

                  {/* Solution */}
                  <div className="flex gap-3">
                    <CheckCircle className="w-5 h-5 text-[#1B6B3A] flex-shrink-0 mt-0.5" />
                    <p className="text-[#1B6B3A] font-medium leading-relaxed">{card.solution}</p>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* SECTION 4: HOW IT WORKS */}
      {/* ===================================================================== */}
      <section id="how-it-works" className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection className="text-center mb-12 md:mb-16">
            <p className="text-xs font-medium tracking-widest text-[#1B6B3A] uppercase mb-3">
              The Process
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#111827] mb-4">
              From your requirement to your warehouse.
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
                    description:"NABL lab testing, grade sorting.",
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
      {/* SECTION 5: SERVICES OVERVIEW */}
      {/* ===================================================================== */}
      <section id="services" className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection className="text-center mb-12 md:mb-16">
            <p className="text-xs font-medium tracking-widest text-[#1B6B3A] uppercase mb-3">
              Our Services
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#111827] mb-4">
              One partner. Every agri supply need.
            </h2>
          </FadeInSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                icon: Sprout,
                tag:"Grow to Order",
                title:"Contract Farming",
                description:"Full crop cycle management from requirement to harvest, with weekly photo updates and complete documentation.",
                bullets: ["Requirement-matched crop growing","Weekly geo-tagged photo updates","NABL-accredited lab testing","Full documentation pack included",
                ],
              },
              {
                icon: FileText,
                tag:"Every gram accountable",
                title:"Documented Produce Supply",
                description:"Recurring supply with batch-level traceability. QR codes on every package linking to full field history.",
                bullets: ["Batch-level QR traceability","Grade-sorted produce","FSSAI-compliant labelling","Recurring supply contracts",
                ],
              },
              {
                icon: Award,
                tag:"Know your source",
                title:"Supply Chain Audit",
                description:"Field-level audit of your existing suppliers with a transition roadmap to documented sourcing.",
                bullets: ["Existing supplier assessment","Field-level audit reports","Gap analysis documentation","Transition roadmap",
                ],
              },
              {
                icon: Leaf,
                tag:"Right produce, right season",
                title:"Seasonal Subscription",
                description:"Lock in volumes and prices for seasonal produce. Predictable supply, predictable costs.",
                bullets: ["Locked volumes & prices","Seasonal calendar planning","Priority allocation","Flexible delivery scheduling",
                ],
              },
              {
                icon: Globe,
                tag:"Farm to freight",
                title:"Export-Ready Produce",
                description:"Phytosanitary and compliance documentation for EU, Gulf, and international markets.",
                bullets: ["EU MRL compliance","Gulf country standards","APEDA coordination","Full export doc set",
                ],
              },
              {
                icon: MapPinned,
                tag:"Earn from your land",
                title:"Landowner Partnership",
                description:"Lease your agricultural land for tax-free income. We manage everything, you earn.",
                bullets: ["Rs. 20-40k per acre/year","Tax-free under Section 10(1)","Zero management effort","Soil health maintained",
                ],
              },
            ].map((service, index) => (
              <FadeInSection key={index}>
                <div className="bg-white border border-[#E5E7EB] rounded-lg overflow-hidden h-full hover:-translate-y-1 hover:shadow-md transition-all duration-300 flex flex-col">
                  {/* Image Placeholder */}
                  <div className="h-40 bg-gradient-to-br from-[#f0fdf4] to-[#dcfce7] flex items-center justify-center">
                    <service.icon className="w-16 h-16 text-[#1B6B3A]/30" />
                  </div>
                  
                  <div className="p-6 flex flex-col flex-1">
                    {/* Tag */}
                    <span className="inline-block px-3 py-1 rounded-full bg-[#1B6B3A]/[0.08] text-xs font-medium text-[#1B6B3A] mb-3 self-start">
                      {service.tag}
                    </span>

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

                    <button
                      onClick={() => scrollToSection("contact")}
                      className="text-[#1B6B3A] font-medium text-sm hover:text-[#2E8B57] transition-colors self-start"
                    >
                      Learn more →
                    </button>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>

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
      {/* SECTION 5: TRUST / SOCIAL PROOF */}
      {/* ===================================================================== */}
      <section className="py-12 md:py-16 bg-[#1B6B3A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Trusted by brands that demand proof.
            </h2>
          </FadeInSection>

          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6 mb-16">
            {[
              { value: 500, suffix:"+", label:"Acres Under Management" },
              { value: 100, suffix:"%", label:"Documented Batches" },
              { value: 4, suffix:"h", label:"Average Response Time" },
              { value: 50, suffix:"+", label:"Crop Cycles Completed" },
            ].map((stat, index) => (
              <FadeInSection key={index} className="text-center">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                <p className="mt-2 text-sm text-white/70">{stat.label}</p>
              </FadeInSection>
            ))}
          </div>

          {/* Certification Badges */}
          <FadeInSection className="mb-12">
            <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6">
              {[
                { name:"FSSAI", description:"Food Safety Certified" },
                { name:"NABL", description:"Lab Accredited" },
                { name:"APEDA", description:"Export Registered" },
              ].map((cert, index) => (
                <div
                  key={index}
                  className="px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-center"
                >
                  <p className="text-lg font-bold text-white">{cert.name}</p>
                  <p className="text-xs text-white/60">{cert.description}</p>
                </div>
              ))}
            </div>
          </FadeInSection>

          {/* Testimonial Quote Card */}
          <FadeInSection>
            <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-8 md:p-10 relative">
              {/* Large Quote Mark */}
              <div className="absolute -top-4 left-8 text-6xl text-white/30 font-serif">&ldquo;</div>
              
              <blockquote className="text-lg md:text-xl text-white leading-relaxed mb-6 pt-4">
                Finally, a supplier who understands what audit-ready documentation means. 
                We walked into our last compliance review with complete confidence — every batch traceable, 
                every input logged, every test certified. This is what modern procurement should look like.
              </blockquote>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">RK</span>
                </div>
                <div>
                  <p className="font-bold text-white">Ravi Kumar</p>
                  <p className="text-sm text-white/70">Procurement Head, Leading FMCG Brand</p>
                </div>
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* SECTION 7: TRACEABILITY */}
      {/* ===================================================================== */}
      <section id="traceability" className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection className="text-center mb-12 md:mb-16">
            <p className="text-xs font-medium tracking-widest text-[#1B6B3A] uppercase mb-3">
              Traceability
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#111827] mb-4">
              Every batch. Every input. Every test. On record.
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
                    { icon: TestTube, label:"NABL Lab Test" },
                    { icon: FileCheck, label:"Grade Certificate" },
                    { icon: Truck, label:"Delivery Note" },
                  ].map((doc, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg"
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
              <div className="bg-white border border-[#E5E7EB] rounded-xl p-6 md:p-8 h-full">
                <div className="flex flex-col md:flex-row gap-6">
                  {/* QR Code */}
                  <div className="flex-shrink-0 mx-auto md:mx-0">
                    <div className="w-32 h-32 border-2 border-dashed border-[#E5E7EB] rounded-lg flex items-center justify-center bg-[#F9FAFB]">
                      <ScanLine className="w-12 h-12 text-[#1B6B3A]" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-[#111827] mb-2">Scan to see the full journey</h3>
                    <p className="text-[#6B7280] mb-4 text-sm">
                      Every package has a QR code linking to its complete field-to-delivery history.
                    </p>

                    <ul className="space-y-2 mb-6">
                      {["Instant traceability","6-page detailed report","Share with auditors","Build consumer trust",
                      ].map((item, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm text-[#4B5563]">
                          <CheckCircle className="w-4 h-4 text-[#1B6B3A] flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    <button
                      onClick={() => scrollToSection("contact")}
                      className="inline-flex items-center justify-center gap-2 bg-[#1B6B3A]/[0.08] hover:bg-[#1B6B3A]/[0.15] text-[#1B6B3A] px-5 py-2.5 rounded-md text-sm font-medium transition-colors"
                    >
                      Download sample report
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </FadeInSection>
          </div>

          {/* Regulatory Compliance Section */}
          <FadeInSection>
            <div className="mb-8">
              <h3 className="text-lg font-bold text-[#111827] mb-2 text-center">Regulatory Compliance</h3>
              <p className="text-[#6B7280] text-center text-sm">Our documentation meets these standards</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                {
                  icon: ShieldCheck,
                  title:"FSSAI",
                  description:"Full compliance with Indian food safety regulations",
                },
                {
                  icon: Globe,
                  title:"EU Deforestation Regulation",
                  description:"Traceability data for EU export compliance",
                },
                {
                  icon: Leaf,
                  title:"ESG Disclosure",
                  description:"Sustainability metrics for corporate reporting",
                },
                {
                  icon: Store,
                  title:"Retail Audit",
                  description:"Documentation ready for major retail chains",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-white border border-[#E5E7EB] rounded-lg p-4 text-center group hover:border-[#1B6B3A]/30 hover:shadow-md transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-full bg-[#1B6B3A]/[0.08] flex items-center justify-center mx-auto mb-3 group-hover:bg-[#1B6B3A] group-hover:scale-110 transition-all duration-300">
                    <item.icon className="w-6 h-6 text-[#1B6B3A] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h4 className="font-bold text-[#111827] text-sm mb-1">{item.title}</h4>
                  <p className="text-xs text-[#6B7280]">{item.description}</p>
                </div>
              ))}
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* SECTION 6: FOR LANDOWNERS */}
      {/* ===================================================================== */}
      <section id="landowners" className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection className="text-center mb-12 md:mb-16">
            <p className="text-xs font-medium tracking-widest text-[#1B6B3A] uppercase mb-3">
              For Landowners
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#111827] mb-4">
              Your land. Our expertise.
            </h2>
            <p className="text-lg text-[#6B7280] max-w-2xl mx-auto">
              Agricultural income is tax-free under Section 10(1). Turn your idle land into documented, passive income.
            </p>
          </FadeInSection>

          {/* Pricing Comparison Cards */}
          <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-12">
            {/* Fallow Land - Gray/Dull */}
            <FadeInSection>
              <div className="bg-[#F3F4F6] border border-[#D1D5DB] rounded-lg p-6 h-full opacity-70">
                <h3 className="text-lg font-bold text-[#6B7280] mb-2">Fallow Land</h3>
                <div className="mb-4">
                  <span className="font-mono text-3xl font-bold text-[#6B7280]">₹0</span>
                  <span className="text-[#9CA3AF]">/year</span>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2 text-[#9CA3AF]">
                    <X className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <span>Land degradation over time</span>
                  </li>
                  <li className="flex items-start gap-2 text-[#9CA3AF]">
                    <X className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <span>No income generation</span>
                  </li>
                  <li className="flex items-start gap-2 text-[#9CA3AF]">
                    <X className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <span>Weed and pest buildup</span>
                  </li>
                </ul>
              </div>
            </FadeInSection>

            {/* Informal Lease - Slightly Better */}
            <FadeInSection>
              <div className="bg-white border border-[#E5E7EB] rounded-lg p-6 h-full">
                <h3 className="text-lg font-bold text-[#4B5563] mb-2">Informal Lease</h3>
                <div className="mb-4">
                  <span className="font-mono text-3xl font-bold text-[#4B5563]">₹6,000–10,000</span>
                  <span className="text-[#6B7280]">/acre/year</span>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2 text-[#6B7280]">
                    <AlertTriangle className="w-5 h-5 text-[#B45309] flex-shrink-0 mt-0.5" />
                    <span>No legal documentation</span>
                  </li>
                  <li className="flex items-start gap-2 text-[#6B7280]">
                    <AlertTriangle className="w-5 h-5 text-[#B45309] flex-shrink-0 mt-0.5" />
                    <span>Payment disputes common</span>
                  </li>
                  <li className="flex items-start gap-2 text-[#6B7280]">
                    <AlertTriangle className="w-5 h-5 text-[#B45309] flex-shrink-0 mt-0.5" />
                    <span>No soil health guarantee</span>
                  </li>
                </ul>
              </div>
            </FadeInSection>

            {/* With AgriSupply Pro - Highlighted */}
            <FadeInSection>
              <div className="bg-white border-2 border-[#1B6B3A] rounded-lg p-6 h-full relative">
                {/* Recommended Badge */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1 bg-[#1B6B3A] text-white text-xs font-bold rounded-full">
                    RECOMMENDED
                  </span>
                </div>
                
                <h3 className="text-lg font-bold text-[#1B6B3A] mb-2 mt-2">With FarmBrand</h3>
                <div className="mb-4">
                  <span className="font-mono text-3xl font-bold text-[#1B6B3A]">₹20,000–40,000</span>
                  <span className="text-[#6B7280]">/acre/year</span>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2 text-[#4B5563]">
                    <CheckCircle className="w-5 h-5 text-[#1B6B3A] flex-shrink-0 mt-0.5" />
                    <span>Tax-free income (Section 10(1))</span>
                  </li>
                  <li className="flex items-start gap-2 text-[#4B5563]">
                    <CheckCircle className="w-5 h-5 text-[#1B6B3A] flex-shrink-0 mt-0.5" />
                    <span>Fully documented agreement</span>
                  </li>
                  <li className="flex items-start gap-2 text-[#4B5563]">
                    <CheckCircle className="w-5 h-5 text-[#1B6B3A] flex-shrink-0 mt-0.5" />
                    <span>Soil health maintained</span>
                  </li>
                  <li className="flex items-start gap-2 text-[#4B5563]">
                    <CheckCircle className="w-5 h-5 text-[#1B6B3A] flex-shrink-0 mt-0.5" />
                    <span>Easy exit anytime</span>
                  </li>
                </ul>
              </div>
            </FadeInSection>
          </div>

          {/* CTAs */}
          <FadeInSection className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
            <button
              onClick={() => {
                setBuyerType("Landowner")
                scrollToSection("contact")
              }}
              className="inline-flex items-center justify-center gap-2 bg-[#1B6B3A] hover:bg-[#155530] text-white px-7 py-3 rounded-md text-base font-medium transition-colors"
            >
              Enroll your land
              <ArrowRight className="w-5 h-5" />
            </button>
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-white border-2 border-[#25D366] text-[#25D366] hover:bg-[#25D366]/5 px-7 py-3 rounded-md text-base font-medium transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              Chat on WhatsApp
            </a>
          </FadeInSection>

          {/* Farmland Image with Benefit Cards */}
          <FadeInSection>
            <div className="relative p-8 md:p-12">
              <div className="relative grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { icon: Award, title:"Higher Income", description:"2-4x more than informal leases" },
                  { icon: FileCheck, title:"Tax Free", description:"Section 10(1) compliant" },
                  { icon: FileText, title:"Full Documentation", description:"Legal agreement included" },
                  { icon: Sprout, title:"Soil Health", description:"Maintained & improved" },
                ].map((benefit, index) => (
                  <div key={index} className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="w-10 h-10 rounded-lg bg-[#1B6B3A]/[0.08] flex items-center justify-center mb-3">
                      <benefit.icon className="w-5 h-5 text-[#1B6B3A]" />
                    </div>
                    <h4 className="font-bold text-[#111827] mb-1">{benefit.title}</h4>
                    <p className="text-sm text-[#6B7280]">{benefit.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* SECTION 10: ABOUT US */}
      {/* ===================================================================== */}
      <section id="about" className="py-12 md:py-16  overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Founders Section */}
          <FadeInSection className="text-center mb-16">
            <p className="text-xs font-medium tracking-widest text-[#1B6B3A] uppercase mb-3">
              About Us
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#111827] mb-8">
              Meet the Founders
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  initial:"S",
                  imageUrl:"https://i.pravatar.cc/150?img=11",
                  name:"Sai Kumar",
                  title:"Co-Founder & CEO",
                  bio:"An Ag-tech visionary with over 10 years of experience in supply chain optimization and digital commerce.",
                },
                {
                  initial:"P",
                  imageUrl:"https://i.pravatar.cc/150?img=5",
                  name:"Priya Reddy",
                  title:"Co-Founder & COO",
                  bio:"Expert in operational excellence and farmer community building, focused on scaling sustainable procurement models.",
                },
                {
                  initial:"A",
                  imageUrl:"https://i.pravatar.cc/150?img=12",
                  name:"Arjun Patel",
                  title:"Co-Founder & CTO",
                  bio:"Technology strategist dedicated to building immutable traceability systems and AI-driven crop monitoring.",
                },
              ].map((founder, index) => (
                <div key={index} className="group bg-white border border-[#E5E7EB] rounded-2xl p-8 hover:-translate-y-2 hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center">
                  {founder.imageUrl ? (
                    <img 
                      src={founder.imageUrl} 
                      alt={founder.name} 
                      className="w-24 h-24 rounded-full object-cover mb-6 border-4 border-[#1B6B3A]/10 group-hover:border-[#1B6B3A]/30 group-hover:scale-110 transition-all duration-300 shadow-lg"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#1B6B3A] to-[#2E8B57] flex items-center justify-center text-white text-3xl font-bold mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      {founder.initial}
                    </div>
                  )}
                  <h4 className="text-xl font-bold text-[#111827] mb-1">{founder.name}</h4>
                  <p className="text-sm font-medium text-[#1B6B3A] mb-4 uppercase tracking-wider">{founder.title}</p>
                  <p className="text-[#6B7280] leading-relaxed text-sm">
                    {founder.bio}
                  </p>
                </div>
              ))}
            </div>
          </FadeInSection>

        </div>
      </section>

      {/* ===================================================================== */}
      {/* SECTION 11: CONTACT / GET A QUOTE */}
      {/* ===================================================================== */}
      <section id="contact" className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection className="text-center mb-12 md:mb-16">
            <p className="text-xs font-medium tracking-widest text-[#1B6B3A] uppercase mb-3">
              Contact Us
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#111827] mb-4">
              Ready to replace your mandi supplier?
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
                  <div className="flex items-start gap-4 group">
                    <div className="w-10 h-10 rounded-lg bg-[#1B6B3A]/10 flex items-center justify-center shrink-0 group-hover:bg-[#1B6B3A]/20 transition-colors">
                      <Phone className="w-5 h-5 text-[#1B6B3A]" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#6B7280] uppercase tracking-wider mb-1">Phone</p>
                      <span className="text-[#111827] font-medium">+91 98765 43210</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 group">
                    <div className="w-10 h-10 rounded-lg bg-[#1B6B3A]/10 flex items-center justify-center shrink-0 group-hover:bg-[#1B6B3A]/20 transition-colors">
                      <Mail className="w-5 h-5 text-[#1B6B3A]" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#6B7280] uppercase tracking-wider mb-1">Email</p>
                      <span className="text-[#111827] font-medium">hello@farmbrand.in</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 group">
                    <div className="w-10 h-10 rounded-lg bg-[#1B6B3A]/10 flex items-center justify-center shrink-0 group-hover:bg-[#1B6B3A]/20 transition-colors">
                      <MapPin className="w-5 h-5 text-[#1B6B3A]" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#6B7280] uppercase tracking-wider mb-1">Location</p>
                      <span className="text-[#111827] font-medium leading-relaxed">AgHub, PJTSAU Campus, Hyderabad, Telangana</span>
                    </div>
                  </div>
                </div>

                <a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#1B6B3A] text-white hover:bg-[#155530] px-8 py-4 rounded-lg text-base font-bold transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-[#1B6B3A]/20"
                >
                  <MessageCircle className="w-6 h-6" />
                  Chat on WhatsApp
                </a>
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
                <span className="text-lg font-bold text-white">FarmBrand</span>
              </div>
              <p className="text-sm text-[#9CA3AF] leading-relaxed">
                Making India&apos;s agricultural supply chain transparent, accountable, and efficient.
              </p>
            </div>

            {/* Column 2: Quick Links */}
            <div>
              <h4 className="text-white font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {["How It Works","Services","Traceability","For Landowners","About Us","Contact"].map((link) => (
                  <li key={link}>
                    <button
                      onClick={() =>
                        scrollToSection(link.toLowerCase().replace(/ /g,"-"))
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
                <li>+91 98765 43210</li>
                <li>hello@farmbrand.in</li>
                <li>AgHub, Hyderabad, Telangana</li>
              </ul>
            </div>
          </div>

          {/* Certification Badges */}
          <div className="flex flex-wrap justify-center gap-4 py-6">
            {["AgHub","FSSAI","NABL","APEDA"].map((badge) => (
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
            <p>© 2026 FarmBrand. All rights reserved.</p>
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
