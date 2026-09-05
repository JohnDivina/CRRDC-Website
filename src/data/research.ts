export interface ResearchMetricItem {
  label: string;
  category: "Intellectual Property" | "Projects" | "Commercialization";
  placeholderValue: string;
  description: string;
}

export interface CollaboratingAgency {
  name: string;
  acronym: string;
  type: "National Government" | "International Center" | "Research Institute";
}

export const institutionalAchievements: ResearchMetricItem[] = [
  {
    label: "Patents Granted & Filed",
    category: "Intellectual Property",
    placeholderValue: "[To be provided]",
    description: "Inventions and novel biotechnology processes protected under IPOPHL.",
  },
  {
    label: "Utility Models Registered",
    category: "Intellectual Property",
    placeholderValue: "[To be provided]",
    description: "Agricultural machinery implements, tools, and formulation utility registrations.",
  },
  {
    label: "Copyrights & Software Deposits",
    category: "Intellectual Property",
    placeholderValue: "[To be provided]",
    description: "Technoguides, agricultural decision systems, software, and training manuals.",
  },
  {
    label: "Ongoing Research Projects",
    category: "Projects",
    placeholderValue: "[To be provided]",
    description: "Active multi-year grants currently executed across CRRDC laboratories.",
  },
  {
    label: "Finished / Completed Projects",
    category: "Projects",
    placeholderValue: "[To be provided]",
    description: "Successfully concluded research initiatives transitioned into extension or policy.",
  },
  {
    label: "Registered Plant Varieties",
    category: "Commercialization",
    placeholderValue: "[To be provided]",
    description: "Crop varieties approved by the National Seed Industry Council (NSIC) and PVP.",
  },
];

export const collaboratingAgencies: CollaboratingAgency[] = [
  {
    name: "Philippine Council for Agriculture, Aquatic and Natural Resources Research and Development",
    acronym: "DOST-PCAARRD",
    type: "National Government",
  },
  {
    name: "Department of Agriculture — Bureau of Agricultural Research",
    acronym: "DA-BAR",
    type: "National Government",
  },
  {
    name: "Philippine Rice Research Institute",
    acronym: "PhilRice",
    type: "Research Institute",
  },
  {
    name: "International Rice Research Institute",
    acronym: "IRRI",
    type: "International Center",
  },
  {
    name: "Bureau of Plant Industry — National Seed Quality Control",
    acronym: "DA-BPI",
    type: "National Government",
  },
  {
    name: "Bureau of Soils and Water Management",
    acronym: "DA-BSWM",
    type: "National Government",
  },
  {
    name: "Commission on Higher Education",
    acronym: "CHED",
    type: "National Government",
  },
  {
    name: "Philippine Center for Postharvest Development and Mechanization",
    acronym: "PHilMech",
    type: "Research Institute",
  },
];

export const priorityCommodities = [
  {
    name: "Specialty & Stress-Tolerant Rice",
    scientificName: "Oryza sativa L.",
    tag: "Staple Grain",
    focus: "Submergence and drought tolerance, high-micronutrient biofortification, and low-glycemic specialty grains.",
  },
  {
    name: "Grain Legumes & Pulses",
    scientificName: "Vigna radiata, Arachis hypogaea",
    tag: "Soil-Enriching Crop",
    focus: "High-protein mungbean and peanut cultivars for post-rice rotation, biological nitrogen fixation, and soil health.",
  },
  {
    name: "High-Value Lowland Vegetables",
    scientificName: "Allium cepa, Solanum melongena",
    tag: "Commercial Horticulture",
    focus: "Bulb onion, eggplant, and tomato varieties resistant to bacterial wilt, anthracnose, and extreme heat.",
  },
  {
    name: "Clonal Fruits & Root Crops",
    scientificName: "Musa spp., Dioscorea alata",
    tag: "Perennial & Tuber",
    focus: "Disease-indexed micropropagated banana cultivars, purple yam (Ube), and climate-hardy sweet potato.",
  },
  {
    name: "Bio-Energy & Industrial Crops",
    scientificName: "Sorghum bicolor, Saccharum spp.",
    tag: "Renewable Biomass",
    focus: "Multi-purpose sweet sorghum for bioethanol feedstock, high-silica biomass, and forage silage production.",
  },
];
