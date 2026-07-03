export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  event: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
}

export interface Award {
  id: string;
  label: string;
}

export interface Stat {
  value: string;
  label: string;
}

export const mockStats: Stat[] = [
  { value: "500+", label: "Weddings Filmed" },
  { value: "12+", label: "Years of Craft" },
  { value: "18", label: "Countries" },
  { value: "40+", label: "Industry Awards" },
];

export const mockAwards: Award[] = [
  { id: "1", label: "Wedding Filmmaker of the Year — WeddingSutra" },
  { id: "2", label: "Best Cinematic Film — ISPAs" },
  { id: "3", label: "Editorial Photography Excellence — Harper's Bride" },
  { id: "4", label: "Documentary Wedding Film — Fearless Awards" },
  { id: "5", label: "Couple's Choice — WeddingWire" },
];

export const mockServices: Service[] = [
  {
    id: "1",
    title: "Wedding Films",
    description:
      "Cinematic storytelling that captures the emotion, energy, and intimacy of your celebration — from the first look to the last dance.",
  },
  {
    id: "2",
    title: "Photography",
    description:
      "Editorial wedding photography with an artistic eye. Timeless frames crafted in natural light, designed to stand the test of time.",
  },
  {
    id: "3",
    title: "Engagement Films",
    description:
      "Intimate pre-wedding films that celebrate your love story before the big day — perfect for sharing with family and friends.",
  },
  {
    id: "4",
    title: "Destination Weddings",
    description:
      "From Udaipur palaces to Amalfi terraces, we travel worldwide to document celebrations in the world's most breathtaking settings.",
  },
];

export const mockTestimonials: Testimonial[] = [
  {
    id: "1",
    quote:
      "Shubham and his team didn't just film our wedding — they understood our story. Every frame feels like a memory we can relive forever.",
    author: "Reva & Zach",
    event: "Udaipur Wedding",
  },
  {
    id: "2",
    quote:
      "The film exceeded everything we imagined. Our families in Italy and India both cried watching it. Pure magic.",
    author: "Elena & Marco",
    event: "Amalfi Coast",
  },
  {
    id: "3",
    quote:
      "Editorial, emotional, and impossibly beautiful. Shubham Video Graphics is in a league of their own.",
    author: "Priya & Arjun",
    event: "Mumbai Reception",
  },
];

export const mockPhilosophy = [
  "We believe every wedding is a unique narrative waiting to unfold. Our approach blends documentary authenticity with cinematic artistry — capturing the moments you planned and the ones you never saw coming.",
  "From the first consultation to the final film delivery, we prioritize connection, trust, and creative collaboration. Your story deserves nothing less than our full attention.",
  "We celebrate the wild ones — the rule breakers, the travellers, the new-age modern couple who are not afraid to experiment. The ultimate goal is to justify the beauty of the moment.",
];

export const mockProcess = [
  { step: "01", title: "Discovery", text: "We learn your story, your vision, and the feeling you want to carry forever." },
  { step: "02", title: "Planning", text: "Timeline mapping, location scouting, and creative direction tailored to your day." },
  { step: "03", title: "The Day", text: "Unobtrusive coverage that lets you be present while we capture every detail." },
  { step: "04", title: "Delivery", text: "A handcrafted film and gallery delivered with care, ready to share for generations." },
];
