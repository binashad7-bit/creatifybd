// CreatifyBD Site Configuration
// Update these values as needed for your business

export const siteConfig = {
  // Business Information
  businessName: 'CreatifyBD',
  websiteUrl: 'https://creatifybd.com',
  tagline: 'Creative services for small businesses',
  email: 'hello@creatifybd.com',
  phone: '+880 1951 676600',
  whatsappNumber: '+8801951676600',
  address: 'Dhaka, Bangladesh',

  targetMarkets: ['USA', 'Canada', 'Australia'],
  
  // Social Media Links
  socialLinks: {
    facebook: 'https://www.facebook.com/creatifybd',
    instagram: 'https://www.instagram.com/creatifybd',
    linkedin: 'https://www.linkedin.com/company/creatifybd',
    behance: '',
    youtube: ''
  },
  
  // Payment Information - Payoneer
  payoneer: {
    accountName: 'CreatifyBD / Owner Name',
    email: 'payoneer-email@example.com',
    currency: 'USD',
    note: 'Please include your name or project name in the payment note if possible.'
  },
  
  // Payment Information - DBBL Bank Transfer
  dbbl: {
    bankName: 'Dutch-Bangla Bank Limited',
    accountName: 'Account Name',
    accountNumber: 'Account Number',
    branch: 'Branch Name',
    routingNumber: 'Routing Number',
    paymentReference: 'Client Name / Project Name'
  },
  
  // Payment Instructions
  paymentInstructions: {
    verificationTime: 'Usually within 24 hours after submitting valid payment proof.',
    proofRequirements: 'Transaction ID, amount, payment date, and screenshot or receipt.',
    supportEmail: 'hello@creatifybd.com'
  },
  
  // Admin Information
  admin: {
    allowedEmails: ['binashad7@gmail.com']
  },
  adminEmail: 'binashad7@gmail.com',
  
  // SEO Configuration
  seo: {
    defaultTitle: 'CreatifyBD | Digital Marketing, Branding & Creative Agency in Dhaka',
    defaultDescription: 'CreatifyBD helps brands grow through digital marketing, branding, social media management, web development, photography, videography and creative content production.',
    defaultKeywords: 'digital marketing agency dhaka, creative agency bangladesh, web design dhaka, branding agency bangladesh, social media marketing, content production, seo services',
    canonicalUrl: 'https://creatifybd.com'
  },
  
  // WhatsApp Message Template
  whatsappMessage: 'Hello CreatifyBD, I want to discuss a project.',
  
  // Services List (for dropdowns and forms)
  services: [
    'Social Media Management',
    'Graphic Design',
    'Video Editing',
    'Website Design',
    'Other'
  ],
  
  // Budget Ranges (for contact form)
  budgetRanges: [
    { value: '50-150', label: '$50 - $150 USD' },
    { value: '150-300', label: '$150 - $300 USD' },
    { value: '300-600', label: '$300 - $600 USD' },
    { value: '600-1200', label: '$600 - $1,200 USD' },
    { value: '1200+', label: '$1,200+ USD' }
  ],
  
  // CTA Button Text
  cta: {
    getProposal: 'Get a Free Proposal',
    startProject: 'Start a Project',
    viewPortfolio: 'View Our Work',
    contactWhatsApp: 'Contact on WhatsApp',
    proceedToPayment: 'Proceed to Manual Payment'
  }
};

export default siteConfig;

