export interface ResearchMetric {
  label: string;
  value: number;
  suffix: string;
  description: string;
  iconName: string;
}

export interface ResearchCommodity {
  name: string;
  scientificName: string;
  tag: string;
  focus: string;
  highlightedVarieties: string[];
}

export interface ResearchThrust {
  title: string;
  scope: string;
  collaborators: string[];
  keyDeliverable: string;
}

export interface PublicationItem {
  id: string;
  title: string;
  authors: string;
  year: number;
  journalOrPublisher: string;
  category: "Peer-Reviewed Journal" | "Technoguide / Extension" | "Policy Brief";
  downloadOrRef: string;
}

export const researchMetrics: ResearchMetric[] = [
  {
    label: "Active Research Projects",
    value: 42,
    suffix: "+",
    description: "Multi-year projects funded by DOST-PCAARRD, DA-BAR, CHED, and international partners.",
    iconName: "FolderGit2",
  },
  {
    label: "Commercialized Technologies",
    value: 18,
    suffix: "",
    description: "IP-protected agricultural systems, inoculants, and equipment licensed to enterprises.",
    iconName: "Award",
  },
  {
    label: "Germplasm Accessions Curated",
    value: 1250,
    suffix: "+",
    description: "Preserved genetic landraces, traditional cultivars, and wild crop relatives in seed bank.",
    iconName: "Database",
  },
  {
    label: "Farmers & Agrarian Coops Trained",
    value: 8500,
    suffix: "+",
    description: "Trained across Central Luzon through field schools, technology demos, and clinics.",
    iconName: "Users",
  },
  {
    label: "Peer-Reviewed & Technical Papers",
    value: 120,
    suffix: "+",
    description: "Published in Scopus, Web of Science, and Philippine scientific index journals.",
    iconName: "FileText",
  },
  {
    label: "Registered & Protected Crop Varieties",
    value: 14,
    suffix: "",
    description: "National Seed Industry Council (NSIC) registered and Plant Variety Protected varieties.",
    iconName: "ShieldCheck",
  },
];

export const priorityCommodities: ResearchCommodity[] = [
  {
    name: "Specialty & Stress-Tolerant Rice",
    scientificName: "Oryza sativa L.",
    tag: "Staple Grain",
    focus: "Submergence and drought tolerance, high-micronutrient biofortification, and low-glycemic specialty grains.",
    highlightedVarieties: ["CLSU-PR Series", "NSIC Rc Approved Lines", "Aromatic Landraces"],
  },
  {
    name: "Grain Legumes & Pulses",
    scientificName: "Vigna radiata, Arachis hypogaea",
    tag: "Soil-Enriching Crop",
    focus: "High-protein mungbean and peanut cultivars for post-rice rotation, biological nitrogen fixation, and soil health.",
    highlightedVarieties: ["CRRDC Pag-asa Mungbean", "High-Yield Peanut Selections"],
  },
  {
    name: "High-Value Lowland Vegetables",
    scientificName: "Allium cepa, Solanum melongena",
    tag: "Commercial Horticulture",
    focus: "Bulb onion, eggplant, and tomato varieties resistant to bacterial wilt, anthracnose, and extreme humidity.",
    highlightedVarieties: ["Bacterial Wilt Tolerant Eggplant", "Red & Yellow Bulb Onion Lines"],
  },
  {
    name: "Clonal Fruits & Root Crops",
    scientificName: "Musa spp., Dioscorea alata",
    tag: "Perennial & Tuber",
    focus: "Disease-indexed micropropagated banana cultivars, purple yam (Ube), and climate-hardy sweet potato.",
    highlightedVarieties: ["Tissue-Cultured Lakatan & Saba", "High-Anthocyanin Ube Clones"],
  },
  {
    name: "Bio-Energy & Industrial Crops",
    scientificName: "Sorghum bicolor, Saccharum spp.",
    tag: "Renewable Biomass",
    focus: "Multi-purpose sweet sorghum for bioethanol feedstock, high-silica biomass, and forage silage production.",
    highlightedVarieties: ["Sweet Sorghum CLSU Lines", "Industrial Biomass Selections"],
  },
];

export const researchThrusts: ResearchThrust[] = [
  {
    title: "Genomic Breeding & Climate Resilience",
    scope: "Marker-assisted selection, abiotic stress mapping, and phenotyping for water-deficit and thermal stress.",
    collaborators: ["PhilRice", "IRRI", "DOST-PCAARRD", "DA-BAR"],
    keyDeliverable: "3 new climate-adapted varieties entering multi-location testing per biennium.",
  },
  {
    title: "Agro-Ecological Soil & Microbiome Engineering",
    scope: "Formulation of indigenous mycorrhizal and plant-growth promoting rhizobacteria (PGPR) inoculants.",
    collaborators: ["BSWM", "CLSU College of Agriculture", "BIOTECH UPLB"],
    keyDeliverable: "25% chemical fertilizer reduction protocol validated in river-basin farming clusters.",
  },
  {
    title: "Precision Postharvest & Valorization",
    scope: "Dehydration kinetics, non-destructive quality sensing, and green extraction of crop antioxidants and pectin.",
    collaborators: ["PHilMech", "DOST-ITDI", "Regional Food Manufacturers"],
    keyDeliverable: "Zero-waste processing flowsheets for onion, mango, and root crop residues.",
  },
  {
    title: "Digital Agriculture & Farm Automation",
    scope: "IoT microclimate sensor nodes, multispectral UAV mapping, and predictive disease incidence forecasting.",
    collaborators: ["DICT", "PAGASA", "Regional Agriculture Offices"],
    keyDeliverable: "Operational web-based decision support platform for Central Luzon farmer co-ops.",
  },
];

export const samplePublications: PublicationItem[] = [
  {
    id: "pub-01",
    title: "Agronomic Evaluation and Nitrogen-Use Efficiency of Specialty Lowland Rice Genotypes in Central Luzon",
    authors: "CRRDC Crop Breeding Team et al.",
    year: 2024,
    journalOrPublisher: "Philippine Journal of Crop Science, Vol. 49(2)",
    category: "Peer-Reviewed Journal",
    downloadOrRef: "[DOI: 10.xxxx/pjcs.2024.xxxx]",
  },
  {
    id: "pub-02",
    title: "Technoguide for Commercial Production of Tissue-Cultured Banana (Musa acuminata Colla)",
    authors: "CRRDC Micropropagation & Extension Staff",
    year: 2024,
    journalOrPublisher: "CLSU Extension Publication Series No. 114",
    category: "Technoguide / Extension",
    downloadOrRef: "[CRRDC Technical Bulletin]",
  },
  {
    id: "pub-03",
    title: "Spatial Vulnerability Assessment of Rainfed Croplands to Mid-Season Drought in Nueva Ecija",
    authors: "CRRDC Remote Sensing & Climate Unit",
    year: 2023,
    journalOrPublisher: "Journal of Agricultural Meteorology & Geospatial Studies, 12(1)",
    category: "Peer-Reviewed Journal",
    downloadOrRef: "[DOI: 10.xxxx/jamgs.2023.xxxx]",
  },
  {
    id: "pub-04",
    title: "Policy Recommendations for Community-Level Seed Security and Seed Enterprise Accreditation in Region III",
    authors: "CRRDC Seed Production & Policy Taskforce",
    year: 2023,
    journalOrPublisher: "CLSU Policy Brief Series, No. 08",
    category: "Policy Brief",
    downloadOrRef: "[Institutional Policy Paper]",
  },
];
