export const brand = {
  name: "growthrush",
  suffix: ".ai",
  tagline: "Expansion Partners",
} as const;

export const navLinks = [
  { label: "The Engine", targetId: "engine" },
  { label: "Tracks", targetId: "tracks" },
  { label: "Proof", targetId: "proof" },
  { label: "Offer", targetId: "offer" },
  { label: "FAQ", targetId: "faq" },
] as const;

export const announcement = {
  live: "Now onboarding the Q3 cohort — limited slots",
  countdownLabel: "Applications close in",
} as const;

export const countdownOffset = {
  days: 6,
  hours: 8,
  minutes: 30,
} as const;

export const hero = {
  kicker: "Most trusted expansion partner in India",
  titleLead: "We took Haldiram national.",
  titleAccent: "We'll expand your brand next",
  lede: "Distributors, franchise model, territory, unit economics, SOPs — we install the whole machine so you scale without guessing.",
  checks: [
    "Without years of trial and error",
    "Without the wrong distributors or territories",
    "Without a franchise model that breaks",
  ],
  glance: [
    { label: "Duration", value: "2–4 weeks" },
    { label: "Format", value: "Remote + on-ground" },
    { label: "You leave with", value: "A rollout plan" },
  ],
  cta: "Get your Expansion Blueprint",
  ctaNote: "Fixed scope. Credited in full to the done-for-you engagement.",
  credential: {
    initial: "H",
    logo: "/logos/haldiram.png",
    logoAlt: "Haldiram's",
    headline: "The team behind Haldiram's national rollout.",
    body: "10+ years · 300+ brands · 5000+ distributors & franchises.",
  },
  mapCaption: "One region → a national network",
} as const;

export const proofStats = [
  { value: "300+", label: "Brands served" },
  { value: "5000+", label: "Distributors & franchises" },
  { value: "10+ Yrs", label: "In market" },
  { value: "₹250 Cr", label: "Channel revenue influenced" },
] as const;

export const problem = {
  kicker: "Why expansion stalls",
  title:
    "Trying to expand the wrong way kills more good brands than bad products do.",
  body: "Your product works at home. Then you try to scale — and hit the wall every regional brand hits.",
  wall: [
    "Distributors who carry 40 brands and push none of them.",
    "Territories given away with no exclusivity logic you can fix later.",
    "Franchising before the unit economics are proven.",
    "Your best people firefighting expansion instead of running the business.",
  ],
  turnLead:
    "Distribution and franchising aren't a tactic you bolt on. They're an operating system.",
  turnAccent: "We've already built it — you don't have to.",
  chartTitle: "Revenue vs time",
  chartGood: "With growthrush.ai",
  chartBad: "Expanding the wrong way",
} as const;

export const videoTestimonials = [
  {
    name: "[Name]",
    role: "Founder",
    company: "[Brand]",
    quote:
      "3 cities to 14 in eleven months — without a single territory dispute.",
    metrics: [
      { value: "14", label: "new cities" },
      { value: "120+", label: "distributors" },
    ],
    youtubeId: "",
    vimeoId: "",
    mp4: "",
    poster: "",
  },
  {
    name: "[Name]",
    role: "MD",
    company: "[Brand]",
    quote: "Finally a franchise model with numbers a franchisee could trust.",
    metrics: [
      { value: "22", label: "units opened" },
      { value: "14 mo", label: "payback" },
    ],
    youtubeId: "",
    vimeoId: "",
    mp4: "",
    poster: "",
  },
  {
    name: "[Name]",
    role: "CEO",
    company: "[Brand]",
    quote: "They didn't hand us a strategy and leave. They built it with us.",
    metrics: [
      { value: "₹80 Cr", label: "revenue" },
      { value: "9", label: "states" },
    ],
    youtubeId: "",
    vimeoId: "",
    mp4: "",
    poster: "",
  },
] as const;

export const engine = {
  kicker: "The mechanism",
  title: "The National Expansion Engine",
  lede: "Six systems. We install all of them, in sequence — skipping any one is where expansion breaks.",
  pillars: [
    {
      idx: "01",
      title: "Territory & Market Map",
      body: "We rank every state and city on real demand and competition, so you enter where you'll win.",
      get: "a prioritized rollout sequence.",
    },
    {
      idx: "02",
      title: "Distributor Architecture",
      body: "Margins, exclusivity, coverage, and accountability — designed before you sign a single partner.",
      get: "your distributor model & shortlist.",
    },
    {
      idx: "03",
      title: "Franchise & Unit Economics",
      body: "We prove the numbers — investment, payback, ROI — then build a model franchisees stay in.",
      get: "a franchise P&L & fee design.",
    },
    {
      idx: "04",
      title: "Partner Acquisition",
      body: "Finding, vetting, and closing the right partners, run as a system instead of on hope.",
      get: "a qualified, screened pipeline.",
    },
    {
      idx: "05",
      title: "Onboarding & Field SOPs",
      body: "We codify how every outlet and distributor runs, so the tenth performs like the first.",
      get: "manuals & launch checklists.",
    },
    {
      idx: "06",
      title: "Governance & Scale",
      body: "The dashboards, cadence, and incentives that keep a growing network aligned and consistent.",
      get: "a performance-tracking system.",
    },
  ],
} as const;

export const tracks = {
  kicker: "What done-for-you means",
  title: "You're not buying advice. You're buying the built network.",
  items: [
    {
      tag: "Manufacturers & product brands",
      title: "Distributor Track",
      points: [
        "Territory rollout plan",
        "Distributor model & margin structure",
        "Vetted pipeline & closing support",
        "Onboarding SOPs & field playbooks",
        "Performance dashboard & cadence",
      ],
    },
    {
      tag: "Brands ready to franchise",
      title: "Franchise Track",
      points: [
        "Proven unit economics & P&L",
        "Model (FOFO / FOCO / hybrid), fees & royalties",
        "Franchisee funnel & screening",
        "Outlet operations manual & training",
        "Multi-unit governance system",
      ],
    },
  ],
  note: "Most brands run both — we sequence them so distribution funds the franchise build.",
} as const;

export const caseStudies = {
  kicker: "Success stories",
  title: "Our Success Stories and Case Studies",
  lede: "How growing brands went national with us — the challenge, what we built, and the result.",
  items: [
    {
      tag: "FMCG · Product brand",
      brand: "[Brand name]",
      challenge:
        "Stuck in 3 states; distributors carried rival brands and pushed none.",
      built:
        "A restructured distributor network with exclusivity, a margin ladder, and field SOPs.",
      metrics: [
        { value: "14", label: "states entered" },
        { value: "120+", label: "distributors" },
      ],
    },
    {
      tag: "Food & beverage · Franchise",
      brand: "[Brand name]",
      challenge:
        "Wanted to franchise, but the unit economics didn't hold up on paper.",
      built:
        "A proven franchise model — P&L, FOFO/FOCO structure, and a franchisee funnel.",
      metrics: [
        { value: "22", label: "units opened" },
        { value: "14 mo", label: "payback" },
      ],
    },
    {
      tag: "D2C · Going offline",
      brand: "[Brand name]",
      challenge:
        "Strong online, invisible on shelves; no offline distribution muscle.",
      built:
        "A national retail rollout with the right distributors and modern-trade entry.",
      metrics: [
        { value: "₹80 Cr", label: "channel revenue" },
        { value: "9", label: "states" },
      ],
    },
  ],
} as const;

export const fit = {
  kicker: "Fit",
  title: "Is this you?",
  yes: {
    title: "This is for you if",
    points: [
      "You work in one region with real pull from others",
      "You're ready to build a serious distributor network",
      "You want to franchise but doubt the model scales",
      "You're a D2C brand moving offline and national",
      "You'd rather buy a proven system than build one",
    ],
  },
  no: {
    title: "This is not for you if",
    points: [
      "You haven't found fit in even one market yet",
      "You want a slide deck, not a built network",
      "You're shopping on price, not results",
    ],
  },
} as const;

export const offer = {
  kicker: "The offer",
  title: "Start with the Blueprint. Scale with the build.",
  slots: { taken: 4, total: 8 },
  cardTitle: "The Expansion Blueprint",
  cardSub:
    "A 2–4 week diagnostic and roadmap. You leave owning a defensible plan to go national — with us or not.",
  includes: [
    "Territory & market prioritization",
    "Distributor and/or franchise model recommendation",
    "Unit economics & P&L pressure-test",
    "90-day rollout roadmap with milestones",
    "A live working session to walk it through",
  ],
  valueStack: [
    { label: "Blueprint diagnostic + roadmap", value: "₹1,50,000" },
    { label: "Territory Scoring Model", value: "₹40,000" },
    { label: "Distributor Template Pack", value: "₹35,000" },
    { label: "Franchise P&L Calculator", value: "₹50,000" },
  ],
  totalValue: "₹2,75,000",
  priceLead: "Your price today",
  price: "₹1,25,000",
  priceSuffix: "+GST",
  credit: "Credited in full to the engagement if you proceed within 30 days.",
  cta: "Register & get your Blueprint",
  anchor:
    "One wrong distributor deal or mispriced franchise model costs most brands ₹15–40 lakh to unwind. The Blueprint costs a fraction of one mistake.",
  engagementNote:
    "the full build of your network over 6–9 months. By application after the Blueprint; limited slots.",
} as const;

export const bonuses = {
  kicker: "Included when you start",
  title: "Three tools you keep, whatever you decide.",
  items: [
    {
      tag: "BONUS 1",
      title: "Territory Scoring Model",
      body: "The spreadsheet we use to rank cities and states by expansion readiness.",
      value: "₹40,000",
    },
    {
      tag: "BONUS 2",
      title: "Distributor Template Pack",
      body: "Agreement, margin ladder, and exclusivity clauses ready to adapt.",
      value: "₹35,000",
    },
    {
      tag: "BONUS 3",
      title: "Franchise P&L Calculator",
      body: "Model investment, payback, and franchisee ROI before you open one outlet.",
      value: "₹50,000",
    },
  ],
  total: "₹1,25,000",
} as const;

export const team = {
  kicker: "The people who've done this",
  title: "We've been on the operator's side of a national rollout.",
  body: [
    "Our team spent years inside the expansion of one of India's largest food brands — the part most consultants only theorize about. We've signed the distributors, negotiated the territories, and fixed the franchise models that were quietly bleeding money.",
    "That's the difference: we've done it, not just studied it. Now we build the same machine for brands ready to grow — and take on only a few at a time, because done-for-you means we're actually in it with you.",
  ],
} as const;

export const guarantee = {
  title: "The Blueprint pays for itself, or we rework it.",
  body: "If you don't finish with a clearer, more confident plan to go national than the day you started, we rework it until you do. And the fee is credited to the full engagement, so moving forward costs nothing extra.",
} as const;

export const inaction = {
  wait: {
    title: "Every quarter you wait",
    points: [
      "Competitors lock up the distributors you wanted",
      "National demand left on the table",
      "You franchise later on a weaker model",
      "Your team stays stuck firefighting",
    ],
  },
  act: {
    title: "If you start now",
    points: [
      "Claim the strongest partners and territories first",
      "Capture demand while it's yours",
      "Franchise on proven economics",
      "Your team runs the business; the system runs the rollout",
    ],
  },
} as const;

export const faq = {
  kicker: "Questions",
  title: "Everything you need to know",
  items: [
    {
      q: "Do we need to know how we want to expand?",
      a: "No. The Blueprint tells you whether distribution, franchising, or both is right — and in what order.",
    },
    {
      q: "How is this different from a consultant?",
      a: "Consultants hand you a strategy and leave. We build the network with you.",
    },
    {
      q: "We're not in food. Does Haldiram experience apply?",
      a: "The product changes; the machinery doesn't. Territory, distributor structure, and unit economics are the same across categories.",
    },
    {
      q: "What does the Blueprint cost?",
      a: "₹1,25,000 + GST, fixed scope — credited in full if you continue within 30 days.",
    },
    {
      q: "How many clients do you take?",
      a: "A limited number each quarter. Done-for-you means real involvement, so we cap capacity.",
    },
  ],
} as const;

export const finalCta = {
  kicker: "Ready",
  title: "You've seen it done. Now have it done for you.",
  body: "Start with the Blueprint. Walk away with a rollout plan you own — and the team that's built one waiting to build yours.",
  cta: "Register & get your Blueprint",
  trust: ["Fixed scope", "Credited to the engagement", "Limited slots"],
} as const;

export const stickyBar = {
  title: "Get your Expansion Blueprint",
  sub: "Fixed scope · credited to the engagement · limited slots",
  cta: "Get the Blueprint",
} as const;

export const footer = {
  company: "Estrellingent Technology Private Limited",
  blurb:
    "We build national distributor and franchise networks for Indian brands — territory, unit economics, partners and SOPs, installed end to end.",
  legal:
    "All brand names referenced, including Haldiram, are the property of their respective owners; references describe prior professional experience and do not imply endorsement or a current commercial relationship. Confirm exact wording of any brand association with counsel before publishing.",
} as const;
