// ─────────────────────────────────────────────────────────────
// HOW TO ADD A NEW PROJECT (built to scale to 15+ projects):
//   1. Drop a screenshot into  public/projects/  (1280×800 works best)
//   2. Copy one object below, fill it in, and add it to the array.
//   3. category must be one of: 'ai' | 'immersive' | 'product'
//      (or add a new category in the CATEGORIES list below)
//
// GUIDED TOUR VIDEOS (the /projects page):
//   - Drop your 8-sec explainer as  public/videos/<slug>.mp4
//     (optional: <slug>.webm as a fallback + <slug>-poster.jpg)
//   - Set  video / videoPoster  below.
//   - contentSide: which side of the screen the TEXT overlays on the
//     full-screen video ('left' or 'right'). Pick the side where the
//     video has empty background (opposite your character). Projects
//     without a video show their poster full-screen instead.
// ─────────────────────────────────────────────────────────────

export const CATEGORIES = [
  { id: 'all', label: 'All Projects' },
  { id: 'ai', label: 'AI & GenAI' },
  { id: 'immersive', label: 'Immersive Web' },
  { id: 'product', label: 'Product Sites' },
]

export const projects = [
  {
    title: 'TriageBot',
    tagline: 'Multi-agent support ticket automation',
    description:
      'Three-agent AI pipeline — classifier, knowledge-base retriever and reply drafter — with every agent step persisted for full transparency and human-in-the-loop approval before any reply is sent.',
    tech: ['.NET 8 Web API', 'React + RTK Query', 'MongoDB', 'LLM Agents'],
    category: 'ai',
    featured: true,
    live: 'https://triage-ui-4nb7.vercel.app/',
    github: null, // e.g. 'https://github.com/yourusername/triagebot'
    image: '/projects/triagebot.jpg',
    video: '/videos/triagebot.mp4',
    videoPoster: '/videos/triagebot-poster.jpg',
    contentSide: 'left',
  },
  {
    title: 'QueryPilot',
    tagline: 'Ask your database anything',
    description:
      'Converts plain-English questions into validated MongoDB aggregation pipelines via LLM structured outputs — executed read-only behind a security guard that treats AI output as untrusted input.',
    tech: ['.NET 8 Web API', 'React + Redux', 'MongoDB', 'Structured Outputs'],
    category: 'ai',
    featured: false,
    live: 'https://query-pilot-five.vercel.app/',
    github: null,
    image: '/projects/querypilot.jpg',
    video: '/videos/querypilot.mp4',
    videoPoster: '/videos/querypilot-poster.jpg',
    contentSide: 'right',
  },
  {
    title: 'RAG Document Chatbot',
    tagline: 'Chat with your documents',
    description:
      'Full-stack RAG chatbot — upload PDFs and ask questions answered strictly from their content, with source citations and similarity scores. Complete pipeline built in .NET: chunking, embeddings, vector search.',
    tech: ['.NET 8 Web API', 'React', 'Llama 3.3 (Groq)', 'RAG + Embeddings'],
    category: 'ai',
    featured: false,
    live: 'https://doc-chat-bot-five.vercel.app/',
    github: null,
    image: '/projects/docchat.jpg',
    video: '/videos/docchat.mp4',
    videoPoster: '/videos/docchat-poster.jpg',
    contentSide: 'left',
  },
  {
    title: 'SPACE Z',
    tagline: 'Beyond Earth — a cinematic journey',
    description:
      'Interactive scroll-based narrative documenting a deep-space transit mission across a gas giant’s rings — six scenes of ships, technology and crew, all driven by your scroll.',
    tech: ['React', 'Canvas / WebGL', 'Framer Motion', 'Storytelling UI'],
    category: 'immersive',
    featured: false,
    live: 'https://space-z-two.vercel.app/',
    github: null,
    image: '/projects/spacez.jpg',
    video: '/videos/spacez.mp4',
    videoPoster: '/videos/spacez-poster.jpg',
    contentSide: 'left',
  },
  {
    title: 'SOLARIS',
    tagline: 'A voyage by light',
    description:
      'Scroll-driven cinematic WebGL film in five acts, following a solar-sail spacecraft from awakening to a stellar slingshot. No engine, no fuel — only the pressure of arriving light.',
    tech: ['React', 'WebGL / Three.js', 'Scroll Animation', 'GLSL'],
    category: 'immersive',
    featured: false,
    live: 'https://solaris-rosy-seven.vercel.app/',
    github: null,
    image: '/projects/solaris.jpg',
    video: null, // explainer coming soon — drop /videos/solaris.mp4 and set it here
    videoPoster: null,
    contentSide: 'left',
  },
  {
    title: 'VANTA',
    tagline: 'The 1,200 hp electric hypercar',
    description:
      'Luxury landing page and configurator for a concept electric hypercar — dark cinematic design, paint configurator with three finishes, and a reservation flow.',
    tech: ['React', 'Tailwind CSS', 'Framer Motion', 'Configurator UX'],
    category: 'product',
    featured: false,
    live: 'https://vantacar.vercel.app/',
    github: null,
    image: '/projects/vanta.jpg',
    video: null,
    videoPoster: null,
    contentSide: 'right',
  },
  {
    title: 'AURUM & NOIR',
    tagline: 'Eclipse — the tourbillon chronograph',
    description:
      'High-end product page for a Geneva watchmaker’s limited-edition tourbillon — editorial typography, macro detail sections and a private-application waitlist flow.',
    tech: ['React', 'Tailwind CSS', 'Framer Motion', 'Editorial Design'],
    category: 'product',
    featured: false,
    live: 'https://aurumnoir-mu.vercel.app/',
    github: null,
    image: '/projects/aurumnoir.jpg',
    video: null,
    videoPoster: null,
    contentSide: 'left',
  },
]
