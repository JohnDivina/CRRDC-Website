export interface Facility {
  id: string;
  name: string;
  code: string;
  category: "Biotechnology & Genetics" | "Analytical & Quality" | "Engineering & Automation" | "Field & Ecological";
  division: string;
  overview: string;
  keyEquipment: string[];
  capabilities: string[];
  certificationsOrStandards: string[];
  headTechnicianPlaceholder: string;
  locationDetails: string;
}

export const facilitiesData: Facility[] = [
  {
    id: "tissue-culture-lab",
    name: "Plant Tissue Culture & Micropropagation Laboratory",
    code: "PTCL",
    category: "Biotechnology & Genetics",
    division: "Crops & Resources R&D Division",
    overview:
      "A cleanroom-certified micropropagation facility capable of high-throughput clonal multiplication of disease-free banana cultivars, indigenous root crops, high-value ornamentals, and endangered agricultural germplasm under strictly controlled aseptic environments.",
    keyEquipment: [
      "Class II Biosafety Laminar Flow Cabinets (HEPA H14)",
      "High-Capacity Autoclave Sterilizers (Tuttnauer & Hirayama)",
      "Automated Climate-Controlled Growth Rooms (Photoperiod & RH controlled)",
      "Orbital Shakers & Liquid Suspension Culture Systems",
    ],
    capabilities: [
      "Meristem tip culture for virus eradication in Musa cultivars",
      "Somatic embryogenesis and synthetic seed encapsulation",
      "Rapid clonal propagation of commercial banana, yam, and taro cultivars",
      "Medium-term in-vitro slow-growth germplasm preservation",
    ],
    certificationsOrStandards: [
      "BPI Recognized Tissue Culture Facility",
      "Standard Biosafety Level 1 (BSL-1) Certified Facility",
    ],
    headTechnicianPlaceholder: "[Laboratory Manager / Tissue Culture Specialist]",
    locationDetails: "Ground Floor, CRRDC Science Wing, CLSU Campus",
  },
  {
    id: "molecular-breeding-lab",
    name: "Crop Genetics & Molecular Breeding Facility",
    code: "CGMBF",
    category: "Biotechnology & Genetics",
    division: "Crops & Resources R&D Division",
    overview:
      "Equipped for modern marker-assisted selection (MAS), molecular diversity assessments, and genomic DNA profiling of cereal and vegetable populations to accelerate breeding cycles for climate adaptation.",
    keyEquipment: [
      "Thermal Cyclers & Real-Time Quantitative PCR (qPCR) Systems",
      "Automated Gel Electrophoresis & UV Gel Imaging Documentation System",
      "NanoDrop Spectrophotometer & High-Speed Refrigerated Centrifuges",
      "Deep Cryogenic Freezers (-80°C Eppendorf Ultra-Low)",
    ],
    capabilities: [
      "DNA extraction, quantification, and high-density SSR/SNP genotyping",
      "Marker-assisted selection for submergence (Sub1) and drought tolerance",
      "Molecular verification of varietal purity in commercial seed lots",
      "Genetic relatedness and diversity mapping of indigenous landraces",
    ],
    certificationsOrStandards: [
      "Institutional Biosafety Committee (IBC) Monitored",
      "DOST-PCAARRD Advanced Genomics Network Node",
    ],
    headTechnicianPlaceholder: "[Molecular Geneticist / Lab Analyst]",
    locationDetails: "Second Floor, Biotechnology Block, CRRDC",
  },
  {
    id: "soil-plant-analytical-lab",
    name: "Soil, Water & Plant Nutrition Analytical Laboratory",
    code: "SPANL",
    category: "Analytical & Quality",
    division: "Administrative & Technical Support Services",
    overview:
      "Comprehensive analytical facility delivering precise chemical and physical assays for soil fertility diagnosis, irrigation water quality evaluation, and plant tissue macro- and micronutrient quantification.",
    keyEquipment: [
      "Atomic Absorption Spectrophotometer (AAS) for Heavy Metals & Micronutrients",
      "UV-Vis Double Beam Spectrophotometer for Available Phosphorus",
      "Kjeldahl Digestion & Automated Nitrogen Distillation Unit",
      "Flame Photometer, Precision EC/pH Multiparameter Meters",
    ],
    capabilities: [
      "Complete routine soil fertility analysis (pH, OM, Available P, Exchangeable K)",
      "Plant tissue diagnostic assays for crop nutrient deficiency verification",
      "Irrigation and surface runoff salinity, sodicity, and nitrate profiling",
      "Biochar and compost nutrient stoichiometry characterization",
    ],
    certificationsOrStandards: [
      "Bureau of Soils and Water Management (BSWM) Recognized Lab",
      "Aligned with ISO/IEC 17025 Good Laboratory Practices (GLP)",
    ],
    headTechnicianPlaceholder: "[Senior Soil Chemist & Analytical Chemist]",
    locationDetails: "Agricultural Chemistry Wing, CRRDC Main Building",
  },
  {
    id: "seed-testing-center",
    name: "Seed Testing & Quality Assurance Center",
    code: "STQAC",
    category: "Analytical & Quality",
    division: "Seed & Planting Material Production Division",
    overview:
      "Dedicated regulatory testing center that certifies the physical purity, germination vigor, moisture threshold, and seed health for all foundation and registered seed lots distributed across Region III.",
    keyEquipment: [
      "Germination Chambers with Precision Thermoperiod Controls",
      "Purity Workboards with Magnifying Optics and Diaphanoscope",
      "Dickey-john Moisture Testers & Convection Drying Ovens",
      "Precision Seed Counting, Gravity Grading, and Air-Screen Separators",
    ],
    capabilities: [
      "Standard germination percentage and speed-of-emergence evaluations",
      "Weed seed contamination and inert matter percentage fractionation",
      "Electrical conductivity tests for seed physiological aging and vigor",
      "Official seed tagging verification for NSIC-approved crop classes",
    ],
    certificationsOrStandards: [
      "Operates under International Seed Testing Association (ISTA) Rules",
      "National Seed Quality Control Services (NSQCS) Accredited",
    ],
    headTechnicianPlaceholder: "[Accredited Seed Testing Officer]",
    locationDetails: "Seed Processing Complex, CRRDC South Campus",
  },
  {
    id: "postharvest-processing-complex",
    name: "Postharvest Technology & Processing Complex",
    code: "PHTC",
    category: "Analytical & Quality",
    division: "Crops & Resources R&D Division",
    overview:
      "Translational engineering center advancing postharvest shelf-life extension, minimally processed packaging, controlled ripening, and the valorization of crop residues into secondary agricultural products.",
    keyEquipment: [
      "Walk-In Controlled Atmosphere & Cold Storage Modules (0°C to 15°C)",
      "Cabinet Dehydrators, Freeze Dryer (Lyophilizer), and Spray Dryer",
      "Texture Analyzers (TA.XT Plus) & Colorimeter (HunterLab LabScan XE)",
      "Modified Atmosphere Packaging (MAP) Vacuum Heat Sealers",
    ],
    capabilities: [
      "Respiration rate and ethylene evolution kinetics analysis",
      "Nutrient retention profiling under diverse dehydration regimens",
      "Physicochemical quality shelf-life modeling of high-value vegetables",
      "By-product bio-conversion into value-added flour, starch, and extracts",
    ],
    certificationsOrStandards: [
      "Food Safety Standards Compliant (HACCP principles)",
      "PHilMech Collaborative Research Node",
    ],
    headTechnicianPlaceholder: "[Postharvest Technologist / Food Engineer]",
    locationDetails: "Postharvest Technology Building, CRRDC East",
  },
  {
    id: "crop-protection-clinic",
    name: "Crop Protection (Entomology & Pathology) Diagnostic Clinic",
    code: "CPDC",
    category: "Field & Ecological",
    division: "Crops & Resources R&D Division",
    overview:
      "Rapid diagnostic clinic identifying insect pests, bacterial and fungal pathogens, viral diseases, and physiological disorders affecting Central Luzon's prime agro-ecosystems.",
    keyEquipment: [
      "High-Resolution Research Stereomicroscopes with Digital Cameras",
      "Compound Brightfield & Phase-Contrast Diagnostic Microscopes",
      "Incubators for Fungal and Bacterial Pure Culture Isolation",
      "ELISA Microplate Reader for Serological Viral Detection",
    ],
    capabilities: [
      "Differential diagnosis of foliar, vascular, and root crop diseases",
      "Biopesticide efficacy testing against invasive insect pests (e.g., fall armyworm)",
      "Formulation and mass culturing of beneficial entomopathogenic fungi (Metarhizium, Beauveria)",
      "Advisory generation for Integrated Pest Management (IPM) farmer networks",
    ],
    certificationsOrStandards: [
      "BPI Plant Quarantine Diagnostic Partner",
      "Standard Biosafety Level 1 (BSL-1) Compliant",
    ],
    headTechnicianPlaceholder: "[Diagnostic Entomologist / Plant Pathologist]",
    locationDetails: "Crop Protection Pavilion, CRRDC Science Wing",
  },
  {
    id: "smart-greenhouse-complex",
    name: "Smart Greenhouse & Controlled-Environment Agriculture Complex",
    code: "SGAC",
    category: "Engineering & Automation",
    division: "Seed & Planting Material Production Division",
    overview:
      "High-tech greenhouse facilities utilizing automated nutrient dosing, sensor-driven microclimate misting, insect-proof screening, and vertical hydroponic systems for year-round production trials.",
    keyEquipment: [
      "Automated Fertigation Controllers with Inline EC/pH Feedback",
      "IoT Climate Monitoring Station (Solar radiation, Vapor Pressure Deficit, Temp, RH)",
      "Evaporative Cooling Pad & Exhaust Fan Systems with Automated Curtains",
      "NFT Hydroponic, Dutch Bucket, and Aeroponic Modular Benches",
    ],
    capabilities: [
      "Year-round physiological stress simulation on high-value crops",
      "Optimized nutrient solution formulating for leafy and fruiting vegetables",
      "Off-season seed production and mother plant stock preservation",
      "Demonstration of renewable-powered precision horticulture techniques",
    ],
    certificationsOrStandards: [
      "Protected Agriculture Good Agricultural Practices (PhilGAP) Aligned",
    ],
    headTechnicianPlaceholder: "[Controlled-Environment Agronomist]",
    locationDetails: "North Greenhouse Block, CRRDC Agro-Park",
  },
  {
    id: "farm-machinery-grounds",
    name: "Agricultural Machinery & Automation Testing Grounds",
    code: "AMATG",
    category: "Engineering & Automation",
    division: "Administrative & Technical Support Services",
    overview:
      "Operational staging area and workshop for evaluating tractor implements, small-scale harvesting machinery, sensor-guided drones, and mechanical planting equipment designed for lowland and upland conditions.",
    keyEquipment: [
      "Four-Wheel & Two-Wheel Research Tractors with PTO Dynamometer",
      "Precision Seeding and Transplanter Calibration Rigs",
      "Agricultural Spraying & Multispectral Field Surveillance Drones",
      "Precision Workshop (Lathe, Milling, MIG/TIG Welding, and Load Cell Testbeds)",
    ],
    capabilities: [
      "Field capacity and fuel efficiency benchmarking of novel farm machinery",
      "Prototype modification and durability evaluation under heavy clay soil conditions",
      "Drone spray swath distribution analysis and droplet deposition modeling",
      "Mechanical calibration services for regional agricultural cooperatives",
    ],
    certificationsOrStandards: [
      "AMTEC (Agricultural Machinery Testing and Evaluation Center) Protocol Aligned",
    ],
    headTechnicianPlaceholder: "[Agricultural & Biosystems Engineer]",
    locationDetails: "Mechanization Shed & Test Grounds, CRRDC West Station",
  },
  {
    id: "gis-remote-sensing-center",
    name: "GIS & Agro-climatic Remote Sensing Center",
    code: "GARC",
    category: "Engineering & Automation",
    division: "Technology Transfer & Commercialization Division",
    overview:
      "Computational spatial laboratory dedicated to satellite crop monitoring, drought index tracking, agro-ecological zone mapping, and digital land-use decision support for agricultural planning.",
    keyEquipment: [
      "High-Performance Dual-GPU Geospatial Processing Workstations",
      "Licensed ArcGIS Pro, QGIS Server & Google Earth Engine Cloud Pipeline",
      "RTK-GNSS Handheld Sub-Meter Field Survey Rovers",
      "Automated Weather Station (AWS) Telemetry Receiving Terminal",
    ],
    capabilities: [
      "NDVI, EVI, and NDWI satellite vegetative index time-series modeling",
      "Agro-climatic suitability mapping for emerging and climate-resilient crops",
      "Flood and drought vulnerability stratification across Central Luzon farm basins",
      "Spatial database administration for regional farmer advisory portals",
    ],
    certificationsOrStandards: [
      "PAGASA Agrometeorology Data Sharing Partner",
      "NAMRIA Geographic Data Standards Aligned",
    ],
    headTechnicianPlaceholder: "[Geospatial Analyst / Remote Sensing Specialist]",
    locationDetails: "Third Floor, Information Technology Hub, CRRDC",
  },
  {
    id: "field-experimental-station",
    name: "Field Experimental Station & Germplasm Conservation Plots",
    code: "FESGP",
    category: "Field & Ecological",
    division: "Crops & Resources R&D Division",
    overview:
      "Over 25 hectares of dedicated, precision-irrigated experimental field plots facilitating replicated agronomic trials, multi-location varietal evaluations, and live in-situ germplasm preservation.",
    keyEquipment: [
      "Automated Underground Drip & Overhead Micro-Sprinkler Irrigation Grid",
      "Meteorological Weather Tower with Continuous Logging",
      "Dedicated Seed Processing & Threshing Sheds",
      "Perimeter Security and Biosafety Buffer Enclosures",
    ],
    capabilities: [
      "National Cooperative Testing (NCT) trials for rice, corn, and high-value vegetables",
      "Long-term crop rotation and soil organic matter sequestration plots",
      "Phenotypic screening for drought, lodging, and high-temperature tolerance",
      "Live ex-situ maintenance of indigenous legume and traditional tuber collections",
    ],
    certificationsOrStandards: [
      "PhilRice / DA-BAR Official Trial Site",
      "Good Agricultural Practices (PhilGAP) Certified Plots",
    ],
    headTechnicianPlaceholder: "[Field Station Superintendent & Farm Supervisor]",
    locationDetails: "Central Luzon State University Agro-Experiment Station",
  },
];
