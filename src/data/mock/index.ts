export interface MockProjectImage {
  id: string;
  url: string;
  alt?: string;
  order: number;
  layoutHint?: "full" | "half" | "third";
}

export interface MockProject {
  id: string;
  slug: string;
  title: string;
  type: "FILM" | "PHOTOGRAPHY";
  category: string;
  location?: string;
  eventDate?: string;
  summary: string;
  storyContent: string;
  coverImage: string;
  videoUrl?: string;
  featured: boolean;
  published: boolean;
  vendorCredits?: Record<string, string>;
  order: number;
  images: MockProjectImage[];
}

export interface MockJournalPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  published: boolean;
  publishedAt?: string;
}

export interface MockSiteSettings {
  studioName: string;
  tagline?: string;
  heroMediaUrl?: string;
  heroMediaType?: "video" | "image";
  aboutContent?: string;
  contactEmail?: string;
  contactPhone?: string;
  instagramUrl?: string;
  primaryColor?: string;
}

export const mockSiteSettings: MockSiteSettings = {
  studioName: "Shubham Video Graphics",
  tagline: "Modern wedding photography and filmmaking",
  heroMediaUrl:
    "https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&q=80",
  heroMediaType: "image",
  aboutContent:
    "Considered to be the epitome of modern photography and filmmaking, Shubham Video Graphics has been creating photographs and films that stand the test of time. Every wedding is unique and so are our films — we celebrate the wild ones, the travellers, and the new-age modern couple who are not afraid to experiment.",
  contactEmail: "hello@shubhamvideographics.com",
  contactPhone: "+91 98765 43210",
  instagramUrl: "https://instagram.com",
  primaryColor: "#3d3d3d",
};

export const mockProjects: MockProject[] = [
  {
    id: "1",
    slug: "reva-and-zach",
    title: "Reva & Zach",
    type: "PHOTOGRAPHY",
    category: "Wedding",
    location: "Udaipur, India",
    eventDate: "2024-01-01",
    summary:
      "A cross-cultural New Year wedding celebration in Udaipur with Reva and Zach.",
    storyContent: `<p>Let's call this our "Happy New Year Wedding". We welcomed 2024 partying with Reva and Zach and we couldn't have asked for a better beginning for the new year. This was quite an experience for us and the friends of Reva and Zach who flew all the way to Udaipur for this cross cultural union.</p>`,
    coverImage:
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80",
    videoUrl: "https://player.vimeo.com/video/76979871",
    featured: true,
    published: true,
    vendorCredits: {
      "Wedding Planned by": "Seven Steps Weddings",
      "Reva's Outfit": "Tarun Tahiliani, Galia Lahav",
      "Zach's Outfit": "Rohit Bal, Brioni",
      Stylists: "Mohit Rai and Aastha Sharma",
      Makeup: "Savleen Manchanda",
      Hair: "Amit Thakur",
    },
    order: 0,
    images: [
      {
        id: "1a",
        url: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=1600&q=80",
        alt: "Bride walking through vineyard",
        order: 0,
        layoutHint: "full",
      },
      {
        id: "1b",
        url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80",
        alt: "Wedding rings detail",
        order: 1,
        layoutHint: "half",
      },
      {
        id: "1c",
        url: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&q=80",
        alt: "Couple portrait",
        order: 2,
        layoutHint: "half",
      },
      {
        id: "1d",
        url: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1600&q=80",
        alt: "Reception dancing",
        order: 3,
        layoutHint: "full",
      },
    ],
  },
  {
    id: "2",
    slug: "elena-and-marco",
    title: "Elena & Marco",
    type: "FILM",
    category: "Wedding",
    location: "Amalfi Coast, Italy",
    eventDate: "2024-06-22",
    summary:
      "A cliffside Italian celebration where the Mediterranean met timeless romance.",
    storyContent: `<p>Elena and Marco returned to Marco's ancestral village on the Amalfi Coast for a wedding that felt like a dream sequence from a Fellini film. The terraced gardens overlooking the sea provided a backdrop of impossible beauty.</p><p>From the traditional processional through cobblestone streets to the candlelit dinner that lasted until dawn, every moment was infused with la dolce vita.</p>`,
    coverImage:
      "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=1200&q=80",
    videoUrl: "https://player.vimeo.com/video/76979871",
    featured: true,
    published: true,
    order: 1,
    images: [
      {
        id: "2a",
        url: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=1600&q=80",
        alt: "Amalfi coast wedding",
        order: 0,
        layoutHint: "full",
      },
      {
        id: "2b",
        url: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=80",
        alt: "Table setting",
        order: 1,
        layoutHint: "third",
      },
      {
        id: "2c",
        url: "https://images.unsplash.com/photo-1520854221256-17451cc791c5?w=800&q=80",
        alt: "Couple on terrace",
        order: 2,
        layoutHint: "third",
      },
      {
        id: "2d",
        url: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80",
        alt: "Sunset celebration",
        order: 3,
        layoutHint: "third",
      },
    ],
  },
  {
    id: "3",
    slug: "sophia-james-engagement",
    title: "Sophia & James",
    type: "FILM",
    category: "Engagement",
    location: "Central Park, New York",
    eventDate: "2024-03-10",
    summary:
      "A spring engagement session capturing the electric energy of New York City love.",
    storyContent: `<p>Sophia and James wanted their engagement film to feel like a love letter to New York — and Central Park in early spring delivered perfectly. Cherry blossoms, spontaneous laughter, and that unmistakable city energy.</p>`,
    coverImage:
      "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=1200&q=80",
    videoUrl: "https://player.vimeo.com/video/76979871",
    featured: true,
    published: true,
    order: 2,
    images: [
      {
        id: "3a",
        url: "https://images.unsplash.com/photo-1529636798450-6d114e655e80?w=1600&q=80",
        alt: "Engagement in park",
        order: 0,
        layoutHint: "full",
      },
    ],
  },
  {
    id: "4",
    slug: "harper-editorial",
    title: "The Harper Editorial",
    type: "PHOTOGRAPHY",
    category: "Editorial",
    location: "Los Angeles, California",
    eventDate: "2024-01-15",
    summary:
      "Fashion-forward bridal editorial blending haute couture with raw California light.",
    storyContent: `<p>An editorial shoot for Harper's Bride magazine featuring emerging designers against the stark beauty of the Mojave-adjacent landscape. Bold silhouettes, dramatic shadows, and an unapologetic celebration of modern bridal style.</p>`,
    coverImage:
      "https://images.unsplash.com/photo-1594552072238-4828f514831d?w=1200&q=80",
    featured: true,
    published: true,
    order: 3,
    images: [
      {
        id: "4a",
        url: "https://images.unsplash.com/photo-1594552072238-4828f514831d?w=1600&q=80",
        alt: "Editorial bridal portrait",
        order: 0,
        layoutHint: "full",
      },
      {
        id: "4b",
        url: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80",
        alt: "Detail shot",
        order: 1,
        layoutHint: "half",
      },
      {
        id: "4c",
        url: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&q=80",
        alt: "Fashion portrait",
        order: 2,
        layoutHint: "half",
      },
    ],
  },
  {
    id: "5",
    slug: "maya-wedding-photos",
    title: "Maya & David",
    type: "PHOTOGRAPHY",
    category: "Wedding",
    location: "Charleston, South Carolina",
    eventDate: "2023-11-04",
    summary:
      "Southern charm meets modern elegance in a historic Charleston celebration.",
    storyContent: `<p>Maya and David's Charleston wedding was a masterclass in Southern hospitality. Live oaks draped in moss, a historic mansion, and a party that the neighborhood still talks about.</p>`,
    coverImage:
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1200&q=80",
    featured: false,
    published: true,
    order: 4,
    images: [
      {
        id: "5a",
        url: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1600&q=80",
        alt: "Charleston wedding",
        order: 0,
        layoutHint: "full",
      },
    ],
  },
  {
    id: "6",
    slug: "priya-arjun-mumbai",
    title: "Priya & Arjun",
    type: "FILM",
    category: "Wedding",
    location: "Mumbai, India",
    eventDate: "2023-12-09",
    summary:
      "A grand Mumbai reception blending tradition with contemporary elegance under a canopy of lights.",
    storyContent: `<p>Priya and Arjun's Mumbai celebration was a masterclass in modern Indian grandeur. Three days of ceremonies, each more spectacular than the last, culminating in a reception that Mumbai still talks about.</p><p>From the vibrant haldi colours to the candlelit mandap, every frame tells a story of two families becoming one.</p>`,
    coverImage:
      "https://images.unsplash.com/photo-1520854221256-17451cc791c5?w=1200&q=80",
    videoUrl: "https://player.vimeo.com/video/76979871",
    featured: false,
    published: true,
    order: 5,
    images: [
      {
        id: "6a",
        url: "https://images.unsplash.com/photo-1520854221256-17451cc791c5?w=1600&q=80",
        alt: "Mumbai wedding reception",
        order: 0,
        layoutHint: "full",
      },
    ],
  },
  {
    id: "7",
    slug: "ananya-rohit-goa",
    title: "Ananya & Rohit",
    type: "PHOTOGRAPHY",
    category: "Wedding",
    location: "Goa, India",
    eventDate: "2024-04-18",
    summary:
      "A barefoot beach wedding where the Arabian Sea met golden hour magic.",
    storyContent: `<p>Ananya and Rohit dreamed of a wedding where the ocean was their witness. Goa's pristine shores delivered — barefoot vows, sunset portraits, and a celebration that felt like a permanent vacation.</p>`,
    coverImage:
      "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=1200&q=80",
    featured: false,
    published: true,
    order: 6,
    images: [
      {
        id: "7a",
        url: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=1600&q=80",
        alt: "Beach wedding Goa",
        order: 0,
        layoutHint: "full",
      },
      {
        id: "7b",
        url: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=80",
        alt: "Beach ceremony detail",
        order: 1,
        layoutHint: "half",
      },
    ],
  },
];

export const mockJournalPosts: MockJournalPost[] = [
  {
    id: "j1",
    slug: "behind-the-lens-napa",
    title: "Behind the Lens: A Napa Valley Wedding",
    excerpt:
      "What it takes to capture golden hour magic when the light only lasts twelve minutes.",
    content: `<p>There's a moment on every Napa wedding day when the light turns liquid gold. As filmmakers, we've learned to chase it with precision — but also with patience.</p><p>On Reva and Zach's day, we had exactly twelve minutes of that perfect light. Here's how we prepared, positioned, and ultimately captured the shots that defined their film.</p><h2>Scouting is everything</h2><p>We arrived two days early to walk the property at every hour. The west-facing terrace became our anchor point — we knew exactly where the sun would kiss the vineyard rows.</p>`,
    coverImage:
      "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=1200&q=80",
    published: true,
    publishedAt: "2024-10-01",
  },
  {
    id: "j2",
    slug: "choosing-your-wedding-film-style",
    title: "Choosing Your Wedding Film Style",
    excerpt:
      "Documentary, cinematic, or editorial? A guide to finding the visual language that fits your story.",
    content: `<p>Every couple's love story has its own rhythm. Your wedding film should reflect that — not force you into a template.</p><p>We break down three distinct approaches to wedding filmmaking and help you identify which resonates with your vision.</p>`,
    coverImage:
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1200&q=80",
    published: true,
    publishedAt: "2024-08-15",
  },
  {
    id: "j3",
    slug: "udaipur-destination-wedding-guide",
    title: "Why Udaipur Is Perfect for Your Destination Wedding",
    excerpt:
      "Palaces, lakes, and golden light — a filmmaker's guide to the City of Lakes.",
    content: `<p>Udaipur has become the destination wedding capital of India for good reason. The interplay of water, architecture, and desert light creates a visual palette unlike anywhere else on earth.</p><p>We've filmed over forty weddings in Rajasthan, and each one reveals new corners of this magical city waiting to be discovered.</p>`,
    coverImage:
      "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=1200&q=80",
    published: true,
    publishedAt: "2024-06-01",
  },
  {
    id: "j4",
    slug: "pre-wedding-film-tips",
    title: "5 Things to Discuss Before Your Pre-Wedding Film",
    excerpt:
      "How to prepare for an engagement session that feels authentic, not staged.",
    content: `<p>The best pre-wedding films happen when couples forget the camera is there. Here are five conversations we have with every couple before the first frame is shot.</p><p>From wardrobe choices to location scouting, preparation is the secret to films that feel effortless.</p>`,
    coverImage:
      "https://images.unsplash.com/photo-1529636798450-6d114e655e80?w=1200&q=80",
    published: true,
    publishedAt: "2024-04-20",
  },
  {
    id: "j5",
    slug: "our-favourite-mumbai-venues",
    title: "Our Favourite Mumbai Venues for Wedding Films",
    excerpt:
      "Locations that consistently deliver stunning light, architecture, and atmosphere.",
    content: `<p>After years of filming across Mumbai, certain venues keep delivering magic. From heritage ballrooms to rooftop terraces overlooking the Queen's Necklace — here are our top picks for couples planning a Mumbai celebration.</p>`,
    coverImage:
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1200&q=80",
    published: true,
    publishedAt: "2024-02-10",
  },
];

export function getProjectBySlug(slug: string): MockProject | undefined {
  return mockProjects.find((p) => p.slug === slug && p.published);
}

export function getJournalBySlug(slug: string): MockJournalPost | undefined {
  return mockJournalPosts.find((p) => p.slug === slug && p.published);
}

export function getFeaturedProjects(): MockProject[] {
  return mockProjects
    .filter((p) => p.featured && p.published)
    .sort((a, b) => a.order - b.order);
}

export function getProjectsByType(type: "FILM" | "PHOTOGRAPHY"): MockProject[] {
  return mockProjects
    .filter((p) => p.type === type && p.published)
    .sort((a, b) => a.order - b.order);
}

export function getProjectCategories(type: "FILM" | "PHOTOGRAPHY"): string[] {
  const projects = getProjectsByType(type);
  return [...new Set(projects.map((p) => p.category))];
}
