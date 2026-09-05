export interface DigitalSystem {
  id: string;
  name: string;
  badge: string;
  role: string;
  description: string;
  features: string[];
  status: "Active Deployment" | "Production Pilot" | "Institutional Beta";
  linkUrl?: string;
  linkLabel: string;
  iconName: string;
}

export const digitalSystemsData: DigitalSystem[] = [
  {
    id: "resursee",
    name: "Resursee Platform",
    badge: "Flagship System",
    role: "Integrated Crop Resources & Plant Doctor Ecosystem",
    description:
      "A next-generation digital agriculture suite designed for farmers, researchers, and extension officers. Resursee bridges field diagnosis, AI-assisted plant pathology triage, and certified seed catalog exploration into a unified web experience.",
    features: [
      "AI-driven visual symptom diagnosis with agronomist follow-up verification",
      "Interactive crop library with localized agronomic management guides",
      "Real-time inventory lookup for registered foundation seed varieties",
      "Direct consultation booking with CRRDC laboratory diagnostic specialists",
    ],
    status: "Active Deployment",
    linkUrl: "https://crrdc.vercel.app",
    linkLabel: "Access Resursee Portal",
    iconName: "Stethoscope",
  },
  {
    id: "inventory-sales-system",
    name: "Inventory and Sales Management System",
    badge: "Enterprise Operations",
    role: "Agricultural Products, Certified Seed & Equipment Stock Control",
    description:
      "Comprehensive inventory and commercialization management system tracking seed stocks, planting materials, bio-fertilizer inventory, and sales transactions across CRRDC production divisions.",
    features: [
      "Automated stock auditing for certified seed lots and processed goods",
      "Point-of-sale invoicing for university accredited agricultural distribution",
      "Real-time alerts for reorder thresholds and seed storage expiration dates",
      "Financial reporting compliant with state university accounting guidelines",
    ],
    status: "Active Deployment",
    linkLabel: "Open Inventory Portal",
    iconName: "ShoppingCart",
  },
  {
    id: "seed-registry",
    name: "Central Luzon Certified Seed Registry",
    badge: "Regulatory & Distribution",
    role: "Digital Seed Stock & Quality Tracking System",
    description:
      "An automated registry tracking certified seed lot availability, germination rates, ISTA compliance records, and distribution logistics across regional agrarian reform communities and municipal agricultural offices.",
    features: [
      "Batch verification via unique seed lot QR code identifiers",
      "Live availability tracker for Foundation, Registered, and Certified seed stocks",
      "Automated seed request dispatch for certified agricultural cooperatives",
      "Historical germination and moisture degradation log per storage silo",
    ],
    status: "Production Pilot",
    linkLabel: "Request Seed Allocations",
    iconName: "Wheat",
  },
  {
    id: "lab-access",
    name: "LabAccess CRRDC",
    badge: "Scientific Services",
    role: "Analytical Laboratory Service & Instrument Booking System",
    description:
      "Centralized booking and sample tracking portal for university researchers, graduate students, and private industry partners requiring soil chemical assays, molecular genotyping, or postharvest instrumentation.",
    features: [
      "Online sample submission with digital chain-of-custody tracking",
      "Schedule reservations for AAS, qPCR, and freeze-drying equipment",
      "Digital certificate of analysis (COA) generation with cryptographic verification",
      "Standardized fee calculator with student and cooperative subsidized rates",
    ],
    status: "Active Deployment",
    linkLabel: "Submit Analytical Request",
    iconName: "FlaskConical",
  },
  {
    id: "agroclimate-hub",
    name: "AgroClimate Advisory & GIS Hub",
    badge: "Decision Support",
    role: "Satellite Crop Monitoring & Weather-Indexed Advisory",
    description:
      "Spatial information system combining CLSU automated weather station telemetry, Sentinel satellite imagery, and crop calendar models to deliver localized drought alerts and planting window recommendations.",
    features: [
      "Field-level NDVI vegetative vigor time-series maps",
      "10-day rainfall probability and drought-stress indicators for Nueva Ecija",
      "Pest emergence vulnerability forecasts based on degree-day models",
      "Open GIS layer downloads for academic and local government planning",
    ],
    status: "Institutional Beta",
    linkLabel: "Explore Spatial Maps",
    iconName: "MapPinned",
  },
];
