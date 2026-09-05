export interface Division {
  id: string;
  code: string;
  name: string;
  subtitle: string;
  description: string;
  iconName: string;
  headTitle: string;
  headNamePlaceholder: string;
  keyResponsibilities: string[];
  priorityPrograms: string[];
  associatedFacilities: string[];
  contactEmail: string;
}

export const divisionsData: Division[] = [
  {
    id: "crrdd",
    code: "CRRDD",
    name: "Crops & Resources Research and Development Division",
    subtitle: "Pioneering Genetic Improvement, Agro-Ecological Innovations & Resource Science",
    description:
      "The backbone of CRRDC's scientific mandate, this division conducts applied and upstream research spanning crop breeding, cytogenetics, physiology, and ecological resource management. Researchers design climate-adapted cultivars and bio-fertilization regimens tailored to the agro-climatic conditions of Central Luzon.",
    iconName: "Microscope",
    headTitle: "Division Chief",
    headNamePlaceholder: "[Division Chief, Ph.D. — Crops & Resources R&D]",
    keyResponsibilities: [
      "Varietal improvement for staple, industrial, and highland-adapted crops",
      "Characterization, cataloging, and cryopreservation of regional crop germplasm",
      "Development of microbial inoculants and bio-stimulants for soil regeneration",
      "Assessment of climate change impacts on crop physiology and yield potentials",
    ],
    priorityPrograms: [
      "Specialty & Drought-Tolerant Rice Breeding Program",
      "Biofortified Legumes & High-Value Vegetable Trials",
      "Root System Architecture & Nutrient-Use Efficiency Initiative",
      "Indigenous Crop Biodiversity Conservation",
    ],
    associatedFacilities: [
      "Plant Tissue Culture & Micropropagation Lab",
      "Crop Genetics & Molecular Breeding Facility",
      "Field Experimental Station & Germplasm Plots",
    ],
    contactEmail: "crrdc.rdd@clsu.edu.ph",
  },
  {
    id: "spmpd",
    code: "SPMPD",
    name: "Seed & Planting Material Production Division",
    subtitle: "Ensuring Certified Seed Purity, Clonal Multiplication & Agricultural Resilience",
    description:
      "Bridging scientific varietal releases with field-ready agricultural scale, this division operates seed testing laboratories, certified seed multiplication fields, and clonal micropropagation facilities. It delivers disease-indexed, high-vigor planting materials to farmers, municipal agricultural offices, and commercial growers.",
    iconName: "Wheat",
    headTitle: "Division Chief",
    headNamePlaceholder: "[Division Chief, M.Sc. — Seed & Material Production]",
    keyResponsibilities: [
      "Foundation, registered, and certified seed production of CLSU-bred and NSIC-approved varieties",
      "Mass clonal propagation of pathogen-free seedlings, rootstocks, and ornamental selections",
      "Rigorous physical purity, germination rate, and seed moisture testing under ISTA standards",
      "Management of conditioned seed storage facilities and cold storage reserves",
    ],
    priorityPrograms: [
      "Regional Certified Vegetable & Grain Seed Reserve",
      "Disease-Free Micropropagated Banana & Fruit Tree Seedling Pipeline",
      "Community-Based Seed Enterprise Empowerment",
      "Seed Health Testing & Phytosanitary Compliance Protocol",
    ],
    associatedFacilities: [
      "Seed Testing & Quality Assurance Center",
      "Plant Tissue Culture & Micropropagation Lab",
      "Smart Greenhouse & Controlled-Environment Complex",
    ],
    contactEmail: "crrdc.seeds@clsu.edu.ph",
  },
  {
    id: "ttcd",
    code: "TTCD",
    name: "Technology Transfer & Commercialization Division",
    subtitle: "Catalyzing Agricultural Extension, IP Protection & Agribusiness Incubation",
    description:
      "Dedicated to translating laboratory breakthroughs into tangible socioeconomic benefits for agrarian communities. This division safeguards institutional intellectual property, packages validated findings into actionable technoguides, leads farmer field demonstration schools, and incubates student and faculty spin-off ventures.",
    iconName: "TrendingUp",
    headTitle: "Division Chief",
    headNamePlaceholder: "[Division Chief, M.Sc. — Tech Transfer & Commercialization]",
    keyResponsibilities: [
      "Intellectual property filings (patents, utility models, plant variety protection)",
      "Publishing vetted agricultural technical bulletins, manuals, and decision aids",
      "Conducting experiential farmer field schools and technician capacity workshops",
      "Facilitating technology licensing agreements and agribusiness partnership incubation",
    ],
    priorityPrograms: [
      "Techno-Gabay & Barangay Agricultural Empowerment Hubs",
      "Agri-Aqua Technology Business Incubation (ATBI) Partnership",
      "Participatory On-Farm Demonstration & Yield Trials",
      "Digital Knowledge Portals & Decision-Support Dissemination",
    ],
    associatedFacilities: [
      "GIS & Agro-climatic Remote Sensing Center",
      "Postharvest Technology & Processing Complex",
      "Agribusiness Demonstration Showcase",
    ],
    contactEmail: "crrdc.ttcd@clsu.edu.ph",
  },
  {
    id: "atssd",
    code: "ATSSD",
    name: "Administrative & Technical Support Services Division",
    subtitle: "Providing Precision Laboratory Logistics, Facility Governance & Research Support",
    description:
      "The operational backbone ensuring continuous precision, regulatory adherence, and safety across all CRRDC facilities. This division oversees analytical laboratory equipment maintenance, experimental farm machinery logistics, procurement compliance, and hazardous waste handling.",
    iconName: "Cog",
    headTitle: "Unit Chief",
    headNamePlaceholder: "[Unit Chief, CPA/MPA — Administrative & Support Services]",
    keyResponsibilities: [
      "Preventive maintenance, calibration, and quality management of analytical instruments",
      "Operation and allocation of heavy farm machinery and precision field tractors",
      "Bio-safety compliance, chemical inventory management, and lab safety protocols",
      "Fiscal management, grant administration, and institutional reporting to DOST-PCAARRD and CHED",
    ],
    priorityPrograms: [
      "ISO/IEC 17025 Laboratory Accreditation Compliance Program",
      "Integrated Biosafety & Chemical Safety Management System",
      "Precision Machinery Modernization & Maintenance Schedule",
      "Research Infrastructure Development Masterplan",
    ],
    associatedFacilities: [
      "All 10 Central Laboratories and Field Stations",
      "Agricultural Machinery & Automation Testing Grounds",
      "Chemical & Waste Management Station",
    ],
    contactEmail: "crrdc.admin@clsu.edu.ph",
  },
];
