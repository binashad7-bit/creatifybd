import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DIST_DIR = path.resolve(__dirname, '../dist');
const BASE_TEMPLATE_PATH = path.join(DIST_DIR, 'index.html');

const routes = [
  {
    path: 'services',
    title: 'Services & Pricing Packages | CreatifyBD',
    description: 'Explore our fixed-price gig-style services. Social Media Management, Graphic Design, Video Editing, and Website Development.',
    canonical: 'https://creatifybd.com/services'
  },
  {
    path: 'about',
    title: 'About Us & Dhaka Production Advantage | CreatifyBD',
    description: 'Learn how CreatifyBD combines the trust of an international creative agency with Bangladesh production-office cost savings.',
    canonical: 'https://creatifybd.com/about'
  },
  {
    path: 'gigs',
    title: 'Browse Gigs & Creative Packages | CreatifyBD',
    description: 'Purchase premium creative services on-demand. Browse our logo design, video editing, social media management, and web development gigs.',
    canonical: 'https://creatifybd.com/gigs'
  },
  {
    path: 'portfolio',
    title: 'Our Work & Design Showcase | CreatifyBD',
    description: 'View our portfolio of premium designs, branding, and video editing work delivered to clients in USA, Canada, and Australia.',
    canonical: 'https://creatifybd.com/portfolio'
  },
  {
    path: 'reviews',
    title: 'Client Reviews & Testimonials | CreatifyBD',
    description: 'Read what small businesses and creators in USA, Canada, and Australia say about CreatifyBD services and deliverables.',
    canonical: 'https://creatifybd.com/reviews'
  },
  {
    path: 'pricing',
    title: 'Affordable Agency Pricing Plans | CreatifyBD',
    description: 'Transparent, contract-free, pay-as-you-go pricing for all services. Find the perfect plan for your business.',
    canonical: 'https://creatifybd.com/pricing'
  },
  {
    path: 'contact',
    title: 'Get in Touch & Request a Quote | CreatifyBD',
    description: 'Contact our creative strategy team for custom inquiries, project consultation, or order support.',
    canonical: 'https://creatifybd.com/contact'
  },
  {
    path: 'process',
    title: 'How We Work - Systematic Agency Process | CreatifyBD',
    description: 'Discover our simple 4-step creative blueprint: intake, design draft, revision, and finalized delivery.',
    canonical: 'https://creatifybd.com/process'
  }
];

function prerender() {
  if (!fs.existsSync(BASE_TEMPLATE_PATH)) {
    console.error('Error: dist/index.html template not found. Run "npm run build" first.');
    process.exit(1);
  }

  const baseHtml = fs.readFileSync(BASE_TEMPLATE_PATH, 'utf-8');

  routes.forEach(route => {
    const routeDir = path.join(DIST_DIR, route.path);
    if (!fs.existsSync(routeDir)) {
      fs.mkdirSync(routeDir, { recursive: true });
    }

    // Replace SEO elements
    let renderedHtml = baseHtml;

    // Replace Title
    renderedHtml = renderedHtml.replace(
      /<title>.*?<\/title>/gi,
      `<title>${route.title}</title>`
    );
    renderedHtml = renderedHtml.replace(
      /<meta name="title" content=".*?"/gi,
      `<meta name="title" content="${route.title}"`
    );
    renderedHtml = renderedHtml.replace(
      /<meta property="og:title" content=".*?"/gi,
      `<meta property="og:title" content="${route.title}"`
    );
    renderedHtml = renderedHtml.replace(
      /<meta property="twitter:title" content=".*?"/gi,
      `<meta property="twitter:title" content="${route.title}"`
    );

    // Replace Description
    renderedHtml = renderedHtml.replace(
      /<meta name="description" content=".*?"/gi,
      `<meta name="description" content="${route.description}"`
    );
    renderedHtml = renderedHtml.replace(
      /<meta property="og:description" content=".*?"/gi,
      `<meta property="og:description" content="${route.description}"`
    );
    renderedHtml = renderedHtml.replace(
      /<meta property="twitter:description" content=".*?"/gi,
      `<meta property="twitter:description" content="${route.description}"`
    );

    // Replace Canonical Link & OG URL
    renderedHtml = renderedHtml.replace(
      /<link rel="canonical" href=".*?"/gi,
      `<link rel="canonical" href="${route.canonical}"`
    );
    renderedHtml = renderedHtml.replace(
      /<meta property="og:url" content=".*?"/gi,
      `<meta property="og:url" content="${route.canonical}"`
    );
    renderedHtml = renderedHtml.replace(
      /<meta property="twitter:url" content=".*?"/gi,
      `<meta property="twitter:url" content="${route.canonical}"`
    );

    fs.writeFileSync(path.join(routeDir, 'index.html'), renderedHtml);
    console.log(`Prerendered: /${route.path} -> dist/${route.path}/index.html`);
  });

  console.log('Prerendering completed successfully!');
}

prerender();
