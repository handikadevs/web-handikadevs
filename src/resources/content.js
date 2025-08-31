const person = {
  firstName: "Handika",
  lastName: "Kristofan",
  get name() {
    return `${this.firstName} ${this.lastName}`
  },
  role: "Frontend Developer and Designer",
  avatar: "/images/avatar.png",
  email: "handikadevs@gmail.com",
  location: "Asia/Jakarta",
  languages: ["English", "Bahasa"],
}

const newsletter = {
  display: true,
  title: <>Subscribe to {person.firstName}'s Newsletter</>,
  description: (
    <>
      I occasionally write about design, technology, and share thoughts on the
      intersection of creativity and engineering.
    </>
  ),
}

const social = [
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/handikadevs",
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/handikadevs/",
  },
  {
    name: "Threads",
    icon: "threads",
    link: "https://www.threads.com/@handikabrilian",
  },
  {
    name: "Email",
    icon: "email",
    link: `mailto:${person.email}`,
  },
]

const home = {
  path: "/",
  image: "/images/og/home.jpg",
  label: "Home",
  title: `Hello, I'm ${person.name}`,
  description: `Portfolio website showcasing my project as a ${person.role}`,
  headline: <>Building bridges between design and code</>,
  featured: {
    display: true,
    title: (
      <>
        Recent project: <strong className="ml-4">Coster V3</strong>
      </>
    ),
    href: "/project/coster-v3",
  },
  subline: (
    <>
      I'm {person.name}, a <strong>{person.role}</strong>, <br /> My journey in
      technology has always been driven by curiosity and the desire to create
      solutions.
    </>
  ),
}

const about = {
  path: "/about",
  label: "About",
  title: `About – ${person.name}`,
  description: `Meet ${person.name}, ${person.role} from ${person.location}`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: true,
    link: "https://cal.com",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        Product Engineering professional with experience across UI/UX design,
        Fullstack development, and Product Innovation. Proven track record in
        leading design to development workflows for Coster V3 Omnichannel at PT.
        Informasi Teknologi Indonesia Tbk (Jatis Mobile), now used by 500+
        enterprise businesses with advanced omnichannel features and showcased
        in the company’s IPO ( JATI ) Prospectus. Experienced in Graphic design
        (logos, branding, assets) and passionate about creating seamless user
        experiences. Adept at collaborating with cross functional teams,
        mentoring others, and building digital solutions that integrate design
        and engineering for business impact.
      </>
    ),
  },
  project: {
    display: true,
    title: "Project Experience",
    experiences: [
      {
        company: "PT. Griya Karya Digital (Educational Program)",
        initial: "Griya Karya",
        timeframe: "2021 - Present",
        techstacks: [
          "founder",
          "speaker",
          "trainer",
          "community-builder",
          "social projects",
          "designer",
          "fullstack developer",
          "innovation",
          "skill development",
          "entrepreneur",
        ],
        role: "Founder & Trainer - Community Initiative",
        achievements: [
          <>
            Trained <strong>500+ learners</strong> in Database Design, UI/UX,
            and Product Thinking across{" "}
            <strong>
              Indonesian, Saudi Arabia, Hong Kong, and Chinese Taipei
            </strong>
          </>,
          <>
            Developed and delivered training programs for{" "}
            <strong>high schools and organizations</strong> on Product
            Management
          </>,
          <>
            Built digital solutions : <br />
            <ul>
              <li>
                <strong>SIDAPA</strong> - Patient Registration & Booking System
                (RS DKT Tk. IV Kediri)
              </li>
              <li>
                <strong>Undang App</strong> - RSVP platform integrated with
                WhatsApp, FB Messenger, Instagram DM, and Telegram
              </li>
              <li>
                <strong>Radiant XO & Tennis Legends</strong> - AI-powered
                multiplayer games
              </li>
            </ul>
          </>,
        ],
        impact: (
          <>
            Empowered cross-border learners & delivered{" "}
            <strong>real-world solutions</strong> for healthcare, events, and
            entertainment
          </>
        ),
        images: [],
      },
      {
        company: "PT. Informasi Teknologi Indonesia Tbk",
        initial: "Jatis Mobile",
        timeframe: "2022 - Present",
        role: "Product Engineer - Omnichannel",
        techstacks: [
          "react",
          "vite",
          "react router",
          "material-ui",
          "react query",
          "git",
          "zustand",
          "redux toolkit",
          "node",
          "express",
          "redis",
          "nginx",
          "docker",
        ],
        achievements: [
          <>
            Leading as a <strong>Frontend Developer</strong> for{" "}
            <strong>Coster V3 Omnichannel</strong> a SaaS platform, Integrating{" "}
            <strong>10+ communication channels</strong> (WhatsApp, Instagram,
            Facebook, Telegram, YouTube, Mail, SMS, WebChat, RCS)
          </>,
          <>
            Developed{" "}
            <strong>
              message or broadcast mockup templates, campaigns, chatbot flows
              and user flows
            </strong>
            , Improving user preview experience while using Coster Dashboard
          </>,
          <>
            Enhanced scalability through{" "}
            <strong>Redux Toolkit, and microservices architecture</strong>,
            Improving systems feature, performance and reliability
          </>,
        ],
        impact: (
          <>
            Contributed to{" "}
            <strong>scaling Coster V3 to 500+ enterprise businesses</strong>{" "}
            with advanced omnichannel features and showcased in the company’s{" "}
            <strong>IPO ( JATI ) Prospectus</strong>
          </>
        ),
        images: [],
      },
      {
        company: "",
        initial: "Jatis Mobile",
        timeframe: "2021 - 2022",
        role: "Web Designer - Research & New Development",
        techstacks: [
          "adobe xd",
          "figma",
          "illustrator",
          "inkscape",
          "react",
          "zustand",
          "vite",
          "react query",
          "react router",
          "express",
          "node",
          "typescript",
          "redis",
        ],
        achievements: [
          <>
            <strong>
              Brandstorm, Research and Designed from (zero) the Coster V3 brand
              identity
            </strong>
            . Including brand logo, apps icon, design system, and UI/UX layouts
            for the web and mobile apps.
          </>,
          <>
            Transitioned{" "}
            <strong>from design to frontend development from (zero)</strong>{" "}
            using (React Vite, built proxy service with Express, integrated
            React Query & Zustand for scalable state management, and Typescript
            as core technology).{" "}
            <strong>Bridging the gap between design and engineering.</strong>
          </>,
          <>
            Collaborated with backend developers to integrate{" "}
            <strong>RESTful APIs</strong>, ensuring seamless data flow between
            frontend and backend systems.
          </>,
        ],
        impact: (
          <>
            Laid the <strong>foundation for Coster V3</strong>, making it a
            robust and scalable platform for{" "}
            <strong>omnichannel communications</strong>
          </>
        ),
        images: [],
      },
      {
        company: "CV. Riyal Saputra Group",
        initial: "Modern Shoes",
        timeframe: "2021",
        role: "Fullstack Developer",
        techstacks: [
          "figma",
          "inkscape",
          "fullstack",
          "laravel",
          "sweetalert2",
          "jquery",
          "javascript",
          "bootstrap",
          "php",
          "node",
          "mysql",
          "geolocation",
          "linux",
        ],
        achievements: [
          <>
            Built an{" "}
            <strong>Modern Shoes in-house e-commerce marketplace</strong> for
            footwear retail expansion
          </>,
          <>
            Brandstorm an integrating{" "}
            <strong>
              Inventory management and Tracking distribution system with
              RajaOngkir API
            </strong>
          </>,
          <>
            Developed <strong>SIAP Kerja</strong>, a centralized HR attendance
            system with <strong>geolocation & camera-based</strong> check-in,
            used across multiple branches on Joemen Groups
          </>,
          <>
            Acted as <strong>IT support</strong> during nationwide sales events,
            ensuring seamless operations
          </>,
        ],
        impact: (
          <>
            <strong>
              Centralized HR operations and introduced geolocation &
              camera-based
            </strong>{" "}
            compliance for <strong>100+ employees</strong>.
          </>
        ),
        images: [],
      },
      {
        company: "PT. Sekawan Media Informatika",
        initial: "Sekawan Media",
        timeframe: "2020 - 2021",
        role: "Designer, Data Entry and SQA - SIPAS Team Internship",
        techstacks: [
          "figma",
          "inkscape",
          "fullstack",
          "codeigniter",
          "jquery",
          "mysql",
          "bootstrap",
          "javascript",
          "php",
          "node",
          "quality analyst",
          "data entry",
          "linux",
        ],
        achievements: [
          <>
            Designed logos, icons, and UI assets that{" "}
            <strong>improved client product branding</strong>
          </>,
          <>
            Supported the development of{" "}
            <strong>SIPAS (Archive Management System)</strong> through data
            processing & QA testing, ensuring system reliability for real client
            use
          </>,
        ],
        impact: (
          <>
            Helped accelerate feature delivery and ensured{" "}
            <strong>product quality</strong>, giving clients a more{" "}
            <strong>stable and user-friendly archive management system</strong>
          </>
        ),
        images: [],
      },
    ],
  },
  studies: {
    display: true,
    title: "Studies",
    institutions: [
      {
        name: "Asia Cyber University - Bachelor Degree",
        description: <>Studied Information Systems</>,
        timeframe: "2022 - Present",
        experiences: [
          <>
            Developed Financial Bot Assistant (C++, Desktop) to automate
            financial reporting process and improve data accuracy
          </>,
          <>Speaker: Database design fundamental</>,
        ],
      },
      {
        name: "Polytechnic of Malang - Diploma Degree",
        description: <>Studied Informatics Engineering</>,
        timeframe: "2020 - 2021",
        experiences: [
          <>Developed SIAP Sekolah, a centralized school attendance system</>,
        ],
      },
      {
        name: "Vocational High School of Dlanggu Mojokerto",
        description: <>Studied Cloud computing and IoT</>,
        timeframe: "2017 - 2020",
        experiences: [
          <>Engineered Smart Lab Management System (Arduino, Google Home)</>,
          <>Trainer: Axioo Mengajar for Arduino IoT</>,
          <>Lab Assistant: IoT and Cloud Computing</>,
        ],
      },
    ],
  },
  technical: {
    display: true,
    title: "Technical skills",
    subtitle:
      "“Blending design and engineering — specializing in React, TypeScript, and modern frontend architecture, supported by backend & DevOps experience.”",
    skills: [
      {
        title: "Design, Wireframing and Prototyping",
        description: <>Figma | Adobe XD | Illustrator | Inkscape | Canva</>,
        icons: ["figma", "xd", "illustrator", "inkscape", "canva"],
      },
      {
        title: "Frontend Development",
        description: (
          <>React (Expert) | Next JS | Typescript | Vue | Tailwind</>
        ),
        icons: [
          "react",
          "next",
          "vue",
          "tailwind",
          "html",
          "css",
          "javascript",
          "typescript",
        ],
      },
      {
        title: "Backend Development",
        description: <>Node | Express | Laravel | CodeIgniter (Legacy)</>,
        icons: ["node", "express", "laravel", "codeigniter", "php"],
      },
      {
        title: "Database",
        description: <>MySQL | PostgreSQL | Prisma ORM</>,
        icons: ["mysql", "postgresql", "prisma"],
      },
      {
        title: "DevOps and Tools",
        description: <>Docker | Redis | Git | GitHub | Nginx | Linux</>,
        icons: ["docker", "redis", "git", "github", "nginx", "linux"],
      },
      {
        title: "Additional Skills",
        description: (
          <>
            Testing & QA: Postman | QA Testing <br />
            Hardware & IoT: Arduino (Prototyping) <br />
            Design Approach: Product Design Thinking
          </>
        ),
        icons: ["postman", "arduino", "qa"],
      },
    ],
  },
}

const blog = {
  path: "/blog",
  label: "Blog",
  title: "Writing about design and tech...",
  description: `Read what ${person.name} has been up to recently`,
  // Create new blog blogs by adding a new .mdx file to app/blog/blogs
  // All blogs will be listed on the /blog route
}

const project = {
  path: "/project",
  label: "Project",
  title: `Projects – ${person.name}`,
  description: `Design and dev projects by ${person.name}`,
  // Create new project pages by adding a new .mdx file to app/blog/blogs
  // All projects will be listed on the /home and /project routes
}

const gallery = {
  path: "/gallery",
  label: "Gallery",
  title: `Photo gallery – ${person.name}`,
  description: `A photo collection by ${person.name}`,
  // Images by https://lorant.one
  // These are placeholder images, replace with your own
  images: [
    {
      src: "/images/gallery/horizontal-1.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/horizontal-2.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/horizontal-3.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/horizontal-4.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-1.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/vertical-2.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/vertical-3.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/vertical-4.jpg",
      alt: "image",
      orientation: "vertical",
    },
  ],
}

export { person, social, newsletter, home, about, blog, project, gallery }
