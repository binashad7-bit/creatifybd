// CreatifyBD Site Configuration
// Update these values as needed for your business

export const siteConfig = {
  // Business Information
  businessName: 'CreatifyBD',
  websiteUrl: 'https://creatifybd.com',
  tagline: 'Social media management and creative services for small businesses',
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
    defaultTitle: 'CreatifyBD | Social Media Management, Design, Video Editing & Websites',
    defaultDescription: 'CreatifyBD helps small businesses in the USA, Canada, Australia, and global markets with social media management, graphic design, video editing, digital marketing, and website design.',
    defaultKeywords: 'social media manager, social media management for small business, graphic design service, video editing service, website design for small business, digital marketing service',
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

