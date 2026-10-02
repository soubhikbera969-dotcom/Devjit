export interface Trait {
  id: string;
  title: string;
  joke: string;
  truth: string;
  icon: string;
}

export interface PhotoNote {
  id: string;
  image: string;
  alt: string;
  dateStamp: string;
  location: string;
  title: string;
  sweetNote: string;
  roastPS: string;
  tapeColor?: string;
  rotateDeg?: number;
}

export interface CricketStat {
  label: string;
  value: number;
  suffix: string;
  subtext: string;
}

export interface Wish {
  id: string;
  number: string;
  category: string;
  tagline: string;
  joke: string;
  heartfelt: string;
  icon: string;
  accentColor: string;
}

export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  caption: string;
  location?: string;
  rotateDeg?: number;
}

export const BIRTHDAY_DATA = {
  person: {
    fullName: "Devjit Rath",
    nickname: "Dev",
    turningAge: 19,
    birthDay: 5,
    birthMonth: 10, // October (1-indexed)
    fromName: "Soubhik",
    relation: "School brothers & partners in crime",
    runningGag: "Reason for teasing: None. Still happening.",
  },

  countdown: {
    targetYear: 2026,
    targetMonth: 10, // October
    targetDay: 5,
    timezone: "Asia/Kolkata",
    celebrationMessage: "It's your day, Dev! Happy 19th Birthday, Legend!",
    subMessage: "The countdown hit zero, but the roasts are just getting started.",
  },

  hero: {
    eyebrow: "A handcrafted tribute for the legend himself",
    titleOutlined: "HAPPY BIRTHDAY",
    nameScript: "Dev",
    subtitle: "Devjit Rath turns 19 — 19 years of being casually unbothered, chronically roasted, and deeply irreplaceable.",
    scrollCta: "Scroll down to start the roast & the tribute",
  },

  quote: {
    linePrefix: "They say you don’t choose the people you meet in school...",
    boldRoast: "Dev, even if I had the choice, I’d still pick the guy we roast 24/7 for literally zero reason—",
    heartfeltClimax: "because when life got noisy and chaotic, you’re the one brother who never hesitated to show up.",
    attribution: "— Soubhik (Your #1 fan and chief roaster)",
  },

  celebrator: {
    badge: "The Birthday Celebrator",
    headline: "THE MAN. THE MYTH. THE UNSOLVED MYSTERY.",
    description: "Devjit Rath is a rare specimen: calm enough to survive exams without panic, ambitious enough to chase creative stardom, and patient enough to endure endless roasting with a cool smirk.",
    runningJokeBadge: "OFFICIAL STATUS: Teased for no apparent reason since day one.",
    hobbies: [
      { name: "Cricket & Sports", desc: "Clutch batsman, fielding maestro & couch umpire", icon: "cricket" },
      { name: "Music & Movies", desc: "Cinematic tastebuds & curating late-night playlists", icon: "film" },
      { name: "Gym & Fitness", desc: "Chasing peak gains & looking swole in every frame", icon: "dumbbell" },
    ],
    traits: [
      {
        id: "loyal",
        title: "Fiercely Loyal",
        joke: "Will back you up in an argument even if you just said the earth is flat.",
        truth: "The most dependable brother in any storm; his word is ironclad.",
        icon: "shield",
      },
      {
        id: "funny",
        title: "Effortlessly Funny",
        joke: "Unintentionally hilarious 80% of the time, intentionally 20%.",
        truth: "Never a dull room when he walks in—his comedic timing is unmatched.",
        icon: "sparkles",
      },
      {
        id: "calm",
        title: "Calm & Chill",
        joke: "Heart rate never crosses 60 BPM, even when the world is on fire.",
        truth: "The steady anchor who grounds everyone when things get chaotic.",
        icon: "waves",
      },
      {
        id: "ambitious",
        title: "Wildly Ambitious",
        joke: "Secretly plotting world domination in between gym sets and warmups.",
        truth: "Quietly dedicated to making his mark and reaching creative fame.",
        icon: "flame",
      },
    ] as Trait[],
  },

  photoNotes: [
    {
      id: "school-days",
      image: "/images/gallery-1.jpg",
      alt: "School days mischief",
      dateStamp: "School Days",
      location: "Classroom 10-B • Back Bench",
      title: "Where the Chaos Began",
      sweetNote: "You made the most boring classes feel like a comedy show. From sharing lunchboxes to holding back giggles during strict lectures, school was only memorable because you were in it.",
      roastPS: "P.S. You still owe me 5 pens that you 'borrowed' in 9th grade and never returned.",
      tapeColor: "rgba(255, 200, 61, 0.4)",
      rotateDeg: -2,
    },
    {
      id: "match-day",
      image: "/images/note-2.jpg",
      alt: "Match day adrenaline",
      dateStamp: "Match Days",
      location: "Gully Pitch • Turf Wars",
      title: "Clutch Batsman & Sideline Umpire",
      sweetNote: "Sunburnt afternoons, shouting on the pitch, arguing dismissals until sundown, and celebrating every single boundary like we lifted the World Cup. Playing alongside you will always be a core memory.",
      roastPS: "P.S. We all know that delivery wasn't a wide, but we let you argue it anyway.",
      tapeColor: "rgba(245, 161, 0, 0.4)",
      rotateDeg: 2,
    },
    {
      id: "trips-outings",
      image: "/images/gallery-2.jpg",
      alt: "Outings and late night chai",
      dateStamp: "Trips & Outings",
      location: "Road Beats • Midnight Chai",
      title: "Unplanned Rides & Big Dreams",
      sweetNote: "Spontaneous drives with no map, blasting playlists with the windows down, talking about what our lives would look like years from now. With you, even getting lost felt like an adventure.",
      roastPS: "P.S. Still taking 45 minutes just to decide what song to play next.",
      tapeColor: "rgba(255, 200, 61, 0.4)",
      rotateDeg: -1,
    },
    {
      id: "friend-showed-up",
      image: "/images/note-1.jpg",
      alt: "True brother who showed up",
      dateStamp: "Always There",
      location: "Right By My Side",
      title: "The Brother Who Showed Up",
      sweetNote: "Whenever things got heavy or tough to navigate, you never hesitated or asked for reasons. You just showed up, stood solid, and held it down. That's rare, and that's why you're family for life.",
      roastPS: "P.S. You take our 24/7 unprovoked teasing like a champ with that trademark calm smirk.",
      tapeColor: "rgba(245, 161, 0, 0.4)",
      rotateDeg: 2,
    },
    {
      id: "grind-creative",
      image: "/images/note-3.jpg",
      alt: "Gym grind and creative ambition",
      dateStamp: "The Grind",
      location: "Iron Paradise • Creative Lab",
      title: "Hungry for Stardom",
      sweetNote: "Watching your dedication grow—whether lifting heavier at the gym or honing your creative instincts. You have an undeniable hunger, and I genuinely can't wait to see you take over the big stage.",
      roastPS: "P.S. You're definitely looking swole, just please stop flexing in every glass reflection.",
      tapeColor: "rgba(255, 200, 61, 0.4)",
      rotateDeg: -2,
    },
    {
      id: "turning-19",
      image: "/images/gallery-4.jpg",
      alt: "Turning 19 in style",
      dateStamp: "Turning 19",
      location: "The Big Stage Awaits",
      title: "To The Moon & Beyond",
      sweetNote: "Happy 19th Birthday, Dev. Stay grounded, stay loyal, and keep chasing those creative stars. Whatever mountain you decide to climb next, remember I'll always be cheering in the front row.",
      roastPS: "P.S. VIP front-row passes to your future celebrity red carpets better be free for me.",
      tapeColor: "rgba(255, 200, 61, 0.4)",
      rotateDeg: 1,
    },
  ] as PhotoNote[],
  // Backwards compatibility alias
  get milestones() {
    return this.photoNotes;
  },

  manOfTheMatch: {
    awardTitle: "PLAYER OF THE CENTURY",
    headline: "MAN OF THE MATCH: DEVJIT RATH",
    matchDetails: "Devjit Rath 19th Birthday Cup • Unanimous Decision • Soubhik’s XI vs The World",
    stats: [
      { label: "Loyalty Rating", value: 100, suffix: "%", subtext: "Zero betrayal, pure brotherhood" },
      { label: "Chill Factor", value: 99, suffix: "%", subtext: "Ice in his veins 24/7" },
      { label: "Teased For No Reason", value: 365, suffix: " Days/Yr", subtext: "Unbroken streak since school" },
      { label: "Strike Rate Showing Up", value: 100, suffix: "%", subtext: "Always in your corner" },
    ] as CricketStat[],
    quoteBadge: "“Has never lost his cool, except when the gym ran out of matching dumbbells.”",
  },

  gallery: [
    { id: "g1", src: "/images/hero.jpg", alt: "Devjit Rath looking sharp", caption: "The Birthday King himself, looking effortlessly iconic.", rotateDeg: -2 },
    { id: "g2", src: "/images/about.jpg", alt: "Dev in his element", caption: "Calm, composed, and probably thinking about dinner or gym gains.", rotateDeg: 3 },
    { id: "g3", src: "/images/gallery-1.jpg", alt: "School & Hangout Memories", caption: "Throwback moments: where all the mischief and legend began.", rotateDeg: -1 },
    { id: "g4", src: "/images/gallery-2.jpg", alt: "Laughs and adventures", caption: "Can never take a photo together without someone bursting into laughter.", rotateDeg: 2 },
    { id: "g5", src: "/images/gallery-3.jpg", alt: "Squad vibes and sports day", caption: "Gully cricket kings and sideline strategists.", rotateDeg: -3 },
    { id: "g6", src: "/images/gallery-4.jpg", alt: "Chilling in style", caption: "Aesthetic levels: dangerous. Roast levels: maximum.", rotateDeg: 1 },
    { id: "g7", src: "/images/gallery-5.jpg", alt: "Trips and memorable days", caption: "Road trips, crazy memories, and zero regrets.", rotateDeg: -2 },
    { id: "g8", src: "/images/gallery-6.jpg", alt: "Unfiltered joy", caption: "Proof that good times with brothers never get old.", rotateDeg: 2 },
    { id: "g9", src: "/images/gallery-7.jpg", alt: "Brothers for life", caption: "Through every high and low, standing solid.", rotateDeg: -1 },
    { id: "g10", src: "/images/gallery-8.jpg", alt: "Classics", caption: "The classic Dev smile: 50% innocence, 50% plotting chaos.", rotateDeg: 3 },
  ] as GalleryItem[],

  wishes: [
    {
      id: "health",
      number: "01",
      category: "HEALTH & FITNESS",
      tagline: "Stay Fit, Beast Mode & Undefeated",
      joke: "May your bench press go up, your recovery be instant, and your gym selfies continue to break local algorithms.",
      heartfelt: "Wishing you lifelong strength, vibrant health, relentless energy, and an unbeatable mindset to conquer every mountain ahead.",
      icon: "dumbbell",
      accentColor: "#FFC83D",
    },
    {
      id: "career",
      number: "02",
      category: "CAREER & CREATIVE FAME",
      tagline: "The Spotlight Awaits Your Name",
      joke: "Just don't act like you don't recognize me when the paparazzi and red carpet flashes start blinding you.",
      heartfelt: "May your creative vision catch fire. You have the raw hunger, the taste, and the heart to become renowned in your field. Go claim your crown.",
      icon: "clapper",
      accentColor: "#F5A100",
    },
    {
      id: "happiness",
      number: "03",
      category: "HAPPINESS & PEACE",
      tagline: "Unshakable Joy & Good Vibes Only",
      joke: "May you always have good food, zero traffic, and an endless supply of patience for all our unprovoked teasing.",
      heartfelt: "Above everything else, I wish you peace of mind, laughter that makes your stomach hurt, genuine people around you, and absolute happiness in every chapter.",
      icon: "sun",
      accentColor: "#FFD966",
    },
  ] as Wish[],

  finalNote: {
    heading: "Thank you for being you, Dev.",
    letterBody: [
      "Dear Dev,",
      "Nineteen is huge, man. Looking back at where we started—two reckless kids in school uniforms cracking stupid jokes in the back row—to watching you grow into this driven, loyal, gym-grinding, creative powerhouse... it honestly makes me proud to call you my brother.",
      "Thank you for the times you listened when I needed to vent, for never flinching when things got tough, and for being the kind of friend anyone would be blessed to have.",
      "You deserve every bit of success, fame, and happiness that is heading your way. Keep that calm confidence, keep hitting those creative milestones, and never lose that spark.",
    ],
    roastSignoff: "Stay legendary, you absolute clown. Don't let 19 get to your head—you're still getting roasted tomorrow for no reason.",
    author: "Your brother for life, Soubhik",
    footerText: "Crafted with passion, nostalgia & brotherly love for Devjit Rath's 19th Birthday",
  },
};
