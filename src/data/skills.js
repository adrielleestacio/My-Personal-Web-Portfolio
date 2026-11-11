// Each skill carries a Simple Icons slug + brand colour, rendered from
// cdn.simpleicons.org. Very dark brand marks use a neutral grey so they stay
// visible in both light and dark themes. Skills with no `slug` fall back to
// their group's icon.
export const skillGroups = [
  {
    id: "languages",
    title: "Languages",
    icon: "code",
    skills: [
      { name: "JavaScript", slug: "javascript", color: "F7DF1E" },
      { name: "TypeScript", slug: "typescript", color: "3178C6" },
      { name: "Python", slug: "python", color: "3776AB" },
      { name: "Java", slug: "openjdk", color: "888888" },
      { name: "SQL" },
      { name: "HTML", slug: "html5", color: "E34F26" },
      { name: "CSS", slug: "css", color: "1572B6" },
    ],
  },
  {
    id: "frontend",
    title: "Front-End & Styling",
    icon: "layout",
    skills: [
      { name: "React", slug: "react", color: "61DAFB" },
      { name: "Next.js", slug: "nextdotjs", color: "888888" },
      { name: "Tailwind CSS", slug: "tailwindcss", color: "06B6D4" },
      { name: "Bootstrap", slug: "bootstrap", color: "7952B3" },
      { name: "Material UI", slug: "mui", color: "007FFF" },
      { name: "shadcn/ui", slug: "shadcnui", color: "888888" },
      { name: "Sass", slug: "sass", color: "CC6699" },
    ],
  },
  {
    id: "backend",
    title: "Back-End",
    icon: "server",
    skills: [
      { name: "Node.js", slug: "nodedotjs", color: "5FA04E" },
      { name: "Express", slug: "express", color: "888888" },
      { name: "NestJS", slug: "nestjs", color: "E0234E" },
      { name: "Django", slug: "django", color: "44B78B" },
      { name: "Flask", slug: "flask", color: "888888" },
      { name: "FastAPI", slug: "fastapi", color: "009688" },
      { name: "Spring Boot", slug: "springboot", color: "6DB33F" },
    ],
  },
  {
    id: "databases",
    title: "Databases",
    icon: "database",
    skills: [
      { name: "MySQL", slug: "mysql", color: "4479A1" },
      { name: "PostgreSQL", slug: "postgresql", color: "4169E1" },
      { name: "Microsoft SQL Server" },
      { name: "MongoDB", slug: "mongodb", color: "47A248" },
    ],
  },
  {
    id: "devops",
    title: "Tools & DevOps",
    icon: "settings",
    skills: [
      { name: "Git", slug: "git", color: "F05032" },
      { name: "GitHub", slug: "github", color: "888888" },
      { name: "GitHub Actions", slug: "githubactions", color: "2088FF" },
      { name: "Docker", slug: "docker", color: "2496ED" },
      // Simple Icons has no VS Code / Microsoft Office marks (trademark),
      // so these fall back to their group icon.
      { name: "VS Code" },
      { name: "Android Studio", slug: "androidstudio", color: "3DDC84" },
      { name: "ESLint", slug: "eslint", color: "4B32C3" },
      { name: "XAMPP", slug: "xampp", color: "FB7A24" },
    ],
  },
  {
    id: "other",
    title: "Other",
    icon: "sparkles",
    skills: [
      { name: "Progressive Web Apps", slug: "pwa", color: "5A0FC8" },
      { name: "System Testing" },
      { name: "Technical Writing" },
      { name: "Blender", slug: "blender", color: "E87D0D" },
      { name: "Microsoft Office" },
    ],
  },
];

// Soft skills use Lucide icons (no brand marks exist for these).
export const softSkills = [
  { name: "Communication", icon: "message" },
  { name: "Active Listening", icon: "ear" },
  { name: "Teamwork", icon: "users" },
  { name: "Adaptability", icon: "shuffle" },
  { name: "Time Management", icon: "clock" },
  { name: "Interpersonal Skills", icon: "handshake" },
];
