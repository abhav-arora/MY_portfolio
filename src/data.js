export const projects = [
  {
    name: "Video RAG Assistant",
    type: "AI / MACHINE LEARNING",
    number: "01",
    category: "AI & ML",
    visual: "rag",
    description:
      "Turning videos and playlists into a conversation. A retrieval-augmented Q&A system with semantic search and follow-up questions.",
    tags: ["Python", "Gemini", "ChromaDB"],
    url: "https://github.com/abhav-arora/video-RAG-app",
  },
  {
    name: "Connect the Dots",
    type: "SYSTEMS / INFRASTRUCTURE",
    number: "02",
    category: "Systems",
    visual: "infra",
    description:
      "Making independent services work together. Containerized infrastructure with reverse proxies, load balancing, caching, and storage.",
    tags: ["Docker", "Traefik", "Redis"],
    url: "https://github.com/abhav-arora/connect-the-dots",
  },
  {
    name: "CampusConnect",
    type: "FULL-STACK / CAMPUS LIFE",
    number: "03",
    category: "Web",
    visual: "campus",
    description:
      "A more connected campus: live bus tracking, a student marketplace, and everyday utilities brought into one place.",
    tags: ["React", "Node.js", "WebSockets"],
    url: "https://github.com/Ayushman404/Campus_Connect",
  },
  {
    name: "SpikeDistill-RUL",
    type: "RESEARCH / MACHINE LEARNING",
    number: "04",
    category: "AI & ML",
    visual: "spike",
    description:
      "Teaching a brain-inspired spiking neural network to predict engine failure. An exploration of remaining useful life prediction.",
    tags: ["Machine learning", "SNN", "Research"],
    url: "https://github.com/abhav-arora/ML3103-project",
  },
];
export const milestones = [
  {
    label: "01 / FIRST PLACE",
    title: "Connect the Dots",
    detail: "Infrastructure Integration Challenge · IIT Patna & Unstop",
    description:
      "Architecture, reverse proxying, load balancing, and service-to-service communication.",
    url: "https://unstop.com/hackathons/connect-the-dots-the-infrastructure-integration-challenge-indian-institute-of-technology-iit-patna-1659308/case-submissions/783669",
  },
  {
    label: "02 / SECOND PLACE",
    title: "Jilo Hackathon",
    detail: "AI Hospital Data Management & FHIR Generator",
    description:
      "An AI-backed system for hospital data and structured healthcare documents.",
  },
  {
    label: "03 / FINALIST",
    title: "DroidRun AI Device Controller",
    detail: "Google Developer Groups · IIT Patna",
    description:
      "Android device agents and automated workflows with DroidRun and MobileRun AI.",
  },
];
export const posts = Object.values(
  import.meta.glob("../content/posts/*.json", {
    eager: true,
    import: "default",
  }),
).sort((a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug));
