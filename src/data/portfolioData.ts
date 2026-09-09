import { Project, SkillCategory, EducationMilestone, MetricStat } from '../types';
import mafiaUserProvidedImg from '../assets/images/mafia_user_provided.png';
import movieRecommenderUserProvidedImg from '../assets/images/movie_recommender_user_provided.png';

export const PERSONAL_INFO = {
  name: 'SUFYAN SIDDIQUI',
  role: 'FULL-STACK & ML ENGINEER',
  location: 'KARACHI, PK',
  university: 'DHA Suffa University',
  educationTag: '7TH SEMESTER · CGPA 3.7 / 4.0',
  title: 'FULL-STACK SYSTEMS & APPLIED MACHINE LEARNING',
  subtitle: 'Computer Science undergraduate at DHA Suffa University bridging distributed real-time web applications with applied ML recommendation architectures.',
  bio: 'Computer Science undergraduate specializing in full-stack development and applied machine learning. Built a real-time multiplayer web app with WebSocket state sync and a production ML recommendation system serving 5,000+ items. Proficient in Python, Java, C++, and the TypeScript/React/Node.js ecosystem, with strong foundations in OOP, data structures, and algorithms.',
  deploymentPlatforms: ['RAILWAY', 'STREAMLIT'],
  workflowTooling: ['CLAUDE CODE', 'CODEX', 'OPENCODE', 'VS CODE', 'CURSOR'],
  deployedTargets: ['RAILWAY', 'STREAMLIT'],
  email: 'sufyansiddiqui005@gmail.com',
  linkedin: 'https://linkedin.com/in/sufyan-siddiqui005',
  linkedinDisplay: 'in/sufyan-siddiqui005',
  github: 'https://github.com/sufyan005',
  githubDisplay: 'github.com/sufyan005',
  languages: 'ENGLISH (FLUENT) · URDU (NATIVE)',
};

export const CONTACT_CONFIG = {
  // Direct recipient email for direct AJAX dispatch
  directRecipientEmail: PERSONAL_INFO.email,
  // Out-of-the-box zero-setup AJAX direct submission endpoint (FormSubmit AJAX gateway)
  defaultAjaxUrl: `https://formsubmit.co/ajax/${PERSONAL_INFO.email}`,
};

export const METRICS: MetricStat[] = [
  {
    value: '3.7 / 4.0',
    label: 'CGPA · DHA Suffa Uni',
    highlight: true,
  },
  {
    value: '5,000+',
    label: 'Items Indexed (TF-IDF)',
    highlight: false,
  },
  {
    value: '~5x',
    label: 'Speedup (Parquet+NPZ)',
    highlight: true,
  },
  {
    value: '<100ms',
    label: 'WebSocket State Sync',
    highlight: false,
  },
];

export const PROJECTS: Project[] = [
  {
    id: 'mafia-game',
    number: '01',
    category: 'REAL-TIME SYSTEMS',
    title: 'Real-Time Multiplayer Mafia Game',
    technologies: [
      'TypeScript',
      'React',
      'Node.js',
      'Express',
      'Socket.io',
      'Tailwind CSS',
      'Zod',
      'TanStack Query',
    ],
    status: 'LIVE PRODUCTION',
    statusBadge: 'Zero-latency sync · Multi-room lobby architecture',
    highlight: 'Engineered a scalable, full-stack real-time gaming application using React and Node.js with Socket.io event-driven architecture.',
    summary: 'A complete multi-room social deduction game implementing real-time WebSocket state synchronization, role-specific action phases (Mafia kill, Doctor save, Detective investigate, Villager vote), live separated team chats, and deterministic turn timers.',
    bullets: [
      'Engineered a scalable, full-stack real-time gaming application using React and Node.js with Socket.io event-driven architecture.',
      'Synchronized complex application state across distributed clients using robust WebSocket patterns for low-latency game logic, player actions, and live chat.',
      'Component-driven frontend using React, Tailwind CSS, and Radix UI primitives for high accessibility and consistent UX.',
    ],
    metrics: [
      { label: 'Latency', value: '<100ms Sync' },
      { label: 'Max Room Capacity', value: '20 Players' },
      { label: 'Roles Modeled', value: 'Mafia / Doc / Det / Civ' },
    ],
    primaryLink: {
      label: 'DEPLOYED APP',
      url: 'https://mafia-game-production-fb78.up.railway.app/',
      host: 'mafia-game-production-fb78.up.railway.app',
    },
    image: mafiaUserProvidedImg,
    gallery: [
      {
        title: 'Night Phase: Mafia Elimination Chamber',
        description: 'Mafia members coordinate through a dedicated private communication channel and cast synchronized elimination votes before dawn.',
        badge: 'NIGHT PHASE',
      },
      {
        title: 'Day Phase: Town Gathering & Vote',
        description: 'All surviving players assemble in public town chat to present alibis, deliberate accusations, and submit majority elimination votes.',
        badge: 'DAY PHASE',
      },
      {
        title: 'Doctor Emergency Intervention',
        description: 'Doctor receives exclusive prompt each night to choose one player (or self) to immunize against potential Mafia assault.',
        badge: 'DOCTOR SAVE',
      },
      {
        title: 'Detective Background Investigation',
        description: 'Detective probes target player profiles during the night phase to uncover covert allegiances and guide town deliberations.',
        badge: 'DETECTIVE INVESTIGATION',
      },
      {
        title: 'Lobby & Multi-Room Matchmaking',
        description: 'Lobbies enforce minimum 4-player threshold with dynamic room ownership controls, real-time participant badges, and instant readiness checks.',
        badge: 'ROOM MATCHMAKING',
        role: 'Room Owner (Host)',
      },
    ],
    architectureHighlights: [
      {
        title: 'Socket.io Event Gateway',
        description: 'Centralized server orchestrates ROOM_JOIN, ROLE_ASSIGN, NIGHT_ACTION, and VOTE_TALLY events with payload validation via Zod schemas.',
      },
      {
        title: 'Distributed State Reconciliation',
        description: 'Clients receive targeted phase state updates without leaking hidden roles (Mafia identity is masked to Villagers/Detectives in transit).',
      },
      {
        title: 'Resilient Timer & Lifecycle Manager',
        description: 'Server-authoritative timers automatically transition phases when turns expire or when unanimous consensus is registered.',
      },
    ],
  },
  {
    id: 'movie-recommender',
    number: '02',
    category: 'APPLIED MACHINE LEARNING',
    title: 'Movie Recommender System',
    technologies: [
      'Python',
      'Scikit-learn',
      'Streamlit',
      'TMDB API',
      'Parquet',
      'SciPy',
      'Pandas',
      'NumPy',
    ],
    status: 'ML PIPELINE DEPLOYED',
    statusBadge: '5,000+ Movies · 5k Features · ~5x Faster Ingestion',
    highlight: 'Content-based filtering engine over 5,000+ movies using TF-IDF (5k features, bigrams) + cosine similarity, combining genre, cast, director, keywords, and plot into a unified feature vector.',
    summary: 'A high-throughput content-based movie recommendation platform deployed on Streamlit Cloud, indexing 5,000+ titles with high-dimensional feature vectors and low-latency TMDB poster rendering.',
    bullets: [
      'Content-based filtering engine over 5,000+ movies using TF-IDF (5k features, bigrams) + cosine similarity, combining genre, cast, director, keywords, and plot into a unified feature vector.',
      'Achieved ~5x faster load times migrating from Pickle to Apache Parquet + SciPy NPZ, eliminating version-dependency errors across environments.',
      'Implemented parallel poster fetching via ThreadPoolExecutor against TMDB API with adjustable results (5–20) in a responsive Streamlit UI.',
    ],
    metrics: [
      { label: 'Corpus Size', value: '5,000+ Films' },
      { label: 'Vocabulary', value: '5,000 Features' },
      { label: 'Serialization', value: 'Parquet + NPZ' },
    ],
    primaryLink: {
      label: 'DEPLOYED APP',
      url: 'https://movie-recommender-for-all.streamlit.app/',
      host: 'movie-recommender-for-all.streamlit.app',
    },
    image: movieRecommenderUserProvidedImg,
    gallery: [
      {
        title: 'Top Recommendations Matrix',
        description: 'Cosine similarity matrix outputs nearest neighbors with live TMDB ratings: The Dark Knight (8.2/10), The Dark Knight Rises (7.6/10), Batman Begins (7.5/10).',
        badge: 'SIMILARITY MATRIX',
      },
      {
        title: 'Dynamic Result Density Slider',
        description: 'Users seamlessly slide recommendation count between 5 and 20 films with real-time cached inference response.',
        badge: 'STREAMLIT UI CONTROLS',
      },
      {
        title: 'Poster Gallery Ingestion',
        description: 'Multi-threaded poster asset streaming utilizing ThreadPoolExecutor to prevent network bottlenecking.',
        badge: 'PARALLEL I/O',
      },
    ],
    architectureHighlights: [
      {
        title: 'High-Dimensional TF-IDF Vectorizer',
        description: 'Generates unigram and bigram tokens weighted across concatenated metadata tags (genres, cast, director, keywords, synopsis).',
      },
      {
        title: 'Sparse Cosine Distance Matrix',
        description: 'SciPy sparse NPZ matrix drastically reduces memory footprint compared to dense float64 structures while keeping O(1) row lookups.',
      },
      {
        title: 'Parquet Serialization Speedup',
        description: 'Replaced legacy Pickle binaries with Apache Parquet, unlocking 5x compression and deterministic cross-platform schema guarantees.',
      },
    ],
  },
  {
    id: 'hangman-game',
    number: '03',
    category: 'ALGORITHMIC TOOLING',
    title: 'Hangman Game',
    technologies: ['Java', 'Console Architecture', 'Regular Expressions', 'File I/O'],
    status: 'TERMINAL BINARY',
    statusBadge: '500+ Word Corpus · Regex Pattern Matching',
    highlight: 'Interactive terminal word guessing game powered by a 500+ word internal dictionary, deterministic input validation pipelines, regex pattern-matching, and resilient stateful game loop logic.',
    summary: 'A robust terminal utility showcasing strict input sanitation, memory-buffered lexicon streaming, regex pattern-matching for duplicate guess prevention, and visual ASCII art rendering across strike thresholds.',
    bullets: [
      'Interactive terminal word guessing game powered by a 500+ word internal dictionary.',
      'Deterministic input validation pipelines and regex pattern-matching to reject invalid character sequences.',
      'Resilient stateful game loop logic with custom error boundaries and replay state persistence.',
    ],
    metrics: [
      { label: 'Corpus Size', value: '500+ Words' },
      { label: 'Interface', value: 'CLI / Terminal' },
      { label: 'Input Filter', value: 'Regex Validation' },
    ],
    architectureHighlights: [
      {
        title: 'Streamed Dictionary Parser',
        description: 'Loads and indexes classified vocabulary by difficulty tiers with O(1) random key retrieval.',
      },
      {
        title: 'ASCII Scaffold Frame Render Engine',
        description: 'Dynamically draws gallows states corresponding to Remaining Strike counters.',
      },
    ],
  },
  {
    id: 'brick-breaker',
    number: '04',
    category: 'SYSTEMS & GRAPHICS',
    title: 'Brick Breaker Game',
    technologies: ['Java', 'Swing / AWT', '2D Physics Engine', 'OOP'],
    status: 'DESKTOP CLIENT',
    statusBadge: '99% Collision Accuracy · 60 FPS Render Loop',
    highlight: 'GUI-based arcade game with real-time 2D rendering and 99% collision detection accuracy. Features robust game state management with dynamic scoring system, level progression loops, and fine-tuned ball-paddle elasticity vectors.',
    summary: 'A high-precision 2D physics arcade engine constructed in native Java, featuring a custom AABB (Axis-Aligned Bounding Box) collision resolution loop, dynamic angle refraction depending on paddle impact offset, and progressive brick durability tiers.',
    bullets: [
      'GUI-based arcade game with real-time 2D rendering and 99% collision detection accuracy.',
      'Features robust game state management with dynamic scoring system, level progression loops, and fine-tuned ball-paddle elasticity vectors.',
      'Clean object-oriented architecture separating physics tick loops, render canvases, and key listener input handlers.',
    ],
    metrics: [
      { label: 'Collision Accuracy', value: '99%' },
      { label: 'Target Frame Rate', value: '60 FPS Fixed' },
      { label: 'Language Core', value: 'Java / AWT' },
    ],
    architectureHighlights: [
      {
        title: 'AABB Elastic Collision Math',
        description: 'Resolves ball penetration vectors against composite brick matrices with continuous time-stepping to avoid tunneling.',
      },
      {
        title: 'Variable Angle Paddle Deflection',
        description: 'Calculates normalized hit position relative to paddle center to compute exit trajectory angles dynamically.',
      },
    ],
  },
  {
    id: 'bookstore-management',
    number: '05',
    category: 'DATA STORAGE & CRUD',
    title: 'Bookstore Management System',
    technologies: ['C', 'Binary File Handling', 'Primitive Data Structures', 'Pointers'],
    status: 'C EXECUTABLE',
    statusBadge: 'Binary Stream I/O · Low-Memory Footprint',
    highlight: 'Memory-efficient inventory management platform with complete CRUD functionality implemented via C structures, pointer arithmetic, dynamic arrays, and persistent binary/text stream file serialization.',
    summary: 'A low-level inventory management engine built in pure C, using direct pointer arithmetic, custom binary struct serialization (fread/fwrite), and indexed in-memory b-tree structures for record queries.',
    bullets: [
      'Memory-efficient inventory management platform with complete CRUD functionality implemented via C structures.',
      'Pointer arithmetic, dynamic memory allocation (malloc/realloc/free), and strict leak-free lifecycle tracking.',
      'Persistent binary/text stream file serialization supporting fast bulk loads and crash recovery.',
    ],
    metrics: [
      { label: 'I/O Pattern', value: 'Binary Stream' },
      { label: 'Runtime Target', value: 'C99 Native' },
      { label: 'Memory Leak Profile', value: 'Zero Leaks (Valgrind)' },
    ],
    architectureHighlights: [
      {
        title: 'Struct Binary Serialization',
        description: 'Direct byte streaming with fread/fwrite enables instantaneous file persistence without JSON overhead.',
      },
      {
        title: 'Dynamic Heap Allocation Table',
        description: 'Realloc-backed dynamic struct arrays scale automatically with book additions while keeping memory contiguous.',
      },
    ],
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'languages',
    index: '[01]',
    title: 'LANGUAGES',
    subtitle: 'CORE RUNTIMES',
    skills: ['Python', 'Java', 'C++', 'C', 'JavaScript', 'TypeScript'],
  },
  {
    id: 'web-dev',
    index: '[02]',
    title: 'WEB DEVELOPMENT',
    subtitle: 'CLIENT & SERVER ARCHITECTURES',
    skills: [
      'React.js',
      'Node.js',
      'Express',
      'Socket.io',
      'Tailwind CSS',
      'TanStack Query',
      'HTML5/CSS3',
    ],
  },
  {
    id: 'data-ml',
    index: '[03]',
    title: 'DATA & MACHINE LEARNING',
    subtitle: 'INFERENCE & PIPELINES',
    skills: [
      'Scikit-learn',
      'TF-IDF Vectorization',
      'Cosine Similarity',
      'Pandas',
      'NumPy',
      'SciPy',
      'NLTK',
      'Apache Parquet',
    ],
  },
  {
    id: 'databases',
    index: '[04]',
    title: 'DATABASES & STORAGE',
    subtitle: 'RELATIONAL ENGINE',
    skills: ['SQL', 'MySQL', 'Schema Design', 'Query Optimization'],
  },
  {
    id: 'tooling',
    index: '[05]',
    title: 'TOOLS & WORKFLOWS',
    subtitle: 'DEV ENVIRONMENT',
    skills: [
      'Claude Code',
      'Codex',
      'Git & GitHub',
      'VS Code',
      'Streamlit Cloud',
    ],
  },
  {
    id: 'foundations',
    index: '[06]',
    title: 'CORE FOUNDATIONS',
    subtitle: 'THEORETICAL',
    skills: [
      'OOP Paradigm',
      'Data Structures',
      'Algorithms',
      'System Design',
      'Agile / SDLC',
    ],
  },
];

export const EDUCATION_DATA: EducationMilestone[] = [
  {
    id: 'bs-cs',
    tag: 'UNDERGRADUATE DEGREE · IN PROGRESS',
    period: '2023 – 2027 (EXP)',
    degree: 'Bachelor of Science in Computer Science',
    institution: 'DHA Suffa University — Karachi, Pakistan',
    statusLabel: 'CURRENT STATUS',
    statusValue: '7TH SEMESTER · CGPA 3.7 / 4.00',
    isHighValue: true,
  },
  {
    id: 'intermediate',
    tag: 'HIGHER SECONDARY CERTIFICATE',
    period: '2023',
    degree: 'Intermediate in Pre-Engineering',
    institution: 'PECHS Education Foundation Science College — Karachi',
    statusLabel: 'FOCUS',
    statusValue: 'MATHEMATICS & PHYSICS FOUNDATIONS',
  },
  {
    id: 'matriculation',
    tag: 'SECONDARY SCHOOL CERTIFICATE',
    period: '2021',
    degree: 'Matriculation in Pre-Engineering',
    institution: 'Al Eman Education System — Karachi',
    statusLabel: 'ACADEMIC RECORD',
    statusValue: 'GRADE A+ · 85.64%',
    isHighValue: true,
  },
];
